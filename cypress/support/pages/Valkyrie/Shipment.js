const basePage = require("../Common/BasePage");
const ValkyrieRoutes = require("../../api/Valkyrie");
import "../../commands"
import { queryDb } from "../../db/db";
const MainSiteRoutes = require("../../api/MainSiteRoutes");
const shipmentData = require("../../../fixtures/CreateShipment");

class Shipment extends basePage {
    constructor() {
        super();
    }

    createShipmentViaAPI() {
        const envName = (Cypress.env('environment') || "staging").toUpperCase();
        const routes = MainSiteRoutes[envName] || MainSiteRoutes.STAGING;
        const shipmentEnv = Cypress.env('shipmentApi') || {};

        const finalCredentials = {
            username: shipmentEnv.username,
            password: shipmentEnv.password
        };
        const finalApiKey = shipmentEnv.apiKey;

        cy.log(`Environment: ${envName}`);
        cy.log(`URL: ${routes.token}`);
        // Log with markers to see hidden spaces
        console.log('FINAL AUTH REQUEST:', {
            url: routes.token,
            headers: { 'X-API-KEY': finalApiKey },
            body: finalCredentials
        });

        if (!shipmentData) {
            cy.log('No shipment data fixture found, skipping API call');
            return cy.wrap(null);
        }

        return cy.request({
            method: 'POST',
            url: routes.token,
            failOnStatusCode: false,
            headers: {
                'X-API-KEY': finalApiKey,
                'Content-Type': 'application/json'
            },
            body: finalCredentials
        }).then((response) => {
            if (response.status !== 200) {
                cy.log(`Token API Failed at ${routes.token}!`, response.status, JSON.stringify(response.body));
                console.error('Token API Error:', response.body);
            }
            expect(response.status, `Token API failed: ${JSON.stringify(response.body)}`).to.eq(200);
            const token = response.body.data.token;

            return cy.request({
                method: 'POST',
                url: routes.createShipment,
                headers: {
                    'x-api-key': finalApiKey,
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: shipmentData
            }).then((shipmentResponse) => {
                expect(shipmentResponse.status).to.eq(200);
                return cy.wrap(shipmentResponse.body.data.awb).as('awb');
            });
        });
    }


    validateShipments() {

        cy.intercept({
            method: 'POST',
            url: ValkyrieRoutes.shipementsView
        }).as('shipmentsView');
        cy.contains("a", "Valkyrie").realHover();
        cy.contains("Deliveries").click();
        cy.url().should("include", "/pnd/shipments");
        cy.wait('@shipmentsView').then(({ request, response }) => {
            expect(request.body.slotted_filter).to.eq('assign_now');
            expect(response.statusCode).to.eq(200);
        });

        cy.contains("Assign Later").click();
        cy.wait('@shipmentsView').then(({ request, response }) => {
            expect(request.body.slotted_filter).to.eq('assign_later');
            expect(response.statusCode).to.eq(200);
        });

        cy.contains("Assigned").click();
        cy.wait('@shipmentsView').then(({ request, response }) => {
            expect(request.body.slotted_filter).to.eq('assigned');
            expect(response.statusCode).to.eq(200);
        });

        cy.contains("Completed").click();
        cy.wait('@shipmentsView').then(({ request, response }) => {
            expect(request.body.slotted_filter).to.eq('completed');
            expect(response.statusCode).to.eq(200);
        });

        cy.contains("Return").click();
        cy.wait('@shipmentsView').then(({ request, response }) => {
            expect(request.body.slotted_filter).to.eq('return');
            expect(response.statusCode).to.eq(200);
        });

        cy.contains("All Shipments").click();
        cy.wait('@shipmentsView').then(({ request, response }) => {
            expect(request.body.slotted_filter).to.eq('all');
            expect(response.statusCode).to.eq(200);
        });

        cy.get('@awb').then((awb) => {
            cy.get('input[type="search"]').first().type(awb).type('{enter}');
            cy.wait('@shipmentsView').then(({ response }) => {
                expect(response.statusCode).to.eq(200);
            });
            cy.get('button').find('img[alt="View Details"]').click();
            cy.contains('Override Status').click();
            cy.get('.css-1xc3v61-indicatorContainer').eq(1).click();
            cy.contains('DELIVERED').click();
            cy.get('input[type="radio"]').first().click();
            cy.contains('label', 'Customer Unavailable').click();
            cy.contains('button', 'Update').click();
        });

    }

    checkWhatsappMessaged() {
        cy.get('@awb').then((awb) => {
            // queryDb(`SELECT * FROM zfw_wa_comm_logs WHERE ref_code  = ${awb};`)
        });
    }
}

module.exports = new Shipment();
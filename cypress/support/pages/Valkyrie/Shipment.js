const basePage = require("../Common/BasePage");
const ValkyrieRoutes = require("../../api/Valkyrie");
import "../../commands"
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
                const awb = shipmentResponse.body.data.awb;
                Cypress.env('awb', awb);
                cy.log(`AWB Captured: ${awb}`);
                return cy.wrap(awb).as('awb');
            });
        });
    }


    validateShipments() {

        cy.intercept({
            method: 'POST',
            url: ValkyrieRoutes.shipementsView
        }).as('shipmentsView');

        cy.intercept({
            method: 'PUT',
            url: ValkyrieRoutes.overrideStatus
        }).as('overrideStatus');

        cy.intercept({
            method: 'GET',
            url: ValkyrieRoutes.shipmentLogs
        }).as('shipmentLogs');

        cy.intercept({
            method: 'POST',
            url: ValkyrieRoutes.shipmentdetails
        }).as('shipmentdetails');

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
            cy.wait('@overrideStatus').then(({ response }) => {
                expect(response.statusCode).to.eq(200);
            });

            cy.get('button').find('img[alt="View Details"]').click();
            cy.contains('Override Status').click();
            cy.get('.css-1xc3v61-indicatorContainer').eq(1).click();
            cy.contains('CANCELLED').click();
            cy.get('input[type="radio"]').first().click();
            cy.contains('label', 'Customer Unavailable').click();
            cy.contains('button', 'Update').click();
            cy.wait('@overrideStatus').then(({ response }) => {
                expect(response.statusCode).to.eq(200);
            });

            cy.get('button').find('img[alt="View Details"]').click();
            cy.contains('Override Status').click();
            cy.get('.css-1xc3v61-indicatorContainer').eq(1).click();
            cy.contains('RTO').click();
            cy.get('input[type="radio"]').first().click();
            cy.contains('label', 'Customer Unavailable').click();
            cy.contains('button', 'Update').click();
            cy.wait('@overrideStatus').then(({ response }) => {
                expect(response.statusCode).to.eq(200);
            });

            cy.get('button').find('img[alt="View Details"]').click();
            cy.contains('Override Status').click();
            cy.get('.css-1xc3v61-indicatorContainer').eq(1).click();
            cy.contains('DELIVERY_ATTEMPTED').click();
            cy.get('input[type="radio"]').first().click();
            cy.contains('label', 'Customer Unavailable').click();
            cy.contains('button', 'Update').click();
            cy.wait('@overrideStatus').then(({ response }) => {
                expect(response.statusCode).to.eq(200);
            });
        });

        const allowedBackendStatuses = [
            'DELIVERY_ATTEMPTED',
            'CANCELLED',
            'RTO',
            'DELIVERED',
            'READY'
        ];

        const allowedFrontendStatuses = [
            'Delivery Attempted',
            'Cancelled',
            'RTO',
            'Delivered',
            'Ready'
        ];

        cy.get('table tbody tr td').eq(1).find('a').click();
        cy.wait('@shipmentdetails').then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });
        cy.contains('a', 'Go To Logs').click({ force: true });

        cy.wait('@shipmentLogs').then(({ response }) => {

            expect(response.statusCode).to.eq(200);

            response.body.data.forEach((log) => {
                expect(log.status).to.be.oneOf(allowedBackendStatuses);
            });

        });
        cy.get('h3').each(($el) => {
            const text = $el.text().trim();
            expect(allowedFrontendStatuses).to.include(text);
        });


    }

    checkWhatsappMessaged() {
        cy.get('@awb').then((awb) => {
            cy.task("queryDb", `SELECT * FROM zfw_wa_comm_logs WHERE ref_code  = "${awb}";`).then((response) => {
                expect(response.length).to.be.greaterThan(0)
            })
        });
    }

    checkwehbookHistorylogs() {
        const webhookTypes = ['DELIVERED', 'CANCELLED', 'RTO', 'Delivery_Attempted'];

        cy.get('@awb').then((awb) => {
            webhookTypes.forEach((webhookType) => {
                cy.task("queryDb", `SELECT * FROM zfw_webhook_history WHERE reference_code  = "${awb}" and webhook_type = '${webhookType}';`).then((response) => {
                    expect(response.length).to.be.greaterThan(0)
                })
            })
        });
    }




}

module.exports = new Shipment();
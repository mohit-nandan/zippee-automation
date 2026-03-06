const basePage = require("../Common/BasePage");
const ValkyrieRoutes = require("../../api/Valkyrie");
import "../../commands"
class Shipment extends basePage {
    constructor() {
        super();
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

        cy.dbQuery(`
             SELECT * FROM zippeeriderapp_trip WHERE id = 5218;
            `).then((result) => {
            console.log(result);
        });


    }
}

module.exports = new Shipment();
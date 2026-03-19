const basePage = require("../Common/BasePage");
const ValkyrieRoutes = require("../../api/Valkyrie");

class Trips extends basePage {
    constructor() {
        super();
    }
    validateTrips() {
        cy.intercept({
            method: 'POST',
            url: ValkyrieRoutes.tripsView
        }).as('tripsView');

        cy.get(".sidebar").realHover("left").then(() => {
            cy.contains("span", "Pickup Delivery")
                .should("be.visible")
                .realHover().click();
        })
        cy.contains("Deliveries").click();
        cy.location('pathname').should('include', 'shipments');
        cy.contains(/^Trips$/).click();
        cy.location('pathname').should('include', '/trips');
        cy.wait('@tripsView', { timeout: 20000 })
            .its('response.statusCode')
            .should('eq', 200);

        cy.intercept({
            method: 'POST',
            url: ValkyrieRoutes.tripsView
        }).as('tripsView');
        cy.contains("Created").click();
        cy.wait('@tripsView').then(({ request, response }) => {
            expect(response.statusCode).to.eq(200);
        });


        cy.intercept({
            method: 'POST',
            url: ValkyrieRoutes.tripsView
        }).as('tripsView');
        cy.contains("Ongoing").click();
        cy.wait('@tripsView').then(({ request, response }) => {
            expect(response.statusCode).to.eq(200);
        });

        cy.intercept({
            method: 'POST',
            url: ValkyrieRoutes.tripsView
        }).as('tripsView');
        cy.contains("Completed").click();
        cy.wait('@tripsView').then(({ request, response }) => {
            expect(response.statusCode).to.eq(200);
        });

        cy.intercept({
            method: 'POST',
            url: ValkyrieRoutes.tripsView
        }).as('tripsView');
        cy.contains("All").click();
        cy.wait('@tripsView').then(({ request, response }) => {
            expect(response.statusCode).to.eq(200);
        });

    }
}

module.exports = new Trips();
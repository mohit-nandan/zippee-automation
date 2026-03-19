const basePage = require("../Common/BasePage");
const ValkyrieRoutes = require("../../api/Valkyrie");

class ExpressHub extends basePage {
    constructor() {
        super();
    }

    validateExpressHub() {
        cy.intercept({
            method: 'GET',
            url: ValkyrieRoutes.ExpressHubShipments
        }).as('ExpressHubShipments');

        cy.get(".sidebar").realHover("left").then(() => {
            cy.contains("span", "Pickup Delivery")
                .should("be.visible")
                .realHover().click();
        })
        cy.contains("Express Hub").click();
        cy.url().should("include", "/express-hub");

        const env = Cypress.env('environment') || 'staging';
        cy.fixture(`${env}/testData`).then((data) => {
            const searchLocation = data.expressHub.searchLocation;
            cy.get('.css-hlgwow').last().find('input').type(searchLocation);
            cy.press('Enter');
        });
        cy.wait('@ExpressHubShipments').then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });

        cy.contains("Ongoing").click();
        cy.wait('@ExpressHubShipments').then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });

        cy.contains("Completed").click();
        cy.wait('@ExpressHubShipments').then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });


    }
}

module.exports = new ExpressHub();
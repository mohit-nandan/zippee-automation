const BasePage = require("../Common/BasePage");
const CODRoutes = require("../../api/CODRoutes");

class Attendence extends BasePage {
    constructor() {
        super();
        this.AttendenceTab = 'a[href="/cod/attendence"]';
    }

    validateAttendence() {
        cy.intercept({
            method: 'GET',
            url: CODRoutes.Attendence
        }).as("RiderAttendence");


        cy.get(".sidebar").realHover("left").then(() => {
            cy.contains("span", "COD")
                .should("be.visible")
                .realHover().click();
        })
        cy.contains("Attendance").click();
        cy.url().should('include', 'attendenceDashboard');

        cy.wait('@RiderAttendence', { timeout: 30000 })
            .its('response.statusCode')
            .should('eq', 200);

        cy.get("table tbody tr")
            .should("have.length.greaterThan", 0);
    }


}

module.exports = new Attendence();
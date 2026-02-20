const Basepage = require("../Common/BasePage");
const BaseRoutes = require("../../api/EmergencyComms");


class EmergencyCommsPage extends Basepage {
    constructor() {
        super();
        this.emergencyCommsTab = 'a[href*="emergency-comms"]';
    }

    clickEmergencyCommsTab() {
        cy.contains("a", "Emergency Comms", { timeout: 10000 })
            .should("be.visible")
            .click();
    }

    clickCommsLogsTab() {
        cy.intercept("GET", BaseRoutes.CommsLogs).as("commsLogs");

        cy.contains("button", "View Logs")
            .should("be.visible")
            .click();

        cy.wait("@commsLogs");
        cy.contains("Communication Upload Logs").should("be.visible");
    }
}

module.exports = new EmergencyCommsPage();

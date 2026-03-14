const SettlementsPage = require("../../support/pages/COD/Settlements");
const AttendencePage = require("../../support/pages/COD/Attendence");
const PayoutsPage = require("../../support/pages/COD/Payouts");
const TemplatesPage = require("../../support/pages/COD/Templates");
const PayrollPage = require("../../support/pages/COD/Payroll");
const DeactivatedRidersPage = require("../../support/pages/COD/DeactivatedRiders");
const RidersPage = require("../../support/pages/COD/Riders");
const RedoLogsPage = require("../../support/pages/COD/RedoLogs");

describe("Settlements Smoke", { tags: '@smoke' }, () => {
    beforeEach(() => {
        cy.setupAndNavigate();
    });

    it("Verify Settlements Tab and other functionality", () => {
        SettlementsPage.ValidateRidersKPI();
        SettlementsPage.validateDarkstoresKPI();
        SettlementsPage.validateCompanyKPI();
        SettlementsPage.validateBrandsKPI();
    });

    it("Verify Attendence Tab and other functionality", () => {
        AttendencePage.validateAttendence();
    });

    it("Verify Payouts Tab and other functionality", () => {
        PayoutsPage.validatePayouts();
    });

    it("Verify Templates Tab and other functionality", () => {
        TemplatesPage.validateTemplates();
    });

    it("Verify Payroll Tab and other functionality", () => {
        PayrollPage.validatePayroll();
    });

    it("Verify Deactivated Riders Tab and other functionality", () => {
        DeactivatedRidersPage.validateDeactivatedRiders();
    });

    it("Verify Riders KYC Tab and other functionality", () => {
        RidersPage.validateRidersKYC();
    });

    it("Verify Redo Logs Tab and other functionality", () => {
        RedoLogsPage.validateRedoLogs();
    });

});


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

    it("Verify Settlement KPI data for Riders, Darkstores, Company, and Brands", () => {
        SettlementsPage.ValidateRidersKPI();
        SettlementsPage.validateDarkstoresKPI();
        SettlementsPage.validateCompanyKPI();
        SettlementsPage.validateBrandsKPI();
    });

    it("Verify Rider Attendance menu navigation and data loading", () => {
        AttendencePage.validateAttendence();
    });

    it("Verify Payouts Console access and summary data loading", () => {
        PayoutsPage.validatePayouts();
    });

    it("Verify access to the Create New Payroll Template module", () => {
        TemplatesPage.validateTemplates();
    });

    it("Verify Rider Payroll menu navigation and record visibility", () => {
        PayrollPage.validatePayroll();
    });

    it("Verify Deactivated Riders module access and data loading", () => {
        DeactivatedRidersPage.validateDeactivatedRiders();
    });

    it("Verify Riders KYC module navigation and data loading", () => {
        RidersPage.validateRidersKYC();
    });

    it("Verify Redo Logs module access and data loading", () => {
        RedoLogsPage.validateRedoLogs();
    });

});


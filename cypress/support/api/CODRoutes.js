const CODRoutes = {
    RidersKPI: /\/app\/api\/riders\/kpi\/.*/,
    DarkstoresKPI: /\/app\/api\/darkstores\/kpi\/.*/,
    CompanyKPI: /\/app\/api\/settlements\/company\/kpi\/.*/,
    BrandKPI: /\/app\/api\/brands\/kpi\/.*/,
    Attendence: /\/app\/api\/attendance\/riders\/?.*/,
    Payouts: /\/app\/api\/rider\/payout\/tracking\/?.*/,
    Templates: /\/app\/api\/templates\/?.*/,
    Payrolls: /\/app\/api\/payroll\/?.*/,
    DeactivateRider: /\/app\/api\/riders\/deactivated\/?.*/,
    RidersKYC: /\/app\/api\/riders\/kyc\/status\/?.*/,
    RedoLogs: /\/app\/api\/redo-logs\/?.*/
};

module.exports = CODRoutes;
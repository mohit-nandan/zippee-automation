const AuthRoutes = require("./api/authRoutes");

Cypress.Commands.add("loginSession", () => {

    cy.session("adminSession", () => {

        cy.request({
            method: "POST",
            url: AuthRoutes.login,
            body: {
                email: Cypress.env("adminUser"),
                password: Cypress.env("adminPass")
            }
        }).then((response) => {
            cy.log("Login Response: " + JSON.stringify(response.body));
            cy.setCookie("access_token", response.body.data.access, {
                domain: "staging.zfwhospitality.in"
            });

            cy.setCookie("refresh_token", response.body.data.refresh, {
                domain: "staging.zfwhospitality.in"
            });

        });

    });

});

Cypress.Commands.add("dbQuery", (query) => {
    return cy.task("queryDb", query);
});

Cypress.Commands.add("dbQueryWithRetry", (query, options = {}) => {
    const timeout = options.timeout || 30000;
    const interval = options.interval || 2000;
    const start = Date.now();

    const check = () => {
        return cy.task("queryDb", query).then((response) => {
            if (response && response.length > 0) {
                return response;
            }

            if (Date.now() - start > timeout) {
                throw new Error(`Database query timed out after ${timeout}ms: ${query}`);
            }

            return cy.wait(interval).then(check);
        });
    };

    return check();
});

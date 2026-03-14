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
            const baseUrl = Cypress.config("baseUrl") || "https://staging.zfwhospitality.in";
            let domain = new URL(baseUrl).hostname;

            if (domain === "localhost" || domain === "127.0.0.1") {
                domain = null;
            }

            cy.setCookie("access_token", response.body.data.access, {
                domain: domain
            });

            cy.setCookie("refresh_token", response.body.data.refresh, {
                domain: domain
            });
        });
    });
});

Cypress.Commands.add("setupAndNavigate", () => {
    cy.loginSession();
    cy.visit("/");
    cy.get('aside', { timeout: 30000 }).should('be.visible');
    cy.intercept('https://desk.zoho.in/**', { statusCode: 200, body: {} });
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

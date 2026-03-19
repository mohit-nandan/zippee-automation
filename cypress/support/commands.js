const AuthRoutes = require("./api/authRoutes");

Cypress.Commands.add("loginSession", () => {
    const env = (Cypress.env("environment") || "staging").toUpperCase();
    const routes = AuthRoutes[env] || AuthRoutes.STAGING;

    cy.session("adminSession", () => {
        const headers = {};
        if (Cypress.env("xApiKey")) {
            headers["x-api-key"] = Cypress.env("xApiKey");
        }

        cy.request({
            method: "POST",
            url: routes.login,
            headers: Object.keys(headers).length > 0 ? headers : undefined,
            body: {
                email: Cypress.env("adminUser"),
                password: Cypress.env("adminPass")
            }
        }).then((response) => {
            const baseUrl = Cypress.config("baseUrl") || "https://staging.zfwhospitality.in";
            let domain = new URL(baseUrl).hostname;

            if (domain === "localhost" || domain === "127.0.0.1") {
                domain = null;
            } else {
                const parts = domain.split(".");
                if (parts.length >= 2) {
                    domain = "." + parts.slice(-2).join(".");
                }
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
    cy.visit("/", { failOnStatusCode: false });
    
    // Log cookies for debugging if we still land on sign-in
    cy.getCookies().then((cookies) => {
        const tokens = cookies.filter(c => c.name.includes('token'));
        if (tokens.length === 0) {
            cy.log('WARNING: No tokens found in cookies!');
        } else {
            cy.log(`Tokens found: ${tokens.map(t => t.name).join(', ')}`);
        }
    });

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

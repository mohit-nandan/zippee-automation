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

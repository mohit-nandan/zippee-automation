const BasePage = require("../Common/BasePage");

class AdminLoginPage extends BasePage {

    constructor() {
        super();

        this.emailInput = '#email';
        this.passwordInput = 'input[name="password"]';
        this.loginBtn = 'button[type="submit"]';
    }

    login(email, password) {

        this.type(this.emailInput, email);

        cy.contains('button', 'Continue').click();

        this.waitForElement(this.passwordInput);

        this.type(this.passwordInput, password);

        cy.contains('button', 'Login').click();
    }


}

module.exports = new AdminLoginPage();

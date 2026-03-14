class BasePage {

    visit(url) {
        cy.visit(url);
    }

    click(selector) {
        cy.get(selector).click();
    }

    type(selector, value) {
        cy.get(selector).clear().type(value);
    }

    getElement(selector) {
        return cy.get(selector);
    }

    verifyText(selector, expectedText) {
        cy.get(selector).should('have.text', expectedText);
    }

    verifyPartialText(selector, partialText) {
        cy.get(selector).should('contain.text', partialText);
    }

    isVisible(selector) {
        cy.get(selector).should('be.visible');
    }

    isNotVisible(selector) {
        cy.get(selector).should('not.be.visible');
    }


    forceClick(selector) {
        cy.get(selector).click({ force: true });
    }

    check(selector) {
        cy.get(selector).check();
    }

    uncheck(selector) {
        cy.get(selector).uncheck();
    }

    selectOption(selector, value) {
        cy.get(selector).select(value);
    }

    hover(selector) {
        cy.get(selector).trigger('mouseover');
    }

    getTitle() {
        return cy.title();
    }

    getUrl() {
        return cy.url();
    }

    goBack() {
        cy.go('back');
    }

    reload() {
        cy.reload();
    }

    waitForElement(selector, timeout = 10000) {
        cy.get(selector, { timeout: timeout }).should('exist');
    }

    wait(ms) {
        cy.wait(ms);
    }

}

module.exports = BasePage;

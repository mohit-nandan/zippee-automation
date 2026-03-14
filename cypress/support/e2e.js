import "cypress-real-events/support";
import '@4tw/cypress-drag-drop';
import './commands';
import 'cypress-mochawesome-reporter/register';

const { register } = require('@cypress/grep');
register();

afterEach(function () {
    if (this.currentTest.state === 'passed') {
        const specName = Cypress.spec.name.split('/').pop().split('\\').pop();
        cy.screenshot(`${specName}/${this.currentTest.title} (Passed)`);
    }
});
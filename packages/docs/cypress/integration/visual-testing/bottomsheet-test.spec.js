import {  environment } from "../../../utils";
describe("Visual Regression Testing", () => {
  before(() => {
    cy.eyesOpen({
      appName: "Vuetify",
      testName: "bottomsheet page",
      browser: Object.assign(environment, {width: 800})
    });
    cy.visit("/bottom-sheets");
  });
  after(() => {
    cy.eyesClose();
  });

  it("check usage bottomsheet", () => {
    cy.get('[data-cy-btn=usage]').click();
    cy.get('.v-snack__content .v-icon').click({force: true});
    cy.wait(500);
    cy.eyesCheckWindow({
      sizeMode: "selector", //mode
      selector:".v-dialog__content.v-dialog__content--active"
    });
    cy.get('[data-cy-btn=usage]').click({force: true});
    cy.wait(500);
  });

  it("check example bottomsheet", () => {
    cy.get('[data-cy-btn=inset]').click();
    cy.eyesCheckWindow({
      sizeMode: "selector", //mode
      selector: ".v-dialog__content.v-dialog__content--active"
    });
    cy.get('[data-cy-btn=inset]').click({force: true});
    cy.wait(500);
  });
});
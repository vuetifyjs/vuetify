import {  environment } from "../../../util";
describe("Visual Regression Testing", () => {
  before(() => {
    cy.eyesOpen({
      appName: "Vuetify",
      testName: "chips group page",
      browser: environment
    });
    cy.visit("/Chip%20Groups");
  });
  after(() => {
    cy.eyesClose();
  });
  it("check simple chips", () => {
    cy.eyesCheckWindow({
      tag:'Simple Chips',
      sizeMode: "selector", //mode
      selector: '[data-cy-flex=simple]'
    });
  });

  it("check multiple chips", () => {
    cy.eyesCheckWindow({
      tag:'Multiple Chips',
      sizeMode: "selector", //mode
      selector: '[data-cy-flex=multiple]'
    });
  });

  it("check active class chips", () => {
    cy.get('[data-cy-flex=active]').each(function(chips){
      cy.wrap(chips).click();
    });
    cy.eyesCheckWindow({
      tag:'Active Class Chips',
      sizeMode: "selector", //mode
      selector: '[data-cy-flex=active]'
    });
  });

  it("check column chips", () => {
    cy.eyesCheckWindow({
      tag:'Column Chips',
      sizeMode: "selector", //mode
      selector: '[data-cy-flex=column]'
    });
  });
});
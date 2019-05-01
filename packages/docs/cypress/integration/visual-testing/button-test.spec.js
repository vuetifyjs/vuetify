import {  environment } from "../../../utils";
describe("Visual Regression Testing", () => {
  before(() => {
    cy.eyesOpen({
      appName: "Vuetify",
      testName: "buttons page",
      browser: environment
    });
    cy.visit("/buttons");
  });
  after(() => {
    cy.eyesClose();
  });
  it("check buttons page", () => {
    cy.eyesCheckWindow({
      sizeMode: "selector", //mode
      selector: ".container.page"
    });
  });
});
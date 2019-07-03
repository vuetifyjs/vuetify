import {  environment } from "../../../util";
describe("Visual Regression Testing", () => {
  before(() => {
    cy.eyesOpen({
      appName: "Vuetify",
      testName: "sheet page",
      browser: environment
    });
    cy.visit("/Sheets");
  });
  after(() => {
    cy.eyesClose();
  });
  it("check Sheets page", () => {
    cy.eyesCheckWindow({
      sizeMode: "selector", //mode
      selector: ".container"
    });
  });
});
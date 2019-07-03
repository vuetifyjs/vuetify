import {  environment } from "../../../util";
describe("Visual Regression Testing", () => {
  before(() => {
    cy.eyesOpen({
      appName: "Vuetify",
      testName: "avatar page",
      browser: environment
    });
    cy.visit("/Avatars");
  });
  after(() => {
    cy.eyesClose();
  });
  it("check Avatars page", () => {
    cy.eyesCheckWindow({
      sizeMode: "selector", //mode
      selector: ".container"
    });
  });
});
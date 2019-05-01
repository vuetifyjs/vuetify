import {  environment } from "../../../utils";
describe("Visual Regression Testing", () => {
  before(() => {
    cy.eyesOpen({
      appName: "Vuetify",
      testName: "tooltips page",
      browser: environment
    });
    cy.visit("/tooltips");
  });
  after(() => {
    cy.eyesClose();
  });

  it("check tooltip", () => {
    var tooltips = cy.get('[data-cy-btn=tooltip]');
    tooltips.each(tooltip => { 
      cy.wrap(tooltip).trigger("mouseenter");
      cy.wait(500);
      cy.eyesCheckWindow({
        sizeMode: "selector", //mode
        selector: ".container.page"
      });
      cy.wait(500);
      cy.wrap(tooltip).trigger("mouseleave");
    });
  });

});

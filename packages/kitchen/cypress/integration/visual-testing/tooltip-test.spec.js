import {  environment } from "../../../util";
describe("Visual Regression Testing", () => {
  before(() => {
    cy.eyesOpen({
      appName: "Vuetify",
      testName: "tooltip page",
      browser: environment
    });
    cy.visit("/Tooltips");
  });
  after(() => {
    cy.eyesClose();
  });

  it("check tooltip", () => {
    var tooltips = cy.get('[data-cy-btn=tooltip]');
    tooltips.each(tooltip => { 
      cy.wrap(tooltip).scrollIntoView();
      cy.wrap(tooltip).trigger("mouseenter",{force:true});
      cy.wait(500);
      cy.eyesCheckWindow({
        sizeMode: "selector", //mode
        selector: ".container"
      });
      cy.wait(500);
      cy.wrap(tooltip).trigger("mouseleave",{force:true});
    });
  });

});
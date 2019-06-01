import { environment } from "../../../util";
describe("Visual Regression Testing", () => {
  before(() => {
    cy.eyesOpen({
      appName: "Vuetify",
      testName: "Hover page",
      browser: environment
    });
    cy.visit("/Hover");
  });
  after(() => {
    cy.eyesClose();
  });

  it("check hover", () => {
    const cards = cy.get('[data-cy-flex=hover]');
    cards.each(cardElement => {
      const hover = cy.wrap(cardElement);
      hover.trigger("mouseenter");
      cy.wait(500);
      cy.eyesCheckWindow({
        sizeMode: "selector", //mode
        selector: '.container'
      });
      cy.wait(500);
      cy.wrap(cardElement).trigger("mouseleave",{force:true});
    })
  });
});

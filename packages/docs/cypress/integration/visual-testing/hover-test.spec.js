import { environment } from "../../../utils";
describe("Visual Regression Testing", () => {
  before(() => {
    cy.eyesOpen({
      appName: "Vuetify",
      testName: "hover page",
      browser: environment
    });
    cy.visit("/hover");
  });
  after(() => {
    cy.eyesClose();
  });

  it("check usage hover", () => {
    const cards = cy.get('[data-cy-card]');
    cards.each(cardElement => {
      const card = cy.wrap(cardElement);
      card.trigger("mouseenter");
      cy.wait(500);
      cy.eyesCheckWindow({
        sizeMode: "selector", //mode
        selector: '[data-cy-card='+ cardElement.attr('data-cy-card') +']'
      });
    })
  });
});

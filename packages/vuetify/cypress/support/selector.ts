/// <reference types="../../types/cypress" />

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args) as any
})

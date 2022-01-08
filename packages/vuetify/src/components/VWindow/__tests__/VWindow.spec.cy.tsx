/// <reference types="../../../../types/cypress" />

import { VWindow, VWindowItem } from '..'

describe('VWindow', () => {
  it('should render items', () => {
    cy.mount(() => (
      <VWindow>
        <VWindowItem>
          <div class="bg-grey text-white d-flex justify-center align-center">
            <h1>foo</h1>
          </div>
        </VWindowItem>
        <VWindowItem>
          <div class="bg-grey text-white d-flex justify-center align-center">
            <h1>bar</h1>
          </div>
        </VWindowItem>
      </VWindow>
    ))

    cy.get('.v-window-item').should('exist')
  })

  it('should render arrows', () => {
    cy.mount(() => (
      <VWindow showArrows>
        <VWindowItem>
          <div class="bg-grey text-white d-flex justify-center align-center">
            <h1>foo</h1>
          </div>
        </VWindowItem>
        <VWindowItem>
          <div class="bg-grey text-white d-flex justify-center align-center">
            <h1>bar</h1>
          </div>
        </VWindowItem>
        <VWindowItem>
          <div class="bg-grey text-white d-flex justify-center align-center">
            <h1>baz</h1>
          </div>
        </VWindowItem>
      </VWindow>
    ))

    cy.get('.v-window__controls > .v-btn').as('arrows')

    cy.get('@arrows').should('have.length', 1)

    cy.get('@arrows').eq(0).click()

    cy.get('.v-window__controls > .v-btn').as('arrows').should('have.length', 2)

    cy.get('@arrows').eq(1).click()

    cy.get('.v-window__controls > .v-btn').as('arrows').should('have.length', 1)
  })

  it('should wrap items when using continuous prop', () => {
    cy.mount(() => (
      <VWindow showArrows continuous>
        <VWindowItem>
          <div class="bg-grey text-white d-flex justify-center align-center">
            <h1>foo</h1>
          </div>
        </VWindowItem>
        <VWindowItem>
          <div class="bg-grey text-white d-flex justify-center align-center">
            <h1>bar</h1>
          </div>
        </VWindowItem>
      </VWindow>
    ))

    cy.get('.v-window-item--active h1').should('have.text', 'foo')

    cy.get('.v-window__controls > .v-btn').as('arrows')

    cy.get('@arrows').eq(0).click()

    cy.get('.v-window__controls > .v-btn').as('arrows')

    cy.get('.v-window-item--active h1').should('have.text', 'bar')

    cy.get('@arrows').eq(1).click()

    cy.get('.v-window-item--active h1').should('have.text', 'foo')
  })
})

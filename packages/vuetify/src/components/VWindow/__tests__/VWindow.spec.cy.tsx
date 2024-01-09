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
      .get('@arrows').should('have.length', 1)
      .get('@arrows').eq(0).click()
      .get('.v-window__controls > .v-btn').as('arrows').should('have.length', 2)
      .get('@arrows').eq(1).click()
      .get('.v-window__controls > .v-btn').as('arrows').should('have.length', 1)
  })

  it('should not wrap around by default', () => {
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
      </VWindow>
    ))

    cy.get('.v-window-item--active h1').should('have.text', 'foo')
      .get('.v-window__controls > .v-btn').as('arrows')
      .get('@arrows').should('have.length', 1)
      .get('@arrows').eq(0).click()
      .get('.v-window__controls > .v-btn').as('arrows')
      .get('.v-window-item--active h1').should('have.text', 'bar')
      .get('@arrows').should('have.length', 1)
      .get('@arrows').eq(0).click()
      .get('.v-window-item--active h1').should('have.text', 'foo')
  })

  it('should wrap around when using continuous prop', () => {
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
      .get('.v-window__controls > .v-btn').as('arrows')
      .get('@arrows').eq(0).click()
      .get('.v-window__controls > .v-btn').as('arrows')
      .get('.v-window-item--active h1').should('have.text', 'bar')
      .get('@arrows').eq(1).click()
      .get('.v-window-item--active h1').should('have.text', 'foo')
  })

  it('should emit new value when clicking arrows', () => {
    // For some reason wrapper.emitted() will not contain
    // the component events if it is the root element, so
    // wrap it in a div for now.
    cy.mount(() => (
      <div>
        <VWindow showArrows modelValue="two" onUpdate:modelValue={ undefined }>
          <VWindowItem value="one">
            <div class="bg-grey text-white d-flex justify-center align-center">
              <h1>foo</h1>
            </div>
          </VWindowItem>
          <VWindowItem value="two">
            <div class="bg-grey text-white d-flex justify-center align-center">
              <h1>bar</h1>
            </div>
          </VWindowItem>
          <VWindowItem value="three">
            <div class="bg-grey text-white d-flex justify-center align-center">
              <h1>baz</h1>
            </div>
          </VWindowItem>
        </VWindow>
      </div>
    ))

    cy.get('.v-window__controls > .v-btn').as('arrows')
      .get('@arrows').eq(0).click()
      .get('@arrows').eq(1).click()
      .emitted(VWindow, 'update:modelValue')
      .should('deep.equal', [['one'], ['three']])
  })

  it('should support touch control', () => {
    cy.mount(() => (
      <div>
        <VWindow>
          <VWindowItem value="one">
            <div class="bg-grey text-white d-flex justify-center align-center">
              <h1>foo</h1>
            </div>
          </VWindowItem>
          <VWindowItem value="two">
            <div class="bg-grey text-white d-flex justify-center align-center">
              <h1>bar</h1>
            </div>
          </VWindowItem>
        </VWindow>
      </div>
    ))

    cy.get('.v-window').swipe('left', 'right')
      // without continuous, we should not be able to swipe back if at first item
      .get('.v-window-item--active h1').should('have.text', 'foo')
      .get('.v-window').swipe('right', 'left')
      .get('.v-window-item--active h1').should('have.text', 'bar')
      .get('.v-window').swipe('right', 'left')
      // without continuous, we should not be able to swipe forward if at last item
      .get('.v-window-item--active h1').should('have.text', 'bar')
  })

  it('should support direction prop', () => {
    cy.mount(() => (
      <div>
        <VWindow showArrows direction="vertical">
          <VWindowItem value="one">
            <div class="bg-grey text-white d-flex justify-center align-center">
              <h1>foo</h1>
            </div>
          </VWindowItem>
          <VWindowItem value="two">
            <div class="bg-grey text-white d-flex justify-center align-center">
              <h1>bar</h1>
            </div>
          </VWindowItem>
        </VWindow>
      </div>
    ))

    cy.get('.v-window__controls > .v-btn').eq(0).click()
  })

  it('should skip disabled items', () => {
    cy.mount(() => (
      <div>
        <VWindow>
          <VWindowItem value="one">
            <div class="bg-grey text-white d-flex justify-center align-center">
              <h1>foo</h1>
            </div>
          </VWindowItem>
          <VWindowItem value="two" disabled>
            <div class="bg-grey text-white d-flex justify-center align-center">
              <h1>bar</h1>
            </div>
          </VWindowItem>
          <VWindowItem value="three">
            <div class="bg-grey text-white d-flex justify-center align-center">
              <h1>baz</h1>
            </div>
          </VWindowItem>
        </VWindow>
      </div>
    ))

    cy.get('.v-window').swipe('right', 'left')
      .get('.v-window-item--active h1').should('have.text', 'baz')
  })

  it('should disable touch support', () => {
    cy.mount(() => (
      <div>
        <VWindow touch={ false }>
          <VWindowItem value="one">
            <div class="bg-grey text-white d-flex justify-center align-center">
              <h1>foo</h1>
            </div>
          </VWindowItem>
          <VWindowItem value="two">
            <div class="bg-grey text-white d-flex justify-center align-center">
              <h1>bar</h1>
            </div>
          </VWindowItem>
        </VWindow>
      </div>
    ))

    cy.get('.v-window').swipe('right', 'left')
      .get('.v-window-item--active h1').should('have.text', 'foo')
  })
})

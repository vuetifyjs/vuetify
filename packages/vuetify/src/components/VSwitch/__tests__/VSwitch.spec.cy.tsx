/// <reference types="../../../../types/cypress" />

import { VSwitch } from '../VSwitch'

describe('VSwitch', () => {
  it('should display color correctly with explicit `color` prop', () => {
    const contextColor = 'rgb(200, 200, 200)'
    const color = 'rgb(255, 0, 0)'

    cy.mount(() => (

      <div style={{ color: contextColor }}>
        <VSwitch color={color} />
      </div>
    ))
      .get('.v-switch__thumb')
      .should('have.css', 'color', contextColor)
      .get('.v-switch__track')
      .should('have.css', 'color', contextColor)

    cy.percySnapshot('VSwitch - color prop - OFF')

    // turn switch ON
    cy.get('#switch-0').click()

    cy.get('.v-switch__thumb')
      .should('have.css', 'color', color)

      .get('.v-switch__track')
      .should('have.css', 'color', color)

    cy.percySnapshot('VSwitch - color prop - ON')
  })

  it('should display color correctly without `color` prop defined', () => {
    const contextColor = 'rgb(250, 250, 250)'

    cy.mount(() => (

      <div style={{ color: contextColor }}>
        <VSwitch />
      </div>
    ))
      .get('.v-switch__thumb')
      .should('have.css', 'color', contextColor)
      .get('.v-switch__track')
      .should('have.css', 'color', contextColor)

    cy.percySnapshot('VSwitch - color prop - OFF')

    // turn switch ON
    cy.get('#switch-0').click()

    cy.get('.v-switch__thumb')
      .should('have.css', 'color', contextColor)

      .get('.v-switch__track')
      .should('have.css', 'color', contextColor)

    cy.percySnapshot('VSwitch - color prop - ON')
  })
})

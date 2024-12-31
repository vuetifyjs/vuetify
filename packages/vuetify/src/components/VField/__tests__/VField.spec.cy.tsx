/// <reference types="../../../../types/cypress" />

// Components
import { VField } from '../'

describe('VField', () => {
  it('renders v-field__clearable when the clearable attribute is present', () => {
    cy.mount(() => (
      <VField clearable />
    )).get('.v-field__clearable').should('exist')
  })
  it('does not render v-field__clearable when disabled is specified, even with clearable', () => {
    cy.mount(() => (
      <VField clearable disabled />
    )).get('.v-field__clearable').should('not.exist')
  })
})

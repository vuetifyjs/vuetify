/// <reference types="../../../../types/cypress" />

import { VCombobox } from '../VCombobox'

describe('VCombobox', () => {
  it('supports arbitrary text', () => {
    cy.mount(() => (
      <VCombobox />
    ))
      .get('@wrapper')
      .click()
      .type('Hello world')
  })
})

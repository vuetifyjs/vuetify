/// <reference types="../../../../types/cypress" />

import { VChip } from '../'

describe('VChip', () => {
  it('should emit events when closed', () => {
    cy.mount(() => (
      <VChip closable>chip</VChip>
    ))

    cy.get('.v-chip__close')
      .click()
    cy.emitted(VChip)
      .then(emitted => {
        expect(emitted).to.have.property('click:close')
        expect(emitted).to.have.property('update:modelValue')
      })
  })

  it('should have aria-label', () => {
    cy.mount(({ closeLabel }: any) => (
      <VChip closable closeLabel={ closeLabel }>chip</VChip>
    ))

    cy.get('.v-chip__close')
      .should('have.attr', 'aria-label')
    cy.setProps({
      closeLabel: 'Hello',
    })
    cy.get('.v-chip__close')
      .should('have.attr', 'aria-label', 'Hello')
  })
})

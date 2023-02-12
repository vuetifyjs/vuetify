/// <reference types="../../../../types/cypress" />

import { VChip } from '../'

describe('VChip', () => {
  it('should emit events when closed', () => {
    cy.mount(() => (
      <VChip closable>chip</VChip>
    ))

    cy.get('.v-chip__close')
      .click()
      .vue()
      .then(({ wrapper }) => {
        const chip = wrapper.findComponent(VChip)
        const emits = chip.emitted()
        expect(emits).to.have.property('click:close')
        expect(emits).to.have.property('update:modelValue')
      })
  })

  it('should have aria-label', () => {
    cy.mount(({ closeLabel }: any) => (
      <VChip closable closeLabel={ closeLabel }>chip</VChip>
    ))

    cy.get('.v-chip__close')
      .should('have.attr', 'aria-label')
      .setProps({
        closeLabel: 'Hello',
      })
      .get('.v-chip__close')
      .should('have.attr', 'aria-label', 'Hello')
  })
})

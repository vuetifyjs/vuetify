/// <reference types="../../../../types/cypress" />

// Components
import { VChipGroup } from '..'
import { VChip } from '@/components/VChip'

describe('VChipGroup', () => {
  it('should supports color props', () => {
    cy.mount(() => (
      <VChipGroup color="red" selected-class="text-primary">
        <VChip>Chip</VChip>
      </VChipGroup>
    )).get('.v-chip')
      .should('have.class', 'text-red')
      .get('.v-chip')
      .click()
      .should('have.class', 'text-primary')
  })
})

/// <reference types="../../../../types/cypress" />

import { VForm } from '@/components'
import { VAutocomplete } from '../VAutocomplete'

describe('VAutocomplete', () => {
  it('should close only first chip', () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

    const selectedItems = ['Item 1', 'Item 2', 'Item 3']

    cy.mount(() => (
      <VAutocomplete
        items={items}
        modelValue={selectedItems}
        chips
        closableChips
        multiple
      />
    ))
      .get('.v-chip__close')
      .eq(0)
      .click()
      .get('input')
      .get('.v-chip')
      .should('have.length', 2)
  })

  it('should not be clickable when in readonly', () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

    const selectedItems = 'Item 1'

    cy.mount(() => (
      <VAutocomplete
        items={items}
        modelValue={selectedItems}
        readonly
      />
    ))

    cy.get('.v-autocomplete')
      .click()
      .get('.v-list-item').should('have.length', 0)
      .get('.v-select--active-menu').should('have.length', 0)

    cy
      .get('.v-autocomplete input')
      .focus()
      .type('{downarrow}', { force: true })
      .get('.v-list-item').should('have.length', 0)
      .get('.v-select--active-menu').should('have.length', 0)
  })

  it('should not be clickable when in readonly form', () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

    const selectedItems = 'Item 1'

    cy.mount(() => (
      <VForm readonly>
        <VAutocomplete
          items={items}
          modelValue={selectedItems}
          readonly
        />
      </VForm>
    ))

    cy.get('.v-autocomplete')
      .click()
      .get('.v-list-item').should('have.length', 0)
      .get('.v-select--active-menu').should('have.length', 0)

    cy
      .get('.v-autocomplete input')
      .focus()
      .type('{downarrow}', { force: true })
      .get('.v-list-item').should('have.length', 0)
      .get('.v-select--active-menu').should('have.length', 0)
  })
})

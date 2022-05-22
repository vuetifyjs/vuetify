/// <reference types="../../../../types/cypress" />

import { VAutocomplete } from '..'

// Tests
describe('VAutocomplete', () => {
  describe('Item list', () => {
    it('shows selected item when items are strings', () => {
      const items = ['foo', 'bar', 'baz']
      const value = 'foo'
      cy.mount((
          <VAutocomplete items={items} modelValue={value}>
            </VAutocomplete>
      )).get('.v-autocomplete__selection-text').should('have.text', value)
    })

    it('shows selected item when items are objectes', () => {
      const items = [{ title: 'foo', value: 1 }, { title: 'bar', value: 2 }, { title: 'baz', value: 3 }]
      const value = 2
      cy.mount(() => (
        <>
          <VAutocomplete items={items} modelValue={value}>
            </VAutocomplete>
        </>
      ))
      cy.get('.v-autocomplete__selection-text').should('have.text', 'bar')
      cy.get('.v-field__input').click()
      cy.get('input').should('have.value', 'bar')
    })

    it('can select from unselected state', () => {
      const items = [{ title: 'foo', value: 1 }, { title: 'bar', value: 2 }, { title: 'baz', value: 3 }]
      cy.mount(() => (
        <>
          <VAutocomplete items={items}>
            </VAutocomplete>
        </>
      ))
      cy.get('.v-autocomplete__selection-text').should('not.exist')
      cy.get('.v-field__input').click()
      cy.get('input').should('have.value', '')
      cy.contains('baz').click()
      cy.vue().emitted('.v-autocomplete', 'update:modelValue').should('deep.equal', [[3]])
      cy.get('.v-autocomplete__selection-text').should('have.text', 'baz')
    })
  })
})

/// <reference types="../../../../types/cypress" />

import { VCombobox } from '../VCombobox'

describe('VCombobox', () => {
  describe('search', () => {
    it('should filter items', () => {
      const items = [
        'Item 1',
        'Item 1a',
        'Item 2',
        'Item 2a',
      ]

      cy.mount(() => (
        <VCombobox items={items} />
      ))
        .get('input')
        .type('Item')
        .get('.v-list-item')
        .should('have.length', 4)
        .get('input')
        .clear()
        .type('Item 1')
        .get('.v-list-item')
        .should('have.length', 2)
        .get('input')
        .clear()
        .type('Item 3')
        .should('have.length', 1)
    })

    it('should filter items when using multiple', () => {
      const items = [
        'Item 1',
        'Item 1a',
        'Item 2',
        'Item 2a',
      ]

      cy.mount(() => (
        <VCombobox items={items} multiple />
      ))
        .get('input')
        .type('Item')
        .get('.v-list-item')
        .should('have.length', 4)
        .get('input:first-child')
        .clear()
        .type('Item 1')
        .get('.v-list-item')
        .should('have.length', 2)
        .get('input:first-child')
        .clear()
        .type('Item 3')
        .should('have.length', 1)
    })
  })
})

/// <reference types="../../../../types/cypress" />

import { VCombobox } from '../VCombobox'

describe('VCombobox', () => {
  describe('search', () => {
    it('should find one entry and put it in list item', () => {
      const items = [
        'Item 1',
        'Item 2',
      ]
      cy.mount(() => (
        <VCombobox items={items} />
      ))
        .get('input')
        .click()
        .type('1')
        .get('.v-list-item')
        .should('have.length', 1)
    })
    it('should find all entries and put them in list item', () => {
      const items = [
        'Item 1',
        'Item 2',
      ]
      cy.mount(() => (
        <VCombobox items={items} />
      ))
        .get('input')
        .click()
        .type('Item')
        .get('.v-list-item')
        .should('have.length', 2)
    })
    it('should not find unexisting entry', () => {
      const items = [
        'Item 1',
        'Item 2',
      ]
      cy.mount(() => (
        <VCombobox items={items} />
      ))
        .get('input')
        .click()
        .type('3')
        .get('.v-list-item')
        .should('not.exist')
    })
  })
})

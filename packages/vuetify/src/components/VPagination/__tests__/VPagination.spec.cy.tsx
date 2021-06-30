/// <reference types="../../../../types/cypress" />

// Components
import { VPagination } from '..'
import { VLocaleProvider } from '@/components/VLocaleProvider'

// Utilities
import { keyValues } from '@/util'

describe('VPagination', () => {
  it('should render set length', () => {
    cy.mount(() => (
      <VPagination length="3" />
    ))

    cy.getBySel('v-pagination-item').should('have.length', 3)
  })

  it('should react to mouse navigation', () => {
    cy.mount(() => (
      <VPagination length="3" />
    ))

    cy.getBySel('v-pagination-item').eq(1).find('.v-btn').trigger('click')

    cy.getBySel('v-pagination-item').eq(1).should('have.class', 'v-pagination__item--is-active')

    cy.getBySel('v-pagination-next').find('.v-btn').trigger('click')

    cy.getBySel('v-pagination-item').eq(2).should('have.class', 'v-pagination__item--is-active')

    cy.getBySel('v-pagination-prev').find('.v-btn').trigger('click')
    cy.getBySel('v-pagination-prev').find('.v-btn').trigger('click')

    cy.getBySel('v-pagination-item').eq(0).should('have.class', 'v-pagination__item--is-active')
  })

  it('should react to keyboard navigation', () => {
    cy.mount(() => (
      <VPagination length="3" model-value={2} />
    ))

    cy.getBySel('v-pagination-item').first().find('.v-btn').focus()

    cy.getBySel('v-pagination-root').trigger('keydown', { key: keyValues.left })

    cy.getBySel('v-pagination-item').first().should('have.class', 'v-pagination__item--is-active')

    cy.getBySel('v-pagination-root').trigger('keydown', { key: keyValues.right })
    cy.getBySel('v-pagination-root').trigger('keydown', { key: keyValues.right })

    cy.getBySel('v-pagination-item').last().should('have.class', 'v-pagination__item--is-active')
  })

  it('should render offset pages when using start prop', () => {
    cy.mount(() => (
      <VPagination length="3" start="3" />
    ))

    cy.getBySel('v-pagination-item').eq(0).should('have.text', '3')
    cy.getBySel('v-pagination-item').eq(1).should('have.text', '4')
    cy.getBySel('v-pagination-item').eq(2).should('have.text', '5')
  })

  it('should render disabled buttons when length is zero', () => {
    cy.mount(() => (
      <VPagination length="0" />
    ))

    cy.getBySel('v-pagination-prev').find('.v-btn').should('have.attr', 'disabled')
    cy.getBySel('v-pagination-next').find('.v-btn').should('have.attr', 'disabled')
  })

  it('should only render set number of visible items', () => {
    cy.mount(() => (
      <VPagination length="100" total-visible="5" />
    ))

    cy.getBySel('v-pagination-item').should('have.length', 5)
  })

  it('should limit items when not enough space', () => {
    cy.mount(() => (
      <VPagination length="100" />
    ))

    cy.getBySel('v-pagination-item').should('have.length', 8)
  })

  it('should render in RTL mode', () => {
    cy.mount(() => (
      <VLocaleProvider rtl>
        <VPagination length="5" />
      </VLocaleProvider>
    ))
  })
})

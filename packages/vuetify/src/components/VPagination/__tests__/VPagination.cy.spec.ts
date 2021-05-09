/// <reference types="cypress" />
import { createVuetify } from '@/entry-bundler'
import { keyCodes } from '@/util'
import { mount } from '@cypress/vue'
import VPagination from '../VPagination'

describe('VPagination', () => {
  const vuetify = createVuetify()

  it('should render set length', () => {
    mount(VPagination, {
      props: {
        length: 3,
      },
      global: {
        plugins: [vuetify],
      },
    })

    cy.getBySel('item').should('have.length', 3)
  })

  it('should react to mouse navigation', () => {
    mount(VPagination, {
      props: {
        length: 3,
      },
      global: {
        plugins: [vuetify],
      },
    })

    cy.getBySel('item').eq(1).find('.v-btn').trigger('click')

    cy.getBySel('item').eq(1).should('have.class', 'v-pagination__item--selected')

    cy.getBySel('next').find('.v-btn').trigger('click')

    cy.getBySel('item').eq(2).should('have.class', 'v-pagination__item--selected')

    cy.getBySel('prev').find('.v-btn').trigger('click')
    cy.getBySel('prev').find('.v-btn').trigger('click')

    cy.getBySel('item').eq(0).should('have.class', 'v-pagination__item--selected')
  })

  it('should react to keyboard navigation', () => {
    mount(VPagination, {
      props: {
        modelValue: 2,
        length: 3,
      },
      global: {
        plugins: [vuetify],
      },
    })

    cy.getBySel('item').first().find('.v-btn').focus()

    cy.getBySel('root').trigger('keydown', { keyCode: keyCodes.left })

    cy.getBySel('item').first().should('have.class', 'v-pagination__item--selected')

    cy.getBySel('root').trigger('keydown', { keyCode: keyCodes.right })
    cy.getBySel('root').trigger('keydown', { keyCode: keyCodes.right })

    cy.getBySel('item').last().should('have.class', 'v-pagination__item--selected')
  })
})

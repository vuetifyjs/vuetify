/// <reference types="../../../../types/cypress" />

// Components
import { VPagination } from '..'
import { VLocaleProvider } from '@/components/VLocaleProvider'

// Utilities
import { defineComponent, ref } from 'vue'
import { keyValues } from '@/util'

describe('VPagination', () => {
  it('should render set length', () => {
    cy.mount(() => (
      <VPagination length={ 3 } />
    ))

    cy.get('.v-pagination__item').should('have.length', 3)
  })

  it('should react to mouse navigation', () => {
    cy.mount(() => (
      <VPagination length={ 3 } />
    ))

    cy.get('.v-pagination__item').eq(1).find('.v-btn').trigger('click')

    cy.get('.v-pagination__item').eq(1).should('have.class', 'v-pagination__item--is-active')

    cy.get('.v-pagination__next').find('.v-btn').trigger('click')

    cy.get('.v-pagination__item').eq(2).should('have.class', 'v-pagination__item--is-active')

    cy.get('.v-pagination__prev').find('.v-btn').trigger('click')
    cy.get('.v-pagination__prev').find('.v-btn').trigger('click')

    cy.get('.v-pagination__item').eq(0).should('have.class', 'v-pagination__item--is-active')
  })

  it('should react to keyboard navigation', () => {
    cy.mount(defineComponent(() => {
      const model = ref(2)
      return () => <VPagination v-model={ model.value } length={ 3 } />
    }))

    cy.get('.v-pagination__item').first().find('.v-btn').focus()

    cy.get('.v-pagination').trigger('keydown', { key: keyValues.left })

    cy.get('.v-pagination__item').first().should('have.class', 'v-pagination__item--is-active')

    cy.get('.v-pagination').trigger('keydown', { key: keyValues.right })
    cy.get('.v-pagination').trigger('keydown', { key: keyValues.right })

    cy.get('.v-pagination__item').last().should('have.class', 'v-pagination__item--is-active')
  })

  it('should render offset pages when using start prop', () => {
    cy.mount(() => (
      <VPagination length="3" start="3" />
    ))

    cy.get('.v-pagination__item .v-btn').eq(0).should('have.text', '3')
    cy.get('.v-pagination__item .v-btn').eq(1).should('have.text', '4')
    cy.get('.v-pagination__item .v-btn').eq(2).should('have.text', '5')
  })

  it('should render disabled buttons when length is zero', () => {
    cy.mount(() => (
      <VPagination length="0" />
    ))

    cy.get('.v-pagination__prev').find('.v-btn').should('have.attr', 'disabled')
    cy.get('.v-pagination__next').find('.v-btn').should('have.attr', 'disabled')
  })

  it('should only render set number of visible items', () => {
    cy.mount(() => (
      <VPagination length="100" total-visible="5" />
    ))

    // 5 buttons and 1 ellipsis
    cy.get('.v-pagination__item').should('have.length', 6)
  })

  it('should limit items when not enough space', () => {
    cy.viewport(500, 500)

    cy.mount(() => (
      <VPagination length="100" />
    ))

    cy.get('.v-pagination__item').should('have.length', 6)
  })

  it('should render in RTL mode', () => {
    cy.mount(() => (
      <VLocaleProvider rtl>
        <VPagination length="5" />
      </VLocaleProvider>
    ))
  })

  it('should use color props', () => {
    cy.mount(() => (
      <VPagination color="error" activeColor="success" length="5" />
    ))
      .get('.v-btn').eq(0).should('have.class', 'text-error')
      .get('.v-btn').eq(1).should('have.class', 'text-success')
  })

  it('should work with 2 total visible items', () => {
    cy.mount(() => (
      <VPagination length="10" totalVisible="2" />
    ))

    cy.get('.v-pagination__item').should('have.length', 3)
    cy.get('.v-pagination__item').eq(0).should('have.text', '1')
    cy.get('.v-pagination__item').eq(2).should('have.text', '10')

    cy.get('.v-pagination__next').click()

    cy.get('.v-pagination__item').should('have.length', 5)
    cy.get('.v-pagination__item').eq(0).should('have.text', '1')
    cy.get('.v-pagination__item').eq(2).should('have.text', '2')
    cy.get('.v-pagination__item').eq(4).should('have.text', '10')

    cy.get('.v-pagination__item').eq(4).click()

    cy.get('.v-pagination__item').should('have.length', 3)
    cy.get('.v-pagination__item').eq(0).should('have.text', '1')
    cy.get('.v-pagination__item').eq(2).should('have.text', '10')

    cy.get('.v-pagination__prev').click()

    cy.get('.v-pagination__item').should('have.length', 5)
    cy.get('.v-pagination__item').eq(0).should('have.text', '1')
    cy.get('.v-pagination__item').eq(2).should('have.text', '9')
    cy.get('.v-pagination__item').eq(4).should('have.text', '10')
  })

  it('should work with even total visible items', () => {
    cy.mount(() => (
      <VPagination length="10" totalVisible="4" />
    ))

    cy.get('.v-pagination__item').should('have.length', 5)
    cy.get('.v-pagination__item').eq(0).should('have.text', '1')
    cy.get('.v-pagination__item').eq(1).should('have.text', '2')
    cy.get('.v-pagination__item').eq(2).should('have.text', '3')
    cy.get('.v-pagination__item').eq(4).should('have.text', '10')

    cy.get('.v-pagination__next').click()

    cy.get('.v-pagination__item').should('have.length', 5)
    cy.get('.v-pagination__item').eq(0).should('have.text', '1')
    cy.get('.v-pagination__item').eq(1).should('have.text', '2')
    cy.get('.v-pagination__item').eq(2).should('have.text', '3')
    cy.get('.v-pagination__item').eq(4).should('have.text', '10')

    cy.get('.v-pagination__item').eq(4).click()

    cy.get('.v-pagination__item').should('have.length', 5)
    cy.get('.v-pagination__item').eq(0).should('have.text', '1')
    cy.get('.v-pagination__item').eq(2).should('have.text', '8')
    cy.get('.v-pagination__item').eq(3).should('have.text', '9')
    cy.get('.v-pagination__item').eq(4).should('have.text', '10')

    cy.get('.v-pagination__prev').click()

    cy.get('.v-pagination__item').should('have.length', 5)
    cy.get('.v-pagination__item').eq(0).should('have.text', '1')
    cy.get('.v-pagination__item').eq(2).should('have.text', '8')
    cy.get('.v-pagination__item').eq(3).should('have.text', '9')
    cy.get('.v-pagination__item').eq(4).should('have.text', '10')
  })

  it('should work with odd total visible items', () => {
    cy.mount(() => (
      <VPagination length="10" totalVisible="3" />
    ))

    cy.get('.v-pagination__item').should('have.length', 4)
    cy.get('.v-pagination__item').eq(0).should('have.text', '1')
    cy.get('.v-pagination__item').eq(1).should('have.text', '2')
    cy.get('.v-pagination__item').eq(3).should('have.text', '10')

    cy.get('.v-pagination__next').click()
    cy.get('.v-pagination__item').should('have.length', 4)
    cy.get('.v-pagination__next').click()

    cy.get('.v-pagination__item').should('have.length', 5)
    cy.get('.v-pagination__item').eq(0).should('have.text', '1')
    cy.get('.v-pagination__item').eq(2).should('have.text', '3')
    cy.get('.v-pagination__item').eq(4).should('have.text', '10')

    cy.get('.v-pagination__item').eq(4).click()

    cy.get('.v-pagination__item').should('have.length', 4)
    cy.get('.v-pagination__item').eq(0).should('have.text', '1')
    cy.get('.v-pagination__item').eq(2).should('have.text', '9')
    cy.get('.v-pagination__item').eq(3).should('have.text', '10')

    cy.get('.v-pagination__prev').click()
    cy.get('.v-pagination__item').should('have.length', 4)
    cy.get('.v-pagination__prev').click()

    cy.get('.v-pagination__item').should('have.length', 5)
    cy.get('.v-pagination__item').eq(0).should('have.text', '1')
    cy.get('.v-pagination__item').eq(2).should('have.text', '8')
    cy.get('.v-pagination__item').eq(4).should('have.text', '10')
  })
})

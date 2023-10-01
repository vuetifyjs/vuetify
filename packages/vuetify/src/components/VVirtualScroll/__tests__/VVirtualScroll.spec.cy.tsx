/// <reference types="../../../../types/cypress" />

// Components
import { VVirtualScroll } from '../VVirtualScroll'

// Utilities
import { createRange } from '@/util'

describe('VVirtualScroll', () => {
  it('only renders visible items', () => {
    const items = createRange(1000)

    cy.mount(() => (
      <VVirtualScroll height="400" items={ items } itemHeight="24">
        {{
          default: ({ item, index }) => (
            <div>{ index }</div>
          ),
        }}
      </VVirtualScroll>
    ))

    cy.get('.v-virtual-scroll__item').should('have.length', 28)
  })

  it('reuses the same elements', () => {
    const items = createRange(1000)

    cy.mount(() => (
      <VVirtualScroll height="400" items={ items } itemHeight="24">
        {{
          default: ({ item, index }) => (
            <div>{ index }</div>
          ),
        }}
      </VVirtualScroll>
    ))

    cy.get('.v-virtual-scroll__item').contains('15')
      .then($el => {
        cy.get('.v-virtual-scroll').scrollTo(0, 320, { duration: 50 })
        cy.get('.v-virtual-scroll__item').contains('15').then($el2 => {
          expect($el2[0]).to.equal($el[0])
        })
      })
  })

  // https://github.com/vuetifyjs/vuetify/issues/18198
  it('should correctly render visible items when item is beyond container', () => {
    const items = createRange(1000)

    cy.mount(() => (
      <VVirtualScroll height="500" items={ items } itemHeight="1200">
        {{
          default: ({ item, index }) => (
            <div style="height: 1200px">{ index }</div>
          ),
        }}
      </VVirtualScroll>
    ))

    cy.get('.v-virtual-scroll__item').should('have.length', 2)
    cy.get('.v-virtual-scroll').scrollTo(0, 1900, { duration: 500 })
    cy.get('.v-virtual-scroll__item').contains('2').should('not.exist') // scroll to bottom of item 1, item 2 hasn't been rendered
    cy.get('.v-virtual-scroll').scrollTo(0, 1901, { duration: 500 })
    cy.get('.v-virtual-scroll__item').contains('2').should('exist')
    cy.get('.v-virtual-scroll__item').should('have.length', 2)

    // scroll to index 998
    cy.get('.v-virtual-scroll').scrollTo(0, 1198300, { duration: 500 })
    cy.get('.v-virtual-scroll__item').contains('999').should('not.exist')
    cy.get('.v-virtual-scroll').scrollTo(0, 1198301, { duration: 500 })
    cy.get('.v-virtual-scroll__item').contains('999').should('exist')
    cy.get('.v-virtual-scroll__item').should('have.length', 2)
  })
})

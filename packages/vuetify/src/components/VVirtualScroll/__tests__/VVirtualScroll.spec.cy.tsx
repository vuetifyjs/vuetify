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

    cy.get('.v-virtual-scroll__item').should('have.length', 30)
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
})

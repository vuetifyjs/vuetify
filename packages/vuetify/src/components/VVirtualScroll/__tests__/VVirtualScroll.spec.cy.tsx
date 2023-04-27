/// <reference types="../../../../types/cypress" />

import { createRange } from '@/util'
import { VVirtualScroll } from '../VVirtualScroll'

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
})

/// <reference types="../../../../types/cypress" />

import { createRange } from '@/util'
import { VVirtualScroll } from '../VVirtualScroll'

describe('VVirtualScroll', () => {
  it('should only render visible items', () => {
    const items = createRange(1000)

    cy.mount(({ visibleItems = 30 }: { visibleItems: number }) => (
      <VVirtualScroll height="400" items={ items } itemHeight="24" visibleItems={ visibleItems }>
        {{
          default: ({ item, index }) => (
            <div>{ index }</div>
          ),
        }}
      </VVirtualScroll>
    ))

    cy.get('.v-virtual-scroll__item').should('have.length', 30)

    cy.vue().then(wrapper => {
      wrapper.setProps({ visibleItems: 20 })
    })

    cy.get('.v-virtual-scroll__item').should('have.length', 20)
  })
})

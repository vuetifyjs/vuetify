/// <reference types="../../../../types/cypress" />

// Components
import { VInfiniteScroll } from '../VInfiniteScroll'

// Utilities
import { ref } from 'vue'
import { createRange } from '@/util'

// Constants
const SCROLL_OPTIONS = { ensureScrollable: true, duration: 300 }

describe('VInfiniteScroll', () => {
  it('should call load function when scrolled', () => {
    const load = cy.spy().as('load')
    const items = createRange(50)

    cy.mount(() => (
      <VInfiniteScroll height="400" onLoad={ load }>
        { items.map(item => (
          <div class="pa-2">{ item }</div>
        ))}
      </VInfiniteScroll>
    ))
      .get('.v-infinite-scroll').scrollTo('bottom', SCROLL_OPTIONS)
      .get('.v-infinite-scroll .v-progress-circular').should('exist')
      .get('@load').should('have.been.calledOnce')
  })

  it('should work when using start side', () => {
    const load = cy.spy().as('load')
    const items = createRange(50)

    cy.mount(() => (
      <VInfiniteScroll height="400" onLoad={ load } side="start">
        { items.map(item => (
          <div class="pa-2">{ item }</div>
        ))}
      </VInfiniteScroll>
    ))
      .get('.v-infinite-scroll').scrollTo('top', SCROLL_OPTIONS)
      .get('.v-infinite-scroll .v-progress-circular').should('exist')
      .get('@load').should('have.been.calledOnce')
  })

  it('should work when using both sides', () => {
    const load = cy.spy().as('load')
    const items = createRange(50)

    cy.mount(() => (
      <VInfiniteScroll height="400" onLoad={ load } side="both">
        { items.map(item => (
          <div class="pa-2">{ item }</div>
        ))}
      </VInfiniteScroll>
    ))
      .get('.v-infinite-scroll').scrollTo('top', SCROLL_OPTIONS)
      .get('.v-infinite-scroll .v-progress-circular').eq(0).should('exist')
      .get('@load').should('have.been.calledOnce')
      .get('.v-infinite-scroll').scrollTo('bottom', SCROLL_OPTIONS)
      .get('.v-infinite-scroll .v-progress-circular').eq(1).should('exist')
      .get('@load').should('have.been.calledTwice')
  })

  it('should support horizontal direction', () => {
    const load = cy.spy().as('load')
    const items = createRange(50)

    cy.mount(() => (
      <VInfiniteScroll onLoad={ load } direction="horizontal">
        { items.map(item => (
          <div class="pa-2">{ item }</div>
        ))}
      </VInfiniteScroll>
    ))
      .get('.v-infinite-scroll').scrollTo('right', SCROLL_OPTIONS)
      .get('.v-infinite-scroll .v-progress-circular').should('exist')
      .get('@load').should('have.been.calledOnce')
  })

  // https://github.com/vuetifyjs/vuetify/issues/17358
  it('should keep triggering load logic until VInfiniteScrollIntersect disappears', () => {
    const loadTracker = cy.spy().as('loadTracker')
    const items = ref(Array.from({ length: 3 }, (k, v) => v + 1))

    const load = async ({ done }: any) => {
      setTimeout(() => {
        items.value.push(...Array.from({ length: 3 }, (k, v) => v + items.value.at(-1)! + 1))
        loadTracker()
        done('ok')
      }, 100)
    }

    cy.viewport(400, 200)
      .mount(() => (
        <VInfiniteScroll onLoad={ load } mode="intersect">
          { items.value.map(item => (
            <div>Item #{ item }</div>
          ))}
        </VInfiniteScroll>
      ))
      .get('.v-infinite-scroll .v-progress-circular').should('exist')
      .get('@loadTracker').should('have.been.calledTwice')
  })
})

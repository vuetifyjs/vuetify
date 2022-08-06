/// <reference types="../../../../types/cypress" />

import { createRange } from '@/util'
import { VInfiniteScroll } from '../VInfiniteScroll'

describe('VInfiniteScroll', () => {
  it('should call load function when scrolled', () => {
    const load = cy.spy().as('load')
    const items = createRange(50)

    // TODO: Find a better way of waiting for the function call :/
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.mount(() => (
      <VInfiniteScroll height="400" load={ load }>
        { items.map(item => (
          <div class="pa-2">{ item }</div>
        ))}
      </VInfiniteScroll>
    ))
      .get('.v-infinite-scroll').scrollTo('bottom')
      .wait(1)
      .get('.v-infinite-scroll .v-progress-circular').should('exist')
      .then(() => {
        expect(load).to.be.calledOnce
      })
  })

  it('should work when using start side', () => {
    const load = cy.spy().as('load')
    const items = createRange(50)

    // TODO: Find a better way of waiting for the function call :/
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.mount(() => (
      <VInfiniteScroll height="400" load={ load } side="start">
        { items.map(item => (
          <div class="pa-2">{ item }</div>
        ))}
      </VInfiniteScroll>
    ))
      .get('.v-infinite-scroll').scrollTo('top')
      .wait(1)
      .get('.v-infinite-scroll .v-progress-circular').should('exist')
      .then(() => {
        expect(load).to.be.calledOnce
      })
  })

  it('should work when using both sides', () => {
    const load = cy.spy().as('load')
    const items = createRange(50)

    // TODO: Find a better way of waiting for the function call :/
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.mount(() => (
      <VInfiniteScroll height="400" load={ load } side="both">
        { items.map(item => (
          <div class="pa-2">{ item }</div>
        ))}
      </VInfiniteScroll>
    ))
      .get('.v-infinite-scroll').scrollTo('top')
      .wait(1)
      .get('.v-infinite-scroll .v-progress-circular').eq(0).should('exist')
      .then(() => {
        expect(load).to.be.calledOnce
      })
      .get('.v-infinite-scroll').scrollTo('bottom')
      .wait(1)
      .get('.v-infinite-scroll .v-progress-circular').eq(1).should('exist')
      .then(() => {
        expect(load).to.be.calledTwice
      })
  })

  it('should support horizontal direction', () => {
    const load = cy.spy().as('load')
    const items = createRange(50)

    // TODO: Find a better way of waiting for the function call :/
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.mount(() => (
      <VInfiniteScroll load={ load } direction="horizontal">
        { items.map(item => (
          <div class="pa-2">{ item }</div>
        ))}
      </VInfiniteScroll>
    ))
      .get('.v-infinite-scroll').scrollTo('right')
      .wait(1)
      .get('.v-infinite-scroll .v-progress-circular').should('exist')
      .then(() => {
        expect(load).to.be.calledOnce
      })
  })
})

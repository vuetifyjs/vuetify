/// <reference types="../../../../types/cypress" />

import { VLayout } from '@/components/VLayout'
import { VAppBar } from '..'

describe('VAppBar', () => {
  it('should allow custom height', () => {
    cy.mount(() => (
      <VLayout>
        <VAppBar height="200" />
      </VLayout>
    ))

    cy.get('.v-app-bar').should('have.css', 'height', '200px')
  })

  it('should support density', () => {
    cy.mount(({ density }: any) => (
      <VLayout>
        <VAppBar density={density} />
      </VLayout>
    ))

    cy.get('.v-app-bar').should('have.css', 'height', '64px')

    cy.vue().then(wrapper => wrapper.setProps({ density: 'prominent' }))

    cy.get('.v-app-bar').should('have.css', 'height', '128px')

    cy.vue().then(wrapper => wrapper.setProps({ density: 'comfortable' }))

    cy.get('.v-app-bar').should('have.css', 'height', '56px')

    cy.vue().then(wrapper => wrapper.setProps({ density: 'compact' }))

    cy.get('.v-app-bar').should('have.css', 'height', '48px')
  })

  it('should support hide-on-scroll', () => {
    cy.mount(() => (
      <VLayout>
        <VAppBar hide-on-scroll scroll-threshold="0" style="position: fixed" />
        <div class="content" style="min-height: 200vh; font-size: 64px">
          <div>content</div>
          <div>content</div>
        </div>
      </VLayout>
    ))

    // HACK: force cypress to wait for the page to be scrollable
    cy.get('.content').should('be.visible')

    cy.get('.v-app-bar').should('be.visible')

    cy.scrollTo(0, 100, { ensureScrollable: true, duration: 200 })

    cy.get('.v-app-bar').should('not.be.visible')
  })

  it('should support hide-on-scroll with inverted', () => {
    cy.mount(() => (
      <VLayout>
        <VAppBar hide-on-scroll inverted-scroll scroll-threshold="0" />
        <div class="content" style="min-height: 200vh; font-size: 64px">
          <div>content</div>
          <div>content</div>
        </div>
      </VLayout>
    ))

    // HACK: force cypress to wait for the page to be scrollable
    cy.get('.content').should('be.visible')

    cy.get('.v-app-bar').should('not.be.visible')

    cy.scrollTo(0, 100, { ensureScrollable: true, duration: 200 })

    cy.get('.v-app-bar').should('be.visible')
  })

  it('should not wait until scroll to update active state', () => {
    cy.mount(({ invertedScroll }: any) => (
      <VLayout>
        <VAppBar hide-on-scroll inverted-scroll={invertedScroll} scroll-threshold="0" />
        <div class="content" style="min-height: 200vh; font-size: 64px">
          <div>content</div>
          <div>content</div>
        </div>
      </VLayout>
    ))

    // HACK: force cypress to wait for the page to be scrollable
    cy.get('.content').should('be.visible')

    cy.get('.v-app-bar').should('be.visible')

    cy.scrollTo(0, 100, { ensureScrollable: true, duration: 200 })

    cy.get('.v-app-bar').should('not.be.visible')

    cy.vue().then(wrapper => wrapper.setProps({ invertedScroll: true }))

    cy.get('.v-app-bar').should('be.visible')
  })
})

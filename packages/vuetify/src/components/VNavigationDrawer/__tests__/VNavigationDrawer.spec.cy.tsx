/// <reference types="../../../../types/cypress" />

import { VLayout } from '@/components/VLayout'
import { VMain } from '@/components/VMain'
import { VNavigationDrawer } from '..'
import { ref } from 'vue'

describe('VNavigationDrawer', () => {
  beforeEach(() => {
    cy.viewport(1280, 768)
  })

  it('should open when changed to permanent on mobile', () => {
    cy.viewport(400, 800)

    cy.mount(({ permanent }: any) => (
      <VLayout>
        <VNavigationDrawer permanent={ permanent } />
      </VLayout>
    ))

    cy.get('.v-navigation-drawer').should('have.class', 'v-navigation-drawer--temporary')

    cy.vue().then(({ wrapper }) => {
      wrapper.setProps({ permanent: true })
    })

    cy.get('.v-navigation-drawer').should('not.have.class', 'v-navigation-drawer--temporary')
  })

  it('should change width when using rail, expandOnHover, and hovering', () => {
    cy.mount((props: any) => (
      <VLayout>
        <VNavigationDrawer { ...props } />
      </VLayout>
    ))

    cy.vue().then(({ wrapper }) => {
      wrapper.setProps({ rail: true, expandOnHover: true })
    })

    cy.get('.v-navigation-drawer').should('have.css', 'width', '56px')

    cy.get('.v-navigation-drawer').trigger('mouseenter')

    cy.get('.v-navigation-drawer').should('have.css', 'width', '256px')

    cy.get('.v-navigation-drawer').trigger('mouseleave')

    cy.get('.v-navigation-drawer').should('have.css', 'width', '56px')
  })

  it('should change width when using bound and unbound rail and expandOnHover', () => {
    const rail = ref(true)

    cy.mount(() => (
      <VLayout>
        <VNavigationDrawer expand-on-hover v-model:rail={ rail.value } />

        <VMain />
      </VLayout>
    ))

    cy.get('.v-navigation-drawer').should('have.css', 'width', '56px')
    cy.get('.v-main').should('have.css', 'padding-left', '56px')

    cy.get('.v-navigation-drawer').trigger('mouseenter')

    cy.get('.v-navigation-drawer').should('have.css', 'width', '256px')
    cy.get('.v-main').should('have.css', 'padding-left', '256px')

    cy.get('.v-navigation-drawer').trigger('mouseleave')

    cy.get('.v-navigation-drawer').should('have.css', 'width', '56px')
    cy.get('.v-main').should('have.css', 'padding-left', '56px')
  })

  it('should hide drawer if window resizes below mobile breakpoint', () => {
    cy.mount(() => (
      <VLayout>
        <VNavigationDrawer />
      </VLayout>
    ))

    cy.get('.v-navigation-drawer').should('have.class', 'v-navigation-drawer--active')

    cy.viewport(400, 800)

    cy.get('.v-navigation-drawer').should('not.have.class', 'v-navigation-drawer--active')
  })

  it('should not hide drawer if window resizes below mobile breakpoint and disable-resize-watcher is used', () => {
    cy.mount(() => (
      <VLayout>
        <VNavigationDrawer disableResizeWatcher />
      </VLayout>
    ))

    cy.get('.v-navigation-drawer').should('have.class', 'v-navigation-drawer--active')

    cy.viewport(400, 800)

    cy.get('.v-navigation-drawer').should('have.class', 'v-navigation-drawer--active')
  })

  it('should always show drawer if using permanent', () => {
    cy.mount(() => (
      <VLayout>
        <VNavigationDrawer permanent />
      </VLayout>
    ))

    cy.get('.v-navigation-drawer').should('have.class', 'v-navigation-drawer--active')

    cy.viewport(400, 800)

    cy.get('.v-navigation-drawer').should('have.class', 'v-navigation-drawer--active')
    cy.get('.v-navigation-drawer').should('not.have.class', 'v-navigation-drawer--temporary')
  })

  it('should show temporary drawer', () => {
    cy.mount(({ active }: any) => (
      <VLayout>
        <VNavigationDrawer temporary model-value={ active } />
      </VLayout>
    ))

    cy.get('.v-navigation-drawer').should('have.class', 'v-navigation-drawer--temporary')

    cy.get('.v-navigation-drawer').should('not.have.class', 'v-navigation-drawer--active')

    cy.vue().then(({ wrapper }) => wrapper.setProps({ active: true }))

    cy.get('.v-navigation-drawer').should('have.class', 'v-navigation-drawer--active')
  })

  it('should allow custom widths', () => {
    cy.mount(() => (
      <VLayout>
        <VNavigationDrawer width={ 300 } permanent />
      </VLayout>
    ))

    cy.get('.v-navigation-drawer').should('have.css', 'width', '300px')
  })

  it('should position drawer on the opposite side', () => {
    cy.mount(() => (
      <VLayout>
        <VNavigationDrawer location="end" permanent />
      </VLayout>
    ))

    cy.get('.v-navigation-drawer').should('have.css', 'right', '0px')
  })

  it('should position drawer on the bottom', () => {
    cy.mount(() => (
      <VLayout>
        <VNavigationDrawer location="bottom" permanent />
      </VLayout>
    ))

    cy.get('.v-navigation-drawer').should('have.css', 'bottom', '0px')
  })
})

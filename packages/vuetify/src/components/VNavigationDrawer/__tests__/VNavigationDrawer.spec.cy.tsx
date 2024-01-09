/// <reference types="../../../../types/cypress" />

// Components
import { VNavigationDrawer } from '..'
import { VLayout } from '@/components/VLayout'
import { VLocaleProvider } from '@/components/VLocaleProvider'
import { VMain } from '@/components/VMain'

// Utilities
import { ref } from 'vue'

describe('VNavigationDrawer', () => {
  beforeEach(() => {
    cy.viewport(1280, 768)
  })

  it('should open when changed to permanent on mobile', () => {
    cy.viewport(400, 800)
      .mount(({ permanent }: any) => (
        <VLayout>
          <VNavigationDrawer permanent={ permanent } />
        </VLayout>
      ))

    cy.get('.v-navigation-drawer').should('have.class', 'v-navigation-drawer--temporary')
      .setProps({ permanent: true })
      .get('.v-navigation-drawer').should('not.have.class', 'v-navigation-drawer--temporary')
  })

  it('should change width when using rail, expandOnHover, and hovering', () => {
    cy.mount((props: any) => (
      <VLayout>
        <VNavigationDrawer { ...props } />
      </VLayout>
    ))

    cy.setProps({ rail: true, expandOnHover: true })
      .get('.v-navigation-drawer').should('have.css', 'width', '56px')
      .get('.v-navigation-drawer').trigger('mouseenter')
      .get('.v-navigation-drawer').should('have.css', 'width', '256px')
      .get('.v-navigation-drawer').trigger('mouseleave')
      .get('.v-navigation-drawer').should('have.css', 'width', '56px')
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
      .get('.v-main').should('have.css', 'padding-left', '56px')
      .get('.v-navigation-drawer').trigger('mouseenter')
      .get('.v-navigation-drawer').should('have.css', 'width', '256px')
      .get('.v-main').should('have.css', 'padding-left', '256px')
      .get('.v-navigation-drawer').trigger('mouseleave')
      .get('.v-navigation-drawer').should('have.css', 'width', '56px')
      .get('.v-main').should('have.css', 'padding-left', '56px')
  })

  it('should hide drawer if window resizes below mobile breakpoint', () => {
    cy.mount(() => (
      <VLayout>
        <VNavigationDrawer />
      </VLayout>
    ))

    cy.get('.v-navigation-drawer').should('have.class', 'v-navigation-drawer--active')
      .viewport(400, 800)
      .get('.v-navigation-drawer').should('not.have.class', 'v-navigation-drawer--active')
  })

  it('should not hide drawer if window resizes below mobile breakpoint and disable-resize-watcher is used', () => {
    cy.mount(() => (
      <VLayout>
        <VNavigationDrawer disableResizeWatcher />
      </VLayout>
    ))

    cy.get('.v-navigation-drawer').should('have.class', 'v-navigation-drawer--active')
      .viewport(400, 800)
      .get('.v-navigation-drawer').should('have.class', 'v-navigation-drawer--active')
  })

  it('should always show drawer if using permanent', () => {
    cy.mount(() => (
      <VLayout>
        <VNavigationDrawer permanent />
      </VLayout>
    ))

    cy.get('.v-navigation-drawer').should('have.class', 'v-navigation-drawer--active')
      .viewport(400, 800)
      .get('.v-navigation-drawer').should('have.class', 'v-navigation-drawer--active')
      .get('.v-navigation-drawer').should('not.have.class', 'v-navigation-drawer--temporary')
  })

  it('should show temporary drawer', () => {
    cy.mount(props => (
      <VLayout>
        <VNavigationDrawer temporary { ...props } />
      </VLayout>
    ))

    cy.get('.v-navigation-drawer').should('have.class', 'v-navigation-drawer--temporary')
      .get('.v-navigation-drawer').should('not.have.class', 'v-navigation-drawer--active')
      .setProps({ modelValue: true })
      .get('.v-navigation-drawer').should('have.class', 'v-navigation-drawer--active')
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

  it('should position drawer scrim correctly', () => {
    const visible = ref(false)
    cy.mount((props: any) => (
      <VLayout>
        <VNavigationDrawer v-model={ visible.value } temporary />
      </VLayout>
    ))
    cy.get('.v-navigation-drawer__scrim').should('not.exist')
      .then(() => {
        visible.value = true
      })
      .get('.v-navigation-drawer__scrim').should('be.visible')
      .get('.v-navigation-drawer__scrim').should('have.css', 'top', '0px')
      .get('.v-navigation-drawer__scrim').should('have.css', 'left', '0px')
  })

  it('should position drawer scrim correctly in rtl locale', () => {
    const visible = ref(false)
    cy.mount(() => (
      <VLocaleProvider rtl>
        <VLayout>
          <VNavigationDrawer v-model={ visible.value } temporary />
        </VLayout>
      </VLocaleProvider>
    ))
      .get('.v-navigation-drawer__scrim').should('not.exist')
      .then(() => {
        visible.value = true
      })
      .get('.v-navigation-drawer__scrim').should('be.visible')
      .get('.v-navigation-drawer__scrim').should('have.css', 'top', '0px')
      .get('.v-navigation-drawer__scrim').should('have.css', 'left', '0px')
  })
})

/// <reference types="../../../../types/cypress" />

// Components
import { VLayout } from '../VLayout'
import { VAppBar } from '@/components/VAppBar'
import { VMain } from '@/components/VMain'
import { VNavigationDrawer } from '@/components/VNavigationDrawer'

// Utilities
import { createRange } from '@/util'

describe('VLayout', () => {
  it('should position main component', () => {
    cy.mount(() => (
      <VLayout>
        <VAppBar height="64"></VAppBar>
        <VNavigationDrawer width="200" permanent></VNavigationDrawer>
        <VMain>
          hello world
        </VMain>
      </VLayout>
    ))

    cy.get('.v-main').should('have.css', 'padding-top', '64px')
    cy.get('.v-main').should('have.css', 'padding-left', '200px')
  })

  it('should work with sticky elements', () => {
    cy.mount(() => (
      <VLayout>
        <VAppBar height="64"></VAppBar>
        <VNavigationDrawer width="200" permanent></VNavigationDrawer>
        <VMain>
          <div>
            { createRange(10).map(_ => <div>hello</div>) }
            <nav style="position: sticky; top: var(--v-layout-top); background: grey">Sticky Header</nav>
            { createRange(100).map(_ => <div>hello</div>) }
          </div>
        </VMain>
      </VLayout>
    ))

    cy.get('html').scrollTo(0, 1000)
      .get('nav').should('be.visible')
  })

  it.only('should work with scrollable main', () => {
    cy.mount(() => (
      <VLayout>
        <VAppBar height="64"></VAppBar>
        <VNavigationDrawer width="200" permanent></VNavigationDrawer>
        <VMain scrollable>
          <div>
            { createRange(10).map(_ => <div>hello</div>) }
            <nav style="position: sticky; top: 0px; background: grey">Sticky Header</nav>
            { createRange(100).map(_ => <div>hello</div>) }
          </div>
        </VMain>
      </VLayout>
    ))

    cy.get('.v-main__scroller').scrollTo(0, 1000)
      .get('nav').should('be.visible')
  })

  it('should work when nested inside another layout', () => {
    cy.mount(({ drawer }: any) => (
      <VLayout>
        <VAppBar height="64"></VAppBar>
        <VNavigationDrawer width="200" permanent></VNavigationDrawer>
        <VMain>
          <VLayout class="ma-10" style="height: 600px" id="nested">
            <VAppBar height="64" color="primary"></VAppBar>
            <VNavigationDrawer width="200" modelValue={ drawer } permanent color="primary"></VNavigationDrawer>
            <VMain>
              Nested
            </VMain>
          </VLayout>
        </VMain>
      </VLayout>
    ))

    cy.get('#nested .v-navigation-drawer').should('not.be.visible')
      .setProps({ drawer: true })
      .get('#nested .v-navigation-drawer').should('be.visible')
  })
})

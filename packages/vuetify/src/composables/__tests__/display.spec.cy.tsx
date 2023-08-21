/* eslint-disable max-len */
/// <reference types="../../../types/cypress" />

// Components
import { VBanner } from '@/components/VBanner/VBanner'
import { VLayout } from '@/components/VLayout/VLayout'
import { VMain } from '@/components/VMain'
import { VNavigationDrawer } from '@/components/VNavigationDrawer/VNavigationDrawer'
import { VSlideGroup } from '@/components/VSlideGroup/VSlideGroup'

describe('VWindow', () => {
  it('should render items', () => {
    cy.viewport(960, 800)
      .mount(({ mobileBreakpoint }: any) => (
        <VLayout>
          <VNavigationDrawer mobileBreakpoint={ mobileBreakpoint } />

          <VMain>
            <VBanner mobileBreakpoint={ mobileBreakpoint }>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quaerat fugit ratione totam magnam, beatae consequuntur qui quam enim et sapiente autem accusantium id nesciunt maiores obcaecati minus molestiae! Ipsa.
            </VBanner>

            <VSlideGroup mobileBreakpoint={ mobileBreakpoint } />
          </VMain>
        </VLayout>
      ))

    cy
      .setProps({ mobileBreakpoint: 'lg' })
      .get('.v-navigation-drawer').should('have.class', 'v-navigation-drawer--mobile')
      .get('.v-banner').should('have.class', 'v-banner--mobile')
      .get('.v-slide-group').should('have.class', 'v-slide-group--mobile')
      .setProps({ mobileBreakpoint: 959 })
      .get('.v-navigation-drawer').should('not.have.class', 'v-navigation-drawer--mobile')
      .get('.v-banner').should('not.have.class', 'v-banner--mobile')
      .get('.v-slide-group').should('not.have.class', 'v-slide-group--mobile')
  })
})

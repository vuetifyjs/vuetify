/// <reference types="../../../../types/cypress" />

import { VLayout } from '@/components/VLayout'
import { VBottomNavigation } from '..'

describe('VBottomNavigation', () => {
  it('should allow custom height', () => {
    cy.mount(() => (
      <VLayout>
        <VBottomNavigation height="200" />
      </VLayout>
    ))

    cy.get('.v-bottom-navigation').should('have.css', 'height', '200px')
  })

  it('should support density', () => {
    cy.mount(({ density }: any) => (
      <VLayout>
        <VBottomNavigation density={ density } />
      </VLayout>
    ))

    cy.get('.v-bottom-navigation').should('have.css', 'height', '56px')

    cy.vue().then(({ wrapper }) => wrapper.setProps({ density: 'comfortable' }))

    cy.get('.v-bottom-navigation').should('have.css', 'height', '48px')

    cy.vue().then(({ wrapper }) => wrapper.setProps({ density: 'compact' }))

    cy.get('.v-bottom-navigation').should('have.css', 'height', '40px')
  })
})

/// <reference types="../../../../types/cypress" />

// Components
import { VBottomNavigation } from '..'
import { VLayout } from '@/components/VLayout'

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
      .setProps({ density: 'comfortable' })
      .get('.v-bottom-navigation').should('have.css', 'height', '48px')
      .setProps({ density: 'compact' })
      .get('.v-bottom-navigation').should('have.css', 'height', '40px')
  })
})

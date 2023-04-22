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
        <VAppBar density={ density } />
      </VLayout>
    ))

    cy.get('.v-app-bar').should('have.css', 'height', '64px')
      .setProps({ density: 'prominent' })
      .get('.v-app-bar').should('have.css', 'height', '128px')
      .setProps({ density: 'comfortable' })
      .get('.v-app-bar').should('have.css', 'height', '56px')
      .setProps({ density: 'compact' })
      .get('.v-app-bar').should('have.css', 'height', '48px')
  })
})

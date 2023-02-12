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

    cy.vue().then(({ wrapper }) => wrapper.setProps({ density: 'prominent' }))

    cy.get('.v-app-bar').should('have.css', 'height', '128px')

    cy.vue().then(({ wrapper }) => wrapper.setProps({ density: 'comfortable' }))

    cy.get('.v-app-bar').should('have.css', 'height', '56px')

    cy.vue().then(({ wrapper }) => wrapper.setProps({ density: 'compact' }))

    cy.get('.v-app-bar').should('have.css', 'height', '48px')
  })
})

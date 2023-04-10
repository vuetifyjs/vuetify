/// <reference types="../../../../types/cypress" />

import { VDefaultsProvider } from '@/components'
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

  describe('global configuration', () => {
    it('should only apply \'v-app-bar\' class to root element and also apply global config class/style', () => {
      cy.mount(() => (
        <VLayout>
          <VDefaultsProvider defaults={ {
            global: {
              class: 'v-global-class',
              style: {
                opacity: 0.5,
              },
            },
            VAppBar: {
              class: 'v-app-bar-alt',
              style: {
                margin: '1px',
              },
            },
            VToolbar: {
              class: 'v-toolbar-alt',
              style: {
                padding: '1px',
              },
            },
          } }
          >

            <VAppBar />
          </VDefaultsProvider>
        </VLayout>
      ))

      cy.get('.v-app-bar')
        .should('have.length', 1)
        // assert it's the root element
        .should('have.class', 'v-toolbar')
        .should('have.class', 'v-app-bar-alt') // VAppBar class takes highest priority
        .should('have.css', 'margin', '1px') // VAppBar style takes highest priority
        .should('have.css', 'padding', '0px') // Ignore VToolbar global style
        .should('have.css', 'opacity', '1') // Ignore global style

      cy.get('.v-app-bar.v-global-class').should('not.exist') // Ignore global class
      cy.get('.v-app-bar.v-toolbar-alt').should('not.exist') // Ignore VToolbar global class
    })
  })
})

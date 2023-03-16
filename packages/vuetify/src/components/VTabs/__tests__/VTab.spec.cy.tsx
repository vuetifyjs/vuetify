/// <reference types="../../../../types/cypress" />

import { VDefaultsProvider } from '@/components'
import { VTab } from '..'

describe('VTabs', () => {
  describe('global configuration', () => {
    it('should only apply \'v-tab\' class to root element and also apply global config class/style', () => {
      cy.mount(() => (
        <VDefaultsProvider defaults={ {
          global: {
            class: 'v-global-class',
            style: {
              opacity: 0.5,
            },
          },
          VTab: {
            class: 'v-tab-alt',
            style: {
              margin: '1px',
            },
          },
          VBtn: {
            class: 'v-btn-alt',
            style: {
              'z-index': '99999',
            },
          },
        } }
        >

          <VTab />
        </VDefaultsProvider>
      ))

      cy.get('.v-tab')
        .should('have.length', 1)
        // assert it's the root element
        .should('have.class', 'v-btn')
        .should('have.class', 'v-tab-alt') // VTab class takes highest priority
        .should('have.css', 'margin', '1px') // VTab style takes highest priority
        .should('have.css', 'z-index', 'auto') // Ignore VBtn global style

      cy.get('.v-tab.v-global-class').should('not.exist') // Ignore global class
      cy.get('.v-tab.v-btn-alt').should('not.exist') // Ignore VBtn global style
    })
  })
})

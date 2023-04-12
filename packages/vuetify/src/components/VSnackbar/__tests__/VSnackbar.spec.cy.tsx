/// <reference types="../../../../types/cypress" />

import { VBtn, VDefaultsProvider } from '@/components'
import { VSnackbar } from '../VSnackbar'

describe('VSnackbar', () => {
  describe('global configuration', () => {
    it('should only apply \'v-snackbar\' class to root element and also apply global config class/style', () => {
      cy.mount(() => (
        <VDefaultsProvider defaults={{
          global: {
            class: 'v-global-class',
            style: {
              opacity: 0.5,
            },
          },
        }}
        >
          <VBtn
            id="menu-activator"
          >
            Open Menu
          </VBtn>
          <VSnackbar activator="#menu-activator">
          </VSnackbar>
        </VDefaultsProvider>
      ))

      cy.get('.v-btn').click()

      cy.get('.v-snackbar')
        .should('have.length', 1)
        // assert it's the root element
        .should('have.class', 'v-overlay')
        .should('have.class', 'v-global-class')
        .should('have.css', 'opacity', '0.5')
    })
  })
})

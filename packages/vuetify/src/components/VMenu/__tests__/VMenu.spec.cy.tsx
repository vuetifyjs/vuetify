/// <reference types="../../../../types/cypress" />

import { VBtn, VDefaultsProvider } from '@/components'
import { Application, CenteredGrid } from '@/../cypress/templates'
import { VMenu } from '../VMenu'

describe('VMenu', () => {
  describe('global configuration', () => {
    it('should only apply \'v-menu\' class to root element and also apply global config class/style', () => {
      cy.mount(() => (
        <Application>
          <CenteredGrid width="360px">
            <VDefaultsProvider defaults={ {
              global: {
                class: 'v-global-class',
                style: {
                  opacity: 0.5,
                },
              },
            } }
            >
              <VBtn
                id="menu-activator"
              >
                Open Menu
              </VBtn>
              <VMenu activator="#menu-activator">
              </VMenu>
            </VDefaultsProvider>
          </CenteredGrid>
        </Application>
      ))

      cy.get('.v-btn').click()

      cy.get('.v-menu')
        .should('have.length', 1)
        // assert it's the root element
        .should('have.class', 'v-overlay')
        .should('have.class', 'v-global-class')
        .should('have.css', 'opacity', '0.5')
    })
  })
})

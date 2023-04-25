/// <reference types="../../../../types/cypress" />

import { VDefaultsProvider } from '@/components'
import { VTab } from '..'

describe('VTab', () => {
  describe('global configuration', () => {
    it('should only apply \'v-tab\' class to root element and also apply global config class/style', () => {
      cy
        .mount(() => (
          <VDefaultsProvider
            defaults={{
              global: {
                class: 'v-global-class',
                style: {
                  opacity: 0.5,
                },
              },
              VTab: {
                class: 'v-tab-alt',
                style: {
                  margin: '2px',
                  padding: '1px',
                },
              },
              VBtn: {
                class: 'v-btn-alt',
                style: {
                  margin: '1px',
                },
              },
            }}
          >
            <VTab />
          </VDefaultsProvider>
        ))
        .get('.v-tab')
        .should('have.class', 'v-global-class')
        .should('have.class', 'v-tab-alt')
        .should('have.class', 'v-btn-alt')
        // .should('have.css', 'margin', '2px')
        // .should('have.css', 'padding', '1px')
        // .should('have.css', 'opacity', '0.5')
    })
  })
})

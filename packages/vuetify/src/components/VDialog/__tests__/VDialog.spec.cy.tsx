/// <reference types="../../../../types/cypress" />

import { VBtn, VDefaultsProvider } from '@/components'
import { VDialog } from '../VDialog'

describe('VDialog', () => {
  describe('global configuration', () => {
    it('should only apply \'v-dialog\' class to root element and also apply global config class/style', () => {
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
            }}
          >
            <VBtn>
              Open Dialog
              <VDialog activator="parent"></VDialog>
            </VBtn>
          </VDefaultsProvider>
        ))
        .get('.v-btn').click()
        .get('.v-dialog')
        .should('have.class', 'v-global-class')
        .should('have.class', 'v-dialog')
        .should('have.class', 'v-overlay')
        .should('have.css', 'opacity', '0.5')
    })
  })
})

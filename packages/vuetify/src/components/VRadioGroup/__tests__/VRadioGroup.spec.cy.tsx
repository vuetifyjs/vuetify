/// <reference types="../../../../types/cypress" />

import { VDefaultsProvider } from '@/components'
import { VRadioGroup } from '../VRadioGroup'

describe('VRadioGroup', () => {
  describe('global configuration', () => {
    it('should only apply \'v-radio-group\' class to root element and also apply global config class/style', () => {
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

          <VRadioGroup />
        </VDefaultsProvider>
      ))

      cy.get('.v-radio-group')
        .should('have.length', 1)
        // assert it's the root element
        .should('have.class', 'v-input')
        .should('have.class', 'v-global-class')
        .should('have.css', 'opacity', '0.5')
    })
  })
})

/// <reference types="../../../../types/cypress" />

import { VFooter } from '..'
import { VLayout } from '@/components'
import { generate } from '@/../cypress/templates'

const defaultColors = ['success', 'info', 'warning', 'error', 'invalid']

const props = {
  color: defaultColors,
}

const stories = {
  'Default footer': <VFooter />,
}

// Tests
describe('VFooter', () => {
  describe('color', () => {
    it('supports default color props', () => {
      cy.mount(() => (
        <VLayout>
          {defaultColors.map((color, idx) => (
            <VFooter color={ color }>
              { color } footer
            </VFooter>
          )) }
        </VLayout>
      ))
        .get('.v-footer')
        .should('have.length', defaultColors.length)
        .then(subjects => {
          Array.from(subjects).forEach((subject, idx) => {
            expect(subject).to.contain(defaultColors[idx])
          })
        })
    })
  })
})

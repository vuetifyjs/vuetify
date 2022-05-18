/// <reference types="../../../../types/cypress" />

import { VDivider } from '..'
import { generate } from '@/../cypress/templates'

const defaultColors = ['success', 'info', 'warning', 'error', 'invalid']

const props = {
  color: defaultColors,
  icon: ['mdi-vuetify'],
  modelValue: true,
}

const stories = {
  'Default divider': <VDivider />,
  'Icon divider': <VDivider icon="mdi-vuetify" />,
}

// Tests
describe('VDivider', () => {
  describe('color', () => {
    it('supports default color props', () => {
      cy.mount(() => (
        <>
          {defaultColors.map((color, idx) => (
            <VDivider color={ color }>
              { color } divider
            </VDivider>
          )) }
        </>
      ))
        .get('.v-divider')
        .should('have.length', defaultColors.length)
    })
  })
})

// Useful to preview all of the variants and pre-made examples
describe('Showcase', { viewportHeight: 1130, viewportWidth: 700 }, () => {
  generate({ stories, props, component: VDivider })
})

/// <reference types="../../../../types/cypress" />

import { VAlert } from '..'
import { generate } from '@/../cypress/templates'

const defaultColors = ['success', 'info', 'warning', 'error', 'invalid']

const props = {
  color: defaultColors,
  icon: ['$vuetify'],
  modelValue: true,
}

const stories = {
  'Default alert': <VAlert />,
  'Icon alert': <VAlert icon="$vuetify" />,
}

// Tests
describe('VAlert', () => {
  describe('color', () => {
    it('supports default color props', () => {
      cy.mount(() => (
        <>
          { defaultColors.map((color, idx) => (
            <VAlert color={ color } text={ idx.toString() }>
              { color } alert
            </VAlert>
          ))}
        </>
      ))
        .get('.v-alert')
        .should('have.length', defaultColors.length)
        .then(subjects => {
          Array.from(subjects).forEach((subject, idx) => {
            expect(subject).to.contain(defaultColors[idx])
          })
        })
    })
  })

  describe('Showcase', () => {
    generate({ stories, props, component: VAlert })
  })
})

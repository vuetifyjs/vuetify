/// <reference types="../../../../types/cypress" />

import { VAvatar } from '..'
import { generate } from '@/../cypress/templates'

const defaultColors = ['success', 'info', 'warning', 'error', 'invalid']

const props = {
  color: defaultColors,
  icon: ['mdi-vuetify'],
  modelValue: true,
}

const stories = {
  'Default avatar': <VAvatar />,
  'Icon avatar': <VAvatar icon="mdi-vuetify" />,
  'Image avatar': <VAvatar image="https://vuetifyjs.b-cdn.net/images/john-smirk.png" />,
}

// Tests
describe('VAvatar', () => {
  describe('color', () => {
    it('supports default color props', () => {
      cy.mount(() => (
        <>
          {defaultColors.map((color, idx) => (
            <VAvatar color={ color } text={ idx.toString() }>
              { color } avatar
            </VAvatar>
          )) }
        </>
      ))
        .get('.v-avatar')
        .should('have.length', defaultColors.length)
        .then(subjects => {
          Array.from(subjects).forEach((subject, idx) => {
            expect(subject).to.contain(defaultColors[idx])
          })
        })
    })
  })
})

// Useful to preview all of the variants and pre-made examples
describe('Showcase', { viewportHeight: 1130, viewportWidth: 700 }, () => {
  generate({ stories, props, component: VAvatar })
})

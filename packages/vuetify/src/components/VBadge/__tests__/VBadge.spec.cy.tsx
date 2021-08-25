/// <reference types="../../../../types/cypress" />

import VBadge from '../VBadge'
import { generate } from '@/../cypress/templates'

const defaultColors = ['success', 'info', 'warning', 'error', 'invalid']
const props = {
  colors: defaultColors,
  textColors: defaultColors,
}

const stories = {
  'Default badge': <VBadge>Basic badge</VBadge>,
}

// Tests
describe('VBadge', () => {
  describe('color', () => {
    it('supports default color props', () => {
      cy.mount(() => (
        <>
          {defaultColors.map((color, idx) => (
            <VBadge color={ color } content={ idx.toString() }>
              { color } badge
            </VBadge>
          )) }
        </>
      ))
        .get('.v-badge')
        .should('have.length', defaultColors.length)
        .then(subjects => {
          Array.from(subjects).forEach((subject, idx) => {
            expect(subject).to.contain(idx)
          })
        })
    })
  })

  describe('textColor: ', () => {
    it('supports default color props', () => {
      cy.mount(() => (
        <>
          {defaultColors.map((color, idx) => (
            <VBadge textColor={ color } content={ idx.toString() }>
              { color } text badge
            </VBadge>
          )) }
        </>
      ))
        .get('.v-badge')
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
describe.skip('Showcase', { viewportHeight: 1130, viewportWidth: 700 }, () => {
  generate({ stories, props, component: VBadge })
})

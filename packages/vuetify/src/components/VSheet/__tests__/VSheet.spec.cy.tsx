/// <reference types="../../../../types/cypress" />

import { VSheet } from '..'

const defaultColors = ['success', 'info', 'warning', 'error', 'invalid']

// Tests
describe('VSheet', () => {
  describe('color', () => {
    it('supports default color props', () => {
      cy.mount(() => (
        <>
          {defaultColors.map((color, idx) => (
            <VSheet color={ color }>
              { color } sheet
            </VSheet>
          )) }
        </>
      ))
        .get('.v-sheet')
        .should('have.length', defaultColors.length)
        .then(subjects => {
          Array.from(subjects).forEach((subject, idx) => {
            expect(subject).to.contain(defaultColors[idx])
          })
        })
    })
  })
})

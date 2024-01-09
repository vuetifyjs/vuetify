/// <reference types="../../../../types/cypress" />

import { VSelectionControl } from '../VSelectionControl'

const colors = ['success', 'info', 'warning', 'error', 'invalid']

// Actual tests
describe('VSelectionControl', () => {
  describe('color', () => {
    it('supports default color props', () => {
      cy.mount(() => (
        <>
          { colors.map(color => (
            <VSelectionControl
              color={ color }
              label={ `${color} Selection Control` }
            />
          ))}
        </>
      ))
        .get('div.v-selection-control')
        .should('have.length', colors.length)
        .then(subjects => {
          Array.from(subjects).forEach((subject, i) => {
            expect(subject).to.contain(colors[i])
          })
        })
    })
  })
})

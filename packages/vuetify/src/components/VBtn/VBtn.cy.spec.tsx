/// <reference types="../../../types/cypress" />

import { CenteredGrid } from '@/../cypress/templates'
import VBtn from './VBtn'

describe('VBtn', () => {
  it('supports the color property', () => {
    const colors = ['success', 'info', 'warning', 'error', 'invalid']
    const Buttons = colors.map(color => (
      <VBtn color={color} class="text-capitalize">
        { color } button
      </VBtn>
    ))
    cy.mount(() => (
      <CenteredGrid width="200px">
        <h2 class="mt-8">Buttons by Color</h2>
        { Buttons }
      </CenteredGrid>
    ))
      .get('button')
      .should('have.length', colors.length)
      .then(subjects => {
        Array.from(subjects).forEach((subject, idx) => {
          expect(subject).to.contain(colors[idx])
        })
      })
  })
})

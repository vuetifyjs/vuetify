/// <reference types="../../../../types/cypress" />

// Components
import { VTooltip } from '..'

// Utilities
const colors = ['success', 'info', 'warning', 'error', 'invalid']

describe('VTooltip', () => {
  function mountFunction (content: JSX.Element) {
    return cy.mount(() => content)
  }

  it('supports the color prop', () => {
    mountFunction((
      <VTooltip color="primary" />
    ))
      .get('.v-overlay__content').should('have.class', 'bg-primary')
  })

  it('supports default color props', () => {
    mountFunction((
      <>
        { colors.map(color => (
          <VTooltip color={ color }>
            { color }
          </VTooltip>
        ))}
      </>
    ))
      .get('.v-overlay__content')
      .should('have.length', colors.length)
      .then(subjects => {
        Array.from(subjects).forEach((subject, idx) => {
          expect(subject).to.contain(colors[idx])
        })
      })
  })
})

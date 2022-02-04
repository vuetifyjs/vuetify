/// <reference types="../../../../types/cypress" />

// Component
import { VToolbar } from '..'

// Utilities
const colors = ['success', 'info', 'warning', 'error', 'invalid']

describe('VListItem', () => {
  function mountFunction (content: JSX.Element) {
    return cy.mount(() => content)
  }

  it('supports the title prop', () => {
    mountFunction((
      <VToolbar title="foo" />
    ))
      .get('.v-toolbar-title').contains('foo')
  })

  it('supports default color props', () => {
    mountFunction((
      <>
        { colors.map(color => (
          <VToolbar color={ color } title={ color } />
        )) }
      </>
    ))
      .get('.v-toolbar')
      .should('have.length', colors.length)
      .then(subjects => {
        Array.from(subjects).forEach((subject, idx) => {
          expect(subject).to.contain(colors[idx])
        })
      })
  })
})

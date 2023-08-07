/// <reference types="../../../../types/cypress" />

// Components
import { VToolbar } from '..'
import { VBtn } from '@/components/VBtn'

// Utilities
const colors = ['success', 'info', 'warning', 'error', 'invalid']

describe('VToolbar', () => {
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
        ))}
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

  it('aligns prepend / append slot content center', () => {
    const wrapper = mountFunction((
      <VToolbar>
        <slot name="prepend">
          <VBtn>Prepend</VBtn>
        </slot>

        <slot name="append">
          <VBtn>Append</VBtn>
        </slot>
      </VToolbar>
    ))

    wrapper.get('[name="prepend"] > .v-btn').should('have.length', 1)
    wrapper.get('[name="append"] > .v-btn').should('have.length', 1)
  })
})

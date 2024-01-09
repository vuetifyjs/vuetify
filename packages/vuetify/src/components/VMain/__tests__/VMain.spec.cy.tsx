/// <reference types="../../../../types/cypress" />

// Components
import { VMain } from '..'
import { VApp } from '@/components/VApp'

describe('VAppBar', () => {
  it('should allow custom height', () => {
    cy.mount(() => (
      <VApp>
        <VMain tag="div" />
      </VApp>
    ))

    cy.get('.v-main').should('have.prop', 'tagName').should('eq', 'DIV')
  })
})

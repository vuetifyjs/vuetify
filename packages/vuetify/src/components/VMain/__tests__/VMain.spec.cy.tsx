/// <reference types="../../../../types/cypress" />

import { VApp } from '@/components'
import { VMain } from '..'

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

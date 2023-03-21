/// <reference types="../../../../types/cypress" />

import { VLayout } from '@/components/VLayout'
import { VSystemBar } from '..'

// Tests
describe('VSystemBar', () => {
  it('supports default themes', () => {
    cy.mount((props: any) => (
      <VLayout>
        <VSystemBar { ...props }>Content</VSystemBar>
      </VLayout>
    ))
      .get('.v-system-bar')
      .should('have.class', 'v-theme--light')
      .setProps({ theme: 'dark' })
      .get('.v-system-bar')
      .should('have.class', 'v-theme--dark')
  })
})

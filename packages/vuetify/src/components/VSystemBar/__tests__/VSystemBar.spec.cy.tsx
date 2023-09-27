/// <reference types="../../../../types/cypress" />

// Components
import { VSystemBar } from '..'
import { VLayout } from '@/components/VLayout'

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

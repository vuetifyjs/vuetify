/// <reference types="../../../../types/cypress" />

import { CenteredGrid } from '@/../cypress/templates'
import { VBtn } from '@/components'
import { VThemeProvider } from '../'

describe('VThemeProvider', () => {
  it('should use provided theme', () => {
    cy.mount(() => (
      <VThemeProvider>
        <CenteredGrid class="pa-10">
          <VBtn color="primary">button</VBtn>
        </CenteredGrid>
      </VThemeProvider>
    )).get('.v-btn').should('have.class', 'v-theme--light')
  })

  it('should use theme defined in prop', () => {
    cy.mount(() => (
      <VThemeProvider theme="dark">
        <CenteredGrid class="pa-10">
          <VBtn color="primary">button</VBtn>
        </CenteredGrid>
      </VThemeProvider>
    )).get('.v-btn').should('have.class', 'v-theme--dark')
  })

  it('should render element when using with-background prop', () => {
    cy.mount(() => (
      <VThemeProvider theme="dark" with-background>
        <CenteredGrid class="pa-10">
          <VBtn color="primary">button</VBtn>
        </CenteredGrid>
      </VThemeProvider>
    )).get('.v-theme-provider').should('exist')
  })
})

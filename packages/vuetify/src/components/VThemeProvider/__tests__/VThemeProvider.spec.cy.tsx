/// <reference types="../../../../types/cypress" />

import { createVuetify } from '@/framework'

// Components
import { VThemeProvider } from '..'
import { CenteredGrid } from '@/../cypress/templates'
import { VBtn } from '@/components/VBtn'

describe('VThemeProvider', () => {
  const vuetify = createVuetify()

  it('should use provided theme', () => {
    cy.mount(() => (
      <VThemeProvider>
        <CenteredGrid class="pa-10">
          <VBtn color="primary">button</VBtn>
        </CenteredGrid>
      </VThemeProvider>
    ), {
      global: { plugins: [vuetify] },
    }).get('.v-btn').should('have.class', 'v-theme--light')
  })

  it('should use theme defined in prop', () => {
    cy.mount(() => (
      <VThemeProvider theme="dark">
        <CenteredGrid class="pa-10">
          <VBtn color="primary">button</VBtn>
        </CenteredGrid>
      </VThemeProvider>
    ), {
      global: { plugins: [vuetify] },
    }).get('.v-btn').should('have.class', 'v-theme--dark')
  })

  it('should render element when using with-background prop', () => {
    cy.mount(() => (
      <VThemeProvider theme="dark" with-background>
        <CenteredGrid class="pa-10">
          <VBtn color="primary">button</VBtn>
        </CenteredGrid>
      </VThemeProvider>
    ), {
      global: { plugins: [vuetify] },
    }).get('.v-theme-provider').should('exist')
  })
})

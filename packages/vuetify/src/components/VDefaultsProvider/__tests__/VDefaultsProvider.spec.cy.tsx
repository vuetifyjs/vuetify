/// <reference types="../../../../types/cypress" />

import { CenteredGrid } from '@/../cypress/templates'
import { VCard } from '@/components/VCard'
import { VDefaultsProvider } from '../VDefaultsProvider'

describe('VDefaultsProvider', () => {
  it('should apply new defaults', () => {
    cy.mount(() => (
      <CenteredGrid width="200px">
        <VDefaultsProvider defaults={{ global: { elevation: 10 }, VCard: { color: 'primary' } }}>
          <VCard title="foo" subtitle="bar"></VCard>
        </VDefaultsProvider>
      </CenteredGrid>
    )).get('.v-card').should('have.class', 'elevation-10').should('have.class', 'bg-primary')
  })
})

/// <reference types="../../../../types/cypress" />

import { CenteredGrid } from '@/../cypress/templates'
import { VExpansionPanel, VExpansionPanelContent, VExpansionPanelHeader, VExpansionPanels } from '../'

describe('VExpansionPanels', () => {
  it('renders correctly', () => {
    cy.mount(() => (
      <CenteredGrid width="200px">
        <VExpansionPanels>
          <VExpansionPanel>
            <VExpansionPanelHeader>Header</VExpansionPanelHeader>
            <VExpansionPanelContent>Content</VExpansionPanelContent>
          </VExpansionPanel>
          <VExpansionPanel>
            <VExpansionPanelHeader>Header</VExpansionPanelHeader>
            <VExpansionPanelContent>Content</VExpansionPanelContent>
          </VExpansionPanel>
        </VExpansionPanels>
      </CenteredGrid>
    ))
  })

  it('responds to clicking header', () => {
    cy.mount(() => (
      <CenteredGrid width="200px">
        <VExpansionPanels>
          <VExpansionPanel>
            <VExpansionPanelHeader>Header</VExpansionPanelHeader>
            <VExpansionPanelContent>Content</VExpansionPanelContent>
          </VExpansionPanel>
          <VExpansionPanel>
            <VExpansionPanelHeader>Header</VExpansionPanelHeader>
            <VExpansionPanelContent>Content</VExpansionPanelContent>
          </VExpansionPanel>
        </VExpansionPanels>
      </CenteredGrid>
    ))
      .get('.v-expansion-panel-header')
      .eq(0)
      .click()
      .should('have.class', 'v-expansion-panel-header')
  })

  it('supports hide-actions prop', () => {
    cy.mount(() => (
      <CenteredGrid width="200px">
        <VExpansionPanels>
          <VExpansionPanel>
            <VExpansionPanelHeader hideActions>Header</VExpansionPanelHeader>
            <VExpansionPanelContent>Content</VExpansionPanelContent>
          </VExpansionPanel>
          <VExpansionPanel>
            <VExpansionPanelHeader hideActions>Header</VExpansionPanelHeader>
            <VExpansionPanelContent>Content</VExpansionPanelContent>
          </VExpansionPanel>
        </VExpansionPanels>
      </CenteredGrid>
    ))
      .get('.v-expansion-panel-header__icon')
      .should('not.exist')
  })
})

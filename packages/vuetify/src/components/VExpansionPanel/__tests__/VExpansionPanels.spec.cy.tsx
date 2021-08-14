/// <reference types="../../../../types/cypress" />

import { CenteredGrid } from '@/../cypress/templates'
import { ref } from 'vue'
import { VExpansionPanel, VExpansionPanelContent, VExpansionPanelHeader, VExpansionPanels } from '../'

describe('VExpansionPanels', () => {
  it('renders using props', () => {
    const headers = ['Header 1', 'Header 2']

    cy.mount(() => (
      <CenteredGrid width="200px">
        <VExpansionPanels>
          { headers.map(header => (
            <VExpansionPanel header={header} content="Content" />
          )) }
        </VExpansionPanels>
      </CenteredGrid>
    ))
      .get('.v-expansion-panel-header')
      .each((item, index) => {
        expect(item.text()).to.equal(headers[index])
      })
  })

  it('renders using slots', () => {
    const headers = ['Header 1', 'Header 2']

    cy.mount(() => (
      <CenteredGrid width="200px">
        <VExpansionPanels>
          { headers.map(header => (
            <VExpansionPanel
              v-slots={{
                header: () => header,
                content: () => 'Content',
              }}
            />
          )) }
        </VExpansionPanels>
      </CenteredGrid>
    ))
      .get('.v-expansion-panel-header')
      .each((item, index) => {
        expect(item.text()).to.equal(headers[index])
      })
  })

  it('renders default slot', () => {
    const headers = ['Header 1', 'Header 2']

    cy.mount(() => (
      <CenteredGrid width="200px">
        <VExpansionPanels>
          { headers.map(header => (
            <VExpansionPanel>
              <VExpansionPanelHeader>{ header }</VExpansionPanelHeader>
              <VExpansionPanelContent>Content</VExpansionPanelContent>
            </VExpansionPanel>
          )) }
        </VExpansionPanels>
      </CenteredGrid>
    ))
      .get('.v-expansion-panel-header')
      .each((item, index) => {
        expect(item.text()).to.equal(headers[index])
      })
  })

  it('responds to clicking header', () => {
    cy.mount(() => (
      <CenteredGrid width="200px">
        <VExpansionPanels>
          <VExpansionPanel header="Header" content="Content" />
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
          <VExpansionPanel hideActions header="Header" content="Content" />
        </VExpansionPanels>
      </CenteredGrid>
    ))
      .get('.v-expansion-panel-header__icon')
      .should('not.exist')
  })

  it('supports color props', () => {
    cy.mount(() => (
      <CenteredGrid width="200px">
        <VExpansionPanels>
          <VExpansionPanel value="foo" header="Header" content="Content" color="primary" bgColor="secondary" />
        </VExpansionPanels>
      </CenteredGrid>
    ))
      .get('.v-expansion-panel-header')
      .should('have.class', 'bg-primary')
      .get('.v-expansion-panel')
      .should('have.class', 'bg-secondary')
  })

  it('supports rounded prop', () => {
    cy.mount(() => (
      <CenteredGrid width="200px">
        <VExpansionPanels>
          <VExpansionPanel value="foo" header="Header" content="Content" rounded="xl" />
        </VExpansionPanels>
      </CenteredGrid>
    ))
      .get('.v-expansion-panel')
      .should('have.class', 'rounded-xl')
  })

  it('supports model-value', () => {
    cy.mount(() => (
      <CenteredGrid width="200px">
        <VExpansionPanels modelValue="foo">
          <VExpansionPanel value="bar" header="Header" content="Content" />
          <VExpansionPanel value="foo" header="Header" content="Content" />
        </VExpansionPanels>
      </CenteredGrid>
    ))
      .get('.v-expansion-panel-header')
      .should('have.class', 'v-expansion-panel-header--active')
  })

  it('supports v-model', () => {
    const foo = ref()
    cy.mount(() => (
      <CenteredGrid width="200px">
        <VExpansionPanels modelValue={foo.value} onUpdate:modelValue={v => foo.value = v}>
          <VExpansionPanel value="bar" header="Header" content="Content" />
          <VExpansionPanel value="foo" header="Header" content="Content" />
        </VExpansionPanels>
        <div class="value">{foo.value}</div>
      </CenteredGrid>
    ))
      .get('.v-expansion-panel-header')
      .eq(1)
      .click()
      .should('have.class', 'v-expansion-panel-header--active')
      .get('.value')
      .should('have.text', 'foo')
  })
})

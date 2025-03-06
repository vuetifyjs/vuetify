/// <reference types="../../../../types/cypress" />

// Components
import { VExpansionPanel, VExpansionPanels, VExpansionPanelText, VExpansionPanelTitle } from '../'
import { CenteredGrid } from '@/../cypress/templates'

// Utilities
import { ref } from 'vue'

describe('VExpansionPanels', () => {
  it('renders using props', () => {
    const titles = ['Header 1', 'Header 2']

    cy.mount(() => (
      <CenteredGrid width="200px">
        <VExpansionPanels>
          { titles.map(title => (
            <VExpansionPanel title={ title } text="Content" />
          ))}
        </VExpansionPanels>
      </CenteredGrid>
    ))
      .get('.v-expansion-panel-title')
      .each((item, index) => {
        expect(item.text()).to.equal(titles[index])
      })
  })

  it('renders using slots', () => {
    const titles = ['Header 1', 'Header 2']

    cy.mount(() => (
      <CenteredGrid width="200px">
        <VExpansionPanels>
          { titles.map(title => (
            <VExpansionPanel>
              {{
                title: () => title,
                text: () => 'Content',
              }}
            </VExpansionPanel>
          ))}
        </VExpansionPanels>
      </CenteredGrid>
    ))
      .get('.v-expansion-panel-title')
      .each((item, index) => {
        expect(item.text()).to.equal(titles[index])
      })
  })

  it('renders default slot', () => {
    const titles = ['Header 1', 'Header 2']

    cy.mount(() => (
      <CenteredGrid width="200px">
        <VExpansionPanels>
          { titles.map(title => (
            <VExpansionPanel>
              <VExpansionPanelTitle>{ title }</VExpansionPanelTitle>
              <VExpansionPanelText>Content</VExpansionPanelText>
            </VExpansionPanel>
          ))}
        </VExpansionPanels>
      </CenteredGrid>
    ))
      .get('.v-expansion-panel-title')
      .each((item, index) => {
        expect(item.text()).to.equal(titles[index])
      })
  })

  it('responds to clicking title', () => {
    cy.mount(() => (
      <CenteredGrid width="200px">
        <VExpansionPanels>
          <VExpansionPanel title="Header" text="Content" />
        </VExpansionPanels>
      </CenteredGrid>
    ))
      .get('.v-expansion-panel-title').eq(0).as('title')
      .click()
    // TODO: basically a noop, what is this test supposed to do?
    cy.get('@title').should('have.class', 'v-expansion-panel-title')
  })

  it('supports hide-actions prop', () => {
    cy.mount(() => (
      <CenteredGrid width="200px">
        <VExpansionPanels>
          <VExpansionPanel hideActions title="Header" text="Content" />
        </VExpansionPanels>
      </CenteredGrid>
    ))
      .get('.v-expansion-panel-title__icon')
      .should('not.exist')
  })

  it('supports color props', () => {
    cy.mount(() => (
      <CenteredGrid width="200px">
        <VExpansionPanels>
          <VExpansionPanel value="foo" title="Header" text="Content" color="primary" bgColor="secondary" />
        </VExpansionPanels>
      </CenteredGrid>
    ))
      .get('.v-expansion-panel-title')
      .should('have.class', 'bg-primary')
      .get('.v-expansion-panel')
      .should('have.class', 'bg-secondary')
  })

  it('supports rounded prop', () => {
    cy.mount(() => (
      <CenteredGrid width="200px">
        <VExpansionPanels>
          <VExpansionPanel value="foo" title="Header" text="Content" rounded="xl" />
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
          <VExpansionPanel value="bar" title="Header" text="Content" />
          <VExpansionPanel value="foo" title="Header" text="Content" />
        </VExpansionPanels>
      </CenteredGrid>
    ))
      .get('.v-expansion-panel-title')
      .should('have.class', 'v-expansion-panel-title--active')
  })

  it('supports v-model', () => {
    const foo = ref()
    cy.mount(() => (
      <CenteredGrid width="200px">
        <VExpansionPanels modelValue={ foo.value } onUpdate:modelValue={ v => foo.value = v }>
          <VExpansionPanel value="bar" title="Header" text="Content" />
          <VExpansionPanel value="foo" title="Header" text="Content" />
        </VExpansionPanels>
        <div class="value">{ foo.value }</div>
      </CenteredGrid>
    ))
      .get('.v-expansion-panel-title').eq(1).as('title')
      .click()
    cy.get('@title').should('have.class', 'v-expansion-panel-title--active')
      .get('.value')
      .should('have.text', 'foo')
  })
})

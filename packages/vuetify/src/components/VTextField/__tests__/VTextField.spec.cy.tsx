/// <reference types="../../../../types/cypress" />

import { VTextField } from '../VTextField'
import { VList, VListItem } from '../../VList'
import { generate } from '../../../../cypress/templates'
import { cloneVNode } from 'vue'

const variants = ['underlined', 'outlined', 'filled', 'solo', 'plain'] as const

const stories = Object.fromEntries(Object.entries({
  'Default input': <VTextField label="label" />,
  Disabled: <VTextField label="label" disabled />,
  Affixes: <VTextField label="label" prefix="prefix" suffix="suffix" />,
  'Prepend/append': <VTextField label="label" prependIcon="mdi-vuetify" appendIcon="mdi-vuetify" />,
  'Prepend/append inner': <VTextField label="label" prependInnerIcon="mdi-vuetify" appendInnerIcon="mdi-vuetify" />,
  Placeholder: <VTextField label="label" placeholder="placeholder" persistentPlaceholder />,
}).map(([k, v]) => [k, (
  <div class="d-flex flex-column flex-grow-1">
    { variants.map(variant => (
      <div class="d-flex" style="gap: 0.4rem">
        { cloneVNode(v, { variant }) }
        { cloneVNode(v, { variant, modelValue: 'Value' }) }
      </div>
    ))}
  </div>
)]))

describe('VTextField', () => {
  it('should update validation when model changes', () => {
    const rules = [
      (value: string) => value.length > 5 || 'Error!',
    ]

    cy.mount(() => (
      <VTextField label="Label" rules={ rules } />
    ))

    cy.get('.v-text-field input').type('Hello')

    cy.get('.v-text-field').should('have.class', 'v-input--error')
    cy.get('.v-messages').should('exist').invoke('text').should('equal', 'Error!')
  })

  // https://github.com/vuetifyjs/vuetify/issues/15231
  it('should render details if using hide-details="auto" and counter prop', () => {
    cy.mount(() => (
      <VTextField hide-details="auto" counter></VTextField>
    ))
      .get('.v-input__details').should('be.visible')
  })

  it('should increment and decrement with arrow keys when in list and type is number.', () => {
    cy.mount(() => (
      <VList>
        <VListItem>
          <VTextField type="number" id="input-1" value="0" />
        </VListItem>
        <VListItem>
          <VTextField type="number" id="input-2" value="0" />
        </VListItem>
      </VList>
    ))
      .get('#input-1')
      .type('{upArrow}{upArrow}{upArrow}')
      .should('have.value', 3)
      .get('#input-2')
      .should('have.value', 0)
      .get('#input-1')
      .type('{downArrow}{downArrow}')
      .should('have.value', 1)
      .get('#input-2')
      .should('have.value', 0)
  })

  describe('Showcase', () => {
    generate({ stories })
  })
})

/// <reference types="../../../../types/cypress" />

import { VTextField } from '../VTextField'
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
  it('should validate input on mount', () => {
    cy.mount(() => (
      <VTextField rules={[v => v?.length > 4 || 'Error!']}></VTextField>
    ))

    cy.get('.v-text-field').should('have.class', 'v-input--error')

    cy.get('.v-text-field input').type('Hello')

    cy.get('.v-text-field').should('not.have.class', 'v-input--error')
  })

  it('should not validate on mount when using validate-on lazy', () => {
    const rules = [
      (value: string) => value?.length > 5 || 'Error!',
    ]

    cy.mount(() => (
      <VTextField label="Label" validate-on="lazy" rules={ rules } />
    ))

    cy.get('.v-text-field').should('not.have.class', 'v-input--error')

    cy.get('.v-text-field input').type('Hello')

    cy.get('.v-text-field').should('have.class', 'v-input--error')
    cy.get('.v-messages').should('exist').invoke('text').should('equal', 'Error!')
  })

  it('should handle multiple options in validate-on prop', () => {
    const rules = [
      (value: string) => value?.length > 5 || 'Error!',
    ]

    cy.mount(() => (
      <VTextField label="Label" validate-on="blur lazy" rules={ rules } />
    ))

    cy.get('.v-text-field').should('not.have.class', 'v-input--error')

    cy.get('.v-text-field input').type('Hello')

    cy.get('.v-text-field').should('not.have.class', 'v-input--error')

    cy.get('.v-text-field input').blur()

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

  describe('Showcase', () => {
    generate({ stories })
  })
})

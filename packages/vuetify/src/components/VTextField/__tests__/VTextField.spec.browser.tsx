import { VTextField } from '../VTextField'

// Utilities
import { generate } from '@test'
import { cloneVNode } from 'vue'

const variants = ['underlined', 'outlined', 'filled', 'solo', 'plain'] as const
const densities = ['default', 'comfortable', 'compact'] as const

const stories = Object.fromEntries(Object.entries({
  'Default input': <VTextField />,
  Disabled: <VTextField disabled />,
  Affixes: <VTextField prefix="prefix" suffix="suffix" />,
  'Prepend/append': <VTextField prependIcon="$vuetify" appendIcon="$vuetify" />,
  'Prepend/append inner': <VTextField prependInnerIcon="$vuetify" appendInnerIcon="$vuetify" />,
  Placeholder: <VTextField placeholder="placeholder" persistentPlaceholder />,
}).map(([k, v]) => [k, (
  <div class="d-flex flex-column flex-grow-1">
    { variants.map(variant => (
      densities.map(density => (
        <div class="d-flex align-start" style="gap: 0.4rem; height: 100px;">
          { cloneVNode(v, { variant, density, label: `${variant} ${density}` }) }
          { cloneVNode(v, { variant, density, label: `with value`, modelValue: 'Value' }) }
        </div>
      ))
    )).flat()}
  </div>
)]))

describe.skip('VTextField', () => {
  it('validates input on mount', () => {
    const rule = cy.spy(v => v?.length > 4 || 'Error!').as('rule')

    cy.mount(() => (
      <VTextField rules={[rule]}></VTextField>
    ))

    cy.get('.v-text-field').should('not.have.class', 'v-input--error')
    cy.get('@rule').should('have.been.calledOnceWith', undefined)
    cy.get('.v-text-field input').type('Hello')
    cy.get('@rule').should('to.be.callCount', 6)
    cy.get('.v-text-field').should('not.have.class', 'v-input--error')
  })

  it('does not validate on mount when using validate-on lazy', () => {
    const rule = cy.spy(v => v?.length > 5 || 'Error!').as('rule')

    cy.mount(() => (
      <VTextField label="Label" validate-on="lazy" rules={[rule]} />
    ))

    cy.get('.v-text-field').should('not.have.class', 'v-input--error')
    cy.get('@rule').should('not.have.been.called')
    cy.get('.v-text-field input').type('Hello')
    cy.get('@rule').should('to.be.callCount', 5)
    cy.get('.v-text-field').should('have.class', 'v-input--error')
    cy.get('.v-messages').should('exist').invoke('text').should('equal', 'Error!')
  })

  it('handles multiple options in validate-on prop', () => {
    const rule = cy.spy(v => v?.length > 5 || 'Error!').as('rule')

    cy.mount(() => (
      <VTextField label="Label" validate-on="blur lazy" rules={[rule]} />
    ))

    cy.get('.v-text-field').should('not.have.class', 'v-input--error')
    cy.get('@rule').should('not.have.been.called')

    cy.get('.v-text-field input').type('Hello')

    cy.get('.v-text-field').should('not.have.class', 'v-input--error')
    cy.get('@rule').should('not.have.been.called')

    cy.get('.v-text-field input').blur()

    cy.get('@rule').should('have.been.calledOnce')
    cy.get('.v-text-field').should('have.class', 'v-input--error')
    cy.get('.v-messages').should('exist').invoke('text').should('equal', 'Error!')
  })

  // https://github.com/vuetifyjs/vuetify/issues/15231
  it('renders details if using hide-details="auto" and counter prop', () => {
    cy.mount(() => (
      <VTextField hide-details="auto" counter></VTextField>
    ))
      .get('.v-input__details').should('be.visible')
  })
})

// eslint-disable-next-line vitest/no-identical-title
describe('VTextField', () => {
  describe('Showcase', () => {
    generate({ stories })
  })
})

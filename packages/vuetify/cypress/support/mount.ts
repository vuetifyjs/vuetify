/// <reference types="../../types/cypress" />
import '../../src/styles/main.sass'
import type { VueWrapper } from '@vue/test-utils'
import { mount as cyMount } from 'cypress/vue'
import { createVuetify } from '../../src/framework'
import { mergeDeep } from '../../src/util'

/**
 * @example
 * cy.mount(<VBtn>My button</VBtn>)
 */
Cypress.Commands.add('mount', (component, options, vuetifyOptions) => {
  const root = document.getElementById('cy-root')!

  // add the v-application class that allows Vuetify styles to work
  if (!root.classList.contains('v-locale--is-rtl')) {
    root.classList.add('v-locale--is-ltr')
  }

  const vuetify = createVuetify(vuetifyOptions)
  const defaultOptions = {
    global: {
      stubs: {
        transition: false,
        'transition-group': false,
      },
      plugins: [vuetify],
    },
  }

  const mountOptions = mergeDeep(defaultOptions, options!, (a, b) => a.concat(b))

  return cyMount(component, mountOptions)
    .then(({ wrapper }) => {
      cy.wrap(wrapper).as('wrapper')
    })
})

Cypress.Commands.add('vue', () => {
  return cy.get<VueWrapper<any>>('@wrapper')
})

/**
 * Update the props and wait for Vue to re-render.
 * Must be chained of a chain that starts with `cy.mount`.
 *
 * @example
 * cy.mount(<VBtn>My button</VBtn>)
 *   .get('button').
 *   .should('not.have.class', 'v-btn--disabled')
 *   .setProps({ disabled: true }).
 *   .get('button')
 *   .should('have.class', 'v-btn--disabled')
 */

Cypress.Commands.add('setProps', (props: Record<string, unknown> = {}) => {
  return cy.get<VueWrapper<any>>('@wrapper').then(async wrapper => {
    await wrapper.setProps(props)
    return wrapper
  })
})

Cypress.Commands.add('emitted', (selector: Parameters<VueWrapper['getComponent']>[0], event?: string) => {
  return cy.get<VueWrapper<any>>('@wrapper').then(wrapper => {
    const cmp = wrapper.findComponent<any>(selector)

    if (!cmp) return cy.wrap({})

    return cy.wrap(event ? cmp.emitted(event) : cmp.emitted())
  })
})

import type { VueWrapper } from '@vue/test-utils'
import { mount as cyMount } from '@cypress/vue'
import { createVuetify } from '../../src/entry-bundler'
import { mergeDeep } from '../../src/util'

/**
 * @example
 * cy.mount(<VBtn>My button</VBtn>)
 */
Cypress.Commands.add('mount', (component, options, vuetifyOptions) => {
  const root = document.getElementById("__cy_root");

  // add the v-application class that allows Vuetify styles to work
  if (!root.classList.contains("v-locale--is-rtl")) {
    root.classList.add("v-locale--is-ltr");
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

  return cyMount(component, mergeDeep(defaultOptions, options, (a, b) => a.concat(b))).as('wrapper')
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
  return cy.get('@wrapper').then(async (wrapper) => {
    // `wrapper` in inferred as JQuery<HTMLElement> since custom commands
    // generally receive a Cypress.Chainable as the first arg (the "subject").
    // the custom `mount` command defined above returns a
    // Test Utils' `VueWrapper`, so we need to cast this as `unknown` first.
    let vueWrapper = (wrapper || Cypress.vueWrapper) as unknown as VueWrapper<any>
    await vueWrapper.setProps(props)
    return vueWrapper
  })
})

Cypress.Commands.add('vue', () => {
  return cy.get('@wrapper')
})

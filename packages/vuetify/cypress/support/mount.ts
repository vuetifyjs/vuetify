import { mount as cyMount } from '@cypress/vue'
import { createVuetify } from '../../src/entry-bundler'

Cypress.Commands.add('mount', (component, options, vuetifyOptions) => {
  const vuetify = createVuetify(vuetifyOptions)
  const defaultOptions = {
    global: {
      plugins: [vuetify],
    },
  }

  return cyMount(component, { ...defaultOptions, ...options }).as('wrapper')
})

Cypress.Commands.add('setProps', (wrapper, props = {}) => {
  return cy.get('@wrapper').then(async (wrapper) => {
    wrapper = wrapper || Cypress.vueWrapper
    await wrapper.setProps(props)
    return wrapper
  })
})

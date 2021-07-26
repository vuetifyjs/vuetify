import { mount as cyMount } from '@cypress/vue'
import { createVuetify } from '../../src/entry-bundler'

Cypress.Commands.add('mount', (component, options, vuetifyOptions) => {
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

  return cyMount(component, { ...defaultOptions, ...options })
})

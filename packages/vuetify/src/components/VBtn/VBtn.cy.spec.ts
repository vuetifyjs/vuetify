/// <reference types="cypress" />
import { createVuetify } from '@/entry-bundler'
import { mount } from '@cypress/vue'
import { h } from 'vue'
import VBtn from './VBtn'

describe('VBtn', () => {
  it('basic button', () => {
    const vuetify = createVuetify()
    mount(VBtn, {
      global: {
        plugins: [vuetify],
      },
      slots: {
        default: 'Button',
      },
    })
  })

  it('renders many buttons', () => {
    const vuetify = createVuetify()
    mount(() => ['success', 'info', 'warning', 'error'].map(color =>
      h(VBtn, { color }, () => 'Button 1')
    ),
    {
      global: {
        plugins: [vuetify],
      },
    })
    expect(true).to.be.true
  })
})

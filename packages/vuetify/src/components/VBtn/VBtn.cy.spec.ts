import { createVuetify } from '@/framework'
import { mount } from '@cypress/vue'
import { h } from 'vue'
import VBtn from './VBtn'

describe('VBtn', () => {
  /* eslint-disable jest/expect-expect */
  it('basic button', () => {
    const vuetify = createVuetify()
    mount(VBtn, {
      global: {
        plugins: [vuetify],
        components: {
          VBtn,
        },
      },
      slots: {
        default: 'Button',
      },
    })
  })

  /* eslint-disable jest/expect-expect */
  it('renders many buttons', () => {
    const vuetify = createVuetify()
    mount(() => ['success', 'info', 'warning', 'error'].map(color =>
      h(VBtn, { color }, () => 'Button 1')
    ),
    {
      global: {
        plugins: [vuetify],
        components: {
          VBtn,
        },
      },
    })
  })
})

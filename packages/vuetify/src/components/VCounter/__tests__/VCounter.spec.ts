// Components
import { VCounter } from '..'

// Utilities
import { createVuetify } from '@/framework'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from '@jest/globals'

describe('VDivider', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount(VCounter, {
      global: { plugins: [vuetify] },
      ...options,
    })
  }
})

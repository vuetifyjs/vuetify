// Composables
import { getWeek, makeDateProps, useDate } from '../date'
import { createVuetify } from '@/framework'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { VuetifyDateAdapter } from '../adapters/vuetify'

describe('date.ts', () => {
  const Component = defineComponent({
    props: makeDateProps(),

    setup (props) {
      const date = useDate()

      return { date }
    },

    render () {
      return h('div', this.$slots.default?.(this.date))
    },
  })

  const vuetify = createVuetify({
    date: {
      adapter: VuetifyDateAdapter,
    },
  })

  it('should have the correct days in a month', () => {
    const adapter = new VuetifyDateAdapter({ locale: 'en-US' })

    expect(getWeek(adapter, adapter.date('2023-10-10'))).toBe(41)
  })
})

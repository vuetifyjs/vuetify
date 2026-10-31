// Components
import { VPieTooltip } from '../VPieTooltip'
import { VListItem } from '@/components/VList/VListItem'

// Utilities
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { createVuetify } from '@/framework'

// Types
import type { PieItem } from '../types'

describe('VPieTooltip', () => {
  const vuetify = createVuetify()
  const tooltipStub = defineComponent({
    name: 'VTooltip',
    setup (_, { slots }) {
      return () => h('div', slots.default?.())
    },
  })

  const item = {
    key: 'food',
    title: '🍜 Food',
    value: 620,
    color: 'rgb(var(--v-theme-secondary))',
    isActive: true,
    raw: { key: 'food', title: '🍜 Food', value: 620 },
  }

  function mountTooltip (props: Record<string, any> = {}) {
    return mount(VPieTooltip, {
      props: {
        item,
        modelValue: true,
        target: [0, 0],
        ...props,
      },
      global: {
        plugins: [vuetify],
        stubs: { VTooltip: tooltipStub },
      },
    })
  }

  it('passes the complete item to title and subtitle format callbacks', () => {
    const formatTitle = vi.fn((pieItem: PieItem) => pieItem.title)
    const formatSubtitle = vi.fn((pieItem: PieItem) => new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(pieItem.value))
    const wrapper = mountTooltip({ titleFormat: formatTitle, subtitleFormat: formatSubtitle })
    const listItem = wrapper.findComponent(VListItem)

    expect(formatTitle).toHaveBeenCalledWith(item)
    expect(formatSubtitle).toHaveBeenCalledWith(item)
    expect(listItem.props('title')).toBe('🍜 Food')
    expect(listItem.props('subtitle')).toBe('$620.00')
  })

  it('formats string templates for individual and aggregated items', async () => {
    const wrapper = mountTooltip({ titleFormat: '[title]', subtitleFormat: '$[value]' })
    let listItem = wrapper.findComponent(VListItem)

    expect(listItem.props('title')).toBe('🍜 Food')
    expect(listItem.props('subtitle')).toBe('$620')

    await wrapper.setProps({
      item: {
        key: Symbol('v-pie-other'),
        title: 'Other (5)',
        value: 310,
        color: 'rgb(var(--v-theme-surface-light))',
        isActive: true,
      },
    })
    listItem = wrapper.findComponent(VListItem)

    expect(listItem.props('title')).toBe('Other (5)')
    expect(listItem.props('subtitle')).toBe('$310')
  })

  it('formats an updated Other amount after overflow items are toggled', async () => {
    const formatSubtitle = vi.fn((pieItem: PieItem) => `$${pieItem.value.toFixed(2)}`)
    const wrapper = mountTooltip({
      item: {
        key: Symbol('v-pie-other'),
        title: 'Other',
        value: 310,
        color: 'rgb(var(--v-theme-surface-light))',
        isActive: true,
      },
      subtitleFormat: formatSubtitle,
    })

    expect(wrapper.findComponent(VListItem).props('subtitle')).toBe('$310.00')

    await wrapper.setProps({
      item: {
        key: Symbol('v-pie-other'),
        title: 'Other',
        value: 215,
        color: 'rgb(var(--v-theme-surface-light))',
        isActive: true,
      },
    })

    expect(wrapper.findComponent(VListItem).props('subtitle')).toBe('$215.00')
  })
})

// Components
import { VPie } from '../VPie'
import { VPieSegment } from '../VPieSegment'
import { VListItem } from '@/components/VList/VListItem'

// Utilities
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { createVuetify } from '@/framework'

// Types
import type { PieItem } from '../types'

describe('VPie', () => {
  const vuetify = createVuetify()
  const tooltipStub = defineComponent({
    name: 'VTooltip',
    setup (_, { slots }) {
      return () => h('div', slots.default?.())
    },
  })
  const items = [
    { key: 'a', title: 'A', value: 15 },
    { key: 'b', title: 'B', value: 50 },
    { key: 'c', title: 'C', value: 30 },
    { key: 'd', title: 'D', value: 5 },
  ]

  function mountPie (props: Record<string, any> = {}) {
    return mount(VPie, {
      props: {
        items,
        maxVisibleItems: 2,
        legend: true,
        ...props,
      },
      slots: {
        legend: ({ items, toggle }: any) => items.map((item: any) => h('button', {
          key: item.key,
          onClick: () => toggle(item),
        }, item.title)),
      },
      global: {
        plugins: [vuetify],
        stubs: { VTooltip: tooltipStub },
      },
    })
  }

  it('groups items after the largest individual slices into Other', () => {
    const wrapper = mountPie()
    const segments = wrapper.findAllComponents(VPieSegment)

    expect(segments).toHaveLength(3)
    expect(segments.map(segment => segment.props('value'))).toEqual([50, 30, 20])
    expect(segments[2].props('color')).toBe('color-mix(in srgb, rgb(var(--v-theme-primary)) 50%, rgb(var(--v-theme-error)))')
  })

  it('supports a limit of one visible slice', () => {
    const wrapper = mountPie({ maxVisibleItems: 1 })
    const segments = wrapper.findAllComponents(VPieSegment)

    expect(segments.map(segment => segment.props('value'))).toEqual([50, 50])
  })

  it.each([items.length, items.length + 1])('does not create Other when the limit is %s', maxVisibleItems => {
    const wrapper = mountPie({ maxVisibleItems })
    const segments = wrapper.findAllComponents(VPieSegment)

    expect(segments).toHaveLength(items.length)
    expect(segments.map(segment => segment.props('value'))).toEqual([15, 50, 30, 5])
  })

  it('keeps source order when values tie at the visible-slice limit', () => {
    const wrapper = mountPie({
      maxVisibleItems: 2,
      items: [
        { key: 'a', title: 'A', value: 40, color: 'red' },
        { key: 'b', title: 'B', value: 40, color: 'teal' },
        { key: 'c', title: 'C', value: 40, color: 'orange' },
        { key: 'd', title: 'D', value: 10, color: 'purple' },
      ],
    })
    const segments = wrapper.findAllComponents(VPieSegment)

    expect(segments.map(segment => segment.props('color'))).toEqual([
      'red',
      'teal',
      'color-mix(in srgb, rgb(var(--v-theme-primary)) 50%, rgb(var(--v-theme-error)))',
    ])
    expect(segments.map(segment => segment.props('value'))).toEqual([40 / 130 * 100, 40 / 130 * 100, 50 / 130 * 100])
  })

  it('updates the grouping when maxVisibleItems changes', async () => {
    const wrapper = mountPie()

    await wrapper.setProps({ maxVisibleItems: 3 })
    expect(wrapper.findAllComponents(VPieSegment).map(segment => segment.props('value'))).toEqual([15, 50, 30, 5])

    await wrapper.setProps({ maxVisibleItems: 1 })
    expect(wrapper.findAllComponents(VPieSegment).map(segment => segment.props('value'))).toEqual([50, 50])
  })

  it('uses the provided color for the Other slice', () => {
    const wrapper = mountPie({ otherColor: 'purple' })
    const segments = wrapper.findAllComponents(VPieSegment)

    expect(segments[2].props('color')).toBe('purple')
  })

  it('formats an updated Other tooltip from the complete item', async () => {
    const formatTitle = vi.fn((item: PieItem) => item.raw ? item.title : `Other (${item.value})`)
    const formatSubtitle = vi.fn((item: PieItem) => `$${item.value.toFixed(2)}`)
    const wrapper = mountPie({ tooltip: { titleFormat: formatTitle, subtitleFormat: formatSubtitle } })
    const buttons = wrapper.findAll('button')

    await buttons.find(button => button.text() === 'D')!.trigger('click')
    await wrapper.findAllComponents(VPieSegment)[2]!.vm.$emit('update:active', true)

    let listItem = wrapper.findComponent(VListItem)
    expect(listItem.props('title')).toBe('Other (15)')
    expect(listItem.props('subtitle')).toBe('$15.00')
    expect(formatSubtitle).toHaveBeenLastCalledWith(expect.objectContaining({
      title: 'Other',
      value: 15,
      raw: undefined,
    }))

    await buttons.find(button => button.text() === 'A')!.trigger('click')
    await wrapper.findAllComponents(VPieSegment)[2]!.vm.$emit('update:active', true)

    listItem = wrapper.findComponent(VListItem)
    expect(listItem.props('title')).toBe('Other (0)')
    expect(listItem.props('subtitle')).toBe('$0.00')
  })

  it.each([
    { type: 'pie', props: {}, expectedValues: [50, 30, 20] },
    { type: 'donut', props: { innerCut: 40 }, expectedValues: [50, 30, 20] },
    {
      type: 'gauge',
      props: { gaugeCut: 120 },
      expectedValues: [
        50 / 100 * (100 - 120 / 3.6),
        30 / 100 * (100 - 120 / 3.6),
        20 / 100 * (100 - 120 / 3.6),
      ],
    },
  ])('groups overflow items for $type charts', ({ props, expectedValues }) => {
    const wrapper = mountPie(props)
    const values = wrapper.findAllComponents(VPieSegment).map(segment => segment.props('value'))

    expect(values).toHaveLength(3)
    expect(values.every(Number.isFinite)).toBe(true)
    expect(values).toEqual(expectedValues)
  })

  it('updates Other when overflow items are toggled and removes its value when all are hidden', async () => {
    const wrapper = mountPie()
    const buttons = wrapper.findAll('button')

    await buttons.find(button => button.text() === 'A')!.trigger('click')
    let segments = wrapper.findAllComponents(VPieSegment)
    expect(segments.map(segment => segment.props('value'))).toEqual([50 / 85 * 100, 30 / 85 * 100, 5 / 85 * 100])

    await buttons.find(button => button.text() === 'A')!.trigger('click')
    segments = wrapper.findAllComponents(VPieSegment)
    expect(segments.map(segment => segment.props('value'))).toEqual([50, 30, 20])

    await buttons.find(button => button.text() === 'D')!.trigger('click')
    segments = wrapper.findAllComponents(VPieSegment)
    expect(segments).toHaveLength(3)
    expect(segments.map(segment => segment.props('value'))).toEqual([50 / 95 * 100, 30 / 95 * 100, 15 / 95 * 100])

    await buttons.find(button => button.text() === 'A')!.trigger('click')
    segments = wrapper.findAllComponents(VPieSegment)
    expect(segments[2].props('value')).toBe(0)
  })

  it('keeps all items as individual slices when maxVisibleItems is omitted', () => {
    const wrapper = mountPie({ maxVisibleItems: undefined })

    expect(wrapper.findAllComponents(VPieSegment)).toHaveLength(items.length)
  })

  it.each([0, -1, 1.5, Infinity])('falls back to individual slices when maxVisibleItems is invalid (%s)', maxVisibleItems => {
    const wrapper = mountPie({ maxVisibleItems })

    expect(wrapper.findAllComponents(VPieSegment)).toHaveLength(items.length)
  })

  it('treats invalid item values as zero', () => {
    const wrapper = mountPie({
      maxVisibleItems: 1,
      items: [
        { key: 'valid', title: 'Valid', value: 50 },
        { key: 'negative', title: 'Negative', value: -1 },
        { key: 'string', title: 'String', value: '10' },
        { key: 'nan', title: 'NaN', value: NaN },
        { key: 'infinite', title: 'Infinite', value: Infinity },
      ],
    })

    expect(wrapper.findAllComponents(VPieSegment).map(segment => segment.props('value'))).toEqual([100, 0])
  })

  it('uses internal keys for missing or duplicate item keys', async () => {
    const wrapper = mountPie({
      maxVisibleItems: 3,
      items: [
        { title: 'Missing key', value: 50 },
        { key: 'duplicate', title: 'First duplicate', value: 30 },
        { key: 'duplicate', title: 'Second duplicate', value: 20 },
      ],
    })

    await wrapper.findAll('button').find(button => button.text() === 'Second duplicate')!.trigger('click')
    expect(wrapper.findAllComponents(VPieSegment).map(segment => segment.props('value'))).toEqual([50 / 80 * 100, 30 / 80 * 100, 0])
  })

  it('renders zero-valued items without producing NaN segment values', () => {
    const wrapper = mountPie({
      items: [
        { key: 'a', title: 'A', value: 0 },
        { key: 'b', title: 'B', value: 0 },
      ],
    })

    expect(wrapper.findAllComponents(VPieSegment).map(segment => segment.props('value'))).toEqual([0, 0])
  })
})

// Components
import VRating from '../VRating'

// Utilities
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'
import { h } from 'vue'

describe('VRating', () => {
  const vuetify = createVuetify()
  const mountFunction = (options?: any) => {
    return mount(VRating, {
      ...options,
      global: {
        plugins: [vuetify],
      },
    })
  }

  it('should respond to prop value changes', async () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ modelValue: 1 })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should respond to user interaction', async () => {
    const wrapper = mountFunction()

    const items = wrapper.findAll('.v-rating__item > button')

    await items[0].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([
      [1],
    ])
  })

  it('should not clear value if using clearable prop', async () => {
    const wrapper = mountFunction({
      props: {
        modelValue: 1,
        clearable: true,
      },
    })

    const items = wrapper.findAll('.v-rating__item button')

    await items[0].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([
      [0],
    ])

    await wrapper.setProps({ modelValue: 1, clearable: false })

    await items[0].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([
      [0],
      [1],
    ])
  })

  it('should not react to events when readonly', async () => {
    const wrapper = mountFunction({
      props: {
        readonly: true,
      },
    })

    const items = wrapper.findAll('.v-rating__item button')

    await items[0].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('should change icon on hover', async () => {
    const wrapper = mountFunction({
      props: {
        hover: true,
      },
    })

    const items = wrapper.findAll('.v-rating__item > button')

    await items[2].trigger('mouseenter')

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a scoped item slot', () => {
    const wrapper = mountFunction({
      slots: {
        item: (props: any) => h('div', props.index),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a scoped item-label slot', () => {
    const wrapper = mountFunction({
      slots: {
        'item-label': () => h('span', ['foo']),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})

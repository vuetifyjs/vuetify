// Components
import VRating from '../VRating'

// Utilities
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'
import { h } from '@vue/runtime-core'

describe('VRating.ts', () => {
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

  // it('should check for half event', () => {
  //   const wrapper = mountFunction()

  //   const event = new MouseEvent('hover')
  //   expect(wrapper.vm.genHoverIndex(event, 1)).toBe(2)

  //   wrapper.setProps({ halfIncrements: true })

  //   expect(wrapper.vm.genHoverIndex({
  //     pageX: 0,
  //     target: {
  //       getBoundingClientRect: () => ({ width: 10, left: 0 }),
  //     },
  //   }, 1)).toBe(1.5)

  //   expect(wrapper.vm.genHoverIndex({
  //     pageX: 6,
  //     target: {
  //       getBoundingClientRect: () => ({ width: 10, left: 0 }),
  //     },
  //   }, 1)).toBe(2)
  // })

  // it('should check for half event in rtl', () => {
  //   const wrapper = mountFunction({
  //     propsData: { halfIncrements: true },
  //     mocks: {
  //       $vuetify: {
  //         rtl: true,
  //         lang: {
  //           t: str => str,
  //         },
  //       },
  //     },
  //   })

  //   const event = new MouseEvent('hover')
  //   expect(wrapper.vm.genHoverIndex(event, 1)).toBe(1.5)

  //   wrapper.setProps({ halfIncrements: true })

  //   expect(wrapper.vm.genHoverIndex({
  //     pageX: 0,
  //     target: {
  //       getBoundingClientRect: () => ({ width: 10, left: 0 }),
  //     },
  //   }, 1)).toBe(2)

  //   expect(wrapper.vm.genHoverIndex({
  //     pageX: 6,
  //     target: {
  //       getBoundingClientRect: () => ({ width: 10, left: 0 }),
  //     },
  //   }, 1)).toBe(1.5)
  // })

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

  // it('should bind mousemove listener', () => {
  //   const onMouseEnter = jest.fn()
  //   const wrapper = mountFunction({
  //     propsData: {
  //       halfIncrements: true,
  //       hover: true,
  //     },
  //     methods: { onMouseEnter },
  //   })

  //   const icon = wrapper.find('.v-icon')

  //   icon.trigger('mousemove')

  //   expect(onMouseEnter).toHaveBeenCalled()
  // })

  // it('should reset hoverIndex on mouse leave', () => {
  //   jest.useFakeTimers()
  //   const wrapper = mountFunction({
  //     propsData: { hover: true },
  //   })

  //   const icon = wrapper.find('.v-icon')

  //   expect(wrapper.vm.hoverIndex).toBe(-1)

  //   icon.trigger('mouseenter')
  //   jest.runAllTimers()

  //   expect(wrapper.vm.hoverIndex).toBe(1)

  //   icon.trigger('mouseleave')
  //   jest.runAllTimers()

  //   expect(wrapper.vm.hoverIndex).toBe(-1)
  // })
})

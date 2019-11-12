// Libraries
import Vue from 'vue'

// Components
import VRating from '../VRating'

// Utilities
import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'
import { ExtractVue } from '../../../util/mixins'

describe('VRating.ts', () => {
  type Instance = ExtractVue<typeof VRating>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options: MountOptions<Instance>) => {
      return mount(VRating, {
        // https://github.com/vuejs/vue-test-utils/issues/1130
        sync: false,
        mocks: {
          $vuetify: {
            rtl: false,
          },
        },
        ...options,
      })
    }
  })

  it('should not register directives if readonly or !ripple', () => {
    const wrapper = mountFunction({
      propsData: {
        readonly: true,
      },
    })

    expect(wrapper.vm.directives).toHaveLength(0)

    wrapper.setProps({ readonly: false })

    expect(wrapper.vm.directives).toHaveLength(1)

    wrapper.setProps({ ripple: false })

    expect(wrapper.vm.directives).toHaveLength(0)
  })

  it('should respond to internal and prop value changes', async () => {
    const wrapper = mountFunction()

    const input = jest.fn()
    wrapper.vm.$on('input', input)
    expect(wrapper.vm.internalValue).toBe(0)

    wrapper.setProps({ value: 1 })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toBe(1)

    expect(input).not.toHaveBeenCalled()

    const icon = wrapper.findAll('.v-icon').at(1)

    icon.trigger('click')

    await wrapper.vm.$nextTick()

    expect(input).toHaveBeenCalledWith(2)
  })

  it('should not null the rating if clicked on the current value unless clearable', async () => {
    const wrapper = mountFunction()

    const input = jest.fn()
    wrapper.vm.$on('input', input)
    expect(wrapper.vm.internalValue).toBe(0)

    wrapper.setProps({ value: 1, clearable: false })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toBe(1)

    const icon = wrapper.find('.v-icon')

    icon.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toBe(1)

    wrapper.setProps({ clearable: true })

    icon.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toBe(0)
  })

  it('should not react to events when readonly', async () => {
    const wrapper = mountFunction({
      propsData: {
        readonly: true,
      },
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    const icon = wrapper.find('.v-icon')

    icon.trigger('click')

    await wrapper.vm.$nextTick()

    expect(input).not.toHaveBeenCalled()

    wrapper.setProps({ readonly: false })

    icon.trigger('click')

    await wrapper.vm.$nextTick()

    expect(input).toHaveBeenCalledWith(1)
  })

  it('should change hover index on mouse action', async () => {
    jest.useFakeTimers()

    const wrapper = mountFunction({
      propsData: {
        hover: true,
      },
    })

    const icons = wrapper.findAll('.v-icon')
    const icon1 = icons.at(0)
    const icon2 = icons.at(3)

    expect(wrapper.vm.hoverIndex).toBe(-1)

    icon1.trigger('mouseenter')

    jest.runAllTimers()

    expect(wrapper.vm.hoverIndex).toBe(1)

    icon2.trigger('mouseenter')

    jest.runAllTimers()

    expect(wrapper.vm.hoverIndex).toBe(4)
  })

  it('should check for half event', () => {
    const wrapper = mountFunction()

    const event = new MouseEvent('hover')
    expect(wrapper.vm.genHoverIndex(event, 1)).toBe(2)

    wrapper.setProps({ halfIncrements: true })

    expect(wrapper.vm.genHoverIndex({
      pageX: 0,
      target: {
        getBoundingClientRect: () => ({ width: 10, left: 0 }),
      },
    }, 1)).toBe(1.5)

    expect(wrapper.vm.genHoverIndex({
      pageX: 6,
      target: {
        getBoundingClientRect: () => ({ width: 10, left: 0 }),
      },
    }, 1)).toBe(2)
  })

  it('should check for half event in rtl', () => {
    const wrapper = mountFunction({
      mocks: {
        $vuetify: {
          rtl: true,
        },
      },
    })

    const event = new MouseEvent('hover')
    expect(wrapper.vm.genHoverIndex(event, 1)).toBe(1.5)

    wrapper.setProps({ halfIncrements: true })

    expect(wrapper.vm.genHoverIndex({
      pageX: 0,
      target: {
        getBoundingClientRect: () => ({ width: 10, left: 0 }),
      },
    }, 1)).toBe(2)

    expect(wrapper.vm.genHoverIndex({
      pageX: 6,
      target: {
        getBoundingClientRect: () => ({ width: 10, left: 0 }),
      },
    }, 1)).toBe(1.5)
  })

  it('should render a scoped slot', () => {
    const vm = new Vue()
    const itemSlot = () => [vm.$createElement('span', 'foobar')]

    const component = Vue.component('test', {
      render: h => h(VRating, {
        scopedSlots: {
          item: itemSlot,
        },
      }),
    })

    const wrapper = mount(component, {
      // https://github.com/vuejs/vue-test-utils/issues/1130
      sync: false,
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('it should bind mousemove listener', () => {
    const onMouseEnter = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        halfIncrements: true,
        hover: true,
      },
      methods: { onMouseEnter },
    })

    const icon = wrapper.find('.v-icon')

    icon.trigger('mousemove')

    expect(onMouseEnter).toHaveBeenCalled()
  })

  it('should reset hoverIndex on mouse leave', () => {
    jest.useFakeTimers()
    const wrapper = mountFunction({
      propsData: { hover: true },
    })

    const icon = wrapper.find('.v-icon')

    expect(wrapper.vm.hoverIndex).toBe(-1)

    icon.trigger('mouseenter')
    jest.runAllTimers()

    expect(wrapper.vm.hoverIndex).toBe(1)

    icon.trigger('mouseleave')
    jest.runAllTimers()

    expect(wrapper.vm.hoverIndex).toBe(-1)
  })
})

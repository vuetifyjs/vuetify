import { test } from '@/test'
import VRating from '@/components/VRating'
import Vue from 'vue'

test('VRating.js', ({ mount }) => {
  it('should not register directives if readonly or !ripple', () => {
    const wrapper = mount(VRating, {
      propsData: {
        readonly: true
      }
    })

    expect(wrapper.vm.directives.length).toEqual(0)

    wrapper.setProps({ readonly: false })

    expect(wrapper.vm.directives.length).toBe(1)

    wrapper.setProps({ ripple: false })

    expect(wrapper.vm.directives.length).toBe(0)
  })

  it('should respond to internal and prop value changes', async () => {
    const wrapper = mount(VRating)

    const input = jest.fn()
    wrapper.vm.$on('input', input)
    expect(wrapper.vm.internalValue).toBe(0)

    wrapper.setProps({ value: 1 })

    expect(wrapper.vm.internalValue).toBe(1)

    expect(input).not.toHaveBeenCalled()

    const icon = wrapper.find('.v-icon')[1]

    icon.trigger('click')

    await wrapper.vm.$nextTick()

    expect(input).toHaveBeenCalledWith(2)
  })

  it('should not null the rating if clicked on the current value unless clearable', async () => {
    const wrapper = mount(VRating)

    const input = jest.fn()
    wrapper.vm.$on('input', input)
    expect(wrapper.vm.internalValue).toBe(0)

    wrapper.setProps({ value: 1, clearable: false })

    expect(wrapper.vm.internalValue).toBe(1)

    const icon = wrapper.find('.v-icon')[0]

    icon.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toBe(1)

    wrapper.setProps({ clearable: true })

    icon.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toBe(0)
  })

  it('should not react to events when readonly', async () => {
    const wrapper = mount(VRating, {
      propsData: {
        readonly: true
      }
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    const icon = wrapper.first('.v-icon')

    icon.trigger('click')

    await wrapper.vm.$nextTick()

    expect(input).not.toBeCalled()

    wrapper.setProps({ readonly: false })

    icon.trigger('click')

    await wrapper.vm.$nextTick()

    expect(input).toBeCalledWith(1)
  })

  it('should change hover index on mouse action', async () => {
    jest.useFakeTimers()

    const wrapper = mount(VRating, {
      propsData: {
        hover: true
      }
    })

    const icons = wrapper.find('.v-icon')

    expect(wrapper.vm.hoverIndex).toBe(-1)

    icons[0].trigger('mouseenter')

    jest.runAllTimers()

    expect(wrapper.vm.hoverIndex).toBe(1)

    icons[3].trigger('mouseenter')

    jest.runAllTimers()

    expect(wrapper.vm.hoverIndex).toBe(4)
  })

  it('should check for half event', () => {
    const wrapper = mount(VRating)

    expect(wrapper.vm.genHoverIndex({}, 1)).toBe(2)

    wrapper.setProps({ halfIncrements: true })

    expect(wrapper.vm.genHoverIndex({
      pageX: 0,
      target: {
        getBoundingClientRect: () => ({ width: 10, left: 0 })
      }
    }, 1)).toBe(1.5)

    expect(wrapper.vm.genHoverIndex({
      pageX: 6,
      target: {
        getBoundingClientRect: () => ({ width: 10, left: 0 })
      }
    }, 1)).toBe(2)
  })

  it('should render a scoped slot', () => {
    const vm = new Vue()
    const itemSlot = () => vm.$createElement('span', 'foobar')

    const component = Vue.component('test', {
      render: h => h(VRating, {
        scopedSlots: {
          item: itemSlot
        }
      })
    })

    const wrapper = mount(component)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('it should bind mousemove listener', () => {
    const onMouseEnter = jest.fn()
    const wrapper = mount(VRating, {
      propsData: {
        halfIncrements: true,
        hover: true
      },
      methods: { onMouseEnter }
    })

    const icon = wrapper.first('.v-icon')

    icon.trigger('mousemove')

    expect(onMouseEnter).toBeCalled()
  })

  it('should reset hoverIndex on mouse leave', () => {
    jest.useFakeTimers()
    const wrapper = mount(VRating, {
      propsData: { hover: true }
    })

    const icon = wrapper.first('.v-icon')

    expect(wrapper.vm.hoverIndex).toBe(-1)

    icon.trigger('mouseenter')
    jest.runAllTimers()

    expect(wrapper.vm.hoverIndex).toBe(1)

    icon.trigger('mouseleave')
    jest.runAllTimers()

    expect(wrapper.vm.hoverIndex).toBe(-1)
  })
})

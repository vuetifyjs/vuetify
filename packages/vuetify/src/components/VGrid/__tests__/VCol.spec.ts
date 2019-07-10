import Vue from 'vue'
import { mount } from '@vue/test-utils'
import VCol from '../VCol'

describe('layout > col', () => {
  it('should have default expected structure', async () => {
    const wrapper = mount(VCol)

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('col')
    expect(wrapper.classes()).toHaveLength(1)
    expect(wrapper.findAll('.col > *')).toHaveLength(0)
    expect(wrapper.text()).toEqual('')
  })

  it('renders custom root element when tag prop set', async () => {
    const wrapper = mount(VCol, {
      propsData: {
        tag: 'span',
      },
    })

    expect(wrapper.is('span')).toBe(true)
    expect(wrapper.classes()).toContain('col')
    expect(wrapper.classes()).toHaveLength(1)
    expect(wrapper.findAll('.col > *')).toHaveLength(0)
    expect(wrapper.text()).toEqual('')
  })

  it('should apply breakpoint specific col-{bp}-{#} classes', async () => {
    const wrapper = mount(VCol, {
      propsData: {
        cols: 6,
        sm: 5,
        md: 4,
        lg: 3,
        xl: 2,
      },
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('col-6')
    expect(wrapper.classes()).toContain('col-sm-5')
    expect(wrapper.classes()).toContain('col-md-4')
    expect(wrapper.classes()).toContain('col-lg-3')
    expect(wrapper.classes()).toContain('col-xl-2')
    expect(wrapper.classes()).toHaveLength(5)
  })

  it('should apply ".offset-*" classes with "offset-{bp}-{#}" props', async () => {
    const wrapper = mount(VCol, {
      propsData: {
        offset: 6,
        offsetSm: 5,
        offsetMd: 4,
        offsetLg: 3,
        offsetXl: 2,
      },
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('col')
    expect(wrapper.classes()).toContain('offset-6')
    expect(wrapper.classes()).toContain('offset-sm-5')
    expect(wrapper.classes()).toContain('offset-md-4')
    expect(wrapper.classes()).toContain('offset-lg-3')
    expect(wrapper.classes()).toContain('offset-xl-2')
    expect(wrapper.classes()).toHaveLength(6)
  })

  it('should apply ".order-*" classes with "order-{bp}-{#}" props', async () => {
    const wrapper = mount(VCol, {
      propsData: {
        order: 6,
        orderSm: 5,
        orderMd: 4,
        orderLg: 3,
        orderXl: 2,
      },
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('col')
    expect(wrapper.classes()).toContain('order-6')
    expect(wrapper.classes()).toContain('order-sm-5')
    expect(wrapper.classes()).toContain('order-md-4')
    expect(wrapper.classes()).toContain('order-lg-3')
    expect(wrapper.classes()).toContain('order-xl-2')
    expect(wrapper.classes()).toHaveLength(6)
  })

  it("should apply boolean breakpoint classes for 'sm', 'md', 'lg', 'xl' prop", async () => {
    const wrapper = mount(VCol, {
      propsData: {
        sm: true,
        md: true,
        lg: true,
        xl: true,
      },
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('col')
    expect(wrapper.classes()).toContain('col-sm')
    expect(wrapper.classes()).toContain('col-md')
    expect(wrapper.classes()).toContain('col-lg')
    expect(wrapper.classes()).toContain('col-xl')
    expect(wrapper.classes()).toHaveLength(5)
  })

  it("should apply boolean breakpoint classes for 'sm', 'md', 'lg', 'xl' prop set to empty string", async () => {
    const wrapper = mount(VCol, {
      propsData: {
        sm: '',
        md: '',
        lg: '',
        xl: '',
      },
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('col')
    expect(wrapper.classes()).toContain('col-sm')
    expect(wrapper.classes()).toContain('col-md')
    expect(wrapper.classes()).toContain('col-lg')
    expect(wrapper.classes()).toContain('col-xl')
    expect(wrapper.classes()).toHaveLength(5)
  })

  it('should apply ".align-self-*" class with "align-self" prop', async () => {
    const wrapper = mount(VCol, {
      propsData: {
        alignSelf: 'center',
      },
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('col')
    expect(wrapper.classes()).toContain('align-self-center')
    expect(wrapper.classes()).toHaveLength(2)
  })

  it('should cache classes', () => {
    const wrapper = mount(VCol)
    const wrapper2 = mount(VCol)

    expect(wrapper.element.__vue__._vnode.data.class[0]).toBe(wrapper2.element.__vue__._vnode.data.class[0])
  })
})

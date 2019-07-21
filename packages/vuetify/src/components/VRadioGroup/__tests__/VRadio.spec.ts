// Components
import VRadio from '../VRadio'

// Utilities
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('VRadio.ts', () => {
  type Instance = InstanceType<typeof VRadio>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VRadio, options)
    }
  })

  it('should render role and aria-checked attributes on input group', () => {
    const wrapper = mountFunction({
      data: () => ({
        isActive: false,
      }),
      provide: {
        radio: {
          name: 'name',
          isMandatory: false,
        },
      },
    })

    let inputGroup = wrapper.find('input')
    expect(inputGroup.element.getAttribute('role')).toBe('radio')
    expect(inputGroup.element.getAttribute('aria-checked')).toBe('false')

    wrapper.setData({ isActive: true })
    inputGroup = wrapper.find('input')
    expect(inputGroup.element.getAttribute('aria-checked')).toBe('true')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not render aria-label attribute with no label value on input group', () => {
    const wrapper = mountFunction({
      propsData: {
        label: null,
      },
      provide: {
        radio: {
          name: 'name',
          isMandatory: false,
        },
      },
    })

    const inputGroup = wrapper.find('input')
    expect(inputGroup.element.getAttribute('aria-label')).toBeFalsy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render proper input name', () => {
    const wrapper = mountFunction({
      provide: {
        radioGroup: {
          name: 'name',
          register: () => {},
          unregister: () => {},
        },
      },
    })

    const input = wrapper.find('input')
    expect(input.element.getAttribute('name')).toBe('name')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should toggle on keypress', () => {
    const wrapper = mountFunction()

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    const input = wrapper.find('input')

    input.trigger('change')
    expect(change).toHaveBeenCalledTimes(1)

    input.trigger('keydown.tab')
    expect(change).toHaveBeenCalledTimes(1)
  })

  it('should not generate own colors when parent is in error', async () => {
    const wrapper = mountFunction({
      provide: {
        radioGroup: {
          register: () => {},
          unregister: () => {},
        },
      },
    })

    wrapper.setData({ isActive: true })

    await wrapper.vm.$nextTick()
  })

  it('should use custom icons', () => {
    const wrapper = mountFunction({
      propsData: {
        onIcon: 'foo',
        offIcon: 'bar',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setData({ isActive: true })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should check/uncheck the internal input', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.$refs.input.checked).toBeFalsy()

    wrapper.setData({ isActive: true })

    expect(wrapper.vm.$refs.input.checked).toBeTruthy()

    wrapper.setData({ isActive: false })

    expect(wrapper.vm.$refs.input.checked).toBeFalsy()
  })

  it('should set focused state', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.isFocused).toBe(false)

    const input = wrapper.find('input')

    input.trigger('focus')
    expect(wrapper.vm.isFocused).toBe(true)

    input.trigger('blur')
    expect(wrapper.vm.isFocused).toBe(false)
  })
})

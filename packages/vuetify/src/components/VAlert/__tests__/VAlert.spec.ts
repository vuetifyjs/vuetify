// Components
import VAlert from '../VAlert'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

// Types
import { ExtractVue } from '../../../util/mixins'

describe('VAlert.ts', () => {
  type Instance = ExtractVue<typeof VAlert>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VAlert, {
        ...options,
        mocks: {
          $vuetify: {
            lang: {
              t: (val: string) => val,
            },
          },
        },
      })
    }
  })

  it('should be open by default', () => {
    const wrapper = mountFunction()

    expect(wrapper.element.style.display).toBe('')
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ value: false })

    expect(wrapper.element.style.display).toBe('none')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have a close icon', () => {
    const wrapper = mountFunction({
      propsData: { dismissible: true },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be dismissible', () => {
    const wrapper = mountFunction({
      propsData: {
        dismissible: true,
      },
    })

    const icon = wrapper.find('.v-alert__dismissible')
    const input = jest.fn(show => wrapper.setProps({ show }))

    wrapper.vm.$on('input', input)

    icon.trigger('click')

    expect(input).toHaveBeenCalledWith(false)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have a custom icon', () => {
    const wrapper = mountFunction({
      propsData: {
        icon: 'list',
      },
    })

    const icon = wrapper.find('.v-alert__icon')

    expect(icon.text()).toBe('list')
  })

  it('should have no icon', () => {
    const wrapper = mountFunction()

    expect(wrapper.contains('.v-icon')).toBe(false)
  })

  it('should display contextual colors by type', () => {
    const wrapper = mountFunction({
      propsData: { type: 'error' },
    })

    expect(wrapper.classes('error')).toBe(true)

    wrapper.setProps({ type: 'success' })
    expect(wrapper.classes('success')).toBe(true)

    wrapper.setProps({ type: 'warning' })
    expect(wrapper.classes('warning')).toBe(true)

    wrapper.setProps({ type: 'info' })
    expect(wrapper.classes('info')).toBe(true)
  })

  it('should allow overriding color for contextual alert', () => {
    const wrapper = mountFunction({
      propsData: {
        type: 'error',
        color: 'primary',
      },
    })

    expect(wrapper.classes('primary')).toBe(true)
  })

  it('should allow overriding icon for contextual alert', () => {
    const wrapper = mountFunction({
      propsData: {
        type: 'error',
        icon: 'block',
      },
    })

    const icon = wrapper.find('.v-alert__icon')

    expect(icon.text()).toBe('block')
  })

  it('should show border', () => {
    const directions = ['top', 'right', 'bottom', 'left']
    const wrapper = mountFunction()

    expect(wrapper.classes('v-alert--border')).toBe(false)

    for (const border of directions) {
      wrapper.setProps({ border })

      expect(wrapper.classes('v-alert--border')).toBe(true)
      expect(wrapper.classes(`v-alert--border-${border}`)).toBe(true)
    }
  })

  it('should move color classes to border and icon elements', () => {
    const wrapper = mountFunction({
      propsData: {
        color: 'pink',
        border: 'left',
      },
    })
    const border = wrapper.find('.v-alert__border')

    expect(wrapper.classes('pink')).toBe(true)
    expect(border.classes('pink')).toBe(false)

    wrapper.setProps({ coloredBorder: true })
    expect(wrapper.classes('pink')).toBe(false)
    expect(border.classes('pink')).toBe(true)
    expect(border.classes('v-alert__border--has-color')).toBe(true)
  })

  it('should toggle isActive state', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.isActive).toBe(true)

    wrapper.vm.toggle()

    expect(wrapper.vm.isActive).toBe(false)
  })
})

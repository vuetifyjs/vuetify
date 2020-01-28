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

  it('should be open by default', async () => {
    const wrapper = mountFunction()

    expect(wrapper.element.style.display).toBe('')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should sets display to none when value is false', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: false,
      }
    })

    expect(wrapper.element.style.display).toBe('none')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have a close icon', () => {
    const wrapper = mountFunction({
      propsData: { dismissible: true },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be dismissible', async () => {
    const wrapper = mountFunction({
      propsData: {
        dismissible: true,
      },
    })

    const icon = wrapper.find('.v-alert__dismissible')
    const input = jest.fn()

    wrapper.vm.$on('input', input)

    icon.trigger('click')
    await wrapper.vm.$nextTick()

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
  })

  ;['success', 'error', 'warning', 'info'].forEach(type => {
    it('should display contextual colors by type', () => {
      const wrapper = mountFunction({
        propsData: { type },
      })

      expect(wrapper.classes(type)).toBe(true)
    })
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

  ;['top', 'right', 'bottom', 'left'].forEach(border => {
    it('should show border', async () => {
      const wrapper = mountFunction({
        propsData: {
          border,
        }
      })

      expect(wrapper.classes('v-alert--border')).toBe(true)
      expect(wrapper.classes(`v-alert--border-${border}`)).toBe(true)
    })
  })

  it('renders without a colored border and icons', async () => {
    const wrapper = mountFunction({
      propsData: {
        color: 'pink',
        border: 'left',
      },
    })
    const border = wrapper.find('.v-alert__border')

    expect(wrapper.classes('pink')).toBe(true)
    expect(border.classes('pink')).toBe(false)
  })

  it('renders a colored border and icons', async () => {
    const wrapper = mountFunction({
      propsData: {
        color: 'pink',
        border: 'left',
        coloredBorder: true,
      },
    })
    const border = wrapper.find('.v-alert__border')

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

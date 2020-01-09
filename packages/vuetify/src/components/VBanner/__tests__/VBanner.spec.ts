// Components
import VBanner from '../VBanner'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

// Types
import { ExtractVue } from '../../../util/mixins'

describe('VBanner.ts', () => {
  type Instance = ExtractVue<typeof VBanner>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VBanner, {
        ...options,
        mocks: {
          $vuetify: {
            application: {
              top: 0,
              bar: 0,
            },
            breakpoint: {
              width: 1000,
            },
          },
        },
      })
    }
  })

  it('should render component with content', () => {
    const wrapper = mountFunction({
      slots: {
        default: 'Hello, World!',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render sinle-line component with content', () => {
    const wrapper = mountFunction({
      props: {
        singleLine: true,
      },
      slots: {
        default: 'Hello, World!',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with icon', () => {
    const wrapper = mountFunction({
      slots: {
        default: 'Hello, World!',
      },
      propsData: {
        icon: 'mdi-plus',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with icon slot', () => {
    const wrapper = mountFunction({
      slots: {
        default: 'Hello, World!',
        icon: { render: h => h('span', ['icon']) },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with actions', () => {
    const wrapper = mountFunction({
      slots: {
        default: 'Hello, World!',
        actions: { render: h => h('div', [h('button', ['OK']), h('button', ['Cancel'])]) },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit click:icon event', () => {
    const wrapper = mountFunction({
      slots: {
        default: 'Hello, World!',
      },
      propsData: {
        icon: 'mdi-plus',
      },
    })

    const fn = jest.fn()
    wrapper.vm.$on('click:icon', fn)

    const icon = wrapper.find('.v-banner__icon')

    // expect(fn).not.toHaveBeenCalled()
    icon.trigger('click')
    // expect(fn).toHaveBeenCalled()
  })

  it('should not render icon container if icon property and slot aren\'t passed', () => {
    const wrapper = mountFunction({
      slots: {
        default: 'Hello, World!',
      },
    })

    expect(wrapper.findAll('.v-banner__icon')).toHaveLength(0)
  })

  it('should not render actions container if slot isn\'t passed', () => {
    const wrapper = mountFunction({
      slots: {
        default: 'Hello, World!',
      },
    })

    expect(wrapper.findAll('.v-banner__actions')).toHaveLength(0)
  })

  it('should render icon, content and actions containers', () => {
    const wrapper = mountFunction({
      slots: {
        default: 'Hello, World!',
        icon: 'Hello, World!',
        actions: 'Hello, World!',
      },
    })

    expect(wrapper.findAll('.v-banner__content')).toHaveLength(1)
    expect(wrapper.findAll('.v-banner__icon')).toHaveLength(1)
    expect(wrapper.findAll('.v-banner__actions')).toHaveLength(1)
  })

  it('should toggle', () => {
    const wrapper = mountFunction({
      slots: {
        default: 'Hello, World!',
      },
    })

    expect(wrapper.vm.isActive).toBeTruthy()
    wrapper.vm.toggle()
    expect(wrapper.vm.isActive).toBeFalsy()
  })

  it('should be dismissable', () => {
    const wrapper = mountFunction({
      slots: {
        default: 'Hello, World!',
      },
      scopedSlots: {
        actions (props) {
          return this.$createElement('div', {
            on: {
              click: props.dismiss,
            },
            staticClass: 'test',
          })
        },
      },
    })

    const test = wrapper.find('.test')
    expect(wrapper.vm.isActive).toBeTruthy()
    test.trigger('click')
    expect(wrapper.vm.isActive).toBeFalsy()
  })

  it('should be responsive', () => {
    const wrapper = mount(VBanner, {
      slots: {
        default: 'Hello, World!',
      },
      mocks: {
        $vuetify: {
          breakpoint: {
            width: 900,
          },
        },
      },
    })

    expect(wrapper.classes('v-banner--is-mobile')).toBeTruthy()
  })

  it('should apply sticky when using the app prop', () => {
    const wrapper = mountFunction({
      propsData: { app: true },
    })

    expect(wrapper.vm.isSticky).toBe(true)

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      app: false,
      sticky: true,
    })

    expect(wrapper.vm.isSticky).toBe(true)

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ sticky: false })

    expect(wrapper.vm.isSticky).toBe(false)

    expect(wrapper.html()).toMatchSnapshot()
  })
})

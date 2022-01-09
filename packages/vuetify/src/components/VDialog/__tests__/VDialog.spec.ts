// Components
import VDialog from '../VDialog'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

// eslint-disable-next-line max-statements
describe('VDialog.ts', () => {
  type Instance = InstanceType<typeof VDialog>
  let mountFunction: (options?: object) => Wrapper<Instance>
  let el

  beforeEach(() => {
    el = document.createElement('div')
    el.setAttribute('data-app', 'true')
    document.body.appendChild(el)
    mountFunction = (options = {}) => {
      return mount(VDialog, {
        mocks: {
          $vuetify: {
            theme: {},
            breakpoint: {},
          },
        },
        ...options,
      })
    }
  })

  afterEach(() => {
    document.body.removeChild(el)
  })

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a disabled component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        disabled: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a persistent component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        persistent: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a fullscreen component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        fullscreen: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a eager component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        eager: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a scrollable component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        scrollable: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom origin and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        origin: 'top right',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom width (max-width) and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        maxWidth: 100,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom width and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        width: '50%',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom transition and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        transition: 'fade-transition',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should open dialog on activator click', async () => {
    const input = jest.fn()
    const wrapper = mountFunction({
      scopedSlots: {
        activator ({ on }) {
          return this.$createElement('div', {
            staticClass: 'activator',
            on,
          })
        },
      },
    })

    wrapper.vm.$on('input', input)

    expect(wrapper.vm.isActive).toBe(false)
    wrapper.find('div.activator').trigger('click')
    expect(wrapper.vm.isActive).toBe(true)
    await wrapper.vm.$nextTick()
    expect(input).toHaveBeenCalledWith(true)
  })

  it('not should open disabed dialog on activator click', async () => {
    const input = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        disabled: true,
      },
      scopedSlots: {
        // eslint-disable-next-line sonarjs/no-identical-functions
        activator ({ on }) {
          return this.$createElement('div', {
            staticClass: 'activator',
            on,
          })
        },
      },
    })

    wrapper.vm.$on('input', input)

    expect(wrapper.vm.isActive).toBe(false)
    wrapper.find('div.activator').trigger('click')
    expect(wrapper.vm.isActive).toBe(false)
    await wrapper.vm.$nextTick()
    expect(input).not.toHaveBeenCalled()
  })

  it('not change state on v-model update', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: false,
      },
      scopedSlots: {
        activator: '<span>activator</span>',
      },
    })

    expect(wrapper.vm.isActive).toBe(false)

    wrapper.setProps({
      value: true,
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isActive).toBe(true)

    wrapper.setProps({
      value: false,
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isActive).toBe(false)
  })

  it('should emit keydown event', async () => {
    const keydown = jest.fn()
    const wrapper = mountFunction({
      propsData: { value: true },
    })
    wrapper.vm.$on('keydown', keydown)

    await wrapper.vm.$nextTick()
    wrapper.vm.$refs.content.dispatchEvent(new Event('keydown'))
    expect(keydown).toHaveBeenCalled()
  })

  // https://github.com/vuetifyjs/vuetify/issues/3101
  it('should always remove scrollbar when fullscreen', async () => {
    const wrapper = mountFunction()

    wrapper.setProps({ value: true })

    await wrapper.vm.$nextTick()

    expect(document.documentElement.className).not.toContain('overflow-y-hidden')

    wrapper.setProps({ fullscreen: true })

    await wrapper.vm.$nextTick()

    expect(document.documentElement.className).toContain('overflow-y-hidden')
  })

  it('should not respond to events if disabled', async () => {
    const wrapper = mountFunction({
      propsData: {
        disabled: true,
      },
      scopedSlots: {
        // eslint-disable-next-line sonarjs/no-identical-functions
        activator ({ on }) {
          return this.$createElement('div', {
            staticClass: 'activator',
            on,
          })
        },
      },
    })

    const activator = wrapper.find('div.activator')
    activator.trigger('click')

    expect(wrapper.vm.isActive).toBe(false)
  })

  // https://github.com/vuetifyjs/vuetify/issues/5533
  it('should emit click:outside', async () => {
    const input = jest.fn()
    const clickOutside = jest.fn()
    const wrapper = mountFunction({
      scopedSlots: {
        // eslint-disable-next-line sonarjs/no-identical-functions
        activator ({ on }) {
          return this.$createElement('div', {
            staticClass: 'activator',
            on,
          })
        },
      },
    })

    wrapper.vm.$on('input', input)
    wrapper.vm.$on('click:outside', clickOutside)

    expect(wrapper.vm.isActive).toBe(false)
    wrapper.find('div.activator').trigger('click')
    expect(wrapper.vm.isActive).toBe(true)
    await wrapper.vm.$nextTick()
    expect(input).toHaveBeenCalledWith(true)

    wrapper.vm.onClickOutside(new Event('click'))
    expect(clickOutside).toHaveBeenCalled()
  })

  // Ensure dialog opens up when provided a default value
  it('should set model active before mounted', () => {
    const wrapper = mountFunction({
      propsData: { value: true },
    })

    expect(wrapper.vm.isActive).toBe(true)
  })

  it('should close dialog on escape keydown', () => {
    const wrapper = mountFunction({
      propsData: { value: true },
    })

    expect(wrapper.vm.isActive).toBe(true)
    const content = wrapper.find('.v-dialog__content')
    content.trigger('keydown.esc')
    expect(wrapper.vm.isActive).toBe(false)
  })

  it('should only set tabindex if active', () => {
    const wrapper = mountFunction({
      propsData: { eager: true },
    })

    const dialog = wrapper.find('.v-dialog')

    expect(dialog.html()).toMatchSnapshot()
    expect(dialog.element.tabIndex).toBe(-1)

    wrapper.setData({ isActive: true })

    expect(dialog.element.tabIndex).toBe(0)
    expect(dialog.html()).toMatchSnapshot()
  })

  // https://github.com/vuetifyjs/vuetify/issues/8697
  it('should not close if persistent and hide-overly when click outside', async () => {
    const input = jest.fn()
    const clickOutside = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        persistent: true,
        hideOverlay: true,
      },
      scopedSlots: {
        // eslint-disable-next-line sonarjs/no-identical-functions
        activator ({ on }) {
          return this.$createElement('div', {
            staticClass: 'activator',
            on,
          })
        },
      },
    })

    wrapper.vm.$on('input', input)
    wrapper.vm.$on('click:outside', clickOutside)

    expect(wrapper.vm.isActive).toBe(false)
    wrapper.find('div.activator').trigger('click')
    expect(wrapper.vm.isActive).toBe(true)
    await wrapper.vm.$nextTick()
    expect(input).toHaveBeenCalledWith(true)

    wrapper.vm.onClickOutside(new Event('click'))
    expect(clickOutside).toHaveBeenCalled()
    expect(wrapper.vm.isActive).toBe(true)
  })
})

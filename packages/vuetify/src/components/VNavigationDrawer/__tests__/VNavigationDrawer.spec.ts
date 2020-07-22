// Components
import VNavigationDrawer from '../VNavigationDrawer'

// Services
import { Application } from '../../../services/application'
import { Breakpoint } from '../../../services/breakpoint'
import { preset } from '../../../presets/default'

// Utilities
import {
  resizeWindow,
  touch,
} from '../../../../test'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

beforeEach(() => resizeWindow(1920, 1080))

describe('VNavigationDrawer', () => { // eslint-disable-line max-statements
  type Instance = InstanceType<typeof VNavigationDrawer>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      const breakpoint = new Breakpoint(preset)
      breakpoint.init()
      return mount(VNavigationDrawer, {
        ...options,
        mocks: {
          $vuetify: {
            rtl: false,
            theme: {
              dark: false,
            },
            breakpoint,
            application: new Application(),
          },
        },
      })
    }
  })

  it('should become temporary when the window resizes', async () => {
    const wrapper = mountFunction({
      propsData: { app: true },
    })

    expect(wrapper.vm.isActive).toBe(true)
    await resizeWindow(1200)
    wrapper.vm.$vuetify.breakpoint.width = 1200
    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.vm.overlay).toBeFalsy()
  })

  it('should not resize the content when temporary', async () => {
    const wrapper = mountFunction({
      propsData: {
        app: true,
        temporary: true,
        value: true,
      },
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$vuetify.application.left).toBe(0)
    expect(wrapper.vm.overlay).toBeTruthy()
  })

  it('should not resize the content when permanent and stateless', async () => {
    const wrapper = mountFunction({ propsData: {
      app: true,
      permanent: true,
      stateless: true,
    } })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$vuetify.application.left).toBe(256)

    await resizeWindow(1200)
    expect(wrapper.vm.$vuetify.application.left).toBe(256)
    expect(wrapper.vm.overlay).toBeFalsy()
  })

  it('should not resize the content when permanent and resize watcher is disabled', async () => {
    const wrapper = mountFunction({
      propsData: {
        app: true,
        permanent: true,
        disableResizeWatcher: true,
      },
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$vuetify.application.left).toBe(256)

    await resizeWindow(1200)
    expect(wrapper.vm.$vuetify.application.left).toBe(256)
    expect(wrapper.vm.overlay).toBeFalsy()
  })

  it('should stay active when resizing a temporary drawer', async () => {
    const wrapper = mountFunction({
      propsData: {
        app: true,
        temporary: true,
        value: true,
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.overlay).toBeTruthy()

    await resizeWindow(1200)

    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.overlay).toBeTruthy()
  })

  it('should open when changed to permanent', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: null,
      },
    })

    wrapper.setProps({ permanent: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isActive).toBe(true)
  })

  it('should not close when value changes and permanent', async () => {
    const wrapper = mountFunction({
      propsData: {
        permanent: true,
        value: true,
      },
    })

    wrapper.setProps({ value: false })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isActive).toBe(true)
  })

  it('should update content padding when temporary state is changed', async () => {
    const wrapper = mountFunction({ propsData: {
      app: true,
    } })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$vuetify.application.left).toBe(256)

    wrapper.setProps({ temporary: true })
    expect(wrapper.vm.$vuetify.application.left).toBe(0)

    wrapper.setProps({ temporary: false })
    expect(wrapper.vm.$vuetify.application.left).toBe(256)
  })

  it('should update content padding when permanent state is changed', async () => {
    const wrapper = mountFunction({ propsData: {
      app: true,
    } })
    await resizeWindow(800)
    wrapper.vm.$vuetify.breakpoint.width = 800
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$vuetify.application.left).toBe(0)

    wrapper.setProps({ permanent: true })
    expect(wrapper.vm.$vuetify.application.left).toBe(256)

    wrapper.setProps({ permanent: false })
    expect(wrapper.vm.$vuetify.application.left).toBe(0)
  })

  it('should update content padding when miniVariant is changed', async () => {
    const wrapper = mountFunction({ propsData: {
      app: true,
    } })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$vuetify.application.left).toBe(256)

    wrapper.setProps({ miniVariant: true })
    expect(wrapper.vm.$vuetify.application.left).toBe(56)

    wrapper.setProps({ miniVariant: false })
    expect(wrapper.vm.$vuetify.application.left).toBe(256)
  })

  it('should not remain mobile when temporary is toggled', async () => {
    await resizeWindow(800)
    const wrapper = mountFunction({ propsData: {
      temporary: true,
    } })

    await resizeWindow(1920)
    expect(wrapper.vm.isMobile).toBe(false)
  })

  it('should stay closed when mobile and temporary is enabled', async () => {
    const wrapper = mountFunction({
      propsData: { app: true },
    })
    await resizeWindow(800)
    wrapper.vm.$vuetify.breakpoint.width = 800
    await wrapper.vm.$nextTick()
    const input = jest.fn(value => wrapper.setProps({ value }))
    wrapper.vm.$on('input', input)

    wrapper.setProps({ temporary: true })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isActive).toBe(false)
    expect(input.mock.calls).toHaveLength(0)
  })

  it('should update content padding when mobile is toggled', async () => {
    const input = jest.fn()
    const wrapper = mountFunction({ propsData: {
      app: true,
      fixed: true,
      value: true,
    } })
    await wrapper.vm.$nextTick()

    wrapper.vm.$on('input', input)
    expect(wrapper.vm.$vuetify.application.left).toBe(256)
    await resizeWindow(800)
    wrapper.vm.$vuetify.breakpoint.width = 800
    expect(wrapper.vm.$vuetify.application.left).toBe(0)
    expect(wrapper.vm.isActive).toBe(false)
    expect(input).toHaveBeenCalledWith(false)
    wrapper.setProps({ value: false })
    await wrapper.vm.$nextTick()
    wrapper.setProps({ value: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.$vuetify.application.left).toBe(0)
    await resizeWindow(1920)
    wrapper.vm.$vuetify.breakpoint.width = 1920
    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.isMobile).toBe(false)
    expect(wrapper.vm.$vuetify.application.left).toBe(256)
  })

  it('should not have marginTop when temporary / isMobile', async () => {
    const wrapper = mountFunction({
      propsData: {
        app: true,
      },
    })
    wrapper.vm.$vuetify.application.bar = 0

    expect(wrapper.vm.computedTop).toBe(0)

    wrapper.vm.$vuetify.application.bar = 24

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.computedTop).toBe(24)

    await resizeWindow(640)
    wrapper.vm.$vuetify.breakpoint.width = 640

    expect(wrapper.vm.computedTop).toBe(0)

    await resizeWindow(1980)
    wrapper.vm.$vuetify.breakpoint.width = 1980

    expect(wrapper.vm.computedTop).toBe(24)

    wrapper.setProps({ temporary: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.computedTop).toBe(0)

    wrapper.setProps({ app: false, temporary: false })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.computedTop).toBe(0)

    wrapper.setProps({ app: true })

    expect(wrapper.vm.computedTop).toBe(24)
  })

  it('should react to mini-variant clicks', () => {
    const update = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        miniVariant: true,
      },
      listeners: {
        'update:mini-variant': update,
      },
    })

    wrapper.trigger('click')

    expect(update).toHaveBeenCalled()
  })

  it('should open on mouseenter when mini-variant = true and expand-on-hover = true', async () => {
    const update = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        miniVariant: true,
        expandOnHover: true,
      },
      listeners: {
        'update:mini-variant': update,
      },
    })

    wrapper.trigger('mouseenter')
    await wrapper.vm.$nextTick()

    expect(update).toHaveBeenCalledWith(false)
    expect(wrapper.classes('v-navigation-drawer--open-on-hover')).toBe(true)
    expect(wrapper.classes('v-navigation-drawer--mini-variant')).toBe(false)
  })

  it('should emit `update:mini-variant` when mouseenter/mouseleave', async () => {
    const calls: string[] = []
    const update = jest.fn(val => calls.push(val))
    const wrapper = mountFunction({
      propsData: {
        miniVariant: true,
        expandOnHover: true,
      },
      listeners: {
        'update:mini-variant': (value: boolean) => {
          wrapper.setProps({ miniVariant: value })
          update(value)
        },
      },
    })

    wrapper.trigger('mouseenter')
    await wrapper.vm.$nextTick()

    wrapper.trigger('mouseleave')
    await wrapper.vm.$nextTick()

    expect(calls).toEqual([false, true])
  })

  it('should emit `update:mini-variant` when expandOnHover has been changed', async () => {
    const calls: string[] = []
    const update = jest.fn(val => calls.push(val))
    const wrapper = mountFunction({
      propsData: {
        miniVariant: false,
        expandOnHover: false,
      },
      listeners: {
        'update:mini-variant': (value: boolean) => {
          wrapper.setProps({ miniVariant: value })
          update(value)
        },
      },
    })

    wrapper.setProps({ expandOnHover: true })
    await wrapper.vm.$nextTick()

    wrapper.setProps({ expandOnHover: false })
    await wrapper.vm.$nextTick()

    expect(calls).toEqual([true, false])
  })

  it('should react to open / close from touch events', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: { value: false },
    })
    const element = wrapper.vm.$el.parentElement

    expect(wrapper.vm.isActive).toBe(false)

    touch({ element }).start(0, 0).end(200, 0)
    expect(wrapper.vm.isActive).toBe(true)

    // A consecutive swipe should keep the same state
    touch({ element }).start(0, 0).end(200, 0)
    expect(wrapper.vm.isActive).toBe(true)

    touch({ element }).start(200, 0).end(0, 0)
    expect(wrapper.vm.isActive).toBe(false)

    // A consecutive swipe should keep the same state
    touch({ element }).start(200, 0).end(0, 0)
    expect(wrapper.vm.isActive).toBe(false)

    // Swipe is not long enough
    touch({ element }).start(0, 0).end(99, 0)
    expect(wrapper.vm.isActive).toBe(false)

    wrapper.setProps({ right: true })

    // Swipe is not long enough
    touch({ element }).start(1920, 0).end(1821, 0)
    expect(wrapper.vm.isActive).toBe(false)

    touch({ element }).start(1920, 0).end(1720, 0)
    expect(wrapper.vm.isActive).toBe(true)

    // A consecutive swipe should keep the same state
    touch({ element }).start(1920, 0).end(1720, 0)
    expect(wrapper.vm.isActive).toBe(true)

    touch({ element }).start(1720, 0).end(1920, 0)
    expect(wrapper.vm.isActive).toBe(false)
  })

  it('should activate and expand on hover', () => {
    const wrapper = mountFunction({
      propsData: {
        expandOnHover: true,
      },
    })

    expect(wrapper.vm.isMouseover).toBe(false)
    expect(wrapper.vm.computedWidth).toBe(56)

    wrapper.trigger('mouseenter')
    expect(wrapper.vm.isMouseover).toBe(true)
    expect(wrapper.vm.computedWidth).toBe(256)

    wrapper.trigger('mouseleave')
    expect(wrapper.vm.isMouseover).toBe(false)
    expect(wrapper.vm.computedWidth).toBe(56)
  })

  it('should clip top', () => {
    const wrapper = mountFunction({
      propsData: {
        app: true,
        clipped: true,
      },
    })

    wrapper.vm.$vuetify.application.bottom = 20
    wrapper.vm.$vuetify.application.top = 40

    expect(wrapper.vm.computedMaxHeight).toBe(60)
  })

  it('should close when route changes on mobile', async () => {
    const wrapper = mountFunction({
      propsData: {
        app: true,
        disableRouteWatcher: true,
      },
    })

    expect(wrapper.vm.isActive).toBe(true)

    wrapper.vm.onRouteChange()
    expect(wrapper.vm.isActive).toBe(true)

    wrapper.setProps({
      disableRouteWatcher: false,
      stateless: true,
    })

    wrapper.vm.onRouteChange()
    expect(wrapper.vm.isActive).toBe(true)

    wrapper.setProps({
      stateless: false,
      temporary: true,
    })

    wrapper.vm.onRouteChange()
    expect(wrapper.vm.isActive).toBe(false)

    wrapper.setProps({
      temporary: false,
      value: true,
    })
    await wrapper.vm.$nextTick() // Wait for value watcher to fire

    expect(wrapper.vm.isActive).toBe(true)

    wrapper.vm.onRouteChange()
    expect(wrapper.vm.isActive).toBe(true)

    await resizeWindow(400)
    wrapper.vm.$vuetify.breakpoint.width = 400
    await wrapper.vm.$nextTick()

    wrapper.vm.onRouteChange()
    expect(wrapper.vm.isActive).toBe(false)
  })

  it('should accept custom tag and have default based upon app prop', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.tag).toBe('aside')

    const wrapper2 = mountFunction({
      propsData: { app: true },
    })

    expect(wrapper2.vm.tag).toBe('nav')

    const wrapper3 = mountFunction({
      propsData: { tag: 'div' },
    })

    expect(wrapper3.vm.tag).toBe('div')
  })
})

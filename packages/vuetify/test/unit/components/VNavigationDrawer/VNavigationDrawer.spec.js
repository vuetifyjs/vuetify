import VApp from '@/components/VApp'
import VNavigationDrawer from '@/components/VNavigationDrawer'
import { test, resizeWindow } from '@/test'

beforeEach(() => resizeWindow(1920, 1080))

test('VNavigationDrawer', ({ mount }) => {
  // v-app is needed to initialise $vuetify.application
  const app = mount(VApp)

  it('should become temporary when the window resizes', async () => {
    const wrapper = mount(VNavigationDrawer)

    expect(wrapper.vm.isActive).toBe(true)
    await resizeWindow(1200)
    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.vm.overlay).toBeFalsy()
  })

  it('should not resize the content when temporary', async () => {
    const wrapper = mount(VNavigationDrawer, { propsData: {
      app: true,
      temporary: true,
      value: true
    }})

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$vuetify.application.left).toBe(0)
    expect(wrapper.vm.overlay).toBeTruthy()
  })

  it('should not resize the content when permanent and stateless', async () => {
    const wrapper = mount(VNavigationDrawer, { propsData: {
      app: true,
      permanent: true,
      stateless: true
    }})

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$vuetify.application.left).toBe(300)

    await resizeWindow(1200)
    expect(wrapper.vm.$vuetify.application.left).toBe(300)
    expect(wrapper.vm.overlay).toBeFalsy()
  })

  it('should not resize the content when permanent and resize watcher is disabled', async () => {
    const wrapper = mount(VNavigationDrawer, {
      propsData: {
        app: true,
        permanent: true,
        disableResizeWatcher: true
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$vuetify.application.left).toBe(300)

    await resizeWindow(1200)
    expect(wrapper.vm.$vuetify.application.left).toBe(300)
    expect(wrapper.vm.overlay).toBeFalsy()
  })

  it('should stay active when resizing a temporary drawer', async () => {
    const wrapper = mount(VNavigationDrawer, {
      propsData: {
        app: true,
        temporary: true,
        value: true
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.overlay).toBeTruthy()

    await resizeWindow(1200)

    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.overlay).toBeTruthy()
  })

  it('should open when changed to permanent', async () => {
    const wrapper = mount(VNavigationDrawer, {
      propsData: {
        value: null
      }
    })

    wrapper.setProps({ permanent: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isActive).toBe(true)
  })

  it('should not close when value changes and permanent', async () => {
    const wrapper = mount(VNavigationDrawer, {
      propsData: {
        permanent: true,
        value: true
      }
    })

    wrapper.setProps({ value: false })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isActive).toBe(true)
  })

  it('should update content padding when temporary state is changed', async () => {
    const wrapper = mount(VNavigationDrawer, { propsData: {
      app: true
    }})
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$vuetify.application.left).toBe(300)

    wrapper.setProps({ temporary: true })
    expect(wrapper.vm.$vuetify.application.left).toBe(0)

    wrapper.setProps({ temporary: false })
    expect(wrapper.vm.$vuetify.application.left).toBe(300)
  })

  it('should update content padding when permanent state is changed', async () => {
    await resizeWindow(800)
    const wrapper = mount(VNavigationDrawer, { propsData: {
      app: true
    }})
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$vuetify.application.left).toBe(0)

    wrapper.setProps({ permanent: true })
    expect(wrapper.vm.$vuetify.application.left).toBe(300)

    wrapper.setProps({ permanent: false })
    expect(wrapper.vm.$vuetify.application.left).toBe(0)
  })

  it('should update content padding when miniVariant is changed', async () => {
    const wrapper = mount(VNavigationDrawer, { propsData: {
      app: true
    }})
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$vuetify.application.left).toBe(300)

    wrapper.setProps({ miniVariant: true })
    expect(wrapper.vm.$vuetify.application.left).toBe(80)

    wrapper.setProps({ miniVariant: false })
    expect(wrapper.vm.$vuetify.application.left).toBe(300)
  })

  it('should not remain mobile when temporary is toggled', async () => {
    await resizeWindow(800)
    const wrapper = mount(VNavigationDrawer, { propsData: {
      temporary: true
    }})

    await resizeWindow(1920)
    expect(wrapper.vm.isMobile).toBe(false)
  })

  it('should stay closed when mobile and temporary is enabled', async () => {
    await resizeWindow(800)
    const wrapper = mount(VNavigationDrawer)
    const input = jest.fn(value => wrapper.setProps({ value }))
    wrapper.vm.$on('input', input)

    wrapper.setProps({ temporary: true })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isActive).toBe(false)
    expect(input.mock.calls).toHaveLength(0)
  })

  it('should update content padding when mobile is toggled', async () => {
    const input = jest.fn()
    const wrapper = mount(VNavigationDrawer, { propsData: {
      app: true,
      fixed: true,
      value: true
    }})
    await wrapper.vm.$nextTick()

    wrapper.vm.$on('input', input)
    expect(wrapper.vm.$vuetify.application.left).toBe(300)
    await resizeWindow(800)
    expect(wrapper.vm.$vuetify.application.left).toBe(0)
    expect(wrapper.vm.isActive).toBe(false)
    expect(input).toBeCalledWith(false)
    wrapper.setProps({ value: false })
    await wrapper.vm.$nextTick()
    wrapper.setProps({ value: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.$vuetify.application.left).toBe(0)
    await resizeWindow(1920)
    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.isMobile).toBe(false)
    expect(wrapper.vm.$vuetify.application.left).toBe(300)
  })

  it('should not have marginTop when temporary / isMobile', async () => {
    const wrapper = mount(VNavigationDrawer, {
      propsData: {
        app: true
      }
    })

    expect(wrapper.vm.marginTop).toBe(0)

    wrapper.vm.$vuetify.application.bar = 24

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.marginTop).toBe(24)

    await resizeWindow(640)

    expect(wrapper.vm.marginTop).toBe(0)

    await resizeWindow(1980)

    expect(wrapper.vm.marginTop).toBe(24)

    wrapper.setProps({ temporary: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.marginTop).toBe(0)

    wrapper.setProps({ app: false, temporary: false })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.marginTop).toBe(0)

    wrapper.setProps({ app: true })

    expect(wrapper.vm.marginTop).toBe(24)
  })
})

import VApp from '~components/VApp'
import VNavigationDrawer from '~components/VNavigationDrawer'
import { test } from '~util/testing'
import { mount } from 'avoriaz'

const resizeWindow = (width = global.innerWidth, height = global.innerHeight) => {
  global.innerWidth = width
  global.innerHeight = height
  global.dispatchEvent(new Event('resize'))
  return new Promise(resolve => setTimeout(resolve, 200))
}

beforeEach(() => {
  return resizeWindow(1920, 1080)
})

test('VNavigationDrawer', () => {
  // v-app is needed to initialise $vuetify.application
  const app = mount(VApp)

  it('should become temporary when the window resizes', async () => {
    const wrapper = mount(VNavigationDrawer)

    expect(wrapper.vm.isActive).toBe(true)
    await resizeWindow(1200)
    expect(wrapper.vm.isActive).toBe(false)
  })

  it('should not resize the content when temporary', async () => {
    const wrapper = mount(VNavigationDrawer, { propsData: {
      app: true,
      temporary: true,
      value: true
    }})

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$vuetify.application.left).toBe(0)
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
  })
})

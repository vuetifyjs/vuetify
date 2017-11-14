import VNavigationDrawer from '~components/VNavigationDrawer'
import { test } from '~util/testing'

// TODO: Test behaviour instead of styles
test('VNavigationDrawer.js', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VNavigationDrawer)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom absolute and match snapshot', () => {
    const wrapper = mount(VNavigationDrawer, {
      propsData: {
        absolute: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom clipped and match snapshot', () => {
    const wrapper = mount(VNavigationDrawer, {
      propsData: {
        clipped: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom disableRouteWatcher and match snapshot', () => {
    const wrapper = mount(VNavigationDrawer, {
      propsData: {
        disableRouteWatcher: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom disableResizeWatcher and match snapshot', () => {
    const wrapper = mount(VNavigationDrawer, {
      propsData: {
        disableResizeWatcher: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom height and match snapshot', () => {
    const wrapper = mount(VNavigationDrawer, {
      propsData: {
        height: '100px'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom floating and match snapshot', () => {
    const wrapper = mount(VNavigationDrawer, {
      propsData: {
        floating: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom miniVariant and match snapshot', () => {
    const wrapper = mount(VNavigationDrawer, {
      propsData: {
        miniVariant: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom mobileBreakPoint and match snapshot', () => {
    const wrapper = mount(VNavigationDrawer, {
      propsData: {
        mobileBreakPoint: 1000
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom permanent and match snapshot', () => {
    const wrapper = mount(VNavigationDrawer, {
      propsData: {
        permanent: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom persistent and match snapshot', () => {
    const wrapper = mount(VNavigationDrawer, {
      propsData: {
        persistent: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom right and match snapshot', () => {
    const wrapper = mount(VNavigationDrawer, {
      propsData: {
        right: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom temporary and match snapshot', () => {
    const wrapper = mount(VNavigationDrawer, {
      propsData: {
        temporary: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom touchless and match snapshot', () => {
    const wrapper = mount(VNavigationDrawer, {
      propsData: {
        touchless: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom value and match snapshot', () => {
    const wrapper = mount(VNavigationDrawer, {
      propsData: {
        value: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match value if value is true or false', async () => {
    const wrapper = mount(VNavigationDrawer, {
      attachToDocument: true,
      propsData: {
        value: false
      }
    })

    const wrapper2 = mount(VNavigationDrawer, {
      attachToDocument: true,
      propsData: {
        value: true
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper2.vm.isActive).toBe(true)
  })
})

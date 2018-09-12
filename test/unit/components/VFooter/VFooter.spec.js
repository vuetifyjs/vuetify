import { test } from '@/test'
import VFooter from '@/components/VFooter'

test('VFooter.js', ({ mount, functionalContext }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VFooter)

    expect(wrapper.element.classList).toContain('v-footer')
  })

  it('should render a colored footer', () => {
    const wrapper = mount(VFooter, {
      propsData: {
        color: 'blue lighten-1'
      }
    })

    expect(wrapper.element.classList).toContain('blue')
    expect(wrapper.element.classList).toContain('lighten-1')
  })

  it('should render an absolute positioned component and match snapshot', () => {
    const wrapper = mount(VFooter, {
      propsData: {
        absolute: true
      }
    })

    expect(wrapper.element.classList).toContain('v-footer--absolute')
  })

  it('should render a fixed positioned component and match snapshot', () => {
    const wrapper = mount(VFooter, {
      propsData: {
        fixed: true
      }
    })

    expect(wrapper.element.classList).toContain('v-footer--fixed')
  })

  it('should render a fixed and absolute positioned and match snapshot', () => {
    const wrapper = mount(VFooter, {
      propsData: {
        absolute: true,
        fixed: true
      }
    })

    expect(wrapper.element.classList).toContain('v-footer--absolute')
    wrapper.setProps({ absolute: false })
    expect(wrapper.element.classList).toContain('v-footer--fixed')
  })

  it('should get the right padding with app prop', async () => {
    const wrapper = mount(VFooter, {
      propsData: {
        absolute: true,
        app: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.vm.$vuetify.application.left = 20
    wrapper.vm.$vuetify.application.right  = 30
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have margin bottom', async () => {
    const wrapper = mount(VFooter, {
      propsData: {
        app: true,
        height: 60
      }
    })

    expect(wrapper.vm.$vuetify.application.footer).toBe(60)
    wrapper.vm.$vuetify.application.bottom = 30
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$vuetify.application.bottom).toBe(30)
    wrapper.vm.$vuetify.application.bottom = 0
    wrapper.vm.$vuetify.application.footer = 0
  })

  it('should have padding left when using inset', async () => {
    const wrapper = mount(VFooter, {
      propsData: {
        app: true,
        inset: true
      }
    })

    wrapper.vm.$vuetify.application.left = 300

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.computedPaddingLeft).toBe(300)
  })

  it('should accept an auto height', async () => {
    const wrapper = mount(VFooter, {
      attachToDocument: true,
      propsData: {
        height: 'auto'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should set conditional applicationable property', async () => {
    const wrapper = mount(VFooter, {
      propsData: {
        app: true,
        inset: true
      }
    })

    expect(wrapper.vm.$vuetify.application.footer).toBe(0)
    expect(wrapper.vm.$vuetify.application.insetFooter).toBe(32)

    wrapper.setProps({ inset: false })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$vuetify.application.footer).toBe(32)
    expect(wrapper.vm.$vuetify.application.insetFooter).toBe(0)
  })
})

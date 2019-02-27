import { test } from '@/test'
import VApp from '@/components/VApp'
import Detachable from '@/mixins/detachable'

const Mock = () => ({
  name: 'mock',

  mixins: [Detachable],

  render (h) {
    const content = h('div', {
      staticClass: 'content',
      ref: 'content'
    })

    return h('div', {
      staticClass: 'mock'
    }, [this.$slots.default, content])
  }
})

test('detachable.js', ({ mount }) => {
  it('should detach to app', async () => {
    const localMock = Mock()
    const wrapper = mount(VApp, {
      attachToDocument: true,
      slots: {
        default: [{
          render: h => h(localMock)
        }]
      }
    })

    const detach = wrapper.find(localMock)[0]

    expect(detach.vm.hasDetached).toBe(true)

    wrapper.destroy()
  })

  it('should not detach when lazy', async () => {
    const localMock = Mock()
    const wrapper = mount(VApp, {
      attachToDocument: true,
      slots: {
        default: [{
          render: h => h(localMock, {
            props: { lazy: true }
          })
        }]
      }
    })

    const detach = wrapper.find(localMock)[0]

    expect(detach.vm.hasDetached).toBe(false)

    wrapper.destroy()
  })

  it('should attach and detach', () => {
    const localMock = Mock()
    const elementMock = mount(Mock())
    const wrapper = mount(localMock, {
      attachToDocument: true,
      propsData: {
        attach: ''
      },
      slots: {
        default: [{
          render: h => h('div', { staticClass: 'foo' })
        }]
      }
    })

    expect('[Vuetify] Unable to locate target [data-app]').toHaveBeenTipped()

    expect(wrapper.vm.initDetach()).toBe(undefined)

    wrapper.setProps({ attach: true })

    expect(wrapper.vm.initDetach()).toBe(undefined)

    wrapper.setProps({ attach: 'attach' })

    expect(wrapper.vm.initDetach()).toBe(undefined)

    wrapper.setProps({ attach: elementMock.vm.$el })

    wrapper.vm.initDetach()

    expect(wrapper.vm.hasDetached).toBe(true)

    wrapper.setData({ hasDetached: false })

    wrapper.setProps({ attach: '.foo' })

    wrapper.vm.initDetach()

    expect(wrapper.vm.hasDetached).toBe(true)

    wrapper.setData({ hasDetached: false })

    wrapper.setProps({ attach: '.bar' })

    wrapper.vm.initDetach()

    expect('[Vuetify] Unable to locate target .bar').toHaveBeenTipped()

    delete wrapper.vm.$refs.content
    wrapper.vm.$destroy()
  })

  it('should validate attach prop', () => {
    const validator = Detachable.options.props.attach.validator

    expect(validator(true)).toBe(true)
    expect(validator(false)).toBe(true)
    expect(validator('foo')).toBe(true)
    expect(validator({ nodeType: Node.ELEMENT_NODE })).toBe(true)
    expect(validator({})).toBe(false)
  })
})

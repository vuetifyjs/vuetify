import Menuable from '../'
import { mount, MountOptions, Wrapper } from '@vue/test-utils'
import VApp from '../../../components/VApp'

describe('menuable.ts', () => {
  const Mock = Menuable.extend({
    render: h => h('div'),
  })

  type Instance = InstanceType<typeof Mock>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(Mock, options)
    }
  })

  it('should bind custom activator', () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        activator: 'body',
      },
    })

    expect(wrapper.vm.getActivator()).toBeTruthy()
  })

  it('should update dimensions when activated', async () => {
    const sneakPeek = jest.fn()
    const wrapper = mountFunction({
      methods: {
        sneakPeek,
      },
    })

    wrapper.vm.updateDimensions()
    await wrapper.vm.$nextTick()
    expect(sneakPeek).toHaveBeenCalled()
  })

  it('should apply maxWidth in left calculations when offset', async () => {
    const wrapper = mountFunction({
      props: {
        offsetY: Boolean,
        offsetX: Boolean,
      },
      propsData: {
        attach: true,
        left: true,
        offsetX: true,
        maxWidth: 200,
      },
    })

    wrapper.setData({
      dimensions: {
        activator: { width: 300 },
        content: { width: 138 },
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.computedLeft).toBe(-200)
  })

  it('should have the correct position in non embeded app', async () => {
    const wrapper = mount({
      render (h) {
        return h(VApp, [h(Mock)])
      },
    }, {
      mocks: {
        sync: false,
        $vuetify: {
          theme: {},
          rtl: false,
        },
      },
    })

    await wrapper.vm.$nextTick()

    const vm = wrapper.find(Mock).vm

    Object.assign(vm.dimensions.activator, { top: 100, left: 80 })
    Object.assign(vm.dimensions.content, { width: 300, height: 50 })

    await wrapper.vm.$nextTick()

    expect(vm.computedTop).toBe(100)
    expect(vm.computedLeft).toBe(80)

    expect(vm.computedRelativeOffset).toMatchObject({ left: 0, top: 0 })
  })

  it('should have the correct position in embeded app', async () => {
    const wrapper = mount({
      props: { attach: Boolean },
      render (h) {
        return h(VApp, [
          h(Mock),
        ])
      },
    }, {
      mocks: {
        sync: false,
        $vuetify: {
          theme: {},
          rtl: false,
        },
      },
    })

    await wrapper.vm.$nextTick()

    const app = wrapper.find(VApp).element

    Object.defineProperties(app, { offsetTop: { get: () => 100 }, offsetLeft: { get: () => 200 } })

    const vm = wrapper.find(Mock).vm

    vm.onResize()

    await wrapper.vm.$nextTick()

    Object.assign(vm.dimensions.activator, { offsetTop: 100, offsetLeft: 80 })
    Object.assign(vm.dimensions.content, { width: 300, height: 50 })

    expect(vm.computedTop).toBe(-100)
    expect(vm.computedLeft).toBe(-200)

    expect(vm.computedRelativeOffset).toMatchObject({ left: 200, top: 100 })
  })
})

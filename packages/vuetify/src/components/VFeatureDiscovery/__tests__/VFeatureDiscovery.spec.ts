// Components
import VFeatureDiscovery from '../VFeatureDiscovery'

// Utilities
import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'
import { ExtractVue } from '../../../util/mixins'

describe('FeatureDiscovery.ts', () => {
  type Instance = ExtractVue<typeof VFeatureDiscovery>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {} as MountOptions<Instance>) => {
      return mount(VFeatureDiscovery, options)
    }
  })

  it('should get closeConditional', () => {
    const wrapper = mountFunction()

    wrapper.setData({
      rect: {
        bottom: 100,
        top: 668,
      },
    })

    expect(wrapper.vm.closeConditional()).toBeTruthy()
    wrapper.setProps({
      persistent: true,
    })
    expect(wrapper.vm.closeConditional()).toBeFalsy()
    wrapper.setProps({
      persistent: false,
    })
    wrapper.setData({
      isActive: false,
    })
    expect(wrapper.vm.closeConditional()).toBeFalsy()
  })

  it('should render correctly', () => {
    const wrapper = mountFunction()

    expect(wrapper.classes('v-feature-discovery')).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly when flat', () => {
    const wrapper = mountFunction({
      propsData: {
        flat: true,
      },
    })

    expect(wrapper.classes('v-feature-discovery--flat')).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should toggle', () => {
    const wrapper = mountFunction({
      propsData: {
        target: document.body,
      },
      computed: {
        internalActive () {
          return this.isActive
        },
      },
    })

    expect(wrapper.classes('v-feature-discovery--active')).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.vm.isActive = false

    expect(wrapper.classes('v-feature-discovery--active')).toBeFalsy()
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.vm.isActive = true
    wrapper.vm.isActive = false
  })

  it('should update targetEl when target prop updates', () => {
    const wrapper = mountFunction()

    const spy = jest.spyOn(wrapper.vm, 'updateTarget')

    expect(spy).toHaveBeenCalledTimes(0)
    wrapper.setProps({
      target: '#asd',
    })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should close on esc', () => {
    let close = false
    const wrapper = mountFunction({
      methods: {
        closeConditional: () => close,
      },
    })

    wrapper.vm.keyPress({ keyCode: 27 } as any)
    expect(wrapper.vm.isActive).toBeTruthy()

    close = true
    wrapper.vm.keyPress({ keyCode: 27 } as any)
    expect(wrapper.vm.isActive).toBeFalsy()
  })

  it('should close on close method of actions scoped slot', () => {
    let close = false
    const wrapper = mountFunction({
      methods: {
        closeConditional: () => close,
      },
      scopedSlots: {
        actions: `
          <template slot-scope="{ close }">
            <button id="close" @click="close">Close</button>
          </template>
        `,
      },
    })

    const closeButton = wrapper.find('#close')

    closeButton.trigger('click')
    expect(wrapper.vm.isActive).toBeTruthy()

    close = true
    closeButton.trigger('click')
    expect(wrapper.vm.isActive).toBeFalsy()
  })

  it('should compute base shift', async () => {
    const wrapper1 = mountFunction({
      computed: {
        computedSize: () => 500,
      },
    })

    expect(wrapper1.vm.baseShift).toBeCloseTo(132.58, 1)

    const wrapper2 = mountFunction({
      computed: {
        computedSize: () => 100,
      },
    })

    expect(wrapper2.vm.baseShift).toBeCloseTo(26.51, 1)
  })

  it('should compute left shift', async () => {
    const wrapper = mountFunction({
      computed: {
        computedSize: () => 500,
      },
    })

    wrapper.setData({
      rect: {
        left: -100,
        right: 0,
        width: 100,
      },
    })
    expect(wrapper.vm.leftShift).toBeCloseTo(132.58, 1)

    wrapper.setData({
      rect: {
        left: 1024,
        right: 1124,
        width: 100,
      },
    })
    expect(wrapper.vm.leftShift).toBeCloseTo(-132.58, 1)

    wrapper.setData({
      rect: {
        left: 500,
        right: 600,
        width: 100,
      },
    })
    expect(wrapper.vm.leftShift).toBe(0)
  })

  it('should compute top shift', async () => {
    const wrapper = mountFunction({
      computed: {
        computedSize: () => 500,
      },
    })

    wrapper.setData({
      rect: {
        top: -100,
        bottom: 0,
        height: 100,
      },
    })
    expect(wrapper.vm.topShift).toBeCloseTo(132.58, 1)

    wrapper.setData({
      rect: {
        top: 768,
        bottom: 868,
        height: 100,
      },
    })
    expect(wrapper.vm.topShift).toBeCloseTo(-132.58, 1)

    wrapper.setData({
      rect: {
        top: 400,
        bottom: 500,
        height: 100,
      },
    })
    expect(wrapper.vm.topShift).toBe(0)
  })

  it('should compute rect size', async () => {
    const wrapper = mountFunction()

    wrapper.setData({
      rect: {
        width: 200,
        height: 100,
      },
    })
    expect(wrapper.vm.rectSize).toBe(200)

    wrapper.setData({
      rect: {
        width: 200,
        height: 200,
      },
    })
    expect(wrapper.vm.rectSize).toBe(200)

    wrapper.setData({
      rect: {
        width: 200.1,
        height: 100,
      },
    })
    expect(wrapper.vm.rectSize).toBe(200.1)
  })

  it('should compute highlight padding', async () => {
    const wrapper = mountFunction()

    wrapper.setData({
      rect: {
        width: 200,
        height: 100,
      },
    })
    expect(wrapper.vm.highlightPadding).toBeCloseTo(57.14, 1)
  })
})

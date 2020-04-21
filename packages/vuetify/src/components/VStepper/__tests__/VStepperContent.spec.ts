// Libraries
import Vue from 'vue'

// Components
import VStepperContent from '../VStepperContent'
import {
  VTabTransition,
  VTabReverseTransition,
} from '../../transitions'

// Utilities
import {
  createLocalVue,
  mount,
  Wrapper,
} from '@vue/test-utils'
import { wait } from '../../../../test'

const tip = '[Vuetify] The v-stepper-content component must be used inside a v-stepper'

describe('VStepperContent.ts', () => {
  type Instance = InstanceType<typeof VStepperContent>
  let mountFunction: (options?: object) => Wrapper<Instance>
  let localVue: typeof Vue

  beforeEach(() => {
    localVue = createLocalVue()

    mountFunction = (options = {}) => {
      return mount(VStepperContent, {
        localVue,
        mocks: {
          $vuetify: {
            rtl: false,
          },
        },
        ...options,
      })
    }
  })

  it('should set height to auto', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: { step: 0 },
      provide: {
        isVertical: false,
        stepper: {
          register: () => {},
          unregister: () => {},
        },
      },
    })

    expect(wrapper.vm.isActive).toBeNull()
    expect(wrapper.vm.height).toBe(0)

    wrapper.setData({ isActive: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.height).toBe('auto')
  })

  it('should use reverse transition', () => {
    const wrapper = mountFunction({
      propsData: { step: 1 },
      provide: {
        isVertical: false,
        stepper: {
          register: () => {},
          unregister: () => {},
        },
      },
    })
    expect(wrapper.vm.computedTransition).toBe(VTabTransition)

    wrapper.setData({ isReverse: true })
    expect(wrapper.vm.computedTransition).toBe(VTabReverseTransition)
  })

  it('should use opposite of reverse transition in rtl', () => {
    const wrapper = mountFunction({
      mocks: {
        $vuetify: {
          rtl: true,
        },
      },
      propsData: { step: 1 },
      provide: {
        isVertical: false,
        stepper: {
          register: () => {},
          unregister: () => {},
        },
      },
    })
    expect(wrapper.vm.computedTransition).toBe(VTabReverseTransition)

    wrapper.setData({ isReverse: true })
    expect(wrapper.vm.computedTransition).toBe(VTabTransition)
  })

  it('should accept a custom height', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        step: 1,
      },
      provide: {
        isVertical: false,
        stepper: {
          register: () => {},
          unregister: () => {},
        },
      },
    })

    const enter = jest.fn()
    const leave = jest.fn()
    wrapper.setMethods({
      enter,
      leave,
    })
    wrapper.setData({
      isActive: true,
      isVertical: true,
    })
    await wrapper.vm.$nextTick()

    const stepWrapper = wrapper.find('.v-stepper__wrapper')

    expect(stepWrapper.element.style.height).toBe('auto')

    // should call leave() -- total so far: 1
    wrapper.setData({ isActive: false })
    await wrapper.vm.$nextTick()

    // should call enter() -- total so far: 1
    wrapper.setData({ isActive: true })

    await wrapper.vm.$nextTick()
    expect(enter).toHaveBeenCalled()
    expect(leave).toHaveBeenCalled()
    expect(enter.mock.calls).toHaveLength(1)
    expect(leave.mock.calls).toHaveLength(1)

    // setting vertical and isActive at the same time causes
    // isActive watcher to fire enter/leave methods
    wrapper.setData({
      isVertical: false,
    })
    await wrapper.vm.$nextTick()
    wrapper.setData({ isActive: false })
    await wrapper.vm.$nextTick()
    wrapper.setData({ isActive: true })
    await wrapper.vm.$nextTick()
    expect(enter.mock.calls).toHaveLength(1)
    expect(leave.mock.calls).toHaveLength(1)
  })

  it('should toggle isActive state', () => {
    const wrapper = mountFunction({
      propsData: { step: 1 },
      provide: {
        isVertical: false,
        stepper: {
          register: () => {},
          unregister: () => {},
        },
      },
    })

    wrapper.vm.toggle(1, false)

    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.isReverse).toBe(false)

    wrapper.vm.toggle('1', false)

    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.isReverse).toBe(false)

    wrapper.vm.toggle(2, true)

    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.vm.isReverse).toBe(true)
  })

  it('should set height', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: { step: 1 },
      provide: {
        isVertical: false,
        stepper: {
          register: () => {},
          unregister: () => {},
        },
      },
    })

    wrapper.setData({ isActive: false, isVertical: true })
    await wrapper.vm.$nextTick()

    wrapper.setData({ isActive: true })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.height).toBe(0)

    await wait(450)

    expect(wrapper.vm.height).toBe('auto')

    wrapper.setData({ isActive: false })
    await wrapper.vm.$nextTick()

    await wait(10)

    expect(wrapper.vm.height).toBe(0)
  })

  it('should set height only if isActive', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: { step: 1 },
      provide: {
        isVertical: false,
        stepper: {
          register: () => {},
          unregister: () => {},
        },
      },
    })

    wrapper.setData({ isActive: false, isVertical: true })
    await wrapper.vm.$nextTick()

    wrapper.setData({ isActive: true })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.height).toBe(0)

    wrapper.setData({ isActive: false })
    await wrapper.vm.$nextTick()

    await wait(450)

    expect(wrapper.vm.height).toBe(0)
  })

  it('should reset height', async () => {
    const wrapper = mountFunction({
      propsData: { step: 1 },
      provide: {
        isVertical: false,
        stepper: {
          register: () => {},
          unregister: () => {},
        },
      },
    })

    const onTransition = jest.fn()
    const stepWrapper = wrapper.find('.v-stepper__wrapper')

    expect(wrapper.vm.height).toBe(0)

    expect(wrapper.vm.onTransition()).toBeUndefined()

    wrapper.setData({ isActive: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.height).toBe('auto')

    wrapper.setData({ height: 0 })

    await wrapper.vm.$nextTick()

    wrapper.vm.onTransition({ propertyName: 'foo' })
    expect(wrapper.vm.height).toBe(0)

    wrapper.vm.onTransition({ propertyName: 'height' })
    expect(wrapper.vm.height).toBe('auto')

    wrapper.destroy()
  })

  it('should tip when not used with v-stepper', () => {
    const wrapper = mountFunction({
      propsData: { step: 1 },
      provide: {
        isVertical: false,
      },
    })
    expect(tip).toHaveBeenTipped()
  })
})

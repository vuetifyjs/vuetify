// Components
import VWindow from '../VWindow'
import VWindowItem from '../VWindowItem'

// Utilities
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
import { touch } from '../../../../test'

describe('VWindow.ts', () => {
  type Instance = InstanceType<typeof VWindow>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VWindow, {
        ...options,
        mocks: {
          $vuetify: {
            lang: {
              t: str => str,
            },
            rtl: false,
          },
        },
      })
    }
  })

  it('it should return the correct transition', async () => {
    const wrapper = mountFunction()
    // Force booted
    wrapper.setData({ isBooted: true })

    expect(wrapper.vm.computedTransition).toBe('v-window-x-transition')

    wrapper.setData({ isReverse: true })
    expect(wrapper.vm.computedTransition).toBe('v-window-x-reverse-transition')

    wrapper.setProps({ vertical: true })
    expect(wrapper.vm.computedTransition).toBe('v-window-y-reverse-transition')

    wrapper.setData({ isReverse: false })
    expect(wrapper.vm.computedTransition).toBe('v-window-y-transition')
  })

  it('should set reverse', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: 0,
      },
      slots: {
        default: [
          VWindowItem,
          VWindowItem,
        ],
      },
    })

    // Reverse implicitly set by changed index
    wrapper.setProps({ value: 1 })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalReverse).toBeFalsy()

    // Reverse implicitly set by changed index
    wrapper.setProps({ value: 0 })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalReverse).toBeTruthy()

    // Reverse explicit prop override
    wrapper.setProps({ reverse: false })
    expect(wrapper.vm.internalReverse).toBeTruthy()

    // Reverse explicit prop override
    wrapper.setProps({ reverse: true })
    expect(wrapper.vm.internalReverse).toBeFalsy()

    // Reverts back to local isReverse
    wrapper.setProps({ reverse: undefined })
    expect(wrapper.vm.internalReverse).toBeTruthy()
  })

  it('should increment and decrement current value', async () => {
    const wrapper = mountFunction({
      slots: {
        default: [
          VWindowItem,
          VWindowItem,
          VWindowItem,
        ],
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalIndex).toBe(0)

    wrapper.vm.next()
    expect(wrapper.vm.internalIndex).toBe(1)

    wrapper.vm.next()
    expect(wrapper.vm.internalIndex).toBe(2)

    // changed all following indices
    // due to: https://github.com/vuetifyjs/vuetify/issues/7728
    wrapper.vm.next()
    expect(wrapper.vm.internalIndex).toBe(2)

    wrapper.vm.prev()
    expect(wrapper.vm.internalIndex).toBe(1)

    wrapper.vm.prev()
    expect(wrapper.vm.internalIndex).toBe(0)

    wrapper.vm.prev()
    expect(wrapper.vm.internalIndex).toBe(0)
  })

  it('should update model when internal index is greater than item count', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: 2,
      },
      slots: {
        default: [
          VWindowItem,
          VWindowItem,
          VWindowItem,
        ],
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalIndex).toBe(2)

    const [item1, item2, item3] = wrapper.findAll(VWindowItem).wrappers

    item3.destroy()
    expect(wrapper.vm.internalIndex).toBe(1)

    item2.destroy()
    expect(wrapper.vm.internalIndex).toBe(0)

    item1.destroy()
    expect(wrapper.vm.internalIndex).toBe(-1)
  })

  it('should react to touch', async () => {
    const wrapper = mountFunction({
      propsData: { value: 1 },
      slots: {
        default: [
          VWindowItem,
          VWindowItem,
          VWindowItem,
          VWindowItem,
          VWindowItem,
        ],
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalIndex).toBe(1)
    touch(wrapper).start(0, 0).end(200, 0)
    expect(wrapper.vm.internalIndex).toBe(0)

    // changed expected indices due to:
    // https://github.com/vuetifyjs/vuetify/issues/7728
    touch(wrapper).start(0, 0).end(200, 0)
    expect(wrapper.vm.internalIndex).toBe(0)

    touch(wrapper).start(200, 0).end(0, 0)
    expect(wrapper.vm.internalIndex).toBe(1)

    wrapper.setProps({ value: 4 })
    touch(wrapper).start(200, 0).end(0, 0)
    expect(wrapper.vm.internalIndex).toBe(4)

    wrapper.setProps({ value: 0 })
    touch(wrapper).start(0, 0).end(200, 0)
    expect(wrapper.vm.internalIndex).toBe(0)
  })

  it('should accept a custom touch object', async () => {
    const left = jest.fn()
    const right = jest.fn()
    const fns = { left, right }
    const wrapper = mountFunction({
      propsData: {
        touch: fns,
        value: 1,
      },
      slots: {
        default: [
          VWindowItem,
          VWindowItem,
          VWindowItem,
          VWindowItem,
          VWindowItem,
        ],
      },
    })

    await wrapper.vm.$nextTick()

    touch(wrapper).start(200, 0).end(0, 0)
    touch(wrapper).start(0, 0).end(200, 0)
    expect(left).toHaveBeenCalled()
    expect(right).toHaveBeenCalled()
  })

  // https://github.com/vuetifyjs/vuetify/issues/5000
  it('should change to the next available index when using touch swipe', () => {
    const wrapper = mountFunction({
      slots: {
        default: [
          {
            extends: VWindowItem,
            props: {
              disabled: {
                type: Boolean,
                default: true,
              },
            },
          },
          VWindowItem,
          VWindowItem,
        ],
      },
    })

    expect(wrapper.vm.internalIndex).toBe(1)
    touch(wrapper).start(0, 0).end(200, 0)
    expect(wrapper.vm.internalIndex).toBe(2)
    touch(wrapper).start(0, 0).end(200, 0)
    expect(wrapper.vm.internalIndex).toBe(1)
  })

  it('should generate and show arrows', async () => {
    const wrapper = mountFunction({
      propsData: {
        showArrows: true,
      },
      slots: {
        default: [
          { extends: VWindowItem },
          { extends: VWindowItem },
          { extends: VWindowItem },
          { extends: VWindowItem },
        ],
      },
    })

    const next = wrapper.find('.v-window__next .v-btn')

    expect(wrapper.vm.hasNext).toBe(true)
    expect(wrapper.vm.hasPrev).toBe(false)

    next.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.hasNext).toBe(true)
    expect(wrapper.vm.hasPrev).toBe(true)

    next.trigger('click')
    next.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.hasNext).toBe(false)
    expect(wrapper.vm.hasPrev).toBe(true)

    wrapper.setProps({ continuous: true })

    expect(wrapper.vm.hasNext).toBe(true)
    expect(wrapper.vm.hasPrev).toBe(true)
  })

  it('should skip disabled items and go to the next available', () => {
    const props = {
      disabled: {
        type: Boolean,
        default: true,
      },
    }
    const wrapper = mountFunction({
      slots: {
        default: [
          { extends: VWindowItem },
          { extends: VWindowItem, props },
          { extends: VWindowItem, props },
          { extends: VWindowItem },
        ],
      },
    })

    expect(wrapper.vm.internalIndex).toBe(0)

    wrapper.vm.next()

    expect(wrapper.vm.internalIndex).toBe(3)
  })

  it('should ignore touch events', () => {
    const wrapper = mountFunction({
      propsData: { touchless: true },
      slots: {
        default: [
          { extends: VWindowItem },
          { extends: VWindowItem },
        ],
      },
    })

    expect(wrapper.vm.internalIndex).toBe(0)

    touch(wrapper).start(0, 0).end(200, 0)

    expect(wrapper.vm.internalIndex).toBe(0)
  })

  // https://github.com/vuetifyjs/vuetify/issues/7728
  it('should not "wrap around" when continuous === false', () => {
    const wrapper = mountFunction({
      propsData: {
        continuous: false,
      },
      slots: {
        default: [
          { extends: VWindowItem },
          { extends: VWindowItem },
          { extends: VWindowItem },
        ],
      },
    })

    // by default we expect the internalIndex to be 0
    expect(wrapper.vm.internalIndex).toBe(0)
    // now call the prev() function
    wrapper.vm.prev()
    expect(wrapper.vm.internalIndex).toBe(0)
    // now advance to the end
    wrapper.vm.next()
    expect(wrapper.vm.internalIndex).toBe(1)
    wrapper.vm.next()
    expect(wrapper.vm.internalIndex).toBe(2)
    // it should not be able to advance past the end
    wrapper.vm.next()
    expect(wrapper.vm.internalIndex).toBe(2)
  })
})

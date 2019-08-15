import Menuable from '../'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

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
})

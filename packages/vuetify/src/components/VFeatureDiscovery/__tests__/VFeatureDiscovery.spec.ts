// Components
import VFeatureDiscovery from '../VFeatureDiscovery'

// Utilities
import {
  mount,
  Wrapper
} from '@vue/test-utils'
import { ExtractVue } from '../../../util/mixins'

describe('FeatureDiscovery.ts', () => {
  type Instance = ExtractVue<typeof VFeatureDiscovery>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VFeatureDiscovery, {
        ...options
      })
    }
  })

  it('should get closeConditional', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.closeConditional()).toBeTruthy()
    wrapper.setProps({
      persistent: true
    })
    expect(wrapper.vm.closeConditional()).toBeFalsy()
    wrapper.setProps({
      persistent: false
    })
    wrapper.setData({
      isActive: false
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
        flat: true
      }
    })

    expect(wrapper.classes('v-feature-discovery--flat')).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should toggle', () => {
    const wrapper = mountFunction({
      propsData: {
        target: document.body
      }
    })

    expect(wrapper.classes('v-feature-discovery--active')).toBeTruthy()
    expect(document.body.style.zIndex).toBe('11')
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.vm.isActive = false

    expect(wrapper.classes('v-feature-discovery--active')).toBeFalsy()
    expect(document.body.style.zIndex).toBe('0')
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.vm.isActive = true
    wrapper.setData({
      oldZIndex: 123
    })
    wrapper.vm.isActive = false
    expect(document.body.style.zIndex).toBe('123')
  })

  it('should work with scroll properly', async () => {
    const fn = jest.fn()

    const wrapper = mountFunction()

    wrapper.vm.$watch('movable', fn)

    expect(fn).toHaveBeenCalledTimes(0)
    wrapper.vm.onScroll()
    wrapper.setData({
      targetEl: {
        getBoundingClientRect: () => ({
          top: 1,
          bottom: 2,
          left: 3,
          right: 4,
          height: 5,
          width: 6
        }),
        style: {}
      }
    })
    expect(fn).toHaveBeenCalledTimes(0)
    wrapper.vm.onScroll()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.rect).toEqual({
      top: 1,
      bottom: 2,
      left: 3,
      right: 4,
      height: 5,
      width: 6
    })
    expect(fn).toHaveBeenCalledWith(false, true)
  })

  it('should update targetEl when target prop updates', () => {
    const wrapper = mountFunction()

    const spy = jest.spyOn(wrapper.vm, 'updateTarget')

    expect(spy).toHaveBeenCalledTimes(0)
    wrapper.setProps({
      target: '#asd'
    })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should update z-index', () => {
    const wrapper = mountFunction()

    wrapper.setProps({
      target: document.body
    })

    wrapper.setData({
      oldZIndex: 123
    })
    expect(document.body.style.zIndex).toBe('11')

    document.head.style.zIndex = '321'
    wrapper.setProps({
      target: document.head
    })
    wrapper.vm.updateTarget()
    expect(wrapper.vm.oldZIndex).toBe(321)
    expect(document.head.style.zIndex).toBe('11')
  })
})

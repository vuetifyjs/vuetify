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
    const wrapper = mountFunction()

    expect(wrapper.classes('v-feature-discovery--active')).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.vm.isActive = false

    expect(wrapper.classes('v-feature-discovery--active')).toBeFalsy()
    expect(wrapper.html()).toMatchSnapshot()
  })
})

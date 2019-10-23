// Libraries
import Vue from 'vue'

// Components
import VToolbar from '../VToolbar'
import { ExtractVue } from '../../../util/mixins'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

describe('VToolbar.ts', () => {
  type Instance = ExtractVue<typeof VToolbar>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VToolbar, {
        // https://github.com/vuejs/vue-test-utils/issues/1130
        sync: false,
        mocks: {
          $vuetify: {
            breakpoint: {},
          },
        },
        ...options,
      })
    }
  })

  it('should render an extended toolbar', () => {
    const wrapper = mountFunction({
      propsData: {
        extended: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render an extended toolbar with specific height', () => {
    const wrapper = mountFunction({
      propsData: {
        extended: true,
        extensionHeight: 42,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should properly calculate content height', () => {
    const wrapper = mountFunction()

    wrapper.setProps({
      height: 999,
    })
    expect(wrapper.vm.computedContentHeight).toBe(999)

    wrapper.setProps({
      height: null,
      dense: true,
    })
    expect(wrapper.vm.computedContentHeight).toBe(48)

    wrapper.setProps({
      height: null,
      dense: false,
      prominent: true,
    })
    expect(wrapper.vm.computedContentHeight).toBe(128)

    wrapper.setProps({
      height: null,
      dense: false,
      prominent: false,
    })
    Vue.set(wrapper.vm.$vuetify.breakpoint, 'smAndDown', true)
    expect(wrapper.vm.computedContentHeight).toBe(56)
    Vue.set(wrapper.vm.$vuetify.breakpoint, 'smAndDown', false)
    expect(wrapper.vm.computedContentHeight).toBe(64)
  })

  it('should have a custom extension height', () => {
    const wrapper = mountFunction({
      propsData: { tabs: true },
    })

    expect(wrapper.vm.extensionHeight).toBe(48)
  })

  it('should set height equal to both height and extensionHeight', () => {
    const wrapper = mountFunction({
      propsData: {
        height: 112,
        extended: true,
        extensionHeight: 64,
      },
    })

    expect((wrapper.vm.styles as any).height).toBe('176px')
  })
})

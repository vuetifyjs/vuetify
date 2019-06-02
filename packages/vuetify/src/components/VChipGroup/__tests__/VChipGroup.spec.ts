// Libraries
import Vue from 'vue'

// Plugins
import Router from 'vue-router'

// Components
import VChipGroup from '../VChipGroup'

// Utilities
import {
  createLocalVue,
  mount,
  Wrapper,
} from '@vue/test-utils'

describe('VChipGroup.ts', () => {
  let mountFunction: (options?: object) => Wrapper<Vue>
  let router: Router
  let localVue: typeof Vue

  beforeEach(() => {
    router = new Router()
    localVue = createLocalVue()
    localVue.use(Router)

    mountFunction = (options = {}) => {
      return mount(VChipGroup, {
        localVue,
        router,
        mocks: {
          $vuetify: {
            breakpoint: {},
          },
        },
        ...options,
      })
    }
  })

  it('should have a v-chip-group class', () => {
    const wrapper = mountFunction()

    expect(wrapper.classes()).toContain('v-chip-group')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render column', () => {
    const wrapper = mountFunction({
      propsData: {
        column: true,
      },
    })

    expect(wrapper.classes()).toContain('v-chip-group--column')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should switch to column', () => {
    const wrapper = mountFunction()

    expect(wrapper.classes()).not.toContain('v-chip-group--column')
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      column: true,
    })

    expect(wrapper.classes()).toContain('v-chip-group--column')
    expect(wrapper.html()).toMatchSnapshot()
  })
})

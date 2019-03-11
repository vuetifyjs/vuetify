// Libraries
import Vue from 'vue'

// Components
import VToolbarSideIcon from '../VToolbarSideIcon'

// Utilities
import {
  mount,
  Wrapper
} from '@vue/test-utils'
import { ExtractVue } from '../../../util/mixins'

describe('ToolbarSideIcon.ts', () => {
  type Instance = ExtractVue<typeof VToolbarSideIcon>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VToolbarSideIcon, {
        ...options
      })
    }
  })

  it('should render correctly', () => {
    const wrapper = mountFunction()
    expect(wrapper.html()).toMatchSnapshot()
  })
})

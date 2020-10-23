// @ts-nocheck
/* eslint-disable */

// Libraries
// import Vue from 'vue'

// Components
// import VAppBarNavIcon from '../VAppBarNavIcon'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'
// import { ExtractVue } from '../../../util/mixins'

describe.skip('AppBarNavIcon.ts', () => {
  type Instance = ExtractVue<typeof VAppBarNavIcon>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VAppBarNavIcon, {
        ...options,
      })
    }
  })

  it('should render correctly', () => {
    const wrapper = mountFunction()
    expect(wrapper.html()).toMatchSnapshot()
  })
})

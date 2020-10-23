// @ts-nocheck
/* eslint-disable */

// Components
// import VListItemAvatar from '../VListItemAvatar'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

// Types
// import { ExtractVue } from '../../../util/mixins'

describe.skip('VListItemAvatar.ts', () => {
  type Instance = ExtractVue<typeof VListItemAvatar>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VListItemAvatar, {
        ...options,
      })
    }
  })

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })
})

// @ts-nocheck
/* eslint-disable */

// Components
// import VLayout from '../VLayout'

// Utilities
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe.skip('VLayout.ts', () => {
  type Instance = InstanceType<typeof VLayout>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VLayout, {
        ...options,
      })
    }
  })

  it('should work', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })
})

// @ts-nocheck
/* eslint-disable */

// import VTimeline from '../VTimeline'
import { mount } from '@vue/test-utils'

describe.skip('VTimeline.ts', () => {
  it('should match snapshot', () => {
    const wrapper = mount(VTimeline)

    expect(wrapper.html()).toMatchSnapshot()
  })
})

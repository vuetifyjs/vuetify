// @ts-nocheck
/* tslint:disable */
/* eslint-disable */
import { mount } from '@vue/test-utils'

// Components
// import VTimeline from '../VTimeline'

describe.skip('VTimeline.ts', () => {
  it('should match snapshot', () => {
    const wrapper = mount(VTimeline)

    expect(wrapper.html()).toMatchSnapshot()
  })
})

// @ts-nocheck
/* eslint-disable */

// import VTimeline from '../VTimeline'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from '@jest/globals'

describe.skip('VTimeline.ts', () => {
  it('should match snapshot', () => {
    const wrapper = mount(VTimeline)

    expect(wrapper.html()).toMatchSnapshot()
  })
})

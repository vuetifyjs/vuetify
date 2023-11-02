// Composables
import { makeRoundedProps, useRounded } from '../rounded'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'

// Types
import type { RoundedProps } from '../rounded'

describe('rounded.ts', () => {
  it('should create rounded props', () => {
    const wrapper = mount({
      props: makeRoundedProps(),
      template: '<div/>',
    }, {
      propsData: { rounded: true },
    })

    expect(wrapper.props().rounded).toBeDefined()
  })

  it.each([
    // When should return nothing
    [{}, []],
    [{ rounded: null }, []],
    [{ rounded: 1 }, []],
    // // Rounded only
    [{ rounded: true }, ['foo--rounded']],
    [{ rounded: '' }, ['foo--rounded']],
    // // Rounded with 0
    [{ rounded: '0' }, ['rounded-0']],
    [{ rounded: 0 }, ['rounded-0']],
    // // Rounded with a word
    [{ rounded: 'circle' }, ['rounded-circle']],
    [{ rounded: 'shaped' }, ['rounded-shaped']],
    [{ rounded: 'pill' }, ['rounded-pill']],
    // // Corner and axis rounded
    [{ rounded: 'te-xl be-lg' }, ['rounded-te-xl', 'rounded-be-lg']],
  ] as RoundedProps[])('should return correct rounded classes', (props: RoundedProps, expected: any) => {
    const { roundedClasses } = useRounded(props, 'foo')

    expect(roundedClasses.value).toStrictEqual(expected)
  })
})

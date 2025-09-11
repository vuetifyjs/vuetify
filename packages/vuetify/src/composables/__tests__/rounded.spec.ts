// Composables
import { makeRoundedProps, useRounded } from '../rounded'

// Utilities
import { mount } from '@vue/test-utils'
import { toRef } from 'vue'

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
    // Rounded only
    [{ rounded: true }, ['foo--rounded']],
    [{ rounded: '' }, ['foo--rounded']],
    // Rounded with 0
    [{ rounded: '0' }, ['rounded-0']],
    [{ rounded: 0 }, ['rounded-0']],
    [{ rounded: false }, ['rounded-0']],
    // Rounded with a word
    [{ rounded: 'circle' }, ['rounded-circle']],
    [{ rounded: 'shaped' }, ['rounded-shaped']],
    [{ rounded: 'pill' }, ['rounded-pill']],
    // Corner and axis rounded
    [{ rounded: 'te-xl be-lg' }, ['rounded-te-xl', 'rounded-be-lg']],
  ] as RoundedProps[])('should return correct rounded classes', (props: RoundedProps, expected: any) => {
    const { roundedClasses } = useRounded(props, 'foo')

    expect(roundedClasses.value).toStrictEqual(expected)
  })

  it.each([
    [null, []],
    [1, []],
    // Rounded only
    [true, ['foo--rounded']],
    ['', ['foo--rounded']],
    // Rounded with 0
    [0, ['rounded-0']],
    [false, ['rounded-0']],
    // Rounded with a word
    ['circle', ['rounded-circle']],
    // Corner and axis rounded
    ['te-xl be-lg', ['rounded-te-xl', 'rounded-be-lg']],
  ])('should return same result when props are passed as ref', (rounded: RoundedProps['rounded'], expected: any) => {
    const { roundedClasses } = useRounded(toRef(() => rounded), 'foo')

    expect(roundedClasses.value).toStrictEqual(expected)
  })
})

// Composables
import { makeRoundedProps, useRounded } from '../rounded'

// Utilities
import { mount } from '@vue/test-utils'
import { ref, toRef } from 'vue'

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

  it.each([
    // No style for falsy/named values
    [{}, {}],
    [{ rounded: null }, {}],
    [{ rounded: true }, {}],
    [{ rounded: false }, {}],
    [{ rounded: '' }, {}],
    [{ rounded: 0 }, {}],
    [{ rounded: '0' }, {}],
    [{ rounded: 'xl' }, {}],
    [{ rounded: 'pill' }, {}],
    [{ rounded: 'te-xl be-lg' }, {}],
    // Arbitrary numeric values
    [{ rounded: 8 }, { borderRadius: '8px' }],
    [{ rounded: 16 }, { borderRadius: '16px' }],
    // Arbitrary CSS string values
    [{ rounded: '8px' }, { borderRadius: '8px' }],
    [{ rounded: '50%' }, { borderRadius: '50%' }],
    [{ rounded: '1em' }, { borderRadius: '1em' }],
    [{ rounded: '4px 8px' }, { borderRadius: '4px 8px' }],
  ] as RoundedProps[])('should return correct rounded styles', (props: RoundedProps, expected: any) => {
    const { roundedStyles } = useRounded(props, 'foo')

    expect(roundedStyles.value).toStrictEqual(expected)
  })

  it('should react to ref changes for both classes and styles', () => {
    const rounded = ref<RoundedProps['rounded']>(null)
    const { roundedClasses, roundedStyles } = useRounded(toRef(() => rounded.value), 'foo')

    expect(roundedClasses.value).toStrictEqual([])
    expect(roundedStyles.value).toStrictEqual({})

    rounded.value = 'xl'
    expect(roundedClasses.value).toStrictEqual(['rounded-xl'])
    expect(roundedStyles.value).toStrictEqual({})

    rounded.value = true
    expect(roundedClasses.value).toStrictEqual(['foo--rounded'])
    expect(roundedStyles.value).toStrictEqual({})

    rounded.value = 11
    expect(roundedClasses.value).toStrictEqual([])
    expect(roundedStyles.value).toStrictEqual({ borderRadius: '11px' })

    rounded.value = false
    expect(roundedClasses.value).toStrictEqual(['rounded-0'])
    expect(roundedStyles.value).toStrictEqual({})

    rounded.value = '50%'
    expect(roundedClasses.value).toStrictEqual([])
    expect(roundedStyles.value).toStrictEqual({ borderRadius: '50%' })

    rounded.value = '7px'
    expect(roundedClasses.value).toStrictEqual([])
    expect(roundedStyles.value).toStrictEqual({ borderRadius: '7px' })

    rounded.value = 0
    expect(roundedClasses.value).toStrictEqual(['rounded-0'])
    expect(roundedStyles.value).toStrictEqual({})
  })
})

import {
  useBorderRadius,
  borderRadiusClassNames,
} from '../border-radius'
import type {
  BorderRadiusProps,
} from '../border-radius'

describe('border-radius', () => {
  const assertions = [
    // Rounded with 0
    [{ rounded: false }, ['rounded-0']],
    [{ rounded: '0' }, ['rounded-0']],
    [{ rounded: 0 }, ['rounded-0']],
    [{ rounded: 'tile' }, ['rounded-0']],
    // Rounded with a word
    [{ rounded: 'circle' }, ['rounded-circle']],
    [{ rounded: 'shaped' }, ['rounded-shaped']],
    [{ rounded: 'pill' }, ['rounded-pill']],
    // Rounded only
    [{ rounded: true }, ['rounded']],
    [{ rounded: '' }, ['rounded']],
    // When should return nothing
    [{ rounded: 1 }, []],
    [{ rounded: { toString: () => 'pill' } }, []],
    [undefined, []],
    [{ rounded: null }, []],
    // Rounded with more than one words, ensure sorting
    [
      { rounded: 'tr-xl br-lg' },
      ['rounded-br-lg', 'rounded-tr-xl'],
    ],
    [{ rounded: 'sm-3 4' }, ['rounded-4', 'rounded-sm-3']],
    // All strings are accepted?
    [{ rounded: 'foo-bar-bazz-buzz' }, ['rounded-foo-bar-bazz-buzz']],
    [{ rounded: '!' }, ['rounded-!']],
  ] as [BorderRadiusProps, string[]][]

  it.each(assertions)(
    'should return correct rounded classes',
    (propsData, expected) => {
      const vm = useBorderRadius(propsData)
      const subject = borderRadiusClassNames(propsData)

      expect(vm.borderRadiusClasses.value).toMatchObject(expected)
      expect(subject).toMatchObject(expected)
    },
  )
})

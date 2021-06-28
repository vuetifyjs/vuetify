import { allowedVariants, makeVariantProps, useVariant } from '../variant'

describe('size', () => {
  it.each([
    [{ variant: 'default' }, 'test--variant-default'],
    [{ variant: 'contained' }, 'test--variant-contained'],
    [{ variant: 'outlined' }, 'test--variant-outlined'],
    [{ variant: 'text' }, 'test--variant-text'],
  ] as const)('should return the correct class given value %p', (input, expected) => {
    const { variantClasses } = useVariant(input, 'test')

    expect(variantClasses.value).toStrictEqual(expected)
  })

  it('should only allow values from allowedVariants', () => {
    const { variant: { validator } } = makeVariantProps()
    const invalidValues = [-1, '25', false, true, null]

    for (const value of allowedVariants) {
      expect(validator(value)).toBe(true)
    }

    for (const value of invalidValues) {
      expect(validator(value)).toBe(false)
    }
  })

  it.each([
    [{ color: 'primary' }, 'text-primary'],
    [{ variant: 'default', color: 'primary' }, 'text-primary'],
    [{ variant: 'contained', color: 'primary' }, 'bg-primary'],
    [{ variant: 'outlined', color: 'primary' }, 'text-primary'],
    [{ variant: 'text', color: 'primary' }, 'text-primary'],
  ] as const)('should return correct classes for %s props', (props, expected) => {
    const { colorClasses } = useVariant(props, 'test')

    expect(colorClasses.value).toContain(expected)
  })
})

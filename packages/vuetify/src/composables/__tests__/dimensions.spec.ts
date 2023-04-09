// Utilities
import { describe, expect, it } from '@jest/globals'
import { useDimension } from '../dimensions'

// Types
import type { DimensionProps } from '../dimensions'

describe('dimensions.ts', () => {
  it.each([
    [{ height: null }, {}],
    [{ height: 101 }, { height: '101px' }],
    [{ maxHeight: 102 }, { maxHeight: '102px' }],
    [{ maxWidth: 102 }, { maxWidth: '102px' }],
    [{ minHeight: 103 }, { minHeight: '103px' }],
    [{ minWidth: 104 }, { minWidth: '104px' }],
    [{ width: 105 }, { width: '105px' }],
  ])('should have proper styles', (props, expected) => {
    const { dimensionStyles } = useDimension(props as DimensionProps)

    expect(dimensionStyles.value).toEqual(expected)
  })
})

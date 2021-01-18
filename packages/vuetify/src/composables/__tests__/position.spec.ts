// Utilities
import { usePosition } from '..'

// Types
import type { PositionProps } from '..'

describe('position.ts', () => {
  it.each([
    [{ position: undefined }, undefined],
    [{ position: false }, undefined],
    [{ position: 'absolute' }, 'position-absolute'],
    [{ position: 'fixed' }, 'position-fixed'],
  ])('should have proper classes', (props, expected) => {
    const { positionClasses } = usePosition(props as PositionProps)

    expect(positionClasses.value).toEqual(expected)
  })

  it.each([
    [{ top: true }, { top: '0px' }],
    [{ right: 20 }, { right: '20px' }],
    [{ bottom: '20' }, { bottom: '20px' }],
    [{ left: undefined }, {}],
    [{ right: false, left: '50' }, { left: '50px' }],
  ])('should have proper styles', (props, expected) => {
    const { positionStyles } = usePosition(props)

    expect(positionStyles.value).toEqual(expected)
  })
})

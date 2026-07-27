// Composables
import { usePieArc } from '../utils'

// Utilities
import { ref } from 'vue'

describe('usePieArc', () => {
  it.each([
    [{ innerCut: 0, value: 25, hoverScale: 0 }, { x: 100, y: 50, arcWidth: 50 }],
    [{ innerCut: 25, value: 25, hoverScale: 0 }, { x: 100, y: 50, arcWidth: 37.5 }],
    [{ innerCut: 75, value: 25, hoverScale: 0 }, { x: 100, y: 50, arcWidth: 12.5 }],
    [{ innerCut: 0, value: 66, hoverScale: 0 }, { x: 7.78, y: 76.79, arcWidth: 50 }],
    [{ innerCut: 70, value: 25, hoverScale: 0.2 }, { x: 100, y: 50, arcWidth: 12 }],
    [{ innerCut: 50, value: 75, hoverScale: 0.2 }, { x: 0, y: 50, arcWidth: 20 }],
  ])('should correctly calculate arc properties', (props, expected) => {
    const isHovering = ref(false)
    const { outerX, outerY, arcWidth } = usePieArc({
      innerCut: props.innerCut ?? 0,
      value: props.value!,
      hoverScale: props.hoverScale ?? 0,
      gap: 0,
      rounded: 0,
    }, isHovering)

    expect(outerX.value).toBeCloseTo(expected.x, 2)
    expect(outerY.value).toBeCloseTo(expected.y, 2)
    expect(arcWidth.value).toBeCloseTo(expected.arcWidth, 2)
  })
})

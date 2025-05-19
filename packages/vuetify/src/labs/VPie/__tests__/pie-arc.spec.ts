// Composables
import { usePieArc } from '../utils'

// Utilities
import { ref } from 'vue'

describe('usePieArc', () => {
  it.each([
    [{ innerCut: 0, value: 25 }, { x: 100, y: 50, arcWidth: 50, sliceRadius: 0 }],
    [{ innerCut: 25, value: 25 }, { x: 100, y: 50, arcWidth: 37.5, sliceRadius: 6.25 }],
    [{ innerCut: 75, value: 25 }, { x: 100, y: 50, arcWidth: 12.5, sliceRadius: 18.75 }],
    [{ innerCut: 0, value: 66 }, { x: 7.78, y: 76.79, arcWidth: 50, sliceRadius: 0 }],
  ])('should correctly calculate arc properties', (props, expected) => {
    const isHovering = ref(false)
    const { x, y, arcWidth, sliceRadius } = usePieArc({
      innerCut: props.innerCut ?? 0,
      value: props.value!,
      gap: 0,
      rounded: 0,
    }, isHovering)

    expect(x.value).toBeCloseTo(expected.x, 2)
    expect(y.value).toBeCloseTo(expected.y, 2)
    expect(arcWidth.value).toBeCloseTo(expected.arcWidth, 2)
    expect(sliceRadius.value).toBeCloseTo(expected.sliceRadius, 2)
  })
})

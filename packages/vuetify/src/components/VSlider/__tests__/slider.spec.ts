// Composables
import { useSteps } from '../slider'

describe('useSteps', () => {
  it('should round to the step', () => {
    const { roundValue } = useSteps({ min: 0, max: 10, step: 0.25 } as any)

    expect(roundValue(1.3)).toBe(1.25)
    expect(roundValue(9.9)).toBe(10)
  })

  it('should keep the decimals of a very small step', () => {
    const { roundValue } = useSteps({ min: 0, max: 0.000001, step: 0.0000001 } as any)

    expect(roundValue(0.00000042)).toBe(0.0000004)
    expect(roundValue(0.00000096)).toBe(0.000001)
  })
})

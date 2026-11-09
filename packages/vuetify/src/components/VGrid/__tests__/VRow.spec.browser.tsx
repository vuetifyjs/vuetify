import { VRow } from '../VRow'
import { VCol } from '../VCol'

// Utilities
import { page, render, screen } from '@test'

describe('VRow', () => {
  describe('responsive gap', () => {
    function renderRow () {
      render(() => (
        <VRow gap={ 8 } gapLg={[32, 16]} noGutters>
          <VCol cols="4" data-testid="col-1" />
          <VCol cols="8" data-testid="col-2" />
          <VCol cols="12" data-testid="col-3" />
        </VRow>
      ))
      return [1, 2, 3].map(i => screen.getByTestId(`col-${i}`).getBoundingClientRect())
    }

    it('uses base gap below the breakpoint', async () => {
      await page.viewport(500, 800)
      const [first, second, third] = renderRow()

      expect(second.top).toBe(first.top)
      expect(second.left - first.right).toBeCloseTo(8)
      expect(third.top - first.bottom).toBeCloseTo(8)
    })

    it('switches gap at the breakpoint and keeps columns on one line', async () => {
      await page.viewport(1400, 800)
      const [first, second, third] = renderRow()

      expect(second.top).toBe(first.top)
      expect(second.left - first.right).toBeCloseTo(32)
      expect(third.top - first.bottom).toBeCloseTo(16)
    })

    it('does not leak into nested rows', async () => {
      await page.viewport(1400, 800)
      render(() => (
        <VRow gapLg="40">
          <VCol>
            <VRow>
              <VCol data-testid="nested-1" />
              <VCol data-testid="nested-2" />
            </VRow>
          </VCol>
        </VRow>
      ))
      const first = screen.getByTestId('nested-1').getBoundingClientRect()
      const second = screen.getByTestId('nested-2').getBoundingClientRect()

      expect(second.left - first.right).toBeCloseTo(24)
    })
  })
})

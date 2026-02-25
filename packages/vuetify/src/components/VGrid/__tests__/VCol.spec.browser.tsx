import { VRow } from '../VRow'
import { VCol } from '../VCol'

// Utilities
import { page, render, screen } from '@test'

const defaultGap = 24

function expectedSize (cols: number, rowSize: number) {
  return cols * (rowSize - 11 * defaultGap) / 12 + (cols - 1) * defaultGap
}

function expectedShift (offset: number, rowSize: number) {
  return offset * (rowSize - 11 * defaultGap) / 12 + offset * defaultGap
}

describe('VCol', () => {
  describe('sizing', () => {
    it('renders two columns side by side', () => {
      render(() => (
        <VRow>
          <VCol data-testid="col-1">Column 1</VCol>
          <VCol data-testid="col-2">Column 2</VCol>
        </VRow>
      ))

      const rect1 = screen.getByTestId('col-1').getBoundingClientRect()
      const rect2 = screen.getByTestId('col-2').getBoundingClientRect()

      // same top position
      expect(rect1.top).toBe(rect2.top)
      // 2nd column should be to the right of the first
      expect(rect2.left).toBeGreaterThan(rect1.left)
    })

    it('breakpoint size should override auto', async () => {
      // xs viewport (below sm breakpoint of 600px)
      await page.viewport(500, 800)

      render(() => (
        <VRow>
          <VCol cols="auto" sm="4" data-testid="col-1">Column 1</VCol>
          <VCol cols="auto" sm="8" data-testid="col-2">Column 2</VCol>
        </VRow>
      ))

      const col1 = screen.getByTestId('col-1')
      const col2 = screen.getByTestId('col-2')

      let rect1 = col1.getBoundingClientRect()
      let rect2 = col2.getBoundingClientRect()

      // at xs, Auto columns should have similar widths based on content
      expect(rect1.width).toBeCloseTo(rect2.width, 0)
      expect(rect1.top).toBe(rect2.top)
      expect(rect2.left).toBeGreaterThan(rect1.left)

      await page.viewport(1000, 800)

      rect1 = col1.getBoundingClientRect()
      rect2 = col2.getBoundingClientRect()

      // At sm, breakpoint sizes should apply (4/12 vs 8/12)
      expect(rect1.width).toBeCloseTo(expectedSize(4, 1000), 1)
      expect(rect2.width).toBeCloseTo(expectedSize(8, 1000), 1)
      // Columns should be still side by side, not stacked
      expect(rect1.top).toBe(rect2.top)
      expect(rect2.left).toBeGreaterThan(rect1.left)
    })

    it('breakpoint auto should override size', async () => {
      // xs viewport (below sm breakpoint of 600px)
      await page.viewport(500, 800)

      render(() => (
        <VRow>
          <VCol cols="4" sm="auto" data-testid="col-1">Column 1</VCol>
          <VCol cols="8" sm="auto" data-testid="col-2">Column 2</VCol>
        </VRow>
      ))

      const col1 = screen.getByTestId('col-1')
      const col2 = screen.getByTestId('col-2')

      let rect1 = col1.getBoundingClientRect()
      let rect2 = col2.getBoundingClientRect()

      // At xs, cols sizes should apply (4/12 vs 8/12)
      expect(rect1.width).toBeCloseTo(expectedSize(4, 500), 1)
      expect(rect2.width).toBeCloseTo(expectedSize(8, 500), 1)
      expect(rect1.top).toBe(rect2.top)
      expect(rect2.left).toBeGreaterThan(rect1.left)

      await page.viewport(1000, 800)

      rect1 = col1.getBoundingClientRect()
      rect2 = col2.getBoundingClientRect()

      // At sm, auto should apply - columns size to content (similar widths)
      expect(rect1.width).toBeCloseTo(rect2.width, 0)
      // Columns should be still side by side, not stacked
      expect(rect1.top).toBe(rect2.top)
      expect(rect2.left).toBeGreaterThan(rect1.left)
    })
  })

  describe('offset', () => {
    it('basic offset without wrapping', () => {
      const rowSize = 1000

      render(() => (
        <VRow style={ `width: ${rowSize}px` }>
          <VCol cols="1" offset="3" data-testid="col-1">Column 1</VCol>
          <VCol cols="1" offset="2" data-testid="col-2">Column 2</VCol>
          <VCol cols="1" offset="1" data-testid="col-3">Column 3</VCol>
        </VRow>
      ))

      const rowRect = screen.getByCSS('.v-row').getBoundingClientRect()
      const rect1 = screen.getByTestId('col-1').getBoundingClientRect()
      const rect2 = screen.getByTestId('col-2').getBoundingClientRect()
      const rect3 = screen.getByTestId('col-3').getBoundingClientRect()

      // All columns should be on the same row (total: 4 + 3 + 2 = 9 columns)
      expect(rect1.top).toBe(rect2.top)
      expect(rect2.top).toBe(rect3.top)

      // Each column should be shifted by its offset
      expect(rect1.left - rowRect.left).toBeCloseTo(expectedShift(3, rowSize), 1)
      expect(rect2.left - rect1.right).toBeCloseTo(expectedShift(2, rowSize) + defaultGap, 1)
      expect(rect3.left - rect2.right).toBeCloseTo(expectedShift(1, rowSize) + defaultGap, 1)

      // All columns should have size 1
      expect(rect1.width).toBeCloseTo(expectedSize(1, rowSize), 1)
      expect(rect2.width).toBeCloseTo(expectedSize(1, rowSize), 1)
      expect(rect3.width).toBeCloseTo(expectedSize(1, rowSize), 1)
    })

    it('basic offset with wrapping', () => {
      const rowSize = 1000

      render(() => (
        <VRow style={ `width: ${rowSize}px` }>
          <VCol cols="4" offset="2" data-testid="col-1">Column 1</VCol>
          <VCol cols="4" offset="5" data-testid="col-2">Column 2</VCol>
        </VRow>
      ))

      const rowRect = screen.getByCSS('.v-row').getBoundingClientRect()
      const rect1 = screen.getByTestId('col-1').getBoundingClientRect()
      const rect2 = screen.getByTestId('col-2').getBoundingClientRect()

      // First column: offset=2 shifts it from the row's left edge
      expect(rect1.left - rowRect.left).toBeCloseTo(expectedShift(2, rowSize), 1)
      expect(rect1.width).toBeCloseTo(expectedSize(4, rowSize), 1)

      expect(rect2.top).toBeGreaterThan(rect1.top)
      // Second column: offset=5 shifts it from the row's left edge on its row
      expect(rect2.left - rowRect.left).toBeCloseTo(expectedShift(5, rowSize), 1)
      expect(rect2.width).toBeCloseTo(expectedSize(4, rowSize), 1)
    })
  })

  describe('grow', () => {
    it('sized column next to grow column', async () => {
      await page.viewport(500, 800)

      render(() => (
        <VRow>
          <VCol cols="4" sm="" data-testid="col-1">Column 1</VCol>
          <VCol data-testid="col-2">Column 2</VCol>
        </VRow>
      ))

      const col1 = screen.getByTestId('col-1')
      const col2 = screen.getByTestId('col-2')

      let rect1 = col1.getBoundingClientRect()
      let rect2 = col2.getBoundingClientRect()

      // At xs, expecting 4:8 split
      expect(rect1.width).toBeCloseTo(expectedSize(4, 500), 1)
      expect(rect2.width).toBeCloseTo(expectedSize(8, 500), 1)
      expect(rect1.top).toBe(rect2.top)

      await page.viewport(1000, 800)

      rect1 = col1.getBoundingClientRect()
      rect2 = col2.getBoundingClientRect()

      // At sm, expecting 6:6 split (both grow equally)
      expect(rect1.width).toBeCloseTo(expectedSize(6, 1000), 1)
      expect(rect2.width).toBeCloseTo(expectedSize(6, 1000), 1)
      expect(rect1.top).toBe(rect2.top)
    })

    it('grow column with breakpoint size next to two grow columns', async () => {
      await page.viewport(500, 800)

      render(() => (
        <VRow>
          <VCol sm="3" data-testid="col-1">Column 1</VCol>
          <VCol data-testid="col-2">Column 2</VCol>
          <VCol data-testid="col-3">Column 3</VCol>
        </VRow>
      ))

      const col1 = screen.getByTestId('col-1')
      const col2 = screen.getByTestId('col-2')
      const col3 = screen.getByTestId('col-3')

      let rect1 = col1.getBoundingClientRect()
      let rect2 = col2.getBoundingClientRect()
      let rect3 = col3.getBoundingClientRect()

      // At xs, expecting 3 equal pieces (all grow)
      expect(rect1.width).toBeCloseTo(expectedSize(4, 500), 1)
      expect(rect2.width).toBeCloseTo(expectedSize(4, 500), 1)
      expect(rect3.width).toBeCloseTo(expectedSize(4, 500), 1)
      expect(rect1.top).toBe(rect2.top)
      expect(rect2.top).toBe(rect3.top)

      await page.viewport(1000, 800)

      rect1 = col1.getBoundingClientRect()
      rect2 = col2.getBoundingClientRect()
      rect3 = col3.getBoundingClientRect()

      // At sm, expecting 1 specific size (3 cols) + 2 adapted sizes
      expect(rect1.width).toBeCloseTo(expectedSize(3, 1000), 1)
      const adaptedSize = (expectedSize(9, 1000) - defaultGap) / 2
      expect(rect2.width).toBeCloseTo(adaptedSize, 1)
      expect(rect3.width).toBeCloseTo(adaptedSize, 1)
      expect(rect1.top).toBe(rect2.top)
      expect(rect2.top).toBe(rect3.top)
    })

    it('auto column next to grow column with breakpoint offset', async () => {
      await page.viewport(500, 800)

      render(() => (
        <VRow>
          <VCol cols="auto" sm="4" data-testid="col-1" style="min-width: 100px">Column 1</VCol>
          <VCol offsetSm="4" data-testid="col-2">Column 2</VCol>
        </VRow>
      ))

      const col1 = screen.getByTestId('col-1')
      const col2 = screen.getByTestId('col-2')

      let rect1 = col1.getBoundingClientRect()
      let rect2 = col2.getBoundingClientRect()

      // At xs, expecting 100px and (rest - gap) split
      expect(rect1.width).toBeCloseTo(100, 1)
      expect(rect2.width).toBeCloseTo(500 - 100 - defaultGap, 1)
      expect(rect1.top).toBe(rect2.top)

      await page.viewport(1000, 800)

      rect1 = col1.getBoundingClientRect()
      rect2 = col2.getBoundingClientRect()

      // At sm, expecting 4:4 split (offset-sm:4 takes 4 cols)
      expect(rect1.width).toBeCloseTo(expectedSize(4, 1000), 1)
      expect(rect2.width).toBeCloseTo(expectedSize(4, 1000), 1)
      expect(rect1.top).toBe(rect2.top)
    })

    it('grow column with offset next to grow column', () => {
      const rowSize = 1000

      render(() => (
        <VRow style={ `width: ${rowSize}px` }>
          <VCol offset="2" data-testid="col-1">Column 1</VCol>
          <VCol data-testid="col-2">Column 2</VCol>
        </VRow>
      ))

      const rowRect = screen.getByCSS('.v-row').getBoundingClientRect()
      const rect1 = screen.getByTestId('col-1').getBoundingClientRect()
      const rect2 = screen.getByTestId('col-2').getBoundingClientRect()

      // Expecting 5:5 split with offset:2 gap on the left
      expect(rect1.left - rowRect.left).toBeCloseTo(expectedShift(2, rowSize), 1)
      expect(rect1.width).toBeCloseTo(expectedSize(5, rowSize), 1)
      expect(rect2.width).toBeCloseTo(expectedSize(5, rowSize), 1)
      expect(rect1.top).toBe(rect2.top)
    })
  })
})

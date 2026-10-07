// Components
import { VPagination } from '../VPagination'
import { VLocaleProvider } from '@/components/VLocaleProvider'

// Utilities
import { page, render, screen, showcase, userEvent, waitIdle } from '@test'
import { ref } from 'vue'

const stories = {
  RTL: (
    <VLocaleProvider rtl>
      <VPagination length="5" />
    </VLocaleProvider>
  ),
}

describe('VPagination', () => {
  it('should render set length', () => {
    render(() => (
      <VPagination length="3" />
    ))

    expect(screen.getAllByCSS('.v-pagination__item')).toHaveLength(3)
  })

  async function sampleFrames (frames: number) {
    const samples: string[] = []
    for (let i = 0; i < frames; i++) {
      await new Promise(resolve => requestAnimationFrame(resolve))
      samples.push(screen.getByCSS('.v-pagination__list').textContent ?? '')
    }
    return samples
  }

  it('should still measure a container that is too small', async () => {
    render(() => (
      <div style="width: 300px">
        <VPagination length="100" modelValue={ 1 } />
      </div>
    ))

    await waitIdle()

    expect(screen.getAllByCSS('.v-pagination__item').length).toBeLessThan(8)
    expect(screen.getByCSS('.v-pagination__list')).toHaveTextContent('100')

    const samples = await sampleFrames(20)

    expect(samples.filter((s, i) => i > 0 && s !== samples[i - 1])).toHaveLength(0)
  })

  describe('in a flexbox container', () => {
    it('should render all pages when length is less than 3', async () => {
      render(() => (
        <div class="d-flex">
          <VPagination length="2" />
        </div>
      ))

      await waitIdle()

      expect(screen.getAllByCSS('.v-pagination__item')).toHaveLength(2)
      expect(screen.getAllByCSS('.v-pagination__item .v-btn').at(0)).toHaveTextContent('1')
      expect(screen.getAllByCSS('.v-pagination__item .v-btn').at(1)).toHaveTextContent('2')
    })

    it('should not oscillate the range', async () => {
      render(() => (
        <div class="d-flex">
          <VPagination length="5" modelValue={ 3 } />
        </div>
      ))

      await waitIdle()

      const samples = await sampleFrames(20)
      const transitions = samples.filter((s, i) => i > 0 && s !== samples[i - 1])

      expect(transitions).toHaveLength(0)
      expect(samples.at(-1)).toBe('12345')
    })

    it('should fit pages next to controls of a different width', async () => {
      render(() => (
        <div class="d-flex" style="width: 600px">
          <style>{ '.v-pagination__prev .v-btn, .v-pagination__next .v-btn { width: 30px; min-width: 30px }' }</style>
          <VPagination length="999" modelValue={ 1 } />
          <button style="width: 100px">something</button>
        </div>
      ))

      await waitIdle()

      const list = screen.getByCSS('.v-pagination__list')
      const lastItem = screen.getAllByCSS('.v-pagination__next').at(-1)!
      expect(lastItem.getBoundingClientRect().right).toBeLessThanOrEqual(list.getBoundingClientRect().right + 1)
      expect(screen.getAllByCSS('.v-pagination__item').length).toBeGreaterThan(5)
    })

    it('should not overflow after jumping to wider page numbers', async () => {
      for (const width of [600, 615, 630, 645, 660]) {
        const model = ref(1)
        const { unmount } = render(() => (
          <div class="d-flex" style={{ width: `${width}px` }}>
            <VPagination v-model={ model.value } length="100000" />
          </div>
        ))

        await waitIdle()
        model.value = 100000
        await waitIdle()

        const list = screen.getByCSS('.v-pagination__list').getBoundingClientRect()
        const first = screen.getByCSS('.v-pagination__prev').getBoundingClientRect()
        const last = screen.getByCSS('.v-pagination__next').getBoundingClientRect()
        expect.soft(first.left, `${width}px`).toBeGreaterThanOrEqual(list.left)
        expect.soft(last.right, `${width}px`).toBeLessThanOrEqual(list.right)
        unmount()
      }
    })

    it('should show more pages when the container grows', async () => {
      const width = ref(300)
      render(() => (
        <div class="d-flex" style={{ width: `${width.value}px` }}>
          <VPagination length="100" />
        </div>
      ))

      await waitIdle()
      const before = screen.getAllByCSS('.v-pagination__item').length

      width.value = 600
      await waitIdle()

      expect(screen.getAllByCSS('.v-pagination__item').length).toBeGreaterThan(before)
    })

    it('should still honor an explicit total-visible when length is less than 3', () => {
      render(() => (
        <div class="d-flex">
          <VPagination length="2" totalVisible="1" />
        </div>
      ))

      expect(screen.getAllByCSS('.v-pagination__item')).toHaveLength(1)
    })
  })

  it('should render without first and last page buttons', () => {
    render(() => (
      <VPagination showFirstLastPage={ false } length="3" />
    ))

    expect(screen.queryByTestId('v-pagination-first')).not.toBeInTheDocument()
    expect(screen.queryByTestId('v-pagination-last')).not.toBeInTheDocument()
  })

  it('should render without last page button', () => {
    render(() => (
      <VPagination showFirstLastPage="only-first" showlength="3" />
    ))

    expect(screen.queryByTestId('v-pagination-first')).toBeInTheDocument()
    expect(screen.queryByTestId('v-pagination-last')).not.toBeInTheDocument()
  })

  it('should react to mouse navigation', async () => {
    render(() => (
      <VPagination length="3" />
    ))

    const prevBtn = screen.getByCSS('.v-pagination__prev')
    const nextBtn = screen.getByCSS('.v-pagination__next')

    await userEvent.click(screen.getAllByCSS('.v-pagination__item .v-btn').at(1)!)

    expect(screen.getAllByCSS('.v-pagination__item').at(1)).toHaveClass('v-pagination__item--is-active')

    await userEvent.click(nextBtn)

    expect(screen.getAllByCSS('.v-pagination__item').at(2)).toHaveClass('v-pagination__item--is-active')

    await userEvent.click(prevBtn)
    await userEvent.click(prevBtn)

    expect(screen.getAllByCSS('.v-pagination__item').at(0)).toHaveClass('v-pagination__item--is-active')
  })

  it('should react to keyboard navigation', async () => {
    const model = ref(2)
    render(() => (
      <VPagination v-model={ model.value } length="3" />
    ))

    await userEvent.tab()
    await userEvent.keyboard('{ArrowLeft}')

    expect(screen.getAllByCSS('.v-pagination__item').at(0)).toHaveClass('v-pagination__item--is-active')

    await userEvent.keyboard('{ArrowRight}{ArrowRight}')

    expect(screen.getAllByCSS('.v-pagination__item').at(2)).toHaveClass('v-pagination__item--is-active')
  })

  it('should render offset pages when using start prop', () => {
    render(() => (
      <VPagination length="3" start={ 3 } />
    ))

    expect(screen.getAllByCSS('.v-pagination__item .v-btn').at(0)).toHaveTextContent('3')
    expect(screen.getAllByCSS('.v-pagination__item .v-btn').at(1)).toHaveTextContent('4')
    expect(screen.getAllByCSS('.v-pagination__item .v-btn').at(2)).toHaveTextContent('5')
  })

  it('should render disabled buttons when length is zero', () => {
    render(() => (
      <VPagination length="0" />
    ))

    expect(screen.getByCSS('.v-pagination__prev .v-btn')).toHaveAttribute('disabled')
    expect(screen.getByCSS('.v-pagination__next .v-btn')).toHaveAttribute('disabled')
  })

  it('should only render set number of visible items', async () => {
    render(() => (
      <VPagination length="100" totalVisible="5" />
    ))

    // 5 buttons and 1 ellipsis
    expect(screen.getAllByCSS('.v-pagination__item')).toHaveLength(6)

    await userEvent.click(screen.getByText('4'))
    // 5 buttons and 2 ellipsis
    expect(screen.getAllByCSS('.v-pagination__item')).toHaveLength(7)
  })

  it('should limit items when not enough space', async () => {
    await page.viewport(500, 500)

    render(() => (
      <VPagination length="100" />
    ))

    expect(screen.getAllByCSS('.v-pagination__item')).toHaveLength(6)
  })

  it('should use color props', () => {
    render(() => (
      <VPagination color="error" activeColor="success" length="5" />
    ))

    expect(screen.getAllByCSS('.v-btn').at(0)).toHaveClass('text-error')
    expect(screen.getAllByCSS('.v-btn').at(1)).toHaveClass('text-success')
  })

  it('should work with 2 total visible items', async () => {
    render(() => (
      <VPagination length="10" totalVisible="2" />
    ))

    expect(screen.getAllByCSS('.v-pagination__item')).toHaveLength(3)
    expect(screen.getAllByCSS('.v-pagination__item').at(0)).toHaveTextContent('1')
    expect(screen.getAllByCSS('.v-pagination__item').at(2)).toHaveTextContent('10')

    await userEvent.click(screen.getByCSS('.v-pagination__next'))

    expect(screen.getAllByCSS('.v-pagination__item')).toHaveLength(5)
    expect(screen.getAllByCSS('.v-pagination__item').at(0)).toHaveTextContent('1')
    expect(screen.getAllByCSS('.v-pagination__item').at(2)).toHaveTextContent('2')
    expect(screen.getAllByCSS('.v-pagination__item').at(4)).toHaveTextContent('10')

    await userEvent.click(screen.getAllByCSS('.v-pagination__item').at(4)!)

    expect(screen.getAllByCSS('.v-pagination__item')).toHaveLength(3)
    expect(screen.getAllByCSS('.v-pagination__item').at(0)).toHaveTextContent('1')
    expect(screen.getAllByCSS('.v-pagination__item').at(2)).toHaveTextContent('10')

    await userEvent.click(screen.getByCSS('.v-pagination__prev'))

    expect(screen.getAllByCSS('.v-pagination__item')).toHaveLength(5)
    expect(screen.getAllByCSS('.v-pagination__item').at(0)).toHaveTextContent('1')
    expect(screen.getAllByCSS('.v-pagination__item').at(2)).toHaveTextContent('9')
    expect(screen.getAllByCSS('.v-pagination__item').at(4)).toHaveTextContent('10')
  })

  it('should work with even total visible items', async () => {
    render(() => (
      <VPagination length="10" totalVisible="4" />
    ))

    expect(screen.getAllByCSS('.v-pagination__item')).toHaveLength(5)
    expect(screen.getAllByCSS('.v-pagination__item').at(0)).toHaveTextContent('1')
    expect(screen.getAllByCSS('.v-pagination__item').at(1)).toHaveTextContent('2')
    expect(screen.getAllByCSS('.v-pagination__item').at(2)).toHaveTextContent('3')
    expect(screen.getAllByCSS('.v-pagination__item').at(4)).toHaveTextContent('10')

    await userEvent.click(screen.getByCSS('.v-pagination__next'))

    expect(screen.getAllByCSS('.v-pagination__item')).toHaveLength(5)
    expect(screen.getAllByCSS('.v-pagination__item').at(0)).toHaveTextContent('1')
    expect(screen.getAllByCSS('.v-pagination__item').at(1)).toHaveTextContent('2')
    expect(screen.getAllByCSS('.v-pagination__item').at(2)).toHaveTextContent('3')
    expect(screen.getAllByCSS('.v-pagination__item').at(4)).toHaveTextContent('10')

    await userEvent.click(screen.getAllByCSS('.v-pagination__item').at(4)!)

    expect(screen.getAllByCSS('.v-pagination__item')).toHaveLength(5)
    expect(screen.getAllByCSS('.v-pagination__item').at(0)).toHaveTextContent('1')
    expect(screen.getAllByCSS('.v-pagination__item').at(2)).toHaveTextContent('8')
    expect(screen.getAllByCSS('.v-pagination__item').at(3)).toHaveTextContent('9')
    expect(screen.getAllByCSS('.v-pagination__item').at(4)).toHaveTextContent('10')

    await userEvent.click(screen.getByCSS('.v-pagination__prev'))

    expect(screen.getAllByCSS('.v-pagination__item')).toHaveLength(5)
    expect(screen.getAllByCSS('.v-pagination__item').at(0)).toHaveTextContent('1')
    expect(screen.getAllByCSS('.v-pagination__item').at(2)).toHaveTextContent('8')
    expect(screen.getAllByCSS('.v-pagination__item').at(3)).toHaveTextContent('9')
    expect(screen.getAllByCSS('.v-pagination__item').at(4)).toHaveTextContent('10')
  })

  it('should work with odd total visible items', async () => {
    render(() => (
      <VPagination length="10" totalVisible="3" />
    ))

    const prevBtn = screen.getByCSS('.v-pagination__prev')
    const nextBtn = screen.getByCSS('.v-pagination__next')

    expect(screen.getAllByCSS('.v-pagination__item')).toHaveLength(4)
    expect(screen.getAllByCSS('.v-pagination__item').at(0)).toHaveTextContent('1')
    expect(screen.getAllByCSS('.v-pagination__item').at(1)).toHaveTextContent('2')
    expect(screen.getAllByCSS('.v-pagination__item').at(3)).toHaveTextContent('10')

    await userEvent.click(nextBtn)
    expect(screen.getAllByCSS('.v-pagination__item')).toHaveLength(4)
    await userEvent.click(nextBtn)

    expect(screen.getAllByCSS('.v-pagination__item')).toHaveLength(5)
    expect(screen.getAllByCSS('.v-pagination__item').at(0)).toHaveTextContent('1')
    expect(screen.getAllByCSS('.v-pagination__item').at(2)).toHaveTextContent('3')
    expect(screen.getAllByCSS('.v-pagination__item').at(4)).toHaveTextContent('10')

    await userEvent.click(screen.getAllByCSS('.v-pagination__item').at(4)!)

    expect(screen.getAllByCSS('.v-pagination__item')).toHaveLength(4)
    expect(screen.getAllByCSS('.v-pagination__item').at(0)).toHaveTextContent('1')
    expect(screen.getAllByCSS('.v-pagination__item').at(2)).toHaveTextContent('9')
    expect(screen.getAllByCSS('.v-pagination__item').at(3)).toHaveTextContent('10')

    await userEvent.click(prevBtn)
    expect(screen.getAllByCSS('.v-pagination__item')).toHaveLength(4)
    await userEvent.click(prevBtn)

    expect(screen.getAllByCSS('.v-pagination__item')).toHaveLength(5)
    expect(screen.getAllByCSS('.v-pagination__item').at(0)).toHaveTextContent('1')
    expect(screen.getAllByCSS('.v-pagination__item').at(2)).toHaveTextContent('8')
    expect(screen.getAllByCSS('.v-pagination__item').at(4)).toHaveTextContent('10')
  })

  showcase({ stories })
})

// Components
import { VPagination } from '../VPagination'
import { VLocaleProvider } from '@/components/VLocaleProvider'

// Utilities
import { generate, page, render, screen, userEvent } from '@test'
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

  describe('Showcase', () => {
    generate({ stories })
  })
})

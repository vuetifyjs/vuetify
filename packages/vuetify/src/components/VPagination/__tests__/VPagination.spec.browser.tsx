// Components
import { VPagination } from '..'
import { VLocaleProvider } from '@/components/VLocaleProvider'

// Utilities
import { render, userEvent } from '@test'
import { defineComponent, ref } from 'vue'
import { keyValues } from '@/util'

describe('VPagination', () => {
  it('should render set length', () => {
    const { container } = render(() => (
      <VPagination length={ 3 } />
    ))

    expect(container.querySelectorAll('.v-pagination__item')).toHaveLength(3)
  })

  it('should react to mouse navigation', async () => {
    const { container } = render(() => (
      <VPagination length={ 3 } />
    ))

    const items = container.querySelectorAll('.v-pagination__item')
    const nextBtn = container.querySelector('.v-pagination__next .v-btn')
    const prevBtn = container.querySelector('.v-pagination__prev .v-btn')

    // Click second page
    if (items[1] && items[1].querySelector('.v-btn')) {
      await userEvent.click(items[1].querySelector('.v-btn'))
      expect(items[1]).toHaveClass('v-pagination__item--is-active')
    }

    // Click next button
    if (nextBtn) {
      await userEvent.click(nextBtn)
      expect(items[2]).toHaveClass('v-pagination__item--is-active')
    }

    // Click prev button twice
    if (prevBtn) {
      await userEvent.click(prevBtn)
      await userEvent.click(prevBtn)
      expect(items[0]).toHaveClass('v-pagination__item--is-active')
    }
  })

  it('should react to keyboard navigation', async () => {
    const { container } = render(defineComponent({
      setup () {
        const model = ref(2)
        return () => <VPagination v-model={ model.value } length={ 3 } />
      },
    }))

    const items = container.querySelectorAll('.v-pagination__item')

    // Focus first button
    const firstBtn = items[0]?.querySelector('.v-btn') as HTMLButtonElement
    if (firstBtn) {
      firstBtn.focus()

      // Press left arrow
      await userEvent.keyboard('{ArrowLeft}')
      expect(items[0]).toHaveClass('v-pagination__item--is-active')

      // Press right arrow twice
      await userEvent.keyboard('{ArrowRight}')
      await userEvent.keyboard('{ArrowRight}')
      expect(items[2]).toHaveClass('v-pagination__item--is-active')
    }
  })

  it('should render offset pages when using start prop', () => {
    const { container } = render(() => (
      <VPagination length={ 3 } start={ 3 } />
    ))

    const buttons = container.querySelectorAll('.v-pagination__item .v-btn')
    expect(buttons[0]).toHaveTextContent('3')
    expect(buttons[1]).toHaveTextContent('4')
    expect(buttons[2]).toHaveTextContent('5')
  })

  it('should render disabled buttons when length is zero', () => {
    const { container } = render(() => (
      <VPagination length={ 0 } />
    ))

    expect(container.querySelector('.v-pagination__prev .v-btn')).toHaveAttribute('disabled')
    expect(container.querySelector('.v-pagination__next .v-btn')).toHaveAttribute('disabled')
  })

  it('should only render set number of visible items', async () => {
    const { container } = render(() => (
      <VPagination length={ 100 } totalVisible={ 5 } />
    ))

    // 5 buttons and 1 ellipsis
    expect(container.querySelectorAll('.v-pagination__item')).toHaveLength(6)

    // Find and click on page 4
    const buttons = container.querySelectorAll('.v-pagination__item .v-btn')
    const page4Btn = Array.from(buttons).find(btn => btn.textContent === '4')

    if (page4Btn) {
      await userEvent.click(page4Btn)

      // 5 buttons and 2 ellipsis
      expect(container.querySelectorAll('.v-pagination__item')).toHaveLength(7)
    }
  })

  it('should use color props', () => {
    const { container } = render(() => (
      <VPagination color="error" activeColor="success" length={ 5 } />
    ))

    const buttons = container.querySelectorAll('.v-btn')
    expect(buttons[0]).toHaveClass('text-error')
    expect(buttons[1]).toHaveClass('text-success')
  })

  it('should work with 2 total visible items', async () => {
    const { container } = render(() => (
      <VPagination length={ 10 } totalVisible={ 2 } />
    ))

    let items = container.querySelectorAll('.v-pagination__item')
    expect(items).toHaveLength(3)
    expect(items[0]).toHaveTextContent('1')
    expect(items[2]).toHaveTextContent('10')

    // Click next button
    const nextBtn = container.querySelector('.v-pagination__next')
    if (nextBtn) {
      await userEvent.click(nextBtn)

      items = container.querySelectorAll('.v-pagination__item')
      expect(items).toHaveLength(5)
      expect(items[0]).toHaveTextContent('1')
      expect(items[2]).toHaveTextContent('2')
      expect(items[4]).toHaveTextContent('10')

      // Click page 10
      const page10Btn = items[4].querySelector('.v-btn')
      if (page10Btn) {
        await userEvent.click(page10Btn)

        items = container.querySelectorAll('.v-pagination__item')
        expect(items).toHaveLength(3)
        expect(items[0]).toHaveTextContent('1')
        expect(items[2]).toHaveTextContent('10')

        // Click prev button
        const prevBtn = container.querySelector('.v-pagination__prev')
        if (prevBtn) {
          await userEvent.click(prevBtn)

          items = container.querySelectorAll('.v-pagination__item')
          expect(items).toHaveLength(5)
          expect(items[0]).toHaveTextContent('1')
          expect(items[2]).toHaveTextContent('9')
          expect(items[4]).toHaveTextContent('10')
        }
      }
    }
  })

  it('should work with even total visible items', async () => {
    const { container } = render(() => (
      <VPagination length={ 10 } totalVisible={ 4 } />
    ))

    let items = container.querySelectorAll('.v-pagination__item')
    expect(items).toHaveLength(5)
    expect(items[0]).toHaveTextContent('1')
    expect(items[1]).toHaveTextContent('2')
    expect(items[2]).toHaveTextContent('3')
    expect(items[4]).toHaveTextContent('10')

    // Click next button
    const nextBtn = container.querySelector('.v-pagination__next')
    if (nextBtn) {
      await userEvent.click(nextBtn)

      items = container.querySelectorAll('.v-pagination__item')
      expect(items).toHaveLength(5)
      expect(items[0]).toHaveTextContent('1')
      expect(items[1]).toHaveTextContent('2')
      expect(items[2]).toHaveTextContent('3')
      expect(items[4]).toHaveTextContent('10')

      // Click page 10
      const page10Btn = items[4].querySelector('.v-btn')
      if (page10Btn) {
        await userEvent.click(page10Btn)

        items = container.querySelectorAll('.v-pagination__item')
        expect(items).toHaveLength(5)
        expect(items[0]).toHaveTextContent('1')
        expect(items[2]).toHaveTextContent('8')
        expect(items[3]).toHaveTextContent('9')
        expect(items[4]).toHaveTextContent('10')

        // Click prev button
        const prevBtn = container.querySelector('.v-pagination__prev')
        if (prevBtn) {
          await userEvent.click(prevBtn)

          items = container.querySelectorAll('.v-pagination__item')
          expect(items).toHaveLength(5)
          expect(items[0]).toHaveTextContent('1')
          expect(items[2]).toHaveTextContent('8')
          expect(items[3]).toHaveTextContent('9')
          expect(items[4]).toHaveTextContent('10')
        }
      }
    }
  })

  it('should work with odd total visible items', async () => {
    const { container } = render(() => (
      <VPagination length={ 10 } totalVisible={ 3 } />
    ))

    let items = container.querySelectorAll('.v-pagination__item')
    expect(items).toHaveLength(4)
    expect(items[0]).toHaveTextContent('1')
    expect(items[1]).toHaveTextContent('2')
    expect(items[3]).toHaveTextContent('10')

    // Click next button twice
    const nextBtn = container.querySelector('.v-pagination__next')
    if (nextBtn) {
      await userEvent.click(nextBtn)
      items = container.querySelectorAll('.v-pagination__item')
      expect(items).toHaveLength(4)

      await userEvent.click(nextBtn)

      items = container.querySelectorAll('.v-pagination__item')
      expect(items).toHaveLength(5)
      expect(items[0]).toHaveTextContent('1')
      expect(items[2]).toHaveTextContent('3')
      expect(items[4]).toHaveTextContent('10')

      // Click page 10
      const page10Btn = items[4].querySelector('.v-btn')
      if (page10Btn) {
        await userEvent.click(page10Btn)

        items = container.querySelectorAll('.v-pagination__item')
        expect(items).toHaveLength(4)
        expect(items[0]).toHaveTextContent('1')
        expect(items[2]).toHaveTextContent('9')
        expect(items[3]).toHaveTextContent('10')

        // Click prev button twice
        const prevBtn = container.querySelector('.v-pagination__prev')
        if (prevBtn) {
          await userEvent.click(prevBtn)
          items = container.querySelectorAll('.v-pagination__item')
          expect(items).toHaveLength(4)

          await userEvent.click(prevBtn)

          items = container.querySelectorAll('.v-pagination__item')
          expect(items).toHaveLength(5)
          expect(items[0]).toHaveTextContent('1')
          expect(items[2]).toHaveTextContent('8')
          expect(items[4]).toHaveTextContent('10')
        }
      }
    }
  })
})

// Components
import { VCarousel } from '../VCarousel'
import { VCarouselItem } from '../VCarouselItem'

// Utilities
import { commands, render, screen, userEvent } from '@test'
import { ref } from 'vue'

describe('VCarousel', () => {
  describe('keyboard controls', () => {
    it('should support horizontal keyboard navigation on delimiters', async () => {
      const model = ref(1)

      render(() => (
        <VCarousel v-model={ model.value }>
          <VCarouselItem value={ 1 }>
            <h1>1</h1>
          </VCarouselItem>
          <VCarouselItem value={ 2 }>
            <h1>2</h1>
          </VCarouselItem>
          <VCarouselItem value={ 3 }>
            <h1>3</h1>
          </VCarouselItem>
        </VCarousel>
      ))

      await commands.waitStable('.v-carousel')
      const delimiters = screen.getAllByCSS('.v-carousel__controls__item')
      await delimiters[0].focus()

      await userEvent.keyboard('{ArrowUp}')
      expect(model.value).toBe(1)
      await userEvent.keyboard('{ArrowRight}')
      expect(model.value).toBe(2)
      await userEvent.keyboard('{ArrowLeft}')
      expect(model.value).toBe(1)
      await userEvent.keyboard('{ArrowLeft}')
      expect(model.value).toBe(3)
      await userEvent.keyboard('{ArrowRight}')
      expect(model.value).toBe(1)
    })

    it('should support vertical keyboard navigation on delimiters', async () => {
      const model = ref(1)

      render(() => (
        <VCarousel v-model={ model.value } direction="vertical">
          <VCarouselItem value={ 1 }>
            <h1>1</h1>
          </VCarouselItem>
          <VCarouselItem value={ 2 }>
            <h1>2</h1>
          </VCarouselItem>
          <VCarouselItem value={ 3 }>
            <h1>3</h1>
          </VCarouselItem>
        </VCarousel>
      ))

      await commands.waitStable('.v-carousel')
      const delimiters = screen.getAllByCSS('.v-carousel__controls__item')
      await delimiters[0].focus()

      await userEvent.keyboard('{ArrowLeft}')
      expect(model.value).toBe(1)
      await userEvent.keyboard('{ArrowDown}')
      expect(model.value).toBe(2)
      await userEvent.keyboard('{ArrowUp}')
      expect(model.value).toBe(1)
      await userEvent.keyboard('{ArrowUp}')
      expect(model.value).toBe(3)
      await userEvent.keyboard('{ArrowDown}')
      expect(model.value).toBe(1)
    })
  })

  describe('pause-on-hover', () => {
    it('should pause and resume cycling while the pointer hovers the carousel', async () => {
      const model = ref(1)

      render(() => (
        <VCarousel v-model={ model.value } cycle interval={ 1000 } pauseOnHover>
          <VCarouselItem value={ 1 }>
            <h1>1</h1>
          </VCarouselItem>
          <VCarouselItem value={ 2 }>
            <h1>2</h1>
          </VCarouselItem>
          <VCarouselItem value={ 3 }>
            <h1>3</h1>
          </VCarouselItem>
        </VCarousel>
      ))

      await commands.waitStable('.v-carousel')
      const carousel = screen.getByCSS('.v-carousel')

      await userEvent.hover(carousel)
      await new Promise(resolve => setTimeout(resolve, 600))
      expect(model.value).toBe(1)

      // userEvent.unhover() moves the pointer by hovering <body>, but the carousel's
      // default height nearly fills the test viewport, so body's center can still land
      // inside it and mouseleave never fires. Dispatch it directly instead.
      carousel.dispatchEvent(new MouseEvent('mouseleave', { bubbles: false, cancelable: true }))
      await expect.poll(() => model.value, { timeout: 5000 }).toBe(2)
    })

    it('should keep cycling on hover when pause-on-hover is not set', async () => {
      const model = ref(1)

      render(() => (
        <VCarousel v-model={ model.value } cycle interval={ 200 }>
          <VCarouselItem value={ 1 }>
            <h1>1</h1>
          </VCarouselItem>
          <VCarouselItem value={ 2 }>
            <h1>2</h1>
          </VCarouselItem>
          <VCarouselItem value={ 3 }>
            <h1>3</h1>
          </VCarouselItem>
        </VCarousel>
      ))

      await commands.waitStable('.v-carousel')
      const carousel = screen.getByCSS('.v-carousel')

      await userEvent.hover(carousel)
      await expect.poll(() => model.value, { timeout: 5000 }).toBe(2)
    })
  })
})

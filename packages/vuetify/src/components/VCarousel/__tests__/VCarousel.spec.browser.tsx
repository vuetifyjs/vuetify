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
})

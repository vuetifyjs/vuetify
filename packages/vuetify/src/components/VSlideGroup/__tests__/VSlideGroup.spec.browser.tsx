// Components
import { VSlideGroup, VSlideGroupItem } from '../'
import { VBtn } from '@/components/VBtn'
import { VCard } from '@/components/VCard'

// Utilities
import { render, userEvent } from '@test'
import { createRange } from '@/util'

describe('VSlideGroup', () => {
  it('should support default scoped slot with selection', async () => {
    const { container } = render(() => (
      <VSlideGroup showArrows="always" selectedClass="bg-primary">
        { createRange(6).map(i => (
          <VSlideGroupItem key={ i } value={ i }>
            { props => (
              <VCard
                class={['ma-4', props.selectedClass]}
                color="grey"
                width="50"
                height="100"
                onClick={ props.toggle }
              >{ i }</VCard>
            )}
          </VSlideGroupItem>
        ))}
      </VSlideGroup>
    ))

    const cards = container.querySelectorAll('.v-card')
    await userEvent.click(cards[0])
    expect(cards[0]).toHaveClass('bg-primary')

    await userEvent.click(cards[3])
    expect(cards[3]).toHaveClass('bg-primary')
  })

  it('should accept scoped prev/next slots', async () => {
    const { container } = render(() => (
      <VSlideGroup showArrows="always">
        {{
          prev: props => <div { ...props } data-testid="prev-slot">prev</div>,
          next: props => <div { ...props } data-testid="next-slot">next</div>,
          default: () => createRange(6).map(i => (
            <VSlideGroupItem key={ i }>
              <VCard class="ma-4" color="grey" width="50" height="100">{ i }</VCard>
            </VSlideGroupItem>
          )),
        }}
      </VSlideGroup>
    ))

    const nextSlot = container.querySelector('[data-testid="next-slot"]')
    expect(nextSlot).toBeInTheDocument()
    expect(nextSlot).toHaveTextContent('next')
    if (nextSlot) await userEvent.click(nextSlot)

    const prevSlot = container.querySelector('[data-testid="prev-slot"]')
    expect(prevSlot).toBeInTheDocument()
    expect(prevSlot).toHaveTextContent('prev')
    if (prevSlot) await userEvent.click(prevSlot)
  })

  it('should always showArrows', () => {
    const { container } = render(() => (
      <VSlideGroup showArrows="always">
        { createRange(6).map(i => (
          <VSlideGroupItem key={ i }>
            <VCard class="ma-4" color="grey" width="50" height="100">{ i }</VCard>
          </VSlideGroupItem>
        ))}
      </VSlideGroup>
    ))

    expect(container.querySelector('.v-slide-group__prev')).toBeInTheDocument()
    expect(container.querySelector('.v-slide-group__next')).toBeInTheDocument()
  })

  it('Skip disabled elements when moving focus', async () => {
    const { container } = render(() => (
      <VSlideGroup selectedClass="bg-primary">
        { createRange(5).map(i => (
          <VSlideGroupItem key={ i }>
            <VBtn class={[`btn${i}`]} disabled={ i === 2 || i === 3 }>{ i }</VBtn>
          </VSlideGroupItem>
        ))}
      </VSlideGroup>
    ))

    const btn0 = container.querySelector('.btn0') as HTMLElement | null
    if (btn0) {
      btn0.focus()
      await userEvent.keyboard('{ArrowRight}{ArrowRight}')
      expect(document.activeElement).toHaveClass('btn4')

      await userEvent.keyboard('{ArrowLeft}')
      expect(document.activeElement).toHaveClass('btn1')
    }
  })
})

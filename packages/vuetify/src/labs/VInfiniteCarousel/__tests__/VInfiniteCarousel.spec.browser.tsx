// Components
import { VInfiniteCarousel } from '..'

// Utilities
import { commands, render, screen, userEvent, waitAnimationFrame, waitIdle } from '@test'
import { shallowRef } from 'vue'

function renderCarousel (props: Record<string, any> = {}) {
  return render(() => (
    <div>
      <button>before</button>
      <div style="width: 200px">
        <VInfiniteCarousel mask={ false } speed={ 2000 } { ...props }>
          { Array.from({ length: 10 }, (_, i) => (
            <button style="width: 100px">{ `item ${i}` }</button>
          ))}
        </VInfiniteCarousel>
      </div>
      <button>after</button>
    </div>
  ))
}

function dragAcross () {
  const { top, left } = document.querySelector('.v-infinite-carousel')!.getBoundingClientRect()
  return commands.drag([left + 180, top + 15], [left + 120, top + 15], [left + 60, top + 15])
}

function isInView (el: Element) {
  const viewport = document.querySelector('.v-infinite-carousel__viewport')!.getBoundingClientRect()
  const { left, right, top, bottom } = el.getBoundingClientRect()

  // 1px of slack for sub-pixel seeking
  return left >= viewport.left - 1 && right <= viewport.right + 1 &&
    top >= viewport.top - 1 && bottom <= viewport.bottom + 1
}

describe('VInfiniteCarousel', () => {
  it('keeps copies out of the tab order and reveals what tab reaches', async () => {
    render(() => (
      <div style="width: 200px">
        <VInfiniteCarousel mask={ false } paused>
          { Array.from({ length: 10 }, (_, i) => (
            <div style="width: 100px">
              <button>{ `item ${i}` }</button>
            </div>
          ))}
        </VInfiniteCarousel>
      </div>
    ))

    await waitIdle()

    const copied = Array.from(document.querySelectorAll<HTMLElement>('.v-infinite-carousel__group[aria-hidden] button'))
    expect(copied.length).toBeGreaterThan(0)
    expect(copied.every(button => button.tabIndex === -1)).toBe(true)

    // the strip itself, then the buttons nested in items 0 to 3
    await userEvent.keyboard('{Tab}{Tab}{Tab}{Tab}{Tab}')

    const item3 = screen.getAllByText('item 3')[0]
    expect(item3).toHaveFocus()
    expect(isInView(item3)).toBe(true)
  })

  it('repeats short content enough to cover the viewport', async () => {
    const width = shallowRef(800)

    render(() => (
      <div style={ `width: ${width.value}px` }>
        <VInfiniteCarousel mask={ false }>
          <button style="width: 100px">only</button>
        </VInfiniteCarousel>
      </div>
    ))

    await waitIdle()

    // one loop is 132px (100 + 2rem gap), so covering 800 + 132 takes 8 groups, plus the leading copy
    const groups = () => document.querySelectorAll('.v-infinite-carousel__group').length
    expect(groups()).toBe(9)

    width.value = 400
    await waitIdle()

    expect(groups()).toBe(6)
  })

  it('folds the gap into the loop distance', async () => {
    render(() => (
      <div style="width: 800px">
        <VInfiniteCarousel mask={ false } gap={ 0 }>
          <button style="width: 100px">only</button>
        </VInfiniteCarousel>
      </div>
    ))

    await waitIdle()

    // without the 2rem default the loop is 100px, so it takes more copies to cover 800
    expect(document.querySelectorAll('.v-infinite-carousel__group')).toHaveLength(10)
  })

  it('fills the faded start edge when the loop wraps', async () => {
    render(() => (
      <div style="width: 200px">
        <VInfiniteCarousel mask={{ size: 40 }} paused>
          { Array.from({ length: 10 }, (_, i) => (
            <button style="width: 100px">{ `item ${i}` }</button>
          ))}
        </VInfiniteCarousel>
      </div>
    ))

    await waitIdle()

    const edge = document.querySelector('.v-infinite-carousel__viewport')!.getBoundingClientRect().left + 5

    // resting at the loop start, the fade shows the tail of the previous lap
    expect(screen.getAllByText('item 9').some(el => {
      const { left, right } = el.getBoundingClientRect()
      return left <= edge && right >= edge
    })).toBe(true)
  })

  it('trails every item with a separator, seam included', async () => {
    render(() => (
      <div style="width: 200px">
        <VInfiniteCarousel mask={ false }>
          {{
            default: () => Array.from({ length: 4 }, (_, i) => (
              <button style="width: 100px">{ `item ${i}` }</button>
            )),
            separator: () => <i>·</i>,
          }}
        </VInfiniteCarousel>
      </div>
    ))

    await waitIdle()

    const group = document.querySelector('.v-infinite-carousel__group')!
    const kinds = Array.from(group.children, el => el.tagName.toLowerCase())

    // trailing rather than interleaved, so the pattern repeats across the seam
    expect(kinds).toEqual(['button', 'div', 'button', 'div', 'button', 'div', 'button', 'div'])

    // separators are decoration, not tab stops
    await userEvent.tab()
    await userEvent.keyboard('{ArrowRight}{ArrowRight}')
    expect(screen.getAllByText('item 1')[0]).toHaveFocus()
  })

  it('is a single tab stop that arrows navigate and tab escapes', async () => {
    renderCarousel()

    await waitIdle()

    await userEvent.tab()
    expect(screen.getByText('before')).toHaveFocus()

    await userEvent.tab()
    expect(document.querySelector('.v-infinite-carousel')).toHaveFocus()

    await userEvent.keyboard('{ArrowRight}')
    expect(screen.getAllByText('item 0')[0]).toHaveFocus()

    // walking past the clip edge pulls the item into view instead of leaving it hidden
    await userEvent.keyboard('{ArrowRight}{ArrowRight}{ArrowRight}')
    const item3 = screen.getAllByText('item 3')[0]
    expect(item3).toHaveFocus()
    expect(isInView(item3)).toBe(true)

    await userEvent.tab({ shift: true })
    expect(screen.getByText('before')).toHaveFocus()

    await userEvent.tab()
    await userEvent.keyboard('{ArrowRight}')
    await userEvent.tab()
    expect(screen.getByText('after')).toHaveFocus()
  })

  it('steps by shift-distance on arrows when no item is focusable', async () => {
    render(() => (
      <div style="width: 200px">
        <VInfiniteCarousel mask={ false } shiftDistance="50%" paused>
          { Array.from({ length: 10 }, (_, i) => (
            <span style="width: 100px">{ `item ${i}` }</span>
          ))}
        </VInfiniteCarousel>
      </div>
    ))

    await waitIdle()

    const before = screen.getAllByText('item 0')[0].getBoundingClientRect().x

    await userEvent.tab()
    await userEvent.keyboard('{ArrowRight}')

    expect(document.querySelector('.v-infinite-carousel')).toHaveFocus()
    expect(screen.getAllByText('item 0')[0].getBoundingClientRect().x).toBeCloseTo(before - 100, 0)
  })

  it('picks up a new speed without waiting for a resize', async () => {
    const speed = shallowRef(100)

    render(() => (
      <div style="width: 200px">
        <VInfiniteCarousel mask={ false } speed={ speed.value }>
          { Array.from({ length: 10 }, (_, i) => (
            <button style="width: 100px">{ `item ${i}` }</button>
          ))}
        </VInfiniteCarousel>
      </div>
    ))

    await waitIdle()

    const duration = () => document.querySelector('.v-infinite-carousel__track')!
      .getAnimations()[0].effect!.getTiming().duration

    // one loop is 10 × 100px plus 10 × 32px gaps
    expect(duration()).toBe(13200)

    speed.value = 200
    await waitIdle()

    expect(duration()).toBe(6600)
  })

  describe('with motion', () => {
    beforeEach(() => commands.setReduceMotionDisabled())

    afterEach(() => commands.setReduceMotionEnabled())

    it('pauses in place and keeps its position through a rebuild', async () => {
      const paused = shallowRef(false)
      const speed = shallowRef(100)
      const reverse = shallowRef(false)

      render(() => (
        <div style="width: 200px">
          <VInfiniteCarousel mask={ false } paused={ paused.value } speed={ speed.value } reverse={ reverse.value }>
            { Array.from({ length: 10 }, (_, i) => (
              <span style="width: 100px">{ `item ${i}` }</span>
            ))}
          </VInfiniteCarousel>
        </div>
      ))

      await waitIdle()

      const track = document.querySelector('.v-infinite-carousel__track')!
      const animation = track.getAnimations()[0]
      const position = () => screen.getAllByText('item 0')[0].getBoundingClientRect().x

      expect(animation.playState).toBe('running')

      paused.value = true
      await waitIdle()

      expect(track.getAnimations()[0]).toBe(animation)
      expect(animation.playState).toBe('paused')

      // a third of a lap, where reading it against the new duration or direction lands elsewhere
      animation.currentTime = 4400
      const before = position()

      speed.value = 200
      await waitIdle()
      expect(position()).toBeCloseTo(before, 0)

      reverse.value = true
      await waitIdle()
      expect(position()).toBeCloseTo(before, 0)

      paused.value = false
      await waitIdle()
      expect(track.getAnimations()[0].playState).toBe('running')
    })
  })

  it('scrubs the loop on drag', async () => {
    renderCarousel({ draggable: true })

    await waitIdle()

    const before = screen.getAllByText('item 1')[0].getBoundingClientRect().x

    await dragAcross()

    expect(screen.getAllByText('item 1')[0].getBoundingClientRect().x).toBeLessThan(before)
  })

  it('only counts keyboard focus as a reason to pause', async () => {
    renderCarousel()

    await waitIdle()

    const focusVisible = () => document.querySelector('.v-infinite-carousel :focus-visible')

    await userEvent.tab()
    await userEvent.tab()
    await userEvent.keyboard('{ArrowRight}')
    expect(screen.getAllByText('item 0')[0]).toHaveFocus()
    expect(focusVisible()).not.toBeNull()

    await userEvent.click(screen.getAllByText('item 1')[0])
    expect(screen.getAllByText('item 1')[0]).toHaveFocus()
    expect(focusVisible()).toBeNull()

    await userEvent.keyboard('{ArrowRight}')
    expect(focusVisible()).not.toBeNull()
  })

  it.each([
    [true, 'paused'],
    [undefined, 'running'],
  ])('pauseOnHover: %s leaves the loop %s under the pointer', async (pauseOnHover, playState) => {
    render(() => (
      <div style="width: 200px">
        <VInfiniteCarousel mask={ false } pauseOnHover={ pauseOnHover }>
          { Array.from({ length: 10 }, (_, i) => (
            <span style="width: 100px">{ `item ${i}` }</span>
          ))}
        </VInfiniteCarousel>
      </div>
    ))

    await waitIdle()

    const animation = document.querySelector('.v-infinite-carousel__track')!.getAnimations()[0]
    animation.play()

    await userEvent.hover(document.querySelector('.v-infinite-carousel')!)

    expect(animation.playState).toBe(playState)
  })

  it('ignores drag when draggable is false', async () => {
    renderCarousel({ draggable: false })

    await waitIdle()

    const before = screen.getAllByText('item 1')[0].getBoundingClientRect().x

    await dragAcross()

    expect(screen.getAllByText('item 1')[0].getBoundingClientRect().x).toBe(before)
  })

  it('holds still while paused but stays seekable', async () => {
    renderCarousel({ paused: true, draggable: true })

    await waitIdle()

    const animation = document.querySelector('.v-infinite-carousel__track')!.getAnimations()[0]
    expect(animation.playState).toBe('paused')

    const before = screen.getAllByText('item 1')[0].getBoundingClientRect().x

    await dragAcross()

    expect(screen.getAllByText('item 1')[0].getBoundingClientRect().x).toBeLessThan(before)
    expect(animation.playState).toBe('paused')
  })

  it('does not stretch a flex parent past its share', async () => {
    render(() => (
      <div style="display: flex; width: 600px">
        <div style="width: 200px">sibling</div>
        <div style="flex-grow: 1">
          <VInfiniteCarousel mask={ false }>
            { Array.from({ length: 10 }, (_, i) => (
              <button style="width: 100px">{ `item ${i}` }</button>
            ))}
          </VInfiniteCarousel>
        </div>
      </div>
    ))

    await waitIdle()

    expect(document.querySelector('.v-infinite-carousel')!.getBoundingClientRect().width).toBe(400)
  })

  it('steps by shift-distance when arrows are clicked', async () => {
    render(() => (
      <div style="width: 200px">
        <VInfiniteCarousel mask={ false } shiftDistance="50%" showArrows paused>
          { Array.from({ length: 10 }, (_, i) => (
            <button style="width: 100px">{ `item ${i}` }</button>
          ))}
        </VInfiniteCarousel>
      </div>
    ))

    await waitIdle()

    const before = screen.getAllByText('item 0')[0].getBoundingClientRect().x

    await userEvent.click(document.querySelector('.v-infinite-carousel__next')!)

    // 50% of the 200px viewport
    await expect.poll(() => screen.getAllByText('item 0')[0].getBoundingClientRect().x)
      .toBeCloseTo(before - 100, 0)
  })

  it('keeps the loop running through an arrow step', async () => {
    renderCarousel({ showArrows: true, shiftDistance: 50 })

    await waitIdle()

    const track = document.querySelector('.v-infinite-carousel__track')!
    const animation = track.getAnimations()[0]
    animation.pause()

    await userEvent.click(document.querySelector('.v-infinite-carousel__next')!)

    // a focused arrow would keep the loop paused until the user clicks away
    expect(document.querySelector('.v-infinite-carousel')).not.toHaveFocus()

    animation.play()

    await userEvent.click(document.querySelector('.v-infinite-carousel__next')!)

    expect(animation.playState).toBe('running')

    // steps seek within the animation and leave the offset reserved for the leading copy alone
    expect(getComputedStyle(track).translate).toBe('-1320px')
  })

  it('leaves the faded edges out of the visible area', async () => {
    render(() => (
      <div style="width: 200px">
        <VInfiniteCarousel mask={{ size: 40 }} shiftDistance="50%" showArrows paused>
          { Array.from({ length: 10 }, (_, i) => (
            <button style="width: 100px">{ `item ${i}` }</button>
          ))}
        </VInfiniteCarousel>
      </div>
    ))

    await waitIdle()

    const before = screen.getAllByText('item 0')[0].getBoundingClientRect().x

    await userEvent.click(document.querySelector('.v-infinite-carousel__next')!)

    // 50% of the 120px left between two 40px fades
    await expect.poll(() => screen.getAllByText('item 0')[0].getBoundingClientRect().x)
      .toBeCloseTo(before - 60, 0)
  })

  it('resolves shift-distance in any css length unit', async () => {
    render(() => (
      <div style="width: 200px">
        <VInfiniteCarousel mask={ false } shiftDistance="4rem" showArrows paused>
          { Array.from({ length: 10 }, (_, i) => (
            <button style="width: 100px">{ `item ${i}` }</button>
          ))}
        </VInfiniteCarousel>
      </div>
    ))

    await waitIdle()

    const before = screen.getAllByText('item 0')[0].getBoundingClientRect().x

    await userEvent.click(document.querySelector('.v-infinite-carousel__next')!)

    expect(screen.getAllByText('item 0')[0].getBoundingClientRect().x).toBeCloseTo(before - 64, 0)
  })

  it('runs the loop the other way when reversed', async () => {
    renderCarousel({ reverse: true })

    await waitIdle()

    document.querySelector('.v-infinite-carousel__track')!.getAnimations()[0].play()

    // reversed, the loop rests at the end of its cycle, so sample past the rollover
    await waitAnimationFrame()
    await waitAnimationFrame()
    const before = screen.getAllByText('item 1')[0].getBoundingClientRect().x

    await expect.poll(() => screen.getAllByText('item 1')[0].getBoundingClientRect().x)
      .toBeGreaterThan(before)
  })

  it('reaches every item when reversed and repeated', async () => {
    render(() => (
      <div style="width: 700px">
        <VInfiniteCarousel mask={ false } reverse>
          {['only', 'three', 'chips'].map(label => (
            <button style="width: 70px">{ label }</button>
          ))}
        </VInfiniteCarousel>
      </div>
    ))

    await waitIdle()

    await userEvent.tab()

    for (const label of ['only', 'three', 'chips']) {
      await userEvent.keyboard('{ArrowRight}')
      expect(screen.getAllByText(label)[0]).toHaveFocus()
    }
  })

  it('clips and navigates on the block axis when vertical', async () => {
    render(() => (
      <div style="height: 200px">
        <VInfiniteCarousel mask={ false } direction="vertical" paused>
          { Array.from({ length: 10 }, (_, i) => (
            <button style="height: 100px">{ `item ${i}` }</button>
          ))}
        </VInfiniteCarousel>
      </div>
    ))

    await waitIdle()

    const [first] = screen.getAllByText('item 0')
    const [last] = screen.getAllByText('item 9')

    expect(isInView(first)).toBe(true)
    expect(isInView(last)).toBe(false)

    await userEvent.tab()
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}')

    const item2 = screen.getAllByText('item 2')[0]
    expect(item2).toHaveFocus()
    expect(isInView(item2)).toBe(true)
  })
})

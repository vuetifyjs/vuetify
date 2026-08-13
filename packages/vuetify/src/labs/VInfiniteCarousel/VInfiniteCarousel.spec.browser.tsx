// Components
import { VInfiniteCarousel } from '../VInfiniteCarousel'

// Utilities
import { commands, render, screen, userEvent, waitAnimationFrame, waitIdle } from '@test'
import { shallowRef } from 'vue'

function renderCarousel (props: Record<string, any> = {}) {
  return render(() => (
    <div>
      <button>before</button>
      <div style="width: 200px">
        <VInfiniteCarousel mask={ false } autoPlay={{ speed: 2000 }} { ...props }>
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

describe('VInfiniteCarousel', () => {
  it('inerts items clipped by the viewport', async () => {
    renderCarousel()

    await waitIdle()

    const [first] = screen.getAllByText('item 0')
    const [last] = screen.getAllByText('item 9')

    expect(first).not.toHaveAttribute('inert')
    expect(last).toHaveAttribute('inert')

    // the suite runs with reducedMotion: 'reduce', so drive the loop by hand
    // to prove IntersectionObserver keeps up while the track is moving
    const animation = document.querySelector('.v-infinite-carousel__track')!.getAnimations()[0]
    animation.play()

    await expect.poll(() => last.hasAttribute('inert'), { timeout: 2000 }).toBe(false)
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

    // one loop shifts by 132px (100 + a 2rem gap), so the track has to span
    // 800 + 132 to never show a hole
    const groups = () => document.querySelectorAll('.v-infinite-carousel__group').length
    expect(groups()).toBe(8)

    width.value = 400
    await waitIdle()

    expect(groups()).toBe(5)
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
    expect(document.querySelectorAll('.v-infinite-carousel__group')).toHaveLength(9)
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
    expect(item3).not.toHaveAttribute('inert')

    await userEvent.tab({ shift: true })
    expect(screen.getByText('before')).toHaveFocus()

    await userEvent.tab()
    await userEvent.keyboard('{ArrowRight}')
    await userEvent.tab()
    expect(screen.getByText('after')).toHaveFocus()
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

  it('ignores drag when draggable is false', async () => {
    renderCarousel({ draggable: false })

    await waitIdle()

    const before = screen.getAllByText('item 1')[0].getBoundingClientRect().x

    await dragAcross()

    expect(screen.getAllByText('item 1')[0].getBoundingClientRect().x).toBe(before)
  })

  it('holds still without auto-play but stays seekable', async () => {
    renderCarousel({ autoPlay: false, draggable: true })

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
        <VInfiniteCarousel mask={ false } shiftDistance="50%" showArrows>
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

    // clicking an arrow used to focus it, which paused the loop until you clicked away
    expect(document.querySelector('.v-infinite-carousel')).not.toHaveFocus()

    animation.play()

    await userEvent.click(document.querySelector('.v-infinite-carousel__next')!)

    expect(animation.playState).toBe('running')

    // every position is a wrapped clock position, so a step can never expose a
    // gap past the last copy
    expect(getComputedStyle(track).translate).toBe('none')
  })

  it('resolves shift-distance in any css length unit', async () => {
    render(() => (
      <div style="width: 200px">
        <VInfiniteCarousel mask={ false } shiftDistance="4rem" showArrows>
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
    renderCarousel({ autoPlay: { speed: 2000, reverse: true } })

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
        <VInfiniteCarousel mask={ false } autoPlay={{ reverse: true }}>
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
      // IntersectionObserver runs a frame later and can pull `inert` back on
      await waitAnimationFrame()
      expect(screen.getAllByText(label)[0]).toHaveFocus()
    }
  })

  it('clips and navigates on the block axis when vertical', async () => {
    render(() => (
      <div style="height: 200px">
        <VInfiniteCarousel mask={ false } direction="vertical">
          { Array.from({ length: 10 }, (_, i) => (
            <button style="height: 100px">{ `item ${i}` }</button>
          ))}
        </VInfiniteCarousel>
      </div>
    ))

    await waitIdle()

    const [first] = screen.getAllByText('item 0')
    const [last] = screen.getAllByText('item 9')

    expect(first).not.toHaveAttribute('inert')
    expect(last).toHaveAttribute('inert')

    await userEvent.tab()
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}')

    const item2 = screen.getAllByText('item 2')[0]
    expect(item2).toHaveFocus()
    expect(item2).not.toHaveAttribute('inert')
  })
})

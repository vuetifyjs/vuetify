// Components
import { VSlideGroup, VSlideGroupItem } from '..'
import { VLocaleProvider } from '@/components/VLocaleProvider'

// Utilities
import { commands, render, screen, userEvent } from '@test'

// 196px of visible container (300 minus both 52px affixes) fits 2.8 items, so paging by a
// full container lands mid-item and leaves some items clipped on every page.
const ITEM_COUNT = 10
const CONTAINER_SIZE = 196

function renderGroup (props: Record<string, unknown> = {}, rtl = false) {
  render(() => (
    <VLocaleProvider rtl={ rtl }>
      <VSlideGroup showArrows="always" style="width: 300px" { ...props }>
        { Array.from({ length: ITEM_COUNT }, (_, i) => (
          <VSlideGroupItem key={ i } value={ i }>
            <div style="width: 70px; height: 40px">{ i }</div>
          </VSlideGroupItem>
        ))}
      </VSlideGroup>
    </VLocaleProvider>
  ))
}

function container () {
  return screen.getByCSS('.v-slide-group__container')
}

function items () {
  return Array.from(screen.getByCSS('.v-slide-group__content').children as HTMLCollectionOf<HTMLElement>)
}

function fullyVisibleItems () {
  const bounds = container().getBoundingClientRect()

  return items().flatMap((el, i) => {
    const rect = el.getBoundingClientRect()

    return rect.left >= bounds.left - 1 && rect.right <= bounds.right + 1 ? [i] : []
  })
}

// Where the browser can come to rest, straight from scroll-snap-align.
function snapPositions (align: 'start' | 'center' | 'end') {
  return items().map(el => {
    if (align === 'end') return el.offsetLeft + el.offsetWidth - CONTAINER_SIZE
    if (align === 'center') return el.offsetLeft + (el.offsetWidth - CONTAINER_SIZE) / 2

    return el.offsetLeft
  })
}

function isDisabled (affix: 'prev' | 'next') {
  return screen.getByCSS(`.v-slide-group__${affix}`).classList.contains(`v-slide-group__${affix}--disabled`)
}

// Animating and snapping both move the container, so wait for it to hold still rather than for a
// duration. Reduced motion would skip the animation to its end frame, long before goTo finishes.
async function settled () {
  let previous = NaN
  let quiet = 0

  await expect.poll(() => {
    quiet = container().scrollLeft === previous ? quiet + 1 : 0
    previous = container().scrollLeft

    return quiet
  }, { interval: 30, timeout: 2000 }).toBeGreaterThan(3)

  return container().scrollLeft
}

async function ready () {
  await expect.poll(() => isDisabled('next')).toBe(false)
  await settled()
}

async function page (affix: 'prev' | 'next') {
  const seen = new Set(fullyVisibleItems())

  for (let i = 0; i < ITEM_COUNT && !isDisabled(affix); i++) {
    await userEvent.click(screen.getByCSS(`.v-slide-group__${affix}`))
    await settled()
    fullyVisibleItems().forEach(i => seen.add(i))
  }

  return seen
}

describe('VSlideGroup', () => {
  beforeEach(() => commands.setReduceMotionDisabled())

  afterEach(() => commands.setReduceMotionEnabled())

  it.each([false, true])('should show every item in full while paging with scroll-snap (rtl: %s)', async rtl => {
    renderGroup({ scrollSnap: 'start' }, rtl)
    await ready()

    await expect(page('next')).resolves.toHaveLength(ITEM_COUNT)
    await expect(page('prev')).resolves.toHaveLength(ITEM_COUNT)
  })

  it.each(['start', 'center', 'end'] as const)('should rest on a snap position when selecting with scroll-snap %s', async align => {
    render(() => (
      <VSlideGroup showArrows="always" scrollSnap={ align } style="width: 300px">
        { Array.from({ length: ITEM_COUNT }, (_, i) => (
          <VSlideGroupItem key={ i } value={ i }>
            { ({ toggle }: any) => (
              <div data-testid={ `item-${i}` } style="width: 70px; height: 40px" onClick={ toggle }>{ i }</div>
            )}
          </VSlideGroupItem>
        ))}
      </VSlideGroup>
    ))
    await ready()

    // Item 2 straddles the right edge of the container, so selecting it has to scroll.
    await userEvent.click(screen.getByTestId('item-2'))
    const landed = await settled()

    // Landing anywhere else would leave the browser a snap position to pull the container to.
    expect(snapPositions(align).map(Math.round)).toContain(Math.round(landed))
    expect(fullyVisibleItems()).toContain(2)
  })

  it('should disable each affix at its end of the group', async () => {
    renderGroup()
    await ready()

    expect(isDisabled('prev')).toBe(true)

    await page('next')

    expect(isDisabled('next')).toBe(true)
    expect(isDisabled('prev')).toBe(false)
  })

  it('should skip disabled items when moving focus', async () => {
    render(() => (
      <VSlideGroup>
        { Array.from({ length: 5 }, (_, i) => (
          <VSlideGroupItem key={ i } value={ i }>
            <button data-testid={ `item-${i}` } disabled={ i === 2 || i === 3 }>{ i }</button>
          </VSlideGroupItem>
        ))}
      </VSlideGroup>
    ))

    screen.getByTestId('item-0').focus()
    await userEvent.keyboard('{ArrowRight}{ArrowRight}')

    expect(screen.getByTestId('item-4')).toHaveFocus()

    await userEvent.keyboard('{ArrowLeft}')

    expect(screen.getByTestId('item-1')).toHaveFocus()
  })

  it('should page by the visible area in rtl without scroll-snap', async () => {
    renderGroup({}, true)
    await ready()

    await userEvent.click(screen.getByCSS('.v-slide-group__next'))

    // Rtl scrolls away from zero, one container width per click.
    await expect(settled()).resolves.toBe(-CONTAINER_SIZE)
  })

  it.each(['50%', '150px', 98])('should page by scroll-distance %s', async distance => {
    renderGroup({ scrollDistance: distance })
    await ready()

    await userEvent.click(screen.getByCSS('.v-slide-group__next'))

    // Half the 196px container, or the pixel count with and without a unit.
    await expect(settled()).resolves.toBe(distance === '150px' ? 150 : 98)
  })
})

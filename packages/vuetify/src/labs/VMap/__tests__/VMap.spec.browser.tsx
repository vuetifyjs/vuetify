// Components
import { VMap } from '../VMap'

// Utilities
import { commands, render, screen, userEvent } from '@test'
import { nextTick, shallowRef } from 'vue'
import { MAP, PLAINS } from './fixtures'

function viewport () {
  return screen.getByCSS('.v-map__svg') as unknown as SVGSVGElement
}

async function whenLoaded () {
  await expect.poll(() => screen.queryByCSS('.v-map__svg')).toBeTruthy()
}

function point (element: Element, type: string, id: number, x: number, y: number) {
  element.dispatchEvent(new PointerEvent(type, { pointerId: id, pointerType: 'touch', clientX: x, clientY: y, bubbles: true }))
}

describe('VMap', () => {
  it('should select regions, preserve their colors, and toggle selection', async () => {
    const selected = shallowRef<string | string[] | null>(null)
    const multiple = shallowRef(false)
    render(() => <VMap selectable svg={ MAP } v-model={ selected.value } multiple={ multiple.value } hideTooltip />)
    await whenLoaded()
    const west = screen.getByRole('button', { name: 'West' })
    const east = screen.getByRole('button', { name: 'East' })
    expect(west).toHaveAttribute('fill', '#558899')
    await userEvent.click(west)
    expect(selected.value).toBe('west')
    expect(west).toHaveAttribute('aria-pressed', 'true')
    await userEvent.click(west)
    expect(selected.value).toBeNull()
    expect(west).toHaveAttribute('fill', '#558899')

    multiple.value = true
    selected.value = []
    await nextTick()
    await userEvent.click(west)
    await userEvent.click(east)
    expect(selected.value).toEqual(['west', 'east'])
    await userEvent.click(west)
    expect(selected.value).toEqual(['east'])
  })

  it('should navigate regions with one tab stop and preserve browser shortcuts', async () => {
    const zoom = shallowRef(1)
    const zoomOnFocus = shallowRef(false)
    render(() => <VMap selectable svg={ MAP } v-model:zoom={ zoom.value } zoomOnFocus={ zoomOnFocus.value } hideTooltip />)
    await whenLoaded()
    const west = screen.getByRole('button', { name: 'West' })
    const east = screen.getByRole('button', { name: 'East' })
    const lock = await commands.getLock()
    try {
      west.focus()
      await userEvent.keyboard('{Enter}')
      expect(west).toHaveAttribute('aria-pressed', 'true')
      await userEvent.keyboard(' ')
      expect(west).toHaveAttribute('aria-pressed', 'false')
      expect(east).toHaveAttribute('tabindex', '-1')
      await userEvent.keyboard('{ArrowRight}')
      expect(east).toHaveFocus()
      expect(west).toHaveAttribute('tabindex', '-1')
      expect(east).toHaveAttribute('tabindex', '0')
      expect(zoom.value).toBe(1)
      zoomOnFocus.value = true
      await nextTick()
      await userEvent.keyboard('{ArrowLeft}')
      await expect.poll(() => zoom.value).toBeGreaterThan(1)
      await userEvent.keyboard('{ArrowRight}')
      const shortcut = new KeyboardEvent('keydown', { key: 'ArrowLeft', altKey: true, bubbles: true, cancelable: true })
      east.dispatchEvent(shortcut)
      expect(shortcut.defaultPrevented).toBe(false)
      expect(east).toHaveFocus()
    } finally {
      await commands.releaseLock(lock)
    }
  })

  it('should prefer regions ahead over touching ones aside, and fall back to a wider cone', async () => {
    render(() => <VMap selectable svg={ PLAINS } hideTooltip />)
    await whenLoaded()
    const nebraska = screen.getByRole('button', { name: 'Nebraska' })
    const lock = await commands.getLock()
    try {
      nebraska.focus()
      await userEvent.keyboard('{ArrowLeft}')
      expect(screen.getByRole('button', { name: 'Wyoming' })).toHaveFocus()
      nebraska.focus()
      await userEvent.keyboard('{ArrowUp}')
      expect(screen.getByRole('button', { name: 'South Dakota' })).toHaveFocus()
      nebraska.focus()
      await userEvent.keyboard('{ArrowDown}')
      expect(screen.getByRole('button', { name: 'Island' })).toHaveFocus()
    } finally {
      await commands.releaseLock(lock)
    }
  })

  it('should leave page scrolling to the plain wheel without wheel-zoom', async () => {
    render(() => <VMap svg={ MAP } hideTooltip />)
    await whenLoaded()
    const scroll = new WheelEvent('wheel', { deltaY: -100, cancelable: true, bubbles: true })
    viewport().dispatchEvent(scroll)
    expect(scroll.defaultPrevented).toBe(false)
  })

  it('should pan without selecting a region after a drag', async () => {
    const selected = shallowRef<string | null>(null)
    render(() => <VMap selectable svg={ MAP } zoom={ 2 } v-model={ selected.value } width={ 600 } height={ 300 } hideTooltip />)
    await whenLoaded()
    const svg = viewport()
    const before = svg.getAttribute('viewBox')
    const west = screen.getByRole('button', { name: 'West' })
    point(west, 'pointerdown', 1, 250, 100)
    point(svg, 'pointermove', 1, 290, 100)
    point(svg, 'pointerup', 1, 290, 100)
    west.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(svg.getAttribute('viewBox')).not.toBe(before)
    expect(selected.value).toBeNull()

    const panned = svg.getAttribute('viewBox')
    const middle = { pointerId: 2, pointerType: 'mouse', button: 1, bubbles: true, cancelable: true }
    const down = new PointerEvent('pointerdown', { ...middle, clientX: 290, clientY: 100 })
    svg.dispatchEvent(down)
    svg.dispatchEvent(new PointerEvent('pointermove', { ...middle, clientX: 250, clientY: 100 }))
    svg.dispatchEvent(new PointerEvent('pointerup', { ...middle, clientX: 250, clientY: 100 }))
    await nextTick()
    expect(down.defaultPrevented).toBe(true)
    expect(svg.getAttribute('viewBox')).not.toBe(panned)
  })

  it('should keep the selection fixed without selectable and disable all navigation when disabled', async () => {
    const disabled = shallowRef(false)
    const onUpdate = vi.fn()
    const onClick = vi.fn()
    render(() => (
      <VMap
        svg={ MAP }
        modelValue="west"
        onUpdate:modelValue={ onUpdate }
        onClick:region={ onClick }
        disabled={ disabled.value }
        hideTooltip
      />
    ))
    await whenLoaded()
    await userEvent.click(screen.getByRole('button', { name: 'East' }))
    expect(screen.getByRole('button', { name: 'West' })).not.toHaveAttribute('aria-pressed')
    expect(onUpdate).not.toHaveBeenCalled()
    expect(onClick).toHaveBeenCalledTimes(1)
    disabled.value = true
    await nextTick()
    const svg = viewport()
    svg.dispatchEvent(new WheelEvent('wheel', { deltaY: -100, bubbles: true }))
    expect(svg).toHaveAttribute('viewBox', '0 0 400 200')
    expect(screen.getByRole('button', { name: 'West' })).toHaveAttribute('tabindex', '-1')
    expect(screen.getByRole('button', { name: 'East' })).toHaveAttribute('aria-disabled', 'true')
  })

  it('should keep the last selection when mandatory', async () => {
    const selected = shallowRef<string | string[] | null>(null)
    const multiple = shallowRef(false)
    render(() => <VMap selectable svg={ MAP } v-model={ selected.value } multiple={ multiple.value } mandatory hideTooltip />)
    await whenLoaded()
    const west = screen.getByRole('button', { name: 'West' })
    await userEvent.click(west)
    await userEvent.click(west)
    expect(selected.value).toBe('west')
    multiple.value = true
    selected.value = ['west']
    await nextTick()
    const east = screen.getByRole('button', { name: 'East' })
    await userEvent.click(east)
    await userEvent.click(west)
    await userEvent.click(east)
    expect(selected.value).toEqual(['east'])
  })

  it('should report invalid SVG sources', async () => {
    const errors = vi.fn()
    render(() => <VMap svg="invalid" onError={ errors } hideTooltip />)
    await expect.poll(() => screen.queryByRole('alert')).toBeTruthy()
    expect(errors).toHaveBeenCalledWith(expect.any(Error))
  })

  it('should keep the tooltip on click and hide it on escape until another region', async () => {
    render(() => <VMap selectable svg={ MAP } />)
    await whenLoaded()
    const west = screen.getByRole('button', { name: 'West' })
    await userEvent.hover(west)
    await expect.poll(() => screen.queryByRole('tooltip')).toBeVisible()
    await userEvent.click(west)
    await expect.poll(() => screen.queryByRole('tooltip')).toBeVisible()
    await userEvent.keyboard('{Escape}')
    await expect.poll(() => screen.queryByCSS('.v-tooltip .v-overlay__content')).not.toBeVisible()
    await userEvent.hover(screen.getByRole('button', { name: 'East' }))
    await expect.poll(() => screen.queryByRole('tooltip')).toBeVisible()
  })

  it('should merge region data into labels, fills, slots, and events', async () => {
    const onClick = vi.fn()
    const regions = { west: { title: 'Western', color: '#123456', offices: 3 } }
    render(() => (
      <VMap svg={ MAP } regions={ regions } onClick:region={ onClick }>
        {{ tooltip: ({ region }) => <span>{ region.title }: { String(region.offices) } offices</span> }}
      </VMap>
    ))
    await whenLoaded()
    const west = screen.getByRole('button', { name: 'Western' })
    expect(west).toHaveAttribute('fill', '#123456')
    await userEvent.hover(west)
    await expect.poll(() => screen.queryByText('Western: 3 offices')).toBeTruthy()
    expect(west).toHaveAttribute('aria-describedby', screen.getByRole('tooltip').id)
    await userEvent.click(west)
    expect(onClick).toHaveBeenCalledWith(expect.any(MouseEvent), {
      region: expect.objectContaining({ id: 'west', offices: 3 }),
      reveal: expect.any(Function),
    })
  })
})

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
    const selected = shallowRef<string | null>(null)
    render(() => <VMap svg={ MAP } v-model={ selected.value } hideTooltip />)
    await whenLoaded()
    const west = screen.getByRole('button', { name: 'West' })
    expect(west).toHaveAttribute('fill', '#558899')
    await userEvent.click(west)
    expect(selected.value).toBe('west')
    expect(west).toHaveAttribute('aria-pressed', 'true')
    await userEvent.click(west)
    expect(selected.value).toBeNull()
    expect(west).toHaveAttribute('fill', '#558899')
  })

  it('should navigate regions with one tab stop and preserve browser shortcuts', async () => {
    const zoom = shallowRef(1)
    const zoomOnFocus = shallowRef(false)
    render(() => <VMap svg={ MAP } v-model:zoom={ zoom.value } zoomOnFocus={ zoomOnFocus.value } hideTooltip />)
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
    render(() => <VMap svg={ PLAINS } hideTooltip />)
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

  it('should pan with shift and arrow keys without moving focus', async () => {
    render(() => <VMap svg={ MAP } zoom={ 2 } width={ 600 } height={ 300 } hideTooltip />)
    await whenLoaded()
    const svg = viewport()
    const west = screen.getByRole('button', { name: 'West' })
    const lock = await commands.getLock()
    try {
      await userEvent.tab()
      expect(west).toHaveFocus()
      let previous = ''
      await expect.poll(() => {
        const settled = previous === svg.getAttribute('viewBox')
        previous = svg.getAttribute('viewBox')!
        return settled
      }).toBe(true)
      const [x, , width] = previous.split(' ').map(Number)
      await userEvent.keyboard('{Shift>}{ArrowRight}{/Shift}')
      await expect.poll(() => Number(svg.getAttribute('viewBox')!.split(' ')[0])).toBeCloseTo(x + width / 4)
      expect(west).toHaveFocus()
    } finally {
      await commands.releaseLock(lock)
    }
  })

  it('should clamp slot zoom controls and ignore them with disable-zoom', async () => {
    const zoom = shallowRef(1)
    const disableZoom = shallowRef(false)
    render(() => (
      <VMap svg={ MAP } v-model:zoom={ zoom.value } maxZoom={ 1.2 } disableZoom={ disableZoom.value } hideTooltip>
        {{
          default: ({ zoom, zoomIn, setZoom, resetZoom }) => (
            <div>
              <button onClick={ zoomIn } disabled={ zoom >= 1.2 }>Zoom in</button>
              <button onClick={ () => setZoom(5) }>Zoom far</button>
              <button onClick={ resetZoom }>Reset view</button>
            </div>
          ),
        }}
      </VMap>
    ))
    await whenLoaded()
    await userEvent.click(screen.getByRole('button', { name: 'Zoom in' }))
    expect(zoom.value).toBe(1.2)
    expect(screen.getByRole('button', { name: 'Zoom in' })).toBeDisabled()
    await userEvent.click(screen.getByRole('button', { name: 'Reset view' }))
    expect(zoom.value).toBe(1)
    expect(viewport()).toHaveAttribute('viewBox', '0 0 400 200')
    await userEvent.click(screen.getByRole('button', { name: 'Zoom far' }))
    expect(zoom.value).toBe(1.2)
    await userEvent.click(screen.getByRole('button', { name: 'Reset view' }))
    disableZoom.value = true
    await nextTick()
    await userEvent.click(screen.getByRole('button', { name: 'Zoom far' }))
    expect(zoom.value).toBe(1)
  })

  it('should reveal and fit regions by identifier', async () => {
    const map = shallowRef<VMap>()
    const zoom = shallowRef(1)
    render(() => <VMap ref={ map } svg={ MAP } v-model:zoom={ zoom.value } maxZoom={ 4 } hideTooltip />)
    await whenLoaded()
    map.value!.reveal('west', { zoom: true })
    await expect.poll(() => zoom.value).toBeCloseTo(200 / (160 * 1.08))
    expect(document.body).toHaveFocus()
    map.value!.reveal(['west', 'east'], { zoom: true })
    await expect.poll(() => zoom.value).toBeCloseTo(400 / (360 * 1.08))
  })

  it('should zoom around the pointer in a letterboxed container', async () => {
    const wheel = shallowRef(false)
    const zoom = shallowRef(1)
    const zoomStep = shallowRef(0.2)
    render(() => (
      <VMap
        svg={ MAP }
        v-model:zoom={ zoom.value }
        wheelZoom={ wheel.value }
        zoomStep={ zoomStep.value }
        width={ 600 }
        height={ 400 }
        hideTooltip
      />
    ))
    await whenLoaded()
    const svg = viewport()
    const client = new DOMPoint(100, 100).matrixTransform(svg.getScreenCTM()!)
    const scroll = new WheelEvent('wheel', { deltaY: -100, cancelable: true, bubbles: true })
    svg.dispatchEvent(scroll)
    expect(scroll.defaultPrevented).toBe(false)
    expect(svg).toHaveAttribute('viewBox', '0 0 400 200')
    const pinch = new WheelEvent('wheel', { clientX: client.x, clientY: client.y, deltaY: -10, ctrlKey: true, cancelable: true })
    svg.dispatchEvent(pinch)
    expect(pinch.defaultPrevented).toBe(true)
    expect(zoom.value).toBeCloseTo(1.2 ** 0.1)
    wheel.value = true
    await nextTick()
    svg.dispatchEvent(new WheelEvent('wheel', { clientX: client.x, clientY: client.y, deltaY: -100, cancelable: true, bubbles: true }))
    await nextTick()
    expect(zoom.value).toBeCloseTo(1.2 ** 1.1)
    const after = new DOMPoint(100, 100).matrixTransform(svg.getScreenCTM()!)
    expect(after.x).toBeCloseTo(client.x)
    expect(after.y).toBeCloseTo(client.y)
    zoomStep.value = 0.4
    await nextTick()
    const beforePinch = zoom.value
    point(svg, 'pointerdown', 1, 200, 100)
    point(svg, 'pointerdown', 2, 400, 100)
    point(svg, 'pointermove', 2, 440, 100)
    point(svg, 'pointerup', 1, 200, 100)
    point(svg, 'pointerup', 2, 440, 100)
    await nextTick()
    expect(zoom.value).toBeCloseTo(beforePinch * 1.4)
  })

  it('should pan without selecting a region after a drag', async () => {
    const selected = shallowRef<string | null>(null)
    render(() => <VMap svg={ MAP } zoom={ 2 } v-model={ selected.value } width={ 600 } height={ 300 } hideTooltip />)
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

  it('should not pan with disable-pan', async () => {
    render(() => <VMap svg={ MAP } zoom={ 2 } disablePan width={ 600 } height={ 300 } hideTooltip />)
    await whenLoaded()
    const svg = viewport()
    const before = svg.getAttribute('viewBox')
    point(svg, 'pointerdown', 1, 250, 100)
    point(svg, 'pointermove', 1, 290, 100)
    point(svg, 'pointerup', 1, 290, 100)
    await nextTick()
    expect(svg.getAttribute('viewBox')).toBe(before)
  })

  it('should keep readonly selection fixed and disable all navigation when disabled', async () => {
    const disabled = shallowRef(false)
    const onUpdate = vi.fn()
    const onClick = vi.fn()
    render(() => (
      <VMap
        svg={ MAP }
        modelValue="west"
        onUpdate:modelValue={ onUpdate }
        onClick:region={ onClick }
        readonly
        disabled={ disabled.value }
        hideTooltip
      />
    ))
    await whenLoaded()
    await userEvent.click(screen.getByRole('img', { name: 'East' }))
    expect(onUpdate).not.toHaveBeenCalled()
    expect(onClick).toHaveBeenCalledTimes(1)
    disabled.value = true
    await nextTick()
    const svg = viewport()
    svg.dispatchEvent(new WheelEvent('wheel', { deltaY: -100, bubbles: true }))
    expect(svg).toHaveAttribute('viewBox', '0 0 400 200')
    expect(screen.getByRole('img', { name: 'West' })).toHaveAttribute('tabindex', '-1')
    expect(screen.getByRole('img', { name: 'East' })).toHaveAttribute('aria-disabled', 'true')
  })

  it('should draw selection, focus and hover above every region', async () => {
    render(() => <VMap svg={ MAP } modelValue="west" hideTooltip />)
    await whenLoaded()
    const east = screen.getByRole('button', { name: 'East' })
    const lock = await commands.getLock()
    try {
      await userEvent.tab()
      await userEvent.keyboard('{ArrowRight}')
      expect(east).toHaveFocus()
    } finally {
      await commands.releaseLock(lock)
    }
    await userEvent.hover(screen.getByRole('button', { name: 'West' }))
    const layers = ['outline', 'focus', 'overlay'].map(mode => screen.getByCSS(`.v-map__region-${mode}`))
    expect(layers.every(layer => layer.closest('[aria-hidden="true"]'))).toBe(true)
    expect(layers.every(layer => east.compareDocumentPosition(layer) & Node.DOCUMENT_POSITION_FOLLOWING)).toBe(true)
    expect(layers[0].compareDocumentPosition(layers[1]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(layers[1].compareDocumentPosition(layers[2]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(screen.getAllByCSS('[data-v-map-region]')).toHaveLength(2)
  })

  it('should select and deselect multiple regions independently', async () => {
    const selected = shallowRef<string[]>([])
    render(() => <VMap svg={ MAP } v-model={ selected.value } multiple hideTooltip />)
    await whenLoaded()
    await userEvent.click(screen.getByRole('button', { name: 'West' }))
    await userEvent.click(screen.getByRole('button', { name: 'East' }))
    expect(selected.value).toEqual(['west', 'east'])
    await userEvent.click(screen.getByRole('button', { name: 'West' }))
    expect(selected.value).toEqual(['east'])
  })

  it('should keep the last selection when mandatory', async () => {
    const selected = shallowRef<string | string[] | null>(null)
    const multiple = shallowRef(false)
    render(() => <VMap svg={ MAP } v-model={ selected.value } multiple={ multiple.value } mandatory hideTooltip />)
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

  it('should show external highlights alongside its own hover and report hover', async () => {
    const onUpdate = vi.fn()
    render(() => <VMap svg={ MAP } highlighted="east" onUpdate:highlighted={ onUpdate } hideTooltip />)
    await whenLoaded()
    expect(screen.getAllByCSS('.v-map__region-overlay')).toHaveLength(1)
    await userEvent.hover(screen.getByRole('button', { name: 'West' }))
    expect(onUpdate).toHaveBeenLastCalledWith('west')
    await expect.poll(() => screen.queryAllByCSS('.v-map__region-overlay')).toHaveLength(2)
  })

  it('should report invalid SVG sources', async () => {
    const errors = vi.fn()
    render(() => <VMap svg="invalid" onError={ errors } hideTooltip />)
    await expect.poll(() => screen.queryByRole('alert')).toBeTruthy()
    expect(errors).toHaveBeenCalledWith(expect.any(Error))
  })

  it('should keep the tooltip on click and hide it on escape until another region', async () => {
    render(() => <VMap svg={ MAP } />)
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
    expect(onClick).toHaveBeenCalledWith(expect.any(MouseEvent), { region: expect.objectContaining({ id: 'west', offices: 3 }) })
  })

  it('should drop the tooltip description with hide-tooltip', async () => {
    render(() => <VMap svg={ MAP } hideTooltip />)
    await whenLoaded()
    const west = screen.getByRole('button', { name: 'West' })
    await userEvent.hover(west)
    expect(west).not.toHaveAttribute('aria-describedby')
    expect(screen.queryByCSS('.v-tooltip')).toBeNull()
  })

  it('should not re-render the map for pointer moves within one region', async () => {
    let updates = 0
    render(() => <VMap svg={ MAP } onVnodeUpdated={ () => updates++ } />)
    await whenLoaded()
    const west = screen.getByRole('button', { name: 'West' })
    point(west, 'pointermove', 1, 100, 100)
    await expect.poll(() => screen.queryByRole('tooltip')).toBeVisible()
    updates = 0
    point(west, 'pointermove', 1, 110, 100)
    point(west, 'pointermove', 1, 120, 100)
    await nextTick()
    expect(updates).toBe(0)
  })
})

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
    render(() => <VMap svg={ MAP } v-model={ selected.value } tooltip={ false } />)
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
    render(() => <VMap svg={ MAP } v-model:zoom={ zoom.value } zoomOnFocus={ zoomOnFocus.value } tooltip={ false } />)
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
    render(() => <VMap svg={ PLAINS } tooltip={ false } />)
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
    render(() => <VMap svg={ MAP } zoom={ 2 } width={ 600 } height={ 300 } tooltip={ false } />)
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

  it('should expose custom controls outside SVG and clamp zoom', async () => {
    const zoom = shallowRef(1)
    render(() => (
      <VMap svg={ MAP } v-model:zoom={ zoom.value } maxZoom={ 1.2 } tooltip={ false }>
        {{
          default: ({ zoom, zoomIn, reset }) => (
            <div>
              <button onClick={ zoomIn } disabled={ zoom.value >= 1.2 }>Zoom in</button>
              <button onClick={ reset }>Reset view</button>
            </div>
          ),
          map: () => <circle aria-label="Office" cx="100" cy="100" r="5" />,
        }}
      </VMap>
    ))
    await whenLoaded()
    expect(screen.getByRole('button', { name: 'Zoom in' }).closest('svg')).toBeNull()
    expect(viewport().querySelector('circle')).toHaveAttribute('aria-label', 'Office')
    await userEvent.click(screen.getByRole('button', { name: 'Zoom in' }))
    expect(zoom.value).toBe(1.2)
    expect(screen.getByRole('button', { name: 'Zoom in' })).toBeDisabled()
    await userEvent.click(screen.getByRole('button', { name: 'Reset view' }))
    expect(zoom.value).toBe(1)
    expect(viewport()).toHaveAttribute('viewBox', '0 0 400 200')
  })

  it('should reveal and fit regions by identifier', async () => {
    const map = shallowRef<VMap>()
    const zoom = shallowRef(1)
    render(() => <VMap ref={ map } svg={ MAP } v-model:zoom={ zoom.value } maxZoom={ 4 } tooltip={ false } />)
    await whenLoaded()
    map.value!.reveal('west', { zoom: true })
    await expect.poll(() => zoom.value).toBeCloseTo(200 / (160 * 1.08))
    expect(viewport().contains(document.activeElement)).toBe(false)
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
        wheel={ wheel.value }
        zoomStep={ zoomStep.value }
        width={ 600 }
        height={ 400 }
        tooltip={ false }
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
    render(() => <VMap svg={ MAP } zoom={ 2 } v-model={ selected.value } width={ 600 } height={ 300 } tooltip={ false } />)
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

  it('should keep readonly selection fixed and disable all navigation when disabled', async () => {
    const disabled = shallowRef(false)
    render(() => <VMap svg={ MAP } modelValue="west" readonly disabled={ disabled.value } tooltip={ false } />)
    await whenLoaded()
    await userEvent.click(screen.getByRole('img', { name: 'East' }))
    expect(screen.getByRole('img', { name: 'West' })).toHaveClass('v-map__region--selected')
    disabled.value = true
    await nextTick()
    const svg = viewport()
    svg.dispatchEvent(new WheelEvent('wheel', { deltaY: -100, bubbles: true }))
    expect(svg).toHaveAttribute('viewBox', '0 0 400 200')
    expect(screen.getByRole('img', { name: 'West' })).toHaveAttribute('tabindex', '-1')
    expect(screen.getByRole('img', { name: 'East' })).toHaveAttribute('aria-disabled', 'true')
  })

  it('should draw selection, focus and hover above every region', async () => {
    render(() => <VMap svg={ MAP } modelValue="west" tooltip={ false } />)
    await whenLoaded()
    const svg = viewport()
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
    const layers = ['outline', 'focus', 'overlay'].map(mode => svg.querySelector(`.v-map__region-${mode}`)!)
    expect(layers.every(layer => layer.closest('[aria-hidden="true"]'))).toBe(true)
    expect(layers.every(layer => east.compareDocumentPosition(layer) & Node.DOCUMENT_POSITION_FOLLOWING)).toBe(true)
    expect(layers[0].compareDocumentPosition(layers[1]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(layers[1].compareDocumentPosition(layers[2]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(svg.querySelectorAll('[data-v-map-region]')).toHaveLength(2)
  })

  it('should select and deselect multiple regions independently', async () => {
    const selected = shallowRef<string[]>([])
    render(() => <VMap svg={ MAP } v-model={ selected.value } multiple tooltip={ false } />)
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
    render(() => <VMap svg={ MAP } v-model={ selected.value } multiple={ multiple.value } mandatory tooltip={ false } />)
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
    render(() => <VMap svg={ MAP } highlighted="east" onUpdate:highlighted={ onUpdate } tooltip={ false } />)
    await whenLoaded()
    const svg = viewport()
    expect(svg.querySelectorAll('.v-map__region-overlay')).toHaveLength(1)
    await userEvent.hover(screen.getByRole('button', { name: 'West' }))
    expect(onUpdate).toHaveBeenLastCalledWith('west')
    await expect.poll(() => svg.querySelectorAll('.v-map__region-overlay').length).toBe(2)
  })

  it('should report invalid SVG sources', async () => {
    const errors = vi.fn()
    render(() => <VMap svg="invalid" onError={ errors } tooltip={ false } />)
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

  it('should render custom region tooltips', async () => {
    render(() => (
      <VMap svg={ MAP }>
        {{ tooltip: ({ title }) => <span>Region: { title }</span> }}
      </VMap>
    ))
    await whenLoaded()
    await userEvent.hover(screen.getByRole('button', { name: 'West' }))
    await expect.poll(() => screen.queryByText('Region: West')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'West' })).toHaveAttribute('aria-describedby', screen.getByRole('tooltip').id)
  })
})

// Components
import { VMap } from '../VMap'

// Utilities
import { commands, render, screen, userEvent } from '@test'
import { nextTick, shallowRef } from 'vue'
import { MAP } from './fixtures'

function viewport () {
  return screen.getByRole('group', { name: 'Map' }) as unknown as SVGSVGElement
}

async function whenLoaded () {
  await expect.poll(() => screen.queryByRole('group', { name: 'Map' })).toBeTruthy()
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
    wheel.value = true
    await nextTick()
    svg.dispatchEvent(new WheelEvent('wheel', { clientX: client.x, clientY: client.y, deltaY: -100, cancelable: true, bubbles: true }))
    await nextTick()
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

  it('should report invalid SVG sources', async () => {
    const errors = vi.fn()
    render(() => <VMap svg="invalid" onError={ errors } tooltip={ false } />)
    await expect.poll(() => screen.queryByRole('alert')).toBeTruthy()
    expect(errors).toHaveBeenCalledWith(expect.any(Error))
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

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
  afterEach(() => {
    if (vi.isMockFunction(window.fetch)) vi.mocked(window.fetch).mockRestore()
  })

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

  it('should support keyboard selection and zoom controls', async () => {
    render(() => <VMap svg={ MAP } maxZoom={ 2 } tooltip={ false } />)
    await whenLoaded()
    const west = screen.getByRole('button', { name: 'West' })
    const lock = await commands.getLock()
    try {
      west.focus()
      await userEvent.keyboard('{Enter}')
      expect(west).toHaveAttribute('aria-pressed', 'true')
      await userEvent.keyboard(' ')
      expect(west).toHaveAttribute('aria-pressed', 'false')
      viewport().focus()
      await userEvent.keyboard('+')
      expect(viewport().getAttribute('viewBox')).not.toBe('0 0 400 200')
      await userEvent.keyboard('{Home}')
      expect(viewport()).toHaveAttribute('viewBox', '0 0 400 200')
    } finally {
      await commands.releaseLock(lock)
    }
  })

  it('should clamp zoom and restore the full map with reset', async () => {
    const zoom = shallowRef(1)
    render(() => <VMap svg={ MAP } v-model:zoom={ zoom.value } maxZoom={ 1.2 } tooltip={ false } />)
    await whenLoaded()
    await userEvent.click(screen.getByRole('button', { name: 'Zoom in' }))
    expect(zoom.value).toBe(1.2)
    expect(screen.getByRole('button', { name: 'Zoom in' })).toBeDisabled()
    await userEvent.click(screen.getByRole('button', { name: 'Reset view' }))
    expect(zoom.value).toBe(1)
    expect(viewport()).toHaveAttribute('viewBox', '0 0 400 200')
  })

  it('should zoom around the pointer in a letterboxed container', async () => {
    render(() => <VMap svg={ MAP } width={ 600 } height={ 400 } tooltip={ false } />)
    await whenLoaded()
    const svg = viewport()
    const client = new DOMPoint(100, 100).matrixTransform(svg.getScreenCTM()!)
    svg.dispatchEvent(new WheelEvent('wheel', { clientX: client.x, clientY: client.y, deltaY: -100, cancelable: true, bubbles: true }))
    await nextTick()
    const after = new DOMPoint(100, 100).matrixTransform(svg.getScreenCTM()!)
    expect(after.x).toBeCloseTo(client.x)
    expect(after.y).toBeCloseTo(client.y)
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
    expect(svg).toHaveAttribute('tabindex', '-1')
    expect(screen.getByRole('button', { name: 'Zoom in' })).toBeDisabled()
  })

  it('should load a local SVG source', async () => {
    const request = vi.spyOn(window, 'fetch').mockResolvedValue(new Response(MAP))
    render(() => <VMap src="/maps/regions.svg" tooltip={ false } />)
    await whenLoaded()
    expect(request.mock.calls[0][0]).toBe('/maps/regions.svg')
  })

  it('should report loading failures', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValue(new Response('', { status: 404 }))
    const errors = vi.fn()
    render(() => <VMap src="/maps/missing.svg" onError={ errors } tooltip={ false } />)
    await expect.poll(() => screen.queryByRole('alert')).toBeTruthy()
    expect(errors).toHaveBeenCalledWith(expect.objectContaining({ message: 'Unable to load map: HTTP 404' }))
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
  })
})

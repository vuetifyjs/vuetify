// Utilities
import { getElementBox } from '../box'

describe('getElementBox', () => {
  const zoomDescriptor = Object.getOwnPropertyDescriptor(document.body, 'currentCSSZoom')
  let restoreDimensions: () => void

  beforeEach(() => {
    const width = vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(1200)
    const height = vi.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(800)
    restoreDimensions = () => {
      width.mockRestore()
      height.mockRestore()
    }
    vi.stubGlobal('visualViewport', {
      width: 600,
      height: 400,
      scale: 1,
      offsetLeft: 0,
      offsetTop: 0,
    })
  })

  afterEach(() => {
    restoreDimensions()
    vi.unstubAllGlobals()
    if (zoomDescriptor) {
      Object.defineProperty(document.body, 'currentCSSZoom', zoomDescriptor)
    } else {
      Reflect.deleteProperty(document.body, 'currentCSSZoom')
    }
  })

  it.each([
    [0.8, 1500, 1000],
    [1, 1200, 800],
    [1.25, 960, 640],
    [undefined, 1200, 800],
  ])('should normalize viewport dimensions at CSS zoom %s', (zoom, width, height) => {
    Object.defineProperty(document.body, 'currentCSSZoom', { configurable: true, value: zoom })

    expect(getElementBox(document.documentElement)).toEqual({ x: 0, y: 0, width, height })
  })

  it('should retain layout viewport dimensions during pinch zoom', () => {
    vi.stubGlobal('visualViewport', {
      width: 600,
      height: 400,
      scale: 2,
      offsetLeft: 100,
      offsetTop: 50,
    })

    expect(getElementBox(document.documentElement)).toEqual({ x: 0, y: 0, width: 1200, height: 800 })
  })
})

// Utilities
import { getElementBox } from '../box'

describe('getElementBox', () => {
  afterEach(() => {
    document.documentElement.style.zoom = ''
    Reflect.deleteProperty(document.body, 'currentCSSZoom')
  })

  it.each([0.6, 0.8, 1.25])('should derive the viewport scale without currentCSSZoom at zoom %s', zoom => {
    document.documentElement.style.zoom = String(zoom)
    Object.defineProperty(document.body, 'currentCSSZoom', { configurable: true, get: () => undefined })

    expect(getElementBox(document.documentElement).width)
      .toBeCloseTo(document.documentElement.clientWidth / zoom, 0)
  })
})

import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/vue'

// Stub visualViewport so Vuetify components (e.g. VMenu) don't crash in JSDOM
if (!globalThis.visualViewport) {
  vi.stubGlobal('visualViewport', new EventTarget())
}

// Stub matchMedia for v0's createBreakpoints in JSDOM
if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

afterEach(() => {
  cleanup()
})

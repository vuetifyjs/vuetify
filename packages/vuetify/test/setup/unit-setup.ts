import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/vue'

// Stub visualViewport so Vuetify components (e.g. VMenu) don't crash in JSDOM
if (!globalThis.visualViewport) {
  vi.stubGlobal('visualViewport', new EventTarget())
}

afterEach(() => {
  cleanup()
})

import 'roboto-fontface'
import '@/styles/main.sass'
import { beforeEach, expect } from 'vitest'
import { cleanup } from '@testing-library/vue'
import { page } from '@vitest/browser/context'

beforeEach(async () => {
  // Cleanup before not after, so if the test
  // fails we can inspect what has happened
  cleanup()
  await page.viewport(1280, 800)
})

expect.extend({
  async toBeOnScreen (received) {
    const { isNot } = this

    let visible = true
    if (isNot) {
      try {
        expect(received).not.toBeVisible()
        visible = false
      } catch (err) {}
    } else {
      expect(received).toBeVisible()
    }

    const rect = visible && received.getBoundingClientRect()

    return {
      pass: visible && rect.bottom > 0 && rect.right > 0 &&
        rect.x <= window.innerWidth &&
        rect.y <= window.innerHeight,
      message: () => `Expected element${isNot ? ' not' : ''} to be visible on screen`,
    }
  },
})

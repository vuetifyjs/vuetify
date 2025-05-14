import 'roboto-fontface'
import '@/styles/main.sass'
import { beforeAll, beforeEach, expect } from 'vitest'
import { cleanup } from '@testing-library/vue'
import { commands, page } from '@vitest/browser/context'

beforeAll(async () => {
  await commands.setFocusEmulationEnabled()
})

beforeEach(async () => {
  // Cleanup before not after, so if the test
  // fails we can inspect what has happened
  cleanup()
  await page.viewport(1280, 800)
})

expect.extend({
  /** .toBeVisible but using wdio's isDisplayed */
  async toBeDisplayed (received: Element) {
    const isDisplayed = await commands.isDisplayed(page.elementLocator(received).selector)

    return {
      pass: isDisplayed,
      message: () => {
        const element = this.utils.printReceived(received.cloneNode(false))
        return `Expected element${this.isNot ? ' not' : ''} to be displayed:\n${element}`
      },
    }
  },
  /** .toBeDisplayed, also checking if in viewport */
  async toBeOnScreen (received: Element) {
    const isDisplayed = await commands.isDisplayed(page.elementLocator(received).selector, true)

    return {
      pass: isDisplayed,
      message: () => {
        const element = this.utils.printReceived(received.cloneNode(false))
        return `Expected element${this.isNot ? ' not' : ''} to be displayed on screen:\n${element}`
      },
    }
  },
})

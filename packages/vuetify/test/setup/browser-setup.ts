import 'roboto-fontface'
import '@/styles/main.sass'
import { afterEach, beforeAll, beforeEach } from 'vitest'
import { cleanup } from '@testing-library/vue'
import { commands, page } from 'vitest/browser'

beforeAll(async () => {
  await commands.setFocusEmulationEnabled()

  // contextOptions.reducedMotion doesn't seem to do anything for some reason
  await commands.setReduceMotionEnabled()
})

beforeEach(async () => {
  // Cleanup before not after, so if the test
  // fails we can inspect what has happened
  cleanup()
  await page.viewport(1280, 800)
})

afterEach(async ctx => {
  if (
    ctx.task.result?.state === 'fail' &&
    ctx.task.name !== 'Showcase' &&
    !ctx.task.result.errors?.every(e => e.message.startsWith('Visual difference detected'))
  ) {
    // vizzly disables screenshotOnFailure
    await page.screenshot()
  }
})

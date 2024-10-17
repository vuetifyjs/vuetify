import 'roboto-fontface'
import '@/styles/main.sass'
import { beforeEach } from 'vitest'
import { cleanup } from '@testing-library/vue'
import { page } from '@vitest/browser/context'

beforeEach(async () => {
  // Cleanup before not after, so if the test
  // fails we can inspect what has happened
  cleanup()
  await page.viewport(1280, 800)
})

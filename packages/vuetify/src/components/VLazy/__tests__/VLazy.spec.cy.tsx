/// <reference types="../../../../types/cypress" />

import { VLazy } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  'Default counter': <VLazy />,
}

// Tests
describe('VLazy', () => {
  // TODO

  describe('Showcase', { viewportHeight: 1130, viewportWidth: 700 }, () => {
    generate({ stories, props, component: VLazy })
  })
})

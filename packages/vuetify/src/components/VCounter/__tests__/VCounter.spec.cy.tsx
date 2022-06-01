/// <reference types="../../../../types/cypress" />

import { VCounter } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  'Default counter': <VCounter />,
}

// Tests
describe('VCounter', () => {
  // TODO

  describe('Showcase', { viewportHeight: 1130, viewportWidth: 700 }, () => {
    generate({ stories, props, component: VCounter })
  })
})

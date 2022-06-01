/// <reference types="../../../../types/cypress" />

import { VTable } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  'Default table': <VTable />,
}

// Tests
describe('VTable', () => {
  // TODO

  describe('Showcase', { viewportHeight: 1130, viewportWidth: 700 }, () => {
    generate({ stories, props, component: VTable })
  })
})

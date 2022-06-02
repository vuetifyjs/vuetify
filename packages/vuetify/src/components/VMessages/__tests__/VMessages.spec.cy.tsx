/// <reference types="../../../../types/cypress" />

import { VMessages } from '..'
import { generate } from '@/../cypress/templates'

const props = {
  //
}

const stories = {
  'Default Messages': <VMessages />,
}

// Tests
describe('VMessages', () => {
  describe('Showcase', { viewportHeight: 1130, viewportWidth: 700 }, () => {
    generate({ stories, props, component: VMessages })
  })
})

/// <reference types="../../../../types/cypress" />

import { VCarousel } from '..'
import { generate } from '@/../cypress/templates'

const props = {

}

const stories = {
  'Default carousel': <VCarousel />,
}

// Tests
describe('VCarousel', () => {
  describe('Showcase', { viewportHeight: 1130, viewportWidth: 700 }, () => {
    generate({ stories, props, component: VCarousel })
  })
})

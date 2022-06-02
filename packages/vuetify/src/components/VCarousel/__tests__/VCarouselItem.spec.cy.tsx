/// <reference types="../../../../types/cypress" />

import { VCarouselItem } from '..'
import { generate } from '@/../cypress/templates'

const props = {

}

const stories = {
  'Default carousel item': <VCarouselItem />,
}

// Tests
describe('VCarouselItem', () => {
  describe('Showcase', { viewportHeight: 1130, viewportWidth: 700 }, () => {
    generate({ stories, props, component: VCarouselItem })
  })
})

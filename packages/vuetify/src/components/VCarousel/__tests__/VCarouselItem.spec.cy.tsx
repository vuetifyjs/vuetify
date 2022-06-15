/// <reference types="../../../../types/cypress" />

import { VCarouselItem } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VCarouselItem />,
}
// Tests
describe('VCarouselItem', () => {
  generate({ stories, props, component: VCarouselItem })
})

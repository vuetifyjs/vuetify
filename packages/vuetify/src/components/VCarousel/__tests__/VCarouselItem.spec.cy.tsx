/// <reference types="../../../../types/cypress" />

import { VCarousel, VCarouselItem } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: (
    <VCarousel>
      <VCarouselItem />
    </VCarousel>
  ),
}
// Tests
describe('VCarouselItem', () => {
  generate({ stories, props, component: VCarouselItem })
})

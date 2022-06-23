/// <reference types="../../../../types/cypress" />

import { VCarousel } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VCarousel />,
}
// Tests
describe('VCarousel', () => {
  generate({ stories, props, component: VCarousel })
})

/// <reference types="../../../../types/cypress" />

import { VParallax } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VParallax />,
}
// Tests
describe('VParallax', () => {
  generate({ stories, props, component: VParallax })
})

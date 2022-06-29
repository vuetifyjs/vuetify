/// <reference types="../../../../types/cypress" />

import { VRangeSlider } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VRangeSlider />,
}
// Tests
describe('VRangeSlider', () => {
  generate({ stories, props, component: VRangeSlider })
})

/// <reference types="../../../../types/cypress" />

import { VProgressCircular } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VProgressCircular />,
}
// Tests
describe('VProgressCircular', () => {
  generate({ stories, props, component: VProgressCircular })
})

/// <reference types="../../../../types/cypress" />

import { VFooter } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VFooter />,
}
// Tests
describe('VFooter', () => {
  generate({ stories, props, component: VFooter })
})

/// <reference types="../../../../types/cypress" />

import { VTooltip } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VTooltip />,
}
// Tests
describe('VTooltip', () => {
  generate({ stories, props, component: VTooltip })
})

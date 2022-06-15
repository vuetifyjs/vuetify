/// <reference types="../../../../types/cypress" />

import { VDivider } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VDivider />,
}
// Tests
describe('VDivider', () => {
  generate({ stories, props, component: VDivider })
})

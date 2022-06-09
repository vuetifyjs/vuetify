/// <reference types="../../../../types/cypress" />

import { VSystemBar } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VSystemBar />,
}
// Tests
describe('VSystemBar', () => {
  generate({ stories, props, component: VSystemBar })
})

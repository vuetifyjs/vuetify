/// <reference types="../../../../types/cypress" />

import { VSheet } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VSheet />,
}
// Tests
describe('VSheet', () => {
  generate({ stories, props, component: VSheet })
})

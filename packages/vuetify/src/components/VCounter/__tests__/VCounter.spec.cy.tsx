/// <reference types="../../../../types/cypress" />

import { VCounter } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VCounter />,
}
// Tests
describe('VCounter', () => {
  generate({ stories, props, component: VCounter })
})

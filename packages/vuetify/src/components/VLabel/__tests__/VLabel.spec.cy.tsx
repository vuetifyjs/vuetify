/// <reference types="../../../../types/cypress" />

import { VLabel } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VLabel />,
}
// Tests
describe('VLabel', () => {
  generate({ stories, props, component: VLabel })
})

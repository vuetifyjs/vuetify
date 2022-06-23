/// <reference types="../../../../types/cypress" />

import { VDialog } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VDialog />,
}
// Tests
describe('VDialog', () => {
  generate({ stories, props, component: VDialog })
})

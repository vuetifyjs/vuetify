/// <reference types="../../../../types/cypress" />

import { VIcon } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VIcon />,
}
// Tests
describe('VIcon', () => {
  generate({ stories, props, component: VIcon })
})

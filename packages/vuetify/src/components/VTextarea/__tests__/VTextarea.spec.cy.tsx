/// <reference types="../../../../types/cypress" />

import { VTextarea } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VTextarea />,
}
// Tests
describe('VTextarea', () => {
  generate({ stories, props, component: VTextarea })
})

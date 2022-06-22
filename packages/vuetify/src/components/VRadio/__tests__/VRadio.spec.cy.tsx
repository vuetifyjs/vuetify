/// <reference types="../../../../types/cypress" />

import { VRadio } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VRadio />,
}
// Tests
describe('VRadio', () => {
  generate({ stories, props, component: VRadio })
})

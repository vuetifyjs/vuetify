/// <reference types="../../../../types/cypress" />

import { VTable } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VTable />,
}
// Tests
describe('VTable', () => {
  generate({ stories, props, component: VTable })
})

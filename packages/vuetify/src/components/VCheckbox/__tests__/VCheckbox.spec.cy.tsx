/// <reference types="../../../../types/cypress" />

import { VCheckbox } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VCheckbox />,
}
// Tests
describe('VCheckbox', () => {
  generate({ stories, props, component: VCheckbox })
})

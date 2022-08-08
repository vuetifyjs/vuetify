/// <reference types="../../../../types/cypress" />

import { VRadioGroup } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VRadioGroup />,
}
// Tests
describe('VRadioGroup', () => {
  generate({ stories, props, component: VRadioGroup })
})

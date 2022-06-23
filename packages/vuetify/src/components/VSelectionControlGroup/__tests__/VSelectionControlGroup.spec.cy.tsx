/// <reference types="../../../../types/cypress" />

import { VSelectionControlGroup } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VSelectionControlGroup />,
}
// Tests
describe('VSelectionControlGroup', () => {
  generate({ stories, props, component: VSelectionControlGroup })
})

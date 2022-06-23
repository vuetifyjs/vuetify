/// <reference types="../../../../types/cypress" />

import { VField } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VField />,
}
// Tests
describe('VField', () => {
  generate({ stories, props, component: VField })
})

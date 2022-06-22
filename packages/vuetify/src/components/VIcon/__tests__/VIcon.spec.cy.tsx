/// <reference types="../../../../types/cypress" />

import { VIcon } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VIcon icon="mdi-vuetify" />,
}
// Tests
describe('VIcon', () => {
  generate({ stories, props, component: VIcon })
})

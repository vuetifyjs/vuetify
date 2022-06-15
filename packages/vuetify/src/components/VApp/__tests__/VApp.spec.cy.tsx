/// <reference types="../../../../types/cypress" />

import { VApp } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VApp />,
}
// Tests
describe('VApp', () => {
  generate({ stories, props, component: VApp })
})

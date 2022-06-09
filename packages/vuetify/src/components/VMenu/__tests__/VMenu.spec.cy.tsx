/// <reference types="../../../../types/cypress" />

import { VMenu } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VMenu />,
}
// Tests
describe('VMenu', () => {
  generate({ stories, props, component: VMenu })
})

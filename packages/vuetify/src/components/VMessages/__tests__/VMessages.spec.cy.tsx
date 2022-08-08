/// <reference types="../../../../types/cypress" />

import { VMessages } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VMessages />,
}
// Tests
describe('VMessages', () => {
  generate({ stories, props, component: VMessages })
})

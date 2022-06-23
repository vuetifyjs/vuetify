/// <reference types="../../../../types/cypress" />

import { VSwitch } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VSwitch />,
}
// Tests
describe('VSwitch', () => {
  generate({ stories, props, component: VSwitch })
})

/// <reference types="../../../../types/cypress" />

import { VMain } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VMain />,
}
// Tests
describe('VMain', () => {
  generate({ stories, props, component: VMain })
})

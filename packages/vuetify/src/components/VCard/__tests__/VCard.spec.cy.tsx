/// <reference types="../../../../types/cypress" />

import { VCard } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VCard />,
}
// Tests
describe('VCard', () => {
  generate({ stories, props, component: VCard })
})

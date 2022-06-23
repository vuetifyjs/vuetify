/// <reference types="../../../../types/cypress" />

import { VLocaleProvider } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VLocaleProvider />,
}
// Tests
describe('VLocaleProvider', () => {
  generate({ stories, props, component: VLocaleProvider })
})

/// <reference types="../../../../types/cypress" />

import { VLazy } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VLazy />,
}
// Tests
describe('VLazy', () => {
  generate({ stories, props, component: VLazy })
})

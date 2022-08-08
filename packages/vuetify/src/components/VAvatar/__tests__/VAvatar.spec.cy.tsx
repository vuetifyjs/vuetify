/// <reference types="../../../../types/cypress" />

import { VAvatar } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VAvatar />,
}
// Tests
describe('VAvatar', () => {
  generate({ stories, props, component: VAvatar })
})

/// <reference types="../../../../types/cypress" />

import { VImg } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VImg />,
}
// Tests
describe('VImg', () => {
  generate({ stories, props, component: VImg })
})

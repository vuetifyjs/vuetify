/// <reference types="../../../../types/cypress" />

import { NAME } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <NAME />,
}

// Tests
describe('NAME', () => {
  generate({ stories, props, component: NAME })
})

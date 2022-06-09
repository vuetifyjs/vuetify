/// <reference types="../../../../types/cypress" />

import { VResponsive } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VResponsive />,
}
// Tests
describe('VResponsive', () => {
  generate({ stories, props, component: VResponsive })
})

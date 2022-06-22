/// <reference types="../../../../types/cypress" />

import { VSnackbar } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: <VSnackbar />,
}
// Tests
describe('VSnackbar', () => {
  generate({ stories, props, component: VSnackbar })
})

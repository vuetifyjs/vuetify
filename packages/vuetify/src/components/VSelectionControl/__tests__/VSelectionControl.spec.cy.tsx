/// <reference types="../../../../types/cypress" />

import { VSelectionControl } from '../VSelectionControl'
import { generate } from '@/../cypress/templates'

// TODO: generate these from types
const colors = ['success', 'info', 'warning', 'error', 'invalid']
const densities = ['default', 'comfortable', 'compact'] as const
const props = {
  color: colors,
  disabled: false,
}

const stories = {}

// Actual tests
describe('VSelectionControl', () => {
  //
})

// Useful to preview all of the variants and pre-made examples
describe('Showcase', { viewportHeight: 1130, viewportWidth: 700 }, () => {
  generate({ stories, props, component: VSelectionControl })
})

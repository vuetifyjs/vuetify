/// <reference types="../../../../types/cypress" />

import { VChipGroup } from '..'
import { generate } from '@/../cypress/templates'

const props = {
  //
}

const stories = {
  'Default Chip Group': <VChipGroup />,
}

// Tests
describe('VChipGroup', () => {
  describe('Showcase', { viewportHeight: 1130, viewportWidth: 700 }, () => {
    generate({ stories, props, component: VChipGroup })
  })
})

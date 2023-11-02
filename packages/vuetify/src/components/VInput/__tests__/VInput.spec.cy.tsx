/// <reference types="../../../../types/cypress" />

// Components
import { VInput } from '../VInput'

// Utilities
import { cloneVNode } from 'vue'
import { generate } from '../../../../cypress/templates'

const densities = ['default', 'comfortable', 'compact']

const stories = Object.fromEntries(Object.entries({
  Default: <VInput />,
  Disabled: <VInput disabled />,
  Affixes: <VInput prefix="prefix" suffix="suffix" />,
  PrependAppend: <VInput prependIcon="$vuetify" appendIcon="$vuetify" />,
  Hint: <VInput hint="hint" persistentHint />,
  Messages: <VInput messages="messages" />,
}).map(([k, v]) => [k, (
  <div class="d-flex flex-column flex-grow-1">
    { densities.map(density => (
      <div class="d-flex" style="gap: 0.4rem">
        { cloneVNode(v, { density }) }
        { cloneVNode(v, { density, modelValue: 'Value' }) }
      </div>
    ))}
  </div>
)]))

describe('VInput', () => {
  describe('Showcase', () => {
    generate({ stories })
  })
})

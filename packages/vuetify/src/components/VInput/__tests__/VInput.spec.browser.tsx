// Components
import { VInput } from '../VInput'

// Utilities
import { showcase } from '@test'
import { cloneVNode } from 'vue'

const densities = ['default', 'comfortable', 'compact']

const stories = Object.fromEntries(Object.entries({
  Default: <VInput />,
  Disabled: <VInput disabled />,
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
  showcase({ stories })
})

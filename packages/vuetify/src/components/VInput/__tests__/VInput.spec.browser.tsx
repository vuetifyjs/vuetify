// Components
import { VInput } from '../VInput'

// Utilities
import { render, screen, showcase, waitAnimationFrame } from '@test'
import { cloneVNode, nextTick, ref } from 'vue'

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
  it('removes the previous message right away with reduced motion', async () => {
    const messages = ref('Required')
    render(() => <VInput messages={ messages.value } />)

    messages.value = 'Too short'
    await nextTick()
    await waitAnimationFrame()
    await waitAnimationFrame()

    const items = screen.getAllByCSS('.v-messages__message')
    expect(items).toHaveLength(1)
    expect(items[0]).toHaveTextContent('Too short')
  })

  showcase({ stories })
})

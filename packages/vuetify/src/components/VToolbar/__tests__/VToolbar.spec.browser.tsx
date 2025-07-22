// Components
import { VToolbar } from '..'
import { VBtn } from '@/components/VBtn'

// Utilities
import { generate } from '@test'

const stories = {
  'With title': <VToolbar title="foo" />,
  'With color': <VToolbar color="primary" title="bar" />,
  'With slots': (
    <VToolbar>
      {{
        prepend: () => <VBtn>Prepend</VBtn>,
        append: () => <VBtn>Append</VBtn>,
      }}
    </VToolbar>
  ),
}

describe('VToolbar', () => {
  describe('Showcase', () => {
    generate({ stories })
  })
})

// Components
import { VToolbar } from '..'
import { VBtn } from '@/components/VBtn'

// Utilities
import { showcase } from '@test'

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
  'With location': <VToolbar absolute location="top right" title="Positioned toolbar" />,
}

describe('VToolbar', () => {
  showcase({ stories })
})

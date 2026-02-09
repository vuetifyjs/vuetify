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
  'With location': <div style="position: relative; height: 100px; border: 1px dashed #ccc">
    <VToolbar absolute floating class="pr-5" location="top right" title="top right" />
    <VToolbar absolute floating class="pr-5" location="bottom center" title="bottom center" />
  </div>,
}

describe('VToolbar', () => {
  showcase({ stories })
})

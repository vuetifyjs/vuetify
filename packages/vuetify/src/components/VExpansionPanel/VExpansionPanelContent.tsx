// Components
import { VExpandTransition } from '../transitions'
import { VExpansionPanelSymbol } from './VExpansionPanels'

// Composables
import { makeLazyProps, useLazy } from '@/composables/lazy'

// Utilities
import { inject } from 'vue'
import { defineComponent } from '@/util'

export default defineComponent({
  name: 'VExpansionPanelContent',

  props: {
    ...makeLazyProps(),
  },

  setup (props, { slots }) {
    const expansionPanel = inject(VExpansionPanelSymbol)

    if (!expansionPanel) throw new Error('[Vuetify] v-expansion-panel-content needs to be placed inside v-expansion-panel')

    const { hasContent } = useLazy(props, expansionPanel.isSelected)

    return () => (
      <VExpandTransition>
        <div
          v-show={ expansionPanel.isSelected.value }
          class={[
            'v-expansion-panel-content',
          ]}
        >
          { slots.default && hasContent.value && (
            <div class="v-expansion-panel-content__wrapper">
              { slots.default?.() }
            </div>
          ) }
        </div>
      </VExpandTransition>
    )
  },
})

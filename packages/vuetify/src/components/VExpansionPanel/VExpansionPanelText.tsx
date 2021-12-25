// Components
import { VExpandTransition } from '@/components/transitions'
import { VExpansionPanelSymbol } from './VExpansionPanels'

// Composables
import { makeLazyProps, useLazy } from '@/composables/lazy'

// Utilities
import { inject, toRef } from 'vue'
import { defineComponent } from '@/util'

export const VExpansionPanelText = defineComponent({
  name: 'VExpansionPanelText',

  props: {
    open: Boolean,
    ...makeLazyProps(),
  },

  setup (props, { slots }) {
    const { hasContent, onAfterLeave } = useLazy(props, toRef(props, 'open'))

    return () => (
      <VExpandTransition onAfterLeave={ onAfterLeave }>
        <div
          v-show={ props.open }
          class={[
            'v-expansion-panel-text',
          ]}
        >
          { slots.default && hasContent.value && (
            <div class="v-expansion-panel-text__wrapper">
              { slots.default?.() }
            </div>
          ) }
        </div>
      </VExpandTransition>
    )
  },
})

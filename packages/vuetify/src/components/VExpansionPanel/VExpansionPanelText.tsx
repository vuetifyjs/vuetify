// Components
import { VExpandTransition } from '@/components/transitions'

// Composables
import { makeLazyProps, useLazy } from '@/composables/lazy'

// Utilities
import { toRef } from 'vue'
import { defineComponent, useRender } from '@/util'

export const VExpansionPanelText = defineComponent({
  name: 'VExpansionPanelText',

  props: {
    open: Boolean,
    ...makeLazyProps(),
  },

  setup (props, { slots }) {
    const { hasContent, onAfterLeave } = useLazy(props, toRef(props, 'open'))

    useRender(() => (
      <VExpandTransition onAfterLeave={ onAfterLeave }>
        <div
          class="v-expansion-panel-text"
          v-show={ props.open }
        >
          { slots.default && hasContent.value && (
            <div class="v-expansion-panel-text__wrapper">
              { slots.default?.() }
            </div>
          ) }
        </div>
      </VExpandTransition>
    ))

    return {}
  },
})

export type VExpansionPanelText = InstanceType<typeof VExpansionPanelText>

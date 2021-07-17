// Components
import { VExpandTransition } from '../transitions'
import { VExpansionPanelSymbol } from './VExpansionPanels'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { makeLazyProps, useLazy } from '@/composables/lazy'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { inject } from 'vue'
import { defineComponent } from '@/util'

export default defineComponent({
  name: 'VExpansionPanelContent',

  props: {
    color: String,
    ...makeTagProps(),
    ...makeLazyProps(),
  },

  setup (props, { slots }) {
    const expansionPanel = inject(VExpansionPanelSymbol)

    if (!expansionPanel) throw new Error('[Vuetify] v-expansion-panel-content needs to be placed inside v-expansion-panel')

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')
    const { hasContent } = useLazy(props, expansionPanel.isSelected)

    return () => (
      <VExpandTransition>
        {hasContent.value && (
          <props.tag
            v-show={expansionPanel.isSelected.value}
            class={[
              'v-expansion-panel-content',
              ...backgroundColorClasses.value,
            ]}
            style={backgroundColorStyles.value}
          >
            <div class="v-expansion-panel-content__wrapper">
              { slots.default?.() }
            </div>
          </props.tag>
        )}
      </VExpandTransition>
    )
  },
})

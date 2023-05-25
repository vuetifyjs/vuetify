// Components
import { VExpansionPanelSymbol } from './VExpansionPanels'
import { VExpandTransition } from '@/components/transitions'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeLazyProps, useLazy } from '@/composables/lazy'

// Utilities
import { inject } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVExpansionPanelTextProps = propsFactory({
  ...makeComponentProps(),
  ...makeLazyProps(),
}, 'v-expansion-panel-text')

export const VExpansionPanelText = genericComponent()({
  name: 'VExpansionPanelText',

  props: makeVExpansionPanelTextProps(),

  setup (props, { slots }) {
    const expansionPanel = inject(VExpansionPanelSymbol)

    if (!expansionPanel) throw new Error('[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel')

    const { hasContent, onAfterLeave } = useLazy(props, expansionPanel.isSelected)

    useRender(() => (
      <VExpandTransition onAfterLeave={ onAfterLeave }>
        <div
          class={[
            'v-expansion-panel-text',
            props.class,
          ]}
          style={ props.style }
          v-show={ expansionPanel.isSelected.value }
        >
          { slots.default && hasContent.value && (
            <div class="v-expansion-panel-text__wrapper">
              { slots.default?.() }
            </div>
          )}
        </div>
      </VExpandTransition>
    ))

    return {}
  },
})

export type VExpansionPanelText = InstanceType<typeof VExpansionPanelText>

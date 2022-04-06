// Components
import { VIcon } from '@/components/VIcon'
import { VExpansionPanelSymbol } from './VExpansionPanels'

// Composables
import { useBackgroundColor } from '@/composables/color'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { computed, inject } from 'vue'
import { defineComponent, propsFactory, useRender } from '@/util'

export const makeVExpansionPanelTitleProps = propsFactory({
  color: String,
  expandIcon: {
    type: String,
    default: '$expand',
  },
  collapseIcon: {
    type: String,
    default: '$collapse',
  },
  hideActions: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: false,
  },
})

export const VExpansionPanelTitle = defineComponent({
  name: 'VExpansionPanelTitle',

  directives: { Ripple },

  props: {
    ...makeVExpansionPanelTitleProps(),
  },

  setup (props, { slots }) {
    const expansionPanel = inject(VExpansionPanelSymbol)

    if (!expansionPanel) throw new Error('[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel')

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    const slotProps = computed(() => ({
      collapseIcon: props.collapseIcon,
      disabled: expansionPanel.disabled.value,
      expanded: expansionPanel.isSelected.value,
      expandIcon: props.expandIcon,
    }))

    useRender(() => (
      <button
        class={[
          'v-expansion-panel-title',
          {
            'v-expansion-panel-title--active': expansionPanel.isSelected.value,
          },
          backgroundColorClasses.value,
        ]}
        style={ backgroundColorStyles.value }
        type="button"
        tabindex={ expansionPanel.disabled.value ? -1 : undefined }
        disabled={ expansionPanel.disabled.value }
        aria-expanded={ expansionPanel.isSelected.value }
        onClick={ expansionPanel.toggle }
        v-ripple={ props.ripple }
      >
        <div class="v-expansion-panel-title__overlay" />

        { slots.default?.(slotProps.value) }

        { !props.hideActions && (
          <div class="v-expansion-panel-title__icon">
            {
              slots.actions ? slots.actions(slotProps.value)
              : <VIcon icon={ expansionPanel.isSelected.value ? props.collapseIcon : props.expandIcon } />
            }
          </div>
        ) }
      </button>
    ))

    return {}
  },
})

export type VExpansionPanelTitle = InstanceType<typeof VExpansionPanelTitle>

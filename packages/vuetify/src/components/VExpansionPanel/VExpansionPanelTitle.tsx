// Components
import { VIcon } from '@/components/VIcon'
import { VExpansionPanelSymbol } from './VExpansionPanels'

// Composables
import { useBackgroundColor } from '@/composables/color'

// Directives
import ripple from '@/directives/ripple'

// Utilities
import { computed, inject } from 'vue'
import { defineComponent, propsFactory } from '@/util'

export const makeVExpansionPanelTitleProps = propsFactory({
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
  color: String,
})

export const VExpansionPanelTitle = defineComponent({
  name: 'VExpansionPanelTitle',

  directives: { ripple },

  props: {
    ...makeVExpansionPanelTitleProps(),
  },

  setup (props, { slots }) {
    const expansionPanel = inject(VExpansionPanelSymbol)

    if (!expansionPanel) throw new Error('[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel')

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    const slotProps = computed(() => ({
      expanded: expansionPanel.isSelected.value,
      disabled: expansionPanel.disabled.value,
      expandIcon: props.expandIcon,
      collapseIcon: props.collapseIcon,
    }))

    return () => (
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
    )
  },
})

// Components
import { VExpansionPanelSymbol } from './VExpansionPanels'
import { VIcon } from '@/components/VIcon'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { IconValue } from '@/composables/icons'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { computed, inject } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

interface ExpansionPanelTitleSlot {
  collapseIcon: IconValue
  disabled: boolean | undefined
  expanded: boolean
  expandIcon: IconValue
  readonly: boolean
}

export type VExpansionPanelTitleSlots = {
  default: ExpansionPanelTitleSlot
  actions: ExpansionPanelTitleSlot
}

export const makeVExpansionPanelTitleProps = propsFactory({
  color: String,
  expandIcon: {
    type: IconValue,
    default: '$expand',
  },
  collapseIcon: {
    type: IconValue,
    default: '$collapse',
  },
  hideActions: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: false,
  },
  readonly: Boolean,

  ...makeComponentProps(),
}, 'v-expansion-panel-title')

export const VExpansionPanelTitle = genericComponent<VExpansionPanelTitleSlots>()({
  name: 'VExpansionPanelTitle',

  directives: { Ripple },

  props: makeVExpansionPanelTitleProps(),

  setup (props, { slots }) {
    const expansionPanel = inject(VExpansionPanelSymbol)

    if (!expansionPanel) throw new Error('[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel')

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    const slotProps = computed(() => ({
      collapseIcon: props.collapseIcon,
      disabled: expansionPanel.disabled.value,
      expanded: expansionPanel.isSelected.value,
      expandIcon: props.expandIcon,
      readonly: props.readonly,
    }))

    useRender(() => (
      <button
        class={[
          'v-expansion-panel-title',
          {
            'v-expansion-panel-title--active': expansionPanel.isSelected.value,
          },
          backgroundColorClasses.value,
          props.class,
        ]}
        style={[
          backgroundColorStyles.value,
          props.style,
        ]}
        type="button"
        tabindex={ expansionPanel.disabled.value ? -1 : undefined }
        disabled={ expansionPanel.disabled.value }
        aria-expanded={ expansionPanel.isSelected.value }
        onClick={ !props.readonly ? expansionPanel.toggle : undefined }
        v-ripple={ props.ripple }
      >
        <span class="v-expansion-panel-title__overlay" />

        { slots.default?.(slotProps.value) }

        { !props.hideActions && (
          <span class="v-expansion-panel-title__icon">
            {
              slots.actions ? slots.actions(slotProps.value)
              : <VIcon icon={ expansionPanel.isSelected.value ? props.collapseIcon : props.expandIcon } />
            }
          </span>
        )}
      </button>
    ))

    return {}
  },
})

export type VExpansionPanelTitle = InstanceType<typeof VExpansionPanelTitle>

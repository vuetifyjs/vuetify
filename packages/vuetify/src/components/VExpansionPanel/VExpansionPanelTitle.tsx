// Components
import { VExpansionPanelSymbol } from './shared'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { IconValue } from '@/composables/icons'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { computed, inject } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { RippleDirectiveBinding } from '@/directives/ripple'

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
  focusable: Boolean,
  static: Boolean,
  ripple: {
    type: [Boolean, Object] as PropType<RippleDirectiveBinding['value']>,
    default: false,
  },
  readonly: Boolean,

  ...makeComponentProps(),
  ...makeDimensionProps(),
}, 'VExpansionPanelTitle')

export const VExpansionPanelTitle = genericComponent<VExpansionPanelTitleSlots>()({
  name: 'VExpansionPanelTitle',

  directives: { Ripple },

  props: makeVExpansionPanelTitleProps(),

  setup (props, { slots }) {
    const expansionPanel = inject(VExpansionPanelSymbol)

    if (!expansionPanel) throw new Error('[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel')

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')
    const { dimensionStyles } = useDimension(props)

    const slotProps = computed(() => ({
      collapseIcon: props.collapseIcon,
      disabled: expansionPanel.disabled.value,
      expanded: expansionPanel.isSelected.value,
      expandIcon: props.expandIcon,
      readonly: props.readonly,
    }))

    const icon = computed(() => expansionPanel.isSelected.value ? props.collapseIcon : props.expandIcon)

    useRender(() => (
      <button
        class={[
          'v-expansion-panel-title',
          {
            'v-expansion-panel-title--active': expansionPanel.isSelected.value,
            'v-expansion-panel-title--focusable': props.focusable,
            'v-expansion-panel-title--static': props.static,
          },
          backgroundColorClasses.value,
          props.class,
        ]}
        style={[
          backgroundColorStyles.value,
          dimensionStyles.value,
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
          <VDefaultsProvider
            defaults={{
              VIcon: {
                icon: icon.value,
              },
            }}
          >
            <span class="v-expansion-panel-title__icon">
              { slots.actions?.(slotProps.value) ?? <VIcon /> }
            </span>
          </VDefaultsProvider>
        )}
      </button>
    ))

    return {}
  },
})

export type VExpansionPanelTitle = InstanceType<typeof VExpansionPanelTitle>

// Components
import { VIcon } from '@/components'
import { VExpansionPanelSymbol } from './VExpansionPanels'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { makeTagProps } from '@/composables/tag'

// Directives
import ripple from '@/directives/ripple'

// Utilities
import { computed, inject } from 'vue'
import { defineComponent } from '@/util'

export default defineComponent({
  name: 'VExpansionPanelHeader',

  directives: { ripple },

  props: {
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
    ...makeTagProps({ tag: 'button' }),
  },

  setup (props, { slots }) {
    const expansionPanel = inject(VExpansionPanelSymbol)

    if (!expansionPanel) throw new Error('[Vuetify] v-expansion-panel-header needs to be placed inside v-expansion-panel')

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    const slotProps = computed(() => ({
      expanded: expansionPanel.isSelected.value,
      disabled: expansionPanel.disabled.value,
      expandIcon: props.expandIcon,
      collapseIcon: props.collapseIcon,
    }))

    return () => (
      <props.tag
        class={[
          'v-expansion-panel-header',
          {
            'v-expansion-panel-header--active': expansionPanel.isSelected.value,
          },
          ...backgroundColorClasses.value,
        ]}
        style={backgroundColorStyles.value}
        tabindex={expansionPanel.disabled.value ? -1 : undefined}
        type={props.tag === 'button' ? 'button' : undefined}
        aria-expanded={expansionPanel.isSelected.value}
        v-ripple={props.ripple}
        onClick={expansionPanel.toggle}
        disabled={props.tag === 'button' ? expansionPanel.disabled.value : undefined}
      >
        <div class="v-expansion-panel-header__overlay" />
        { slots.default?.(slotProps.value) }
        { !props.hideActions && (
          <div class="v-expansion-panel-header__icon">
            {
              slots.actions ? slots.actions(slotProps.value)
              : <VIcon icon={expansionPanel.isSelected.value ? props.collapseIcon : props.expandIcon} />
            }
          </div>
        ) }
      </props.tag>
    )
  },
})

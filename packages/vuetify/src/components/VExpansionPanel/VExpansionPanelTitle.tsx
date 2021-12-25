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
    open: Boolean,
    disabled: Boolean,
    ...makeVExpansionPanelTitleProps(),
  },

  emits: {
    'update:open': (open: boolean) => true,
  },

  setup (props, { slots, emit }) {
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    return () => (
      <button
        class={[
          'v-expansion-panel-title',
          {
            'v-expansion-panel-title--active': props.open,
          },
          backgroundColorClasses.value,
        ]}
        style={ backgroundColorStyles.value }
        type="button"
        tabindex={ props.disabled ? -1 : undefined }
        disabled={ props.disabled }
        aria-expanded={ props.open }
        onClick={ () => emit('update:open', !props.open) }
        v-ripple={ props.ripple }
      >
        <div class="v-expansion-panel-title__overlay" />
        { slots.default?.() }
        { !props.hideActions && (
          <div class="v-expansion-panel-title__icon">
            {
              slots.actions ? slots.actions()
              : <VIcon icon={ props.open ? props.collapseIcon : props.expandIcon } />
            }
          </div>
        ) }
      </button>
    )
  },
})

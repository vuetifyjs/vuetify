// Components
import { VIcon } from '@/components/VIcon'

// Composables
import { useBackgroundColor } from '@/composables/color'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
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
    open: Boolean,
    disabled: Boolean,
    ...makeVExpansionPanelTitleProps(),
  },

  emits: {
    'update:open': (open: boolean) => true,
  },

  setup (props, { slots, emit }) {
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    useRender(() => (
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
    ))

    return {}
  },
})

export type VExpansionPanelTitle = InstanceType<typeof VExpansionPanelTitle>

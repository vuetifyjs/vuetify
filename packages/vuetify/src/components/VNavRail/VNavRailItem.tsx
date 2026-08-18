// Styles
import './VNavRailItem.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VDivider } from '@/components/VDivider'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeRouterProps, useLink } from '@/composables/router'
import { makeVariantProps } from '@/composables/variant'

// Utilities
import { computed } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVNavRailItemProps = propsFactory({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  // M3 selected icon (usually the filled variant); falls back to `icon`
  activeIcon: String,
  disabled: Boolean,
  divider: Boolean,
  verticalDivider: Boolean,

  ...makeComponentProps(),
  ...makeRouterProps(),
  ...makeVariantProps({ variant: 'tonal' } as const),
}, 'VNavRailItem')

export const VNavRailItem = genericComponent()({
  name: 'VNavRailItem',

  props: makeVNavRailItemProps(),

  setup (props, { attrs }) {
    const link = useLink(props, attrs)

    const selected = computed(() => !props.disabled && (link.isActive?.value ?? false))
    const displayIcon = computed(() => (
      selected.value && props.activeIcon ? props.activeIcon : props.icon
    ))

    useRender(() => (
      <>
        <span
          class={[
            'v-nav-rail-item',
            {
              'v-nav-rail-item--active': selected.value,
              'v-nav-rail-item--disabled': props.disabled,
            },
            props.class,
          ]}
          style={ props.style }
        >
          <VBtn
            class="v-nav-rail-item__btn"
            variant={ selected.value ? props.variant : 'text' }
            rounded="16"
            width="56"
            height="32"
            aria-label={ props.title }
            color={ props.color }
            exact={ props.exact }
            href={ props.href }
            icon={ displayIcon.value }
            to={ props.to }
            replace={ props.replace }
            disabled={ props.disabled }
          />

          <small class="v-nav-rail-item__title">
            { props.title }
          </small>
        </span>

        { props.divider && <VDivider /> }
        { props.verticalDivider && <VDivider vertical /> }
      </>
    ))

    return {}
  },
})

export type VNavRailItem = InstanceType<typeof VNavRailItem>

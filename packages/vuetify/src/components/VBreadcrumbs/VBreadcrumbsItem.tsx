// Composables
import { makeRouterProps, useLink } from '@/composables/router'
import { makeTagProps } from '@/composables/tag'
import { useTextColor } from '@/composables/color'

// Utilities
import { computed, defineComponent, inject } from 'vue'
import { makeProps } from '@/util'

// Types
import { VBreadcrumbsSymbol } from './VBreadcrumbs'

export default defineComponent({
  name: 'VBreadcrumbsItem',

  props: makeProps({
    active: Boolean,
    activeClass: String,
    activeColor: String,
    color: String,
    disabled: Boolean,
    text: String,

    ...makeRouterProps(),
    ...makeTagProps({ tag: 'li' }),
  }),

  setup (props, { slots, attrs }) {
    const breadcrumbs = inject(VBreadcrumbsSymbol)

    if (!breadcrumbs) throw new Error('[Vuetify] Could not find v-breadcrumbs provider')

    const color = computed(() => {
      if (props.active) return props.activeColor ?? breadcrumbs.color.value

      return props.color
    })

    const { textColorClasses, textColorStyles } = useTextColor(color)
    const link = useLink(props, attrs)

    return () => {
      const Tag = (link.isLink.value) ? 'a' : props.tag

      return (
        <Tag
          class={[
            'v-breadcrumbs-item',
            {
              'v-breadcrumbs-item--active': link.isExactActive?.value,
              'v-breadcrumbs-item--disabled': props.disabled || breadcrumbs.disabled.value,
              'v-breadcrumbs-item--link': link.isLink.value,
              [`${props.activeClass}`]: props.active && props.activeClass,
            },
            textColorClasses.value,
          ]}
          style={[
            textColorStyles.value,
          ]}
          href={ link.href.value }
          aria-current={ props.active ? 'page' : undefined }
          onClick={ !props.active || link.navigate }
        >
          { slots.default ? slots.default() : props.text }
        </Tag>
      )
    }
  },
})

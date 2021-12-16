// Composables
import { makeRouterProps, useLink } from '@/composables/router'
import { makeTagProps } from '@/composables/tag'
import { useTextColor } from '@/composables/color'

// Utilities
import { computed, inject } from 'vue'
import { defineComponent } from '@/util'
import { VBreadcrumbsSymbol } from './shared'

export const VBreadcrumbsItem = defineComponent({
  name: 'VBreadcrumbsItem',

  props: {
    active: Boolean,
    activeClass: String,
    activeColor: String,
    color: String,
    disabled: Boolean,
    text: String,

    ...makeRouterProps(),
    ...makeTagProps({ tag: 'li' }),
  },

  setup (props, { slots, attrs }) {
    const breadcrumbs = inject(VBreadcrumbsSymbol)

    if (!breadcrumbs) throw new Error('[Vuetify] Could not find v-breadcrumbs provider')

    const link = useLink(props, attrs)
    const isActive = computed(() => {
      return props.active || link.isExactActive?.value
    })
    const color = computed(() => {
      if (isActive.value) return props.activeColor ?? breadcrumbs.color.value

      return props.color
    })
    const { textColorClasses, textColorStyles } = useTextColor(color)

    return () => {
      const Tag = (link.isLink.value) ? 'a' : props.tag
      const hasText = !!(slots.default || props.text)

      return (
        <Tag
          class={[
            'v-breadcrumbs-item',
            {
              'v-breadcrumbs-item--active': isActive.value,
              'v-breadcrumbs-item--disabled': props.disabled || breadcrumbs.disabled.value,
              'v-breadcrumbs-item--link': link.isLink.value,
              [`${props.activeClass}`]: isActive.value && props.activeClass,
            },
            textColorClasses.value,
          ]}
          style={[
            textColorStyles.value,
          ]}
          aria-current={ isActive.value ? 'page' : undefined }
          onClick={ isActive.value && link.navigate }
          v-slots={{
            default: hasText ? () => slots.default?.() ?? props.text : undefined,
          }}
        />
      )
    }
  },
})

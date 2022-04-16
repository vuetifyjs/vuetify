// Composables
import { makeRouterProps, useLink } from '@/composables/router'
import { makeTagProps } from '@/composables/tag'
import { useTextColor } from '@/composables/color'

// Utilities
import { computed } from 'vue'
import { defineComponent, useRender } from '@/util'

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
    const link = useLink(props, attrs)
    const isActive = computed(() => props.active || link.isExactActive?.value)
    const color = computed(() => isActive.value ? props.activeColor : props.color)

    const { textColorClasses, textColorStyles } = useTextColor(color)

    useRender(() => {
      const Tag = link.isLink.value ? 'a' : props.tag
      const hasText = !!(slots.default || props.text)

      return (
        <Tag
          class={[
            'v-breadcrumbs-item',
            {
              'v-breadcrumbs-item--active': isActive.value,
              'v-breadcrumbs-item--disabled': props.disabled,
              'v-breadcrumbs-item--link': link.isLink.value,
              [`${props.activeClass}`]: isActive.value && props.activeClass,
            },
            textColorClasses.value,
          ]}
          style={[
            textColorStyles.value,
          ]}
          href={ link.href.value }
          aria-current={ isActive.value ? 'page' : undefined }
          onClick={ link.navigate }
          v-slots={{
            default: hasText ? () => slots.default?.() ?? props.text : undefined,
          }}
        />
      )
    })

    return {}
  },
})

export type VBreadcrumbsItem = InstanceType<typeof VBreadcrumbsItem>

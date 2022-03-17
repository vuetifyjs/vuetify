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
    const { isExactActive, isLink, navigate } = useLink(props, attrs)
    const isActive = computed(() => props.active || isExactActive?.value)
    const color = computed(() => isActive.value ? props.activeColor : props.color)

    const { textColorClasses, textColorStyles } = useTextColor(color)

    useRender(() => {
      const Tag = (isLink.value) ? 'a' : props.tag
      const hasText = !!(slots.default || props.text)

      return (
        <Tag
          class={[
            'v-breadcrumbs-item',
            {
              'v-breadcrumbs-item--active': isActive.value,
              'v-breadcrumbs-item--disabled': props.disabled,
              'v-breadcrumbs-item--link': isLink.value,
              [`${props.activeClass}`]: isActive.value && props.activeClass,
            },
            textColorClasses.value,
          ]}
          style={[
            textColorStyles.value,
          ]}
          aria-current={ isActive.value ? 'page' : undefined }
          onClick={ isActive.value && navigate }
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

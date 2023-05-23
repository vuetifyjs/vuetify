// Composables
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeRouterProps, useLink } from '@/composables/router'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { computed } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVBreadcrumbsItemProps = propsFactory({
  active: Boolean,
  activeClass: String,
  activeColor: String,
  color: String,
  disabled: Boolean,
  title: String,

  ...makeComponentProps(),
  ...makeRouterProps(),
  ...makeTagProps({ tag: 'li' }),
}, 'v-breadcrumbs-item')

export const VBreadcrumbsItem = genericComponent()({
  name: 'VBreadcrumbsItem',

  props: makeVBreadcrumbsItemProps(),

  setup (props, { slots, attrs }) {
    const link = useLink(props, attrs)
    const isActive = computed(() => props.active || link.isActive?.value)
    const color = computed(() => isActive.value ? props.activeColor : props.color)

    const { textColorClasses, textColorStyles } = useTextColor(color)

    useRender(() => {
      const Tag = link.isLink.value ? 'a' : props.tag

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
            props.class,
          ]}
          style={[
            textColorStyles.value,
            props.style,
          ]}
          href={ link.href.value }
          aria-current={ isActive.value ? 'page' : undefined }
          onClick={ link.navigate }
        >
          { slots.default?.() ?? props.title }
        </Tag>
      )
    })

    return {}
  },
})

export type VBreadcrumbsItem = InstanceType<typeof VBreadcrumbsItem>

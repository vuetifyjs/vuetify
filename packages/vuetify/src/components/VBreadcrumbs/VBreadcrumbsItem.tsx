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
}, 'VBreadcrumbsItem')

export const VBreadcrumbsItem = genericComponent()({
  name: 'VBreadcrumbsItem',

  props: makeVBreadcrumbsItemProps(),

  setup (props, { slots, attrs }) {
    const link = useLink(props, attrs)
    const isActive = computed(() => props.active || link.isActive?.value)

    const { textColorClasses, textColorStyles } = useTextColor(
      () => isActive.value ? props.activeColor : props.color
    )

    useRender(() => {
      return (
        <props.tag
          class={[
            'v-breadcrumbs-item',
            {
              'v-breadcrumbs-item--active': isActive.value,
              'v-breadcrumbs-item--disabled': props.disabled,
              [`${props.activeClass}`]: isActive.value && props.activeClass,
            },
            textColorClasses.value,
            props.class,
          ]}
          style={[
            textColorStyles.value,
            props.style,
          ]}
          aria-current={ isActive.value ? 'page' : undefined }
        >
          { !link.isLink.value ? slots.default?.() ?? props.title : (
            <a
              class="v-breadcrumbs-item--link"
              onClick={ link.navigate }
              { ...link.linkProps }
            >
              { slots.default?.() ?? props.title }
            </a>
          )}
        </props.tag>
      )
    })
    return {}
  },
})

export type VBreadcrumbsItem = InstanceType<typeof VBreadcrumbsItem>

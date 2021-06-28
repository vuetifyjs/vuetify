// Styles
import './VBreadcrumbs.sass'

// Components
import VBreadcrumbsItem from './VBreadcrumbsItem'
import VBreadcrumbsDivider from './VBreadcrumbsDivider'
import { VIcon } from '@/components/VIcon'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeSizeProps, useSize } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { useTextColor } from '@/composables/color'

// Utilities
import { computed, defineComponent, provide, toRef } from 'vue'
import { makeProps } from '@/util'

// Types
import type { InjectionKey, Prop, Ref } from 'vue'

interface BreadcrumbsInstance {
  color: Ref<string | undefined>
  disabled: Ref<boolean>
}

export const VBreadcrumbsSymbol: InjectionKey<BreadcrumbsInstance> = Symbol.for('vuetify:timeline')

export default defineComponent({
  name: 'VBreadcrumbs',

  props: makeProps({
    color: String,
    disabled: Boolean,
    divider: {
      type: String,
      default: '/',
    },
    icon: String,
    items: {
      type: Array,
      default: () => ([]),
    } as Prop<any[]> as any,
    itemText: {
      type: String,
      default: 'text',
    },
    itemHref: {
      type: String,
      default: 'href',
    },

    ...makeDensityProps(),
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeTagProps({ tag: 'ul' }),
  }),

  setup (props, { slots }) {
    const { densityClasses } = useDensity(props, 'v-breadcrumbs')
    const { roundedClasses } = useRounded(props, 'v-breadcrumbs')
    const { sizeClasses, sizeStyles } = useSize(props, 'v-breadcrumbs')
    const { textColorClasses, textColorStyles } = useTextColor(toRef(props, 'color'))
    const items = computed(() => {
      return props.items.map((item: any, index: number, array: any[]) => {
        return {
          props: {
            disabled: index >= array.length - 1,
            href: typeof item === 'string' ? item : item[props.itemHref],
            text: typeof item === 'string' ? item : item[props.itemText],
          },
        }
      })
    })

    provide(VBreadcrumbsSymbol, {
      color: toRef(props, 'color'),
      disabled: toRef(props, 'disabled'),
    })

    return () => (
      <props.tag
        class={[
          'v-breadcrumbs',
          densityClasses.value,
          roundedClasses.value,
          sizeClasses.value,
          textColorClasses.value,
        ]}
        style={[
          textColorStyles.value,
          sizeStyles.value,
        ]}
      >
        { props.icon && (
          <VIcon icon={ props.icon } left></VIcon>
        ) }

        { items.value.map((item: any, index: number) => (
          <>
            <VBreadcrumbsItem
              key={ index }
              { ...item.props }
            >
              { slots.item?.({ ...item, index }) }
            </VBreadcrumbsItem>

            { index < props.items.length - 1 && (
              <VBreadcrumbsDivider>{ props.divider }</VBreadcrumbsDivider>
            ) }
          </>
        )) }

        { slots.default?.() }
      </props.tag>
    )
  },
})

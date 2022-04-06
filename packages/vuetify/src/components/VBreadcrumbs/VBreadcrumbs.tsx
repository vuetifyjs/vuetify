// Styles
import './VBreadcrumbs.sass'

// Components
import { VIcon } from '@/components/VIcon'
import { VBreadcrumbsItem } from './VBreadcrumbsItem'
import { VBreadcrumbsDivider } from './VBreadcrumbsDivider'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { provideDefaults } from '@/composables/defaults'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { toRef } from 'vue'
import { defineComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { LinkProps } from '@/composables/router'

export type BreadcrumbItem = string | (LinkProps & {
  text: string
})

export const VBreadcrumbs = defineComponent({
  name: 'VBreadcrumbs',

  props: {
    activeClass: String,
    bgColor: String,
    color: String,
    disabled: Boolean,
    divider: {
      type: String,
      default: '/',
    },
    icon: String,
    items: {
      type: Array as PropType<BreadcrumbItem[]>,
      default: () => ([]),
    },

    ...makeDensityProps(),
    ...makeRoundedProps(),
    ...makeTagProps({ tag: 'ul' }),
  },

  setup (props, { slots }) {
    const { densityClasses } = useDensity(props)
    const { roundedClasses } = useRounded(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'bgColor'))

    provideDefaults({
      VBreadcrumbsItem: {
        activeClass: toRef(props, 'activeClass'),
        color: toRef(props, 'color'),
        disabled: toRef(props, 'disabled'),
      },
    })

    useRender(() => (
      <props.tag
        class={[
          'v-breadcrumbs',
          backgroundColorClasses.value,
          densityClasses.value,
          roundedClasses.value,
        ]}
        style={ backgroundColorStyles.value }
      >
        { props.icon && (
          <VIcon icon={ props.icon } left />
        ) }

        { props.items.map((item, index, array) => (
          <>
            <VBreadcrumbsItem
              key={ index }
              disabled={ index >= array.length - 1 }
              { ...(typeof item === 'string' ? { text: item } : item) }
              v-slots={{
                default: slots.text ? () => slots.text?.({ item, index }) : undefined,
              }}
            />

            { index < array.length - 1 && (
              <VBreadcrumbsDivider>
                { slots.divider?.({ item, index }) ?? props.divider }
              </VBreadcrumbsDivider>
            ) }
          </>
        )) }

        { slots.default?.() }
      </props.tag>
    ))

    return {}
  },
})

export type VBreadcrumbs = InstanceType<typeof VBreadcrumbs>

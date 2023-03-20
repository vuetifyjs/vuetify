// Styles
import './VBreadcrumbs.sass'

// Components
import { VBreadcrumbsDivider } from './VBreadcrumbsDivider'
import { VBreadcrumbsItem } from './VBreadcrumbsItem'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'

// Composables
import { IconValue } from '@/composables/icons'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { provideDefaults } from '@/composables/defaults'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { genericComponent, useRender } from '@/util'
import { toRef } from 'vue'

// Types
import type { LinkProps } from '@/composables/router'
import type { PropType } from 'vue'
import type { SlotsToProps } from '@/util'

export type BreadcrumbItem = string | (LinkProps & {
  text: string
  disabled?: boolean
})

export const VBreadcrumbs = genericComponent<new <T>() => {
  $props: {
    items?: T[]
  } & SlotsToProps<{
    prepend: []
    title: [{ item: T, index: number }]
    divider: [{ item: T, index: number }]
    default: []
  }>
}>()({
  name: 'VBreadcrumbs',

  props: {
    activeClass: String,
    activeColor: String,
    bgColor: String,
    color: String,
    disabled: Boolean,
    divider: {
      type: String,
      default: '/',
    },
    icon: IconValue,
    items: {
      type: Array as PropType<BreadcrumbItem[]>,
      default: () => ([]),
    },

    ...makeDensityProps(),
    ...makeRoundedProps(),
    ...makeTagProps({ tag: 'ul' }),
  },

  setup (props, { slots }) {
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'bgColor'))
    const { densityClasses } = useDensity(props)
    const { roundedClasses } = useRounded(props)

    provideDefaults({
      VBreadcrumbsDivider: {
        divider: toRef(props, 'divider'),
      },
      VBreadcrumbsItem: {
        activeClass: toRef(props, 'activeClass'),
        activeColor: toRef(props, 'activeColor'),
        color: toRef(props, 'color'),
        disabled: toRef(props, 'disabled'),
      },
    })

    useRender(() => {
      const hasPrepend = !!(slots.prepend || props.icon)

      return (
        <props.tag
          class={[
            'v-breadcrumbs',
            backgroundColorClasses.value,
            densityClasses.value,
            roundedClasses.value,
          ]}
          style={ backgroundColorStyles.value }
        >
          { hasPrepend && (
            <VDefaultsProvider
              key="prepend"
              defaults={{
                VIcon: {
                  icon: props.icon,
                  start: true,
                },
              }}
            >
              <div class="v-breadcrumbs__prepend">
                { slots.prepend
                  ? slots.prepend()
                  : props.icon && (<VIcon />)
                }
              </div>
            </VDefaultsProvider>
          )}

          { props.items.map((item, index, array) => (
            <>
              <VBreadcrumbsItem
                key={ index }
                disabled={ index >= array.length - 1 }
                { ...(typeof item === 'string' ? { title: item } : item) }
                v-slots={{
                  default: slots.title ? () => slots.title?.({ item, index }) : undefined,
                }}
              />

              { index < array.length - 1 && (
                <VBreadcrumbsDivider
                  v-slots={{
                    default: slots.divider ? () => slots.divider?.({ item, index }) : undefined,
                  }}
                />
              )}
            </>
          ))}

          { slots.default?.() }
        </props.tag>
      )
    })

    return {}
  },
})

export type VBreadcrumbs = InstanceType<typeof VBreadcrumbs>

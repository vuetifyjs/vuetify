// Styles
import './VBreadcrumbs.sass'

// Components
import { VBreadcrumbsDivider } from './VBreadcrumbsDivider'
import { VBreadcrumbsItem } from './VBreadcrumbsItem'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'

// Composables
import { IconValue } from '@/composables/icons'
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { provideDefaults } from '@/composables/defaults'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'
import { computed, toRef } from 'vue'

// Types
import type { LinkProps } from '@/composables/router'
import type { PropType } from 'vue'
import type { GenericProps } from '@/util'

export type BreadcrumbItem = string | (Partial<LinkProps> & {
  title: string
  disabled?: boolean
})

export const makeVBreadcrumbsProps = propsFactory({
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

  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeRoundedProps(),
  ...makeTagProps({ tag: 'ul' }),
}, 'v-breadcrumbs')

export const VBreadcrumbs = genericComponent<new <T extends BreadcrumbItem>(
  props: {
    items?: T[]
  },
  slots: {
    prepend: []
    title: [{ item: T, index: number }]
    divider: [{ item: T, index: number }]
    default: []
  }
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VBreadcrumbs',

  props: makeVBreadcrumbsProps(),

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

    const items = computed(() => props.items.map(item => {
      return typeof item === 'string' ? { item: { title: item }, raw: item } : { item, raw: item }
    }))

    useRender(() => {
      const hasPrepend = !!(slots.prepend || props.icon)

      return (
        <props.tag
          class={[
            'v-breadcrumbs',
            backgroundColorClasses.value,
            densityClasses.value,
            roundedClasses.value,
            props.class,
          ]}
          style={[
            backgroundColorStyles.value,
            props.style,
          ]}
        >
          { hasPrepend && (
            <div key="prepend" class="v-breadcrumbs__prepend">
              { !slots.prepend ? (
                <VIcon
                  key="prepend-icon"
                  start
                  icon={ props.icon }
                />
              ) : (
                <VDefaultsProvider
                  key="prepend-defaults"
                  disabled={ !props.icon }
                  defaults={{
                    VIcon: {
                      icon: props.icon,
                      start: true,
                    },
                  }}
                  v-slots:default={ slots.prepend }
                />
              )}
            </div>
          )}

          { items.value.map(({ item, raw }, index, array) => (
            <>
              <VBreadcrumbsItem
                key={ item.title }
                disabled={ index >= array.length - 1 }
                { ...item }
                v-slots={{
                  default: slots.title ? () => slots.title?.({ item: raw, index }) : undefined,
                }}
              />

              { index < array.length - 1 && (
                <VBreadcrumbsDivider
                  v-slots={{
                    default: slots.divider ? () => slots.divider?.({ item: raw, index }) : undefined,
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

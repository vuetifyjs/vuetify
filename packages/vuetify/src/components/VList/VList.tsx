// Styles
import './VList.sass'

// Components
import { VListSubheader } from './VListSubheader'
import { VListChildren } from './VListChildren'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { useBackgroundColor } from '@/composables/color'
import { makeThemeProps, useTheme } from '@/composables/theme'
import { makeNestedProps, useNested } from '@/composables/nested/nested'

// Utilities
import { computed, inject, provide, ref, toRef } from 'vue'
import { genericComponent, useRender } from '@/util'

// Types
import type { InjectionKey, Prop, Ref } from 'vue'
import type { MakeSlots } from '@/util'
import type { ListGroupHeaderSlot } from './VListGroup'

export type ListItem = {
  children?: ListItem[]
  value?: string
}

// Depth
export const DepthKey: InjectionKey<Ref<number>> = Symbol.for('vuetify:depth')

export const useDepth = (hasPrepend?: Ref<boolean>) => {
  const parent = inject(DepthKey, ref(-1))

  const depth = computed(() => parent.value + 1 + (hasPrepend?.value ? 1 : 0))

  provide(DepthKey, depth)

  return depth
}

// List
export const ListKey: InjectionKey<{
  hasPrepend: Ref<boolean>
  updateHasPrepend: (value: boolean) => void
}> = Symbol.for('vuetify:list')

export const createList = () => {
  const parent = inject(ListKey, { hasPrepend: ref(false), updateHasPrepend: () => null })

  const data = {
    hasPrepend: ref(false),
    updateHasPrepend: (value: boolean) => {
      if (value) data.hasPrepend.value = value
    },
  }

  provide(ListKey, data)

  return parent
}

export const useList = () => {
  return inject(ListKey, null)
}

export const VList = genericComponent<new <T>() => {
  $props: {
    items?: T[]
  }
  $slots: MakeSlots<{
    subheader: []
    header: [ListGroupHeaderSlot]
    item: [T]
  }>
}>()({
  name: 'VList',

  props: {
    color: String,
    disabled: Boolean,
    lines: {
      type: String,
      default: 'one',
    },
    nav: Boolean,
    subheader: {
      type: [Boolean, String],
      default: false,
    },
    items: Array as Prop<ListItem[]>,

    ...makeNestedProps({
      selectStrategy: 'leaf' as const,
      openStrategy: 'multiple' as const,
      activeStrategy: 'single' as const,
    }),
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
  },

  emits: {
    'update:selected': (val: string[]) => true,
    'update:opened': (val: string[]) => true,
    'update:active': (val: string[]) => true,
  },

  setup (props, { slots }) {
    const { themeClasses } = useTheme(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { borderClasses } = useBorder(props, 'v-list')
    const { densityClasses } = useDensity(props, 'v-list')
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props, 'v-list')
    const { open, select, activate } = useNested(props)
    const depth = useDepth()
    createList()

    useRender(() => {
      const hasHeader = typeof props.subheader === 'string' || slots.subheader

      return (
        <props.tag
          class={[
            'v-list',
            {
              'v-list--disabled': props.disabled,
              'v-list--nav': props.nav,
              'v-list--subheader': props.subheader,
              'v-list--subheader-sticky': props.subheader === 'sticky',
              [`v-list--${props.lines}-line`]: true,
            },
            themeClasses.value,
            backgroundColorClasses.value,
            borderClasses.value,
            densityClasses.value,
            elevationClasses.value,
            roundedClasses.value,
          ]}
          style={[
            backgroundColorStyles.value,
            dimensionStyles.value,
            {
              '--v-list-depth': depth.value,
            },
          ]}
        >
          { hasHeader && (
            slots.subheader
              ? slots.subheader()
              : <VListSubheader>{ props.subheader }</VListSubheader>
          ) }

          <VListChildren
            items={props.items}
            v-slots={{
              default: slots.default,
              item: slots.item,
              externalHeader: slots.header,
            }}
          />
        </props.tag>
      )
    })

    return {
      open,
      select,
      activate,
    }
  },
})

export type VList = InstanceType<typeof VList>

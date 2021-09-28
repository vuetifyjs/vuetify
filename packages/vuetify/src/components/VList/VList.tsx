// Styles
import './VList.sass'

// Components
import { VListSubheader } from './VListSubheader'

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
import { inject, provide, ref, toRef } from 'vue'
import { defineComponent, useRender } from '@/util'
import { renderItems } from './utils'

// Types
import type { InjectionKey, Prop, Ref } from 'vue'
import type { ListItem } from './utils'

export const DepthKey: InjectionKey<number> = Symbol.for('vuetify:depth')

export const useDepth = () => {
  const parent = inject(DepthKey, -1)

  const depth = parent + 1

  provide(DepthKey, depth)

  return depth
}

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
  return inject(ListKey)
}

export const VList = defineComponent({
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

  setup (props, { slots }) {
    const { themeClasses } = useTheme(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { borderClasses } = useBorder(props, 'v-list')
    const { densityClasses } = useDensity(props, 'v-list')
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props, 'v-list')
    const { open, select, activate } = useNested(props)
    createList()
    const depth = useDepth()

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
              '--v-list-depth': depth,
            },
          ]}
        >
          { hasHeader && (
            slots.subheader
              ? slots.subheader()
              : <VListSubheader>{ props.subheader }</VListSubheader>
          ) }

          { renderItems(props, slots) }
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

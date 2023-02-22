
// Styles
import './VSkeletonLoader.sass'

// Composables
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { genericComponent, useRender } from '@/util'

export const rootTypes = ['avatar', 'button', 'heading', 'subheading', 'image', 'sheet', 'text']

export const VSkeletonBone = genericComponent()({
  name: 'VSkeletonBone',

  props: {
    boilerplate: Boolean,
    loading: Boolean,
    type: {
      type: String,
      validator: (val: string) => rootTypes.includes(val),
      default: 'image',
    },

    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeThemeProps(),
    ...makeDimensionProps(),
  },

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)

    useRender(() => (
      <div
        class={[
          'v-skeleton-bone',
          `v-skeleton-bone__${props.type}`,
          themeClasses.value,
          elevationClasses.value,
          roundedClasses.value,
        ]}
        style={[
          dimensionStyles.value,
        ]}
        aria-busy="true"
        aria-live="polite"
        role="alert"
      >
        { slots.default?.() }
    </div>
    ))

    return {}
  },
})

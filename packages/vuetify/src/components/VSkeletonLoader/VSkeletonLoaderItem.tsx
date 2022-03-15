
// Styles
import './VSkeletonLoader.sass'

// Composables
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { defineComponent, useRender } from '@/util'

const rootTypes = {
  avatar: 'avatar',
  button: 'button',
  chip: 'chip',
  heading: 'heading',
  image: 'image',
  text: 'text',
} as Record<string, string>

export const VSkeletonLoaderItem = defineComponent({
  props: {
    boilerplate: Boolean,
    loading: Boolean,
    type: {
      type: String,
      validator: (val: string) => val in Object.keys(rootTypes),
      default: '',
    },
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeThemeProps(),
    ...makeDimensionProps(),
  },
  setup (props) {
    const { themeClasses } = provideTheme(props)
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)

    useRender(() => (
      <div
        class={[
          'v-skeleton-loader',
          'v-skeleton-loader__bone',
          {
            'v-skeleton-loader--boilerplate': props.boilerplate,
            'v-skeleton-loader--is-loading': props.loading,
          },
          `v-skeleton-loader__${props.type}`,
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
      />
    ))
  },
})

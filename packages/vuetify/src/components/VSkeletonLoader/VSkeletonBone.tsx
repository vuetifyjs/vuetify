
// Styles
import './VSkeletonBone.sass'

// Composables
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeRoundedProps, useRounded } from '@/composables/rounded'

// Utilities
import { genericComponent, useRender } from '@/util'

export const rootTypes = [
  'avatar',
  'button',
  'divider',
  'heading',
  'subheading',
  'image',
  'sheet',
  'text',
]

export const VSkeletonBone = genericComponent()({
  name: 'VSkeletonBone',

  props: {
    type: {
      type: String,
      validator: (val: string) => rootTypes.includes(val),
      default: 'image',
    },

    ...makeDimensionProps(),
    ...makeRoundedProps(),
  },

  setup (props, { slots }) {
    const { dimensionStyles } = useDimension(props)
    const { roundedClasses } = useRounded(props)

    useRender(() => (
      <div
        class={[
          'v-skeleton-bone',
          `v-skeleton-bone__${props.type}`,
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

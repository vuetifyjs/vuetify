// Styles
import './VResponsive.sass'

// Composables
import { makeDimensionProps, useDimension } from '@/composables/dimensions'

// Utilities
import { computed } from 'vue'
import { genericComponent, useRender } from '@/util'

export type VResponsiveSlots = {
  default: []
  additional: []
}

export function useAspectStyles (props: { aspectRatio?: string | number }) {
  return {
    aspectStyles: computed(() => {
      const ratio = Number(props.aspectRatio)

      return ratio
        ? { paddingBottom: String(1 / ratio * 100) + '%' }
        : undefined
    }),
  }
}

export const VResponsive = genericComponent<VResponsiveSlots>()({
  name: 'VResponsive',

  props: {
    aspectRatio: [String, Number],
    contentClass: String,

    ...makeDimensionProps(),
  },

  setup (props, { slots }) {
    const { aspectStyles } = useAspectStyles(props)
    const { dimensionStyles } = useDimension(props)

    useRender(() => (
      <div class="v-responsive" style={ dimensionStyles.value }>
        <div class="v-responsive__sizer" style={ aspectStyles.value } />

        { slots.additional?.() }

        { slots.default && (
          <div class={['v-responsive__content', props.contentClass]}>{ slots.default() }</div>
        )}
      </div>
    ))

    return {}
  },
})

export type VResponsive = InstanceType<typeof VResponsive>

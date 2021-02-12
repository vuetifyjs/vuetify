import './VResponsive.sass'

import { defineComponent, computed } from 'vue'
import makeProps from '@/util/makeProps'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'

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

export default defineComponent({
  name: 'VResponsive',

  props: makeProps({
    aspectRatio: [String, Number],
    contentClass: String,
    ...makeDimensionProps(),
  }),

  setup (props, { slots }) {
    const { dimensionStyles } = useDimension(props)
    const { aspectStyles } = useAspectStyles(props)

    return () => (
      <div class="v-responsive" style={ dimensionStyles.value }>
        <div class="v-responsive__sizer" style={ aspectStyles.value } />
        { slots.additional?.() }
        <div class={['v-responsive__content', props.contentClass]}>{ slots.default?.() }</div>
      </div>
    )
  },
})

// Styles
import './VResponsive.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'

// Utilities
import { computed } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

export type VResponsiveSlots = {
  default: never
  additional: never
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

export const makeVResponsiveProps = propsFactory({
  aspectRatio: [String, Number],
  contentClass: String,
  inline: Boolean,

  ...makeComponentProps(),
  ...makeDimensionProps(),
}, 'v-responsive')

export const VResponsive = genericComponent<VResponsiveSlots>()({
  name: 'VResponsive',

  props: makeVResponsiveProps(),

  setup (props, { slots }) {
    const { aspectStyles } = useAspectStyles(props)
    const { dimensionStyles } = useDimension(props)

    useRender(() => (
      <div
        class={[
          'v-responsive',
          { 'v-responsive--inline': props.inline },
          props.class,
        ]}
        style={[
          dimensionStyles.value,
          props.style,
        ]}
      >
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

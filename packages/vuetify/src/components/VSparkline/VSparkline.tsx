// Components
import { makeVBarlineProps, VBarline } from './VBarline'
import { makeVTrendlineProps, VTrendline } from './VTrendline'

// Composables
import { useTextColor } from '@/composables/color'

// Utilities
import { computed, toRef } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

// Types

export const makeVSparklineProps = propsFactory({
  type: {
    type: String as PropType<'trend' | 'bar'>,
    default: 'trend',
  },

  ...makeVBarlineProps(),
  ...makeVTrendlineProps(),
}, 'VSparkline')

export type VSparklineSlots = {
  default: void
  label: { index: number, value: string }
}

export const VSparkline = genericComponent<VSparklineSlots>()({
  name: 'VSparkline',

  props: makeVSparklineProps(),

  setup (props, { slots }) {
    const { textColorClasses, textColorStyles } = useTextColor(toRef(props, 'color'))
    const hasLabels = computed(() => {
      return Boolean(
        props.showLabels ||
        props.labels.length > 0 ||
        !!slots?.label
      )
    })
    const totalHeight = computed(() => {
      let height = parseInt(props.height, 10)

      if (hasLabels.value) height += parseInt(props.labelSize, 10) * 1.5

      return height
    })

    useRender(() => {
      const Tag = props.type === 'trend' ? VTrendline : VBarline
      const lineProps = props.type === 'trend' ? VTrendline.filterProps(props) : VBarline.filterProps(props)

      return (
        <Tag
          key={ props.type }
          class={ textColorClasses.value }
          style={ textColorStyles.value }
          viewBox={ `0 0 ${props.width} ${parseInt(totalHeight.value, 10)}` }
          { ...lineProps }
          v-slots={ slots }
        />
      )
    })
  },
})

export type VSparkline = InstanceType<typeof VSparkline>

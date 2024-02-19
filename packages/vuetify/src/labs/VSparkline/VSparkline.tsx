// Components
import { makeVBarlineProps, VBarline } from './VBarline'
import { makeVTrendlineProps, VTrendline } from './VTrendline'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

// Types

export const makeVSparklineProps = propsFactory({
  type: {
    type: String as PropType<'trend' | 'bar'>,
    default: 'trend',
  },

  ...makeVTrendlineProps(),
  ...makeVBarlineProps(),
}, 'VSparkline')

export type VSparklineSlots = {
  label: never
}

export const VSparkline = genericComponent<VSparklineSlots>()({
  name: 'VSparkline',

  props: makeVSparklineProps(),

  setup (props, { slots }) {
    useRender(() => {
      const trendlineProps = VTrendline.filterProps(props)
      const barlineProps = VBarline.filterProps(props)

      return props.type === 'trend' ? (
        <VTrendline { ...trendlineProps } v-slots={ slots } />
      ) : (
        <VBarline { ...barlineProps } v-slot={ slots } />
      )
    })
  },
})

export type VSparkline = InstanceType<typeof VSparkline>

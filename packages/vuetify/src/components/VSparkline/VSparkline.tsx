// Components
import { makeVBarlineProps, VBarline } from './VBarline'
import { makeVTrendlineProps, VTrendline } from './VTrendline'

// Composables
import { useTextColor } from '@/composables/color'

// Utilities
import { computed, inject, onScopeDispose, toRef } from 'vue'
import { VSparklineGroupSymbol } from '@/labs/VSparklineGroup/sparklineGroup'
import { genericComponent, getCurrentInstance, getPropertyFromItem, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

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
  tooltip: { index: number, value: number }
}

export const VSparkline = genericComponent<VSparklineSlots>()({
  name: 'VSparkline',

  props: makeVSparklineProps(),

  emits: {
    'update:currentIndex': (_index: number | null) => true,
  },

  setup (props, { slots, emit }) {
    const { textColorClasses, textColorStyles } = useTextColor(() => props.color)
    const group = inject(VSparklineGroupSymbol, null)
    const hasOwnHeight = 'height' in (getCurrentInstance('VSparkline').vnode.props ?? {})
    const hasOwnScale = toRef(() => props.min != null || props.max != null)

    if (group) {
      onScopeDispose(group.register(() => ({
        type: props.type,
        values: props.modelValue.map(item => Number(getPropertyFromItem(item, props.itemValue, item))),
        color: props.color,
        shared: !hasOwnScale.value,
      })))
    }

    const hasLabels = computed(() => {
      return Boolean(
        props.showLabels ||
        props.labels.length > 0 ||
        !!slots?.label
      )
    })
    const groupProps = computed(() => group && {
      width: group.width.value,
      height: hasOwnHeight ? props.height : group.height.value,
      padding: 0,
      tooltip: false,
      labels: [],
      showLabels: false,
      ...(!hasOwnScale.value && { min: group.domain.value[0], max: group.domain.value[1] }),
    })

    const totalHeight = computed(() => {
      if (groupProps.value) return Number(groupProps.value.height)

      let height = parseInt(props.height, 10)

      if (hasLabels.value) height += parseInt(props.labelSize, 10) * 1.5

      return height
    })

    useRender(() => {
      const Tag = props.type === 'trend' ? VTrendline : VBarline
      const lineProps = {
        ...(props.type === 'trend' ? VTrendline.filterProps(props) : VBarline.filterProps(props)),
        ...groupProps.value,
      }
      const width = groupProps.value?.width ?? props.width

      return (
        <Tag
          key={ props.type }
          class={ textColorClasses.value }
          style={ textColorStyles.value }
          viewBox={ `0 0 ${width} ${totalHeight.value}` }
          { ...lineProps }
          onUpdate:currentIndex={ (v: number | null) => emit('update:currentIndex', v) }
          v-slots={ slots }
        />
      )
    })
  },
})

export type VSparkline = InstanceType<typeof VSparkline>

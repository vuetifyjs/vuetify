// Utilities
import { convertToUnit, defineFunctionalComponent } from '@/util'

// Types
import type { PropType } from 'vue'

export const VDataTableColumn = defineFunctionalComponent({
  align: {
    type: String as PropType<'start' | 'center' | 'end'>,
    default: 'start',
  },
  fixed: Boolean,
  fixedOffset: [Number, String],
  height: [Number, String],
  lastFixed: Boolean,
  noPadding: Boolean,
  tag: String,
  width: [Number, String],
  maxWidth: [Number, String],
  nowrap: Boolean,
}, (props, { slots }) => {
  const Tag = props.tag ?? 'td'
  return (
    <Tag
      class={[
        'v-data-table__td',
        {
          'v-data-table-column--fixed': props.fixed,
          'v-data-table-column--last-fixed': props.lastFixed,
          'v-data-table-column--no-padding': props.noPadding,
          'v-data-table-column--nowrap': props.nowrap,
        },
        `v-data-table-column--align-${props.align}`,
      ]}
      style={{
        height: convertToUnit(props.height),
        width: convertToUnit(props.width),
        maxWidth: convertToUnit(props.maxWidth),
        left: convertToUnit(props.fixedOffset || null),
      }}
    >
      { slots.default?.() }
    </Tag>
  )
})

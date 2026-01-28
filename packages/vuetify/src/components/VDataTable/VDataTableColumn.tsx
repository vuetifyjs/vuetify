// Utilities
import { convertToUnit, defineFunctionalComponent, renderSlot } from '@/util'

// Types
import type { PropType } from 'vue'

export const VDataTableColumn = defineFunctionalComponent({
  align: {
    type: String as PropType<'start' | 'center' | 'end'>,
    default: 'start',
  },
  fixed: {
    type: [Boolean, String] as PropType<boolean | 'start' | 'end'>,
    default: false,
  },
  fixedOffset: [Number, String],
  fixedEndOffset: [Number, String],
  height: [Number, String],
  lastFixed: Boolean,
  firstFixedEnd: Boolean,

  noPadding: Boolean,
  indent: [Number, String],
  empty: Boolean,

  tag: String,
  width: [Number, String],
  maxWidth: [Number, String],
  nowrap: Boolean,
}, (props, { slots }) => {
  const Tag = props.tag ?? 'td'

  const fixedSide = typeof props.fixed === 'string' ? props.fixed
    : props.fixed ? 'start'
    : 'none'

  return (
    <Tag
      class={[
        'v-data-table__td',
        {
          'v-data-table-column--fixed': fixedSide === 'start',
          'v-data-table-column--fixed-end': fixedSide === 'end',
          'v-data-table-column--last-fixed': props.lastFixed,
          'v-data-table-column--first-fixed-end': props.firstFixedEnd,
          'v-data-table-column--no-padding': props.noPadding,
          'v-data-table-column--nowrap': props.nowrap,
          'v-data-table-column--empty': props.empty,
        },
        `v-data-table-column--align-${props.align}`,
      ]}
      style={{
        height: convertToUnit(props.height),
        width: convertToUnit(props.width),
        maxWidth: convertToUnit(props.maxWidth),
        left: fixedSide === 'start' ? convertToUnit(props.fixedOffset || null) : undefined,
        right: fixedSide === 'end' ? convertToUnit(props.fixedEndOffset || null) : undefined,
        paddingInlineStart: props.indent ? convertToUnit(props.indent) : undefined,
      }}
    >
      { renderSlot(slots, 'default') }
    </Tag>
  )
})

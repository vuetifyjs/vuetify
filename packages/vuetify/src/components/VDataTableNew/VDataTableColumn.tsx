import { convertToUnit } from '@/util'
import type { SetupContext } from 'vue'

export function VDataTableColumn (props: {
  tag?: string
  height?: number | string
  width?: number | string
  fixedOffset?: number | string
  fixed?: boolean
  lastFixed?: boolean
  align?: 'start' | 'end'
  noPadding?: boolean
}, { slots, attrs }: SetupContext) {
  const Tag = props.tag ?? 'td'
  return (
    <Tag
      class={[
        'v-data-table__td',
        {
          'v-data-table-column--fixed': props.fixed,
          'v-data-table-column--last-fixed': props.lastFixed,
          'v-data-table-column--no-padding': props.noPadding,
        },
        `v-data-table-column--align-${props.align ?? 'start'}`,
      ]}
      style={{
        height: convertToUnit(props.height),
        width: convertToUnit(props.width),
        left: convertToUnit(props.fixedOffset),
      }}
      { ...attrs }
    >
      { slots.default?.() }
    </Tag>
  )
}

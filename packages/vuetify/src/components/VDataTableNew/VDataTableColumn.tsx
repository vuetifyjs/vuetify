import { convertToUnit } from '@/util'
import type { SetupContext } from 'vue'

export function VDataTableColumn (props: {
  height?: number | string
  width?: number | string
  fixedOffset?: number | string
  fixed?: boolean
}, { slots, attrs }: SetupContext) {
  return (
    <td
      class={[
        'v-data-table__td',
        {
          'v-data-table-column--fixed': props.fixed,
        },
      ]}
      style={{
        height: convertToUnit(props.height),
        width: convertToUnit(props.width),
        left: convertToUnit(props.fixedOffset),
      }}
    >
      { slots.default?.() }
    </td>
  )
}

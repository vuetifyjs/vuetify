import { convertToUnit } from '@/util'
import type { SetupContext } from 'vue'

export function VDataTableColumn (props: {
  height?: number
  stickyWidth?: number
  fixed?: boolean
}, { slots, attrs }: SetupContext) {
  return (
    <td
      class={[
        'v-data-table__td',
        {
          'v-data-table__td--fixed': props.fixed,
        },
      ]}
      style={{
        height: convertToUnit(props.height),
        left: props.fixed ? convertToUnit(props.stickyWidth ?? 0) : undefined,
      }}
      { ...attrs }
    >
      { slots.default?.() }
    </td>
  )
}

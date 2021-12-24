import { VTable } from '@/components'
import { defineComponent } from '@/util'

export const VDataTableServer = defineComponent({
  name: 'VDataTableServer',

  props: {},

  setup (props, { slots, emit }) {
    return () => (
      <VTable>
        {{
          default: () => (
            <div>hello</div>
          ),
        }}
      </VTable>
    )
  },
})

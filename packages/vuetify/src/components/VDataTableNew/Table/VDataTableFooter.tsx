import { VBtn } from '@/components'
import { defineComponent } from '@/util'
import './VDataTableFooter.sass'

export const VDataTableFooter = defineComponent({
  name: 'VDataTableFooter',

  props: {
    page: Number,
  },

  setup (props, { slots, emit }) {
    return () => (
      <div
        class="v-data-table-footer"
      >
        <VBtn icon="mdi-chevron-left" variant="plain" onClick={() => emit('previous-page') } />
        { props.page }
        <VBtn icon="mdi-chevron-right" variant="plain" onClick={() => emit('next-page') } />
      </div>
    )
  },
})

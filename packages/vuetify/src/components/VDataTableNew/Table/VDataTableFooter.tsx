import { VBtn, VSelect } from '@/components'
import { defineComponent } from '@/util'
import './VDataTableFooter.sass'

export const VDataTableFooter = defineComponent({
  name: 'VDataTableFooter',

  props: {
    page: Number,
    itemsPerPage: Number,
    startIndex: Number,
    stopIndex: Number,
    itemsLength: Number,
  },

  setup (props, { slots, emit }) {
    return () => (
      <div
        class="v-data-table-footer"
      >
        { slots.prepend?.() }
        <div class="v-data-table-footer__items-per-page">
          <span>Items per page:</span>
          <VSelect
            items={ [10, 25, 50, 100] }
            modelValue={ props.itemsPerPage }
            onUpdate:modelValue={ v => emit('update:items-per-page', v)}
            density="compact"
            variant="plain"
            hide-details
          />
        </div>
        <div class="v-data-table-footer__info">
          <div>{ (props.startIndex ?? -1) + 1 } - { props.stopIndex ?? 0 } of { props.itemsLength ?? 0 }</div>
        </div>
        <div class="v-data-table-footer__pagination">
          <VBtn icon="mdi-chevron-left" variant="plain" onClick={() => emit('previous-page') } />
          { props.page }
          <VBtn icon="mdi-chevron-right" variant="plain" onClick={() => emit('next-page') } />
        </div>
      </div>
    )
  },
})

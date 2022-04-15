// Styles
import './VDataTableFooter.sass'

// Components
import { VBtn, VSelect } from '@/components'

// Utilities
import { defineComponent } from '@/util'

// Types
import type { PropType } from 'vue'
import type { SelectItem } from '@/components/VSelect/VSelect'

export const VDataTableFooter = defineComponent({
  name: 'VDataTableFooter',

  props: {
    page: {
      type: Number,
      required: true,
    },
    itemsPerPage: Number,
    startIndex: Number,
    stopIndex: Number,
    itemsLength: Number,
    pageCount: {
      type: Number,
      required: true,
    },
    itemsPerPageOptions: {
      type: Array as PropType<SelectItem[]>,
      default: () => ([
        { value: 10, title: '10' },
        { value: 25, title: '25' },
        { value: 50, title: '50' },
        { value: 100, title: '100' },
      ]),
    },
  },

  emits: {
    'update:itemsPerPage': (v: number) => true,
    'update:page': (v: number) => true,
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
            items={ props.itemsPerPageOptions }
            modelValue={ props.itemsPerPage }
            onUpdate:modelValue={ v => emit('update:itemsPerPage', v)}
            density="compact"
            variant="plain"
            hide-details
          />
        </div>
        <div class="v-data-table-footer__info">
          <div>{ (props.startIndex ?? -1) + 1 } - { props.stopIndex ?? 0 } of { props.itemsLength ?? 0 }</div>
        </div>
        <div class="v-data-table-footer__pagination">
          <VBtn icon="mdi-chevron-left" variant="plain" onClick={() => emit('update:page', Math.max(1, props.page - 1)) } />
          { props.page }
          <VBtn icon="mdi-chevron-right" variant="plain" onClick={() => emit('update:page', Math.min(props.pageCount, props.page + 1)) } />
        </div>
      </div>
    )
  },
})

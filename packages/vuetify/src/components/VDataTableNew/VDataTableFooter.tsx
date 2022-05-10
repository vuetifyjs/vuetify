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
    prevIcon: {
      type: String,
      default: '$prev',
    },
    nextIcon: {
      type: String,
      default: '$next',
    },
    firstIcon: {
      type: String,
      default: '$first',
    },
    lastIcon: {
      type: String,
      default: '$last',
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
    showCurrentPage: Boolean,
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
          <VBtn
            icon={ props.firstIcon }
            variant="plain"
            onClick={ () => emit('update:page', 1) }
            disabled={ props.page === 1 }
          />
          <VBtn
            icon={ props.prevIcon }
            variant="plain"
            onClick={ () => emit('update:page', Math.max(1, props.page - 1)) }
            disabled={ props.page === 1 }
          />
          { props.showCurrentPage && (
            <div>props.page</div>
          ) }
          <VBtn
            icon={ props.nextIcon }
            variant="plain"
            onClick={ () => emit('update:page', Math.min(props.pageCount, props.page + 1)) }
            disabled={ props.page === props.pageCount }
          />
          <VBtn
            icon={ props.lastIcon }
            variant="plain"
            onClick={ () => emit('update:page', props.pageCount) }
            disabled={ props.page === props.pageCount }
          />
        </div>
      </div>
    )
  },
})

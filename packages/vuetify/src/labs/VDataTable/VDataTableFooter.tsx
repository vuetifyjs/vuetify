// Styles
import './VDataTableFooter.sass'

// Components
import { VBtn, VSelect } from '@/components'

// Composables
import { usePagination } from './composables/paginate'

// Utilities
import { defineComponent } from '@/util'

// Types
import type { PropType } from 'vue'
import type { InternalItem } from '@/composables/items'

export const VDataTableFooter = defineComponent({
  name: 'VDataTableFooter',

  props: {
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
      type: Array as PropType<InternalItem[]>,
      default: () => ([
        { value: 10, title: '10' },
        { value: 25, title: '25' },
        { value: 50, title: '50' },
        { value: 100, title: '100' },
        { value: -1, title: 'All' },
      ]),
    },
    showCurrentPage: Boolean,
  },

  setup (props, { slots }) {
    const { page, pageCount, startIndex, stopIndex, itemsLength, itemsPerPage } = usePagination()

    return () => (
      <div
        class="v-data-table-footer"
      >
        { slots.prepend?.() }
        <div class="v-data-table-footer__items-per-page">
          <span>Items per page:</span>
          <VSelect
            items={ props.itemsPerPageOptions }
            modelValue={ itemsPerPage.value }
            onUpdate:modelValue={ v => itemsPerPage.value = Number(v) }
            density="compact"
            variant="outlined"
            hide-details
          />
        </div>
        <div class="v-data-table-footer__info">
          <div>{ (startIndex.value ?? -1) + 1 } - { stopIndex.value ?? 0 } of { itemsLength.value ?? 0 }</div>
        </div>
        <div class="v-data-table-footer__pagination">
          <VBtn
            icon={ props.firstIcon }
            variant="plain"
            onClick={ () => page.value = 1 }
            disabled={ page.value === 1 }
          />
          <VBtn
            icon={ props.prevIcon }
            variant="plain"
            onClick={ () => page.value = Math.max(1, page.value - 1) }
            disabled={ page.value === 1 }
          />
          { props.showCurrentPage && (
            <div key="page">page.value</div>
          ) }
          <VBtn
            icon={ props.nextIcon }
            variant="plain"
            onClick={ () => page.value = Math.min(pageCount.value, page.value + 1) }
            disabled={ page.value === pageCount.value }
          />
          <VBtn
            icon={ props.lastIcon }
            variant="plain"
            onClick={ () => page.value = pageCount.value }
            disabled={ page.value === pageCount.value }
          />
        </div>
      </div>
    )
  },
})

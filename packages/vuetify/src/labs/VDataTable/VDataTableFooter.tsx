// Styles
import './VDataTableFooter.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VSelect } from '@/components/VSelect'

// Composables
import { usePagination } from './composables/paginate'
import { useLocale } from '@/composables/locale'

// Utilities
import { computed } from 'vue'
import { genericComponent, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'

export const makeVDataTableFooterProps = propsFactory({
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
  itemsPerPageText: {
    type: String,
    default: '$vuetify.dataFooter.itemsPerPageText',
  },
  pageText: {
    type: String,
    default: '$vuetify.dataFooter.pageText',
  },
  firstPageLabel: {
    type: String,
    default: '$vuetify.dataFooter.firstPage',
  },
  prevPageLabel: {
    type: String,
    default: '$vuetify.dataFooter.prevPage',
  },
  nextPageLabel: {
    type: String,
    default: '$vuetify.dataFooter.nextPage',
  },
  lastPageLabel: {
    type: String,
    default: '$vuetify.dataFooter.lastPage',
  },
  itemsPerPageOptions: {
    type: Array as PropType<readonly { title: string, value: number }[]>,
    default: () => ([
      { value: 10, title: '10' },
      { value: 25, title: '25' },
      { value: 50, title: '50' },
      { value: 100, title: '100' },
      { value: -1, title: '$vuetify.dataFooter.itemsPerPageAll' },
    ]),
  },
  showCurrentPage: Boolean,
}, 'v-data-table-footer')

export const VDataTableFooter = genericComponent<{ prepend: never }>()({
  name: 'VDataTableFooter',

  props: makeVDataTableFooterProps(),

  setup (props, { slots }) {
    const { t } = useLocale()
    const { page, pageCount, startIndex, stopIndex, itemsLength, itemsPerPage, setItemsPerPage } = usePagination()

    const itemsPerPageOptions = computed(() => (
      props.itemsPerPageOptions.map(option => ({
        ...option,
        title: t(option.title),
      }))
    ))

    return () => (
      <div
        class="v-data-table-footer"
      >
        { slots.prepend?.() }
        <div class="v-data-table-footer__items-per-page">
          <span>{ t(props.itemsPerPageText) }</span>
          <VSelect
            items={ itemsPerPageOptions.value }
            modelValue={ itemsPerPage.value }
            onUpdate:modelValue={ v => setItemsPerPage(Number(v)) }
            density="compact"
            variant="outlined"
            hide-details
          />
        </div>
        <div class="v-data-table-footer__info">
          <div>
            { t(props.pageText, !itemsLength.value ? 0 : startIndex.value + 1, stopIndex.value, itemsLength.value) }
          </div>
        </div>
        <div class="v-data-table-footer__pagination">
          <VBtn
            icon={ props.firstIcon }
            variant="plain"
            onClick={ () => page.value = 1 }
            disabled={ page.value === 1 }
            aria-label={ t(props.firstPageLabel) }
          />
          <VBtn
            icon={ props.prevIcon }
            variant="plain"
            onClick={ () => page.value = Math.max(1, page.value - 1) }
            disabled={ page.value === 1 }
            aria-label={ t(props.prevPageLabel) }
          />
          { props.showCurrentPage && (
            <span key="page" class="v-data-table-footer__page">{ page.value }</span>
          )}
          <VBtn
            icon={ props.nextIcon }
            variant="plain"
            onClick={ () => page.value = Math.min(pageCount.value, page.value + 1) }
            disabled={ page.value === pageCount.value }
            aria-label={ t(props.nextPageLabel) }
          />
          <VBtn
            icon={ props.lastIcon }
            variant="plain"
            onClick={ () => page.value = pageCount.value }
            disabled={ page.value === pageCount.value }
            aria-label={ t(props.lastPageLabel) }
          />
        </div>
      </div>
    )
  },
})

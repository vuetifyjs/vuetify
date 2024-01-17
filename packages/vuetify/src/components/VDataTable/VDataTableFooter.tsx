// Styles
import './VDataTableFooter.sass'

// Components
import { VPagination } from '@/components/VPagination'
import { VSelect } from '@/components/VSelect'

// Composables
import { usePagination } from './composables/paginate'
import { useLocale } from '@/composables/locale'

// Utilities
import { computed } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

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
    type: Array as PropType<readonly (number | { title: string, value: number })[]>,
    default: () => ([
      { value: 10, title: '10' },
      { value: 25, title: '25' },
      { value: 50, title: '50' },
      { value: 100, title: '100' },
      { value: -1, title: '$vuetify.dataFooter.itemsPerPageAll' },
    ]),
  },
  showCurrentPage: Boolean,
}, 'VDataTableFooter')

export const VDataTableFooter = genericComponent<{ prepend: never }>()({
  name: 'VDataTableFooter',

  props: makeVDataTableFooterProps(),

  setup (props, { slots }) {
    const { t } = useLocale()
    const { page, pageCount, startIndex, stopIndex, itemsLength, itemsPerPage, setItemsPerPage } = usePagination()

    const itemsPerPageOptions = computed(() => (
      props.itemsPerPageOptions.map(option => {
        if (typeof option === 'number') {
          return {
            value: option,
            title: option === -1
              ? t('$vuetify.dataFooter.itemsPerPageAll')
              : String(option),
          }
        }

        return {
          ...option,
          title: t(option.title),
        }
      })
    ))

    useRender(() => {
      const paginationProps = VPagination.filterProps(props)

      return (
        <div class="v-data-table-footer">
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
            <VPagination
              v-model={ page.value }
              density="comfortable"
              first-aria-label={ props.firstPageLabel }
              last-aria-label={ props.lastPageLabel }
              length={ pageCount.value }
              next-aria-label={ props.nextPageLabel }
              previous-aria-label={ props.prevPageLabel }
              rounded
              show-first-last-page
              total-visible={ props.showCurrentPage ? 1 : 0 }
              variant="plain"
              { ...paginationProps }
            ></VPagination>
          </div>
        </div>
      )
    })

    return {}
  },
})

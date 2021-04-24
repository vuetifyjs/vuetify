const { DataEvents, DataProps, DataDefaultScopedSlotProps } = require('./v-data')
const { DataFooterPageTextScopedProps } = require('./v-data-footer')

const DataIteratorProps = DataProps.concat([
  { name: 'value', source: 'v-data-iterator' },
  { name: 'itemKey', source: 'v-data-iterator' },
  { name: 'singleSelect', source: 'v-data-iterator' },
  { name: 'expanded', source: 'v-data-iterator' },
  { name: 'singleExpand', source: 'v-data-iterator' },
  { name: 'loading', source: 'v-data-iterator' },
  { name: 'loadingText', source: 'v-data-iterator' },
  { name: 'noResultsText', source: 'v-data-iterator' },
  { name: 'noDataText', source: 'v-data-iterator' },
  { name: 'hideDefaultFooter', source: 'v-data-iterator' },
  { name: 'footerProps', source: 'v-data-iterator' },
])

const DataIteratorEvents = DataEvents.concat([
  { name: 'input', source: 'v-data-iterator', value: 'any[]' },
  { name: 'update:expanded', source: 'v-data-iterator', value: 'any[]' },
  { name: 'item-selected', source: 'v-data-iterator', value: '{ item: any, value: boolean }' },
  { name: 'item-expanded', source: 'v-data-iterator', value: '{ item: any, value: boolean }' },
  { name: 'toggle-select-all', source: 'v-data-iterator', value: '{ items: any[], value: boolean }' },
])

const DataIteratorSlots = [
  { name: 'default', source: 'v-data-iterator' },
  { name: 'loading', source: 'v-data-iterator' },
  { name: 'no-data', source: 'v-data-iterator' },
  { name: 'no-results', source: 'v-data-iterator' },
]

const DataIteratorItemScopedProps = {
  expand: '(v: boolean) => void',
  index: 'number',
  item: 'any',
  isExpanded: 'boolean',
  isMobile: 'boolean',
  isSelected: 'boolean',
  select: '(v: boolean) => void',
}

const DataIteratorScopedSlots = [
  {
    name: 'default',
    props: {
      ...DataDefaultScopedSlotProps,
      isSelected: '(item: any) => boolean',
      select: '(item: any, value: boolean) => void',
      isExpanded: '(item: any) => boolean',
      expand: '(item: any, value: boolean) => void',
    },
    source: 'data-iterator',
  },
  {
    name: 'footer',
    props: DataDefaultScopedSlotProps,
    source: 'data-iterator',
  },
  {
    name: 'footer.page-text',
    props: DataFooterPageTextScopedProps,
    source: 'data-iterator',
  },
  {
    name: 'header',
    props: DataDefaultScopedSlotProps,
    source: 'data-iterator',
  },
  {
    name: 'item',
    props: DataIteratorItemScopedProps,
    source: 'data-iterator',
  },
]

module.exports = {
  'v-data-iterator': {
    props: DataIteratorProps,
    slots: [
      ...DataIteratorSlots,
      ...DataIteratorScopedSlots,
    ],
    events: DataIteratorEvents,
  },
  DataIteratorProps,
  DataIteratorEvents,
  DataIteratorSlots,
  DataIteratorScopedSlots,
  DataIteratorItemScopedProps,
}

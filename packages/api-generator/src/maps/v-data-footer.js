const { DataOptions, DataPagination } = require('./v-data')

const DataFooterPageTextScopedProps = {
  pageStart: 'number',
  pageStop: 'number',
  itemsLength: 'number',
}

const DataFooterSlots = [
  { name: 'page-text', props: DataFooterPageTextScopedProps },
]

const DataFooterEvents = [
  { name: 'update:options', value: DataOptions },
]

const DataFooterProps = [
  {
    name: 'options',
    example: DataOptions,
  },
  {
    name: 'pagination',
    example: DataPagination,
  },
]

module.exports = {
  'v-data-footer': {
    props: DataFooterProps,
    slots: [
      ...DataFooterSlots,
    ],
    events: DataFooterEvents,
  },
  DataFooterSlots,
  DataFooterEvents,
  DataFooterPageTextScopedProps,
}

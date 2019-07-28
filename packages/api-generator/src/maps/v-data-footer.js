const { DataOptions, DataPagination } = require('./v-data')

const DataFooterSlots = [
  { name: 'pageText' },
]

const DataFooterEvents = [
  { name: 'update:options', value: DataOptions },
]

const DataFooterPageTextScopedProps = {
  pageStart: 'number',
  pageStop: 'number',
  itemsLength: 'number',
}

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
      {
        name: 'page-text',
        props: DataFooterPageTextScopedProps,
      },
    ],
    events: DataFooterEvents,
  },
  DataFooterSlots,
  DataFooterEvents,
  DataFooterPageTextScopedProps,
}

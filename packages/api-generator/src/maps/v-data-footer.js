const { DataOptions } = require('./v-data')

const DataFooterSlots = [
  {
    name: 'pageText',
    props: undefined,
  },
]

const DataFooterEvents = [
  { name: 'update:options', value: DataOptions },
]

const DataFooterPageTextScopedProps = {
  pageStart: 'number',
  pageStop: 'number',
  itemsLength: 'number',
}

module.exports = {
  'v-data-footer': {
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

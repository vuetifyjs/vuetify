const { DataOptions } = require('./v-data')

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

module.exports = {
  'v-data-footer': {
    slots: DataFooterSlots,
    scopedSlots: {
      name: 'page-text',
      props: DataFooterPageTextScopedProps,
    },
    events: DataFooterEvents,
  },
  DataFooterSlots,
  DataFooterEvents,
  DataFooterPageTextScopedProps,
}

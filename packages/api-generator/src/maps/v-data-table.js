const { tableHeader, dataIteratorProps, dataProps, dataTableSlots, dataTableEvents } = require('../variables')

module.exports = {
  'v-data-table': {
    props: [
      {
        name: 'headers',
        example: tableHeader
      }
    ].concat(dataIteratorProps).concat(dataProps),
    slots: dataTableSlots,
    scopedSlots: dataTableSlots,
    events: dataTableEvents
  }
}

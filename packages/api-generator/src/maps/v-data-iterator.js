const { dataIteratorProps, dataProps, dataIteratorSlots, dataIteratorScopedSlots, dataIteratorEvents } = require('../variables')

module.exports = {
  'v-data-iterator': {
    props: dataIteratorProps.concat(dataProps),
    slots: dataIteratorSlots,
    scopedSlots: dataIteratorScopedSlots,
    events: dataIteratorEvents
  }
}

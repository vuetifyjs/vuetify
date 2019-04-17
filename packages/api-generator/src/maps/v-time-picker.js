const deepmerge = require('../helpers/merge')
const { VTimeProps } = require('./v-time')
const { VPickerProps } = require('./v-picker')

module.exports = {
  'v-time-picker': {
    props: deepmerge(VPickerProps, VTimeProps),
    events: [
      {
        name: 'input',
        value: 'string',
      },
      {
        name: 'change',
        value: 'string',
      },
      {
        name: 'click:hour',
        value: 'string',
      },
      {
        name: 'click:minute',
        value: 'string',
      },
      {
        name: 'click:second',
        value: 'string',
      },
    ],
  },
}

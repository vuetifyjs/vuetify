const deepmerge = require('../helpers/merge')
const { VDateProps } = require('./v-date')
const { VPickerProps } = require('./v-picker')

module.exports = {
  'v-date-picker': {
    props: deepmerge(VPickerProps, VDateProps),
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
        name: 'update:picker-date',
        value: 'string',
      },
      {
        name: 'click:date',
        value: 'string',
      },
      {
        name: 'click:month',
        value: 'string',
      },
      {
        name: 'dblclick:date',
        value: 'string',
      },
      {
        name: 'dblclick:month',
        value: 'string',
      },
    ],
    functions: [
      {
        name: 'titleDateFormat',
        signature: '(date: string, locale: string): string',
      },
      {
        name: 'dayFormat',
        signature: '(date: string, locale: string): string',
      },
      {
        name: 'headerDateFormat',
        signature: '(date: string, locale: string): string',
      },
      {
        name: 'monthFormat',
        signature: '(date: string, locale: string): string',
      },
      {
        name: 'yearFormat',
        signature: '(date: string, locale: string): string',
      },
      {
        name: 'allowedDates',
        signature: '(date: string): boolean',
      },
    ],
  },
}

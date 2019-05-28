module.exports = {
  'v-date-picker': {
    events: [
      {
        name: 'input',
        value: 'string'
      }
    ],
    functions: [
      {
        name: 'titleDateFormat',
        signature: '(date: string, locale: string): string'
      },
      {
        name: 'dayFormat',
        signature: '(date: string, locale: string): string'
      },
      {
        name: 'headerDateFormat',
        signature: '(date: string, locale: string): string'
      },
      {
        name: 'monthFormat',
        signature: '(date: string, locale: string): string'
      },
      {
        name: 'yearFormat',
        signature: '(date: string, locale: string): string'
      },
      {
        name: 'allowedDates',
        signature: '(date: string): boolean'
      }
    ]
  }
}

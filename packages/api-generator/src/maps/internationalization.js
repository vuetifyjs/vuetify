module.exports = {
  'internationalization': {
    api: [
      {
        name: 'locales',
        default: '{ en: VuetifyLocale }',
        type: 'Record<string, VuetifyLocale>'
      },
      {
        name: 'current',
        default: 'en',
        type: 'string'
      },
      {
        name: 't',
        default: '(key: string, ...params: Array<string | number>): string',
        type: 'Function'
      }
    ]
  }
}

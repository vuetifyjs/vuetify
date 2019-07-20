module.exports = {
  'v-list-item': {
    'slots': [
      {
        'name': 'default',
        'props': [
          {
            'name': 'active',
            'value': 'boolean',
          },
          {
            'name': 'toggle',
            'value': 'boolean',
          },
        ],
      },
    ],
    'events': [
      {
        'name': 'click',
        'value': 'MouseEvent | KeyboardEvent',
      },
      {
        'name': 'keydown',
        'value': 'KeyboardEvent',
      },
    ],
  },
}

module.exports = {
  composables: [],
  props: [
    {
      name: 'absolute',
      type: 'boolean',
      default: 'false',
      source: 'position',
    },
    {
      name: 'bottom',
      type: [
        'boolean',
        'number',
        'string',
      ],
      default: 'undefined',
      source: 'position',
    },
    {
      name: 'fixed',
      type: 'boolean',
      default: 'false',
      source: 'position',
    },
    {
      name: 'left',
      type: [
        'boolean',
        'number',
        'string',
      ],
      default: 'undefined',
      source: 'position',
    },
    {
      name: 'position',
      type: 'string',
      default: 'undefined',
      source: 'position',
    },
    {
      name: 'right',
      type: [
        'boolean',
        'number',
        'string',
      ],
      default: 'undefined',
      source: 'position',
    },
    {
      name: 'top',
      type: [
        'boolean',
        'number',
        'string',
      ],
      default: 'undefined',
      source: 'position',
    },
  ],
  slots: [],
  events: [],
  functions: [],
}

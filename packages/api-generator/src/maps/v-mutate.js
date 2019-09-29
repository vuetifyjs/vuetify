module.exports = {
  'v-mutate': {
    options: [
      {
        name: 'modifiers.once',
        default: false,
        type: 'boolean',
      },
      {
        name: 'value',
        default: 'undefined',
        type: 'function',
      },
      {
        name: 'attributeFilter',
        default: 'undefined',
        type: 'string[]',
      },
      {
        name: 'attributeOldValue',
        default: 'false',
        type: 'boolean',
      },
      {
        name: 'attributes',
        default: 'true',
        type: 'boolean',
      },
      {
        name: 'characterData',
        default: 'true',
        type: 'boolean',
      },
      {
        name: 'characterDataOldValue',
        default: 'false',
        type: 'boolean',
      },
      {
        name: 'childList',
        default: 'true',
        type: 'boolean',
      },
      {
        name: 'subtree',
        default: 'false',
        type: 'boolean',
      },
    ],
  },
}

const { VTreeviewScopedProps } = require('../helpers/variables')

module.exports = {
  'v-treeview': {
    slots: [
      {
        name: 'append',
        props: VTreeviewScopedProps,
      },
      {
        name: 'label',
        props: VTreeviewScopedProps,
      },
      {
        name: 'prepend',
        props: VTreeviewScopedProps,
      },
    ],
    functions: [
      {
        name: 'updateAll',
        signature: '(val: boolean): void',
      },
    ],
    events: [
      {
        name: 'input',
        value: 'array',
      },
      {
        name: 'update:active',
        value: 'array',
      },
      {
        name: 'update:open',
        value: 'array',
      },
    ],
  },
}

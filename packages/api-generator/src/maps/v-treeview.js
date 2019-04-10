const { VTreeviewScopedProps } = require('../variables')

module.exports = {
  'v-treeview': {
    scopedSlots: [
      {
        name: 'prepend',
        props: VTreeviewScopedProps
      },
      {
        name: 'label',
        props: VTreeviewScopedProps
      },
      {
        name: 'append',
        props: VTreeviewScopedProps
      }
    ],
    functions: [
      {
        name: 'updateAll',
        signature: '(val: boolean): void'
      }
    ]
  }
}

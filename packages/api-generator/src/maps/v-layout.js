const { createItems, VGridProps } = require('../helpers/variables')

module.exports = {
  'v-layout': {
    slots: [
      {
        name: 'default',
        props: undefined,
      },
    ],
    props: [
      ...VGridProps,
      ...createItems([
        'column',
        'reverse',
        'wrap',
      ], {
        type: 'boolean',
        default: 'false',
        source: null,
      }),
      {
        name: 'row',
        type: 'boolean',
        default: 'true',
        source: null,
      },
    ],
  },
}

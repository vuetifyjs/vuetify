const { createItems, VGridProps } = require('../helpers/variables')

module.exports = {
  'v-layout': {
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

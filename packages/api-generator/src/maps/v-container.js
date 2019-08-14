const { sharedGridProps } = require('../helpers/variables')

module.exports = {
  'v-container': {
    props: [
      {
        name: 'grid-list-{xs through xl}',
        type: 'boolean',
        default: 'false',
        source: null,
      },
      {
        name: 'fluid',
        type: 'boolean',
        default: 'false',
        source: null,
      },
    ].concat(sharedGridProps),
  },
}

const { sharedGridProps } = require('../variables')

module.exports = {
  'v-container': {
    slots: ['default'],
    props: [
      {
        'name': 'grid-list-{xs through xl}',
        'type': 'boolean',
        'default': 'false',
        'source': null,
      },
      {
        'name': 'fluid',
        'type': 'boolean',
        'default': 'false',
        'source': null,
      },
    ].concat(sharedGridProps),
  },
}

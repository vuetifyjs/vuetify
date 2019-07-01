const { sharedGridProps } = require('../variables')

module.exports = {
  'v-container': {
    props: [
      {
        'name': 'grid-list-{xs through xl}',
        'type': 'Boolean',
        'default': 'false',
        'source': null,
      },
      {
        'name': 'fluid',
        'type': 'Boolean',
        'default': 'false',
        'source': null,
      },
    ].concat(sharedGridProps),
  },
}

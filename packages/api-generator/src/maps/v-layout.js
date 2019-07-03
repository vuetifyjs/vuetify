const { sharedGridProps } = require('../variables')

module.exports = {
  'v-layout': {
    props: [
      {
        'name': 'row',
        'type': 'Boolean',
        'default': 'true',
        'source': null,
      },
      {
        'name': 'column',
        'type': 'Boolean',
        'default': 'false',
        'source': null,
      },
      {
        'name': 'reverse',
        'type': 'Boolean',
        'default': 'false',
        'source': null,
      },
      {
        'name': 'wrap',
        'type': 'Boolean',
        'default': 'false',
        'source': null,
      },
    ].concat(sharedGridProps),
  },
}

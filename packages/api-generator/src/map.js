const sharedGridProps = [
  {
    'name': 'id',
    'type': 'String',
    'default': 'undefined',
    'source': null
  },
  {
    'name': 'tag',
    'type': 'String',
    'default': 'div',
    'source': null
  },
  {
    'name': 'alignBaseline',
    'type': 'Boolean',
    'default': 'false',
    'source': null
  },
  {
    'name': 'alignCenter',
    'type': 'Boolean',
    'default': 'false',
    'source': null
  },
  {
    'name': 'alignContentCenter',
    'type': 'Boolean',
    'default': 'false',
    'source': null
  },
  {
    'name': 'alignContentEnd',
    'type': 'Boolean',
    'default': 'false',
    'source': null
  },
  {
    'name': 'alignContentSpaceAround',
    'type': 'Boolean',
    'default': 'false',
    'source': null
  },
  {
    'name': 'alignContentSpaceBetween',
    'type': 'Boolean',
    'default': 'false',
    'source': null
  },
  {
    'name': 'alignContentStart',
    'type': 'Boolean',
    'default': 'false',
    'source': null
  },
  {
    'name': 'alignEnd',
    'type': 'Boolean',
    'default': 'false',
    'source': null
  },
  {
    'name': 'alignStart',
    'type': 'Boolean',
    'default': 'false',
    'source': null
  },
  {
    'name': 'd-{type}',
    'type': 'Boolean',
    'default': 'false',
    'source': null
  },
  {
    'name': 'fillHeight',
    'type': 'Boolean',
    'default': 'false',
    'source': null
  },
  {
    'name': 'justifyCenter',
    'type': 'Boolean',
    'default': 'false',
    'source': null
  },
  {
    'name': 'justifyEnd',
    'type': 'Boolean',
    'default': 'false',
    'source': null
  },
  {
    'name': 'justifySpaceAround',
    'type': 'Boolean',
    'default': 'false',
    'source': null
  },
  {
    'name': 'justifySpaceBetween',
    'type': 'Boolean',
    'default': 'false',
    'source': null
  },
  {
    'name': 'justifyStart',
    'type': 'Boolean',
    'default': 'false',
    'source': null
  },
  {
    'name': 'reverse',
    'type': 'Boolean',
    'default': 'false',
    'source': null
  },
  {
    'name': 'wrap',
    'type': 'Boolean',
    'default': 'false',
    'source': null
  }
]

dataIterableProps = [
  {
    name: 'pagination',
    sync: true
  }
]

module.exports = {
  'v-app': {
    slots: ['default']
  },
  'v-alert': {
    slots: ['default']
  },
  'v-avatar': {
    slots: ['default']
  },
  'v-badge': {
    slots: ['badge', 'default']
  },
  'v-breadcrumbs': {
    slots: ['default']
  },
  'v-breadcrumbs-item': {
    slots: ['default']
  },
  'v-bottom-nav': {
    slots: ['default']
  },
  'v-bottom-sheet': {
    slots: ['activator', 'default']
  },
  'v-btn': {
    slots: ['default']
  },
  'v-card': {
    slots: ['default']
  },
  'v-carousel': {
    slots: ['default']
  },
  'v-carousel-item': {
    slots: ['default']
  },
  'v-chip': {
    slots: ['default']
  },
  'v-container': {
    props: [
      {
        'name': 'grid-list-{xs through xl}',
        'type': 'Boolean',
        'default': 'false',
        'source': null
      },
      {
        'name': 'fluid',
        'type': 'Boolean',
        'default': 'false',
        'source': null
      }
    ].concat(sharedGridProps)
  },
  'v-data-iterator': {
    props: dataIterableProps,
    slots: [
      { name: 'footer', source: 'data-iterable' }
    ],
    scopedSlots: [
      { name: 'items', props: ['item', 'index', 'selected', 'expanded'], source: 'data-iterable' },
      { name: 'pageText', props: ['pageStart', 'pageStop', 'itemsLength'], source: 'data-iterable' }
    ]
  },
  'v-data-table': {
    props: dataIterableProps,
    slots: [
      { name: 'footer', source: 'data-iterable' }
    ],
    scopedSlots: [
      { name: 'headerCell', props: ['header'] },
      { name: 'headers', props: ['headers', 'indeterminate', 'all'] },
      { name: 'items', props: ['item', 'index', 'selected', 'expanded'], source: 'data-iterable' },
      { name: 'pageText', props: ['pageStart', 'pageStop', 'itemsLength'], source: 'data-iterable' }
    ]
  },
  'v-dialog': {
    slots: ['activator', 'default']
  },
  'v-expansion-panel': {
    slots: ['default']
  },
  'v-expansion-panel-content': {
    slots: ['default', 'header']
  },
  'v-flex': {
    props: [
      {
        'name': 'offset-(size)(0-12)',
        'type': 'Boolean',
        'default': 'false',
        'source': null
      },
      {
        'name': 'order-(size)(0-12)',
        'type': 'Boolean',
        'default': 'false',
        'source': null
      },
      {
        'name': '(size)(1-12)',
        'type': 'Boolean',
        'default': 'false',
        'source': null
      }
    ].concat(sharedGridProps)
  },
  'v-footer': {
    slots: ['default']
  },
  'v-form': {
    slots: ['default']
  },
  'v-icon': {
    slots: ['default']
  },
  'v-layout': {
    props: [
      {
        'name': 'row',
        'type': 'Boolean',
        'default': 'true',
        'source': null
      },
      {
        'name': 'column',
        'type': 'Boolean',
        'default': 'false',
        'source': null
      }
    ].concat(sharedGridProps)
  },
  'v-list': {
    slots: ['default']
  },
  'v-list-tile': {
    slots: ['default']
  },
  'v-list-tile-action': {
    slots: ['default']
  },
  'v-list-tile-avatar': {
    slots: ['default']
  },
  'v-list-tile-title': {
    slots: ['default']
  },
  'v-list-tile-sub-title': {
    slots: ['default']
  },
  'v-menu': {
    slots: ['activator', 'default']
  },
  'v-navigation-drawer': {
    slots: ['default']
  },
  'v-parallax': {
    slots: ['default']
  },
  'v-progress-circular': {
    slots: ['default']
  },
  'v-select': {
    slots: ['label', 'noData', 'progress'],
    scopedSlots: ['item', 'selection']
  },
  'v-checkbox': {
    slots: ['label']
  },
  'v-switch': {
    slots: ['label']
  },
  'v-radio-group': {
    slots: ['label']
  },
  'v-snackbar': {
    slots: ['default']
  },
  'v-speed-dial': {
    slots: ['activator', 'default']
  },
  'v-stepper': {
    slots: ['default']
  },
  'v-stepper-content': {
    slots: ['default']
  },
  'v-stepper-header': {
    slots: ['default']
  },
  'v-stepper-items': {
    slots: ['default']
  },
  'v-stepper-step': {
    slots: ['default']
  },
  'v-subheader': {
    slots: ['default']
  },
  'v-tabs': {
    slots: ['default']
  },
  'v-tab': {
    slots: ['default']
  },
  'v-tab-item': {
    slots: ['default']
  },
  'v-tabs-items': {
    slots: ['default']
  },
  'v-toolbar': {
    slots: ['default', 'extension']
  },
  'v-tooltip': {
    slots: ['activator', 'default']
  }
}

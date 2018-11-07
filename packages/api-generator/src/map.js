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

const dataIterableProps = [
  {
    name: 'pagination',
    sync: true,
    example: {
      descending: 'boolean',
      page: 'number',
      rowsPerPage: 'number // -1 for All',
      sortBy: 'string',
      totalItems: 'number'
    }
  },
  {
    name: 'filter',
    default: '(val: object, search: string): boolean'
  },
  {
    name: 'customSort',
    default: '(items: object[], index: number, isDescending: boolean): object[]'
  },
  {
    name: 'customFilter',
    default: '(items: object[], search: string, filter: Filter): object[]'
  }
]

const dataIterableEvents = [
  {
    name: 'update:pagination',
    value: 'object',
    source: 'data-iterable'
  },
  {
    name: 'input',
    value: 'object[]'
  }
]

const dataIterableSlots = [
  { name: 'actions-append', source: 'data-iterable' },
  { name: 'actions-prepend', source: 'data-iterable' },
  { name: 'footer', source: 'data-iterable' },
  { name: 'noData', source: 'data-iterable' },
  { name: 'noResults', source: 'data-iterable' }
]

const dataIterableScopedSlots = [
  {
    name: 'items',
    props: {
      item: 'object',
      index: 'number',
      selected: 'boolean',
      expanded: 'boolean'
    },
    source: 'data-iterable'
  },
  {
    name: 'pageText',
    props: {
      pageStart: 'number',
      pageStop: 'number',
      itemsLength: 'number'
    },
    source: 'data-iterable'
  }
]

const validatableEvents = [
  {
    name: 'update:error',
    value: 'boolean'
  }
]

const inputEvents = [
  {
    name: 'click:prepend',
    value: 'Event'
  },
  {
    name: 'click:append',
    value: 'Event'
  }
]

const inputSlots = ['append', 'prepend', 'default']

const VSelect = {
  props: [
    {
      name: 'filter',
      default: '(item: object, queryText: string, itemText: string) => boolean'
    },
    {
      name: 'valueComparator',
      default: '(a: any, b: any) => boolean'
    }
  ],
  slots: inputSlots.concat(['no-data', 'label', 'progress']),
  scopedSlots: [
    {
      name: 'selection',
      props: {
        parent: 'VueComponent',
        item: 'object',
        index: 'number',
        selected: 'boolean',
        disabled: 'boolean'
      }
    },
    {
      name: 'item',
      props: {
        parent: 'VueComponent',
        item: 'object',
        tile: 'object'
      }
    }
  ],
  events: [
    {
      name: 'input',
      value: 'any'
    },
    {
      name: 'change',
      value: 'any'
    },
    {
      name: 'update:searchInput',
      value: 'string'
    }
  ].concat(validatableEvents)
}

module.exports = {
  '$vuetify': {
    functions: [
      {
        name: 'goTo',
        signature: '(target: string | number | HTMLElement | VueComponent, options?: object) => void'
      }
    ]
  },
  'v-resize': {
    options: [
      {
        name: 'modifiers.quiet',
        default: 'false',
        type: 'Boolean'
      },
      {
        name: 'value',
        default: 'undefined',
        type: 'Function'
      }
    ]
  },
  'v-ripple': {
    options: [
      {
        name: 'value',
        default: '{}',
        type: 'Object'
      }
    ]
  },
  'v-scroll': {
    options: [
      {
        name: 'arg:target',
        default: 'window',
        type: 'String'
      },
      {
        name: 'value',
        default: '() => {}',
        type: 'Function'
      }
    ]
  },
  'v-touch': {
    options: [
      {
        name: 'value',
        default: '{}',
        type: 'Object'
      }
    ]
  },
  'v-app': {
    slots: ['default']
  },
  'v-alert': {
    slots: ['default'],
    events: [
      {
        name: 'input',
        value: 'boolean'
      }
    ]
  },
  'v-autocomplete': VSelect,
  'v-combobox': VSelect,
  'v-avatar': {
    slots: ['default']
  },
  'v-badge': {
    slots: ['badge', 'default']
  },
  'v-breadcrumbs': {
    slots: ['divider'],
    scopedSlots: [
      {
        name: 'item',
        props: {
          item: 'any[]'
        }
      }
    ]
  },
  'v-breadcrumbs-item': {
    slots: ['default']
  },
  'v-bottom-nav': {
    props: [
      {
        name: 'active',
        sync: true
      }
    ],
    slots: ['default'],
    events: [
      {
        name: 'input',
        value: 'boolean'
      },
      {
        name: 'update:active',
        value: 'string | number'
      }
    ]
  },
  'v-bottom-sheet': {
    slots: ['activator', 'default']
  },
  'v-btn': {
    slots: ['default']
  },
  'v-btn-toggle': {
    slots: ['default'],
    events: [
      {
        name: 'change',
        value: 'any[] | any'
      }
    ]
  },
  'v-card': {
    slots: ['default']
  },
  'v-carousel': {
    slots: ['default'],
    events: [
      {
        name: 'input',
        value: 'number'
      }
    ]
  },
  'v-carousel-item': {
    slots: ['default']
  },
  'v-checkbox': {
    slots: inputSlots.concat(['label'])
  },
  'v-chip': {
    slots: ['default'],
    events: [
      {
        name: 'input',
        value: 'boolean'
      }
    ]
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
    slots: dataIterableSlots.concat(['header']),
    scopedSlots: dataIterableScopedSlots,
    events: dataIterableEvents
  },
  'v-data-table': {
    props: [
      {
        name: 'headers',
        example: {
          text: 'string',
          value: 'string',
          align: '\'left\' | \'center\' | \'right\'',
          sortable: 'boolean',
          class: 'string[] | string',
          width: 'string'
        }
      }
    ].concat(dataIterableProps),
    slots: dataIterableSlots,
    scopedSlots: [
      {
        name: 'headerCell',
        props: {
          header: 'object'
        }
      },
      {
        name: 'headers',
        props: {
          headers: 'object[]',
          indeterminate: 'boolean',
          all: 'boolean'
        }
      }
    ].concat(dataIterableScopedSlots),
    events: dataIterableEvents
  },
  'v-date-picker': {
    events: [
      {
        name: 'input',
        value: 'string'
      }
    ],
    functions: [
      {
        name: 'title-date-format',
        signature: '(date: string, locale: string): string'
      },
      {
        name: 'day-format',
        signature: '(date: string, locale: string): string'
      },
      {
        name: 'header-date-format',
        signature: '(date: string, locale: string): string'
      },
      {
        name: 'month-format',
        signature: '(date: string, locale: string): string'
      },
      {
        name: 'year-format',
        signature: '(date: string, locale: string): string'
      },
      {
        name: 'allowed-dates',
        signature: '(date: string): boolean'
      }
    ]
  },
  'v-dialog': {
    slots: ['activator', 'default']
  },
  'v-divider': {
    props: [
      {
        "name": "dark",
        "source": 'themeable'
      },
      {
        "name": "light",
        "source": 'themeable'
      }
    ]
  },
  'v-edit-dialog': {
    slots: ['default', 'input'],
    events: [
      {
        name: 'cancel',
        value: 'void'
      },
      {
        name: 'close',
        value: 'void'
      },
      {
        name: 'open',
        value: 'void'
      },
      {
        name: 'save',
        value: 'void'
      }
    ]
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
    slots: ['default'],
    functions: [
      {
        name: 'reset',
        signature: '(): void'
      },
      {
        name: 'validate',
        signature: '(): boolean'
      }
    ],
    events: [
      {
        name: 'input',
        value: 'boolean'
      }
    ]
  },
  'v-hover': {
    scopedSlots: [
      {
        name: 'default',
        props: {
          hover: 'boolean'
        }
      },
    ]
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
    slots: ['default'],
    events: [
      {
        name: 'input',
        value: 'boolean'
      },
      {
        name: 'update:miniVariant',
        value: 'boolean'
      }
    ]
  },
  'v-pagination': {
    events: [
      {
        name: 'input',
        value: 'number'
      },
      {
        name: 'next',
        value: 'void'
      },
      {
        name: 'right',
        value: 'void'
      }
    ]
  },
  'v-parallax': {
    slots: ['default']
  },
  'v-progress-circular': {
    slots: ['default']
  },
  'v-switch': {
    slots: inputSlots.concat(['label'])
  },
  'v-radio': {
    events: [
      {
        name: 'change',
        value: 'any'
      }
    ]
  },
  'v-radio-group': {
    slots: inputSlots.concat(['label']),
    events: [
      {
        name: 'change',
        value: 'any'
      }
    ].concat(validatableEvents)
  },
  'v-snackbar': {
    slots: ['default']
  },
  'v-select': VSelect,
  'v-slider': {
    events: [
      {
        name: 'input',
        value: 'number'
      },
      {
        name: 'change',
        value: 'number'
      },
      {
        name: 'start',
        value: 'number'
      },
      {
        name: 'end',
        value: 'number'
      }
    ].concat(validatableEvents)
  },
  'v-range-slider': {
    events: [
      {
        name: 'input',
        value: 'array'
      },
      {
        name: 'change',
        value: 'array'
      },
      {
        name: 'start',
        value: 'array'
      },
      {
        name: 'end',
        value: 'array'
      }
    ].concat(validatableEvents)
  },
  'v-speed-dial': {
    slots: ['activator', 'default']
  },
  'v-stepper': {
    slots: ['default'],
    events: [
      {
        name: 'input',
        value: 'number'
      }
    ]
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
    slots: ['default'],
    events: [
      {
        name: 'input',
        value: 'string'
      }
    ]
  },
  'v-tab': {
    slots: ['default']
  },
  'v-tab-item': {
    slots: ['default']
  },
  'v-tabs-items': {
    slots: ['default'],
    events: [
      {
        name: 'input',
        value: 'string'
      }
    ]
  },
  'v-text-field': {
    events: [
      {
        name: 'input',
        value: 'string'
      },
      {
        name: 'change',
        value: 'string'
      },
      {
        name: 'click:prepend-inner',
        value: 'Event'
      },
      {
        name: 'click:append-outer',
        value: 'Event'
      }
    ].concat(validatableEvents),
    slots: ['label']
  },
  'v-time-picker': {
    events: [
      {
        name: 'input',
        value: 'string'
      }
    ]
  },
  'v-time-picker-clock': {
    props: [
      {
        name: 'format',
        default: '(val: string): string'
      }
    ]
  },
  'v-toolbar': {
    slots: ['default', 'extension']
  },
  'v-tooltip': {
    slots: ['activator', 'default']
  }
}

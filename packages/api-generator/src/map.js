const sharedGridProps = [
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
  }
]

const dataIterableProps = [
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

const dataOptions = {
  page: 'number',
  itemsPerPage: 'number',
  sortBy: 'string[]',
  sortDesc: 'boolean[]',
  groupBy: 'string[]',
  groupDesc: 'boolean[]',
  multiSort: 'boolean',
  mustSort: 'boolean'
}

const dataPagination = {
  page: 'number',
  itemsPerPage: 'number',
  pageStart: 'number',
  pageStop: 'number',
  pageCount: 'number',
  itemsLength: 'number'
}

const dataProps = {
  items: 'any[]',
  pagination: dataPagination,
  options: dataOptions,
  updateOptions: '(obj: any): void',
  sort: '(value: string): void',
  group: '(value: string): void',
  groupedItems: 'Record<string, any[]>'
}

const dataEvents = [
  { name: 'current-items', source: 'v-data', value: 'any[]' },
  { name: 'page-count', source: 'v-data', value: 'number' },
  { name: 'pagination', source: 'v-data', value: dataPagination },
  { name: 'update:options', source: 'v-data', value: dataOptions },
  { name: 'update:page', source: 'v-data', value: 'number' },
  { name: 'update:items-per-page', source: 'v-data', value: 'number' },
  { name: 'update:sort-by', source: 'v-data', value: 'string | string[]' },
  { name: 'update:sort-desc', source: 'v-data', value: 'boolean | boolean[]' },
  { name: 'update:group-by', source: 'v-data', value: 'string | string[]' },
  { name: 'update:group-desc', source: 'v-data', value: 'boolean | boolean[]' },
  { name: 'update:multi-sort', source: 'v-data', value: 'boolean' },
  { name: 'update:must-sort', source: 'v-data', value: 'boolean' }
]

const dataIteratorEvents = [
  { name: 'input', source: 'v-data', value: 'any[]' },
  { name: 'update:expanded', source: 'v-data', value: 'any[]' },
  { name: 'item-selected', source: 'v-data', value: '{ item: any, value: boolean }' },
  { name: 'item-expanded', source: 'v-data', value: '{ item: any, value: boolean }' }
].concat(dataEvents)

const dataTableEvents = [].concat(dataIteratorEvents)

const dataIteratorSlots = [
  { name: 'loading', source: 'data-iterator' },
  { name: 'no-data', source: 'data-iterator' },
  { name: 'no-results', source: 'data-iterator' },
]

const dataIteratorScopedSlots = [
  {
    name: 'item',
    props: dataProps,
    source: 'data-iterator'
  },
  {
    name: 'prepend',
    props: dataProps,
    source: 'data-iterator'
  },
  {
    name: 'append',
    props: dataProps,
    source: 'data-iterator'
  }
]

const tableHeader = {
  text: 'string',
  value: 'string',
  'align?': '\'start\' | \'center\' | \'end\'',
  'sortable?': 'boolean',
  'divider?': 'boolean',
  'class?': 'string | string[]',
  'width?': 'string | number',
  'filter?': '(value: any, search: string, item: any): boolean',
  'sort?': '(a: any, b: any): number'
}

const dataTableHeaderScopedProps = {
  props: {
    options: dataOptions,
    pagination: dataPagination
    // TOOD: Also the rest of v-data-footer props
  },
  on: {
    'update:options': '(value: any): void'
  },
  widths: 'number[]',
  headers: 'TableHeader[]' // TODO: expand this?
}

const dataTableSlots = [
  { name: 'body.append', props: dataProps },
  { name: 'body.prepend', props: dataProps },
  { name: 'body', props: dataProps },
  { name: 'footer', props: dataProps },
  { name: 'header', props: dataTableHeaderScopedProps },
  { name: 'top', props: dataProps },
  { name: 'progress', props: dataProps },
  { name: 'group', props: dataProps },
  { name: 'group.header', props: dataProps },
  { name: 'group.summary', props: dataProps },
  { name: 'item', props: dataProps },
  { name: 'item.dataTableSelect', props: dataProps },
  { name: 'item.dataTableExpand', props: dataProps },
  { name: 'item.column.<column>', props: dataProps },
  { name: 'item.expanded', props: dataProps }
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

const textEvents = [
  {
    name: 'click:clear',
    value: 'Event'
  },
  {
    name: 'click:append-outer',
    value: 'Event'
  },
  {
    name: 'click:prepend-inner',
    value: 'Event'
  }
]

const inputSlots = ['append', 'prepend', 'default']

const textFieldSlots = [...inputSlots, 'append-outer', 'prepend-inner', 'label']

const selectSlots = [...textFieldSlots, 'append-item', 'prepend-item']

const VSelect = {
  props: [
    {
      name: 'filter',
      default: '(item: object, queryText: string, itemText: string): boolean'
    },
    {
      name: 'valueComparator',
      default: '(a: any, b: any): boolean'
    },
    {
      name: 'menuProps',
      default: '{"closeOnClick":false, "closeOnContentClick":false, "openOnClick":false, "maxHeight":300}'
    }
  ],
  slots: selectSlots.concat(['no-data', 'progress']),
  scopedSlots: [
    {
      name: 'selection',
      props: {
        parent: 'VueComponent',
        item: 'object',
        index: 'number',
        select: 'function',
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
    },
    ...inputEvents,
    ...textEvents
  ].concat(validatableEvents)
}

const VTreeviewScopedProps = {
  item: 'any',
  leaf: 'boolean',
  selected: 'boolean',
  indeterminate: 'boolean',
  active: 'boolean',
  open: 'boolean'
}

const VTimestamp = {
  date: 'string',
  time: 'string',
  year: 'number',
  month: 'number',
  day: 'number',
  hour: 'number',
  minute: 'number',
  weekday: 'number',
  hasDay: 'boolean',
  hasTime: 'boolean',
  past: 'boolean',
  present: 'boolean',
  future: 'boolean'
}

const VTimestampWithTime = {
  date: 'string',
  time: 'string',
  year: 'number',
  month: 'number',
  day: 'number',
  hour: 'number',
  minute: 'number',
  weekday: 'number',
  hasDay: 'boolean',
  hasTime: 'boolean',
  past: 'boolean',
  present: 'boolean',
  future: 'boolean',
  timeToY: '(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number'
}

const VSlider = {
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
    },
    ...inputEvents
  ].concat(validatableEvents),
  slots: [
    {
      name: 'append',
      source: 'v-input'
    },
    {
      name: 'prepend',
      source: 'v-input'
    },
    {
      name: 'label',
      source: 'v-input'
    }
  ],
  scopedSlots: [
    {
      name: 'thumb-label',
      props: {
        value: 'number | string'
      }
    }
  ]
}

module.exports = {
  '$vuetify': {
    functions: [
      {
        name: 'goTo',
        signature: '(target: string | number | HTMLElement | VueComponent, options?: object): void'
      }
    ]
  },
  'internationalization': {
    api: [
      {
        name: 'locales',
        default: '{ en: VuetifyLocale }',
        type: 'Record<string, VuetifyLocale>'
      },
      {
        name: 'current',
        default: 'en',
        type: 'string'
      },
      {
        name: 't',
        default: '(key: string, ...params: Array<string | number>): string',
        type: 'Function'
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
      },
      {
        name: 'center',
        default: 'false',
        type: 'Boolean'
      },
      {
        name: 'class',
        default: '""',
        type: 'string'
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
        default: '(): {}',
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
  'v-calendar': {
    scopedSlots: [
      {
        name: 'day',
        props: VTimestamp
      },
      {
        name: 'dayBody',
        props: VTimestampWithTime
      },
      {
        name: 'dayHeader',
        props: VTimestamp
      },
      {
        name: 'dayLabel',
        props: VTimestamp
      },
      {
        name: 'dayMonth',
        props: VTimestamp
      },
      {
        name: 'interval',
        props: VTimestampWithTime
      }
    ],
    functions: [
      {
        name: 'updateTimes',
        signature: '(): void'
      },
      {
        name: 'next',
        signature: '(amount: number = 1): void'
      },
      {
        name: 'prev',
        signature: '(amount: number = 1): void'
      },
      {
        name: 'move',
        signature: '(amount: number = 1): void'
      },
      {
        name: 'timeToY',
        signature: '(time: number | string | { hour: number, minute: number }, clamp: boolean = true): number | false'
      },
      {
        name: 'minutesToPixels',
        signature: '(minutes: number): number'
      },
      {
        name: 'scrollToTime',
        signature: '(time: number | string | { hour: number, minute: number }): boolean'
      }
    ],
    events: [
      {
        name: 'input',
        value: VTimestamp
      },
      {
        name: 'moved',
        value: VTimestamp
      },
      {
        name: 'change',
        value: { start: VTimestamp, end: VTimestamp }
      },
      {
        name: 'click:date',
        value: VTimestampWithTime
      },
      {
        name: 'contextmenu:date',
        value: VTimestampWithTime
      },
      {
        name: 'click:day',
        value: VTimestampWithTime
      },
      {
        name: 'contextmenu:day',
        value: VTimestampWithTime
      },
      {
        name: 'mousedown:day',
        value: VTimestampWithTime
      },
      {
        name: 'mousemove:day',
        value: VTimestampWithTime
      },
      {
        name: 'mouseup:day',
        value: VTimestampWithTime
      },
      {
        name: 'mouseenter:day',
        value: VTimestampWithTime
      },
      {
        name: 'mouseleave:day',
        value: VTimestampWithTime
      },
      {
        name: 'touchstart:day',
        value: VTimestampWithTime
      },
      {
        name: 'touchmove:day',
        value: VTimestampWithTime
      },
      {
        name: 'touchend:day',
        value: VTimestampWithTime
      },
      {
        name: 'click:time',
        value: VTimestampWithTime
      },
      {
        name: 'contextmenu:time',
        value: VTimestampWithTime
      },
      {
        name: 'mousedown:time',
        value: VTimestampWithTime
      },
      {
        name: 'mousemove:time',
        value: VTimestampWithTime
      },
      {
        name: 'mouseup:time',
        value: VTimestampWithTime
      },
      {
        name: 'mouseenter:time',
        value: VTimestampWithTime
      },
      {
        name: 'mouseleave:time',
        value: VTimestampWithTime
      },
      {
        name: 'touchstart:time',
        value: VTimestampWithTime
      },
      {
        name: 'touchmove:time',
        value: VTimestampWithTime
      },
      {
        name: 'touchend:time',
        value: VTimestampWithTime
      },
      {
        name: 'click:interval',
        value: VTimestamp
      },
      {
        name: 'contextmenu:interval',
        value: VTimestamp
      },
      {
        name: 'mousedown:interval',
        value: VTimestamp
      },
      {
        name: 'mousemove:interval',
        value: VTimestamp
      },
      {
        name: 'mouseup:interval',
        value: VTimestamp
      },
      {
        name: 'mouseenter:interval',
        value: VTimestamp
      },
      {
        name: 'mouseleave:interval',
        value: VTimestamp
      },
      {
        name: 'touchstart:interval',
        value: VTimestamp
      },
      {
        name: 'touchmove:interval',
        value: VTimestamp
      },
      {
        name: 'touchend:interval',
        value: VTimestamp
      }
    ]
  },
  'v-card': {
    slots: ['default']
  },
  'v-card-actions': {
    slots: ['default']
  },
  'v-card-text': {
    slots: ['default']
  },
  'v-card-title': {
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
    slots: dataIteratorSlots,
    scopedSlots: dataIteratorScopedSlots,
    events: dataIteratorEvents
  },
  'v-data-table': {
    props: [
      {
        name: 'headers',
        example: tableHeader
      }
    ].concat(dataIterableProps),
    slots: dataTableSlots,
    scopedSlots: dataTableSlots,
    events: dataTableEvents
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
        name: 'titleDateFormat',
        signature: '(date: string, locale: string): string'
      },
      {
        name: 'dayFormat',
        signature: '(date: string, locale: string): string'
      },
      {
        name: 'headerDateFormat',
        signature: '(date: string, locale: string): string'
      },
      {
        name: 'monthFormat',
        signature: '(date: string, locale: string): string'
      },
      {
        name: 'yearFormat',
        signature: '(date: string, locale: string): string'
      },
      {
        name: 'allowedDates',
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
        'name': 'dark',
        'source': 'themeable'
      },
      {
        'name': 'light',
        'source': 'themeable'
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
        'name': 'order-(size)(1-12)',
        'type': 'Boolean',
        'default': 'false',
        'source': null
      },
      {
        'name': '(size)(1-12)',
        'type': 'Boolean',
        'default': 'false',
        'source': null
      },
      {
        'name': 'alignSelfStart',
        'type': 'Boolean',
        'default': 'false',
        'source': null
      },
      {
        'name': 'alignSelfEnd',
        'type': 'Boolean',
        'default': 'false',
        'source': null
      },
      {
        'name': 'alignSelfCenter',
        'type': 'Boolean',
        'default': 'false',
        'source': null
      },
      {
        'name': 'alignSelfBaseline',
        'type': 'Boolean',
        'default': 'false',
        'source': null
      },
      {
        'name': 'grow',
        'type': 'Boolean',
        'default': 'false',
        'source': null
      },
      {
        'name': 'shrink',
        'type': 'Boolean',
        'default': 'false',
        'source': null
      }
    ]
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
        name: 'resetValidation',
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
      }
    ]
  },
  'v-icon': {
    slots: ['default'],
    props: [
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        'source': null
      }
    ]
  },
  'v-input': {
    events: [
      ...inputEvents
    ],
    slots: [
      ...inputSlots
    ]
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
        name: 'previous',
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
  'v-slider': VSlider,
  'v-range-slider': VSlider,
  'v-sheet': {
    slots: ['default'],
    props: [
      {
        name: 'tag',
        type: 'String',
        default: 'div'
      },
      {
        name: 'tile',
        type: 'Boolean'
      }
    ]
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
        name: 'change',
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
        name: 'change',
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
      ...inputEvents,
      ...textEvents
    ].concat(validatableEvents),
    slots: [
      ...textFieldSlots
    ]
  },
  'v-textarea': {
    events: [
      {
        name: 'input',
        value: 'string'
      },
      {
        name: 'change',
        value: 'string'
      },
      ...inputEvents,
      ...textEvents
    ].concat(validatableEvents),
    slots: [
      ...textFieldSlots
    ]
  },
  'v-time-picker': {
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
        name: 'click:hour',
        value: 'string'
      },
      {
        name: 'click:minute',
        value: 'string'
      },
      {
        name: 'click:second',
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
  },
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
  },
  'v-window': {
    props: [
      {
        name: 'touch',
        example: {
          left: 'Function',
          right: 'Function'
        }
      }
    ],
    slots: ['default']
  },
  'v-window-item': {
    slots: ['default']
  }
}

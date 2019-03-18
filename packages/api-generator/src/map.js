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

const dataIteratorProps = [
  { name: 'value', source: 'v-data-iterator' },
  { name: 'singleSelect', source: 'v-data-iterator' },
  { name: 'expanded', source: 'v-data-iterator' },
  { name: 'singleExpand', source: 'v-data-iterator' },
  { name: 'loading', source: 'v-data-iterator' },
  { name: 'loadingText', source: 'v-data-iterator' },
  { name: 'noResultsText', source: 'v-data-iterator' },
  { name: 'noDataText', source: 'v-data-iterator' },
  { name: 'hideDefaultFooter', source: 'v-data-iterator' },
  { name: 'footerProps', source: 'v-data-iterator' }
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

const dataScopedProps = {
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

const dataProps = [
  { name: 'items', source: 'v-data' },
  { name: 'itemKey', source: 'v-data' },
  { name: 'options', source: 'v-data' },
  { name: 'sortBy', source: 'v-data' },
  { name: 'sortDesc', source: 'v-data' },
  { name: 'customSort', source: 'v-data', default: '(items: any[], sortBy: string[], sortDesc: boolean[], locale: string, customSorters?: Record<string, compareFn>): any[]' },
  { name: 'mustSort', source: 'v-data' },
  { name: 'multiSort', source: 'v-data' },
  { name: 'page', source: 'v-data' },
  { name: 'itemsPerPage', source: 'v-data' },
  { name: 'groupBy', source: 'v-data' },
  { name: 'groupDesc', source: 'v-data' },
  { name: 'locale', source: 'v-data' },
  { name: 'disableSort', source: 'v-data' },
  { name: 'disablePagination', source: 'v-data' },
  { name: 'disableFiltering', source: 'v-data' },
  { name: 'search', source: 'v-data' },
  { name: 'customFilter', source: 'v-data', default: '(items: any[], search: string): any[]' },
  { name: 'serverItemsLength', source: 'v-data' }
]

const dataIteratorSlots = [
  { name: 'loading', source: 'data-iterator' },
  { name: 'no-data', source: 'data-iterator' },
  { name: 'no-results', source: 'data-iterator' }
]

const dataIteratorScopedSlots = [
  {
    name: 'default',
    props: dataScopedProps,
    source: 'data-iterator'
  },
  {
    name: 'footer',
    props: dataScopedProps,
    source: 'data-iterator'
  },
  {
    name: 'header',
    props: dataScopedProps,
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
  { name: 'body.append', props: dataScopedProps },
  { name: 'body.prepend', props: dataScopedProps },
  { name: 'body', props: dataScopedProps },
  { name: 'footer', props: dataScopedProps },
  { name: 'header', props: dataTableHeaderScopedProps },
  { name: 'top', props: dataScopedProps },
  { name: 'progress', props: dataScopedProps },
  { name: 'group', props: dataScopedProps },
  { name: 'group.header', props: dataScopedProps },
  { name: 'group.summary', props: dataScopedProps },
  { name: 'item', props: dataScopedProps },
  { name: 'item.dataTableSelect', props: dataScopedProps },
  { name: 'item.dataTableExpand', props: dataScopedProps },
  { name: 'item.column.<name>', props: dataScopedProps },
  { name: 'item.expanded', props: dataScopedProps }
]

const dataFooterSlots = [
  { name: 'pageText' }
]

const dataFooterEvents = [
  { name: 'update:options' }
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
  'v-app-bar': {
    slots: ['default', 'extension'],
    scopedSlots: [{
      name: 'img',
      props: {
        props: '{ height: string, src: string | srcObject }'
      }
    }]
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
  'v-bottom-navigation': {
    slots: ['default'],
    events: [
      {
        name: 'input',
        value: 'boolean'
      },
      {
        name: 'update:inputValue',
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
  'v-overflow-btn': {
    props: [
      {
        name: 'menuProps',
        default: '{"closeOnClick":false, "closeOnContentClick":false, "openOnClick":false, "maxHeight":300, "offsetY":true, "offsetOverflow":true, "transition":false}'
      }
    ]
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
  'v-data': {
    props: dataProps,
    events: dataEvents
  },
  'v-data-footer': {
    slots: dataFooterSlots,
    events: dataFooterEvents
  },
  'v-data-iterator': {
    props: dataIteratorProps.concat(dataProps),
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
    ].concat(dataIteratorProps).concat(dataProps),
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
  'v-list-item': {
    slots: ['default']
  },
  'v-list-item-action': {
    slots: ['default']
  },
  'v-list-item-avatar': {
    slots: ['default']
  },
  'v-list-item-title': {
    slots: ['default']
  },
  'v-list-item-subtitle': {
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
    slots: ['default', 'extension'],
    scopedSlots: [{
      name: 'img',
      props: {
        props: '{ height: string, src: string | srcObject }'
      }
    }]
  },
  'v-toolbar-title': {
    slots: ['default']
  },
  'v-toolbar-items': {
    slots: ['default']
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

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
  dataProps,
  dataEvents,
  tableHeader,
  dataTableSlots,
  dataTableEvents,
  dataIteratorProps,
  dataIteratorSlots,
  dataIteratorScopedSlots,
  dataIteratorEvents,
  VSelect,
  VSlider,
  VTimestamp,
  VTimestampWithTime,
  inputSlots,
  inputEvents,
  sharedGridProps,
  dataFooterSlots,
  dataFooterEvents,
  validatableEvents,
  textEvents,
  textFieldSlots,
  VTreeviewScopedProps
}

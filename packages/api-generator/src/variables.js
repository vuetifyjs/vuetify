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

function createItems (strings, defaults) {
  return strings.map(name => ({ name, ...defaults }))
}

const Validatable = {
  props: createItems(['disabled', 'readonly'], {
    default: false,
    source: 'validatable',
    value: 'boolean',
  }),
  events: [
    {
      name: 'update:error',
      source: 'validatable',
      value: 'boolean',
    },
  ],
}

const VGridProps = [
  ...createItems([
    'alignBaseline',
    'alignCenter',
    'alignContentCenter',
    'alignContentEnd',
    'alignContentSpaceAround',
    'alignContentSpaceBetween',
    'alignContentStart',
    'alignEnd',
    'alignStart',
    'd-{type}',
    'fillHeight',
    'justifyCenter',
    'justifyEnd',
    'justifySpaceAround',
    'justifySpaceBetween',
    'justifyStart',
  ], {
    default: 'false',
    source: null,
    type: 'Boolean',
  }),
  {
    default: 'div',
    name: 'tag',
    source: null,
    type: 'String',
  },
]

const VInput = {
  events: [
    ...Validatable.events,
    ...createItems([
      'click',
      'mousedown',
      'mouseup',
    ], {
      source: 'v-input',
      value: 'MouseEvent',
    }),
    ...createItems(['click:append', 'click:prepend'], {
      source: 'v-input',
      value: 'Event',
    }),
  ],
  props: [
    ...Validatable.props,
    {
      name: 'label',
      source: 'v-input',
      type: 'string',
      default: undefined,
    },
    {
      name: 'value',
      source: 'v-input',
      type: 'any',
      default: undefined,
    },
  ],
  slots: [
    ...createItems([
      'append',
      'default',
      'prepend',
    ], {
      props: undefined,
      source: 'v-input',
    }),
    {
      name: 'message',
      props: {
        key: 'number, // the messages index',
        message: 'string, // the message',
      },
      source: 'v-input',
    },
  ],
}

const VTextField = {
  ...VInput,
  events: [
    ...VInput.events,
    ...createItems([
      'blur',
      'click:clear',
      'click:append-outer',
      'click:prepend-inner',
      'focus',
    ], {
      source: 'v-text-field',
      value: 'Event',
    }),
    ...createItems([
      'change',
      'input',
    ], {
      source: 'v-text-field',
      value: 'any',
    }),
    {
      name: 'keydown',
      source: 'v-text-field',
      value: 'KeyboardEvent',
    },
  ],
  slots: [
    ...VInput.slots,
    ...createItems([
      'append-outer',
      'label',
      'prepend-inner',
      'progress',
    ], {
      props: undefined,
      source: 'v-text-field',
    }),
  ],
}

const VSelect = {
  ...VTextField,
  events: [
    ...VTextField.events,
    {
      name: 'update:search-input',
      source: 'v-select',
      value: 'string',
    },
    {
      name: 'update:list-index',
      source: 'v-select',
      value: 'number',
    },
  ],
  props: [
    ...VTextField.props,
    {
      name: 'items',
      example: {
        text: 'string | number | object',
        value: 'string | number | object',
      },
      source: 'v-select',
    },
    {
      name: 'filter',
      default: '(item: object, queryText: string, itemText: string): boolean',
      source: 'v-select',
    },
    {
      name: 'valueComparator',
      default: '(a: any, b: any): boolean',
      source: 'v-select',
    },
    {
      name: 'menuProps',
      default: '{ "closeOnClick": false, "closeOnContentClick": false, "disableKeys": true, "openOnClick": false, "maxHeight": 304 }',
      source: 'v-select',
    },
  ],
  slots: [
    ...VTextField.slots,
    ...createItems(['append-item', 'prepend-item'], {
      props: undefined,
      source: 'v-select',
    }),
    {
      name: 'item',
      props: {
        parent: 'VueComponent',
        item: 'object',
        on: 'object // Only needed when providing your own v-list-item',
        attrs: 'object // Only needed when providing your own v-list-item',
      },
      source: 'v-select',
    },
    {
      name: 'no-data',
      props: undefined,
      source: 'v-select',
    },
    {
      name: 'selection',
      props: {
        parent: 'VueComponent',
        item: 'object',
        index: 'number',
        select: 'function',
        selected: 'boolean',
        disabled: 'boolean',
      },
      source: 'v-select',
    },
  ],
}

const VSlider = {
  ...VInput,
  events: [
    ...VInput.events,
    ...createItems(['start', 'end'], {
      source: 'v-slider',
      value: 'number',
    }),
  ],
  slots: [
    ...VInput.slots,
    {
      name: 'progress',
      props: undefined,
      source: 'v-slider',
    },
    {
      name: 'thumb-label',
      props: {
        value: 'number | string',
      },
      source: 'v-slider',
    },
  ],
}

const VTreeviewScopedProps = {
  item: 'any',
  leaf: 'boolean',
  selected: 'boolean',
  indeterminate: 'boolean',
  active: 'boolean',
  open: 'boolean',
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
  future: 'boolean',
}

const VCalendarDay = {
  outside: 'boolean',
  index: 'number',
  week: [VTimestamp],
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
}

const VCalendarEventSlot = {
  event: 'any',
  day: VCalendarDay,
  outside: 'boolean',
  start: 'boolean',
  end: 'boolean',
  timed: 'boolean',
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
  timeToY: '(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number',
  minutesToPixels: '(minutes: number): number',
  week: [VTimestamp],
}

module.exports = {
  createItems,
  VCalendarDay,
  VCalendarEventSlot,
  VGridProps,
  VInput,
  VSelect,
  VSlider,
  VTextField,
  VTimestamp,
  VTimestampWithTime,
  VTreeviewScopedProps,
}

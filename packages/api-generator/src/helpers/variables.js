function createItems (strings, defaults) {
  return strings.map(name => ({ name, ...defaults }))
}

const Validatable = {
  props: createItems(['disabled', 'readonly'], {
    default: false,
    source: 'validatable',
    type: 'boolean',
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
      'label',
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
      'prepend-inner',
      'progress',
    ], {
      props: undefined,
      source: 'v-text-field',
    }),
    {
      name: 'counter',
      source: 'v-text-field',
      props: {
        props: {
          dark: 'boolean',
          light: 'boolean',
          max: 'string | number',
          value: 'string',
        },
      },
    },
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
        disabled: 'boolean',
        divider: 'boolean',
        header: 'string',
      },
      source: 'v-select',
    },
    {
      name: 'valueComparator',
      default: '(a: any, b: any): boolean',
      source: 'v-select',
    },
    {
      name: 'menuProps',
      default: `{
  closeOnClick: false,
  closeOnContentClick: false,
  disableKeys: true,
  openOnClick: false,
  maxHeight: 304
}`,
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

const VAutocomplete = {
  ...VSelect,
  props: [
    ...VSelect.props.filter(prop => prop.name !== 'menuProps'),
    {
      name: 'menuProps',
      default: `{
  closeOnClick: false,
  closeOnContentClick: false,
  disableKeys: true,
  openOnClick: false,
  maxHeight: 304,
  offsetY: true,
  offsetOverflow: true,
  transition: false
}`,
      source: 'v-autocomplete',
    },
  ],
}

const VSlider = {
  ...VInput,
  events: [
    ...VInput.events,
    ...createItems([
      'change',
      'end',
      'input',
      'start',
    ], {
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

const VRangeSlider = {
  ...VSlider,
  events: [
    ...VInput.events,
    ...createItems([
      'change',
      'end',
      'input',
      'start',
    ], {
      source: 'v-range-slider',
      value: 'array',
    }),
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

const VCalendarEvent = {
  input: 'any',
  start: VTimestamp,
  startIdentifier: 'number',
  startTimestampIdentifier: 'number',
  end: VTimestamp,
  endIdentifier: 'number',
  endTimestampIdentifier: 'number',
  allDay: 'boolean',
  index: 'number',
  category: 'string',
}

const VCalendarEventSlot = {
  event: 'any',
  eventParsed: VCalendarEvent,
  day: VCalendarDay,
  outside: 'boolean',
  start: 'boolean',
  end: 'boolean',
  timed: 'boolean',
  singleline: 'boolean',
  overlapsNoon: 'boolean',
  formatTime: '(time: VTimestamp, ampm: boolean): string',
  timeSummary: '(): string',
  eventSummary: '(): string',
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
  timeToY: '(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false',
  timeDelta: '(time: string | number | {hour: number, minute: number}): number | false',
  minutesToPixels: '(minutes: number): number',
  week: [VTimestamp],
}

const VTimestampWithCategory = {
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
  week: [VTimestamp],
  category: 'string | null',
}

const VTimestampWithTimeCategory = {
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
  timeToY: '(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false',
  timeDelta: '(time: string | number | {hour: number, minute: number}): number | false',
  minutesToPixels: '(minutes: number): number',
  week: [VTimestamp],
  category: 'string | null',
}

module.exports = {
  createItems,
  VCalendarDay,
  VCalendarEvent,
  VCalendarEventSlot,
  VGridProps,
  VInput,
  VSelect,
  VAutocomplete,
  VSlider,
  VRangeSlider,
  VTextField,
  VTimestamp,
  VTimestampWithCategory,
  VTimestampWithTime,
  VTimestampWithTimeCategory,
  VTreeviewScopedProps,
}

module.exports = {
  mixins: [
    'colorable',
    'elevatable',
    'measurable',
    'mobile',
    'roundable',
    'themeable',
    'toggleable',
    'v-sheet',
  ],
  props: [
    {
      name: 'app',
      type: 'boolean',
      default: 'false',
      source: 'v-banner',
    },
    {
      name: 'color',
      type: 'string',
      default: 'undefined',
      source: 'colorable',
    },
    {
      name: 'dark',
      type: 'boolean',
      default: 'false',
      source: 'themeable',
    },
    {
      name: 'elevation',
      type: [
        'number',
        'string',
      ],
      default: 'undefined',
      source: 'elevatable',
    },
    {
      name: 'height',
      type: [
        'number',
        'string',
      ],
      default: 'undefined',
      source: 'measurable',
    },
    {
      name: 'icon',
      type: 'string',
      default: 'undefined',
      source: 'v-banner',
    },
    {
      name: 'icon-color',
      type: 'string',
      default: 'undefined',
      source: 'v-banner',
    },
    {
      name: 'light',
      type: 'boolean',
      default: 'false',
      source: 'themeable',
    },
    {
      name: 'max-height',
      type: [
        'number',
        'string',
      ],
      default: 'undefined',
      source: 'measurable',
    },
    {
      name: 'max-width',
      type: [
        'number',
        'string',
      ],
      default: 'undefined',
      source: 'measurable',
    },
    {
      name: 'min-height',
      type: [
        'number',
        'string',
      ],
      default: 'undefined',
      source: 'measurable',
    },
    {
      name: 'min-width',
      type: [
        'number',
        'string',
      ],
      default: 'undefined',
      source: 'measurable',
    },
    {
      name: 'mobile-breakpoint',
      type: [
        'number',
        'string',
      ],
      source: 'mobile',
    },
    {
      name: 'outlined',
      type: 'boolean',
      default: 'false',
      source: 'v-sheet',
    },
    {
      name: 'rounded',
      type: [
        'boolean',
        'string',
      ],
      default: 'undefined',
      source: 'roundable',
    },
    {
      name: 'shaped',
      type: 'boolean',
      default: 'false',
      source: 'v-sheet',
    },
    {
      name: 'single-line',
      type: 'boolean',
      default: 'false',
      source: 'v-banner',
    },
    {
      name: 'sticky',
      type: 'boolean',
      default: 'false',
      source: 'v-banner',
    },
    {
      name: 'tag',
      type: 'string',
      default: "'div'",
      source: 'v-sheet',
    },
    {
      name: 'tile',
      type: 'boolean',
      default: 'false',
      source: 'roundable',
    },
    {
      name: 'value',
      type: 'boolean',
      default: 'true',
      source: 'toggleable',
    },
    {
      name: 'width',
      type: [
        'number',
        'string',
      ],
      default: 'undefined',
      source: 'measurable',
    },
  ],
  slots: [
    {
      name: 'actions',
      props: {
        dismiss: '(): void',
      },
    },
    {
      name: 'default',
    },
    {
      name: 'icon',
    },
  ],
  events: [],
  functions: [
    {
      name: 'toggle',
      signature: '(): void',
    },
  ],
}

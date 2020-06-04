module.exports = {
  'v-alert': {
    // this is auto-generated
    props: [
      {
        name: 'border',
        type: 'string',
        default: 'undefined',
        source: 'v-alert',
      },
      {
        name: 'closeLabel',
        type: 'string',
        default: "'$vuetify.close'",
        source: 'v-alert',
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
      },
      {
        name: 'coloredBorder',
        type: 'boolean',
        default: 'false',
        source: 'v-alert',
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-alert',
      },
      {
        name: 'dismissible',
        type: 'boolean',
        default: 'false',
        source: 'v-alert',
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
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-alert',
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
      },
      {
        name: 'maxHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
      },
      {
        name: 'minHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
      },
      {
        name: 'minWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
      },
      {
        name: 'mode',
        type: 'string',
        default: 'undefined',
        source: 'transitionable',
      },
      {
        name: 'origin',
        type: 'string',
        default: 'undefined',
        source: 'transitionable',
      },
      {
        name: 'outlined',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
      },
      {
        name: 'prominent',
        type: 'boolean',
        default: 'false',
        source: 'v-alert',
      },
      {
        name: 'tag',
        type: 'string',
        default: "'div'",
        source: 'v-sheet',
      },
      {
        name: 'text',
        type: 'boolean',
        default: 'false',
        source: 'v-alert',
      },
      {
        name: 'tile',
        type: 'boolean',
        default: 'false',
        source: 'roundable',
      },
      {
        name: 'transition',
        type: 'string',
        default: 'undefined',
        source: 'transitionable',
      },
      {
        name: 'type',
        type: 'string',
        default: 'undefined',
        source: 'v-alert',
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
    // this is auto-generated
    mixins: [
      'v-sheet',
      'colorable',
      'elevatable',
      'measurable',
      'roundable',
      'themeable',
      'toggleable',
      'transitionable',
    ],
    // these are included in map file
    slots: [
      {
        name: 'append',
      },
      {
        name: 'close',
        props: {
          toggle: 'Function',
        },
      },
      {
        name: 'prepend',
      },
      {
        name: 'default',
      },
    ],
    events: [
      {
        name: 'input',
        value: 'boolean',
        description: 'The updated bound model',
      },
    ],
    functions: [
      {
        name: 'toggle',
        signature: '(): void',
        description: 'Toggles the alert\'s active state. Available in the close slot and used as the click action in **dismissible**.',
      },
    ],
    // this is auto-generated as separate file variables.json
    sass: [
      {
        name: '$alert-border-opacity',
        default: '0.26 !default;',
      },
      {
        name: '$alert-border-radius',
        default: '$border-radius-root !default;',
      },
      {
        name: '$alert-border-width',
        default: '4px !default;',
      },
      {
        name: '$alert-dense-border-width',
        default: 'medium !default;',
      },
      {
        name: '$alert-font-size',
        default: '16px !default;',
      },
      {
        name: '$alert-icon-size',
        default: '24px !default;',
      },
      {
        name: '$alert-margin',
        default: '16px !default;',
      },
      {
        name: '$alert-outline',
        default: 'thin solid currentColor !default;',
      },
      {
        name: '$alert-padding',
        default: '16px !default;',
      },
      {
        name: '$alert-prominent-icon-font-size',
        default: '32px !default;',
      },
      {
        name: '$alert-prominent-icon-size',
        default: '48px !default;',
      },
    ],
  },
}

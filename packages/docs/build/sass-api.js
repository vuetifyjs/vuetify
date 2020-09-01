/*
  * THIS FILE HAS BEEN AUTOMATICALLY GENERATED USING THE API-GENERATOR TOOL.
  *
  * CHANGES MADE TO THIS FILE WILL BE LOST!
  */

module.exports = {
  globals: [
    {
      name: '$color-pack',
      default: 'true !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$body-font-family',
      default: "'Roboto', sans-serif !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$font-size-root',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$line-height-root',
      default: '1.5 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$border-radius-root',
      default: '4px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$rounded',
      default: "map-deep-merge(\n  (\n    0: 0,\n    'sm': $border-radius-root / 2,\n    null: $border-radius-root,\n    'lg': $border-radius-root * 2,\n    'xl': $border-radius-root * 6,\n    'pill': 9999px,\n    'circle': 50%\n  ),\n  $rounded\n);",
      description: {
        en: '',
      },
    },
    {
      name: '$spacer',
      default: '4px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$spacers',
      default: '@if (type-of($spacers) == list) {\n  @for $i from 0 through 16 {\n    $spacers: map-merge($spacers, ($i: $spacer * $i))\n  }\n}\n\n$negative-spacers: () !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$grid-breakpoints',
      default: "map-deep-merge(\n  (\n    'xs': 0,\n    'sm': 600px,\n    'md': 960px,\n    'lg': 1280px - 16px,\n    'xl': 1920px - 16px\n  ),\n  $grid-breakpoints\n);",
      description: {
        en: '',
      },
    },
    {
      name: '$grid-gutter',
      default: '$spacer * 6 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$form-grid-gutter',
      default: '$spacer * 2 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$grid-columns',
      default: '12 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$container-padding-x',
      default: '$grid-gutter / 2 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$grid-gutters',
      default: "map-deep-merge(\n  (\n    'xs': $grid-gutter / 12,\n    'sm': $grid-gutter / 6,\n    'md': $grid-gutter / 3,\n    'lg': $grid-gutter * 2/3,\n    'xl': $grid-gutter\n  ),\n  $grid-gutters\n);",
      description: {
        en: '',
      },
    },
    {
      name: '$container-max-widths',
      default: "map-deep-merge(\n  (\n    'md': map-get($grid-breakpoints, 'md') * 0.9375,\n    'lg': map-get($grid-breakpoints, 'lg') * 0.9375,\n    'xl': map-get($grid-breakpoints, 'xl') * 0.9375\n  ),\n  $container-max-widths\n);",
      description: {
        en: '',
      },
    },
    {
      name: '$display-breakpoints',
      default: "map-deep-merge(\n  (\n    'print-only': 'only print',\n    'screen-only': 'only screen',\n    'xs-only': 'only screen and (max-width: #{map-get($grid-breakpoints, 'sm') - 1})',\n    'sm-only': 'only screen and (min-width: #{map-get($grid-breakpoints, 'sm')}) and (max-width: #{map-get($grid-breakpoints, 'md') - 1})',\n    'sm-and-down': 'only screen and (max-width: #{map-get($grid-breakpoints, 'md') - 1})',\n    'sm-and-up': 'only screen and (min-width: #{map-get($grid-breakpoints, 'sm')})',\n    'md-only': 'only screen and (min-width: #{map-get($grid-breakpoints, 'md')}) and (max-width: #{map-get($grid-breakpoints, 'lg') - 1})',\n    'md-and-down': 'only screen and (max-width: #{map-get($grid-breakpoints, 'lg') - 1})',\n    'md-and-up': 'only screen and (min-width: #{map-get($grid-breakpoints, 'md')})',\n    'lg-only': 'only screen and (min-width: #{map-get($grid-breakpoints, 'lg')}) and (max-width: #{map-get($grid-breakpoints, 'xl') - 1})',\n    'lg-and-down': 'only screen and (max-width: #{map-get($grid-breakpoints, 'xl') - 1})',\n    'lg-and-up': 'only screen and (min-width: #{map-get($grid-breakpoints, 'lg')})',\n    'xl-only': 'only screen and (min-width: #{map-get($grid-breakpoints, 'xl')})'\n  ),\n  $display-breakpoints\n);",
      description: {
        en: '',
      },
    },
    {
      name: '$font-weights',
      default: "map-deep-merge(\n  (\n    'thin': 100,\n    'light': 300,\n    'regular': 400,\n    'medium': 500,\n    'bold': 700,\n    'black': 900\n  ),\n  $font-weights\n);",
      description: {
        en: '',
      },
    },
    {
      name: '$heading-font-family',
      default: '$body-font-family !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$headings',
      default: "map-deep-merge(\n  (\n    'h1': (\n      'size': 6rem,\n      'weight': 300,\n      'line-height': 6rem,\n      'letter-spacing': -.015625em,\n      'font-family': $heading-font-family,\n      'text-transform': false\n    ),\n    'h2': (\n      'size': 3.75rem,\n      'weight': 300,\n      'line-height': 3.75rem,\n      'letter-spacing': -.0083333333em,\n      'font-family': $heading-font-family,\n      'text-transform': false\n    ),\n    'h3': (\n      'size': 3rem,\n      'weight': 400,\n      'line-height': 3.125rem,\n      'letter-spacing': normal,\n      'font-family': $heading-font-family,\n      'text-transform': false\n    ),\n    'h4': (\n      'size': 2.125rem,\n      'weight': 400,\n      'line-height': 2.5rem,\n      'letter-spacing': .0073529412em,\n      'font-family': $heading-font-family,\n      'text-transform': false\n    ),\n    'h5': (\n      'size': 1.5rem,\n      'weight': 400,\n      'line-height': 2rem,\n      'letter-spacing': normal,\n      'font-family': $heading-font-family,\n      'text-transform': false\n    ),\n    'h6': (\n      'size': 1.25rem,\n      'weight': 500,\n      'line-height': 2rem,\n      'letter-spacing': .0125em,\n      'font-family': $heading-font-family,\n      'text-transform': false\n    ),\n    'subtitle-1': (\n      'size': 1rem,\n      'weight': normal,\n      'line-height': 1.75rem,\n      'letter-spacing': .009375em,\n      'font-family': $body-font-family,\n      'text-transform': false\n    ),\n    'subtitle-2': (\n      'size': .875rem,\n      'weight': 500,\n      'line-height': 1.375rem,\n      'letter-spacing': .0071428571em,\n      'font-family': $body-font-family,\n      'text-transform': false\n    ),\n    'body-1': (\n      'size': 1rem,\n      'weight': 400,\n      'line-height': 1.5rem,\n      'letter-spacing': .03125em,\n      'font-family': $body-font-family,\n      'text-transform': false\n    ),\n    'body-2': (\n      'size': .875rem,\n      'weight': 400,\n      'line-height': 1.25rem,\n      'letter-spacing': .0178571429em,\n      'font-family': $body-font-family,\n      'text-transform': false\n    ),\n    'button': (\n      'size': .875rem,\n      'weight': 500,\n      'line-height': 2.25rem,\n      'letter-spacing': .0892857143em,\n      'font-family': $body-font-family,\n      'text-transform': uppercase\n    ),\n    'caption': (\n      'size': .75rem,\n      'weight': 400,\n      'line-height': 1.25rem,\n      'letter-spacing': .0333333333em,\n      'font-family': $body-font-family,\n      'text-transform': false\n    ),\n    'overline': (\n      'size': .75rem,\n      'weight': 500,\n      'line-height': 2rem,\n      'letter-spacing': .1666666667em,\n      'font-family': $body-font-family,\n      'text-transform': uppercase\n    )\n  ),\n  $headings\n);",
      description: {
        en: '',
      },
    },
    {
      name: '$typography',
      default: '@each $type, $values in $headings {\n  $typography: map-deep-merge(\n    $typography,\n    (#{$type}: map-values($values))\n  );',
      description: {
        en: '',
      },
    },
    {
      name: '$transition',
      default: "map-deep-merge(\n  (\n    'fast-out-slow-in': cubic-bezier(0.4, 0, 0.2, 1),\n    'linear-out-slow-in': cubic-bezier(0, 0, 0.2, 1),\n    'fast-out-linear-in': cubic-bezier(0.4, 0, 1, 1),\n    'ease-in-out': cubic-bezier(0.4, 0, 0.6, 1),\n    'fast-in-fast-out': cubic-bezier(0.25, 0.8, 0.25, 1),\n    'swing': cubic-bezier(0.25, 0.8, 0.5, 1)\n  ),\n  $transition\n);",
      description: {
        en: '',
      },
    },
    {
      name: '$primary-transition',
      default: "0.3s map-get($transition, 'swing') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$secondary-transition',
      default: "0.2s map-get($transition, 'ease-in-out') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$ripple-animation-transition-in',
      default: "transform 0.25s map-get($transition, 'fast-out-slow-in'), opacity 0.1s map-get($transition, 'fast-out-slow-in') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$ripple-animation-transition-out',
      default: "opacity 0.3s map-get($transition, 'fast-out-slow-in') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$ripple-animation-visible-opacity',
      default: '0.15 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$bootable-transition',
      default: "0.2s map-get($transition, 'fast-out-slow-in') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$blockquote-font-size',
      default: '18px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$blockquote-font-weight',
      default: '300 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$code-background-color',
      default: '#FBE5E1 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$code-color',
      default: '#C0341D !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$code-kbd-border-radius',
      default: '3px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$code-kbd-font-size',
      default: '85% !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$code-kbd-font-weight',
      default: '900 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$code-padding',
      default: '0 .4rem !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$kbd-color',
      default: '#FFFFFF !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$kbd-padding',
      default: '.2rem .4rem !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$kbd-background-color',
      default: '#212529 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$input-top-spacing',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-active-label-height',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
  ],
  light: [
    {
      name: '$material-light',
      default: "map-deep-merge(\n  (\n    'status-bar': (\n      'regular': map-get($grey, 'lighten-2'),\n      'lights-out': rgba(map-get($shades, 'white'), 0.7)\n    ),\n    'app-bar': map-get($grey, 'lighten-4'),\n    'background': map-get($shades, 'white'),\n    'bottom-navigation': map-get($shades, 'white'),\n    'surface': map-get($shades, 'white'),\n    'calendar': (\n      'background-color': map-get($shades, 'white'),\n      'outside-background-color': #f7f7f7,\n      'weeknumber-background-color': #f1f3f4,\n      'line-color': map-get($grey, 'lighten-2'),\n      'interval-color': map-get($grey, 'darken-3'),\n      'interval-line-color': map-get($grey, 'lighten-2'),\n      'text-color': map-get($shades, 'black'),\n      'past-color': rgba(map-get($shades, 'black'), .38)\n    ),\n    'cards': map-get($shades, 'white'),\n    'chips': #e0e0e0,\n    'dividers': rgba(map-get($shades, 'black'), 0.12),\n    'text': (\n      'theme': map-get($shades, 'white'),\n      'primary': rgba(map-get($shades, 'black'), 0.87),\n      'secondary': rgba(map-get($shades, 'black'), 0.6),\n      'disabled': rgba(map-get($shades, 'black'), 0.38),\n      'link': map-get($blue, 'darken-2'),\n      'link-hover': map-get($grey, 'darken-3')\n    ),\n    'icons': (\n      'active': rgba(map-get($shades, 'black'), 0.54),\n      'inactive': rgba(map-get($shades, 'black'), 0.38)\n    ),\n    'inputs': (\n      'box': rgba(map-get($shades, 'black'), 0.04),\n      'solo-inverted': rgba(map-get($shades, 'black'), 0.06),\n      'solo-inverted-focused': map-get($grey, 'darken-3'),\n      'solo-inverted-focused-label': rgba(map-get($shades, 'white'), .7),\n      'solo-inverted-focused-placeholder': rgba(map-get($shades, 'white'), 0.5),\n      'solo-inverted-focused-text': map-get($shades, 'white')\n    ),\n    'buttons': (\n      'disabled': rgba(map-get($shades, 'black'), 0.26),\n      'focused': rgba(map-get($shades, 'black'), 0.12),\n      'focused-alt': rgba(map-get($shades, 'white'), 0.6),\n      'pressed': rgba(#999, 0.4)\n    ),\n    'expansion-panels': (\n      'focus': map-get($grey, 'lighten-3')\n    ),\n    'navigation-drawer': map-get($shades, 'white'),\n    'selection-controls': (\n      'disabled': rgba(map-get($shades, 'black'), 0.26),\n      'thumb': (\n        'inactive': map-get($shades, 'white'),\n        'disabled': map-get($grey, 'lighten-5')\n      ),\n      'track': (\n        'inactive': rgba(map-get($shades, 'black'), 0.38),\n        'disabled': rgba(map-get($shades, 'black'), 0.12)\n      )\n    ),\n    'slider': (\n      'active': rgba(map-get($shades, 'black'), 0.38),\n      'inactive': rgba(map-get($shades, 'black'), 0.26),\n      'disabled': rgba(map-get($shades, 'black'), 0.26),\n      'discrete': map-get($shades, 'black')\n    ),\n    'skeleton': linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, .3), rgba(255, 255, 255, 0)),\n    'states': (\n      'hover': 0.04,\n      'focus': 0.12,\n      'selected': 0.08,\n      'activated': 0.12,\n      'pressed': 0.16,\n      'dragged': 0.08\n    ),\n    'tabs': rgba(0, 0, 0, 0.54),\n    'toggle-buttons': (\n      'color': map-get($shades, 'black')\n    ),\n    'text-fields': (\n      'filled': rgba(map-get($shades, 'black'), 0.06),\n      'filled-hover': rgba(map-get($shades, 'black'), 0.12),\n      'outlined': rgba(map-get($shades, 'black'), 0.38),\n      'outlined-disabled': rgba(map-get($shades, 'black'), 0.26),\n      'outlined-hover': rgba(map-get($shades, 'black'), 0.86)\n    ),\n    'toolbar': map-get($shades, 'white'),\n    'input-bottom-line': rgba(map-get($shades, 'black'), 0.42),\n    'stepper': (\n      'active': rgba(map-get($shades, 'white'), 1),\n      'completed': rgba(map-get($shades, 'black'), 0.87),\n      'hover': rgba(map-get($shades, 'black'), 0.54)\n    ),\n    'table': (\n      'active': map-get($grey, 'lighten-4'),\n      'hover': map-get($grey, 'lighten-3'),\n      'group': map-get($grey, 'lighten-3')\n    ),\n    'picker': (\n      'body': map-get($shades, 'white'),\n      'clock': map-get($grey, 'lighten-2'),\n      'indeterminateTime': map-get($grey, 'lighten-1'),\n      'title': map-get($grey, 'lighten-2')\n    ),\n    'color-picker': (\n      'checkerboard': rgba(map-get($shades, 'white'), 0)\n    ),\n    'bg-color': map-get($shades, 'white'),\n    'fg-color': map-get($shades, 'black'),\n    'text-color': map-get($shades, 'black'),\n    'primary-text-percent': 0.87,\n    'secondary-text-percent': 0.6,\n    'disabledORhints-text-percent': 0.38,\n    'divider-percent': 0.12,\n    'active-icon-percent': 0.54,\n    'inactive-icon-percent': 0.38\n  ),\n  $material-light\n);",
      description: {
        en: '',
      },
    },
  ],
  dark: [
    {
      name: '$material-dark-elevation-colors',
      default: '() !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$material-dark',
      default: "map-deep-merge(\n  (\n    'status-bar': (\n      'regular': map-get($shades, 'black'),\n      'lights-out': rgba(map-get($shades, 'black'), 0.2)\n    ),\n    'app-bar': map-get($material-dark-elevation-colors, '4'),\n    'background': #121212,\n    'bottom-navigation': map-get($material-dark-elevation-colors, '8'),\n    'surface': #121212,\n    'calendar': (\n      'background-color': #303030,\n      'outside-background-color': #202020,\n      'weeknumber-background-color': #202020,\n      'line-color': map-get($grey, 'base'),\n      'interval-color': map-get($grey, 'lighten-3'),\n      'interval-line-color': map-get($grey, 'darken-2'),\n      'text-color': map-get($shades, 'white'),\n      'past-color': rgba(map-get($shades, 'white'), .50)\n      ),\n    'cards': map-get($material-dark-elevation-colors, '1'),\n    'chips': #555,\n    'dividers': rgba(map-get($shades, 'white'), 0.12),\n    'text': (\n      'theme': map-get($shades, 'white'),\n      'primary': map-get($shades, 'white'),\n      'secondary': rgba(map-get($shades, 'white'), 0.7),\n      'disabled': rgba(map-get($shades, 'white'), 0.5),\n      'link': map-get($blue, 'accent-1'),\n      'link-hover': map-get($grey, 'lighten-3')\n    ),\n    'icons': (\n      'active': map-get($shades, 'white'),\n      'inactive': rgba(map-get($shades, 'white'), 0.5)\n    ),\n    'inputs': (\n      'box': map-get($shades, 'white'),\n      'solo-inverted': rgba(map-get($shades, 'white'), 0.16),\n      'solo-inverted-focused': map-get($shades, 'white'),\n      'solo-inverted-focused-label': rgba(map-get($shades, 'black'), .6),\n      'solo-inverted-focused-placeholder': rgba(map-get($shades, 'black'), 0.38),\n      'solo-inverted-focused-text': rgba(map-get($shades, 'black'), 0.87)\n    ),\n    'buttons': (\n      'disabled': rgba(map-get($shades, 'white'), 0.3),\n      'focused': rgba(map-get($shades, 'white'), 0.12),\n      'focused-alt': rgba(map-get($shades, 'white'), 0.1),\n      'pressed': rgba(#ccc, 0.25)\n    ),\n    'expansion-panels': (\n      'focus': #494949\n    ),\n    'navigation-drawer': map-get($material-dark-elevation-colors, '16'),\n    'selection-controls': (\n      'disabled': rgba(map-get($shades, 'white'), 0.3),\n      'thumb': (\n        'inactive': map-get($grey, 'lighten-1'),\n        'disabled': map-get($grey, 'darken-3')\n      ),\n      'track': (\n        'inactive': rgba(map-get($shades, 'white'), 0.3),\n        'disabled': rgba(map-get($shades, 'white'), 0.1)\n      )\n    ),\n    'slider': (\n      'active': rgba(map-get($shades, 'white'), 0.3),\n      'inactive': rgba(map-get($shades, 'white'), 0.2),\n      'disabled': rgba(map-get($shades, 'white'), 0.2),\n      'discrete': map-get($shades, 'white')\n    ),\n    'skeleton': linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, .05), rgba(255, 255, 255, 0)),\n    'states': (\n      'hover': 0.08,\n      'focus': 0.24,\n      'selected': 0.16,\n      'activated': 0.24,\n      'pressed': 0.32,\n      'dragged': 0.16\n    ),\n    'tabs': rgba(map-get($shades, 'white'), 0.6),\n    'toggle-buttons': (\n      'color': map-get($shades, 'white')\n    ),\n    'text-fields': (\n      'filled': rgba(map-get($shades, 'white'), 0.08),\n      'filled-hover': rgba(map-get($shades, 'white'), 0.16),\n      'outlined': rgba(map-get($shades, 'white'), 0.24),\n      'outlined-disabled': rgba(map-get($shades, 'white'), 0.16),\n      'outlined-hover': map-get($shades, 'white')\n    ),\n    'input-bottom-line': rgba(map-get($shades, 'white'), 0.7),\n    'stepper': (\n      'active': rgba(map-get($shades, 'white'), 1),\n      'completed': rgba(map-get($shades, 'white'), 0.87),\n      'hover': rgba(map-get($shades, 'white'), 0.75)\n    ),\n    'table': (\n      'active': #505050,\n      'hover': map-get($grey, 'darken-2'),\n      'group': map-get($grey, 'darken-2')\n    ),\n    'toolbar': map-get($material-dark-elevation-colors, '4'),\n    'picker': (\n      'body': map-get($grey, 'darken-3'),\n      'clock': map-get($grey, 'darken-2'),\n      'indeterminateTime': map-get($grey, 'darken-1'),\n      'title': map-get($grey, 'darken-2')\n    ),\n    'color-picker': (\n      'checkerboard': rgba(map-get($shades, 'white'), 0.12)\n    ),\n    'bg-color': #303030,\n    'fg-color': map-get($shades, 'white'),\n    'text-color': map-get($shades, 'white'),\n    'primary-text-percent': 1,\n    'secondary-text-percent': 0.7,\n    'disabledORhints-text-percent': 0.5,\n    'divider-percent': 0.12,\n    'active-icon-percent': 1,\n    'inactive-icon-percent': 0.5\n  ),\n  $material-dark\n);",
      description: {
        en: '',
      },
    },
  ],
  'v-app-bar': [
    {
      name: '$app-bar-border-radius',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$app-bar-elevation',
      default: '4 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$app-bar-scrolled-title-padding-bottom',
      default: '9px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$app-bar-shaped-border-radius',
      default: "map-get($rounded, 'xl') $app-bar-border-radius !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$app-bar-transition',
      default: ".4s opacity map-get($transition, 'fast-out-slow-in') !default;",
      description: {
        en: '',
      },
    },
  ],
  'v-alert': [
    {
      name: '$alert-elevation',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$alert-border-opacity',
      default: '0.26 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$alert-border-radius',
      default: '$border-radius-root !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$alert-shaped-border-radius',
      default: "map-get($rounded, 'xl') $alert-border-radius !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$alert-border-width',
      default: '4px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$alert-dense-border-width',
      default: 'medium !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$alert-font-size',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$alert-icon-size',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$alert-margin',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$alert-outline',
      default: 'thin solid currentColor !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$alert-padding',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$alert-prominent-icon-font-size',
      default: '32px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$alert-prominent-icon-size',
      default: '48px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-autocomplete': [
    {
      name: '$autocomplete-enclosed-input-margin-top',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$autocomplete-dense-enclosed-input-margin-top',
      default: '20px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$autocomplete-focused-input',
      default: '64px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-avatar': [
    {
      name: '$avatar-border-radius',
      default: '50% !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-badge': [
    {
      name: '$badge-border-radius',
      default: '10px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$badge-bordered-width',
      default: '2px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$badge-color',
      default: "map-get($shades, 'white') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$badge-dot-border-radius',
      default: '4.5px;',
      description: {
        en: '',
      },
    },
    {
      name: '$badge-dot-border-width',
      default: '1.5px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$badge-dot-height',
      default: '9px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$badge-dot-width',
      default: '9px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$badge-font-family',
      default: '$body-font-family !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$badge-font-size',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$badge-height',
      default: '20px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$badge-icon-margin',
      default: '0 -2px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$badge-icon-padding',
      default: '4px 6px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$badge-letter-spacing',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$badge-line-height',
      default: '1 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$badge-min-width',
      default: '20px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$badge-padding',
      default: '4px 6px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$badge-right',
      default: 'auto !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$badge-top',
      default: 'auto !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$badge-wrapper-margin',
      default: '0 4px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-banner': [
    {
      name: '$banner-actions-start-margin',
      default: '90px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$banner-actions-margin',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$banner-border-radius',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$banner-elevation',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$banner-line-height',
      default: '20px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$banner-start-padding',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$banner-end-padding',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$banner-y-padding',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$banner-icon-padding',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$banner-content-padding',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$banner-mobile-padding',
      default: '10px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$banner-mobile-multiline-padding',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$banner-mobile-start-padding',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$banner-mobile-top-padding',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$banner-mobile-actions-top-padding',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$banner-mobile-singleline-padding',
      default: '36px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$banner-shaped-border-radius',
      default: "map-get($rounded, 'xl') $banner-border-radius !default;",
      description: {
        en: '',
      },
    },
  ],
  'v-bottom-navigation': [
    {
      name: '$bottom-nav-btn-font-size',
      default: "map-deep-get($headings, 'caption', 'size') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$bottom-nav-btn-min-width',
      default: '80px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$bottom-nav-btn-max-width',
      default: '168px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$bottom-nav-shift-btn-top',
      default: 'calc(100% - 12px) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$bottom-nav-shift-btn-active-top',
      default: 'calc(100% - 22px) !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-bottom-sheet': [
    {
      name: '$bottom-sheet-inset-width',
      default: '70% !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-breadcrumbs': [
    {
      name: '$breadcrumbs-flex',
      default: '0 1 auto !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$breadcrumbs-padding',
      default: '0 14px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$breadcrumbs-even-child-padding',
      default: '0 12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$breadcrumbs-item-font-size',
      default: '14px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$breadcrumbs-item-large-font-size',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$breadcrumbs-margin',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-btn': [
    {
      name: '$btn-active-opacity',
      default: '0.18 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$btn-border-radius',
      default: '$border-radius-root !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$btn-focus-opacity',
      default: '0.24 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$btn-font-weight',
      default: '500 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$btn-hover-opacity',
      default: '0.08 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$btn-icon-font-size',
      default: '18px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$btn-icon-padding',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$btn-letter-spacing',
      default: '.0892857143em !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$btn-outline-border-width',
      default: 'thin !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$btn-rounded-border-radius',
      default: '28px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$btn-text-transform',
      default: 'uppercase !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$btn-transition-duration',
      default: '0.28s !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$btn-transition-fn',
      default: "map-get($transition, 'fast-out-slow-in') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$btn-transition',
      default: "opacity 0.2s map-get($transition, 'ease-in-out') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$btn-sizes',
      default: "map-deep-merge(\n  (\n    'x-small': 20,\n    'small': 28,\n    'default': 36,\n    'large': 44,\n    'x-large': 52\n  ),\n  $btn-sizes\n);",
      description: {
        en: '',
      },
    },
    {
      name: '$btn-font-sizes',
      default: "map-deep-merge(\n  (\n    'x-small': .625rem,\n    'small': .75rem,\n    'default': .875rem,\n    'large': .875rem,\n    'x-large': 1rem\n  ),\n  $btn-font-sizes\n);",
      description: {
        en: '',
      },
    },
    {
      name: '$fab-sizes',
      default: "map-deep-merge(\n  (\n    'x-small': 32,\n    'small': 40,\n    'default': 56,\n    'large': 64,\n    'x-large': 72\n  ),\n  $fab-sizes\n);",
      description: {
        en: '',
      },
    },
    {
      name: '$fab-icon-sizes',
      default: "map-deep-merge(\n  (\n    'x-small': 18,\n    'small': 24,\n    'default': 24,\n    'large': 28,\n    'x-large': 32\n  ),\n  $fab-icon-sizes\n);",
      description: {
        en: '',
      },
    },
  ],
  'v-btn-toggle': [
    {
      name: '$btn-toggle-border-radius',
      default: '$border-radius-root !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$btn-toggle-shaped-border-radius',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$btn-toggle-btn-height',
      default: '48px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$btn-toggle-btn-padding',
      default: '0 12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$btn-toggle-btn-width',
      default: '48px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$btn-toggle-btn-opacity',
      default: '0.8 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$btn-toggle-round-border-radius',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$btn-toggle-dense-btn-padding',
      default: '0 8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$btn-toggle-group-btn-margin',
      default: '4px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-calendar': [
    {
      name: '$calendar-line-width',
      default: '1px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-daily-weekday-padding',
      default: '3px 0px 0px 0px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-daily-weekday-font-size',
      default: '11px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-daily-day-padding',
      default: '0px 0px 3px 0px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-daily-day-font-size',
      default: '40px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-daily-interval-gutter-top',
      default: '-6px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-daily-interval-gutter-width',
      default: '4px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-daily-interval-gutter-align',
      default: 'right !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-daily-interval-gutter-line-width',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-daily-interval-gutter-font-size',
      default: '10px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-weekly-weekday-padding',
      default: '0px 4px 0px 4px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-weekly-weekday-font-size',
      default: '11px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-weekly-day-padding',
      default: '0px 0px 0px 0px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-weekly-day-label-size',
      default: '32px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-weekly-day-label-font-size',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-weekly-day-label-margin',
      default: '4px 0 0 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-weekly-day-month-left',
      default: '36px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-weekly-weeknumber-flex-basis',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-weekly-weeknumber-padding-top',
      default: '14.5px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-event-bottom-space',
      default: '1px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-event-border-width',
      default: '1px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-event-border-radius',
      default: '$border-radius-root !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-event-font-size',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-event-line-height',
      default: '20px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$calendar-event-right-empty',
      default: '10px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-card': [
    {
      name: '$card-actions-padding',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$card-adjacent-sibling-text-padding-top',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$card-border-radius',
      default: '$border-radius-root !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$card-btn-margin-x',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$card-btn-padding',
      default: '0 8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$card-btn-small-margin-x',
      default: '4px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$card-disabled-opacity',
      default: '0.6 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$card-elevation',
      default: '2 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$card-hover-elevation',
      default: '8 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$card-link-focus-opacity',
      default: '0.08 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$card-outlined-border-width',
      default: 'thin !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$card-overflow-wrap',
      default: 'break-word !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$card-raised-elevation',
      default: '8 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$card-shaped-border-radius',
      default: "map-get($rounded, 'xl') $card-border-radius !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$card-subtitle-padding',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$card-text-font-size',
      default: "map-deep-get($headings, 'subtitle-2', 'size') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$card-text-font-weight',
      default: '400 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$card-text-letter-spacing',
      default: "map-deep-get($headings, 'subtitle-2', 'letter-spacing') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$card-text-line-height',
      default: "map-deep-get($headings, 'subtitle-2', 'line-height') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$card-title-adjacent-sibling-subtitle-margin-top',
      default: '-16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$card-title-adjacent-sibling-subtitle-text-padding-top',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$card-title-font-size',
      default: "map-deep-get($headings, 'h6', 'size') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$card-title-font-weight',
      default: "map-deep-get($headings, 'h6', 'weight') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$card-title-letter-spacing',
      default: "map-deep-get($headings, 'h6', 'letter-spacing') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$card-title-line-height',
      default: "map-deep-get($headings, 'h6', 'line-height') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$card-title-word-break',
      default: 'break-all !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$card-white-space',
      default: 'normal !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-carousel': [
    {
      name: '$carousel-controls-bg',
      default: 'rgba(0, 0, 0, .3) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$carousel-controls-size',
      default: '50px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$carousel-dot-margin',
      default: '0 8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$carousel-dot-inactive-opacity',
      default: '.5 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$carousel-dot-active-opacity',
      default: '1 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$carousel-dot-hover-opacity',
      default: '.8 !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-checkbox': [
    {
      name: '$checkbox-disabled-opacity',
      default: '.6 !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-chip': [
    {
      name: '$chip-avatar-size',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-close-size',
      default: '18px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-icon-margin-after',
      default: '6px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-icon-margin-before',
      default: '-6px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-icon-right-margin-after',
      default: '-4px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-icon-right-margin-before',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-icon-size',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-label-border-radius',
      default: '$border-radius-root !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-link-focus-opacity',
      default: '0.32 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-pill-avatar-margin-after',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-pill-avatar-margin-before',
      default: '-12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-pill-avatar-size',
      default: '32px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-pill-filter-margin',
      default: '0 16px 0 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-transition-duration',
      default: '0.28s !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-transition-fn',
      default: "map-get($transition, 'fast-out-slow-in') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$icon-outlined-border-width',
      default: 'thin !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-line-height',
      default: '20px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-padding',
      default: '0 12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-white-space',
      default: 'nowrap !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-disabled-opacity',
      default: '0.4 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-filter-max-width',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-outlined-active-opacity',
      default: '0.08 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-selected-opacity',
      default: '0.28 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$icon-sizes',
      default: "map-deep-merge(\n  (\n    'x-small': (\n      'font-size': 10,\n      'height': 16\n    ),\n    'small': (\n      'font-size': 12,\n      'height': 24\n    ),\n    'default': (\n      'font-size': 14,\n      'height': 32\n    ),\n    'large': (\n      'font-size': 16,\n      'height': 54\n    ),\n    'x-large': (\n      'font-size': 18,\n      'height': 66\n    )\n  ),\n  $icon-sizes\n);",
      description: {
        en: '',
      },
    },
  ],
  'v-chip-group': [
    {
      name: '$chip-group-content-padding',
      default: '4px 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-group-margin',
      default: '4px 8px 4px 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-group-no-color-focus-opacity',
      default: '.32 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-group-no-color-opacity',
      default: '.22 !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-color-picker': [
    {
      name: '$color-picker-border-radius',
      default: '$border-radius-root !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$color-picker-checkerboard',
      default: 'url(data:image/png;',
      description: {
        en: '',
      },
    },
    {
      name: '$color-picker-swatch-color-width',
      default: '45px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$color-picker-swatch-color-height',
      default: '18px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$color-picker-swatch-color-margin',
      default: '2px 4px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$color-picker-swatch-color-border-radius',
      default: '2px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$color-picker-swatch-margin-bottom',
      default: '10px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$color-picker-swatches-border-radius',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$color-picker-canvas-dot-size',
      default: '15px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$color-picker-canvas-dot-box-shadow',
      default: '0px 0px 0px 1.5px rgba(255, 255, 255, 1), inset 0px 0px 1px 1.5px rgba(0, 0, 0, 0.3) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$color-picker-canvas-dot-disabled-box-shadow',
      default: '0px 0px 0px 1.5px rgba(255, 255, 255, 0.7), inset 0px 0px 1px 1.5px rgba(0, 0, 0, 0.3) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$color-picker-controls-padding',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$color-picker-edit-margin-top',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$color-picker-input-height',
      default: '28px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$color-picker-input-font-size',
      default: '0.75rem !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$color-picker-input-margin',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$color-picker-input-margin-bottom',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$color-picker-slider-height',
      default: '10px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$color-picker-slider-border-radius',
      default: '$color-picker-slider-height / 2 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$color-picker-preview-dot-size',
      default: '30px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$color-picker-preview-dot-margin',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$color-picker-hue-margin-bottom',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-counter': [
    {
      name: '$counter-font-size',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$counter-line-height',
      default: '$counter-font-size !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$counter-min-height',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-data-iterator': [
    {
      name: '$data-footer-font-size',
      default: "map-deep-get($headings, 'caption', 'size') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$data-footer-icons-after-btn-margin-start',
      default: '7px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-footer-icons-before-btn-margin-end',
      default: '7px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-footer-padding',
      default: '0 8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-footer-pagination-margin-end',
      default: '32px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-footer-pagination-margin-start',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-footer-select-margin-end',
      default: '14px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-footer-select-select-margin-start',
      default: '34px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-footer-select-select-margin-y',
      default: '13px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-footer-select-selections-comma-font-size',
      default: "map-deep-get($headings, 'caption', 'size') !default;",
      description: {
        en: '',
      },
    },
  ],
  'v-data-table': [
    {
      name: '$data-table-border-radius',
      default: '$border-radius-root !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-table-dense-header-height',
      default: '32px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-table-dense-row-height',
      default: '$data-table-dense-header-height !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-table-expanded-content-box-shadow',
      default: 'inset 0px 4px 8px -5px rgba(50, 50, 50, 0.75), inset 0px -4px 8px -5px rgba(50, 50, 50, 0.75) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-table-header-mobile-select-chip-height',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-table-header-mobile-select-margin-bottom',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-table-header-mobile-select-max-width',
      default: '56px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-table-header-sort-badge-height',
      default: '18px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-table-header-sort-badge-min-height',
      default: '18px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-table-header-sort-badge-min-width',
      default: '18px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-table-header-sort-badge-width',
      default: '18px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-table-mobile-row-header-font-weight',
      default: '600 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-table-mobile-row-min-height',
      default: '48px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-table-progress-border-radius',
      default: '$data-table-border-radius $data-table-border-radius 0 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-table-regular-header-height',
      default: '48px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-table-regular-row-height',
      default: '48px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-table-row-group-children-td-height',
      default: '35px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-table-scroll-bar-width',
      default: '17px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$edit-dialog-content-padding',
      default: '0 16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$edit-dialog-actions-padding',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$data-table-regular-header-font-size',
      default: "map-deep-get($headings, 'caption', 'size') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$data-table-regular-row-font-size',
      default: "map-deep-get($headings, 'subtitle-2', 'size') !default;",
      description: {
        en: '',
      },
    },
  ],
  'v-date-picker': [
    {
      name: '$date-picker-years-font-size',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-years-font-weight',
      default: '400 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-years-portrait-height',
      default: '290px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-years-landscape-height',
      default: '290px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-years-item-padding',
      default: '8px 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-years-active-font-size',
      default: '26px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-years-active-font-weight',
      default: '500 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-years-active-padding',
      default: '10px 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-years-item-hover-background',
      default: 'rgba(0, 0, 0, 0.12) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-years-item-align',
      default: 'center !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-title-year-font-size',
      default: '14px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-title-year-font-weight',
      default: '500 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-title-year-bottom-margin',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-title-date-font-size',
      default: '34px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-title-date-font-weight',
      default: '500 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-header-padding',
      default: '4px 16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-header-value-transition',
      default: '$primary-transition !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-header-button-font-weight',
      default: 'bold !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-header-button-padding',
      default: '0.5rem !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-header-button-transition',
      default: '$primary-transition !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-table-padding',
      default: '0 12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-table-height',
      default: '242px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-table-font-size',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-table-date-button-width',
      default: '32px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-table-date-button-height',
      default: '32px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-table-active-date-color',
      default: "map-get($shades, 'white') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-table-month-height',
      default: '56px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-table-month-min-width',
      default: '40px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-table-month-max-width',
      default: '140px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-table-date-padding',
      default: '8px 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-table-date-font-weight',
      default: '600 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-table-date-width',
      default: '45px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-event-size',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-event-margin',
      default: '0 1px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-event-border-radius',
      default: '50% !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-event-month-bottom',
      default: '6px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$date-picker-event-date-bottom',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-dialog': [
    {
      name: '$dialog-border-radius',
      default: '$border-radius-root !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$dialog-card-subtitle-padding',
      default: '0 24px 20px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$dialog-card-text-padding',
      default: '0 24px 20px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$dialog-card-title-font-size',
      default: "map-deep-get($headings, 'h6', 'size') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$dialog-card-title-font-weight',
      default: "map-deep-get($headings, 'h6', 'weight') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$dialog-card-title-letter-spacing',
      default: "map-deep-get($headings, 'h6', 'letter-spacing') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$dialog-card-title-padding',
      default: '16px 24px 10px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$dialog-elevation',
      default: '24 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$dialog-margin',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$dialog-max-height',
      default: '90% !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-divider': [
    {
      name: '$divider-inset-margin',
      default: '72px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$divider-inset-margin-top',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$divider-inset-max-height',
      default: 'calc(100% - 16px) !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-expansion-panel': [
    {
      name: '$expansion-panel-border-radius',
      default: '$border-radius-root !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$expansion-panel-active-margin',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$expansion-panel-header-font-size',
      default: '0.9375rem !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$expansion-panel-header-min-height',
      default: '48px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$expansion-panel-active-header-min-height',
      default: '64px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$expansion-panel-header-padding',
      default: '16px 24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$expansion-panel-content-padding',
      default: '0 24px 16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$expansion-panel-popout-max-width',
      default: 'calc(100% - #{$expansion-panel-active-margin * 2}) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$expansion-panel-popout-active-max-width',
      default: 'calc(100% + #{$expansion-panel-active-margin}) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$expansion-panel-inset-max-width',
      default: '100% !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$expansion-panel-inset-active-max-width',
      default: 'calc(100% - #{$expansion-panel-active-margin * 2}) !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-file-input': [
    {
      name: '$file-input-filled-padding-top',
      default: '22px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$file-input-chip-margin',
      default: '4px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$file-input-outlined-padding',
      default: '6px 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$file-input-outlined-dense-padding',
      default: '3px 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$file-input-slot-min-height',
      default: '32px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-footer': [
    {
      name: '$footer-border-radius',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$footer-elevation',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$footer-padding',
      default: '6px 16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$footer-padless-padding',
      default: '0px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$footer-shaped-border-radius',
      default: "map-get($rounded, 'xl') $footer-border-radius !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$footer-transition-duration',
      default: '0.2s !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$footer-transition-property',
      default: 'background-color, left, right !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$footer-transition-timing-function',
      default: "map-get($transition, 'fast-out-slow-in') !default;",
      description: {
        en: '',
      },
    },
  ],
  'v-icon': [
    {
      name: '$icon-size',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$icon-size-dense',
      default: '20px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-img': [
    {
      name: '$img-preload-filter',
      default: 'blur(2px) !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-input': [
    {
      name: '$input-font-size',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$input-letter-spacing',
      default: 'normal !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$input-text-align',
      default: 'left !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$input-max-height',
      default: '32px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$input-label-height',
      default: '20px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$input-label-letter-spacing',
      default: '20px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$input-prepend-append-outer-margin',
      default: '9px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$input-icon-height',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$input-icon-min-width',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$input-icon-width',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$input-slot-margin-bottom',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$input-dense-slot-margin-bottom',
      default: '4px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-item-group': [
    {
      name: '$item-group-transition',
      default: '$primary-transition !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-label': [
    {
      name: '$label-font-size',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$label-line-height',
      default: '1 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$label-min-height',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-list': [
    {
      name: '$avatar-margin-x',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-border-radius',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-elevation',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-dense-subheader-font-size',
      default: '0.75rem !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-dense-subheader-height',
      default: '40px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-avatar-margin-y',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-avatar-horizontal-margin-x',
      default: '-16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-icon-margin-y',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-min-height',
      default: '48px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-two-line-min-height',
      default: '64px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-three-line-min-height',
      default: '88px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-title-font-size',
      default: "map-deep-get($headings, 'subtitle-1', 'size') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-subtitle-font-size',
      default: "map-deep-get($headings, 'subtitle-2', 'size') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-dense-title-font-size',
      default: '0.8125rem !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-dense-title-font-weight',
      default: '500 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-padding',
      default: '8px 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-dense-subheading-padding',
      default: '0 8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-nav-border-radius',
      default: '$border-radius-root !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-nav-rounded-item-margin-bottom',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-nav-rounded-item-dense-margin-bottom',
      default: '4px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-nav-padding-left',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-nav-padding-right',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-nav-item-padding',
      default: '0 8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-shaped-padding',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-subheader-padding-top',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-group-header-icon-min-width',
      default: '48px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-group-sub-group-child-margin',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-group-sub-group-header-margin',
      default: '32px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-group-items-item-padding',
      default: '40px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-group-no-action-item-padding',
      default: '72px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-dense-subheader-padding',
      default: '0 8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-nav-rounded-dense-item-margin-bottom',
      default: '4px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-group-no-action-sub-group-item-padding',
      default: '88px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-group-dense-sub-group-header-padding',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-group-nav-no-action-item-padding',
      default: '64px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-group-sub-group-item-padding',
      default: '80px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-padding',
      default: '0 16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-action-margin',
      default: '12px 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-action-text-font-size',
      default: "map-deep-get($headings, 'caption', 'size') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-avatar-horizontal-margin',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-content-padding',
      default: '12px 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-content-children-margin-bottom',
      default: '2px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-icon-margin',
      default: '16px 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-child-last-type-margin',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-child-min-width',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-title-subtitle-line-height',
      default: '1.2 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-avatar-first-child-margin',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-action-icon-margin',
      default: '32px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-dense-icon-height',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-dense-icon-margin',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-dense-min-height',
      default: '40px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-dense-title-line-height',
      default: '1rem !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-dense-two-line-min-height',
      default: '60px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-dense-three-line-min-height',
      default: '76px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-dense-content-padding',
      default: '8px 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-two-line-icon-margin-bottom',
      default: '32px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$list-item-three-line-avatar-action-margin',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-main': [
    {
      name: '$main-transition',
      default: "0.2s map-get($transition, 'fast-out-slow-in') !default;",
      description: {
        en: '',
      },
    },
  ],
  'v-menu': [
    {
      name: '$menu-content-border-radius',
      default: '$border-radius-root !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$menu-content-elevation',
      default: '8 !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-messages': [
    {
      name: '$messages-font-size',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$messages-line-height',
      default: '$messages-font-size !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$messages-min-height',
      default: '14px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-navigation-drawer': [
    {
      name: '$navigation-drawer-border-width',
      default: '1px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$navigation-drawer-mobile-temporary-elevation',
      default: '16 !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-overflow-btn': [
    {
      name: '$overflow-active-slot-border-radius',
      default: '$border-radius-root $border-radius-root 0 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$overflow-append-inner-height',
      default: '48px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$overflow-append-inner-width',
      default: '42px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$overflow-append-prepend-margin-bottom',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$overflow-append-prepend-margin-top',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$overflow-dense-input-margin-x',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$overflow-dense-slot-height',
      default: '38px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$overflow-focused-active-border-radius',
      default: '$border-radius-root !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$overflow-focused-active-slot-box-shadow',
      default: '0 1px 6px 0 rgba(32,33,36,0.28) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$overflow-focused-active-slot-elevation',
      default: '2 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$overflow-input-slot-border-width',
      default: '2px 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$overflow-label-margin-x',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$overflow-label-top',
      default: 'calc(50% - 10px) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$overflow-margin-top',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$overflow-menu-content-box-shadow',
      default: '0 4px 6px 0 rgba(32,33,36,0.28) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$overflow-menu-content-select-list-border-radius',
      default: '0 0 $border-radius-root $border-radius-root !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$overflow-segmented-input-slot-border-width',
      default: 'thin 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$overflow-segmented-selections-btn-height',
      default: '48px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$overflow-segmented-selections-btn-margin-x',
      default: '-16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$overflow-selection-comma-margin-x',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$overflow-slot-height',
      default: '48px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$overflow-editable-select-slot-padding',
      default: '8px 16px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-overlay': [
    {
      name: '$overlay-transition',
      default: '$primary-transition, z-index 1ms !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-pagination': [
    {
      name: '$pagination-border-radius',
      default: '$border-radius-root !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$pagination-disabled-opacity',
      default: '0.6 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$pagination-item-font-size',
      default: "map-deep-get($headings, 'subtitle-1', 'size') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$pagination-item-height',
      default: '34px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$pagination-item-margin',
      default: '.3rem !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$pagination-item-min-width',
      default: '34px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$pagination-item-padding',
      default: '0 5px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$pagination-more-height',
      default: '32px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$pagination-more-margin',
      default: '.3rem !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$pagination-more-width',
      default: '32px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$pagination-navigation-disabled-opacity',
      default: '0.6 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$pagination-navigation-height',
      default: '32px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$pagination-navigation-margin',
      default: '.3rem 10px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$pagination-navigation-width',
      default: '32px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-sheet': [
    {
      name: '$sheet-border-radius',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$sheet-elevation',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$sheet-outlined-border-width',
      default: 'thin !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$sheet-shaped-border-radius',
      default: "map-get($rounded, 'xl') $sheet-border-radius !default;",
      description: {
        en: '',
      },
    },
  ],
  'v-parallax': [
    {
      name: '$parallax-transition',
      default: ".3s opacity map-get($transition, 'swing') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$parallax-padding',
      default: '0 1rem !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-picker': [
    {
      name: '$picker-border-radius',
      default: '$border-radius-root !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$picker-title-padding',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$picker-inactive-btn-opacity',
      default: '.6 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$picker-active-btn-opacity',
      default: '1 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$picker-landscape-title-width',
      default: '170px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$picker-font-size',
      default: '1rem !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-progress-circular': [
    {
      name: '$progress-circular-rotate-animation',
      default: 'progress-circular-rotate 1.4s linear infinite !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$progress-circular-rotate-dash',
      default: 'progress-circular-dash 1.4s ease-in-out infinite !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$process-circular-intermediate-svg-transition',
      default: 'all .2s ease-in-out !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$progress-circular-underlay-stroke',
      default: "rgba(map-get($shades, 'black'), 0.1) !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$progress-circular-overlay-transition',
      default: 'all .6s ease-in-out !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-progress-linear': [
    {
      name: '$progress-linear-border-radius',
      default: '$border-radius-root !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$progress-linear-stream-opacity',
      default: '0.3 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$progress-linear-stream-border-width',
      default: '4px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$progress-linear-stripe-gradient',
      default: 'linear-gradient(\n  135deg,\n  hsla(0, 0%, 100%, .25) 25%,\n  transparent 0,\n  transparent 50%,\n  hsla(0, 0%, 100%, .25) 0,\n  hsla(0, 0%, 100%, .25) 75%,\n  transparent 0,\n  transparent\n) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$progress-linear-stripe-background-size',
      default: '40px 40px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-radio-group': [
    {
      name: '$radio-margin-right',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$radio-group-padding',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-rating': [
    {
      name: '$rating-padding',
      default: '0.5rem !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$rating-border-radius',
      default: '50% !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$rating-dense-padding',
      default: '0.1rem !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-responsive': [
    {
      name: '$responsive-transition',
      default: "padding-bottom 0.2s map-get($transition, 'swing') !default;",
      description: {
        en: '',
      },
    },
  ],
  'v-select': [
    {
      name: '$select-chip-margin',
      default: '4px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$select-dense-chip-margin',
      default: '0 4px 0 4px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$select-selected-chip-opacity',
      default: '.22 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$select-prefix-line-height',
      default: '20px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$select-prefix-top',
      default: '7px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$select-selections-padding-top',
      default: '20px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$select-outlined-selections-padding-top',
      default: '8px 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$select-outlined-dense-selections-padding-top',
      default: '4px 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$select-chips-selections-padding-top',
      default: '42px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$select-active-icon-flip',
      default: 'true !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$select-chips-dense-selections-padding-top',
      default: '40px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$select-active-chip-opacity',
      default: '0.2 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$select-small-chips-selections-min-height',
      default: '26px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$select-chips-box-enclosed-selections-min-height',
      default: '68px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$select-chips-dense-selections-min-height',
      default: '40px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$select-small-chips-dense-selections-min-height',
      default: '38px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$select-selections-line-height',
      default: '18px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$select-selections-margin',
      default: '7px 4px 7px 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$select-dense-selections-margin',
      default: '5px 4px 3px 0 !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-skeleton-loader': [
    {
      name: '$skeleton-loader-actions-button-margin',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-actions-padding',
      default: '16px 16px 8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-article-heading-margin-top-left',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-article-heading-margin-x',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-article-paragraph-padding',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-avatar-height',
      default: '56px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-avatar-width',
      default: '48px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-border-radius',
      default: '$border-radius-root !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-button-border-radius',
      default: '$border-radius-root !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-button-height',
      default: '36px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-button-width',
      default: '64px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-card-heading-loader-heading-margin',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-card-text-padding',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-chip-border-radius',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-chip-height',
      default: '32px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-chip-width',
      default: '96px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-date-picker-border-radius',
      default: 'inherit !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-date-picker-days-height',
      default: '40px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-date-picker-days-margin',
      default: '4px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-date-picker-days-padding',
      default: '0 12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-date-picker-days-width',
      default: '40px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-date-picker-options-avatar-child-margin',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-date-picker-options-avatar-height',
      default: '40px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-date-picker-options-avatar-width',
      default: '40px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-date-picker-options-padding',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-divider-border-radius',
      default: '1px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-divider-height',
      default: '2px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-heading-border-radius',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-heading-height',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-image-height',
      default: '200px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-item-avatar-height',
      default: '40px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-item-avatar-margin',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-item-avatar-width',
      default: '40px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-item-padding',
      default: '0 16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-item-three-line-height',
      default: '88px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-item-two-line-height',
      default: '72px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-list-item-height',
      default: '48px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-loading-animation',
      default: 'loading 1.5s infinite !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-loading-transform',
      default: 'translateX(-100%) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-table-cell-height',
      default: '48px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-table-cell-width',
      default: '88px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-table-heading-padding',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-table-tbody-padding',
      default: '16px 16px 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-table-tfoot-avatar-height',
      default: '40px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-table-tfoot-avatar-width',
      default: '40px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-table-tfoot-children-margin',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-table-tfoot-padding',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-table-thead-heading-padding',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-table-thead-padding',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-text-border-radius',
      default: '6px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$skeleton-loader-text-height',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-slider': [
    {
      name: '$chip-group-no-color-opacity',
      default: '.22 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$chip-group-opacity',
      default: '.32 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$slider-horizontal-left',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$slider-horizontal-min-height',
      default: '32px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$slider-horizontal-right',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$slider-label-margin-end',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$slider-label-margin-start',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$slider-state-track-background-opacity',
      default: '0.4 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$slider-thumb-before-opacity',
      default: '0.3 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$slider-thumb-border-radius',
      default: '50% !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$slider-thumb-focused-size-increase',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$slider-thumb-label-font-size',
      default: "map-deep-get($headings, 'caption', 'size') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$slider-thumb-label-height',
      default: '32px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$slider-thumb-label-transition',
      default: ".3s map-get($transition, 'fast-in-fast-out') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$slider-thumb-label-width',
      default: '32px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$slider-thumb-size',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$slider-tick-border-radius',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$slider-track-border-radius',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$slider-track-width',
      default: '2px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$slider-transition',
      default: ".3s map-get($transition, 'swing') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$slider-vertical-margin-bottom',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$slider-vertical-margin-top',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$slider-vertical-min-height',
      default: '150px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-slide-group': [
    {
      name: '$slide-group-prev-basis',
      default: '52px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-snackbar': [
    {
      name: '$snackbar-absolute-z-index',
      default: '1 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-action-margin',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-background-color',
      default: '#333333 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-border-radius',
      default: '$border-radius-root !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-bottom',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-btn-padding',
      default: '0 8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-color',
      default: 'hsla(0, 0%, 100%, .87) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-content-font-size',
      default: "map-deep-get($headings, 'body-2', 'size') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-content-font-weight',
      default: "map-deep-get($headings, 'body-2', 'weight') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-content-letter-spacing',
      default: "map-deep-get($headings, 'body-2', 'letter-spacing') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-content-line-height',
      default: "map-deep-get($headings, 'body-2', 'line-height') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-content-padding',
      default: '14px 16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-content-text-transform',
      default: "map-deep-get($headings, 'body-2', 'text-transform') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-elevation',
      default: '6 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-left',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-multi-line-wrapper-min-height',
      default: '68px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-right',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-shaped-border-radius',
      default: "map-get($rounded, 'xl') $snackbar-border-radius !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-top',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-transition-wrapper-transform',
      default: '.8 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-vertical-action-margin-bottom',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-vertical-wrapper-btn-margin-top',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-vertical-wrapper-padding',
      default: 'initial !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-wrapper-margin',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-wrapper-max-width',
      default: '$snackbar-content-max-width !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-wrapper-min-height',
      default: '48px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-wrapper-min-width',
      default: '$snackbar-content-min-width !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-wrapper-padding',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-z-index',
      default: '1000 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-btn-margin-right',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-content-first-btn-margin',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-corner-offset',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$snackbar-font-size',
      default: '$snackbar-content-font-size !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-speed-dial': [
    {
      name: '$speed-dial-padding',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$speed-dial-button-margin',
      default: '6px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$speed-dial-z-index',
      default: '1 !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-stepper': [
    {
      name: '$stepper-alt-labels-flex-basis',
      default: '175px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-alt-labels-header-divider',
      default: '35px -67px 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-alt-labels-step-step-margin-bottom',
      default: '11px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-border-radius',
      default: '$border-radius-root !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-content-btn-margin',
      default: '24px 8px 8px 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-content-padding',
      default: '24px 24px 16px 24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-elevation',
      default: '2 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-header-divider-margin',
      default: '0 -16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-header-elevation',
      default: '2 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-header-height',
      default: '72px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-label-line-height',
      default: '1 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-label-small-font-size',
      default: "map-deep-get($headings, 'caption', 'size') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-label-small-font-weight',
      default: '300 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-step-error-icon-font-size',
      default: "map-deep-get($headings, 'h5', 'size')  !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-step-padding',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-step-step-font-size',
      default: "map-deep-get($headings, 'caption', 'size') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-step-step-height',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-step-step-icon-font-size',
      default: "map-deep-get($headings, 'h6', 'size') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-step-step-margin',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-step-step-min-width',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-step-step-width',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-vertical-content-ltr-margin',
      default: '-8px -36px -16px 36px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-vertical-content-rtl-margin',
      default: '-8px 36px -16px -36px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-vertical-content-padding',
      default: '16px 60px 16px 23px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-vertical-padding-bottom',
      default: '36px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-vertical-step-padding',
      default: '24px 24px 16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$stepper-vertical-step-step-margin',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-subheader': [
    {
      name: '$subheader-inset-margin',
      default: '56px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$subheader-item-single-height',
      default: '48px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$subheader-left-padding',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$subheader-right-padding',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-switch': [
    {
      name: '$switch-dirty-offset-x',
      default: '20px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-disabled-opacity',
      default: '.6 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-ripple-dense-top',
      default: 'calc(50% - 22px) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-ripple-dense-x',
      default: '-12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-ripple-top',
      default: 'calc(50% - 24px) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-ripple-x',
      default: '-14px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-thumb-dense-height',
      default: '18px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-thumb-dense-width',
      default: '18px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-thumb-elevation',
      default: '4 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-thumb-height',
      default: '20px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-thumb-top',
      default: 'calc(50% - 10px) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-thumb-width',
      default: '20px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-track-border-radius',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-track-dense-height',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-track-dense-inset-height',
      default: '22px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-track-dense-inset-width',
      default: '44px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-track-dense-top',
      default: 'calc(50% - 12px) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-track-dense-width',
      default: '32px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-track-height',
      default: '14px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-track-inset-border-radius',
      default: '14px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-track-inset-height',
      default: '28px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-track-inset-opacity',
      default: '.32 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-track-inset-width',
      default: '48px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-track-opacity',
      default: '.6 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-track-top',
      default: 'calc(50% - 7px) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-track-width',
      default: '36px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-track-x',
      default: '2px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$switch-width',
      default: '38px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-system-bar': [
    {
      name: '$system-bar-font-size',
      default: "map-deep-get($headings, 'body-2', 'size') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$system-bar-font-weight',
      default: "map-deep-get($headings, 'body-2', 'weight') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$system-bar-icon-font-size',
      default: "map-deep-get($headings, 'subtitle-1', 'size') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$system-bar-padding',
      default: '0 8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$system-bar-icon-margin-right',
      default: '4px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$system-bar-window-icon-margin-right',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$system-bar-window-icon-font-size',
      default: "map-deep-get($headings, 'h6', 'size') !default;",
      description: {
        en: '',
      },
    },
  ],
  'v-tabs': [
    {
      name: '$tab-disabled-opacity',
      default: '.5 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$tab-font-size',
      default: "map-deep-get($headings, 'subtitle-2', 'size') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$tab-font-weight',
      default: "map-deep-get($headings, 'subtitle-2', 'weight') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$tab-line-height',
      default: 'normal !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$tabs-bar-background-color',
      default: "'cards' !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$tabs-bar-height',
      default: '48px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$tabs-icons-and-text-bar-height',
      default: '72px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$tabs-icons-and-text-first-tab-margin-bottom',
      default: '6px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$tabs-item-align-with-title-margin',
      default: '42px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$tabs-item-focus-opacity',
      default: '0.20 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$tabs-item-hover-opacity',
      default: '0.16 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$tabs-item-letter-spacing',
      default: '.0892857143em !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$tabs-item-max-width',
      default: '360px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$tabs-item-min-width',
      default: '90px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$tabs-item-padding',
      default: '0 16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$tabs-item-vertical-height',
      default: '$tabs-bar-height !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$tabs-item-vertical-icons-and-text-height',
      default: '$tabs-icons-and-text-bar-height !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-textarea': [
    {
      name: '$textarea-box-enclosed-prefix-margin-top',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$textarea-box-enclosed-single-outlined-label-top',
      default: '18px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$textarea-box-enclosed-single-outlined-margin-top',
      default: '10px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$textarea-dense-box-enclosed-single-outlined-margin-top',
      default: '6px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$textarea-dense-append-prepend-margin-top',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$textarea-enclosed-text-slot-margin',
      default: '-12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$textarea-enclosed-text-slot-padding',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$textarea-line-height',
      default: '1.75rem !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$textarea-min-height',
      default: '32px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$textarea-padding',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$textarea-prefix-padding-top',
      default: '2px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$textarea-solo-append-padding',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$textarea-solo-append-prepend-margin-top',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-text-field': [
    {
      name: '$text-field-border-radius',
      default: '$border-radius-root !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-line-height',
      default: '20px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-padding',
      default: '8px 0 8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-dense-padding',
      default: '4px 0 2px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-append-prepend-margin',
      default: '4px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-dense-append-prepend-margin',
      default: '0px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-dense-icon-append-prepend-margin-top',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-filled-full-width-outlined-slot-min-height',
      default: '56px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-filled-full-width-outlined-dense-slot-min-height',
      default: '52px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-filled-full-width-outlined-single-line-slot-min-height',
      default: '40px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-filled-border-radius',
      default: '$text-field-border-radius $text-field-border-radius 0 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-counter-margin',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-label-top',
      default: '6px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-label-active-transform',
      default: 'translateY(-18px) scale(.75) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-details-min-height',
      default: '14px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-filled-full-width-label-top',
      default: '18px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-filled-full-width-label-active-transform',
      default: 'translateY(-6px) scale(.75) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-dense-label-top',
      default: '17px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-dense-label-active-transform',
      default: 'translateY(-10px) scale(.75) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-single-line-label-top',
      default: '11px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-filled-margin-top',
      default: '22px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-enclosed-prepend-append-margin-top',
      default: '17px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-dense-prepend-append-margin-top',
      default: '14px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-single-line-prepend-append-margin-top',
      default: '9px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-outlined-prepend-append-margin-top',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-enclosed-details-padding',
      default: '0 12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-details-margin-bottom',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-outlined-margin-bottom',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-outlined-label-position-x',
      default: '18px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-outlined-label-position-y',
      default: '-24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-outlined-dense-label-position-x',
      default: '10px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-outlined-dense-label-position-y',
      default: '-16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-prefix-max-height',
      default: '32px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-outlined-append-prepend-outer-margin-top',
      default: '18px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-outlined-fieldset-top',
      default: '-5px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-outlined-fieldset-border-width',
      default: '1px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-outlined-fieldset-padding',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-outlined-legend-line-height',
      default: '11px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-rounded-legend-margin',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-rounded-border-radius',
      default: '28px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-shaped-border-radius',
      default: '16px 16px 0 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-outlined-fieldset-border',
      default: '2px solid currentColor !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-outlined-rounded-slot-padding',
      default: '0 24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-solo-label-top',
      default: 'calc(50% - 9px) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-solo-control-min-height',
      default: '48px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-solo-dense-control-min-height',
      default: '38px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-solo-outer-margin-top',
      default: '12px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$text-field-solo-dense-outer-margin-top',
      default: '7px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-timeline': [
    {
      name: '$timeline-divider-center',
      default: '50% !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$timeline-divider-width',
      default: '96px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$timeline-item-padding',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$timeline-line-width',
      default: '2px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$timeline-wedge-size',
      default: '10px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$timeline-dot-small-size',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$timeline-dot-regular-size',
      default: '38px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$timeline-dot-large-size',
      default: '52px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$timeline-inner-dot-small-size',
      default: '18px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$timeline-inner-dot-regular-size',
      default: '30px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$timeline-inner-dot-large-size',
      default: '42px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-time-picker': [
    {
      name: '$time-picker-title-color',
      default: "map-get($shades, 'white') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-title-btn-height',
      default: '70px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-landscape-title-btn-height',
      default: '55px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-ampm-title-margin-start',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-ampm-title-margin-bottom',
      default: '6px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-ampm-title-margin',
      default: '0 0 $time-picker-ampm-title-margin-bottom $time-picker-ampm-title-margin-start !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-ampm-title-margin-rtl',
      default: '0 $time-picker-ampm-title-margin-start $time-picker-ampm-title-margin-bottom 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-ampm-title-font-size',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-landscape-ampm-title-margin',
      default: '16px 0 0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-number-font-size',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-indicator-size',
      default: '40px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-clock-padding',
      default: '10px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-clock-max-width',
      default: '290px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-clock-hand-height',
      default: 'calc(50% - 4px) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-clock-hand-width',
      default: '2px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-clock-hand-left',
      default: 'calc(50% - 1px) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-clock-center-size',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-clock-end-size',
      default: '10px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-clock-end-top',
      default: '-4px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-clock-inner-hand-height',
      default: '14px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-clock-inner-offset',
      default: '27px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-ampm-padding',
      default: '10px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-clock-end-border-width',
      default: '2px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-clock-end-border-style',
      default: 'solid !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$time-picker-clock-end-border-color',
      default: 'inherit !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-toolbar': [
    {
      name: '$toolbar-btn-icon-size',
      default: '48px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$toolbar-content-padding-y',
      default: '4px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$toolbar-content-padding-x',
      default: '16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$toolbar-elevation',
      default: '4 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$toolbar-border-radius',
      default: '0 !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$toolbar-shaped-border-radius',
      default: "map-get($rounded, 'xl') $toolbar-border-radius !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$toolbar-title-padding',
      default: '20px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$toolbar-transition',
      default: "0.2s map-get($transition, 'fast-out-slow-in') transform,\n                     0.2s map-get($transition, 'fast-out-slow-in') background-color,\n                     0.2s map-get($transition, 'fast-out-slow-in') left,\n                     0.2s map-get($transition, 'fast-out-slow-in') right,\n                     280ms map-get($transition, 'fast-out-slow-in') box-shadow,\n                     0.25s map-get($transition, 'fast-out-slow-in') max-width,\n                     0.25s map-get($transition, 'fast-out-slow-in') width !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$toolbar-collapsed-max-width',
      default: '112px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$toolbar-collapsed-border-radius',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$toolbar-promient-padding',
      default: '6px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-tooltip': [
    {
      name: '$tooltip-background-color',
      default: "rgba(map-get($grey, 'darken-2'), 0.9) !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$tooltip-text-color',
      default: "map-get($shades, 'white') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$tooltip-border-radius',
      default: '$border-radius-root !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$tooltip-font-size',
      default: '14px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$tooltip-transition-timing-function',
      default: "map-get($transition, 'linear-out-slow-in') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$tooltip-transition-enter-duration',
      default: '150ms !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$tooltip-transition-leave-duration',
      default: '75ms !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$tooltip-padding',
      default: '5px 16px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-treeview': [
    {
      name: '$treeview-transition',
      default: ".2s map-get($transition, 'linear-out-slow-in') !default;",
      description: {
        en: '',
      },
    },
    {
      name: '$treeview-label-font-size',
      default: 'inherit !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$treeview-node-height',
      default: '48px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$treeview-node-height-dense',
      default: '40px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$treeview-node-shaped-margin',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$treeview-node-padding',
      default: '8px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$treeview-node-margin',
      default: '6px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$treeview-node-level-width',
      default: '24px !default;',
      description: {
        en: '',
      },
    },
  ],
  'v-window': [
    {
      name: '$window-transition',
      default: '.3s cubic-bezier(.25, .8, .50, 1) !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$window-controls-margin',
      default: '0 16px !default;',
      description: {
        en: '',
      },
    },
    {
      name: '$window-controls-top',
      default: 'calc(50% - 20px) !default;',
      description: {
        en: '',
      },
    },
  ],
}

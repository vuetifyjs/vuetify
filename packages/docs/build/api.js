/*
  * THIS FILE HAS BEEN AUTOMATICALLY GENERATED USING THE API-GENERATOR TOOL.
  *
  * CHANGES MADE TO THIS FILE WILL BE LOST!
  */

module.exports = {
  'v-app': {
    props: [
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'id',
        type: 'string',
        default: "'app'",
        source: 'v-app',
        description: {
          en: 'Sets the DOM id on the component',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
    ],
    mixins: [
      'themeable',
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-app-bar': {
    props: [
      {
        name: 'absolute',
        type: 'boolean',
        default: 'false',
        source: 'v-toolbar',
        description: {
          en: 'Applies position: absolute to the component.',
        },
      },
      {
        name: 'app',
        type: 'boolean',
        default: 'false',
        source: 'applicationable',
        description: {
          en: 'Designates the component as part of the application layout. Used for dynamically adjusting content sizing. Components using this prop should reside **outside** of `v-main` component to function properly. You can more information about layouts on the [application page](/components/application). **Note:** this prop automatically applies **position: fixed** to the layout element. You can overwrite this functionality by using the `absolute` prop',
        },
      },
      {
        name: 'bottom',
        type: 'boolean',
        default: 'false',
        source: 'v-toolbar',
        description: {
          en: 'Aligns the component towards the bottom.',
        },
      },
      {
        name: 'clippedLeft',
        type: 'boolean',
        default: 'false',
        source: 'v-app-bar',
        description: {
          en: "Designates that the application's `v-navigation-drawer` that is positioned on the left is below the app-bar.",
        },
      },
      {
        name: 'clippedRight',
        type: 'boolean',
        default: 'false',
        source: 'v-app-bar',
        description: {
          en: "Designates that the application's `v-navigation-drawer` that is positioned on the right is below the app-bar.",
        },
      },
      {
        name: 'collapse',
        type: 'boolean',
        default: 'false',
        source: 'v-toolbar',
        description: {
          en: 'Puts the toolbar into a collapsed state reducing its maximum width.',
        },
      },
      {
        name: 'collapseOnScroll',
        type: 'boolean',
        default: 'false',
        source: 'v-app-bar',
        description: {
          en: 'Puts the app-bar into a collapsed state when scrolling.',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-toolbar',
        description: {
          en: 'Reduces the height of the toolbar content to 48px (96px when using the **prominent** prop).',
        },
      },
      {
        name: 'elevateOnScroll',
        type: 'boolean',
        default: 'false',
        source: 'v-app-bar',
        description: {
          en: 'Elevates the app-bar when scrolling.',
        },
      },
      {
        name: 'elevation',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'elevatable',
        description: {
          en: 'Designates an elevation applied to the component between 0 and 24. You can find more information on the [elevation page](/styles/elevation).',
        },
      },
      {
        name: 'extended',
        type: 'boolean',
        default: 'false',
        source: 'v-toolbar',
        description: {
          en: 'Use this prop to increase the height of the toolbar _without_ using the `extension` slot for adding content. May be used in conjunction with the **extension-height** prop, and any of the other props that affect the height of the toolbar, e.g. **prominent**, **dense**, etc., **WITH THE EXCEPTION** of **height**.',
        },
      },
      {
        name: 'extensionHeight',
        type: [
          'number',
          'string',
        ],
        default: 48,
        source: 'v-toolbar',
        description: {
          en: 'Specify an explicit height for the `extension` slot. ',
        },
      },
      {
        name: 'fadeImgOnScroll',
        type: 'boolean',
        default: 'false',
        source: 'v-app-bar',
        description: {
          en: 'When using the **src** prop or `img` slot, will fade the image when scrolling.',
        },
      },
      {
        name: 'fixed',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Applies **position: fixed** to the component.',
        },
      },
      {
        name: 'flat',
        type: 'boolean',
        default: 'false',
        source: 'v-toolbar',
        description: {
          en: "Removes the toolbar's box-shadow.",
        },
      },
      {
        name: 'floating',
        type: 'boolean',
        default: 'false',
        source: 'v-toolbar',
        description: {
          en: 'Applies **display: inline-flex** to the component.',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the height for the component.',
        },
      },
      {
        name: 'hideOnScroll',
        type: 'boolean',
        default: 'false',
        source: 'v-app-bar',
        description: {
          en: 'Hides the app-bar when scrolling. Will still show the `extension` slot.',
        },
      },
      {
        name: 'invertedScroll',
        type: 'boolean',
        default: 'false',
        source: 'v-app-bar',
        description: {
          en: 'Hides the app-bar when scrolling down and displays it when scrolling up.',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'maxHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum height for the component.',
        },
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum width for the component.',
        },
      },
      {
        name: 'minHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum height for the component.',
        },
      },
      {
        name: 'minWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum width for the component.',
        },
      },
      {
        name: 'outlined',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
        description: {
          en: 'Removes elevation (box-shadow) and adds a *thin* border.',
        },
      },
      {
        name: 'prominent',
        type: 'boolean',
        default: 'false',
        source: 'v-toolbar',
        description: {
          en: 'Increases the height of the toolbar content to 128px.',
        },
      },
      {
        name: 'rounded',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'roundable',
        description: {
          en: 'Designates the **border-radius** applied to the component. You can find more information on the [Border Radius page](/styles/border-radius).',
        },
      },
      {
        name: 'scrollOffScreen',
        type: 'boolean',
        default: 'false',
        source: 'v-app-bar',
        description: {
          en: 'Hides the app-bar when scrolling. Will **NOT** show the `extension` slot.',
        },
      },
      {
        name: 'scrollTarget',
        type: 'string',
        default: 'undefined',
        source: 'scrollable',
        description: {
          en: 'Designates the element to target for scrolling events. Uses `window` by default.',
        },
      },
      {
        name: 'scrollThreshold',
        type: [
          'string',
          'number',
        ],
        default: 'undefined',
        source: 'scrollable',
        description: {
          en: 'The amount of scroll distance down before **hide-on-scroll** activates.',
        },
      },
      {
        name: 'shaped',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
        description: {
          en: 'Applies a large border radius on the top left and bottom right of the card.',
        },
      },
      {
        name: 'short',
        type: 'boolean',
        default: 'false',
        source: 'v-toolbar',
        description: {
          en: 'Reduce the height of the toolbar content to 56px (112px when using the **prominent** prop).',
        },
      },
      {
        name: 'shrinkOnScroll',
        type: 'boolean',
        default: 'false',
        source: 'v-app-bar',
        description: {
          en: 'Shrinks a **prominent** toolbar to a **dense** or **short** (default) one when scrolling.',
        },
      },
      {
        name: 'src',
        type: [
          'string',
          'object',
        ],
        default: 'undefined',
        source: 'v-toolbar',
        description: {
          en: 'Image source. See `v-img` for details',
        },
      },
      {
        name: 'tag',
        type: 'string',
        default: "'header'",
        source: 'v-sheet',
        description: {
          en: 'Specify a custom tag used on the root element.',
        },
      },
      {
        name: 'tile',
        type: 'boolean',
        default: 'false',
        source: 'roundable',
        description: {
          en: "Removes the component's **border-radius**.",
        },
      },
      {
        name: 'value',
        type: 'boolean',
        default: 'true',
        source: 'toggleable',
        description: {
          en: 'Controls whether the component is visible or hidden.',
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the width for the component.',
        },
      },
    ],
    mixins: [
      'v-toolbar',
      'colorable',
      'elevatable',
      'measurable',
      'roundable',
      'themeable',
      'scrollable',
      'ssr-bootable',
      'toggleable',
      'applicationable',
      'positionable',
    ],
    slots: [
      {
        name: 'extension',
        description: {
          en: 'Slot positioned directly under the main content of the toolbar. Height of this slot can be set explicitly with the **extension-height** prop. If this slot has no content, the **extended** prop may be used instead.',
        },
      },
      {
        name: 'img',
        props: {
          props: '{ height: string, src: string | srcObject }',
        },
        description: {
          en: 'Expects the [v-img](/components/images) component. Scoped **props** should be applied with `v-bind="props"`.',
        },
      },
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-app-bar-nav-icon': {
    props: [],
    mixins: [],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-alert': {
    props: [
      {
        name: 'border',
        type: 'string',
        default: 'undefined',
        source: 'v-alert',
        description: {
          en: 'Puts a border on the alert. Accepts **top** \\| **right** \\| **bottom** \\| **left**.',
        },
      },
      {
        name: 'closeIcon',
        type: 'string',
        default: "'$cancel'",
        source: 'v-alert',
        description: {
          en: 'Change the default icon used for **dismissible** alerts.',
        },
      },
      {
        name: 'closeLabel',
        type: 'string',
        default: "'$vuetify.close'",
        source: 'v-alert',
        description: {
          en: 'Text used for *aria-label* on **dismissible** alerts. Can also be customizing globally in [Internationalization](/customization/internationalization).',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'coloredBorder',
        type: 'boolean',
        default: 'false',
        source: 'v-alert',
        description: {
          en: "Applies the defined **color** to the alert's border.",
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-alert',
        description: {
          en: "Hides the alert icon and decreases component's height.",
        },
      },
      {
        name: 'dismissible',
        type: 'boolean',
        default: 'false',
        source: 'v-alert',
        description: {
          en: 'Adds a close icon that can hide the alert.',
        },
      },
      {
        name: 'elevation',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'elevatable',
        description: {
          en: 'Designates an elevation applied to the component between 0 and 24. You can find more information on the [elevation page](/styles/elevation).',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the height for the component.',
        },
      },
      {
        name: 'icon',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-alert',
        description: {
          en: 'Designates a specific icon.',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'maxHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum height for the component.',
        },
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum width for the component.',
        },
      },
      {
        name: 'minHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum height for the component.',
        },
      },
      {
        name: 'minWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum width for the component.',
        },
      },
      {
        name: 'mode',
        type: 'string',
        default: 'undefined',
        source: 'transitionable',
        description: {
          en: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: 'undefined',
        source: 'transitionable',
        description: {
          en: 'Sets the transition origin on the element. You can find more information on the MDN documentation [for transition origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin).',
        },
      },
      {
        name: 'outlined',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
        description: {
          en: 'Makes the background transparent and applies a thin border.',
        },
      },
      {
        name: 'prominent',
        type: 'boolean',
        default: 'false',
        source: 'v-alert',
        description: {
          en: 'Displays a larger vertically centered icon to draw more attention.',
        },
      },
      {
        name: 'rounded',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'roundable',
        description: {
          en: 'Designates the **border-radius** applied to the component. You can find more information on the [Border Radius page](/styles/border-radius).',
        },
      },
      {
        name: 'shaped',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
        description: {
          en: 'Applies a large border radius on the top left and bottom right of the card.',
        },
      },
      {
        name: 'tag',
        type: 'string',
        default: "'div'",
        source: 'v-sheet',
        description: {
          en: 'Specify a custom tag used on the root element.',
        },
      },
      {
        name: 'text',
        type: 'boolean',
        default: 'false',
        source: 'v-alert',
        description: {
          en: 'Applies the defined **color** to text and a low opacity background of the same.',
        },
      },
      {
        name: 'tile',
        type: 'boolean',
        default: 'false',
        source: 'roundable',
        description: {
          en: "Removes the component's border-radius.",
        },
      },
      {
        name: 'transition',
        type: 'string',
        default: 'undefined',
        source: 'transitionable',
        description: {
          en: 'Sets the component transition. Can be one of the [built in transitions](/styles/transitions) or one your own.',
        },
      },
      {
        name: 'type',
        type: 'string',
        default: 'undefined',
        source: 'v-alert',
        description: {
          en: 'Specify a **success**, **info**, **warning** or **error** alert. Uses the contextual color and has a pre-defined icon.',
        },
      },
      {
        name: 'value',
        type: 'boolean',
        default: 'true',
        source: 'toggleable',
        description: {
          en: 'Controls whether the component is visible or hidden.',
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the width for the component.',
        },
      },
    ],
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
    slots: [
      {
        name: 'append',
        description: {
          en: 'Slot for icon at end of alert.',
        },
      },
      {
        name: 'close',
        props: {
          toggle: 'Function',
        },
        description: {
          en: 'Slot for icon used in **dismissible** prop.',
        },
      },
      {
        name: 'prepend',
        description: {
          en: 'Slot for icon at beginning of alert.',
        },
      },
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
    events: [
      {
        name: 'input',
        value: 'boolean',
        description: {
          en: 'The updated bound model',
        },
      },
    ],
    functions: [
      {
        name: 'toggle',
        signature: '(): void',
        description: {
          en: "Toggles the alert's active state. Available in the close slot and used as the click action in **dismissible**.",
        },
      },
    ],
  },
  'v-autocomplete': {
    props: [
      {
        name: 'allowOverflow',
        type: 'boolean',
        default: 'true',
        source: 'v-autocomplete',
        description: {
          en: 'Allow the menu to overflow off the screen',
        },
      },
      {
        name: 'appendIcon',
        type: 'string',
        default: "'$dropdown'",
        source: 'v-input',
        description: {
          en: 'Appends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'appendOuterIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: "Appends an icon to the outside the component's input, uses same syntax as `v-icon`",
        },
      },
      {
        name: 'attach',
        type: 'any',
        default: false,
        source: 'v-select',
        description: {
          en: 'Mixins.Detachable.props.attach',
        },
      },
      {
        name: 'autoSelectFirst',
        type: 'boolean',
        default: 'false',
        source: 'v-autocomplete',
        description: {
          en: 'When searching, will always highlight the first option',
        },
      },
      {
        name: 'autofocus',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Enables autofocus',
        },
      },
      {
        name: 'backgroundColor',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Changes the background-color of the input',
        },
      },
      {
        name: 'cacheItems',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Keeps a local _unique_ copy of all items that have been passed through the **items** prop.',
        },
      },
      {
        name: 'chips',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Changes display of selections to chips',
        },
      },
      {
        name: 'clearIcon',
        type: 'string',
        default: "'$clear'",
        source: 'v-text-field',
        description: {
          en: 'Applied when using **clearable** and the input is dirty',
        },
      },
      {
        name: 'clearable',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Add input clear functionality, default icon is Material Design Icons **mdi-clear**',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'counter',
        type: [
          'boolean',
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Creates counter for input length; if no number is specified, it defaults to 25. Does not apply any validation.',
        },
      },
      {
        name: 'counterValue',
        type: 'function',
        default: 'null',
        source: 'v-text-field',
        description: {
          en: '',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Components.Inputs.props.dark',
        },
      },
      {
        name: 'deletableChips',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Adds a remove icon to selected chips',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Reduces the input height',
        },
      },
      {
        name: 'disableLookup',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Disables keyboard lookup',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Disable the input',
        },
      },
      {
        name: 'eager',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: '',
        },
      },
      {
        name: 'error',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual error state',
        },
      },
      {
        name: 'errorCount',
        type: [
          'number',
          'string',
        ],
        default: 1,
        source: 'validatable',
        description: {
          en: 'The total number of errors that should display at once',
        },
      },
      {
        name: 'errorMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in an error state and passes through custom error messages. Will be combined with any validations that occur from the **rules** prop. This field will not trigger validation',
        },
      },
      {
        name: 'filled',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Applies the alternate filled input style',
        },
      },
      {
        name: 'filter',
        type: 'function',
        default: '(item: object, queryText: string, itemText: string): boolean',
        source: 'v-select',
        description: {
          en: 'The filtering algorithm used when searching. [example](https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/components/VAutocomplete/VAutocomplete.ts#L36)',
        },
      },
      {
        name: 'flat',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Mixins.Soloable.props.flat',
        },
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Designates input type as full-width',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the height of the input',
        },
      },
      {
        name: 'hideDetails',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display",
        },
      },
      {
        name: 'hideNoData',
        type: 'boolean',
        default: 'false',
        source: 'v-autocomplete',
        description: {
          en: 'Hides the menu when there are no options to show.  Useful for preventing the menu from opening before results are fetched asynchronously.  Also has the effect of opening the menu when the `items` array changes if not already open.',
        },
      },
      {
        name: 'hideSelected',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Do not display in the select menu items that are already selected',
        },
      },
      {
        name: 'hint',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Hint text',
        },
      },
      {
        name: 'id',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the DOM id on the component',
        },
      },
      {
        name: 'itemColor',
        type: 'string',
        default: "'primary'",
        source: 'v-select',
        description: {
          en: 'Sets color of selected items',
        },
      },
      {
        name: 'itemDisabled',
        type: [
          'string',
          'array',
          'function',
        ],
        default: 'disabled',
        source: 'v-select',
        description: {
          en: "Set property of **items**'s disabled value",
        },
      },
      {
        name: 'itemText',
        type: [
          'string',
          'array',
          'function',
        ],
        default: 'text',
        source: 'v-select',
        description: {
          en: "Set property of **items**'s text value",
        },
      },
      {
        name: 'itemValue',
        type: [
          'string',
          'array',
          'function',
        ],
        default: 'value',
        source: 'v-select',
        description: {
          en: "Set property of **items**'s value - **must be primitive**. Dot notation is supported. **Note:** This is currently not supported with `v-combobox` [GitHub Issue](https://github.com/vuetifyjs/vuetify/issues/5479)",
        },
      },
      {
        name: 'items',
        type: 'array',
        default: [],
        source: 'v-select',
        example: {
          text: 'string | number | object',
          value: 'string | number | object',
          disabled: 'boolean',
          divider: 'boolean',
          header: 'string',
        },
        description: {
          en: 'Can be an array of objects or array of strings. When using objects, will look for a text, value and disabled keys. This can be changed using the **item-text**, **item-value** and **item-disabled** props.  Objects that have a **header** or **divider** property are considered special cases and generate a list header or divider; these items are not selectable.',
        },
      },
      {
        name: 'label',
        type: 'string',
        source: 'v-input',
        description: {
          en: 'Sets input label',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'loaderHeight',
        type: [
          'number',
          'string',
        ],
        default: 2,
        source: 'loadable',
        description: {
          en: 'Specifies the height of the loader',
        },
      },
      {
        name: 'loading',
        type: [
          'boolean',
          'string',
        ],
        default: false,
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'menuProps',
        type: [
          'string',
          'array',
          'object',
        ],
        default: '{ "closeOnClick": false, "closeOnContentClick": false, "disableKeys": true, "openOnClick": false, "maxHeight": 304 }',
        source: 'v-select',
        description: {
          en: 'Pass props through to the `v-menu` component. Accepts either a string for boolean props `menu-props="auto, overflowY"`, or an object `:menu-props="{ auto: true, overflowY: true }"`',
        },
      },
      {
        name: 'messages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Displays a list of messages or message if using a string',
        },
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Changes select to multiple. Accepts array for value',
        },
      },
      {
        name: 'noDataText',
        type: 'string',
        default: "'$vuetify.noDataText'",
        source: 'filterable',
        description: {
          en: 'Display text when there is no data',
        },
      },
      {
        name: 'noFilter',
        type: 'boolean',
        default: 'false',
        source: 'v-autocomplete',
        description: {
          en: 'Do not apply filtering when searching. Useful when data is being filtered server side',
        },
      },
      {
        name: 'openOnClear',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'When using the **clearable** prop, once cleared, the select menu will either open or stay open, depending on the current state',
        },
      },
      {
        name: 'outlined',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Applies the outlined style to the input',
        },
      },
      {
        name: 'persistentHint',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Forces hint to always be visible',
        },
      },
      {
        name: 'placeholder',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Sets the input’s placeholder text',
        },
      },
      {
        name: 'prefix',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Displays prefix text',
        },
      },
      {
        name: 'prependIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Prepends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'prependInnerIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: "Prepends an icon inside the component's input, uses the same syntax as `v-icon`",
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Puts input in readonly state',
        },
      },
      {
        name: 'returnObject',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Changes the selection behavior to return the object directly rather than the value specified with **item-value**',
        },
      },
      {
        name: 'reverse',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Reverses the input orientation',
        },
      },
      {
        name: 'rounded',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Adds a border radius to the input',
        },
      },
      {
        name: 'rules',
        type: 'array',
        default: [],
        source: 'validatable',
        description: {
          en: 'Accepts an array of functions that take an input value as an argument and return either `true` / `false` or a `string` with an error message',
        },
      },
      {
        name: 'searchInput',
        type: 'string',
        default: 'undefined',
        source: 'v-autocomplete',
        description: {
          en: 'Search value. Can be used with `.sync` modifier.',
        },
      },
      {
        name: 'shaped',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Round if `outlined` and increase `border-radius` if `filled`. Must be used with either `outlined` or `filled`',
        },
      },
      {
        name: 'singleLine',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Label does not move on focus/dirty',
        },
      },
      {
        name: 'smallChips',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Changes display of selections to chips with the **small** property',
        },
      },
      {
        name: 'solo',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Mixins.Soloable.props.solo',
        },
      },
      {
        name: 'soloInverted',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Mixins.Soloable.props.soloInverted',
        },
      },
      {
        name: 'success',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual success state',
        },
      },
      {
        name: 'successMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in a success state and passes through custom success messages.',
        },
      },
      {
        name: 'suffix',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Displays suffix text',
        },
      },
      {
        name: 'type',
        type: 'string',
        default: "'text'",
        source: 'v-text-field',
        description: {
          en: 'Sets input type',
        },
      },
      {
        name: 'validateOnBlur',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Delays validation until blur event',
        },
      },
      {
        name: 'value',
        type: 'any',
        source: 'v-input',
        description: {
          en: "The input's value",
        },
      },
      {
        name: 'valueComparator',
        type: 'function',
        default: '(a: any, b: any): boolean',
        source: 'v-select',
        description: {
          en: 'The comparison algorithm used for values. [More info](https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/util/helpers.ts)',
        },
      },
    ],
    mixins: [
      'v-text-field',
      'v-input',
      'validatable',
      'colorable',
      'registrable-inject',
      'themeable',
      'intersectable',
      'loadable',
      'comparable',
      'filterable',
    ],
    events: [
      {
        name: 'update:error',
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'The `error.sync` event',
        },
      },
      {
        name: 'click',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when input is clicked',
        },
      },
      {
        name: 'mousedown',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is pressed',
        },
      },
      {
        name: 'mouseup',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is released',
        },
      },
      {
        name: 'click:append',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when appended icon is clicked',
        },
      },
      {
        name: 'click:prepend',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when prepended icon is clicked',
        },
      },
      {
        name: 'blur',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when the input is blurred',
        },
      },
      {
        name: 'click:clear',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when clearable icon clicked',
        },
      },
      {
        name: 'click:append-outer',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when appended outer icon is clicked',
        },
      },
      {
        name: 'click:prepend-inner',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when prepended inner icon is clicked',
        },
      },
      {
        name: 'focus',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when component is focused',
        },
      },
      {
        name: 'change',
        source: 'v-text-field',
        value: 'any',
        description: {
          en: 'Emitted when the input is changed by user interaction',
        },
      },
      {
        name: 'input',
        source: 'v-text-field',
        value: 'any',
        description: {
          en: 'The updated bound model',
        },
      },
      {
        name: 'keydown',
        source: 'v-text-field',
        value: 'KeyboardEvent',
        description: {
          en: 'Emitted when **any** key is pressed',
        },
      },
      {
        name: 'update:search-input',
        source: 'v-select',
        value: 'string',
        description: {
          en: 'The `search-input.sync` event',
        },
      },
      {
        name: 'update:list-index',
        source: 'v-select',
        value: 'number',
        description: {
          en: 'Emitted when menu item is selected using keyboard arrows',
        },
      },
    ],
    slots: [
      {
        name: 'append',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'default',
        source: 'v-input',
        description: {
          en: 'The default Vue slot.',
        },
      },
      {
        name: 'prepend',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'label',
        source: 'v-input',
        description: {
          en: 'Replaces the default label',
        },
      },
      {
        name: 'message',
        props: {
          key: 'number, // the messages index',
          message: 'string, // the message',
        },
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'append-outer',
        source: 'v-text-field',
        description: {
          en: 'Adds an item outside the input and after input content',
        },
      },
      {
        name: 'prepend-inner',
        source: 'v-text-field',
        description: {
          en: 'Adds an item inside the input and before input content',
        },
      },
      {
        name: 'progress',
        source: 'v-text-field',
        description: {
          en: 'Slot for custom progress linear (displayed when **loading** prop is not equal to Boolean False)',
        },
      },
      {
        name: 'append-item',
        source: 'v-select',
        description: {
          en: 'Adds an item after menu content',
        },
      },
      {
        name: 'prepend-item',
        source: 'v-select',
        description: {
          en: 'Adds an item before menu content',
        },
      },
      {
        name: 'item',
        props: {
          parent: 'VueComponent',
          item: 'object',
          on: 'object // Only needed when providing your own v-list-item',
          attrs: 'object // Only needed when providing your own v-list-item',
        },
        source: 'v-select',
        description: {
          en: 'Define a custom item appearance',
        },
      },
      {
        name: 'no-data',
        source: 'v-select',
        description: {
          en: '',
        },
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
        description: {
          en: 'Define a custom selection appearance',
        },
      },
    ],
  },
  'v-avatar': {
    props: [
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the height for the component.',
        },
      },
      {
        name: 'left',
        type: 'boolean',
        default: 'false',
        source: 'v-avatar',
        description: {
          en: 'Designates that the avatar is on the left side of a component. This is hooked into by components such as [v-chip](/components/chips) and [v-btn](/components/buttons).',
        },
      },
      {
        name: 'maxHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum height for the component.',
        },
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum width for the component.',
        },
      },
      {
        name: 'minHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum height for the component.',
        },
      },
      {
        name: 'minWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum width for the component.',
        },
      },
      {
        name: 'right',
        type: 'boolean',
        default: 'false',
        source: 'v-avatar',
        description: {
          en: 'Designates that the avatar is on the right side of a component. This is hooked into by components such as [v-chip](/components/chips) and [v-btn](/components/buttons).',
        },
      },
      {
        name: 'rounded',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'roundable',
        description: {
          en: 'Designates the **border-radius** applied to the component. You can find more information on the [Border Radius page](/styles/border-radius).',
        },
      },
      {
        name: 'size',
        type: [
          'number',
          'string',
        ],
        default: 48,
        source: 'v-avatar',
        description: {
          en: 'Sets the height and width of the component.',
        },
      },
      {
        name: 'tile',
        type: 'boolean',
        default: 'false',
        source: 'roundable',
        description: {
          en: "Removes the component's **border-radius**.",
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the width for the component.',
        },
      },
    ],
    mixins: [
      'colorable',
      'measurable',
      'roundable',
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-badge': {
    props: [
      {
        name: 'avatar',
        type: 'boolean',
        default: 'false',
        source: 'v-badge',
        description: {
          en: 'Removes badge padding for the use of the `v-avatar` in the **badge** slot.',
        },
      },
      {
        name: 'bordered',
        type: 'boolean',
        default: 'false',
        source: 'v-badge',
        description: {
          en: 'Applies a **2px** by default and **1.5px** border around the badge when using the **dot** property.',
        },
      },
      {
        name: 'bottom',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the component towards the bottom.',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: "'primary'",
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'content',
        type: 'any',
        default: 'undefined',
        source: 'v-badge',
        description: {
          en: 'Any content you want injected as text into the badge.',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dot',
        type: 'boolean',
        default: 'false',
        source: 'v-badge',
        description: {
          en: 'Reduce the size of the badge and hide its contents',
        },
      },
      {
        name: 'icon',
        type: 'string',
        default: 'undefined',
        source: 'v-badge',
        description: {
          en: 'Designates a specific icon used in the badge.',
        },
      },
      {
        name: 'inline',
        type: 'boolean',
        default: 'false',
        source: 'v-badge',
        description: {
          en: 'Moves the badge to be inline with the wrapping element. Supports the usage of the **left** prop.',
        },
      },
      {
        name: 'label',
        type: 'string',
        default: "'$vuetify.badge'",
        source: 'v-badge',
        description: {
          en: 'The **aria-label** used for the badge',
        },
      },
      {
        name: 'left',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the component towards the left.',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'mode',
        type: 'string',
        default: 'undefined',
        source: 'transitionable',
        description: {
          en: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
        },
      },
      {
        name: 'offsetX',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-badge',
        description: {
          en: 'Offset the badge on the x-axis.',
        },
      },
      {
        name: 'offsetY',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-badge',
        description: {
          en: 'Offset the badge on the y-axis.',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: 'undefined',
        source: 'transitionable',
        description: {
          en: 'Sets the transition origin on the element. You can find more information on the MDN documentation [for transition origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin).',
        },
      },
      {
        name: 'overlap',
        type: 'boolean',
        default: 'false',
        source: 'v-badge',
        description: {
          en: 'Overlaps the slotted content on top of the component.',
        },
      },
      {
        name: 'tile',
        type: 'boolean',
        default: 'false',
        source: 'v-badge',
        description: {
          en: "Removes the component's border-radius.",
        },
      },
      {
        name: 'transition',
        type: 'string',
        default: "'scale-rotate-transition'",
        source: 'transitionable',
        description: {
          en: 'Sets the component transition. Can be one of the [built in transitions](/styles/transitions) or one your own.',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: true,
        source: 'toggleable',
        description: {
          en: 'Controls whether the component is visible or hidden.',
        },
      },
    ],
    mixins: [
      'colorable',
      'positionable',
      'themeable',
      'toggleable',
      'transitionable',
    ],
    slots: [
      {
        name: 'badge',
        description: {
          en: "The slot used for the badge's content.",
        },
      },
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-banner': {
    props: [
      {
        name: 'app',
        type: 'boolean',
        default: 'false',
        source: 'v-banner',
        description: {
          en: 'When used inside of `v-main`, will calculate top based upon application `v-toolbar` and `v-system-bar`.',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'elevation',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'elevatable',
        description: {
          en: 'Designates an elevation applied to the component between 0 and 24. You can find more information on the [elevation page](/styles/elevation).',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the height for the component.',
        },
      },
      {
        name: 'icon',
        type: 'string',
        default: 'undefined',
        source: 'v-banner',
        description: {
          en: 'Designates a specific icon.',
        },
      },
      {
        name: 'iconColor',
        type: 'string',
        default: 'undefined',
        source: 'v-banner',
        description: {
          en: 'Designates a specific icon color.',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'maxHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum height for the component.',
        },
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum width for the component.',
        },
      },
      {
        name: 'minHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum height for the component.',
        },
      },
      {
        name: 'minWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum width for the component.',
        },
      },
      {
        name: 'mobileBreakpoint',
        type: [
          'number',
          'string',
        ],
        source: 'mobile',
        description: {
          en: '',
        },
      },
      {
        name: 'outlined',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
        description: {
          en: 'Removes elevation (box-shadow) and adds a *thin* border.',
        },
      },
      {
        name: 'rounded',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'roundable',
        description: {
          en: 'Designates the **border-radius** applied to the component. You can find more information on the [Border Radius page](/styles/border-radius).',
        },
      },
      {
        name: 'shaped',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
        description: {
          en: 'Applies a large border radius on the top left and bottom right of the card.',
        },
      },
      {
        name: 'singleLine',
        type: 'boolean',
        default: 'false',
        source: 'v-banner',
        description: {
          en: 'Forces the banner onto a single line.',
        },
      },
      {
        name: 'sticky',
        type: 'boolean',
        default: 'false',
        source: 'v-banner',
        description: {
          en: 'Applies **position: sticky** to the component (**Evergreen browsers only**). You can find more information on the [MDN documentation for sticky position](https://developer.mozilla.org/en-US/docs/Web/CSS/position).',
        },
      },
      {
        name: 'tag',
        type: 'string',
        default: "'div'",
        source: 'v-sheet',
        description: {
          en: 'Specify a custom tag used on the root element.',
        },
      },
      {
        name: 'tile',
        type: 'boolean',
        default: 'false',
        source: 'roundable',
        description: {
          en: "Removes the component's **border-radius**.",
        },
      },
      {
        name: 'value',
        type: 'boolean',
        default: 'true',
        source: 'toggleable',
        description: {
          en: 'Controls whether the component is visible or hidden.',
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the width for the component.',
        },
      },
    ],
    mixins: [
      'v-sheet',
      'colorable',
      'elevatable',
      'measurable',
      'roundable',
      'themeable',
      'mobile',
      'toggleable',
    ],
    slots: [
      {
        name: 'actions',
        props: {
          dismiss: '(): void',
        },
        description: {
          en: "The slot used for the action's content such as a [v-btn](/components/buttons). The **dismiss** function in this slots scope, when invoked, will close the banner.",
        },
      },
      {
        name: 'icon',
        description: {
          en: "The slot used for the icon's content.",
        },
      },
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
    functions: [
      {
        name: 'toggle',
        signature: '(): void',
        description: {
          en: 'Controls whether the component is visible or hidden.',
        },
      },
    ],
  },
  'v-bottom-navigation': {
    props: [
      {
        name: 'absolute',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Applies **position: absolute** to the component.',
        },
      },
      {
        name: 'activeClass',
        type: 'string',
        default: "'v-btn--active'",
        source: 'v-bottom-navigation',
        description: {
          en: 'The class applied to a [v-btn](/components/buttons) when activated.',
        },
      },
      {
        name: 'app',
        type: 'boolean',
        default: 'false',
        source: 'applicationable',
        description: {
          en: 'Designates the component as part of the application layout. Used for dynamically adjusting content sizing. Components using this prop should reside **outside** of `v-main` component to function properly. You can more information about layouts on the [application page](/components/application). **Note:** this prop automatically applies **position: fixed** to the layout element. You can overwrite this functionality by using the `absolute` prop',
        },
      },
      {
        name: 'backgroundColor',
        type: 'string',
        default: 'undefined',
        source: 'v-bottom-navigation',
        description: {
          en: 'Changes the background-color for the component.',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'fixed',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Applies **position: fixed** to the component.',
        },
      },
      {
        name: 'grow',
        type: 'boolean',
        default: 'false',
        source: 'v-bottom-navigation',
        description: {
          en: 'Force [v-btn](/components/buttons)s to take up all available space.',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 56,
        source: 'measurable',
        description: {
          en: 'Sets the height for the component.',
        },
      },
      {
        name: 'hideOnScroll',
        type: 'boolean',
        default: 'false',
        source: 'v-bottom-navigation',
        description: {
          en: 'Will transition the navigation off screen when scrolling up.',
        },
      },
      {
        name: 'horizontal',
        type: 'boolean',
        default: 'false',
        source: 'v-bottom-navigation',
        description: {
          en: 'Uses an alternative horizontal styling for [v-btn](/components/buttons).',
        },
      },
      {
        name: 'inputValue',
        type: 'boolean',
        default: 'true',
        source: 'toggleable',
        description: {
          en: 'Controls whether the component is visible or hidden. Supports the **.sync** modifier.',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'mandatory',
        type: 'boolean',
        default: 'false',
        source: 'v-bottom-navigation',
        description: {
          en: '',
        },
      },
      {
        name: 'maxHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum height for the component.',
        },
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum width for the component.',
        },
      },
      {
        name: 'minHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum height for the component.',
        },
      },
      {
        name: 'minWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum width for the component.',
        },
      },
      {
        name: 'scrollTarget',
        type: 'string',
        default: 'undefined',
        source: 'scrollable',
        description: {
          en: 'Designates the element to target for scrolling events. Uses `window` by default.',
        },
      },
      {
        name: 'scrollThreshold',
        type: [
          'string',
          'number',
        ],
        default: 'undefined',
        source: 'scrollable',
        description: {
          en: 'The amount of scroll distance down before **hide-on-scroll** activates.',
        },
      },
      {
        name: 'shift',
        type: 'boolean',
        default: 'false',
        source: 'v-bottom-navigation',
        description: {
          en: 'Hides text of [v-btn](/components/buttons)s when they are not active.',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'proxyable',
        description: {
          en: 'Holds the value of the currently active [v-btn](/components/buttons). If the button has no value supplied, its index will be used instead..',
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the width for the component.',
        },
      },
    ],
    mixins: [
      'applicationable',
      'positionable',
      'colorable',
      'measurable',
      'toggleable',
      'proxyable',
      'scrollable',
      'themeable',
    ],
    events: [
      {
        name: 'change',
        value: 'any',
        description: {
          en: 'The value of currently selected button. If no value is assigned, will be the current index of the button.',
        },
      },
      {
        name: 'update:input-value',
        value: 'string | number',
        description: {
          en: 'The event used for `input-value.sync`.',
        },
      },
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-bottom-sheet': {
    props: [
      {
        name: 'activator',
        type: 'any',
        default: 'undefined',
        source: 'activatable',
        description: {
          en: 'Designate a custom activator when the `activator` slot is not used. String can be any valid querySelector and Object can be any valid Node.',
        },
      },
      {
        name: 'attach',
        type: 'any',
        default: false,
        source: 'detachable',
        description: {
          en: 'Specifies which DOM element that this component should detach to. String can be any valid querySelector and Object can be any valid Node. This will attach to the root `v-app` component by default.',
        },
      },
      {
        name: 'closeDelay',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'delayable',
        description: {
          en: 'Milliseconds to wait before closing component.',
        },
      },
      {
        name: 'contentClass',
        type: 'string',
        default: 'undefined',
        source: 'detachable',
        description: {
          en: 'Applies a custom class to the detached element. This is useful because the content is moved to the beginning of the `v-app` component (unless the **attach** prop is provided) and is not targettable by classes passed directly on the component.',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'v-dialog',
        description: {
          en: '',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'activatable',
        description: {
          en: 'Disables the ability to open the component.',
        },
      },
      {
        name: 'eager',
        type: 'boolean',
        default: 'false',
        source: 'bootable',
        description: {
          en: 'Will force the components content to render on mounted. This is useful if you have content that will not be rendered in the DOM that you want crawled for SEO.',
        },
      },
      {
        name: 'fullscreen',
        type: 'boolean',
        default: 'false',
        source: 'v-dialog',
        description: {
          en: 'Changes layout for fullscreen display.',
        },
      },
      {
        name: 'hideOverlay',
        type: 'boolean',
        default: 'false',
        source: 'overlayable',
        description: {
          en: 'Hides the display of the overlay.',
        },
      },
      {
        name: 'inset',
        type: 'boolean',
        default: 'false',
        source: 'v-bottom-sheet',
        description: {
          en: 'Reduces the sheet content maximum width to 70%.',
        },
      },
      {
        name: 'internalActivator',
        type: 'boolean',
        default: 'false',
        source: 'activatable',
        description: {
          en: '',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'v-dialog',
        description: {
          en: '',
        },
      },
      {
        name: 'maxWidth',
        type: [
          'string',
          'number',
        ],
        default: 'auto',
        source: 'v-dialog',
        description: {
          en: '',
        },
      },
      {
        name: 'noClickAnimation',
        type: 'boolean',
        default: 'false',
        source: 'v-dialog',
        description: {
          en: "Disables the bounce effect when clicking outside of a `v-dialog`'s content when using the **persistent** prop.",
        },
      },
      {
        name: 'openDelay',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'delayable',
        description: {
          en: 'Milliseconds to wait before opening component.',
        },
      },
      {
        name: 'openOnFocus',
        type: 'boolean',
        default: 'false',
        source: 'activatable',
        description: {
          en: '',
        },
      },
      {
        name: 'openOnHover',
        type: 'boolean',
        default: 'false',
        source: 'activatable',
        description: {
          en: '',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: "'center center'",
        source: 'v-dialog',
        description: {
          en: '',
        },
      },
      {
        name: 'overlayColor',
        type: 'string',
        default: 'undefined',
        source: 'overlayable',
        description: {
          en: 'Sets the overlay color.',
        },
      },
      {
        name: 'overlayOpacity',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'overlayable',
        description: {
          en: 'Sets the overlay opacity.',
        },
      },
      {
        name: 'persistent',
        type: 'boolean',
        default: 'false',
        source: 'v-dialog',
        description: {
          en: 'Clicking outside of the element will not deactivate it.',
        },
      },
      {
        name: 'retainFocus',
        type: 'boolean',
        default: 'true',
        source: 'v-dialog',
        description: {
          en: 'Tab focus will return to the first child of the dialog by default. Disable this when using external tools that require focus such as TinyMCE or vue-clipboard.',
        },
      },
      {
        name: 'returnValue',
        type: 'any',
        default: 'undefined',
        source: 'returnable',
        description: {
          en: '',
        },
      },
      {
        name: 'scrollable',
        type: 'boolean',
        default: 'false',
        source: 'v-dialog',
        description: {
          en: 'When set to true, expects a `v-card` and a `v-card-text` component with a designated height. For more information, check out the [scrollable example](/components/dialogs#scrollable).',
        },
      },
      {
        name: 'transition',
        type: 'string',
        default: "'bottom-sheet-transition'",
        source: 'v-dialog',
        description: {
          en: 'Mixins.Transitionable.props.transition',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'toggleable',
        description: {
          en: 'Controls whether the component is visible or hidden.',
        },
      },
      {
        name: 'width',
        type: [
          'string',
          'number',
        ],
        default: 'auto',
        source: 'v-dialog',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'activatable',
      'delayable',
      'toggleable',
      'dependent',
      'detachable',
      'bootable',
      'overlayable',
      'returnable',
      'stackable',
      'toggleable',
    ],
    slots: [
      {
        name: 'activator',
        props: {
          on: '{ [eventName]: eventHandler }',
          value: 'boolean',
        },
        description: {
          en: 'When used, will activate the component when clicked (or hover for specific components). This manually stops the event propagation. Without this slot, if you open the component through its model, you will need to manually stop the event propagation',
        },
      },
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-breadcrumbs': {
    props: [
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'divider',
        type: 'string',
        default: "'/'",
        source: 'v-breadcrumbs',
        description: {
          en: 'Specifies the dividing character between items.',
        },
      },
      {
        name: 'items',
        type: 'array',
        default: [],
        source: 'v-breadcrumbs',
        example: [
          {
            disabled: 'boolean',
            exact: 'boolean',
            href: 'string',
            link: 'boolean',
            text: 'string | number',
            to: 'string | object',
          },
        ],
        description: {
          en: 'An array of objects for each breadcrumb.',
        },
      },
      {
        name: 'large',
        type: 'boolean',
        default: 'false',
        source: 'v-breadcrumbs',
        description: {
          en: 'Increase the font-size of the breadcrumb item text to 16px (14px default).',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
    ],
    mixins: [
      'themeable',
    ],
    slots: [
      {
        name: 'divider',
        description: {
          en: 'The slot used for dividers.',
        },
      },
      {
        name: 'item',
        props: {
          item: 'any[]',
        },
        description: {
          en: 'The slot used to override default `v-breadcrumbs-item` behavior when using the **items** prop.',
        },
      },
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-breadcrumbs-item': {
    props: [
      {
        name: 'activeClass',
        type: 'string',
        default: "'v-breadcrumbs__item--disabled'",
        source: 'routable',
        description: {
          en: 'Configure the active CSS class applied when the link is active. You can find more information about the [**active-class** prop](https://router.vuejs.org/api/#active-class) on the vue-router documentation.',
        },
      },
      {
        name: 'append',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Setting **append** prop always appends the relative path to the current path. You can find more information about the [**append** prop](https://router.vuejs.org/api/#append) on the vue-router documentation.',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Removes the ability to click or target the component.',
        },
      },
      {
        name: 'exact',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: "Exactly match the link. Without this, '/' will match every route. You can find more information about the [**exact** prop](https://router.vuejs.org/api/#exact) on the vue-router documentation.",
        },
      },
      {
        name: 'exactActiveClass',
        type: 'string',
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Configure the active CSS class applied when the link is active with exact match. You can find more information about the [**exact-active-class** prop](https://router.vuejs.org/api/#exact-active-class) on the vue-router documentation.',
        },
      },
      {
        name: 'href',
        type: [
          'string',
          'object',
        ],
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Designates the component as anchor and applies the **href** attribute.',
        },
      },
      {
        name: 'link',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Designates that the component is a link. This is automatic when using the **href** or **to** prop.',
        },
      },
      {
        name: 'nuxt',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Specifies the link is a `nuxt-link`. For use with the [nuxt framework](https://nuxtjs.org/api/components-nuxt-link/).',
        },
      },
      {
        name: 'replace',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Setting **replace** prop will call `router.replace()` instead of `router.push()` when clicked, so the navigation will not leave a history record. You can find more information about the [**replace** prop](https://router.vuejs.org/api/#replace) on the vue-router documentation.',
        },
      },
      {
        name: 'ripple',
        type: [
          'boolean',
          'object',
        ],
        default: false,
        source: 'routable',
        description: {
          en: 'Mixins.Rippleable.props.ripple',
        },
      },
      {
        name: 'tag',
        type: 'string',
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Components.Sheets.props.tag',
        },
      },
      {
        name: 'target',
        type: 'string',
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Designates the target attribute. This should only be applied when using the **href** prop.',
        },
      },
      {
        name: 'to',
        type: [
          'string',
          'object',
        ],
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Denotes the target route of the link. You can find more information about the [**to** prop](https://router.vuejs.org/api/#to) on the vue-router documentation.',
        },
      },
    ],
    mixins: [
      'routable',
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-breadcrumbs-divider': {
    props: [],
    mixins: [],
  },
  'v-btn': {
    props: [
      {
        name: 'absolute',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Applies **position: absolute** to the component.',
        },
      },
      {
        name: 'activeClass',
        type: 'string',
        default: '',
        source: 'routable',
        description: {
          en: 'Configure the active CSS class applied when the link is active. You can find more information about the [**active-class** prop](https://router.vuejs.org/api/#active-class) on the vue-router documentation.',
        },
      },
      {
        name: 'append',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Setting **append** prop always appends the relative path to the current path. You can find more information about the [**append** prop](https://router.vuejs.org/api/#append) on the vue-router documentation.',
        },
      },
      {
        name: 'block',
        type: 'boolean',
        default: 'false',
        source: 'v-btn',
        description: {
          en: 'Expands the button to 100% of available space.',
        },
      },
      {
        name: 'bottom',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the component towards the bottom.',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'depressed',
        type: 'boolean',
        default: 'false',
        source: 'v-btn',
        description: {
          en: 'Removes the button box shadow.',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Removes the ability to click or target the component.',
        },
      },
      {
        name: 'elevation',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'elevatable',
        description: {
          en: 'Designates an elevation applied to the component between 0 and 24. You can find more information on the [elevation page](/styles/elevation).',
        },
      },
      {
        name: 'exact',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: "Exactly match the link. Without this, '/' will match every route. You can find more information about the [**exact** prop](https://router.vuejs.org/api/#exact) on the vue-router documentation.",
        },
      },
      {
        name: 'exactActiveClass',
        type: 'string',
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Configure the active CSS class applied when the link is active with exact match. You can find more information about the [**exact-active-class** prop](https://router.vuejs.org/api/#exact-active-class) on the vue-router documentation.',
        },
      },
      {
        name: 'fab',
        type: 'boolean',
        default: 'false',
        source: 'v-btn',
        description: {
          en: 'Designates the button as a floating-action-button - _round_.',
        },
      },
      {
        name: 'fixed',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Applies **position: fixed** to the component.',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the height for the component.',
        },
      },
      {
        name: 'href',
        type: [
          'string',
          'object',
        ],
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Designates the component as anchor and applies the **href** attribute.',
        },
      },
      {
        name: 'icon',
        type: 'boolean',
        default: 'false',
        source: 'v-btn',
        description: {
          en: 'Designates the button as icon - _round and flat_',
        },
      },
      {
        name: 'inputValue',
        type: 'any',
        default: 'undefined',
        source: 'toggleable',
        description: {
          en: "Controls the button's active state.",
        },
      },
      {
        name: 'large',
        type: 'boolean',
        default: 'false',
        source: 'sizeable',
        description: {
          en: 'Makes the component large.',
        },
      },
      {
        name: 'left',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the component towards the left. This should be used with the **absolute** or **fixed** props.',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'link',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Designates that the component is a link. This is automatic when using the **href** or **to** prop.',
        },
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        source: 'v-btn',
        description: {
          en: 'Adds a loading icon animation',
        },
      },
      {
        name: 'maxHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum height for the component.',
        },
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum width for the component.',
        },
      },
      {
        name: 'minHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum height for the component.',
        },
      },
      {
        name: 'minWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum width for the component.',
        },
      },
      {
        name: 'nuxt',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Specifies the link is a `nuxt-link`. For use with the [nuxt framework](https://nuxtjs.org/api/components-nuxt-link/).',
        },
      },
      {
        name: 'outlined',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
        description: {
          en: 'Makes the background transparent and applies a thin border.',
        },
      },
      {
        name: 'replace',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Setting **replace** prop will call `router.replace()` instead of `router.push()` when clicked, so the navigation will not leave a history record. You can find more information about the [**replace** prop](https://router.vuejs.org/api/#replace) on the vue-router documentation.',
        },
      },
      {
        name: 'retainFocusOnClick',
        type: 'boolean',
        default: 'false',
        source: 'v-btn',
        description: {
          en: "Don't blur on click.",
        },
      },
      {
        name: 'right',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the component towards the right. This should be used with the **absolute** or **fixed** props.',
        },
      },
      {
        name: 'ripple',
        type: [
          'boolean',
          'object',
        ],
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Mixins.Rippleable.props.ripple',
        },
      },
      {
        name: 'rounded',
        type: 'boolean',
        default: 'false',
        source: 'roundable',
        description: {
          en: 'Applies a large border radius on the button.',
        },
      },
      {
        name: 'shaped',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
        description: {
          en: 'Applies a large border radius on the top left and bottom right of the card.',
        },
      },
      {
        name: 'small',
        type: 'boolean',
        default: 'false',
        source: 'sizeable',
        description: {
          en: 'Makes the component small.',
        },
      },
      {
        name: 'tag',
        type: 'string',
        default: "'button'",
        source: 'v-sheet',
        description: {
          en: 'Specify a custom tag used on the root element.',
        },
      },
      {
        name: 'target',
        type: 'string',
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Designates the target attribute. This should only be applied when using the **href** prop.',
        },
      },
      {
        name: 'text',
        type: 'boolean',
        default: 'false',
        source: 'v-btn',
        description: {
          en: 'Makes the background transparent.',
        },
      },
      {
        name: 'tile',
        type: 'boolean',
        default: 'false',
        source: 'roundable',
        description: {
          en: "Removes the component's **border-radius**.",
        },
      },
      {
        name: 'to',
        type: [
          'string',
          'object',
        ],
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Denotes the target route of the link. You can find more information about the [**to** prop](https://router.vuejs.org/api/#to) on the vue-router documentation.',
        },
      },
      {
        name: 'top',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the content towards the top.',
        },
      },
      {
        name: 'type',
        type: 'string',
        default: "'button'",
        source: 'v-btn',
        description: {
          en: "Set the button's **type** attribute",
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'v-btn',
        description: {
          en: '',
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the width for the component.',
        },
      },
      {
        name: 'xLarge',
        type: 'boolean',
        default: 'false',
        source: 'sizeable',
        description: {
          en: 'Makes the component extra large.',
        },
      },
      {
        name: 'xSmall',
        type: 'boolean',
        default: 'false',
        source: 'sizeable',
        description: {
          en: 'Makes the component extra small.',
        },
      },
    ],
    mixins: [
      'v-sheet',
      'colorable',
      'elevatable',
      'measurable',
      'roundable',
      'themeable',
      'routable',
      'positionable',
      'sizeable',
      'groupable',
      'toggleable',
    ],
    slots: [
      {
        name: 'loader',
        description: {
          en: 'Custom loader',
        },
      },
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
    events: [
      {
        name: 'click',
        value: 'Event',
        description: {
          en: 'Event that is emitted when the component is clicked',
        },
      },
    ],
  },
  'v-btn-toggle': {
    props: [
      {
        name: 'activeClass',
        type: 'string',
        default: "'v-item--active'",
        source: 'base-item-group',
        description: {
          en: 'The **active-class** applied to children when they are activated.',
        },
      },
      {
        name: 'backgroundColor',
        type: 'string',
        default: 'undefined',
        source: 'v-btn-toggle',
        description: {
          en: 'Changes the background-color for the component.',
        },
      },
      {
        name: 'borderless',
        type: 'boolean',
        default: 'false',
        source: 'v-btn-toggle',
        description: {
          en: "Removes the group's border.",
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-btn-toggle',
        description: {
          en: 'Reduces the button size and padding.',
        },
      },
      {
        name: 'group',
        type: 'boolean',
        default: 'false',
        source: 'v-btn-toggle',
        description: {
          en: 'Generally used in [v-toolbar](/components/toolbars) and [v-app-bar](/components/app-bars). Removes background color, border and increases space between the buttons',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'mandatory',
        type: 'boolean',
        default: 'false',
        source: 'base-item-group',
        description: {
          en: 'Forces a value to always be selected (if available).',
        },
      },
      {
        name: 'max',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'base-item-group',
        description: {
          en: 'Sets a maximum number of selections that can be made.',
        },
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        source: 'base-item-group',
        description: {
          en: 'Allow multiple selections. The **value** prop must be an _array_.',
        },
      },
      {
        name: 'rounded',
        type: 'boolean',
        default: 'false',
        source: 'v-btn-toggle',
        description: {
          en: 'Round edge buttons',
        },
      },
      {
        name: 'shaped',
        type: 'boolean',
        default: 'false',
        source: 'v-btn-toggle',
        description: {
          en: 'Applies a large border radius on the top left and bottom right of the card.',
        },
      },
      {
        name: 'tile',
        type: 'boolean',
        default: 'false',
        source: 'v-btn-toggle',
        description: {
          en: '',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'proxyable',
        description: {
          en: 'The designated model value for the component.',
        },
      },
    ],
    mixins: [
      'button-group',
      'proxyable',
      'themeable',
      'colorable',
    ],
    events: [
      {
        name: 'change',
        value: 'any[] | any',
        description: {
          en: 'Emitted when the input is changed by user interaction',
        },
      },
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-calendar': {
    props: [
      {
        name: 'categories',
        type: [
          'array',
          'string',
        ],
        default: 'undefined',
        source: 'v-calendar',
        description: {
          en: 'Specifies what categories to display in the `category` view. This controls the order of the categories as well. If the calendar uses events any categories specified in those events not specified in this value are dynamically rendered in the view unless `category-hide-dynamic` is true.',
        },
      },
      {
        name: 'categoryDays',
        type: [
          'number',
          'string',
        ],
        default: 1,
        source: 'v-calendar',
        description: {
          en: 'The number of days to render in the `category` view.',
        },
      },
      {
        name: 'categoryForInvalid',
        type: 'string',
        default: 'undefined',
        source: 'v-calendar',
        description: {
          en: 'The category to place events in that have invalid categories. A category is invalid when it is not a string. By default events without a category are not displayed until this value is specified.',
        },
      },
      {
        name: 'categoryHideDynamic',
        type: 'boolean',
        default: 'false',
        source: 'v-calendar',
        description: {
          en: "Sets whether categories specified in an event should be hidden if it's not defined in `categories`.",
        },
      },
      {
        name: 'categoryShowAll',
        type: 'boolean',
        default: 'false',
        source: 'v-calendar',
        description: {
          en: 'Set whether the `category` view should show all defined `categories` even if there are no events for a category.',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dayFormat',
        type: 'function',
        default: 'null',
        source: 'calendar-base',
        description: {
          en: 'Formats day of the month string that appears in a day to a specified locale',
        },
      },
      {
        name: 'end',
        type: [
          'string',
          'number',
          'date',
        ],
        default: 'undefined',
        source: 'calendar-base',
        description: {
          en: 'The ending date on the calendar (inclusive) in the format of `YYYY-MM-DD`. This may be ignored depending on the `type` of the calendar.',
        },
      },
      {
        name: 'eventCategory',
        type: [
          'string',
          'function',
        ],
        default: 'category',
        source: 'calendar-with-events',
        description: {
          en: "Set property of *event*'s category. Instead of a property a function can be given which takes an event and returns the category.",
        },
      },
      {
        name: 'eventColor',
        type: [
          'string',
          'function',
        ],
        default: 'primary',
        source: 'calendar-with-events',
        description: {
          en: 'A background color for all events or a function which accepts an event object passed to the calendar to return a color.',
        },
      },
      {
        name: 'eventEnd',
        type: 'string',
        default: "'end'",
        source: 'calendar-with-events',
        description: {
          en: "Set property of *event*'s end timestamp.",
        },
      },
      {
        name: 'eventHeight',
        type: 'number',
        default: 20,
        source: 'calendar-with-events',
        description: {
          en: 'The height of an event in pixels in the `month` view and at the top of the `day` views.',
        },
      },
      {
        name: 'eventMarginBottom',
        type: 'number',
        default: 1,
        source: 'calendar-with-events',
        description: {
          en: 'Margin bottom for event',
        },
      },
      {
        name: 'eventMore',
        type: 'boolean',
        default: 'true',
        source: 'calendar-with-events',
        description: {
          en: "Whether the more 'button' is displayed on a calendar with too many events in a given day. It will say something like '5 more' and when clicked generates a `click:more` event.",
        },
      },
      {
        name: 'eventMoreText',
        type: 'string',
        default: "'$vuetify.calendar.moreEvents'",
        source: 'calendar-with-events',
        description: {
          en: "The text to display in the more 'button' given the number of hidden events.",
        },
      },
      {
        name: 'eventName',
        type: [
          'string',
          'function',
        ],
        default: 'name',
        source: 'calendar-with-events',
        description: {
          en: "Set property of *event*'s displayed name, or a function which accepts an event object passed to the calendar as the first argument and a flag signalling whether the name is for a timed event (true) or an event over a day.",
        },
      },
      {
        name: 'eventOverlapMode',
        type: [
          'string',
          'function',
        ],
        default: 'stack',
        source: 'calendar-with-events',
        description: {
          en: 'One of `stack`, `column`, or a custom render function',
        },
      },
      {
        name: 'eventOverlapThreshold',
        type: [
          'string',
          'number',
        ],
        default: 60,
        source: 'calendar-with-events',
        description: {
          en: "A value in minutes that's used to determine whether two timed events should be placed in column beside each other or should be treated as slightly overlapping events.",
        },
      },
      {
        name: 'eventRipple',
        type: [
          'boolean',
          'object',
        ],
        default: 'undefined',
        source: 'calendar-with-events',
        description: {
          en: 'Applies the `v-ripple` directive.',
        },
      },
      {
        name: 'eventStart',
        type: 'string',
        default: "'start'",
        source: 'calendar-with-events',
        description: {
          en: "Set property of *event*'s start timestamp.",
        },
      },
      {
        name: 'eventTextColor',
        type: [
          'string',
          'function',
        ],
        default: 'white',
        source: 'calendar-with-events',
        description: {
          en: 'A text color for all events or a function which accepts an event object passed to the calendar to return a color.',
        },
      },
      {
        name: 'eventTimed',
        type: [
          'string',
          'function',
        ],
        default: 'timed',
        source: 'calendar-with-events',
        description: {
          en: 'If Dates or milliseconds are used as the start or end timestamp of an event, this prop can be a string to a property on the event that is truthy if the event is a timed event or a function which takes the event and returns a truthy value if the event is a timed event.',
        },
      },
      {
        name: 'events',
        type: 'array',
        default: [],
        source: 'calendar-with-events',
        description: {
          en: 'An array of event objects with a property for a start timestamp and optionally a name and end timestamp. If an end timestamp is not given, the value of start will be used. If no name is given, you must provide an implementation for the `event` slot.',
        },
      },
      {
        name: 'firstInterval',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'v-calendar',
        description: {
          en: 'The first interval to display in the `day` view. If `intervalMinutes` is set to 60 and this is set to 9 the first time in the view is 9am.',
        },
      },
      {
        name: 'firstTime',
        type: [
          'number',
          'string',
          'object',
        ],
        default: 'undefined',
        source: 'v-calendar',
        description: {
          en: 'The first time to display in the `day` view. If specified, this overwrites any `firstInterval` value specified. This can be the number of minutes since midnight, a string in the format of `HH:mm`, or an object with number properties hour and minute.',
        },
      },
      {
        name: 'hideHeader',
        type: 'boolean',
        default: 'false',
        source: 'calendar-base',
        description: {
          en: 'If the header at the top of the `day` view should be visible.',
        },
      },
      {
        name: 'intervalCount',
        type: [
          'number',
          'string',
        ],
        default: 24,
        source: 'v-calendar',
        description: {
          en: 'The number of intervals to display in the `day` view.',
        },
      },
      {
        name: 'intervalFormat',
        type: 'function',
        default: 'null',
        source: 'v-calendar',
        description: {
          en: 'Formats time of day string that appears in the interval gutter of the `day` and `week` view to specified locale',
        },
      },
      {
        name: 'intervalHeight',
        type: [
          'number',
          'string',
        ],
        default: 48,
        source: 'v-calendar',
        description: {
          en: 'The height of an interval in pixels in the `day` view.',
        },
      },
      {
        name: 'intervalMinutes',
        type: [
          'number',
          'string',
        ],
        default: 60,
        source: 'v-calendar',
        description: {
          en: 'The number of minutes the intervals are in the `day` view. A common interval is 60 minutes so the intervals are an hour.',
        },
      },
      {
        name: 'intervalStyle',
        type: 'function',
        default: 'null',
        source: 'v-calendar',
        description: {
          en: 'Returns CSS styling to apply to the interval.',
        },
      },
      {
        name: 'intervalWidth',
        type: [
          'number',
          'string',
        ],
        default: 60,
        source: 'v-calendar',
        description: {
          en: 'The width of the interval gutter on the left side in the `day` view.',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'locale',
        type: 'string',
        default: 'undefined',
        source: 'localable',
        description: {
          en: 'The locale of the calendar.',
        },
      },
      {
        name: 'localeFirstDayOfYear',
        type: [
          'string',
          'number',
        ],
        default: 0,
        source: 'v-calendar',
        description: {
          en: 'Sets the day that determines the first week of the year, starting with 0 for **Sunday**. For ISO 8601 this should be 4.',
        },
      },
      {
        name: 'maxDays',
        type: 'number',
        default: 7,
        source: 'v-calendar',
        description: {
          en: 'The maximum number of days to display in the custom calendar if an `end` day is not set.',
        },
      },
      {
        name: 'minWeeks',
        type: 'any',
        default: 1,
        source: 'v-calendar',
        description: {
          en: 'The minimum number of weeks to display in the `month` or `week` view.',
        },
      },
      {
        name: 'monthFormat',
        type: 'function',
        default: 'null',
        source: 'v-calendar',
        description: {
          en: 'Formats month string that appears in a day to specified locale',
        },
      },
      {
        name: 'now',
        type: 'string',
        default: 'undefined',
        source: 'times',
        description: {
          en: 'Override the day & time which is considered now. This is in the format of `YYYY-MM-DD hh:mm:ss`. The calendar is styled according to now.',
        },
      },
      {
        name: 'shortIntervals',
        type: 'boolean',
        default: 'true',
        source: 'v-calendar',
        description: {
          en: 'If true, the intervals in the `day` view will be 9 AM as opposed to 09:00 AM',
        },
      },
      {
        name: 'shortMonths',
        type: 'boolean',
        default: 'true',
        source: 'v-calendar',
        description: {
          en: 'Whether the short versions of a month should be used (Jan vs January).',
        },
      },
      {
        name: 'shortWeekdays',
        type: 'boolean',
        default: 'true',
        source: 'calendar-base',
        description: {
          en: 'Whether the short versions of a weekday should be used (Mon vs Monday).',
        },
      },
      {
        name: 'showIntervalLabel',
        type: 'function',
        default: 'null',
        source: 'v-calendar',
        description: {
          en: 'Checks if a given day and time should be displayed in the interval gutter of the `day` view.',
        },
      },
      {
        name: 'showMonthOnFirst',
        type: 'boolean',
        default: 'true',
        source: 'v-calendar',
        description: {
          en: 'Whether the name of the month should be displayed on the first day of the month.',
        },
      },
      {
        name: 'showWeek',
        type: 'boolean',
        default: 'false',
        source: 'v-calendar',
        description: {
          en: 'Whether weeknumbers should be displayed when using the `month` view.',
        },
      },
      {
        name: 'start',
        type: [
          'string',
          'number',
          'date',
        ],
        default: '2020-08-26',
        source: 'calendar-base',
        description: {
          en: 'The starting date on the calendar (inclusive) in the format of `YYYY-MM-DD`. This may be ignored depending on the `type` of the calendar.',
        },
      },
      {
        name: 'type',
        type: 'string',
        default: "'month'",
        source: 'v-calendar',
        description: {
          en: 'A string which is one of `month`, `week`, `day`, `4day`, `custom-weekly`, `custom-daily`, and `category`. The custom types look at the `start` and `end` dates passed to the component as opposed to the `value`.',
        },
      },
      {
        name: 'value',
        type: [
          'string',
          'number',
          'date',
        ],
        default: 'undefined',
        source: 'v-calendar',
        description: {
          en: 'A date in the format of `YYYY-MM-DD` which determines what span of time for the calendar.',
        },
      },
      {
        name: 'weekdayFormat',
        type: 'function',
        default: 'null',
        source: 'calendar-base',
        description: {
          en: 'Formats day of the week string that appears in the header to specified locale',
        },
      },
      {
        name: 'weekdays',
        type: [
          'array',
          'string',
        ],
        default: [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
        ],
        source: 'calendar-base',
        description: {
          en: 'Specifies which days of the week to display. To display Monday through Friday only, a value of `[1, 2, 3, 4, 5]` can be used. To display a week starting on Monday a value of `[1, 2, 3, 4, 5, 6, 0]` can be used.',
        },
      },
    ],
    mixins: [
      'colorable',
      'localable',
      'mouse',
      'themeable',
      'times',
    ],
    slots: [
      {
        name: 'category',
        props: {
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
          week: [
            {
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
            },
          ],
          category: 'string | null',
        },
        description: {
          en: 'The content placed in a category header for the `category` type. The category variable is null for events with invalid (non-string) categories.',
        },
      },
      {
        name: 'event',
        props: {
          event: 'any',
          eventParsed: {
            input: 'any',
            start: {
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
            },
            startIdentifier: 'number',
            startTimestampIdentifier: 'number',
            end: {
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
            },
            endIdentifier: 'number',
            endTimestampIdentifier: 'number',
            allDay: 'boolean',
            index: 'number',
            category: 'string',
          },
          day: {
            outside: 'boolean',
            index: 'number',
            week: [
              {
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
              },
            ],
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
          },
          outside: 'boolean',
          start: 'boolean',
          end: 'boolean',
          timed: 'boolean',
          singleline: 'boolean',
          overlapsNoon: 'boolean',
          formatTime: '(time: VTimestamp, ampm: boolean): string',
          timeSummary: '(): string',
          eventSummary: '(): string',
        },
        description: {
          en: 'The content placed in an event. This ignores the `event-name` prop.',
        },
      },
      {
        name: 'day',
        props: {
          outside: 'boolean',
          index: 'number',
          week: [
            {
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
            },
          ],
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
        },
        description: {
          en: 'The content that is placed in a `week` or `month` view. The day & time object is passed through this slots scope.',
        },
      },
      {
        name: 'day-body',
        props: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The content that is placed in a `day` view in the scrollable interval container. The day & time object is passed through this slots scope.',
        },
      },
      {
        name: 'day-header',
        props: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The content that is placed in a `day` view in the top container. The day & time object is passed through this slots scope.',
        },
      },
      {
        name: 'day-label',
        props: {
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
        },
        description: {
          en: 'The content that is placed in the day of the month space in the `custom-weekly` or `month` view. The day & time object is passed through this slots scope.',
        },
      },
      {
        name: 'day-label-header',
        props: {
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
        },
        description: {
          en: 'The content that is placed in the day of the month space in the `week`, `day`, `4day`, or `custom-daily` view. The day & time object is passed through this slots scope.',
        },
      },
      {
        name: 'day-month',
        props: {
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
        },
        description: {
          en: 'The content that is placed in the month space in the `week` or `month` view. The day & time object is passed through this slots scope.',
        },
      },
      {
        name: 'interval',
        props: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The content that is placed in the interval space in the `day` view. The day & time object is passed through this slots scope.',
        },
      },
    ],
    functions: [
      {
        name: 'title',
        signature: 'string',
        description: {
          en: '',
        },
      },
      {
        name: 'checkChange',
        signature: '(): void',
        description: {
          en: 'Checks for change in start and end dates. Updates and emits a change event if they have changed.',
        },
      },
      {
        name: 'updateTimes',
        signature: '(): void',
        description: {
          en: 'Updates now & today in the calendar, possibly updating the styles in the calendar.',
        },
      },
      {
        name: 'next',
        signature: '(amount: number = 1): void',
        description: {
          en: 'Triggers the input event with a date that would progress the calendar to the next timespan. If the type is `month` it will return a day in the next month, if the type is `4day` it will return a date 4 days after `value`/`v-model`, etc.',
        },
      },
      {
        name: 'prev',
        signature: '(amount: number = 1): void',
        description: {
          en: 'Triggers the input event with a date that would progress the calendar to the previous timespan. If the type is `month` it will return a day in the previous month, if the type is `4day` it will return a date 4 days before `value`/`v-model`, etc.',
        },
      },
      {
        name: 'move',
        signature: '(amount: number = 1): void',
        description: {
          en: 'A generic function that moves the calendar next (if amount is positive) or previous (if amount is negative).',
        },
      },
      {
        name: 'timeToY',
        signature: '(time: number | string | { hour: number, minute: number }, clamp: boolean = true): number | false',
        description: {
          en: 'Converts a time to a pixel value on the y-axis for the `day` view. If the time is not in a valid format or if the calendar is not in the `day` view then false is returned.',
        },
      },
      {
        name: 'timeDelta',
        signature: '(time: number | string | { hour: number, minute: number }): number | false',
        description: {
          en: 'Converts a time to a delta value for the `day` view. If the time is not in a valid format or if the calendar is not in the `day` view then false is returned. A delta value is typically between 0 and 1. If the time given is before the first interval then a negative number will be returned. If the time given is after the last interval than a number greater than 1 will be returned.',
        },
      },
      {
        name: 'minutesToPixels',
        signature: '(minutes: number): number',
        description: {
          en: 'Converts minutes to a pixel value on the y-axis for the `day` view. If the view is not `day` then -1 is returned.',
        },
      },
      {
        name: 'scrollToTime',
        signature: '(time: number | string | { hour: number, minute: number }): boolean',
        description: {
          en: 'Scrolls the scrollable area in the `day` view to the given time. If the time is not in a valid format or if the calendar is not in the `day` view then false is returned.',
        },
      },
      {
        name: 'getVisibleEvents',
        signature: '(): CalendarEventParsed[]',
        description: {
          en: 'Returns the list of events seen on the current calendar where each element returned has the following properties:<br>- `input`: the event passed in the `events` prop.<br>- `start`: a CalendarTimestamp of the start timestamp parsed.<br>- `startIdentifier`: a number which represents the day the event starts on.<br>- `startTimestampIdentifier`: a number which represents the day and time the event starts on.<br>- `end`: a CalendarTimestamp of the end timestamp parsed.<br>- `endIdentifier`: a number which represents the day the event ends on.<br>- `endTimestampIdentifier`: a number which represents the day & time the event ends on.<br>- `allDay`: if this is an all-day event (has no time specified in the `start`/`end` on the event).<br>- `index`: the index of the event in the given array.<br>- `category`: the category of the event if the calendar type is category, otherwise false.',
        },
      },
      {
        name: 'parseEvent',
        signature: '(input: CalendarEvent, index: number = 0): CalendarEventParsed',
        description: {
          en: 'A utility function which takes an event and returns the parsed version of that event.',
        },
      },
      {
        name: 'parseTimestamp',
        signature: '(input: VTimestampInput, required?: false): CalendarTimestamp | null',
        description: {
          en: 'A utility function which takes timestamp input and returns a timestamp object.',
        },
      },
      {
        name: 'timestampToDate',
        signature: '(timestamp: CalendarTimestamp): Date',
        description: {
          en: 'A utility function which takes timestamp and returns a Date.',
        },
      },
    ],
    events: [
      {
        name: 'input',
        value: {
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
        },
        description: {
          en: 'An alias to the `click:date` event used to support v-model.',
        },
      },
      {
        name: 'moved',
        value: {
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
        },
        description: {
          en: 'One of the functions `next`, `prev`, and `move` was called. The event passed is the day object calculated for the movement.',
        },
      },
      {
        name: 'change',
        value: {
          start: {
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
          },
          end: {
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
          },
        },
        description: {
          en: 'The range of days displayed on the calendar changed. This is triggered on initialization. The event passed is an object with start and end date objects.',
        },
      },
      {
        name: 'click:date',
        value: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The click event on the day of the month link. The event passed is the day & time object.',
        },
      },
      {
        name: 'contextmenu:date',
        value: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The right-click event on the day of the month link. The event passed is the day & time object.',
        },
      },
      {
        name: 'click:more',
        value: {
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
        },
        description: {
          en: 'The click event on the `X more` button on views with too many events in a day.',
        },
      },
      {
        name: 'click:day',
        value: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The click event on a day. The event passed is the day object.',
        },
      },
      {
        name: 'contextmenu:day',
        value: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The right-click event on a day. The event passed is the day object.',
        },
      },
      {
        name: 'mousedown:day',
        value: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The mousedown event on a day. The event passed is the day object.',
        },
      },
      {
        name: 'mousemove:day',
        value: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The mousemove event on a day. The event passed is the day object.',
        },
      },
      {
        name: 'mouseup:day',
        value: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The mouseup event on a day. The event passed is the day object.',
        },
      },
      {
        name: 'mouseenter:day',
        value: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The mouseenter event on a day. The event passed is the day object.',
        },
      },
      {
        name: 'mouseleave:day',
        value: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The mouseleave event on a day. The event passed is the day object.',
        },
      },
      {
        name: 'touchstart:day',
        value: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The touchstart event on a day. The event passed is the day object.',
        },
      },
      {
        name: 'touchmove:day',
        value: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The touchmove event on a day. The event passed is the day object.',
        },
      },
      {
        name: 'touchend:day',
        value: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The touchend event on a day. The event passed is the day object.',
        },
      },
      {
        name: 'click:day-category',
        value: {
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
          week: [
            {
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
            },
          ],
          category: 'string | null',
        },
        description: {
          en: 'The click event on a day in the `category` view. The event passed is the day object.',
        },
      },
      {
        name: 'contextmenu:day-category',
        value: {
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
          week: [
            {
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
            },
          ],
          category: 'string | null',
        },
        description: {
          en: 'The right-click event on a day in the `category` view. The event passed is the day object.',
        },
      },
      {
        name: 'mousedown:day-category',
        value: {
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
          week: [
            {
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
            },
          ],
          category: 'string | null',
        },
        description: {
          en: 'The mousedown event on a day in the `category` view. The event passed is the day object.',
        },
      },
      {
        name: 'mousemove:day-category',
        value: {
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
          week: [
            {
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
            },
          ],
          category: 'string | null',
        },
        description: {
          en: 'The mousemove event on a day in the `category` view. The event passed is the day object.',
        },
      },
      {
        name: 'mouseup:day-category',
        value: {
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
          week: [
            {
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
            },
          ],
          category: 'string | null',
        },
        description: {
          en: 'The mouseup event on a day in the `category` view. The event passed is the day object.',
        },
      },
      {
        name: 'mouseenter:day-category',
        value: {
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
          week: [
            {
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
            },
          ],
          category: 'string | null',
        },
        description: {
          en: 'The mouseenter event on a day in the `category` view. The event passed is the day object.',
        },
      },
      {
        name: 'mouseleave:day-category',
        value: {
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
          week: [
            {
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
            },
          ],
          category: 'string | null',
        },
        description: {
          en: 'The mouseleave event on a day in the `category` view. The event passed is the day object.',
        },
      },
      {
        name: 'touchstart:day-category',
        value: {
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
          week: [
            {
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
            },
          ],
          category: 'string | null',
        },
        description: {
          en: 'The touchstart event on a day in the `category` view. The event passed is the day object.',
        },
      },
      {
        name: 'touchmove:day-category',
        value: {
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
          week: [
            {
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
            },
          ],
          category: 'string | null',
        },
        description: {
          en: 'The touchmove event on a day in the `category` view. The event passed is the day object.',
        },
      },
      {
        name: 'touchend:day-category',
        value: {
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
          week: [
            {
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
            },
          ],
          category: 'string | null',
        },
        description: {
          en: 'The touchend event on a day in the `category` view. The event passed is the day object.',
        },
      },
      {
        name: 'click:time',
        value: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The click event at a specific time in the `day` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'contextmenu:time',
        value: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The right-click event at a specific time in the `day` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'mousedown:time',
        value: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The mousedown event at a specific time in the `day` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'mousemove:time',
        value: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The mousemove event at a specific time in the `day` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'mouseup:time',
        value: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The mouseup event at a specific time in the `day` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'mouseenter:time',
        value: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The mouseenter event at a specific time in the `day` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'mouseleave:time',
        value: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The mouseleave event at a specific time in the `day` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'touchstart:time',
        value: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The touchstart event at a specific time in the `day` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'touchmove:time',
        value: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The touchmove event at a specific time in the `day` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'touchend:time',
        value: {
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
          week: [
            {
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
            },
          ],
        },
        description: {
          en: 'The touchend event at a specific time in the `day` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'click:time-category',
        value: {
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
          week: [
            {
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
            },
          ],
          category: 'string | null',
        },
        description: {
          en: 'The click event at a specific time in the `category` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'contextmenu:time-category',
        value: {
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
          week: [
            {
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
            },
          ],
          category: 'string | null',
        },
        description: {
          en: 'The right-click event at a specific time in the `category` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'mousedown:time-category',
        value: {
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
          week: [
            {
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
            },
          ],
          category: 'string | null',
        },
        description: {
          en: 'The mousedown event at a specific time in the `category` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'mousemove:time-category',
        value: {
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
          week: [
            {
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
            },
          ],
          category: 'string | null',
        },
        description: {
          en: 'The mousemove event at a specific time in the `category` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'mouseup:time-category',
        value: {
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
          week: [
            {
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
            },
          ],
          category: 'string | null',
        },
        description: {
          en: 'The mouseup event at a specific time in the `category` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'mouseenter:time-category',
        value: {
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
          week: [
            {
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
            },
          ],
          category: 'string | null',
        },
        description: {
          en: 'The mouseenter event at a specific time in the `category` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'mouseleave:time-category',
        value: {
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
          week: [
            {
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
            },
          ],
          category: 'string | null',
        },
        description: {
          en: 'The mouseleave event at a specific time in the `category` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'touchstart:time-category',
        value: {
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
          week: [
            {
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
            },
          ],
          category: 'string | null',
        },
        description: {
          en: 'The touchstart event at a specific time in the `category` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'touchmove:time-category',
        value: {
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
          week: [
            {
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
            },
          ],
          category: 'string | null',
        },
        description: {
          en: 'The touchmove event at a specific time in the `category` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'touchend:time-category',
        value: {
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
          week: [
            {
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
            },
          ],
          category: 'string | null',
        },
        description: {
          en: 'The touchend event at a specific time in the `category` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'click:interval',
        value: {
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
        },
        description: {
          en: 'The click event at a specific interval label in the `day` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'contextmenu:interval',
        value: {
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
        },
        description: {
          en: 'The right-click event at a specific interval label in the `day` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'mousedown:interval',
        value: {
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
        },
        description: {
          en: 'The mousedown event at a specific interval label in the `day` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'mousemove:interval',
        value: {
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
        },
        description: {
          en: 'The mousemove event at a specific interval label in the `day` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'mouseup:interval',
        value: {
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
        },
        description: {
          en: 'The mouseup event at a specific interval label in the `day` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'mouseenter:interval',
        value: {
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
        },
        description: {
          en: 'The mouseenter event at a specific interval label in the `day` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'mouseleave:interval',
        value: {
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
        },
        description: {
          en: 'The mouseleave event at a specific interval label in the `day` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'touchstart:interval',
        value: {
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
        },
        description: {
          en: 'The touchstart event at a specific interval label in the `day` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'touchmove:interval',
        value: {
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
        },
        description: {
          en: 'The touchmove event at a specific interval label in the `day` view. The event passed is the day & time object.',
        },
      },
      {
        name: 'touchend:interval',
        value: {
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
        },
        description: {
          en: 'The touchend event at a specific interval label in the `day` view. The event passed is the day & time object.',
        },
      },
    ],
  },
  'v-calendar-category': {
    props: [
      {
        name: 'categories',
        type: [
          'array',
          'string',
        ],
        default: 'undefined',
        source: 'v-calendar-category',
        description: {
          en: '',
        },
      },
      {
        name: 'categoryDays',
        type: [
          'number',
          'string',
        ],
        default: 1,
        source: 'v-calendar-category',
        description: {
          en: '',
        },
      },
      {
        name: 'categoryForInvalid',
        type: 'string',
        default: 'undefined',
        source: 'v-calendar-category',
        description: {
          en: '',
        },
      },
      {
        name: 'categoryHideDynamic',
        type: 'boolean',
        default: 'false',
        source: 'v-calendar-category',
        description: {
          en: '',
        },
      },
      {
        name: 'categoryShowAll',
        type: 'boolean',
        default: 'false',
        source: 'v-calendar-category',
        description: {
          en: '',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dayFormat',
        type: 'function',
        default: 'null',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'end',
        type: [
          'string',
          'number',
          'date',
        ],
        default: 'undefined',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'firstInterval',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'calendar-with-intervals',
        description: {
          en: '',
        },
      },
      {
        name: 'firstTime',
        type: [
          'number',
          'string',
          'object',
        ],
        default: 'undefined',
        source: 'calendar-with-intervals',
        description: {
          en: '',
        },
      },
      {
        name: 'hideHeader',
        type: 'boolean',
        default: 'false',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'intervalCount',
        type: [
          'number',
          'string',
        ],
        default: 24,
        source: 'calendar-with-intervals',
        description: {
          en: '',
        },
      },
      {
        name: 'intervalFormat',
        type: 'function',
        default: 'null',
        source: 'calendar-with-intervals',
        description: {
          en: '',
        },
      },
      {
        name: 'intervalHeight',
        type: [
          'number',
          'string',
        ],
        default: 48,
        source: 'calendar-with-intervals',
        description: {
          en: '',
        },
      },
      {
        name: 'intervalMinutes',
        type: [
          'number',
          'string',
        ],
        default: 60,
        source: 'calendar-with-intervals',
        description: {
          en: '',
        },
      },
      {
        name: 'intervalStyle',
        type: 'function',
        default: 'null',
        source: 'calendar-with-intervals',
        description: {
          en: '',
        },
      },
      {
        name: 'intervalWidth',
        type: [
          'number',
          'string',
        ],
        default: 60,
        source: 'calendar-with-intervals',
        description: {
          en: '',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'locale',
        type: 'string',
        default: 'undefined',
        source: 'localable',
        description: {
          en: '',
        },
      },
      {
        name: 'maxDays',
        type: 'number',
        default: 7,
        source: 'calendar-with-intervals',
        description: {
          en: '',
        },
      },
      {
        name: 'now',
        type: 'string',
        default: 'undefined',
        source: 'times',
        description: {
          en: '',
        },
      },
      {
        name: 'shortIntervals',
        type: 'boolean',
        default: 'true',
        source: 'calendar-with-intervals',
        description: {
          en: '',
        },
      },
      {
        name: 'shortWeekdays',
        type: 'boolean',
        default: 'true',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'showIntervalLabel',
        type: 'function',
        default: 'null',
        source: 'calendar-with-intervals',
        description: {
          en: '',
        },
      },
      {
        name: 'start',
        type: [
          'string',
          'number',
          'date',
        ],
        default: '2020-08-26',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'weekdayFormat',
        type: 'function',
        default: 'null',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'weekdays',
        type: [
          'array',
          'string',
        ],
        default: [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
        ],
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'colorable',
      'localable',
      'mouse',
      'themeable',
      'times',
    ],
  },
  'v-calendar-daily': {
    props: [
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dayFormat',
        type: 'function',
        default: 'null',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'end',
        type: [
          'string',
          'number',
          'date',
        ],
        default: 'undefined',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'firstInterval',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'calendar-with-intervals',
        description: {
          en: '',
        },
      },
      {
        name: 'firstTime',
        type: [
          'number',
          'string',
          'object',
        ],
        default: 'undefined',
        source: 'calendar-with-intervals',
        description: {
          en: '',
        },
      },
      {
        name: 'hideHeader',
        type: 'boolean',
        default: 'false',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'intervalCount',
        type: [
          'number',
          'string',
        ],
        default: 24,
        source: 'calendar-with-intervals',
        description: {
          en: '',
        },
      },
      {
        name: 'intervalFormat',
        type: 'function',
        default: 'null',
        source: 'calendar-with-intervals',
        description: {
          en: '',
        },
      },
      {
        name: 'intervalHeight',
        type: [
          'number',
          'string',
        ],
        default: 48,
        source: 'calendar-with-intervals',
        description: {
          en: '',
        },
      },
      {
        name: 'intervalMinutes',
        type: [
          'number',
          'string',
        ],
        default: 60,
        source: 'calendar-with-intervals',
        description: {
          en: '',
        },
      },
      {
        name: 'intervalStyle',
        type: 'function',
        default: 'null',
        source: 'calendar-with-intervals',
        description: {
          en: '',
        },
      },
      {
        name: 'intervalWidth',
        type: [
          'number',
          'string',
        ],
        default: 60,
        source: 'calendar-with-intervals',
        description: {
          en: '',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'locale',
        type: 'string',
        default: 'undefined',
        source: 'localable',
        description: {
          en: '',
        },
      },
      {
        name: 'maxDays',
        type: 'number',
        default: 7,
        source: 'calendar-with-intervals',
        description: {
          en: '',
        },
      },
      {
        name: 'now',
        type: 'string',
        default: 'undefined',
        source: 'times',
        description: {
          en: '',
        },
      },
      {
        name: 'shortIntervals',
        type: 'boolean',
        default: 'true',
        source: 'calendar-with-intervals',
        description: {
          en: '',
        },
      },
      {
        name: 'shortWeekdays',
        type: 'boolean',
        default: 'true',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'showIntervalLabel',
        type: 'function',
        default: 'null',
        source: 'calendar-with-intervals',
        description: {
          en: '',
        },
      },
      {
        name: 'start',
        type: [
          'string',
          'number',
          'date',
        ],
        default: '2020-08-26',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'weekdayFormat',
        type: 'function',
        default: 'null',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'weekdays',
        type: [
          'array',
          'string',
        ],
        default: [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
        ],
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'colorable',
      'localable',
      'mouse',
      'themeable',
      'times',
    ],
  },
  'v-calendar-weekly': {
    props: [
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dayFormat',
        type: 'function',
        default: 'null',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'end',
        type: [
          'string',
          'number',
          'date',
        ],
        default: 'undefined',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'hideHeader',
        type: 'boolean',
        default: 'false',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'locale',
        type: 'string',
        default: 'undefined',
        source: 'localable',
        description: {
          en: '',
        },
      },
      {
        name: 'localeFirstDayOfYear',
        type: [
          'string',
          'number',
        ],
        default: 0,
        source: 'v-calendar-weekly',
        description: {
          en: '',
        },
      },
      {
        name: 'minWeeks',
        type: 'any',
        default: 1,
        source: 'v-calendar-weekly',
        description: {
          en: '',
        },
      },
      {
        name: 'monthFormat',
        type: 'function',
        default: 'null',
        source: 'v-calendar-weekly',
        description: {
          en: '',
        },
      },
      {
        name: 'now',
        type: 'string',
        default: 'undefined',
        source: 'times',
        description: {
          en: '',
        },
      },
      {
        name: 'shortMonths',
        type: 'boolean',
        default: 'true',
        source: 'v-calendar-weekly',
        description: {
          en: '',
        },
      },
      {
        name: 'shortWeekdays',
        type: 'boolean',
        default: 'true',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'showMonthOnFirst',
        type: 'boolean',
        default: 'true',
        source: 'v-calendar-weekly',
        description: {
          en: '',
        },
      },
      {
        name: 'showWeek',
        type: 'boolean',
        default: 'false',
        source: 'v-calendar-weekly',
        description: {
          en: '',
        },
      },
      {
        name: 'start',
        type: [
          'string',
          'number',
          'date',
        ],
        default: '2020-08-26',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'weekdayFormat',
        type: 'function',
        default: 'null',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'weekdays',
        type: [
          'array',
          'string',
        ],
        default: [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
        ],
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'colorable',
      'localable',
      'mouse',
      'themeable',
      'times',
    ],
  },
  'v-calendar-monthly': {
    props: [
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dayFormat',
        type: 'function',
        default: 'null',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'end',
        type: [
          'string',
          'number',
          'date',
        ],
        default: 'undefined',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'hideHeader',
        type: 'boolean',
        default: 'false',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'locale',
        type: 'string',
        default: 'undefined',
        source: 'localable',
        description: {
          en: '',
        },
      },
      {
        name: 'localeFirstDayOfYear',
        type: [
          'string',
          'number',
        ],
        default: 0,
        source: 'v-calendar-weekly',
        description: {
          en: '',
        },
      },
      {
        name: 'minWeeks',
        type: 'any',
        default: 1,
        source: 'v-calendar-weekly',
        description: {
          en: '',
        },
      },
      {
        name: 'monthFormat',
        type: 'function',
        default: 'null',
        source: 'v-calendar-weekly',
        description: {
          en: '',
        },
      },
      {
        name: 'now',
        type: 'string',
        default: 'undefined',
        source: 'times',
        description: {
          en: '',
        },
      },
      {
        name: 'shortMonths',
        type: 'boolean',
        default: 'true',
        source: 'v-calendar-weekly',
        description: {
          en: '',
        },
      },
      {
        name: 'shortWeekdays',
        type: 'boolean',
        default: 'true',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'showMonthOnFirst',
        type: 'boolean',
        default: 'true',
        source: 'v-calendar-weekly',
        description: {
          en: '',
        },
      },
      {
        name: 'showWeek',
        type: 'boolean',
        default: 'false',
        source: 'v-calendar-weekly',
        description: {
          en: '',
        },
      },
      {
        name: 'start',
        type: [
          'string',
          'number',
          'date',
        ],
        default: '2020-08-26',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'weekdayFormat',
        type: 'function',
        default: 'null',
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
      {
        name: 'weekdays',
        type: [
          'array',
          'string',
        ],
        default: [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
        ],
        source: 'calendar-base',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'colorable',
      'localable',
      'mouse',
      'themeable',
      'times',
    ],
  },
  'v-card': {
    props: [
      {
        name: 'activeClass',
        type: 'string',
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Configure the active CSS class applied when the link is active. You can find more information about the [**active-class** prop](https://router.vuejs.org/api/#active-class) on the vue-router documentation.',
        },
      },
      {
        name: 'append',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Setting **append** prop always appends the relative path to the current path. You can find more information about the [**append** prop](https://router.vuejs.org/api/#append) on the vue-router documentation.',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Removes the ability to click or target the component.',
        },
      },
      {
        name: 'elevation',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'elevatable',
        description: {
          en: 'Designates an elevation applied to the component between 0 and 24. You can find more information on the [elevation page](/styles/elevation).',
        },
      },
      {
        name: 'exact',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: "Exactly match the link. Without this, '/' will match every route. You can find more information about the [**exact** prop](https://router.vuejs.org/api/#exact) on the vue-router documentation.",
        },
      },
      {
        name: 'exactActiveClass',
        type: 'string',
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Configure the active CSS class applied when the link is active with exact match. You can find more information about the [**exact-active-class** prop](https://router.vuejs.org/api/#exact-active-class) on the vue-router documentation.',
        },
      },
      {
        name: 'flat',
        type: 'boolean',
        default: 'false',
        source: 'v-card',
        description: {
          en: "Removes the card's elevation.",
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the height for the component.',
        },
      },
      {
        name: 'hover',
        type: 'boolean',
        default: 'false',
        source: 'v-card',
        description: {
          en: 'Will apply an elevation of 4dp when hovered (default 2dp). You can find more information on the [elevation page](/styles/elevation).',
        },
      },
      {
        name: 'href',
        type: [
          'string',
          'object',
        ],
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Designates the component as anchor and applies the **href** attribute.',
        },
      },
      {
        name: 'img',
        type: 'string',
        default: 'undefined',
        source: 'v-card',
        description: {
          en: 'Specifies an image background for the card. For more advanced implementations, it is recommended that you use the [v-img](/components/images) component. You can find a [v-img example here](#media-with-text).',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'link',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Designates that the component is a link. This is automatic when using the **href** or **to** prop.',
        },
      },
      {
        name: 'loaderHeight',
        type: [
          'number',
          'string',
        ],
        default: 4,
        source: 'loadable',
        description: {
          en: 'Specifies the height of the loader',
        },
      },
      {
        name: 'loading',
        type: [
          'boolean',
          'string',
        ],
        default: false,
        source: 'loadable',
        description: {
          en: "Displays linear progress bar. Can either be a String which specifies which color is applied to the progress bar (any material color or theme color - **primary**, **secondary**, **success**, **info**, **warning**, **error**) or a Boolean which uses the component **color** (set by color prop - if it's supported by the component) or the primary color",
        },
      },
      {
        name: 'maxHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum height for the component.',
        },
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum width for the component.',
        },
      },
      {
        name: 'minHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum height for the component.',
        },
      },
      {
        name: 'minWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum width for the component.',
        },
      },
      {
        name: 'nuxt',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Specifies the link is a `nuxt-link`. For use with the [nuxt framework](https://nuxtjs.org/api/components-nuxt-link/).',
        },
      },
      {
        name: 'outlined',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
        description: {
          en: 'Removes elevation (box-shadow) and adds a *thin* border.',
        },
      },
      {
        name: 'raised',
        type: 'boolean',
        default: 'false',
        source: 'v-card',
        description: {
          en: 'Specifies a higher default elevation (8dp). You can find more information on the [elevation page](/styles/elevation).',
        },
      },
      {
        name: 'replace',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Setting **replace** prop will call `router.replace()` instead of `router.push()` when clicked, so the navigation will not leave a history record. You can find more information about the [**replace** prop](https://router.vuejs.org/api/#replace) on the vue-router documentation.',
        },
      },
      {
        name: 'ripple',
        type: [
          'boolean',
          'object',
        ],
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Mixins.Rippleable.props.ripple',
        },
      },
      {
        name: 'rounded',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'roundable',
        description: {
          en: 'Designates the **border-radius** applied to the component. You can find more information on the [Border Radius page](/styles/border-radius).',
        },
      },
      {
        name: 'shaped',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
        description: {
          en: 'Applies a large border radius on the top left and bottom right of the card.',
        },
      },
      {
        name: 'tag',
        type: 'string',
        default: "'div'",
        source: 'routable',
        description: {
          en: 'Components.Sheets.props.tag',
        },
      },
      {
        name: 'target',
        type: 'string',
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Designates the target attribute. This should only be applied when using the **href** prop.',
        },
      },
      {
        name: 'tile',
        type: 'boolean',
        default: 'false',
        source: 'roundable',
        description: {
          en: "Removes the component's **border-radius**.",
        },
      },
      {
        name: 'to',
        type: [
          'string',
          'object',
        ],
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Denotes the target route of the link. You can find more information about the [**to** prop](https://router.vuejs.org/api/#to) on the vue-router documentation.',
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the width for the component.',
        },
      },
    ],
    mixins: [
      'loadable',
      'routable',
      'v-sheet',
      'colorable',
      'elevatable',
      'measurable',
      'roundable',
      'themeable',
    ],
    events: [
      {
        name: 'click',
        value: 'void',
        description: {
          en: 'Emitted when component is clicked - Will trigger component to ripple when clicked unless the `.native` modifier is used',
        },
      },
    ],
    slots: [
      {
        name: 'progress',
        description: {
          en: 'Slot for custom progress linear (displayed when **loading** prop is not equal to Boolean False)',
        },
      },
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-card-actions': {
    props: [],
    mixins: [],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-card-subtitle': {
    props: [],
    mixins: [],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-card-text': {
    props: [],
    mixins: [],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-card-title': {
    props: [],
    mixins: [],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-carousel': {
    props: [
      {
        name: 'activeClass',
        type: 'string',
        default: "'v-window-item--active'",
        source: 'base-item-group',
        description: {
          en: 'The **active-class** applied to children when they are activated.',
        },
      },
      {
        name: 'continuous',
        type: 'boolean',
        default: 'true',
        source: 'v-window',
        description: {
          en: 'Determines whether carousel is continuous',
        },
      },
      {
        name: 'cycle',
        type: 'boolean',
        default: 'false',
        source: 'v-carousel',
        description: {
          en: 'Determines if the carousel should cycle through images.',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'delimiterIcon',
        type: 'string',
        default: "'$delimiter'",
        source: 'v-carousel',
        description: {
          en: 'Sets icon for carousel delimiter',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 500,
        source: 'v-carousel',
        description: {
          en: '',
        },
      },
      {
        name: 'hideDelimiterBackground',
        type: 'boolean',
        default: 'false',
        source: 'v-carousel',
        description: {
          en: 'Hides the bottom delimiter background.',
        },
      },
      {
        name: 'hideDelimiters',
        type: 'boolean',
        default: 'false',
        source: 'v-carousel',
        description: {
          en: "Hides the carousel's bottom delimiters.",
        },
      },
      {
        name: 'interval',
        type: [
          'number',
          'string',
        ],
        default: 6000,
        source: 'v-carousel',
        description: {
          en: 'The duration between image cycles. Requires the **cycle** prop.',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'mandatory',
        type: 'boolean',
        default: 'true',
        source: 'base-item-group',
        description: {
          en: 'Forces a value to always be selected (if available).',
        },
      },
      {
        name: 'max',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'base-item-group',
        description: {
          en: 'Sets a maximum number of selections that can be made.',
        },
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        source: 'base-item-group',
        description: {
          en: 'Allow multiple selections. The **value** prop must be an _array_.',
        },
      },
      {
        name: 'nextIcon',
        type: [
          'boolean',
          'string',
        ],
        default: '$next',
        source: 'v-window',
        description: {
          en: 'The displayed icon for forcing pagination to the next item.',
        },
      },
      {
        name: 'prevIcon',
        type: [
          'boolean',
          'string',
        ],
        default: '$prev',
        source: 'v-window',
        description: {
          en: 'The displayed icon for forcing pagination to the previous item.',
        },
      },
      {
        name: 'progress',
        type: 'boolean',
        default: 'false',
        source: 'v-carousel',
        description: {
          en: 'Displays a carousel progress bar. Requires the **cycle** prop and **interval**.',
        },
      },
      {
        name: 'progressColor',
        type: 'string',
        default: 'undefined',
        source: 'v-carousel',
        description: {
          en: 'Applies specified color to progress bar.',
        },
      },
      {
        name: 'reverse',
        type: 'boolean',
        default: 'false',
        source: 'v-window',
        description: {
          en: 'Reverse the normal transition direction.',
        },
      },
      {
        name: 'showArrows',
        type: 'boolean',
        default: 'true',
        source: 'v-window',
        description: {
          en: 'Displays arrows for next/previous navigation.',
        },
      },
      {
        name: 'showArrowsOnHover',
        type: 'boolean',
        default: 'false',
        source: 'v-window',
        description: {
          en: 'Displays navigation arrows only when the carousel is hovered over.',
        },
      },
      {
        name: 'touch',
        type: 'object',
        default: 'undefined',
        source: 'v-window',
        description: {
          en: 'Provide a custom **left** and **right** function when swiped left or right.',
        },
      },
      {
        name: 'touchless',
        type: 'boolean',
        default: 'false',
        source: 'v-window',
        description: {
          en: 'Disable touch support.',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'proxyable',
        description: {
          en: 'The designated model value for the component.',
        },
      },
      {
        name: 'vertical',
        type: 'boolean',
        default: 'false',
        source: 'v-window',
        description: {
          en: 'Uses a vertical transition when changing windows.',
        },
      },
      {
        name: 'verticalDelimiters',
        type: 'string',
        default: 'undefined',
        source: 'v-carousel',
        description: {
          en: 'Displays carousel delimiters vertically.',
        },
      },
    ],
    mixins: [
      'proxyable',
      'themeable',
    ],
    events: [
      {
        name: 'change',
        value: 'number',
        description: {
          en: 'Emitted when the component value is changed by user interaction',
        },
      },
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-carousel-item': {
    props: [
      {
        name: 'activeClass',
        type: 'string',
        default: 'undefined',
        source: 'groupable',
        description: {
          en: 'Mixins.Routable.props.activeClass',
        },
      },
      {
        name: 'append',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Setting **append** prop always appends the relative path to the current path. You can find more information about the [**append** prop](https://router.vuejs.org/api/#append) on the vue-router documentation.',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'groupable',
        description: {
          en: 'Mixins.Routable.props.disabled',
        },
      },
      {
        name: 'eager',
        type: 'boolean',
        default: 'false',
        source: 'bootable',
        description: {
          en: 'Will force the components content to render on mounted. This is useful if you have content that will not be rendered in the DOM that you want crawled for SEO.',
        },
      },
      {
        name: 'exact',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: "Exactly match the link. Without this, '/' will match every route. You can find more information about the [**exact** prop](https://router.vuejs.org/api/#exact) on the vue-router documentation.",
        },
      },
      {
        name: 'exactActiveClass',
        type: 'string',
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Configure the active CSS class applied when the link is active with exact match. You can find more information about the [**exact-active-class** prop](https://router.vuejs.org/api/#exact-active-class) on the vue-router documentation.',
        },
      },
      {
        name: 'href',
        type: [
          'string',
          'object',
        ],
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Designates the component as anchor and applies the **href** attribute.',
        },
      },
      {
        name: 'link',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Designates that the component is a link. This is automatic when using the **href** or **to** prop.',
        },
      },
      {
        name: 'nuxt',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Specifies the link is a `nuxt-link`. For use with the [nuxt framework](https://nuxtjs.org/api/components-nuxt-link/).',
        },
      },
      {
        name: 'replace',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Setting **replace** prop will call `router.replace()` instead of `router.push()` when clicked, so the navigation will not leave a history record. You can find more information about the [**replace** prop](https://router.vuejs.org/api/#replace) on the vue-router documentation.',
        },
      },
      {
        name: 'reverseTransition',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-window-item',
        description: {
          en: '',
        },
      },
      {
        name: 'ripple',
        type: [
          'boolean',
          'object',
        ],
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Mixins.Rippleable.props.ripple',
        },
      },
      {
        name: 'tag',
        type: 'string',
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Components.Sheets.props.tag',
        },
      },
      {
        name: 'target',
        type: 'string',
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Designates the target attribute. This should only be applied when using the **href** prop.',
        },
      },
      {
        name: 'to',
        type: [
          'string',
          'object',
        ],
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Denotes the target route of the link. You can find more information about the [**to** prop](https://router.vuejs.org/api/#to) on the vue-router documentation.',
        },
      },
      {
        name: 'transition',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-window-item',
        description: {
          en: '',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'v-window-item',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'v-window-item',
      'bootable',
      'groupable',
      'routable',
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-checkbox': {
    props: [
      {
        name: 'appendIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Appends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'backgroundColor',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Changes the background-color of the input',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Components.Inputs.props.dark',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Reduces the input height',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Disable the input',
        },
      },
      {
        name: 'error',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual error state',
        },
      },
      {
        name: 'errorCount',
        type: [
          'number',
          'string',
        ],
        default: 1,
        source: 'validatable',
        description: {
          en: 'The total number of errors that should display at once',
        },
      },
      {
        name: 'errorMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in an error state and passes through custom error messages. Will be combined with any validations that occur from the **rules** prop. This field will not trigger validation',
        },
      },
      {
        name: 'falseValue',
        type: 'any',
        default: 'undefined',
        source: 'selectable',
        description: {
          en: 'Sets value for falsy state',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the height of the input',
        },
      },
      {
        name: 'hideDetails',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display",
        },
      },
      {
        name: 'hint',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Hint text',
        },
      },
      {
        name: 'id',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the DOM id on the component',
        },
      },
      {
        name: 'indeterminate',
        type: 'boolean',
        default: 'false',
        source: 'v-checkbox',
        description: {
          en: 'Sets an indeterminate state for the checkbox',
        },
      },
      {
        name: 'indeterminateIcon',
        type: 'string',
        default: "'$checkboxIndeterminate'",
        source: 'v-checkbox',
        description: {
          en: 'The icon used when in an indeterminate state',
        },
      },
      {
        name: 'inputValue',
        type: 'any',
        default: 'undefined',
        source: 'selectable',
        description: {
          en: 'The **v-model** bound value',
        },
      },
      {
        name: 'label',
        type: 'string',
        source: 'v-input',
        description: {
          en: 'Sets input label',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'messages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Displays a list of messages or message if using a string',
        },
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        source: 'selectable',
        description: {
          en: 'Changes expected model to an array',
        },
      },
      {
        name: 'offIcon',
        type: 'string',
        default: "'$checkboxOff'",
        source: 'v-checkbox',
        description: {
          en: 'The icon used when inactive',
        },
      },
      {
        name: 'onIcon',
        type: 'string',
        default: "'$checkboxOn'",
        source: 'v-checkbox',
        description: {
          en: 'The icon used when active',
        },
      },
      {
        name: 'persistentHint',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Forces hint to always be visible',
        },
      },
      {
        name: 'prependIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Prepends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Puts input in readonly state',
        },
      },
      {
        name: 'ripple',
        type: [
          'boolean',
          'object',
        ],
        default: true,
        source: 'rippleable',
        description: {
          en: 'Applies the [v-ripple](/directives/ripples) directive.',
        },
      },
      {
        name: 'rules',
        type: 'array',
        default: [],
        source: 'validatable',
        description: {
          en: 'Accepts an array of functions that take an input value as an argument and return either `true` / `false` or a `string` with an error message',
        },
      },
      {
        name: 'success',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual success state',
        },
      },
      {
        name: 'successMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in a success state and passes through custom success messages.',
        },
      },
      {
        name: 'trueValue',
        type: 'any',
        default: 'undefined',
        source: 'selectable',
        description: {
          en: 'Sets value for truthy state',
        },
      },
      {
        name: 'validateOnBlur',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Delays validation until blur event',
        },
      },
      {
        name: 'value',
        type: 'any',
        source: 'v-input',
        description: {
          en: "The input's value",
        },
      },
      {
        name: 'valueComparator',
        type: 'function',
        default: 'null',
        source: 'comparable',
        description: {
          en: 'Apply a custom value comparator function',
        },
      },
    ],
    mixins: [
      'v-input',
      'validatable',
      'colorable',
      'registrable-inject',
      'themeable',
      'rippleable',
      'comparable',
    ],
    events: [
      {
        name: 'update:error',
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'The `error.sync` event',
        },
      },
      {
        name: 'click',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when input is clicked',
        },
      },
      {
        name: 'mousedown',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is pressed',
        },
      },
      {
        name: 'mouseup',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is released',
        },
      },
      {
        name: 'click:append',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when appended icon is clicked',
        },
      },
      {
        name: 'click:prepend',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when prepended icon is clicked',
        },
      },
      {
        name: 'update:indeterminate',
        value: 'boolean',
        description: {
          en: 'The **indeterminate.sync** event.',
        },
      },
    ],
    slots: [
      {
        name: 'append',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'default',
        source: 'v-input',
        description: {
          en: 'The default Vue slot.',
        },
      },
      {
        name: 'prepend',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'label',
        source: 'v-input',
        description: {
          en: 'Replaces the default label',
        },
      },
      {
        name: 'message',
        props: {
          key: 'number, // the messages index',
          message: 'string, // the message',
        },
        source: 'v-input',
        description: {
          en: '',
        },
      },
    ],
  },
  'v-simple-checkbox': {
    props: [
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'v-simple-checkbox',
        description: {
          en: 'Mixins.Colorable.props.color',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'v-simple-checkbox',
        description: {
          en: '',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'v-simple-checkbox',
        description: {
          en: 'Disables simple checkbox.',
        },
      },
      {
        name: 'indeterminate',
        type: 'boolean',
        default: 'false',
        source: 'v-simple-checkbox',
        description: {
          en: 'Sets an indeterminate state for the simple checkbox.',
        },
      },
      {
        name: 'indeterminateIcon',
        type: 'string',
        default: "'$checkboxIndeterminate'",
        source: 'v-simple-checkbox',
        description: {
          en: 'The icon used when in an indeterminate state.',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'v-simple-checkbox',
        description: {
          en: '',
        },
      },
      {
        name: 'offIcon',
        type: 'string',
        default: "'$checkboxOff'",
        source: 'v-simple-checkbox',
        description: {
          en: 'The icon used when inactive.',
        },
      },
      {
        name: 'onIcon',
        type: 'string',
        default: "'$checkboxOn'",
        source: 'v-simple-checkbox',
        description: {
          en: 'The icon used when active.',
        },
      },
      {
        name: 'ripple',
        type: 'boolean',
        default: 'true',
        source: 'v-simple-checkbox',
        description: {
          en: '',
        },
      },
      {
        name: 'value',
        type: 'boolean',
        default: 'false',
        source: 'v-simple-checkbox',
        description: {
          en: 'A boolean value that represents whether the simple checkbox is checked.',
        },
      },
    ],
    mixins: [],
    events: [
      {
        name: 'input',
        value: 'Event',
        description: {
          en: 'The updated bound model',
        },
      },
    ],
  },
  'v-chip': {
    props: [
      {
        name: 'active',
        type: 'boolean',
        default: 'true',
        source: 'v-chip',
        description: {
          en: 'Determines whether the chip is visible or not.',
        },
      },
      {
        name: 'activeClass',
        type: 'string',
        default: '',
        source: 'routable',
        description: {
          en: 'Configure the active CSS class applied when the link is active. You can find more information about the [**active-class** prop](https://router.vuejs.org/api/#active-class) on the vue-router documentation.',
        },
      },
      {
        name: 'append',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Setting **append** prop always appends the relative path to the current path. You can find more information about the [**append** prop](https://router.vuejs.org/api/#append) on the vue-router documentation.',
        },
      },
      {
        name: 'close',
        type: 'boolean',
        default: 'false',
        source: 'v-chip',
        description: {
          en: 'Adds remove button',
        },
      },
      {
        name: 'closeIcon',
        type: 'string',
        default: "'$delete'",
        source: 'v-chip',
        description: {
          en: 'Change the default icon used for **close** chips',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Disables the chip, making it un-selectable',
        },
      },
      {
        name: 'draggable',
        type: 'boolean',
        default: 'false',
        source: 'v-chip',
        description: {
          en: 'Makes the chip draggable',
        },
      },
      {
        name: 'exact',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: "Exactly match the link. Without this, '/' will match every route. You can find more information about the [**exact** prop](https://router.vuejs.org/api/#exact) on the vue-router documentation.",
        },
      },
      {
        name: 'exactActiveClass',
        type: 'string',
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Configure the active CSS class applied when the link is active with exact match. You can find more information about the [**exact-active-class** prop](https://router.vuejs.org/api/#exact-active-class) on the vue-router documentation.',
        },
      },
      {
        name: 'filter',
        type: 'boolean',
        default: 'false',
        source: 'v-chip',
        description: {
          en: 'Displays a selection icon when selected',
        },
      },
      {
        name: 'filterIcon',
        type: 'string',
        default: "'$complete'",
        source: 'v-chip',
        description: {
          en: 'Change the default icon used for **filter** chips',
        },
      },
      {
        name: 'href',
        type: [
          'string',
          'object',
        ],
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Designates the component as anchor and applies the **href** attribute.',
        },
      },
      {
        name: 'inputValue',
        type: 'any',
        default: 'undefined',
        source: 'toggleable',
        description: {
          en: 'Controls the **active** state of the item. This is typically used to highlight the component.',
        },
      },
      {
        name: 'label',
        type: 'boolean',
        default: 'false',
        source: 'v-chip',
        description: {
          en: 'Removes circle edges',
        },
      },
      {
        name: 'large',
        type: 'boolean',
        default: 'false',
        source: 'sizeable',
        description: {
          en: 'Makes the component large.',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'link',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Explicitly define the chip as a link',
        },
      },
      {
        name: 'nuxt',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Specifies the link is a `nuxt-link`. For use with the [nuxt framework](https://nuxtjs.org/api/components-nuxt-link/).',
        },
      },
      {
        name: 'outlined',
        type: 'boolean',
        default: 'false',
        source: 'v-chip',
        description: {
          en: 'Removes background and applies border and text color',
        },
      },
      {
        name: 'pill',
        type: 'boolean',
        default: 'false',
        source: 'v-chip',
        description: {
          en: 'Remove `v-avatar` padding',
        },
      },
      {
        name: 'replace',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Setting **replace** prop will call `router.replace()` instead of `router.push()` when clicked, so the navigation will not leave a history record. You can find more information about the [**replace** prop](https://router.vuejs.org/api/#replace) on the vue-router documentation.',
        },
      },
      {
        name: 'ripple',
        type: [
          'boolean',
          'object',
        ],
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Mixins.Rippleable.props.ripple',
        },
      },
      {
        name: 'small',
        type: 'boolean',
        default: 'false',
        source: 'sizeable',
        description: {
          en: 'Makes the component small.',
        },
      },
      {
        name: 'tag',
        type: 'string',
        default: "'span'",
        source: 'routable',
        description: {
          en: 'Components.Sheets.props.tag',
        },
      },
      {
        name: 'target',
        type: 'string',
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Designates the target attribute. This should only be applied when using the **href** prop.',
        },
      },
      {
        name: 'textColor',
        type: 'string',
        default: 'undefined',
        source: 'v-chip',
        description: {
          en: 'Applies a specified color to the control text',
        },
      },
      {
        name: 'to',
        type: [
          'string',
          'object',
        ],
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Denotes the target route of the link. You can find more information about the [**to** prop](https://router.vuejs.org/api/#to) on the vue-router documentation.',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'v-chip',
        description: {
          en: 'The value used when a child of a [v-chip-group](/components/chip-groups).',
        },
      },
      {
        name: 'xLarge',
        type: 'boolean',
        default: 'false',
        source: 'sizeable',
        description: {
          en: 'Makes the component extra large.',
        },
      },
      {
        name: 'xSmall',
        type: 'boolean',
        default: 'false',
        source: 'sizeable',
        description: {
          en: 'Makes the component extra small.',
        },
      },
    ],
    mixins: [
      'colorable',
      'sizeable',
      'routable',
      'themeable',
      'groupable',
      'toggleable',
    ],
    events: [
      {
        name: 'input',
        value: 'boolean',
        description: {
          en: 'The updated bound model',
        },
      },
      {
        name: 'click',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when component is clicked, toggles chip if contained in a chip group - Will trigger component to ripple when clicked unless the `.native` modifier is used',
        },
      },
      {
        name: 'click:close',
        value: 'void',
        description: {
          en: 'Emitted when close icon is clicked',
        },
      },
      {
        name: 'update:active',
        value: 'boolean',
        description: {
          en: 'Emitted when close icon is clicked, sets active to `false`',
        },
      },
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-chip-group': {
    props: [
      {
        name: 'activeClass',
        type: 'string',
        default: "'v-slide-item--active'",
        source: 'base-item-group',
        description: {
          en: 'The **active-class** applied to children when they are activated.',
        },
      },
      {
        name: 'centerActive',
        type: 'boolean',
        default: 'false',
        source: 'base-slide-group',
        description: {
          en: 'Forces the selected chip to be centered',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'column',
        type: 'boolean',
        default: 'false',
        source: 'v-chip-group',
        description: {
          en: 'Remove horizontal pagination and wrap items as needed',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'mandatory',
        type: 'boolean',
        default: 'false',
        source: 'base-item-group',
        description: {
          en: 'Forces a value to always be selected (if available).',
        },
      },
      {
        name: 'max',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'base-item-group',
        description: {
          en: 'Sets a maximum number of selections that can be made.',
        },
      },
      {
        name: 'mobileBreakpoint',
        type: [
          'number',
          'string',
        ],
        source: 'mobile',
        description: {
          en: '',
        },
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        source: 'base-item-group',
        description: {
          en: 'Allow multiple selections. The **value** prop must be an _array_.',
        },
      },
      {
        name: 'nextIcon',
        type: 'string',
        default: "'$next'",
        source: 'base-slide-group',
        description: {
          en: 'Specify the icon to use for the next icon',
        },
      },
      {
        name: 'prevIcon',
        type: 'string',
        default: "'$prev'",
        source: 'base-slide-group',
        description: {
          en: 'Specify the icon to use for the prev icon',
        },
      },
      {
        name: 'showArrows',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'base-slide-group',
        description: {
          en: 'Force the display of the pagination arrows',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'proxyable',
        description: {
          en: 'The designated model value for the component.',
        },
      },
    ],
    mixins: [
      'base-slide-group',
      'base-item-group',
      'proxyable',
      'themeable',
      'mobile',
      'colorable',
    ],
    events: [
      {
        name: 'change',
        value: 'any[] | any',
        description: {
          en: 'Emitted when the component value is changed by user interaction',
        },
      },
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-color-picker': {
    props: [
      {
        name: 'canvasHeight',
        type: [
          'string',
          'number',
        ],
        default: 150,
        source: 'v-color-picker',
        description: {
          en: 'Height of canvas',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'v-color-picker',
        description: {
          en: 'Disables picker',
        },
      },
      {
        name: 'dotSize',
        type: [
          'number',
          'string',
        ],
        default: 10,
        source: 'v-color-picker',
        description: {
          en: 'Changes the size of the selection dot on the canvas',
        },
      },
      {
        name: 'elevation',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'elevatable',
        description: {
          en: 'Designates an elevation applied to the component between 0 and 24. You can find more information on the [elevation page](/styles/elevation).',
        },
      },
      {
        name: 'flat',
        type: 'boolean',
        default: 'false',
        source: 'v-color-picker',
        description: {
          en: 'Removes elevation',
        },
      },
      {
        name: 'hideCanvas',
        type: 'boolean',
        default: 'false',
        source: 'v-color-picker',
        description: {
          en: 'Hides canvas',
        },
      },
      {
        name: 'hideInputs',
        type: 'boolean',
        default: 'false',
        source: 'v-color-picker',
        description: {
          en: 'Hides inputs',
        },
      },
      {
        name: 'hideModeSwitch',
        type: 'boolean',
        default: 'false',
        source: 'v-color-picker',
        description: {
          en: 'Hides mode switch',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'mode',
        type: 'string',
        default: "'rgba'",
        source: 'v-color-picker',
        description: {
          en: "Sets mode of inputs. Available modes are 'rgba', 'hsla', and 'hexa'. Can be synced with the `.sync` modifier.",
        },
      },
      {
        name: 'showSwatches',
        type: 'boolean',
        default: 'false',
        source: 'v-color-picker',
        description: {
          en: 'Displays color swatches',
        },
      },
      {
        name: 'swatches',
        type: 'array',
        default: 'undefined',
        source: 'v-color-picker',
        description: {
          en: 'Sets the available color swatches to select from - This prop only accepts rgba hex strings',
        },
      },
      {
        name: 'swatchesMaxHeight',
        type: [
          'number',
          'string',
        ],
        default: 150,
        source: 'v-color-picker',
        description: {
          en: 'Sets the maximum height of the swatches section',
        },
      },
      {
        name: 'value',
        type: [
          'object',
          'string',
        ],
        default: 'undefined',
        source: 'v-color-picker',
        description: {
          en: 'Current color. This can be either a string representing a hex color, or an object representing a RGBA, HSLA, or HSVA value',
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 300,
        source: 'v-color-picker',
        description: {
          en: 'Sets the width of the color picker',
        },
      },
    ],
    mixins: [
      'elevatable',
      'themeable',
    ],
    events: [
      {
        name: 'input',
        value: 'string | object',
        description: {
          en: 'Selected color. Depending on what you passed to the `value` prop this is either a string or an object',
        },
      },
      {
        name: 'update:color',
        value: {
          alpha: 'number',
          hex: 'string',
          hexa: 'string',
          hsla: {
            h: 'number',
            s: 'number',
            l: 'number',
            a: 'number',
          },
          hsva: {
            h: 'number',
            s: 'number',
            v: 'number',
            a: 'number',
          },
          hue: 'number',
          rgba: {
            r: 'number',
            g: 'number',
            b: 'number',
            a: 'number',
          },
        },
        description: {
          en: 'Selected color. This is the internal representation of the color, containing all values.',
        },
      },
      {
        name: 'update:mode',
        value: 'string',
        description: {
          en: 'Selected mode',
        },
      },
    ],
  },
  'v-color-picker-swatches': {
    props: [
      {
        name: 'color',
        type: 'object',
        default: 'undefined',
        source: 'v-color-picker-swatches',
        description: {
          en: '',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'maxHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-color-picker-swatches',
        description: {
          en: '',
        },
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-color-picker-swatches',
        description: {
          en: '',
        },
      },
      {
        name: 'swatches',
        type: 'array',
        default: [
          [
            '#f44336',
            '#b71c1c',
            '#c62828',
            '#d32f2f',
            '#e53935',
            '#ef5350',
            '#e57373',
            '#ef9a9a',
            '#ffcdd2',
            '#ffebee',
          ],
          [
            '#e91e63',
            '#880e4f',
            '#ad1457',
            '#c2185b',
            '#d81b60',
            '#ec407a',
            '#f06292',
            '#f48fb1',
            '#f8bbd0',
            '#fce4ec',
          ],
          [
            '#9c27b0',
            '#4a148c',
            '#6a1b9a',
            '#7b1fa2',
            '#8e24aa',
            '#ab47bc',
            '#ba68c8',
            '#ce93d8',
            '#e1bee7',
            '#f3e5f5',
          ],
          [
            '#673ab7',
            '#311b92',
            '#4527a0',
            '#512da8',
            '#5e35b1',
            '#7e57c2',
            '#9575cd',
            '#b39ddb',
            '#d1c4e9',
            '#ede7f6',
          ],
          [
            '#3f51b5',
            '#1a237e',
            '#283593',
            '#303f9f',
            '#3949ab',
            '#5c6bc0',
            '#7986cb',
            '#9fa8da',
            '#c5cae9',
            '#e8eaf6',
          ],
          [
            '#2196f3',
            '#0d47a1',
            '#1565c0',
            '#1976d2',
            '#1e88e5',
            '#42a5f5',
            '#64b5f6',
            '#90caf9',
            '#bbdefb',
            '#e3f2fd',
          ],
          [
            '#03a9f4',
            '#01579b',
            '#0277bd',
            '#0288d1',
            '#039be5',
            '#29b6f6',
            '#4fc3f7',
            '#81d4fa',
            '#b3e5fc',
            '#e1f5fe',
          ],
          [
            '#00bcd4',
            '#006064',
            '#00838f',
            '#0097a7',
            '#00acc1',
            '#26c6da',
            '#4dd0e1',
            '#80deea',
            '#b2ebf2',
            '#e0f7fa',
          ],
          [
            '#009688',
            '#004d40',
            '#00695c',
            '#00796b',
            '#00897b',
            '#26a69a',
            '#4db6ac',
            '#80cbc4',
            '#b2dfdb',
            '#e0f2f1',
          ],
          [
            '#4caf50',
            '#1b5e20',
            '#2e7d32',
            '#388e3c',
            '#43a047',
            '#66bb6a',
            '#81c784',
            '#a5d6a7',
            '#c8e6c9',
            '#e8f5e9',
          ],
          [
            '#8bc34a',
            '#33691e',
            '#558b2f',
            '#689f38',
            '#7cb342',
            '#9ccc65',
            '#aed581',
            '#c5e1a5',
            '#dcedc8',
            '#f1f8e9',
          ],
          [
            '#cddc39',
            '#827717',
            '#9e9d24',
            '#afb42b',
            '#c0ca33',
            '#d4e157',
            '#dce775',
            '#e6ee9c',
            '#f0f4c3',
            '#f9fbe7',
          ],
          [
            '#ffeb3b',
            '#f57f17',
            '#f9a825',
            '#fbc02d',
            '#fdd835',
            '#ffee58',
            '#fff176',
            '#fff59d',
            '#fff9c4',
            '#fffde7',
          ],
          [
            '#ffc107',
            '#ff6f00',
            '#ff8f00',
            '#ffa000',
            '#ffb300',
            '#ffca28',
            '#ffd54f',
            '#ffe082',
            '#ffecb3',
            '#fff8e1',
          ],
          [
            '#ff9800',
            '#e65100',
            '#ef6c00',
            '#f57c00',
            '#fb8c00',
            '#ffa726',
            '#ffb74d',
            '#ffcc80',
            '#ffe0b2',
            '#fff3e0',
          ],
          [
            '#ff5722',
            '#bf360c',
            '#d84315',
            '#e64a19',
            '#f4511e',
            '#ff7043',
            '#ff8a65',
            '#ffab91',
            '#ffccbc',
            '#fbe9e7',
          ],
          [
            '#795548',
            '#3e2723',
            '#4e342e',
            '#5d4037',
            '#6d4c41',
            '#8d6e63',
            '#a1887f',
            '#bcaaa4',
            '#d7ccc8',
            '#efebe9',
          ],
          [
            '#607d8b',
            '#263238',
            '#37474f',
            '#455a64',
            '#546e7a',
            '#78909c',
            '#90a4ae',
            '#b0bec5',
            '#cfd8dc',
            '#eceff1',
          ],
          [
            '#9e9e9e',
            '#212121',
            '#424242',
            '#616161',
            '#757575',
            '#bdbdbd',
            '#e0e0e0',
            '#eeeeee',
            '#f5f5f5',
            '#fafafa',
          ],
          [
            '#000000',
            '#ffffff',
            'transparent',
          ],
        ],
        source: 'v-color-picker-swatches',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'themeable',
    ],
  },
  'v-color-picker-canvas': {
    props: [
      {
        name: 'color',
        type: 'object',
        default: {
          alpha: 1,
          hex: '#FF0000',
          hexa: '#FF0000FF',
          hsla: {
            h: 0,
            s: 1,
            l: 0.5,
            a: 1,
          },
          hsva: {
            h: 0,
            s: 1,
            v: 1,
            a: 1,
          },
          hue: 0,
          rgba: {
            r: 255,
            g: 0,
            b: 0,
            a: 1,
          },
        },
        source: 'v-color-picker-canvas',
        description: {
          en: '',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'v-color-picker-canvas',
        description: {
          en: '',
        },
      },
      {
        name: 'dotSize',
        type: [
          'number',
          'string',
        ],
        default: 10,
        source: 'v-color-picker-canvas',
        description: {
          en: '',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 150,
        source: 'v-color-picker-canvas',
        description: {
          en: '',
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 300,
        source: 'v-color-picker-canvas',
        description: {
          en: '',
        },
      },
    ],
    mixins: [],
  },
  'v-content': {
    props: [
      {
        name: 'tag',
        type: 'string',
        default: "'main'",
        source: 'v-main',
        description: {
          en: '',
        },
      },
    ],
    mixins: [],
  },
  'v-combobox': {
    props: [
      {
        name: 'allowOverflow',
        type: 'boolean',
        default: 'true',
        source: 'v-autocomplete',
        description: {
          en: 'Allow the menu to overflow off the screen',
        },
      },
      {
        name: 'appendIcon',
        type: 'string',
        default: "'$dropdown'",
        source: 'v-input',
        description: {
          en: 'Appends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'appendOuterIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: "Appends an icon to the outside the component's input, uses same syntax as `v-icon`",
        },
      },
      {
        name: 'attach',
        type: 'any',
        default: false,
        source: 'v-select',
        description: {
          en: 'Mixins.Detachable.props.attach',
        },
      },
      {
        name: 'autoSelectFirst',
        type: 'boolean',
        default: 'false',
        source: 'v-autocomplete',
        description: {
          en: 'When searching, will always highlight the first option',
        },
      },
      {
        name: 'autofocus',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Enables autofocus',
        },
      },
      {
        name: 'backgroundColor',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Changes the background-color of the input',
        },
      },
      {
        name: 'cacheItems',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Keeps a local _unique_ copy of all items that have been passed through the **items** prop.',
        },
      },
      {
        name: 'chips',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Changes display of selections to chips',
        },
      },
      {
        name: 'clearIcon',
        type: 'string',
        default: "'$clear'",
        source: 'v-text-field',
        description: {
          en: 'Applied when using **clearable** and the input is dirty',
        },
      },
      {
        name: 'clearable',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Add input clear functionality, default icon is Material Design Icons **mdi-clear**',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'counter',
        type: [
          'boolean',
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Creates counter for input length; if no number is specified, it defaults to 25. Does not apply any validation.',
        },
      },
      {
        name: 'counterValue',
        type: 'function',
        default: 'null',
        source: 'v-text-field',
        description: {
          en: '',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'deletableChips',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Adds a remove icon to selected chips',
        },
      },
      {
        name: 'delimiters',
        type: 'array',
        default: [],
        source: 'v-combobox',
        description: {
          en: 'Accepts an array of strings that will trigger a new tag when typing. Does not replace the normal Tab and Enter keys.',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Reduces the input height',
        },
      },
      {
        name: 'disableLookup',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Disables keyboard lookup',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Disable the input',
        },
      },
      {
        name: 'eager',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: '',
        },
      },
      {
        name: 'error',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual error state',
        },
      },
      {
        name: 'errorCount',
        type: [
          'number',
          'string',
        ],
        default: 1,
        source: 'validatable',
        description: {
          en: 'The total number of errors that should display at once',
        },
      },
      {
        name: 'errorMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in an error state and passes through custom error messages. Will be combined with any validations that occur from the **rules** prop. This field will not trigger validation',
        },
      },
      {
        name: 'filled',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Applies the alternate filled input style',
        },
      },
      {
        name: 'filter',
        type: 'function',
        default: '(item: object, queryText: string, itemText: string): boolean',
        source: 'v-select',
        description: {
          en: 'The function used for filtering items',
        },
      },
      {
        name: 'flat',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Mixins.Soloable.props.flat',
        },
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Designates input type as full-width',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the height of the input',
        },
      },
      {
        name: 'hideDetails',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display",
        },
      },
      {
        name: 'hideNoData',
        type: 'boolean',
        default: 'false',
        source: 'v-autocomplete',
        description: {
          en: 'Hides the menu when there are no options to show.  Useful for preventing the menu from opening before results are fetched asynchronously.  Also has the effect of opening the menu when the `items` array changes if not already open.',
        },
      },
      {
        name: 'hideSelected',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Do not display in the select menu items that are already selected',
        },
      },
      {
        name: 'hint',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Hint text',
        },
      },
      {
        name: 'id',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the DOM id on the component',
        },
      },
      {
        name: 'itemColor',
        type: 'string',
        default: "'primary'",
        source: 'v-select',
        description: {
          en: 'Sets color of selected items',
        },
      },
      {
        name: 'itemDisabled',
        type: [
          'string',
          'array',
          'function',
        ],
        default: 'disabled',
        source: 'v-select',
        description: {
          en: "Set property of **items**'s disabled value",
        },
      },
      {
        name: 'itemText',
        type: [
          'string',
          'array',
          'function',
        ],
        default: 'text',
        source: 'v-select',
        description: {
          en: "Set property of **items**'s text value",
        },
      },
      {
        name: 'itemValue',
        type: [
          'string',
          'array',
          'function',
        ],
        default: 'value',
        source: 'v-select',
        description: {
          en: "Set property of **items**'s value - **must be primitive**. Dot notation is supported. **Note:** This is currently not supported with `v-combobox` [GitHub Issue](https://github.com/vuetifyjs/vuetify/issues/5479)",
        },
      },
      {
        name: 'items',
        type: 'array',
        default: [],
        source: 'v-select',
        example: {
          text: 'string | number | object',
          value: 'string | number | object',
          disabled: 'boolean',
          divider: 'boolean',
          header: 'string',
        },
        description: {
          en: 'Can be an array of objects or array of strings. When using objects, will look for a text, value and disabled keys. This can be changed using the **item-text**, **item-value** and **item-disabled** props.  Objects that have a **header** or **divider** property are considered special cases and generate a list header or divider; these items are not selectable.',
        },
      },
      {
        name: 'label',
        type: 'string',
        source: 'v-input',
        description: {
          en: 'Sets input label',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'loaderHeight',
        type: [
          'number',
          'string',
        ],
        default: 2,
        source: 'loadable',
        description: {
          en: 'Specifies the height of the loader',
        },
      },
      {
        name: 'loading',
        type: [
          'boolean',
          'string',
        ],
        default: false,
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'menuProps',
        type: [
          'string',
          'array',
          'object',
        ],
        default: '{ "closeOnClick": false, "closeOnContentClick": false, "disableKeys": true, "openOnClick": false, "maxHeight": 304 }',
        source: 'v-select',
        description: {
          en: 'Pass props through to the `v-menu` component. Accepts either a string for boolean props `menu-props="auto, overflowY"`, or an object `:menu-props="{ auto: true, overflowY: true }"`',
        },
      },
      {
        name: 'messages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Displays a list of messages or message if using a string',
        },
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Changes select to multiple. Accepts array for value',
        },
      },
      {
        name: 'noDataText',
        type: 'string',
        default: "'$vuetify.noDataText'",
        source: 'filterable',
        description: {
          en: 'Display text when there is no data',
        },
      },
      {
        name: 'noFilter',
        type: 'boolean',
        default: 'false',
        source: 'v-autocomplete',
        description: {
          en: 'Do not apply filtering when searching. Useful when data is being filtered server side',
        },
      },
      {
        name: 'openOnClear',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'When using the **clearable** prop, once cleared, the select menu will either open or stay open, depending on the current state',
        },
      },
      {
        name: 'outlined',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Applies the outlined style to the input',
        },
      },
      {
        name: 'persistentHint',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Forces hint to always be visible',
        },
      },
      {
        name: 'placeholder',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Sets the input’s placeholder text',
        },
      },
      {
        name: 'prefix',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Displays prefix text',
        },
      },
      {
        name: 'prependIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Prepends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'prependInnerIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: "Prepends an icon inside the component's input, uses the same syntax as `v-icon`",
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Puts input in readonly state',
        },
      },
      {
        name: 'returnObject',
        type: 'boolean',
        default: 'true',
        source: 'v-select',
        description: {
          en: 'Changes the selection behavior to return the object directly rather than the value specified with **item-value**',
        },
      },
      {
        name: 'reverse',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Reverses the input orientation',
        },
      },
      {
        name: 'rounded',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Adds a border radius to the input',
        },
      },
      {
        name: 'rules',
        type: 'array',
        default: [],
        source: 'validatable',
        description: {
          en: 'Accepts an array of functions that take an input value as an argument and return either `true` / `false` or a `string` with an error message',
        },
      },
      {
        name: 'searchInput',
        type: 'string',
        default: 'undefined',
        source: 'v-autocomplete',
        description: {
          en: 'Search value. Can be used with `.sync` modifier.',
        },
      },
      {
        name: 'shaped',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Round if `outlined` and increase `border-radius` if `filled`. Must be used with either `outlined` or `filled`',
        },
      },
      {
        name: 'singleLine',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Label does not move on focus/dirty',
        },
      },
      {
        name: 'smallChips',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Changes display of selections to chips with the **small** property',
        },
      },
      {
        name: 'solo',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Mixins.Soloable.props.solo',
        },
      },
      {
        name: 'soloInverted',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Mixins.Soloable.props.soloInverted',
        },
      },
      {
        name: 'success',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual success state',
        },
      },
      {
        name: 'successMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in a success state and passes through custom success messages.',
        },
      },
      {
        name: 'suffix',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Displays suffix text',
        },
      },
      {
        name: 'type',
        type: 'string',
        default: "'text'",
        source: 'v-text-field',
        description: {
          en: 'Sets input type',
        },
      },
      {
        name: 'validateOnBlur',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Delays validation until blur event',
        },
      },
      {
        name: 'value',
        type: 'any',
        source: 'v-input',
        description: {
          en: "The input's value",
        },
      },
      {
        name: 'valueComparator',
        type: 'function',
        default: '(a: any, b: any): boolean',
        source: 'v-select',
        description: {
          en: 'The comparison algorithm used for values. [More info](https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/util/helpers.ts)',
        },
      },
    ],
    mixins: [
      'v-text-field',
      'v-input',
      'validatable',
      'colorable',
      'registrable-inject',
      'themeable',
      'intersectable',
      'loadable',
      'comparable',
      'filterable',
    ],
    events: [
      {
        name: 'update:error',
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'The `error.sync` event',
        },
      },
      {
        name: 'click',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when input is clicked',
        },
      },
      {
        name: 'mousedown',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is pressed',
        },
      },
      {
        name: 'mouseup',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is released',
        },
      },
      {
        name: 'click:append',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when appended icon is clicked',
        },
      },
      {
        name: 'click:prepend',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when prepended icon is clicked',
        },
      },
      {
        name: 'blur',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when the input is blurred',
        },
      },
      {
        name: 'click:clear',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when clearable icon clicked',
        },
      },
      {
        name: 'click:append-outer',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when appended outer icon is clicked',
        },
      },
      {
        name: 'click:prepend-inner',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when prepended inner icon is clicked',
        },
      },
      {
        name: 'focus',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when component is focused',
        },
      },
      {
        name: 'change',
        source: 'v-text-field',
        value: 'any',
        description: {
          en: 'Emitted when the input is changed by user interaction',
        },
      },
      {
        name: 'input',
        source: 'v-text-field',
        value: 'any',
        description: {
          en: 'The updated bound model',
        },
      },
      {
        name: 'keydown',
        source: 'v-text-field',
        value: 'KeyboardEvent',
        description: {
          en: 'Emitted when **any** key is pressed',
        },
      },
      {
        name: 'update:search-input',
        source: 'v-select',
        value: 'string',
        description: {
          en: 'The `search-input.sync` event',
        },
      },
      {
        name: 'update:list-index',
        source: 'v-select',
        value: 'number',
        description: {
          en: 'Emitted when menu item is selected using keyboard arrows',
        },
      },
    ],
    slots: [
      {
        name: 'append',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'default',
        source: 'v-input',
        description: {
          en: 'The default Vue slot.',
        },
      },
      {
        name: 'prepend',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'label',
        source: 'v-input',
        description: {
          en: 'Replaces the default label',
        },
      },
      {
        name: 'message',
        props: {
          key: 'number, // the messages index',
          message: 'string, // the message',
        },
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'append-outer',
        source: 'v-text-field',
        description: {
          en: 'Adds an item outside the input and after input content',
        },
      },
      {
        name: 'prepend-inner',
        source: 'v-text-field',
        description: {
          en: 'Adds an item inside the input and before input content',
        },
      },
      {
        name: 'progress',
        source: 'v-text-field',
        description: {
          en: 'Slot for custom progress linear (displayed when **loading** prop is not equal to Boolean False)',
        },
      },
      {
        name: 'append-item',
        source: 'v-select',
        description: {
          en: 'Adds an item after menu content',
        },
      },
      {
        name: 'prepend-item',
        source: 'v-select',
        description: {
          en: 'Adds an item before menu content',
        },
      },
      {
        name: 'item',
        props: {
          parent: 'VueComponent',
          item: 'object',
          on: 'object // Only needed when providing your own v-list-item',
          attrs: 'object // Only needed when providing your own v-list-item',
        },
        source: 'v-select',
        description: {
          en: 'Define a custom item appearance',
        },
      },
      {
        name: 'no-data',
        source: 'v-select',
        description: {
          en: '',
        },
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
        description: {
          en: 'Define a custom selection appearance',
        },
      },
    ],
  },
  'v-counter': {
    props: [
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'max',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-counter',
        description: {
          en: '',
        },
      },
      {
        name: 'value',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-counter',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'themeable',
    ],
  },
  'v-data': {
    props: [
      {
        name: 'customFilter',
        type: 'function',
        default: '(items: any[], search: string) => any[]',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'customGroup',
        type: 'function',
        default: '(items: any[], groupBy: string[], groupDesc: boolean[]) => Record<string, any[]>',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'customSort',
        type: 'function',
        default: '(items: any[], sortBy: string[], sortDesc: boolean[], locale: string, customSorters?: Record<string, compareFn>) => any[]',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'disableFiltering',
        type: 'boolean',
        default: 'false',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'disablePagination',
        type: 'boolean',
        default: 'false',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'disableSort',
        type: 'boolean',
        default: 'false',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'groupBy',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'groupDesc',
        type: [
          'boolean',
          'array',
        ],
        default: [],
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'itemKey',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'items',
        type: 'array',
        default: [],
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'itemsPerPage',
        type: 'number',
        default: 10,
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'locale',
        type: 'string',
        default: "'en-US'",
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'multiSort',
        type: 'boolean',
        default: 'false',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'mustSort',
        type: 'boolean',
        default: 'false',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'options',
        type: 'DataOptions',
        default: {},
        source: 'v-data',
        example: {
          page: 'number',
          itemsPerPage: 'number',
          sortBy: 'string[]',
          sortDesc: 'boolean[]',
          groupBy: 'string[]',
          groupDesc: 'boolean[]',
          multiSort: 'boolean',
          mustSort: 'boolean',
        },
        description: {
          en: '',
        },
      },
      {
        name: 'page',
        type: 'number',
        default: 1,
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'search',
        type: 'string',
        default: 'undefined',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'serverItemsLength',
        type: 'number',
        default: -1,
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'sortBy',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'sortDesc',
        type: [
          'boolean',
          'array',
        ],
        default: [],
        source: 'v-data',
        description: {
          en: '',
        },
      },
    ],
    mixins: [],
    events: [
      {
        name: 'current-items',
        source: 'v-data',
        value: 'any[]',
        description: {
          en: '',
        },
      },
      {
        name: 'page-count',
        source: 'v-data',
        value: 'number',
        description: {
          en: '',
        },
      },
      {
        name: 'pagination',
        source: 'v-data',
        value: {
          page: 'number',
          itemsPerPage: 'number',
          pageStart: 'number',
          pageStop: 'number',
          pageCount: 'number',
          itemsLength: 'number',
        },
        description: {
          en: '',
        },
      },
      {
        name: 'update:options',
        source: 'v-data',
        value: {
          page: 'number',
          itemsPerPage: 'number',
          sortBy: 'string[]',
          sortDesc: 'boolean[]',
          groupBy: 'string[]',
          groupDesc: 'boolean[]',
          multiSort: 'boolean',
          mustSort: 'boolean',
        },
        description: {
          en: '',
        },
      },
      {
        name: 'update:page',
        source: 'v-data',
        value: 'number',
        description: {
          en: '',
        },
      },
      {
        name: 'update:items-per-page',
        source: 'v-data',
        value: 'number',
        description: {
          en: '',
        },
      },
      {
        name: 'update:sort-by',
        source: 'v-data',
        value: 'string | string[]',
        description: {
          en: '',
        },
      },
      {
        name: 'update:sort-desc',
        source: 'v-data',
        value: 'boolean | boolean[]',
        description: {
          en: '',
        },
      },
      {
        name: 'update:group-by',
        source: 'v-data',
        value: 'string | string[]',
        description: {
          en: '',
        },
      },
      {
        name: 'update:group-desc',
        source: 'v-data',
        value: 'boolean | boolean[]',
        description: {
          en: '',
        },
      },
      {
        name: 'update:multi-sort',
        source: 'v-data',
        value: 'boolean',
        description: {
          en: '',
        },
      },
      {
        name: 'update:must-sort',
        source: 'v-data',
        value: 'boolean',
        description: {
          en: '',
        },
      },
    ],
    slots: [
      {
        name: 'default',
        props: {
          items: 'any[]',
          pagination: {
            page: 'number',
            itemsPerPage: 'number',
            pageStart: 'number',
            pageStop: 'number',
            pageCount: 'number',
            itemsLength: 'number',
          },
          options: {
            page: 'number',
            itemsPerPage: 'number',
            sortBy: 'string[]',
            sortDesc: 'boolean[]',
            groupBy: 'string[]',
            groupDesc: 'boolean[]',
            multiSort: 'boolean',
            mustSort: 'boolean',
          },
          groupedItems: 'Record<string, any[]>',
          updateOptions: '(obj: any) => void',
          sort: '(value: string) => void',
          group: '(value: string) => void',
        },
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-data-iterator': {
    props: [
      {
        name: 'customFilter',
        type: 'function',
        default: '(items: any[], search: string) => any[]',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'customGroup',
        type: 'function',
        default: '(items: any[], groupBy: string[], groupDesc: boolean[]) => Record<string, any[]>',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'customSort',
        type: 'function',
        default: '(items: any[], sortBy: string[], sortDesc: boolean[], locale: string, customSorters?: Record<string, compareFn>) => any[]',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'disableFiltering',
        type: 'boolean',
        default: 'false',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'disablePagination',
        type: 'boolean',
        default: 'false',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'disableSort',
        type: 'boolean',
        default: 'false',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'expanded',
        type: 'array',
        default: [],
        source: 'v-data-iterator',
        description: {
          en: 'Array of expanded items. Can be used with `.sync` modifier',
        },
      },
      {
        name: 'footerProps',
        type: 'object',
        default: 'undefined',
        source: 'v-data-iterator',
        description: {
          en: 'See the `v-data-footer` API for more information',
        },
      },
      {
        name: 'groupBy',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'groupDesc',
        type: [
          'boolean',
          'array',
        ],
        default: [],
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'hideDefaultFooter',
        type: 'boolean',
        default: 'false',
        source: 'v-data-iterator',
        description: {
          en: 'Hides default footer',
        },
      },
      {
        name: 'itemKey',
        type: 'string',
        default: "'id'",
        source: 'v-data',
        description: {
          en: 'The property on each item that is used as a unique key',
        },
      },
      {
        name: 'items',
        type: 'array',
        default: [],
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'itemsPerPage',
        type: 'number',
        default: 10,
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'loading',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-data-iterator',
        description: {
          en: 'If `true` and no items are provided, then a loading text will be shown',
        },
      },
      {
        name: 'loadingText',
        type: 'string',
        default: "'$vuetify.dataIterator.loadingText'",
        source: 'v-data-iterator',
        description: {
          en: 'Text shown when `loading` is true and no items are provided',
        },
      },
      {
        name: 'locale',
        type: 'string',
        default: "'en-US'",
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'mobileBreakpoint',
        type: [
          'number',
          'string',
        ],
        default: 600,
        source: 'mobile',
        description: {
          en: '',
        },
      },
      {
        name: 'multiSort',
        type: 'boolean',
        default: 'false',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'mustSort',
        type: 'boolean',
        default: 'false',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'noDataText',
        type: 'string',
        default: "'$vuetify.noDataText'",
        source: 'v-data-iterator',
        description: {
          en: 'Text shown when no items are provided to the component',
        },
      },
      {
        name: 'noResultsText',
        type: 'string',
        default: "'$vuetify.dataIterator.noResultsText'",
        source: 'v-data-iterator',
        description: {
          en: 'Text shown when `search` prop is used and there are no results',
        },
      },
      {
        name: 'options',
        type: 'DataOptions',
        default: {},
        source: 'v-data',
        example: {
          page: 'number',
          itemsPerPage: 'number',
          sortBy: 'string[]',
          sortDesc: 'boolean[]',
          groupBy: 'string[]',
          groupDesc: 'boolean[]',
          multiSort: 'boolean',
          mustSort: 'boolean',
        },
        description: {
          en: '',
        },
      },
      {
        name: 'page',
        type: 'number',
        default: 1,
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'search',
        type: 'string',
        default: 'undefined',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'selectableKey',
        type: 'string',
        default: "'isSelectable'",
        source: 'v-data-iterator',
        description: {
          en: 'The property on each item that is used to determine if it is selectable or not',
        },
      },
      {
        name: 'serverItemsLength',
        type: 'number',
        default: -1,
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'singleExpand',
        type: 'boolean',
        default: 'false',
        source: 'v-data-iterator',
        description: {
          en: 'Changes expansion mode to single expand',
        },
      },
      {
        name: 'singleSelect',
        type: 'boolean',
        default: 'false',
        source: 'v-data-iterator',
        description: {
          en: 'Changes selection mode to single select',
        },
      },
      {
        name: 'sortBy',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'sortDesc',
        type: [
          'boolean',
          'array',
        ],
        default: [],
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'value',
        type: 'array',
        default: [],
        source: 'v-data-iterator',
        description: {
          en: 'Used for controlling selected rows',
        },
      },
    ],
    mixins: [
      'mobile',
      'themeable',
    ],
    slots: [
      {
        name: 'loading',
        source: 'data-iterator',
        description: {
          en: 'Defines content for when `loading` is true and no items are provided',
        },
      },
      {
        name: 'no-data',
        source: 'data-iterator',
        description: {
          en: 'Defines content for when no items are provided',
        },
      },
      {
        name: 'no-results',
        source: 'data-iterator',
        description: {
          en: 'Defines content for when `search` is provided but no results are found',
        },
      },
      {
        name: 'default',
        props: {
          items: 'any[]',
          pagination: {
            page: 'number',
            itemsPerPage: 'number',
            pageStart: 'number',
            pageStop: 'number',
            pageCount: 'number',
            itemsLength: 'number',
          },
          options: {
            page: 'number',
            itemsPerPage: 'number',
            sortBy: 'string[]',
            sortDesc: 'boolean[]',
            groupBy: 'string[]',
            groupDesc: 'boolean[]',
            multiSort: 'boolean',
            mustSort: 'boolean',
          },
          groupedItems: 'Record<string, any[]>',
          updateOptions: '(obj: any) => void',
          sort: '(value: string) => void',
          group: '(value: string) => void',
          isSelected: '(item: any) => boolean',
          select: '(item: any, value: boolean) => void',
          isExpanded: '(item: any) => boolean',
          expand: '(item: any, value: boolean) => void',
        },
        source: 'data-iterator',
        description: {
          en: 'The default slot. Use this to render your items',
        },
      },
      {
        name: 'footer',
        props: {
          items: 'any[]',
          pagination: {
            page: 'number',
            itemsPerPage: 'number',
            pageStart: 'number',
            pageStop: 'number',
            pageCount: 'number',
            itemsLength: 'number',
          },
          options: {
            page: 'number',
            itemsPerPage: 'number',
            sortBy: 'string[]',
            sortDesc: 'boolean[]',
            groupBy: 'string[]',
            groupDesc: 'boolean[]',
            multiSort: 'boolean',
            mustSort: 'boolean',
          },
          groupedItems: 'Record<string, any[]>',
          updateOptions: '(obj: any) => void',
          sort: '(value: string) => void',
          group: '(value: string) => void',
        },
        source: 'data-iterator',
        description: {
          en: 'Defines a footer below the items',
        },
      },
      {
        name: 'footer.page-text',
        props: {
          pageStart: 'number',
          pageStop: 'number',
          itemsLength: 'number',
        },
        source: 'data-iterator',
        description: {
          en: 'This slot is forwarded to the default footer. See the `v-data-footer` API for more information',
        },
      },
      {
        name: 'header',
        props: {
          items: 'any[]',
          pagination: {
            page: 'number',
            itemsPerPage: 'number',
            pageStart: 'number',
            pageStop: 'number',
            pageCount: 'number',
            itemsLength: 'number',
          },
          options: {
            page: 'number',
            itemsPerPage: 'number',
            sortBy: 'string[]',
            sortDesc: 'boolean[]',
            groupBy: 'string[]',
            groupDesc: 'boolean[]',
            multiSort: 'boolean',
            mustSort: 'boolean',
          },
          groupedItems: 'Record<string, any[]>',
          updateOptions: '(obj: any) => void',
          sort: '(value: string) => void',
          group: '(value: string) => void',
        },
        source: 'data-iterator',
        description: {
          en: '',
        },
      },
      {
        name: 'item',
        props: {
          expand: '(v: boolean) => void',
          item: 'any',
          isExpanded: 'boolean',
          isMobile: 'boolean',
          isSelected: 'boolean',
          select: '(v: boolean) => void',
        },
        source: 'data-iterator',
        description: {
          en: 'Slot for each item',
        },
      },
    ],
    events: [
      {
        name: 'current-items',
        source: 'v-data',
        value: 'any[]',
        description: {
          en: '',
        },
      },
      {
        name: 'page-count',
        source: 'v-data',
        value: 'number',
        description: {
          en: '',
        },
      },
      {
        name: 'pagination',
        source: 'v-data',
        value: {
          page: 'number',
          itemsPerPage: 'number',
          pageStart: 'number',
          pageStop: 'number',
          pageCount: 'number',
          itemsLength: 'number',
        },
        description: {
          en: '',
        },
      },
      {
        name: 'update:options',
        source: 'v-data',
        value: {
          page: 'number',
          itemsPerPage: 'number',
          sortBy: 'string[]',
          sortDesc: 'boolean[]',
          groupBy: 'string[]',
          groupDesc: 'boolean[]',
          multiSort: 'boolean',
          mustSort: 'boolean',
        },
        description: {
          en: '',
        },
      },
      {
        name: 'update:page',
        source: 'v-data',
        value: 'number',
        description: {
          en: '',
        },
      },
      {
        name: 'update:items-per-page',
        source: 'v-data',
        value: 'number',
        description: {
          en: '',
        },
      },
      {
        name: 'update:sort-by',
        source: 'v-data',
        value: 'string | string[]',
        description: {
          en: '',
        },
      },
      {
        name: 'update:sort-desc',
        source: 'v-data',
        value: 'boolean | boolean[]',
        description: {
          en: '',
        },
      },
      {
        name: 'update:group-by',
        source: 'v-data',
        value: 'string | string[]',
        description: {
          en: '',
        },
      },
      {
        name: 'update:group-desc',
        source: 'v-data',
        value: 'boolean | boolean[]',
        description: {
          en: '',
        },
      },
      {
        name: 'update:multi-sort',
        source: 'v-data',
        value: 'boolean',
        description: {
          en: '',
        },
      },
      {
        name: 'update:must-sort',
        source: 'v-data',
        value: 'boolean',
        description: {
          en: '',
        },
      },
      {
        name: 'input',
        source: 'v-data-iterator',
        value: 'any[]',
        description: {
          en: 'Array of selected items',
        },
      },
      {
        name: 'update:expanded',
        source: 'v-data-iterator',
        value: 'any[]',
        description: {
          en: 'The `.sync` event for `expanded` prop',
        },
      },
      {
        name: 'item-selected',
        source: 'v-data-iterator',
        value: '{ item: any, value: boolean }',
        description: {
          en: 'Event emitted when an item is selected or deselected',
        },
      },
      {
        name: 'item-expanded',
        source: 'v-data-iterator',
        value: '{ item: any, value: boolean }',
        description: {
          en: 'Event emitted when an item is expanded or closed',
        },
      },
      {
        name: 'toggle-select-all',
        source: 'v-data-iterator',
        value: '{ items: any[], value: boolean }',
        description: {
          en: '',
        },
      },
    ],
  },
  'v-data-footer': {
    props: [
      {
        name: 'disableItemsPerPage',
        type: 'boolean',
        default: 'false',
        source: 'v-data-footer',
        description: {
          en: 'Disables items-per-page dropdown',
        },
      },
      {
        name: 'disablePagination',
        type: 'boolean',
        default: 'false',
        source: 'v-data-footer',
        description: {
          en: 'Disables pagination buttons',
        },
      },
      {
        name: 'firstIcon',
        type: 'string',
        default: "'$first'",
        source: 'v-data-footer',
        description: {
          en: 'First icon',
        },
      },
      {
        name: 'itemsPerPageAllText',
        type: 'string',
        default: "'$vuetify.dataFooter.itemsPerPageAll'",
        source: 'v-data-footer',
        description: {
          en: "Text for 'All' option in items-per-page dropdown",
        },
      },
      {
        name: 'itemsPerPageOptions',
        type: 'array',
        default: [
          5,
          10,
          15,
          -1,
        ],
        source: 'v-data-footer',
        description: {
          en: 'Array of options to show in the items-per-page dropdown',
        },
      },
      {
        name: 'itemsPerPageText',
        type: 'string',
        default: "'$vuetify.dataFooter.itemsPerPageText'",
        source: 'v-data-footer',
        description: {
          en: 'Text for items-per-page dropdown',
        },
      },
      {
        name: 'lastIcon',
        type: 'string',
        default: "'$last'",
        source: 'v-data-footer',
        description: {
          en: 'Last icon',
        },
      },
      {
        name: 'nextIcon',
        type: 'string',
        default: "'$next'",
        source: 'v-data-footer',
        description: {
          en: 'Next icon',
        },
      },
      {
        name: 'options',
        type: 'object',
        default: 'undefined',
        source: 'v-data-footer',
        example: {
          page: 'number',
          itemsPerPage: 'number',
          sortBy: 'string[]',
          sortDesc: 'boolean[]',
          groupBy: 'string[]',
          groupDesc: 'boolean[]',
          multiSort: 'boolean',
          mustSort: 'boolean',
        },
        description: {
          en: 'DataOptions',
        },
      },
      {
        name: 'pageText',
        type: 'string',
        default: "'$vuetify.dataFooter.pageText'",
        source: 'v-data-footer',
        description: {
          en: '',
        },
      },
      {
        name: 'pagination',
        type: 'object',
        default: 'undefined',
        source: 'v-data-footer',
        example: {
          page: 'number',
          itemsPerPage: 'number',
          pageStart: 'number',
          pageStop: 'number',
          pageCount: 'number',
          itemsLength: 'number',
        },
        description: {
          en: 'DataPagination',
        },
      },
      {
        name: 'prevIcon',
        type: 'string',
        default: "'$prev'",
        source: 'v-data-footer',
        description: {
          en: 'Previous icon',
        },
      },
      {
        name: 'showCurrentPage',
        type: 'boolean',
        default: 'false',
        source: 'v-data-footer',
        description: {
          en: 'Show current page number between prev/next icons',
        },
      },
      {
        name: 'showFirstLastPage',
        type: 'boolean',
        default: 'false',
        source: 'v-data-footer',
        description: {
          en: 'Show first/last icons',
        },
      },
    ],
    mixins: [],
    slots: [
      {
        name: 'pageText',
        description: {
          en: 'Defines content for the items-per-page text',
        },
      },
      {
        name: 'page-text',
        props: {
          pageStart: 'number',
          pageStop: 'number',
          itemsLength: 'number',
        },
        description: {
          en: '',
        },
      },
    ],
    events: [
      {
        name: 'update:options',
        value: {
          page: 'number',
          itemsPerPage: 'number',
          sortBy: 'string[]',
          sortDesc: 'boolean[]',
          groupBy: 'string[]',
          groupDesc: 'boolean[]',
          multiSort: 'boolean',
          mustSort: 'boolean',
        },
        description: {
          en: 'The `.sync` event for `options` prop',
        },
      },
    ],
  },
  'v-data-table': {
    props: [
      {
        name: 'calculateWidths',
        type: 'boolean',
        default: 'false',
        source: 'v-data-table',
        description: {
          en: 'Enables calculation of column widths. `widths` property will be available in select scoped slots',
        },
      },
      {
        name: 'caption',
        type: 'string',
        default: 'undefined',
        source: 'v-data-table',
        description: {
          en: 'Set the caption (using `<caption>`)',
        },
      },
      {
        name: 'customFilter',
        type: 'function',
        default: '(value: any, search: string | null, item: any) => boolean',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'customGroup',
        type: 'function',
        default: '(items: any[], groupBy: string[], groupDesc: boolean[]) => Record<string, any[]>',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'customSort',
        type: 'function',
        default: '(items: any[], sortBy: string[], sortDesc: boolean[], locale: string, customSorters?: Record<string, compareFn>) => any[]',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-data-table',
        description: {
          en: 'Decreases the height of rows',
        },
      },
      {
        name: 'disableFiltering',
        type: 'boolean',
        default: 'false',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'disablePagination',
        type: 'boolean',
        default: 'false',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'disableSort',
        type: 'boolean',
        default: 'false',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'expandIcon',
        type: 'string',
        default: "'$expand'",
        source: 'v-data-table',
        description: {
          en: 'Icon used for expand toggle button.',
        },
      },
      {
        name: 'expanded',
        type: 'array',
        default: [],
        source: 'v-data-iterator',
        description: {
          en: 'Array of expanded items. Can be used with `.sync` modifier',
        },
      },
      {
        name: 'fixedHeader',
        type: 'boolean',
        default: 'false',
        source: 'v-data-table',
        description: {
          en: 'Fixed header to top of table. **NOTE:** Does not work in IE11',
        },
      },
      {
        name: 'footerProps',
        type: 'object',
        default: 'undefined',
        source: 'v-data-iterator',
        description: {
          en: 'See the `v-data-footer` API for more information',
        },
      },
      {
        name: 'groupBy',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'groupDesc',
        type: [
          'boolean',
          'array',
        ],
        default: [],
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'headerProps',
        type: 'object',
        default: 'undefined',
        source: 'v-data-table',
        description: {
          en: "Pass props to the default header. See 'v-data-table-header' API for more information",
        },
      },
      {
        name: 'headers',
        type: 'TableHeader[]',
        default: [],
        source: 'v-data-table',
        example: {
          text: 'string',
          value: 'string',
          'align?': "'start' | 'center' | 'end'",
          'sortable?': 'boolean',
          'filterable?': 'boolean',
          'groupable?': 'boolean',
          'divider?': 'boolean',
          'class?': 'string | string[]',
          'width?': 'string | number',
          'filter?': '(value: any, search: string, item: any) => boolean',
          'sort?': '(a: any, b: any) => number',
        },
        description: {
          en: 'An array of objects that each describe a header column. See the example below for a definition of all properties',
        },
      },
      {
        name: 'headersLength',
        type: 'number',
        default: 'undefined',
        source: 'v-data-table',
        description: {
          en: 'Can be used in combination with `hide-default-header` to specify the number of columns in the table to allow expansion rows and loading bar to function properly',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-data-table',
        description: {
          en: 'Set an explicit height of table',
        },
      },
      {
        name: 'hideDefaultFooter',
        type: 'boolean',
        default: 'false',
        source: 'v-data-iterator',
        description: {
          en: 'Hides default footer',
        },
      },
      {
        name: 'hideDefaultHeader',
        type: 'boolean',
        default: 'false',
        source: 'v-data-table',
        description: {
          en: 'Hide the default headers',
        },
      },
      {
        name: 'itemClass',
        type: [
          'string',
          'function',
        ],
        default: '',
        source: 'v-data-table',
        description: {
          en: "Property on supplied `items` that contains item's row class or function that takes an item as an argument and returns the class of corresponding row",
        },
      },
      {
        name: 'itemKey',
        type: 'string',
        default: "'id'",
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'items',
        type: 'array',
        default: [],
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'itemsPerPage',
        type: 'number',
        default: 10,
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'loaderHeight',
        type: [
          'number',
          'string',
        ],
        default: 4,
        source: 'loadable',
        description: {
          en: 'Specifies the height of the loader',
        },
      },
      {
        name: 'loading',
        type: [
          'boolean',
          'string',
        ],
        default: false,
        source: 'v-data-iterator',
        description: {
          en: 'If `true` and no items are provided, then a loading text will be shown',
        },
      },
      {
        name: 'loadingText',
        type: 'string',
        default: "'$vuetify.dataIterator.loadingText'",
        source: 'v-data-iterator',
        description: {
          en: 'Text shown when `loading` is true and no items are provided',
        },
      },
      {
        name: 'locale',
        type: 'string',
        default: "'en-US'",
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'mobileBreakpoint',
        type: [
          'number',
          'string',
        ],
        default: 600,
        source: 'mobile',
        description: {
          en: 'Used to set when to toggle between regular table and mobile view',
        },
      },
      {
        name: 'multiSort',
        type: 'boolean',
        default: 'false',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'mustSort',
        type: 'boolean',
        default: 'false',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'noDataText',
        type: 'string',
        default: "'$vuetify.noDataText'",
        source: 'v-data-iterator',
        description: {
          en: 'Text shown when no items are provided to the component',
        },
      },
      {
        name: 'noResultsText',
        type: 'string',
        default: "'$vuetify.dataIterator.noResultsText'",
        source: 'v-data-iterator',
        description: {
          en: 'Text shown when `search` prop is used and there are no results',
        },
      },
      {
        name: 'options',
        type: 'DataOptions',
        default: {},
        source: 'v-data',
        example: {
          page: 'number',
          itemsPerPage: 'number',
          sortBy: 'string[]',
          sortDesc: 'boolean[]',
          groupBy: 'string[]',
          groupDesc: 'boolean[]',
          multiSort: 'boolean',
          mustSort: 'boolean',
        },
        description: {
          en: '',
        },
      },
      {
        name: 'page',
        type: 'number',
        default: 1,
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'search',
        type: 'string',
        default: 'undefined',
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'selectableKey',
        type: 'string',
        default: "'isSelectable'",
        source: 'v-data-iterator',
        description: {
          en: 'The property on each item that is used to determine if it is selectable or not',
        },
      },
      {
        name: 'serverItemsLength',
        type: 'number',
        default: -1,
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'showExpand',
        type: 'boolean',
        default: 'false',
        source: 'v-data-table',
        description: {
          en: 'Shows the expand toggle in default rows',
        },
      },
      {
        name: 'showGroupBy',
        type: 'boolean',
        default: 'false',
        source: 'v-data-table',
        description: {
          en: 'Shows the group by toggle in the header and enables grouped rows',
        },
      },
      {
        name: 'showSelect',
        type: 'boolean',
        default: 'false',
        source: 'v-data-table',
        description: {
          en: 'Shows the select checkboxes in both the header and rows (if using default rows)',
        },
      },
      {
        name: 'singleExpand',
        type: 'boolean',
        default: 'false',
        source: 'v-data-iterator',
        description: {
          en: 'Changes expansion mode to single expand',
        },
      },
      {
        name: 'singleSelect',
        type: 'boolean',
        default: 'false',
        source: 'v-data-iterator',
        description: {
          en: 'Changes selection mode to single select',
        },
      },
      {
        name: 'sortBy',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'sortDesc',
        type: [
          'boolean',
          'array',
        ],
        default: [],
        source: 'v-data',
        description: {
          en: '',
        },
      },
      {
        name: 'value',
        type: 'array',
        default: [],
        source: 'v-data-iterator',
        description: {
          en: 'Used for controlling selected rows',
        },
      },
    ],
    mixins: [
      'v-data-iterator',
      'mobile',
      'themeable',
      'loadable',
    ],
    slots: [
      {
        name: 'body.append',
        props: {
          items: 'any[]',
          pagination: {
            page: 'number',
            itemsPerPage: 'number',
            pageStart: 'number',
            pageStop: 'number',
            pageCount: 'number',
            itemsLength: 'number',
          },
          options: {
            page: 'number',
            itemsPerPage: 'number',
            sortBy: 'string[]',
            sortDesc: 'boolean[]',
            groupBy: 'string[]',
            groupDesc: 'boolean[]',
            multiSort: 'boolean',
            mustSort: 'boolean',
          },
          groupedItems: 'Record<string, any[]>',
          updateOptions: '(obj: any) => void',
          sort: '(value: string) => void',
          group: '(value: string) => void',
          headers: 'TableHeader[]',
          isMobile: 'boolean',
          isSelected: '(item: any) => boolean',
          select: '(item: any, value: boolean) => void',
          isExpanded: '(item: any) => boolean',
          expand: '(item: any, value: boolean) => void',
        },
        description: {
          en: 'Appends elements to the end of the default table `<tbody>`',
        },
      },
      {
        name: 'body.prepend',
        props: {
          items: 'any[]',
          pagination: {
            page: 'number',
            itemsPerPage: 'number',
            pageStart: 'number',
            pageStop: 'number',
            pageCount: 'number',
            itemsLength: 'number',
          },
          options: {
            page: 'number',
            itemsPerPage: 'number',
            sortBy: 'string[]',
            sortDesc: 'boolean[]',
            groupBy: 'string[]',
            groupDesc: 'boolean[]',
            multiSort: 'boolean',
            mustSort: 'boolean',
          },
          groupedItems: 'Record<string, any[]>',
          updateOptions: '(obj: any) => void',
          sort: '(value: string) => void',
          group: '(value: string) => void',
          headers: 'TableHeader[]',
          isMobile: 'boolean',
          isSelected: '(item: any) => boolean',
          select: '(item: any, value: boolean) => void',
          isExpanded: '(item: any) => boolean',
          expand: '(item: any, value: boolean) => void',
        },
        description: {
          en: 'Prepends elements to the start of the default table `<tbody>`',
        },
      },
      {
        name: 'body',
        props: {
          items: 'any[]',
          pagination: {
            page: 'number',
            itemsPerPage: 'number',
            pageStart: 'number',
            pageStop: 'number',
            pageCount: 'number',
            itemsLength: 'number',
          },
          options: {
            page: 'number',
            itemsPerPage: 'number',
            sortBy: 'string[]',
            sortDesc: 'boolean[]',
            groupBy: 'string[]',
            groupDesc: 'boolean[]',
            multiSort: 'boolean',
            mustSort: 'boolean',
          },
          groupedItems: 'Record<string, any[]>',
          updateOptions: '(obj: any) => void',
          sort: '(value: string) => void',
          group: '(value: string) => void',
          headers: 'TableHeader[]',
          isMobile: 'boolean',
          isSelected: '(item: any) => boolean',
          select: '(item: any, value: boolean) => void',
          isExpanded: '(item: any) => boolean',
          expand: '(item: any, value: boolean) => void',
        },
        description: {
          en: 'Slot to replace the default table `<tbody>`',
        },
      },
      {
        name: 'footer',
        props: {
          props: {
            options: {
              page: 'number',
              itemsPerPage: 'number',
              sortBy: 'string[]',
              sortDesc: 'boolean[]',
              groupBy: 'string[]',
              groupDesc: 'boolean[]',
              multiSort: 'boolean',
              mustSort: 'boolean',
            },
            pagination: {
              page: 'number',
              itemsPerPage: 'number',
              pageStart: 'number',
              pageStop: 'number',
              pageCount: 'number',
              itemsLength: 'number',
            },
            itemsPerPageText: 'string',
          },
          on: '{}',
          headers: 'TableHeader[]',
          widths: '[]',
        },
        description: {
          en: 'Slot to add a custom footer',
        },
      },
      {
        name: 'footer.page-text',
        props: {
          pageStart: 'number',
          pageStop: 'number',
          itemsLength: 'number',
        },
        description: {
          en: 'Slot to customize footer page text',
        },
      },
      {
        name: 'header',
        props: {
          props: {
            headers: 'TableHeader[]',
            options: {
              page: 'number',
              itemsPerPage: 'number',
              sortBy: 'string[]',
              sortDesc: 'boolean[]',
              groupBy: 'string[]',
              groupDesc: 'boolean[]',
              multiSort: 'boolean',
              mustSort: 'boolean',
            },
            mobile: 'boolean',
            showGroupBy: 'boolean',
            someItems: 'boolean',
            everyItem: 'boolean',
          },
          on: {
            sort: '(value: string) => void',
            group: '(value: string) => void',
            'toggle-select-all': '(value: boolean) => void',
          },
        },
        description: {
          en: '',
        },
      },
      {
        name: 'header.data-table-select',
        props: {
          props: {
            value: 'boolean',
            indeterminate: 'boolean',
          },
          on: {
            input: '(value: boolean) => void',
          },
        },
        description: {
          en: 'Slot to replace the default `v-simple-checkbox` in header',
        },
      },
      {
        name: 'header.<name>',
        props: {
          header: 'TableHeader',
        },
        description: {
          en: 'Slot to customize a specific header column',
        },
      },
      {
        name: 'top',
        props: {
          items: 'any[]',
          pagination: {
            page: 'number',
            itemsPerPage: 'number',
            pageStart: 'number',
            pageStop: 'number',
            pageCount: 'number',
            itemsLength: 'number',
          },
          options: {
            page: 'number',
            itemsPerPage: 'number',
            sortBy: 'string[]',
            sortDesc: 'boolean[]',
            groupBy: 'string[]',
            groupDesc: 'boolean[]',
            multiSort: 'boolean',
            mustSort: 'boolean',
          },
          groupedItems: 'Record<string, any[]>',
          updateOptions: '(obj: any) => void',
          sort: '(value: string) => void',
          group: '(value: string) => void',
        },
        description: {
          en: 'Slot to add content above the table',
        },
      },
      {
        name: 'progress',
        description: {
          en: 'Slot to replace the default `<v-progress-linear>` component',
        },
      },
      {
        name: 'group',
        props: {
          group: 'string',
          options: {
            page: 'number',
            itemsPerPage: 'number',
            sortBy: 'string[]',
            sortDesc: 'boolean[]',
            groupBy: 'string[]',
            groupDesc: 'boolean[]',
            multiSort: 'boolean',
            mustSort: 'boolean',
          },
          items: 'any[]',
          headers: 'TableHeader[]',
        },
        description: {
          en: 'Slot to replace the default rendering of grouped rows',
        },
      },
      {
        name: 'group.header',
        props: {
          group: 'string',
          groupBy: 'string[]',
          items: 'any[]',
          headers: 'TableHeader[]',
          isOpen: 'boolean',
          toggle: '() => void',
          remove: '() => void',
        },
        description: {
          en: 'Slot to customize the default rendering of group headers',
        },
      },
      {
        name: 'group.summary',
        props: {
          group: 'string',
          groupBy: 'string[]',
          items: 'any[]',
          headers: 'TableHeader[]',
          isOpen: 'boolean',
          toggle: '() => void',
        },
        description: {
          en: 'Slot to customize the default rendering of group summaries',
        },
      },
      {
        name: 'item',
        props: {
          expand: '(v: boolean) => void',
          item: 'any',
          isExpanded: 'boolean',
          isMobile: 'boolean',
          isSelected: 'boolean',
          select: '(v: boolean) => void',
          headers: 'TableHeader[]',
          index: 'number',
        },
        description: {
          en: 'Slot to replace the default rendering of a row',
        },
      },
      {
        name: 'item.data-table-select',
        props: {
          expand: '(v: boolean) => void',
          item: 'any',
          isExpanded: 'boolean',
          isMobile: 'boolean',
          isSelected: 'boolean',
          select: '(v: boolean) => void',
          headers: 'TableHeader[]',
        },
        description: {
          en: 'Slot to replace the default `v-simple-checkbox` used when selecting rows',
        },
      },
      {
        name: 'item.data-table-expand',
        props: {
          expand: '(v: boolean) => void',
          item: 'any',
          isExpanded: 'boolean',
          isMobile: 'boolean',
          isSelected: 'boolean',
          select: '(v: boolean) => void',
          headers: 'TableHeader[]',
        },
        description: {
          en: 'Slot to replace the default `v-icon` used when expanding rows',
        },
      },
      {
        name: 'item.<name>',
        props: {
          item: 'any',
          header: 'TableHeader',
          value: 'any',
        },
        description: {
          en: 'Slot to customize a specific column',
        },
      },
      {
        name: 'expanded-item',
        props: {
          item: 'any',
          headers: 'TableHeader[]',
        },
        description: {
          en: 'Slot to customize expanded rows',
        },
      },
      {
        name: 'loading',
        source: 'data-iterator',
        description: {
          en: 'Defines content for when `loading` is true and no items are provided',
        },
      },
      {
        name: 'no-data',
        source: 'data-iterator',
        description: {
          en: 'Defines content for when no items are provided',
        },
      },
      {
        name: 'no-results',
        source: 'data-iterator',
        description: {
          en: 'Defines content for when `search` is provided but no results are found',
        },
      },
    ],
    events: [
      {
        name: 'click:row',
        source: 'v-data-table',
        value: 'any, {\n  expand: (value: boolean) => void,\n  headers: TableHeader[],\n  isExpanded: boolean,\n  isMobile: boolean,\n  isSelected: boolean,\n  item: any,\n  select: (value: boolean) => void\n}',
        description: {
          en: 'Emits when a table row is clicked. This event provides 2 arguements: the first is the item data that was clicked and the second is the other related data provided by the `item` slot. **NOTE:** will not emit when table rows are defined through a slot such as `item` or `body`.',
        },
      },
      {
        name: 'contextmenu:row',
        source: 'v-data-table',
        value: 'MouseEvent, {\n  expand: (value: boolean) => void,\n  headers: TableHeader[],\n  isExpanded: boolean,\n  isMobile: boolean,\n  isSelected: boolean,\n  item: any,\n  select: (value: boolean) => void\n}',
        description: {
          en: 'Emits when a table row is right-clicked. The item for the row is included. **NOTE:** will not emit when table rows are defined through a slot such as `item` or `body`.',
        },
      },
      {
        name: 'dblclick:row',
        source: 'v-data-table',
        value: 'MouseEvent, {\n  expand: (value: boolean) => void,\n  headers: TableHeader[],\n  isExpanded: boolean,\n  isMobile: boolean,\n  isSelected: boolean,\n  item: any,\n  select: (value: boolean) => void\n}',
        description: {
          en: 'Emits when a table row is double-clicked. The item for the row is included. **NOTE:** will not emit when table rows are defined through a slot such as `item` or `body`.',
        },
      },
      {
        name: 'current-items',
        source: 'v-data',
        value: 'any[]',
        description: {
          en: '',
        },
      },
      {
        name: 'page-count',
        source: 'v-data',
        value: 'number',
        description: {
          en: '',
        },
      },
      {
        name: 'pagination',
        source: 'v-data',
        value: {
          page: 'number',
          itemsPerPage: 'number',
          pageStart: 'number',
          pageStop: 'number',
          pageCount: 'number',
          itemsLength: 'number',
        },
        description: {
          en: '',
        },
      },
      {
        name: 'update:options',
        source: 'v-data',
        value: {
          page: 'number',
          itemsPerPage: 'number',
          sortBy: 'string[]',
          sortDesc: 'boolean[]',
          groupBy: 'string[]',
          groupDesc: 'boolean[]',
          multiSort: 'boolean',
          mustSort: 'boolean',
        },
        description: {
          en: '',
        },
      },
      {
        name: 'update:page',
        source: 'v-data',
        value: 'number',
        description: {
          en: '',
        },
      },
      {
        name: 'update:items-per-page',
        source: 'v-data',
        value: 'number',
        description: {
          en: '',
        },
      },
      {
        name: 'update:sort-by',
        source: 'v-data',
        value: 'string | string[]',
        description: {
          en: '',
        },
      },
      {
        name: 'update:sort-desc',
        source: 'v-data',
        value: 'boolean | boolean[]',
        description: {
          en: '',
        },
      },
      {
        name: 'update:group-by',
        source: 'v-data',
        value: 'string | string[]',
        description: {
          en: '',
        },
      },
      {
        name: 'update:group-desc',
        source: 'v-data',
        value: 'boolean | boolean[]',
        description: {
          en: '',
        },
      },
      {
        name: 'update:multi-sort',
        source: 'v-data',
        value: 'boolean',
        description: {
          en: '',
        },
      },
      {
        name: 'update:must-sort',
        source: 'v-data',
        value: 'boolean',
        description: {
          en: '',
        },
      },
      {
        name: 'input',
        source: 'v-data-iterator',
        value: 'any[]',
        description: {
          en: 'Array of selected items',
        },
      },
      {
        name: 'update:expanded',
        source: 'v-data-iterator',
        value: 'any[]',
        description: {
          en: 'The `.sync` event for `expanded` prop',
        },
      },
      {
        name: 'item-selected',
        source: 'v-data-iterator',
        value: '{ item: any, value: boolean }',
        description: {
          en: 'Event emitted when an item is selected or deselected',
        },
      },
      {
        name: 'item-expanded',
        source: 'v-data-iterator',
        value: '{ item: any, value: boolean }',
        description: {
          en: 'Event emitted when an item is expanded or closed',
        },
      },
      {
        name: 'toggle-select-all',
        source: 'v-data-iterator',
        value: '{ items: any[], value: boolean }',
        description: {
          en: '',
        },
      },
    ],
  },
  'v-edit-dialog': {
    props: [
      {
        name: 'cancelText',
        type: 'any',
        default: 'Cancel',
        source: 'v-edit-dialog',
        description: {
          en: 'Sets the default text for the cancel button when using the **large** prop',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'eager',
        type: 'boolean',
        default: 'false',
        source: 'v-edit-dialog',
        description: {
          en: '',
        },
      },
      {
        name: 'large',
        type: 'boolean',
        default: 'false',
        source: 'v-edit-dialog',
        description: {
          en: 'Attaches a submit and cancel button to the dialog',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'persistent',
        type: 'boolean',
        default: 'false',
        source: 'v-edit-dialog',
        description: {
          en: 'Clicking outside will not dismiss the dialog',
        },
      },
      {
        name: 'returnValue',
        type: 'any',
        default: 'undefined',
        source: 'returnable',
        description: {
          en: '',
        },
      },
      {
        name: 'saveText',
        type: 'any',
        default: 'Save',
        source: 'v-edit-dialog',
        description: {
          en: 'Sets the default text for the save button when using the **large** prop',
        },
      },
      {
        name: 'transition',
        type: 'string',
        default: "'slide-x-reverse-transition'",
        source: 'v-edit-dialog',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'returnable',
      'themeable',
    ],
    slots: [
      {
        name: 'input',
        description: {
          en: 'Slot used to denote input component for v-edit-dialog',
        },
      },
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
    events: [
      {
        name: 'cancel',
        value: 'void',
        description: {
          en: 'Emits when editing is canceled',
        },
      },
      {
        name: 'close',
        value: 'void',
        description: {
          en: 'Emits when edit-dialog close button is pressed',
        },
      },
      {
        name: 'open',
        value: 'void',
        description: {
          en: 'Emits when editing is opened',
        },
      },
      {
        name: 'save',
        value: 'void',
        description: {
          en: 'Emits when edit-dialog save button is pressed',
        },
      },
    ],
  },
  'v-table-overflow': {
    props: [],
    mixins: [],
  },
  'v-data-table-header': {
    props: [
      {
        name: 'disableSort',
        type: 'boolean',
        default: 'false',
        source: 'v-data-table-header',
        description: {
          en: 'Toggles rendering of sort button',
        },
      },
      {
        name: 'everyItem',
        type: 'boolean',
        default: 'false',
        source: 'v-data-table-header',
        description: {
          en: 'Indicates if all items in table are selected',
        },
      },
      {
        name: 'headers',
        type: 'array',
        default: [],
        source: 'v-data-table-header',
        description: {
          en: 'Array of header items to display',
        },
      },
      {
        name: 'mobile',
        type: 'boolean',
        default: 'false',
        source: 'v-data-table-header',
        description: {
          en: 'Renders mobile view of headers',
        },
      },
      {
        name: 'options',
        type: 'object',
        default: {
          page: 1,
          itemsPerPage: 10,
          sortBy: [],
          sortDesc: [],
          groupBy: [],
          groupDesc: [],
          multiSort: false,
          mustSort: false,
        },
        source: 'v-data-table-header',
        description: {
          en: 'Options object. Identical to the one on `v-data-table`',
        },
      },
      {
        name: 'showGroupBy',
        type: 'boolean',
        default: 'false',
        source: 'v-data-table-header',
        description: {
          en: 'Shows group by button',
        },
      },
      {
        name: 'singleSelect',
        type: 'boolean',
        default: 'false',
        source: 'v-data-table-header',
        description: {
          en: 'Toggles rendering of select-all checkbox',
        },
      },
      {
        name: 'someItems',
        type: 'boolean',
        default: 'false',
        source: 'v-data-table-header',
        description: {
          en: 'Indicates if one or more items in table are selected',
        },
      },
      {
        name: 'sortIcon',
        type: 'string',
        default: "'$sort'",
        source: 'v-data-table-header',
        description: {
          en: 'Icon used for sort button',
        },
      },
    ],
    mixins: [],
  },
  'v-simple-table': {
    props: [
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-simple-table',
        description: {
          en: 'Decreases paddings to render a dense table',
        },
      },
      {
        name: 'fixedHeader',
        type: 'boolean',
        default: 'false',
        source: 'v-simple-table',
        description: {
          en: 'Sets table header to fixed mode',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-simple-table',
        description: {
          en: '',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
    ],
    mixins: [
      'themeable',
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-virtual-table': {
    props: [
      {
        name: 'chunkSize',
        type: 'number',
        default: 25,
        source: 'v-virtual-table',
        description: {
          en: '',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-simple-table',
        description: {
          en: 'Decreases paddings to render a dense table',
        },
      },
      {
        name: 'fixedHeader',
        type: 'boolean',
        default: 'false',
        source: 'v-simple-table',
        description: {
          en: 'Sets table header to fixed mode',
        },
      },
      {
        name: 'headerHeight',
        type: 'number',
        default: 48,
        source: 'v-virtual-table',
        description: {
          en: '',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-simple-table',
        description: {
          en: '',
        },
      },
      {
        name: 'items',
        type: 'array',
        default: [],
        source: 'v-virtual-table',
        description: {
          en: '',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'rowHeight',
        type: 'number',
        default: 48,
        source: 'v-virtual-table',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'v-simple-table',
      'themeable',
    ],
  },
  'v-date-picker': {
    props: [
      {
        name: 'allowedDates',
        type: 'function',
        default: 'null',
        source: 'v-date-picker',
        description: {
          en: 'Restricts which dates can be selected',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dayFormat',
        type: 'function',
        default: 'null',
        source: 'v-date-picker',
        description: {
          en: 'Allows you to customize the format of the day string that appears in the date table. Called with date (ISO 8601 **date** string) arguments.',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'v-date-picker',
        description: {
          en: 'Disables interaction with the picker',
        },
      },
      {
        name: 'elevation',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'elevatable',
        description: {
          en: 'Designates an elevation applied to the component between 0 and 24. You can find more information on the [elevation page](/styles/elevation).',
        },
      },
      {
        name: 'eventColor',
        type: [
          'array',
          'function',
          'object',
          'string',
        ],
        default: 'warning',
        source: 'v-date-picker',
        description: {
          en: 'Sets the color for event dot. It can be string (all events will have the same color) or `object` where attribute is the event date and value is boolean/color/array of colors for specified date or `function` taking date as a parameter and returning boolean/color/array of colors for that date',
        },
      },
      {
        name: 'events',
        type: [
          'array',
          'function',
          'object',
        ],
        default: null,
        source: 'v-date-picker',
        description: {
          en: 'Array of dates or object defining events or colors or function returning boolean/color/array of colors',
        },
      },
      {
        name: 'firstDayOfWeek',
        type: [
          'string',
          'number',
        ],
        default: 0,
        source: 'v-date-picker',
        description: {
          en: 'Sets the first day of the week, starting with 0 for Sunday.',
        },
      },
      {
        name: 'flat',
        type: 'boolean',
        default: 'false',
        source: 'picker',
        description: {
          en: 'Removes  elevation',
        },
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        source: 'picker',
        description: {
          en: 'Forces 100% width',
        },
      },
      {
        name: 'headerColor',
        type: 'string',
        default: 'undefined',
        source: 'picker',
        description: {
          en: 'Defines the header color. If not specified it will use the color defined by <code>color</code> prop or the default picker color',
        },
      },
      {
        name: 'headerDateFormat',
        type: 'function',
        default: 'null',
        source: 'v-date-picker',
        description: {
          en: 'Allows you to customize the format of the month string that appears in the header of the calendar. Called with date (ISO 8601 **date** string) arguments.',
        },
      },
      {
        name: 'landscape',
        type: 'boolean',
        default: 'false',
        source: 'picker',
        description: {
          en: 'Orients picker horizontal',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'locale',
        type: 'string',
        default: 'undefined',
        source: 'localable',
        description: {
          en: 'Sets the locale. Accepts a string with a BCP 47 language tag.',
        },
      },
      {
        name: 'localeFirstDayOfYear',
        type: [
          'string',
          'number',
        ],
        default: 0,
        source: 'v-date-picker',
        description: {
          en: 'Sets the day that determines the first week of the year, starting with 0 for **Sunday**. For ISO 8601 this should be 4.',
        },
      },
      {
        name: 'max',
        type: 'string',
        default: 'undefined',
        source: 'v-date-picker',
        description: {
          en: 'Maximum allowed date/month (ISO 8601 format)',
        },
      },
      {
        name: 'min',
        type: 'string',
        default: 'undefined',
        source: 'v-date-picker',
        description: {
          en: 'Minimum allowed date/month (ISO 8601 format)',
        },
      },
      {
        name: 'monthFormat',
        type: 'function',
        default: 'null',
        source: 'v-date-picker',
        description: {
          en: 'Formatting function used for displaying months in the months table. Called with date (ISO 8601 **date** string) arguments.',
        },
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        source: 'v-date-picker',
        description: {
          en: 'Allow the selection of multiple dates',
        },
      },
      {
        name: 'nextIcon',
        type: 'string',
        default: "'$next'",
        source: 'v-date-picker',
        description: {
          en: 'Sets the icon for next month/year button',
        },
      },
      {
        name: 'nextMonthAriaLabel',
        type: 'string',
        default: "'$vuetify.datePicker.nextMonthAriaLabel'",
        source: 'v-date-picker',
        description: {
          en: '',
        },
      },
      {
        name: 'nextYearAriaLabel',
        type: 'string',
        default: "'$vuetify.datePicker.nextYearAriaLabel'",
        source: 'v-date-picker',
        description: {
          en: '',
        },
      },
      {
        name: 'noTitle',
        type: 'boolean',
        default: 'false',
        source: 'picker',
        description: {
          en: 'Hide the picker title',
        },
      },
      {
        name: 'pickerDate',
        type: 'string',
        default: 'undefined',
        source: 'v-date-picker',
        description: {
          en: 'Displayed year/month',
        },
      },
      {
        name: 'prevIcon',
        type: 'string',
        default: "'$prev'",
        source: 'v-date-picker',
        description: {
          en: 'Sets the icon for previous month/year button',
        },
      },
      {
        name: 'prevMonthAriaLabel',
        type: 'string',
        default: "'$vuetify.datePicker.prevMonthAriaLabel'",
        source: 'v-date-picker',
        description: {
          en: '',
        },
      },
      {
        name: 'prevYearAriaLabel',
        type: 'string',
        default: "'$vuetify.datePicker.prevYearAriaLabel'",
        source: 'v-date-picker',
        description: {
          en: '',
        },
      },
      {
        name: 'range',
        type: 'boolean',
        default: 'false',
        source: 'v-date-picker',
        description: {
          en: 'Allow the selection of date range',
        },
      },
      {
        name: 'reactive',
        type: 'boolean',
        default: 'false',
        source: 'v-date-picker',
        description: {
          en: 'Updates the picker model when changing months/years automatically',
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'false',
        source: 'v-date-picker',
        description: {
          en: "Makes the picker readonly (doesn't allow to select new date)",
        },
      },
      {
        name: 'scrollable',
        type: 'boolean',
        default: 'false',
        source: 'v-date-picker',
        description: {
          en: 'Allows changing displayed month with mouse scroll',
        },
      },
      {
        name: 'selectedItemsText',
        type: 'string',
        default: "'$vuetify.datePicker.itemsSelected'",
        source: 'v-date-picker',
        description: {
          en: 'Text used for translating the number of selected dates when using *multiple* prop. Can also be customizing globally in [Internationalization](/customization/internationalization).',
        },
      },
      {
        name: 'showCurrent',
        type: [
          'boolean',
          'string',
        ],
        default: true,
        source: 'v-date-picker',
        description: {
          en: 'Toggles visibility of the current date/month outline or shows the provided date/month as a current',
        },
      },
      {
        name: 'showWeek',
        type: 'boolean',
        default: 'false',
        source: 'v-date-picker',
        description: {
          en: 'Toggles visibility of the week numbers in the body of the calendar',
        },
      },
      {
        name: 'titleDateFormat',
        type: 'function',
        default: 'null',
        source: 'v-date-picker',
        description: {
          en: 'Allows you to customize the format of the date string that appears in the title of the date picker. Called with date (ISO 8601 **date** string) arguments.',
        },
      },
      {
        name: 'type',
        type: 'string',
        default: "'date'",
        source: 'v-date-picker',
        description: {
          en: 'Determines the type of the picker - `date` for date picker, `month` for month picker',
        },
      },
      {
        name: 'value',
        type: [
          'array',
          'string',
        ],
        default: 'undefined',
        source: 'v-date-picker',
        description: {
          en: 'Date picker model (ISO 8601 format, YYYY-mm-dd or YYYY-mm)',
        },
      },
      {
        name: 'weekdayFormat',
        type: 'function',
        default: 'null',
        source: 'v-date-picker',
        description: {
          en: 'Allows you to customize the format of the weekday string that appears in the body of the calendar. Called with date (ISO 8601 **date** string) arguments.',
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 290,
        source: 'picker',
        description: {
          en: 'Width of the picker',
        },
      },
      {
        name: 'yearFormat',
        type: 'function',
        default: 'null',
        source: 'v-date-picker',
        description: {
          en: 'Allows you to customize the format of the year string that appears in the header of the calendar. Called with date (ISO 8601 **date** string) arguments.',
        },
      },
      {
        name: 'yearIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-date-picker',
        description: {
          en: 'Sets the icon in the year selection button',
        },
      },
    ],
    mixins: [
      'localable',
      'picker',
      'colorable',
      'elevatable',
      'themeable',
    ],
    events: [
      {
        name: 'input',
        value: 'string',
        description: {
          en: 'The updated bound model',
        },
      },
      {
        name: 'change',
        value: 'string',
        description: {
          en: 'Reactive date picker emits `input` even when any part of the date (year/month/day) changes, but `change` event is emitted only when the day (for date pickers) or month (for month pickers) changes. If `range` prop is set, date picker emits `change` when both [from, to] are selected.',
        },
      },
      {
        name: 'update:picker-date',
        value: 'string',
        description: {
          en: 'The `.sync` event for `picker-date` prop',
        },
      },
      {
        name: '<domevent>:date',
        value: 'string',
        description: {
          en: 'Emitted when the specified DOM event occurs on the date button',
        },
      },
      {
        name: '<domevent>:month',
        value: 'string',
        description: {
          en: 'Emitted when the specified DOM event occurs on the month button',
        },
      },
      {
        name: '<domevent>:year',
        value: 'number',
        description: {
          en: 'Emitted when the specified DOM event occurs on the year button',
        },
      },
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'Displayed below the calendar, can be used for example for adding action button (`OK` and `Cancel`)',
        },
      },
    ],
  },
  'v-date-picker-title': {
    props: [
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'date',
        type: 'string',
        default: 'undefined',
        source: 'v-date-picker-title',
        description: {
          en: '',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'v-date-picker-title',
        description: {
          en: '',
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'false',
        source: 'v-date-picker-title',
        description: {
          en: '',
        },
      },
      {
        name: 'selectingYear',
        type: 'boolean',
        default: 'false',
        source: 'v-date-picker-title',
        description: {
          en: '',
        },
      },
      {
        name: 'value',
        type: 'string',
        default: 'undefined',
        source: 'v-date-picker-title',
        description: {
          en: '',
        },
      },
      {
        name: 'year',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-date-picker-title',
        description: {
          en: '',
        },
      },
      {
        name: 'yearIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-date-picker-title',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'colorable',
      'colorable',
    ],
  },
  'v-date-picker-header': {
    props: [
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'v-date-picker-header',
        description: {
          en: '',
        },
      },
      {
        name: 'format',
        type: 'function',
        default: 'null',
        source: 'v-date-picker-header',
        description: {
          en: '',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'locale',
        type: 'string',
        default: 'undefined',
        source: 'localable',
        description: {
          en: '',
        },
      },
      {
        name: 'max',
        type: 'string',
        default: 'undefined',
        source: 'v-date-picker-header',
        description: {
          en: '',
        },
      },
      {
        name: 'min',
        type: 'string',
        default: 'undefined',
        source: 'v-date-picker-header',
        description: {
          en: '',
        },
      },
      {
        name: 'nextAriaLabel',
        type: 'string',
        default: 'undefined',
        source: 'v-date-picker-header',
        description: {
          en: '',
        },
      },
      {
        name: 'nextIcon',
        type: 'string',
        default: "'$next'",
        source: 'v-date-picker-header',
        description: {
          en: '',
        },
      },
      {
        name: 'prevAriaLabel',
        type: 'string',
        default: 'undefined',
        source: 'v-date-picker-header',
        description: {
          en: '',
        },
      },
      {
        name: 'prevIcon',
        type: 'string',
        default: "'$prev'",
        source: 'v-date-picker-header',
        description: {
          en: '',
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'false',
        source: 'v-date-picker-header',
        description: {
          en: '',
        },
      },
      {
        name: 'value',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-date-picker-header',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'colorable',
      'localable',
      'themeable',
    ],
  },
  'v-date-picker-date-table': {
    props: [
      {
        name: 'allowedDates',
        type: 'function',
        default: 'null',
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'current',
        type: 'string',
        default: 'undefined',
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'eventColor',
        type: [
          'array',
          'function',
          'object',
          'string',
        ],
        default: 'warning',
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'events',
        type: [
          'array',
          'function',
          'object',
        ],
        default: null,
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'firstDayOfWeek',
        type: [
          'string',
          'number',
        ],
        default: 0,
        source: 'v-date-picker-date-table',
        description: {
          en: '',
        },
      },
      {
        name: 'format',
        type: 'function',
        default: 'null',
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'locale',
        type: 'string',
        default: 'undefined',
        source: 'localable',
        description: {
          en: '',
        },
      },
      {
        name: 'localeFirstDayOfYear',
        type: [
          'string',
          'number',
        ],
        default: 0,
        source: 'v-date-picker-date-table',
        description: {
          en: '',
        },
      },
      {
        name: 'max',
        type: 'string',
        default: 'undefined',
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'min',
        type: 'string',
        default: 'undefined',
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'range',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'scrollable',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'showWeek',
        type: 'boolean',
        default: 'false',
        source: 'v-date-picker-date-table',
        description: {
          en: '',
        },
      },
      {
        name: 'tableDate',
        type: 'string',
        default: 'undefined',
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'value',
        type: [
          'string',
          'array',
        ],
        default: 'undefined',
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'weekdayFormat',
        type: 'function',
        default: 'null',
        source: 'v-date-picker-date-table',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'themeable',
      'colorable',
      'localable',
      'themeable',
    ],
  },
  'v-date-picker-month-table': {
    props: [
      {
        name: 'allowedDates',
        type: 'function',
        default: 'null',
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'current',
        type: 'string',
        default: 'undefined',
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'eventColor',
        type: [
          'array',
          'function',
          'object',
          'string',
        ],
        default: 'warning',
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'events',
        type: [
          'array',
          'function',
          'object',
        ],
        default: null,
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'format',
        type: 'function',
        default: 'null',
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'locale',
        type: 'string',
        default: 'undefined',
        source: 'localable',
        description: {
          en: '',
        },
      },
      {
        name: 'max',
        type: 'string',
        default: 'undefined',
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'min',
        type: 'string',
        default: 'undefined',
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'range',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'scrollable',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'tableDate',
        type: 'string',
        default: 'undefined',
        source: 'themeable',
        description: {
          en: '',
        },
      },
      {
        name: 'value',
        type: [
          'string',
          'array',
        ],
        default: 'undefined',
        source: 'themeable',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'themeable',
      'colorable',
      'localable',
      'themeable',
    ],
  },
  'v-date-picker-years': {
    props: [
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'format',
        type: 'function',
        default: 'null',
        source: 'v-date-picker-years',
        description: {
          en: '',
        },
      },
      {
        name: 'locale',
        type: 'string',
        default: 'undefined',
        source: 'localable',
        description: {
          en: '',
        },
      },
      {
        name: 'max',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-date-picker-years',
        description: {
          en: '',
        },
      },
      {
        name: 'min',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-date-picker-years',
        description: {
          en: '',
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'false',
        source: 'v-date-picker-years',
        description: {
          en: '',
        },
      },
      {
        name: 'value',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-date-picker-years',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'colorable',
      'localable',
    ],
  },
  'v-dialog': {
    props: [
      {
        name: 'activator',
        type: 'any',
        default: 'undefined',
        source: 'activatable',
        description: {
          en: 'Designate a custom activator when the `activator` slot is not used. String can be any valid querySelector and Object can be any valid Node.',
        },
      },
      {
        name: 'attach',
        type: 'any',
        default: false,
        source: 'detachable',
        description: {
          en: 'Specifies which DOM element that this component should detach to. String can be any valid querySelector and Object can be any valid Node. This will attach to the root `v-app` component by default.',
        },
      },
      {
        name: 'closeDelay',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'delayable',
        description: {
          en: 'Milliseconds to wait before closing component.',
        },
      },
      {
        name: 'contentClass',
        type: 'string',
        default: 'undefined',
        source: 'detachable',
        description: {
          en: 'Applies a custom class to the detached element. This is useful because the content is moved to the beginning of the `v-app` component (unless the **attach** prop is provided) and is not targettable by classes passed directly on the component.',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'v-dialog',
        description: {
          en: '',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'activatable',
        description: {
          en: 'Disables the ability to open the component.',
        },
      },
      {
        name: 'eager',
        type: 'boolean',
        default: 'false',
        source: 'bootable',
        description: {
          en: 'Will force the components content to render on mounted. This is useful if you have content that will not be rendered in the DOM that you want crawled for SEO.',
        },
      },
      {
        name: 'fullscreen',
        type: 'boolean',
        default: 'false',
        source: 'v-dialog',
        description: {
          en: 'Changes layout for fullscreen display.',
        },
      },
      {
        name: 'hideOverlay',
        type: 'boolean',
        default: 'false',
        source: 'overlayable',
        description: {
          en: 'Hides the display of the overlay.',
        },
      },
      {
        name: 'internalActivator',
        type: 'boolean',
        default: 'false',
        source: 'activatable',
        description: {
          en: 'Detaches the menu content inside of the component as opposed to the document.',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'v-dialog',
        description: {
          en: '',
        },
      },
      {
        name: 'maxWidth',
        type: [
          'string',
          'number',
        ],
        default: 'none',
        source: 'v-dialog',
        description: {
          en: '',
        },
      },
      {
        name: 'noClickAnimation',
        type: 'boolean',
        default: 'false',
        source: 'v-dialog',
        description: {
          en: "Disables the bounce effect when clicking outside of a `v-dialog`'s content when using the **persistent** prop.",
        },
      },
      {
        name: 'openDelay',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'delayable',
        description: {
          en: 'Milliseconds to wait before opening component.',
        },
      },
      {
        name: 'openOnFocus',
        type: 'boolean',
        default: 'false',
        source: 'activatable',
        description: {
          en: '',
        },
      },
      {
        name: 'openOnHover',
        type: 'boolean',
        default: 'false',
        source: 'activatable',
        description: {
          en: 'Designates whether component should activate when its activator is hovered.',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: "'center center'",
        source: 'v-dialog',
        description: {
          en: '',
        },
      },
      {
        name: 'overlayColor',
        type: 'string',
        default: 'undefined',
        source: 'overlayable',
        description: {
          en: 'Sets the overlay color.',
        },
      },
      {
        name: 'overlayOpacity',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'overlayable',
        description: {
          en: 'Sets the overlay opacity.',
        },
      },
      {
        name: 'persistent',
        type: 'boolean',
        default: 'false',
        source: 'v-dialog',
        description: {
          en: 'Clicking outside of the element will not deactivate it.',
        },
      },
      {
        name: 'retainFocus',
        type: 'boolean',
        default: 'true',
        source: 'v-dialog',
        description: {
          en: 'Tab focus will return to the first child of the dialog by default. Disable this when using external tools that require focus such as TinyMCE or vue-clipboard.',
        },
      },
      {
        name: 'returnValue',
        type: 'any',
        default: 'undefined',
        source: 'returnable',
        description: {
          en: '',
        },
      },
      {
        name: 'scrollable',
        type: 'boolean',
        default: 'false',
        source: 'v-dialog',
        description: {
          en: 'When set to true, expects a `v-card` and a `v-card-text` component with a designated height. For more information, check out the [scrollable example](/components/dialogs#scrollable).',
        },
      },
      {
        name: 'transition',
        type: [
          'string',
          'boolean',
        ],
        default: 'dialog-transition',
        source: 'v-dialog',
        description: {
          en: 'Mixins.Transitionable.props.transition',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'toggleable',
        description: {
          en: 'Controls whether the component is visible or hidden.',
        },
      },
      {
        name: 'width',
        type: [
          'string',
          'number',
        ],
        default: 'auto',
        source: 'v-dialog',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'activatable',
      'delayable',
      'toggleable',
      'dependent',
      'detachable',
      'bootable',
      'overlayable',
      'returnable',
      'stackable',
      'toggleable',
    ],
    slots: [
      {
        name: 'activator',
        props: {
          on: '{ [eventName]: eventHandler }',
          value: 'boolean',
        },
        description: {
          en: 'When used, will activate the component when clicked (or hover for specific components). This manually stops the event propagation. Without this slot, if you open the component through its model, you will need to manually stop the event propagation',
        },
      },
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
    events: [
      {
        name: 'click:outside',
        value: 'MouseEvent',
        description: {
          en: 'Event that fires when clicking outside an active dialog.',
        },
      },
      {
        name: 'input',
        value: 'Boolean',
        description: {
          en: 'The updated bound model',
        },
      },
      {
        name: 'keydown',
        value: 'KeyboardEvent',
        description: {
          en: 'Event that fires when key is pressed. If dialog is active and not using the **persistent** prop, the **esc** key will deactivate it.',
        },
      },
    ],
  },
  'v-divider': {
    props: [
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'inset',
        type: 'boolean',
        default: 'false',
        source: 'v-divider',
        description: {
          en: 'Adds indentation (72px) for **normal** dividers, reduces max height for **vertical**.',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'vertical',
        type: 'boolean',
        default: 'false',
        source: 'v-divider',
        description: {
          en: 'Displays dividers vertically',
        },
      },
    ],
    mixins: [],
  },
  'v-expansion-panels': {
    props: [
      {
        name: 'accordion',
        type: 'boolean',
        default: 'false',
        source: 'v-expansion-panels',
        description: {
          en: 'Removes the margin around open panels',
        },
      },
      {
        name: 'activeClass',
        type: 'string',
        default: "'v-item--active'",
        source: 'base-item-group',
        description: {
          en: 'The **active-class** applied to children when they are activated.',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'v-expansion-panels',
        description: {
          en: 'Disables the entire expansion-panel',
        },
      },
      {
        name: 'flat',
        type: 'boolean',
        default: 'false',
        source: 'v-expansion-panels',
        description: {
          en: "Removes the expansion-panel's elevation and borders",
        },
      },
      {
        name: 'focusable',
        type: 'boolean',
        default: 'false',
        source: 'v-expansion-panels',
        description: {
          en: 'Makes the expansion-panel headers focusable',
        },
      },
      {
        name: 'hover',
        type: 'boolean',
        default: 'false',
        source: 'v-expansion-panels',
        description: {
          en: 'Applies a background-color shift on hover to expansion panel headers',
        },
      },
      {
        name: 'inset',
        type: 'boolean',
        default: 'false',
        source: 'v-expansion-panels',
        description: {
          en: 'Makes the expansion-panel open with a inset style',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'mandatory',
        type: 'boolean',
        default: 'false',
        source: 'base-item-group',
        description: {
          en: 'Forces a value to always be selected (if available).',
        },
      },
      {
        name: 'max',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'base-item-group',
        description: {
          en: 'Sets a maximum number of selections that can be made.',
        },
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        source: 'base-item-group',
        description: {
          en: 'Allow multiple selections. The **value** prop must be an _array_.',
        },
      },
      {
        name: 'popout',
        type: 'boolean',
        default: 'false',
        source: 'v-expansion-panels',
        description: {
          en: 'Makes the expansion-panel open with an popout style',
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'false',
        source: 'v-expansion-panels',
        description: {
          en: 'Makes the entire expansion-panel read only.',
        },
      },
      {
        name: 'tile',
        type: 'boolean',
        default: 'false',
        source: 'v-expansion-panels',
        description: {
          en: 'Removes the border-radius',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'proxyable',
        description: {
          en: 'Controls the opened/closed state of content in the expansion-panel. Corresponds to a zero-based index of the currently opened content. If the `multiple` prop (previously `expand` in 1.5.x) is used then it is an array of numbers where each entry corresponds to the index of the opened content.  The index order is not relevant.',
        },
      },
    ],
    mixins: [
      'proxyable',
      'themeable',
    ],
  },
  'v-expansion-panel': {
    props: [
      {
        name: 'activeClass',
        type: 'string',
        source: 'groupable',
        description: {
          en: 'Mixins.Routable.props.activeClass',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'groupable',
        description: {
          en: 'Disables the expansion-panel content',
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'false',
        source: 'v-expansion-panel',
        description: {
          en: 'Makes the expansion-panel content read only.',
        },
      },
    ],
    mixins: [
      'groupable',
      'registrable-provide',
    ],
    events: [
      {
        name: 'change',
        value: 'void',
        description: {
          en: 'Toggles the value of the selected panel',
        },
      },
      {
        name: 'click',
        value: 'MouseEvent',
        description: {
          en: 'Mouse click event',
        },
      },
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-expansion-panel-header': {
    props: [
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'disableIconRotate',
        type: 'boolean',
        default: 'false',
        source: 'v-expansion-panel-header',
        description: {
          en: 'Removes the icon rotation animation when expanding a panel',
        },
      },
      {
        name: 'expandIcon',
        type: 'string',
        default: "'$expand'",
        source: 'v-expansion-panel-header',
        description: {
          en: 'Set the expand action icon',
        },
      },
      {
        name: 'hideActions',
        type: 'boolean',
        default: 'false',
        source: 'v-expansion-panel-header',
        description: {
          en: 'Hide the expand icon in the content header',
        },
      },
      {
        name: 'ripple',
        type: [
          'boolean',
          'object',
        ],
        default: false,
        source: 'v-expansion-panel-header',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'colorable',
      'registrable-inject',
    ],
    slots: [
      {
        name: 'actions',
        description: {
          en: 'Expansion header actions',
        },
      },
      {
        name: 'default',
        props: {
          open: 'boolean',
        },
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
    events: [
      {
        name: 'click',
        value: 'MouseEvent',
        description: {
          en: 'Mouse click event',
        },
      },
    ],
  },
  'v-expansion-panel-content': {
    props: [
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'eager',
        type: 'boolean',
        default: 'false',
        source: 'bootable',
        description: {
          en: 'Will force the components content to render on mounted. This is useful if you have content that will not be rendered in the DOM that you want crawled for SEO.',
        },
      },
    ],
    mixins: [
      'bootable',
      'colorable',
      'registrable-inject',
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-file-input': {
    props: [
      {
        name: 'appendIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Appends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'appendOuterIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: "Appends an icon to the outside the component's input, uses same syntax as `v-icon`",
        },
      },
      {
        name: 'autofocus',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Enables autofocus',
        },
      },
      {
        name: 'backgroundColor',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Changes the background-color of the input',
        },
      },
      {
        name: 'chips',
        type: 'boolean',
        default: 'false',
        source: 'v-file-input',
        description: {
          en: '',
        },
      },
      {
        name: 'clearIcon',
        type: 'string',
        default: "'$clear'",
        source: 'v-text-field',
        description: {
          en: 'Applied when using **clearable** and the input is dirty',
        },
      },
      {
        name: 'clearable',
        type: 'boolean',
        default: 'true',
        source: 'v-text-field',
        description: {
          en: 'Add input clear functionality, default icon is Material Design Icons **mdi-clear**',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'counter',
        type: [
          'boolean',
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Creates counter for input length; if no number is specified, it defaults to 25. Does not apply any validation.',
        },
      },
      {
        name: 'counterSizeString',
        type: 'string',
        default: "'$vuetify.fileInput.counterSize'",
        source: 'v-file-input',
        description: {
          en: 'The text displayed when using the **counter** and **show-size** props. Can also be customized globally on the [internationalization page](/customization/internationalization).',
        },
      },
      {
        name: 'counterString',
        type: 'string',
        default: "'$vuetify.fileInput.counter'",
        source: 'v-file-input',
        description: {
          en: 'The text displayed when using the **counter** prop. Can also be customized globally on the [internationalization page](/customization/internationalization).',
        },
      },
      {
        name: 'counterValue',
        type: 'function',
        default: 'null',
        source: 'v-text-field',
        description: {
          en: '',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Reduces the input height',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Disable the input',
        },
      },
      {
        name: 'error',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual error state',
        },
      },
      {
        name: 'errorCount',
        type: [
          'number',
          'string',
        ],
        default: 1,
        source: 'validatable',
        description: {
          en: 'The total number of errors that should display at once',
        },
      },
      {
        name: 'errorMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in an error state and passes through custom error messages. Will be combined with any validations that occur from the **rules** prop. This field will not trigger validation',
        },
      },
      {
        name: 'filled',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Applies the alternate filled input style',
        },
      },
      {
        name: 'flat',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Mixins.Soloable.props.flat',
        },
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Designates input type as full-width',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the height of the input',
        },
      },
      {
        name: 'hideDetails',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display",
        },
      },
      {
        name: 'hideInput',
        type: 'boolean',
        default: 'false',
        source: 'v-file-input',
        description: {
          en: 'Display the icon only without the input (file names)',
        },
      },
      {
        name: 'hint',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Hint text',
        },
      },
      {
        name: 'id',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the DOM id on the component',
        },
      },
      {
        name: 'label',
        type: 'string',
        source: 'v-input',
        description: {
          en: 'Sets input label',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'loaderHeight',
        type: [
          'number',
          'string',
        ],
        default: 2,
        source: 'loadable',
        description: {
          en: 'Specifies the height of the loader',
        },
      },
      {
        name: 'loading',
        type: [
          'boolean',
          'string',
        ],
        default: false,
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'messages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Displays a list of messages or message if using a string',
        },
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        source: 'v-file-input',
        description: {
          en: 'Adds the **multiple** attribute to the input, allowing multiple file selections.',
        },
      },
      {
        name: 'outlined',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Applies the outlined style to the input',
        },
      },
      {
        name: 'persistentHint',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Forces hint to always be visible',
        },
      },
      {
        name: 'placeholder',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Sets the input’s placeholder text',
        },
      },
      {
        name: 'prefix',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Displays prefix text',
        },
      },
      {
        name: 'prependIcon',
        type: 'string',
        default: "'$file'",
        source: 'v-input',
        description: {
          en: 'Prepends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'prependInnerIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: "Prepends an icon inside the component's input, uses the same syntax as `v-icon`",
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Puts input in readonly state',
        },
      },
      {
        name: 'reverse',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Reverses the input orientation',
        },
      },
      {
        name: 'rounded',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Adds a border radius to the input',
        },
      },
      {
        name: 'rules',
        type: 'array',
        default: [],
        source: 'validatable',
        description: {
          en: 'Accepts an array of functions that take an input value as an argument and return either `true` / `false` or a `string` with an error message',
        },
      },
      {
        name: 'shaped',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Round if `outlined` and increase `border-radius` if `filled`. Must be used with either `outlined` or `filled`',
        },
      },
      {
        name: 'showSize',
        type: [
          'boolean',
          'number',
        ],
        default: false,
        source: 'v-file-input',
        description: {
          en: 'Sets the displayed size of selected file(s). When using **true** will default to _1000_ displaying (**kB, MB, GB**) while _1024_ will display (**KiB, MiB, GiB**).',
        },
      },
      {
        name: 'singleLine',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Label does not move on focus/dirty',
        },
      },
      {
        name: 'smallChips',
        type: 'boolean',
        default: 'false',
        source: 'v-file-input',
        description: {
          en: 'Components.Selects.props.smallChips',
        },
      },
      {
        name: 'solo',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Mixins.Soloable.props.solo',
        },
      },
      {
        name: 'soloInverted',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Mixins.Soloable.props.soloInverted',
        },
      },
      {
        name: 'success',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual success state',
        },
      },
      {
        name: 'successMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in a success state and passes through custom success messages.',
        },
      },
      {
        name: 'suffix',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Displays suffix text',
        },
      },
      {
        name: 'truncateLength',
        type: [
          'number',
          'string',
        ],
        default: 22,
        source: 'v-file-input',
        description: {
          en: 'The length of a filename before it is truncated with ellipsis',
        },
      },
      {
        name: 'type',
        type: 'string',
        default: "'file'",
        source: 'v-text-field',
        description: {
          en: 'Sets input type',
        },
      },
      {
        name: 'validateOnBlur',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Delays validation until blur event',
        },
      },
      {
        name: 'value',
        type: 'any',
        source: 'v-input',
        description: {
          en: 'A single or array of [File objects](https://developer.mozilla.org/en-US/docs/Web/API/File).',
        },
      },
    ],
    mixins: [
      'v-input',
      'validatable',
      'colorable',
      'registrable-inject',
      'themeable',
      'intersectable',
      'loadable',
    ],
    events: [
      {
        name: 'update:error',
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'The `error.sync` event',
        },
      },
      {
        name: 'click',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when input is clicked',
        },
      },
      {
        name: 'mousedown',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is pressed',
        },
      },
      {
        name: 'mouseup',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is released',
        },
      },
      {
        name: 'click:append',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when appended icon is clicked',
        },
      },
      {
        name: 'click:prepend',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when prepended icon is clicked',
        },
      },
      {
        name: 'blur',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when the input is blurred',
        },
      },
      {
        name: 'click:clear',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when clearable icon clicked',
        },
      },
      {
        name: 'click:append-outer',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when appended outer icon is clicked',
        },
      },
      {
        name: 'click:prepend-inner',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when prepended inner icon is clicked',
        },
      },
      {
        name: 'focus',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when component is focused',
        },
      },
      {
        name: 'change',
        source: 'v-text-field',
        value: 'File[]',
        description: {
          en: 'Emitted when the input is changed by user interaction',
        },
      },
      {
        name: 'input',
        source: 'v-text-field',
        value: 'any',
        description: {
          en: 'The updated bound model',
        },
      },
      {
        name: 'keydown',
        source: 'v-text-field',
        value: 'KeyboardEvent',
        description: {
          en: 'Emitted when **any** key is pressed',
        },
      },
    ],
    slots: [
      {
        name: 'append',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'default',
        source: 'v-input',
        description: {
          en: 'The default Vue slot.',
        },
      },
      {
        name: 'prepend',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'label',
        source: 'v-input',
        description: {
          en: 'Replaces the default label',
        },
      },
      {
        name: 'message',
        props: {
          key: 'number, // the messages index',
          message: 'string, // the message',
        },
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'append-outer',
        source: 'v-text-field',
        description: {
          en: 'Adds an item outside the input and after input content',
        },
      },
      {
        name: 'prepend-inner',
        source: 'v-text-field',
        description: {
          en: 'Adds an item inside the input and before input content',
        },
      },
      {
        name: 'progress',
        source: 'v-text-field',
        description: {
          en: 'Slot for custom progress linear (displayed when **loading** prop is not equal to Boolean False)',
        },
      },
      {
        name: 'selection',
        props: {
          file: 'File',
          index: 'number',
          multiple: 'boolean',
          text: 'string',
        },
        source: 'v-file-input',
        description: {
          en: 'Slot for defining a custom appearance for selected item(s). Provides the current **index**, **text** (truncated) and [file](https://developer.mozilla.org/en-US/docs/Web/API/File).',
        },
      },
    ],
  },
  'v-footer': {
    props: [
      {
        name: 'absolute',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Applies **position: absolute** to the component.',
        },
      },
      {
        name: 'app',
        type: 'boolean',
        default: 'false',
        source: 'applicationable',
        description: {
          en: 'Designates the component as part of the application layout. Used for dynamically adjusting content sizing. Components using this prop should reside **outside** of `v-main` component to function properly. You can more information about layouts on the [application page](/components/application). **Note:** this prop automatically applies **position: fixed** to the layout element. You can overwrite this functionality by using the `absolute` prop',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'elevation',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'elevatable',
        description: {
          en: 'Designates an elevation applied to the component between 0 and 24. You can find more information on the [elevation page](/styles/elevation).',
        },
      },
      {
        name: 'fixed',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Applies **position: fixed** to the component.',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'auto',
        source: 'measurable',
        description: {
          en: 'Sets the height for the component.',
        },
      },
      {
        name: 'inset',
        type: 'boolean',
        default: 'false',
        source: 'v-footer',
        description: {
          en: 'Positions the toolbar offset from an application `v-navigation-drawer`',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'maxHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum height for the component.',
        },
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum width for the component.',
        },
      },
      {
        name: 'minHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum height for the component.',
        },
      },
      {
        name: 'minWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum width for the component.',
        },
      },
      {
        name: 'outlined',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
        description: {
          en: 'Removes elevation (box-shadow) and adds a *thin* border.',
        },
      },
      {
        name: 'padless',
        type: 'boolean',
        default: 'false',
        source: 'v-footer',
        description: {
          en: 'Remove all padding from the footer',
        },
      },
      {
        name: 'rounded',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'roundable',
        description: {
          en: 'Designates the **border-radius** applied to the component. You can find more information on the [Border Radius page](/styles/border-radius).',
        },
      },
      {
        name: 'shaped',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
        description: {
          en: 'Applies a large border radius on the top left and bottom right of the card.',
        },
      },
      {
        name: 'tag',
        type: 'string',
        default: "'footer'",
        source: 'v-sheet',
        description: {
          en: 'Specify a custom tag used on the root element.',
        },
      },
      {
        name: 'tile',
        type: 'boolean',
        default: 'false',
        source: 'roundable',
        description: {
          en: "Removes the component's **border-radius**.",
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the width for the component.',
        },
      },
    ],
    mixins: [
      'v-sheet',
      'colorable',
      'elevatable',
      'measurable',
      'roundable',
      'themeable',
      'applicationable',
      'positionable',
      'ssr-bootable',
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-form': {
    props: [
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'v-form',
        description: {
          en: 'Puts all children inputs into a disabled state.',
        },
      },
      {
        name: 'lazyValidation',
        type: 'boolean',
        default: 'false',
        source: 'v-form',
        description: {
          en: 'If enabled, **value** will always be _true_ unless there are visible validation errors. You can still call `validate()` to manually trigger validation',
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'false',
        source: 'v-form',
        description: {
          en: 'Puts all children inputs into a readonly state.',
        },
      },
      {
        name: 'value',
        type: 'boolean',
        default: 'false',
        source: 'v-form',
        description: {
          en: 'A boolean value representing the validity of the form.',
        },
      },
    ],
    mixins: [
      'registrable-provide',
    ],
    functions: [
      {
        name: 'reset',
        signature: '(): void',
        description: {
          en: 'Resets the state of all registered inputs (inside the form) to **{}** for arrays and **null** for all other values. Resets errors bag when using the **lazy-validation** prop.',
        },
      },
      {
        name: 'resetValidation',
        signature: '(): void',
        description: {
          en: 'Resets validation of all registered inputs without modifying their state',
        },
      },
      {
        name: 'validate',
        signature: '(): boolean',
        description: {
          en: 'Validates all registered inputs. Returns **true** if successful and **false** if not',
        },
      },
    ],
    events: [
      {
        name: 'input',
        value: 'boolean',
        description: {
          en: 'The updated bound model',
        },
      },
      {
        name: 'submit',
        value: 'event',
        description: {
          en: 'Emitted when form is submitted',
        },
      },
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-container': {
    props: [
      {
        name: 'fluid',
        type: 'boolean',
        default: 'false',
        source: 'v-container',
        description: {
          en: 'Removes viewport maximum-width size breakpoints',
        },
      },
      {
        name: 'id',
        type: 'string',
        default: 'undefined',
        source: 'v-container',
        description: {
          en: 'Sets the DOM id on the component',
        },
      },
      {
        name: 'tag',
        type: 'string',
        default: "'div'",
        source: 'v-container',
        description: {
          en: '',
        },
      },
    ],
    mixins: [],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-col': {
    props: [
      {
        name: 'alignSelf',
        type: 'string',
        default: 'undefined',
        source: 'v-col',
        description: {
          en: 'Applies the [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) css property. Available options are **start**, **center**, **end**, **auto**, **baseline** and **stretch**.',
        },
      },
      {
        name: 'cols',
        type: [
          'boolean',
          'string',
          'number',
        ],
        default: false,
        source: 'v-col',
        description: {
          en: 'Sets the default number of columns the component extends. Available options are **1 -> 12** and **auto**.',
        },
      },
      {
        name: 'lg',
        type: [
          'boolean',
          'string',
          'number',
        ],
        default: false,
        source: 'v-col',
        description: {
          en: 'Changes the number of columns on large and greater breakpoints.',
        },
      },
      {
        name: 'md',
        type: [
          'boolean',
          'string',
          'number',
        ],
        default: false,
        source: 'v-col',
        description: {
          en: 'Changes the number of columns on medium and greater breakpoints.',
        },
      },
      {
        name: 'offset',
        type: [
          'string',
          'number',
        ],
        default: 'undefined',
        source: 'v-col',
        description: {
          en: 'Sets the default offset for the column.',
        },
      },
      {
        name: 'offsetLg',
        type: [
          'string',
          'number',
        ],
        default: 'undefined',
        source: 'v-col',
        description: {
          en: 'Changes the offset of the component on large and greater breakpoints.',
        },
      },
      {
        name: 'offsetMd',
        type: [
          'string',
          'number',
        ],
        default: 'undefined',
        source: 'v-col',
        description: {
          en: 'Changes the offset of the component on medium and greater breakpoints.',
        },
      },
      {
        name: 'offsetSm',
        type: [
          'string',
          'number',
        ],
        default: 'undefined',
        source: 'v-col',
        description: {
          en: 'Changes the offset of the component on small and greater breakpoints.',
        },
      },
      {
        name: 'offsetXl',
        type: [
          'string',
          'number',
        ],
        default: 'undefined',
        source: 'v-col',
        description: {
          en: 'Changes the offset of the component on extra large and greater breakpoints.',
        },
      },
      {
        name: 'order',
        type: [
          'string',
          'number',
        ],
        default: 'undefined',
        source: 'v-col',
        description: {
          en: 'Sets the default [order](https://developer.mozilla.org/en-US/docs/Web/CSS/order) for the column.',
        },
      },
      {
        name: 'orderLg',
        type: [
          'string',
          'number',
        ],
        default: 'undefined',
        source: 'v-col',
        description: {
          en: 'Changes the order of the component on large and greater breakpoints.',
        },
      },
      {
        name: 'orderMd',
        type: [
          'string',
          'number',
        ],
        default: 'undefined',
        source: 'v-col',
        description: {
          en: 'Changes the order of the component on medium and greater breakpoints.',
        },
      },
      {
        name: 'orderSm',
        type: [
          'string',
          'number',
        ],
        default: 'undefined',
        source: 'v-col',
        description: {
          en: 'Changes the order of the component on small and greater breakpoints.',
        },
      },
      {
        name: 'orderXl',
        type: [
          'string',
          'number',
        ],
        default: 'undefined',
        source: 'v-col',
        description: {
          en: 'Changes the order of the component on extra large and greater breakpoints.',
        },
      },
      {
        name: 'sm',
        type: [
          'boolean',
          'string',
          'number',
        ],
        default: false,
        source: 'v-col',
        description: {
          en: 'Changes the number of columns on small and greater breakpoints.',
        },
      },
      {
        name: 'tag',
        type: 'string',
        default: "'div'",
        source: 'v-col',
        description: {
          en: '',
        },
      },
      {
        name: 'xl',
        type: [
          'boolean',
          'string',
          'number',
        ],
        default: false,
        source: 'v-col',
        description: {
          en: 'Changes the number of columns on extra large and greater breakpoints.',
        },
      },
    ],
    mixins: [],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-row': {
    props: [
      {
        name: 'align',
        type: 'string',
        default: 'undefined',
        source: 'v-row',
        description: {
          en: 'Applies the [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) css property. Available options are **start**, **center**, **end**, **baseline** and **stretch**.',
        },
      },
      {
        name: 'alignContent',
        type: 'string',
        default: 'undefined',
        source: 'v-row',
        description: {
          en: 'Applies the [align-content](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content) css property. Available options are **start**, **center**, **end**, **space-between**, **space-around** and **stretch**.',
        },
      },
      {
        name: 'alignContentLg',
        type: 'string',
        default: 'undefined',
        source: 'v-row',
        description: {
          en: 'Changes the **align-content** property on large and greater breakpoints.',
        },
      },
      {
        name: 'alignContentMd',
        type: 'string',
        default: 'undefined',
        source: 'v-row',
        description: {
          en: 'Changes the **align-content** property on medium and greater breakpoints.',
        },
      },
      {
        name: 'alignContentSm',
        type: 'string',
        default: 'undefined',
        source: 'v-row',
        description: {
          en: 'Changes the **align-content** property on small and greater breakpoints.',
        },
      },
      {
        name: 'alignContentXl',
        type: 'string',
        default: 'undefined',
        source: 'v-row',
        description: {
          en: 'Changes the **align-content** property on extra large and greater breakpoints.',
        },
      },
      {
        name: 'alignLg',
        type: 'string',
        default: 'undefined',
        source: 'v-row',
        description: {
          en: 'Changes the **align-items** property on large and greater breakpoints.',
        },
      },
      {
        name: 'alignMd',
        type: 'string',
        default: 'undefined',
        source: 'v-row',
        description: {
          en: 'Changes the **align-items** property on medium and greater breakpoints.',
        },
      },
      {
        name: 'alignSm',
        type: 'string',
        default: 'undefined',
        source: 'v-row',
        description: {
          en: 'Changes the **align-items** property on small and greater breakpoints.',
        },
      },
      {
        name: 'alignXl',
        type: 'string',
        default: 'undefined',
        source: 'v-row',
        description: {
          en: 'Changes the **align-items** property on extra large and greater breakpoints.',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-row',
        description: {
          en: 'Reduces the gutter between `v-col`s.',
        },
      },
      {
        name: 'justify',
        type: 'string',
        default: 'undefined',
        source: 'v-row',
        description: {
          en: 'Applies the [justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) css property. Available options are **start**, **center**, **end**, **space-between** and **space-around**.',
        },
      },
      {
        name: 'justifyLg',
        type: 'string',
        default: 'undefined',
        source: 'v-row',
        description: {
          en: 'Changes the **justify-content** property on large and greater breakpoints.',
        },
      },
      {
        name: 'justifyMd',
        type: 'string',
        default: 'undefined',
        source: 'v-row',
        description: {
          en: 'Changes the **justify-content** property on medium and greater breakpoints.',
        },
      },
      {
        name: 'justifySm',
        type: 'string',
        default: 'undefined',
        source: 'v-row',
        description: {
          en: 'Changes the **justify-content** property on small and greater breakpoints.',
        },
      },
      {
        name: 'justifyXl',
        type: 'string',
        default: 'undefined',
        source: 'v-row',
        description: {
          en: 'Changes the **justify-content** property on extra large and greater breakpoints.',
        },
      },
      {
        name: 'noGutters',
        type: 'boolean',
        default: 'false',
        source: 'v-row',
        description: {
          en: 'Removes the gutter between `v-col`s.',
        },
      },
      {
        name: 'tag',
        type: 'string',
        default: "'div'",
        source: 'v-row',
        description: {
          en: '',
        },
      },
    ],
    mixins: [],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-spacer': {
    props: [],
    mixins: [],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-layout': {
    props: [
      {
        name: 'alignBaseline',
        default: 'false',
        source: null,
        type: 'Boolean',
        description: {
          en: '',
        },
      },
      {
        name: 'alignCenter',
        default: 'false',
        source: null,
        type: 'Boolean',
        description: {
          en: '',
        },
      },
      {
        name: 'alignContentCenter',
        default: 'false',
        source: null,
        type: 'Boolean',
        description: {
          en: '',
        },
      },
      {
        name: 'alignContentEnd',
        default: 'false',
        source: null,
        type: 'Boolean',
        description: {
          en: '',
        },
      },
      {
        name: 'alignContentSpaceAround',
        default: 'false',
        source: null,
        type: 'Boolean',
        description: {
          en: '',
        },
      },
      {
        name: 'alignContentSpaceBetween',
        default: 'false',
        source: null,
        type: 'Boolean',
        description: {
          en: '',
        },
      },
      {
        name: 'alignContentStart',
        default: 'false',
        source: null,
        type: 'Boolean',
        description: {
          en: '',
        },
      },
      {
        name: 'alignEnd',
        default: 'false',
        source: null,
        type: 'Boolean',
        description: {
          en: '',
        },
      },
      {
        name: 'alignStart',
        default: 'false',
        source: null,
        type: 'Boolean',
        description: {
          en: '',
        },
      },
      {
        name: 'column',
        type: 'boolean',
        default: 'false',
        source: null,
        description: {
          en: '',
        },
      },
      {
        name: 'd-{type}',
        default: 'false',
        source: null,
        type: 'Boolean',
        description: {
          en: '',
        },
      },
      {
        name: 'fillHeight',
        default: 'false',
        source: null,
        type: 'Boolean',
        description: {
          en: '',
        },
      },
      {
        name: 'id',
        type: 'string',
        default: 'undefined',
        source: 'v-layout',
        description: {
          en: 'Sets the DOM id on the component',
        },
      },
      {
        name: 'justifyCenter',
        default: 'false',
        source: null,
        type: 'Boolean',
        description: {
          en: '',
        },
      },
      {
        name: 'justifyEnd',
        default: 'false',
        source: null,
        type: 'Boolean',
        description: {
          en: '',
        },
      },
      {
        name: 'justifySpaceAround',
        default: 'false',
        source: null,
        type: 'Boolean',
        description: {
          en: '',
        },
      },
      {
        name: 'justifySpaceBetween',
        default: 'false',
        source: null,
        type: 'Boolean',
        description: {
          en: '',
        },
      },
      {
        name: 'justifyStart',
        default: 'false',
        source: null,
        type: 'Boolean',
        description: {
          en: '',
        },
      },
      {
        name: 'reverse',
        type: 'boolean',
        default: 'false',
        source: null,
        description: {
          en: '',
        },
      },
      {
        name: 'row',
        type: 'boolean',
        default: 'true',
        source: null,
        description: {
          en: '',
        },
      },
      {
        name: 'tag',
        type: 'String',
        default: 'div',
        source: null,
        description: {
          en: '',
        },
      },
      {
        name: 'wrap',
        type: 'boolean',
        default: 'false',
        source: null,
        description: {
          en: '',
        },
      },
    ],
    mixins: [],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-flex': {
    props: [
      {
        name: '(size)(1-12)',
        type: 'boolean',
        default: 'false',
        source: null,
        description: {
          en: '',
        },
      },
      {
        name: 'alignSelfBaseline',
        type: 'boolean',
        default: 'false',
        source: null,
        description: {
          en: '',
        },
      },
      {
        name: 'alignSelfCenter',
        type: 'boolean',
        default: 'false',
        source: null,
        description: {
          en: '',
        },
      },
      {
        name: 'alignSelfEnd',
        type: 'boolean',
        default: 'false',
        source: null,
        description: {
          en: '',
        },
      },
      {
        name: 'alignSelfStart',
        type: 'boolean',
        default: 'false',
        source: null,
        description: {
          en: '',
        },
      },
      {
        name: 'grow',
        type: 'boolean',
        default: 'false',
        source: null,
        description: {
          en: '',
        },
      },
      {
        name: 'id',
        type: 'string',
        default: 'undefined',
        source: 'v-flex',
        description: {
          en: 'Sets the DOM id on the component',
        },
      },
      {
        name: 'offset-(size)(0-12)',
        type: 'boolean',
        default: 'false',
        source: null,
        description: {
          en: '',
        },
      },
      {
        name: 'order-(size)(1-12)',
        type: 'boolean',
        default: 'false',
        source: null,
        description: {
          en: '',
        },
      },
      {
        name: 'shrink',
        type: 'boolean',
        default: 'false',
        source: null,
        description: {
          en: '',
        },
      },
      {
        name: 'tag',
        type: 'string',
        default: "'div'",
        source: 'v-flex',
        description: {
          en: '',
        },
      },
    ],
    mixins: [],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-hover': {
    props: [
      {
        name: 'closeDelay',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'delayable',
        description: {
          en: 'Milliseconds to wait before closing component.',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'v-hover',
        description: {
          en: 'Turns off hover functionality',
        },
      },
      {
        name: 'openDelay',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'delayable',
        description: {
          en: 'Milliseconds to wait before opening component.',
        },
      },
      {
        name: 'value',
        type: 'boolean',
        default: 'false',
        source: 'toggleable',
        description: {
          en: 'Controls whether the component is visible or hidden.',
        },
      },
    ],
    mixins: [
      'delayable',
      'toggleable',
    ],
    slots: [
      {
        name: 'default',
        props: {
          hover: 'boolean',
        },
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-icon': {
    props: [
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: null,
        description: {
          en: 'Makes icon smaller (20px)',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'v-icon',
        description: {
          en: '',
        },
      },
      {
        name: 'large',
        type: 'boolean',
        default: 'false',
        source: 'sizeable',
        description: {
          en: 'Makes the component large.',
        },
      },
      {
        name: 'left',
        type: 'boolean',
        default: 'false',
        source: 'v-icon',
        description: {
          en: 'Places the icon on the left, when used inside a button',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'right',
        type: 'boolean',
        default: 'false',
        source: 'v-icon',
        description: {
          en: 'Places the icon on the right, when used inside a button',
        },
      },
      {
        name: 'size',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-icon',
        description: {
          en: 'Specifies a custom font size for the icon.',
        },
      },
      {
        name: 'small',
        type: 'boolean',
        default: 'false',
        source: 'sizeable',
        description: {
          en: 'Makes the component small.',
        },
      },
      {
        name: 'tag',
        type: 'string',
        default: "'i'",
        source: 'v-icon',
        description: {
          en: 'Specifies a custom tag to be used',
        },
      },
      {
        name: 'xLarge',
        type: 'boolean',
        default: 'false',
        source: 'sizeable',
        description: {
          en: 'Makes the component extra large.',
        },
      },
      {
        name: 'xSmall',
        type: 'boolean',
        default: 'false',
        source: 'sizeable',
        description: {
          en: 'Makes the component extra small.',
        },
      },
    ],
    mixins: [
      'colorable',
      'sizeable',
      'themeable',
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-img': {
    props: [
      {
        name: 'alt',
        type: 'string',
        default: 'undefined',
        source: 'v-img',
        description: {
          en: 'Alternate text for screen readers. Leave empty for decorative images',
        },
      },
      {
        name: 'aspectRatio',
        type: [
          'string',
          'number',
        ],
        default: 'undefined',
        source: 'v-responsive',
        description: {
          en: 'Calculated as `width/height`, so for a 1920x1080px image this will be `1.7778`. Will be calculated automatically if omitted',
        },
      },
      {
        name: 'contain',
        type: 'boolean',
        default: 'false',
        source: 'v-img',
        description: {
          en: "Prevents the image from being cropped if it doesn't fit",
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'eager',
        type: 'boolean',
        default: 'false',
        source: 'v-img',
        description: {
          en: '',
        },
      },
      {
        name: 'gradient',
        type: 'string',
        default: 'undefined',
        source: 'v-img',
        description: {
          en: 'Overlays a gradient onto the image. Only supports [linear-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient) syntax, anything else should be done with classes (see examples)',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the height for the component.',
        },
      },
      {
        name: 'lazySrc',
        type: 'string',
        default: 'undefined',
        source: 'v-img',
        description: {
          en: 'Something to show while waiting for the main image to load, typically a small base64-encoded thumbnail. Has a slight blur filter applied.\n\nUse [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader) to generate automatically',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'maxHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum height for the component.',
        },
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum width for the component.',
        },
      },
      {
        name: 'minHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum height for the component.',
        },
      },
      {
        name: 'minWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum width for the component.',
        },
      },
      {
        name: 'options',
        type: 'object',
        default: {},
        source: 'v-img',
        description: {
          en: '',
        },
      },
      {
        name: 'position',
        type: 'string',
        default: "'center center'",
        source: 'v-img',
        description: {
          en: 'Overrides the default to change which parts get cropped off. Uses the same syntax as [`background-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position)',
        },
      },
      {
        name: 'sizes',
        type: 'string',
        default: 'undefined',
        source: 'v-img',
        description: {
          en: 'For use with `srcset`, see [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes)',
        },
      },
      {
        name: 'src',
        type: [
          'string',
          'object',
        ],
        default: 'undefined',
        source: 'v-img',
        description: {
          en: 'The image URL. This prop is mandatory',
        },
      },
      {
        name: 'srcset',
        type: 'string',
        default: 'undefined',
        source: 'v-img',
        description: {
          en: 'A set of alternate images to use based on device size. [Read more...](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset)',
        },
      },
      {
        name: 'transition',
        type: [
          'boolean',
          'string',
        ],
        default: 'fade-transition',
        source: 'v-img',
        description: {
          en: 'The transition to use when switching from `lazy-src` to `src`',
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the width for the component.',
        },
      },
    ],
    mixins: [
      'v-responsive',
      'measurable',
      'themeable',
    ],
    slots: [
      {
        name: 'placeholder',
        description: {
          en: 'Slot for image placeholder',
        },
      },
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
    events: [
      {
        name: 'error',
        value: 'object | string',
        description: {
          en: 'Emitted when there is an error',
        },
      },
      {
        name: 'load',
        value: 'object | string',
        description: {
          en: 'Emitted when image is loaded',
        },
      },
    ],
  },
  'v-input': {
    props: [
      {
        name: 'appendIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Appends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'backgroundColor',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Changes the background-color of the input',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: "Applies the dark theme variant to the component. This will default the components color to _white_ unless you've configured your [application theme](/customization/theme) to **dark** or if you are using the **color** prop on the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).",
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Reduces the input height',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Disable the input',
        },
      },
      {
        name: 'error',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual error state',
        },
      },
      {
        name: 'errorCount',
        type: [
          'number',
          'string',
        ],
        default: 1,
        source: 'validatable',
        description: {
          en: 'The total number of errors that should display at once',
        },
      },
      {
        name: 'errorMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in an error state and passes through custom error messages. Will be combined with any validations that occur from the **rules** prop. This field will not trigger validation',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the height of the input',
        },
      },
      {
        name: 'hideDetails',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display",
        },
      },
      {
        name: 'hint',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Hint text',
        },
      },
      {
        name: 'id',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the DOM id on the component',
        },
      },
      {
        name: 'label',
        type: 'string',
        source: 'v-input',
        description: {
          en: 'Sets input label',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'messages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Displays a list of messages or message if using a string',
        },
      },
      {
        name: 'persistentHint',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Forces hint to always be visible',
        },
      },
      {
        name: 'prependIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Prepends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Puts input in readonly state',
        },
      },
      {
        name: 'rules',
        type: 'array',
        default: [],
        source: 'validatable',
        description: {
          en: 'Accepts an array of functions that take an input value as an argument and return either `true` / `false` or a `string` with an error message',
        },
      },
      {
        name: 'success',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual success state',
        },
      },
      {
        name: 'successMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in a success state and passes through custom success messages.',
        },
      },
      {
        name: 'validateOnBlur',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Delays validation until blur event',
        },
      },
      {
        name: 'value',
        type: 'any',
        source: 'v-input',
        description: {
          en: "The input's value",
        },
      },
    ],
    mixins: [
      'validatable',
      'colorable',
      'registrable-inject',
      'themeable',
    ],
    events: [
      {
        name: 'update:error',
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'The `error.sync` event',
        },
      },
      {
        name: 'change',
        value: 'any',
        description: {
          en: '',
        },
      },
      {
        name: 'mousedown',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is pressed',
        },
      },
      {
        name: 'mouseup',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is released',
        },
      },
      {
        name: 'click:append',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when appended icon is clicked',
        },
      },
      {
        name: 'click:prepend',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when prepended icon is clicked',
        },
      },
    ],
    slots: [
      {
        name: 'append',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'default',
        source: 'v-input',
        description: {
          en: 'The default Vue slot.',
        },
      },
      {
        name: 'prepend',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'label',
        source: 'v-input',
        description: {
          en: 'Replaces the default label',
        },
      },
      {
        name: 'message',
        props: {
          key: 'number, // the messages index',
          message: 'string, // the message',
        },
        source: 'v-input',
        description: {
          en: '',
        },
      },
    ],
  },
  'v-item': {
    props: [
      {
        name: 'activeClass',
        type: 'string',
        source: 'groupable',
        description: {
          en: 'Mixins.Routable.props.activeClass',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'groupable',
        description: {
          en: 'Mixins.Routable.props.disabled',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'groupable',
        description: {
          en: 'The value used when the component is selected in a group. If not provided, the index will be used.',
        },
      },
    ],
    mixins: [
      'groupable',
    ],
    slots: [
      {
        name: 'default',
        props: {
          active: 'boolean',
          toggle: 'Function',
        },
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-item-group': {
    props: [
      {
        name: 'activeClass',
        type: 'string',
        default: "'v-item--active'",
        source: 'base-item-group',
        description: {
          en: 'The **active-class** applied to children when they are activated.',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'mandatory',
        type: 'boolean',
        default: 'false',
        source: 'base-item-group',
        description: {
          en: 'Forces a value to always be selected (if available).',
        },
      },
      {
        name: 'max',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'base-item-group',
        description: {
          en: 'Sets a maximum number of selections that can be made.',
        },
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        source: 'base-item-group',
        description: {
          en: 'Allow multiple selections. The **value** prop must be an _array_.',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'proxyable',
        description: {
          en: 'The designated model value for the component.',
        },
      },
    ],
    mixins: [
      'proxyable',
      'themeable',
    ],
    events: [
      {
        name: 'change',
        value: 'any[] | any',
        description: {
          en: 'Emitted when the component value is changed by user interaction',
        },
      },
    ],
  },
  'v-lazy': {
    props: [
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the height for the component.',
        },
      },
      {
        name: 'maxHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum height for the component.',
        },
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum width for the component.',
        },
      },
      {
        name: 'minHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum height for the component.',
        },
      },
      {
        name: 'minWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum width for the component.',
        },
      },
      {
        name: 'options',
        type: 'object',
        default: {},
        source: 'v-lazy',
        description: {
          en: 'Options that are passed to the [Intersection observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) constructor.',
        },
      },
      {
        name: 'tag',
        type: 'string',
        default: "'div'",
        source: 'v-lazy',
        description: {
          en: '',
        },
      },
      {
        name: 'transition',
        type: 'string',
        default: "'fade-transition'",
        source: 'v-lazy',
        description: {
          en: '',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'toggleable',
        description: {
          en: 'Controls whether the component is visible or hidden.',
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the width for the component.',
        },
      },
    ],
    mixins: [
      'measurable',
      'toggleable',
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-list-item-action-text': {
    props: [],
    mixins: [],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-list-item-content': {
    props: [],
    mixins: [],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-list-item-title': {
    props: [],
    mixins: [],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-list-item-subtitle': {
    props: [],
    mixins: [],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-list': {
    props: [
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-list',
        description: {
          en: 'Lowers max height of list tiles',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'v-list',
        description: {
          en: 'Disables all children `v-list-item` components',
        },
      },
      {
        name: 'elevation',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'elevatable',
        description: {
          en: 'Designates an elevation applied to the component between 0 and 24. You can find more information on the [elevation page](/styles/elevation).',
        },
      },
      {
        name: 'expand',
        type: 'boolean',
        default: 'false',
        source: 'v-list',
        description: {
          en: 'Will only collapse when explicitly closed',
        },
      },
      {
        name: 'flat',
        type: 'boolean',
        default: 'false',
        source: 'v-list',
        description: {
          en: 'Remove the highlighted background on active `v-list-item`s',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the height for the component.',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'maxHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum height for the component.',
        },
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum width for the component.',
        },
      },
      {
        name: 'minHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum height for the component.',
        },
      },
      {
        name: 'minWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum width for the component.',
        },
      },
      {
        name: 'nav',
        type: 'boolean',
        default: 'false',
        source: 'v-list',
        description: {
          en: 'An alternative styling that reduces `v-list-item` width and rounds the corners. Typically used with **[v-navigation-drawer](/components/navigation-drawers)**',
        },
      },
      {
        name: 'outlined',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
        description: {
          en: 'Removes elevation (box-shadow) and adds a *thin* border.',
        },
      },
      {
        name: 'rounded',
        type: 'boolean',
        default: 'false',
        source: 'roundable',
        description: {
          en: 'Rounds the `v-list-item` edges',
        },
      },
      {
        name: 'shaped',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
        description: {
          en: 'Provides an alternative active style for `v-list-item`.',
        },
      },
      {
        name: 'subheader',
        type: 'boolean',
        default: 'false',
        source: 'v-list',
        description: {
          en: 'Removes top padding. Used when previous sibling is a header',
        },
      },
      {
        name: 'tag',
        type: 'string',
        default: "'div'",
        source: 'v-sheet',
        description: {
          en: 'Specify a custom tag used on the root element.',
        },
      },
      {
        name: 'threeLine',
        type: 'boolean',
        default: 'false',
        source: 'v-list',
        description: {
          en: 'Increases list-item height for three lines. This prop uses [line-clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp) and is not supported in all browsers.',
        },
      },
      {
        name: 'tile',
        type: 'boolean',
        default: 'false',
        source: 'roundable',
        description: {
          en: "Removes the component's **border-radius**.",
        },
      },
      {
        name: 'twoLine',
        type: 'boolean',
        default: 'false',
        source: 'v-list',
        description: {
          en: 'Increases list-item height for two lines. This prop uses [line-clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp) and is not supported in all browsers.',
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the width for the component.',
        },
      },
    ],
    mixins: [
      'colorable',
      'elevatable',
      'measurable',
      'roundable',
      'themeable',
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-list-group': {
    props: [
      {
        name: 'activeClass',
        type: 'string',
        default: 'undefined',
        source: 'v-list-group',
        description: {
          en: '',
        },
      },
      {
        name: 'appendIcon',
        type: 'string',
        default: "'$expand'",
        source: 'v-list-group',
        description: {
          en: '',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: "'primary'",
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'v-list-group',
        description: {
          en: '',
        },
      },
      {
        name: 'eager',
        type: 'boolean',
        default: 'false',
        source: 'bootable',
        description: {
          en: 'Will force the components content to render on mounted. This is useful if you have content that will not be rendered in the DOM that you want crawled for SEO.',
        },
      },
      {
        name: 'group',
        type: 'string',
        default: 'undefined',
        source: 'v-list-group',
        description: {
          en: '',
        },
      },
      {
        name: 'noAction',
        type: 'boolean',
        default: 'false',
        source: 'v-list-group',
        description: {
          en: '',
        },
      },
      {
        name: 'prependIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-list-group',
        description: {
          en: '',
        },
      },
      {
        name: 'ripple',
        type: [
          'boolean',
          'object',
        ],
        default: true,
        source: 'v-list-group',
        description: {
          en: '',
        },
      },
      {
        name: 'subGroup',
        type: 'boolean',
        default: 'false',
        source: 'v-list-group',
        description: {
          en: '',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'toggleable',
        description: {
          en: 'Controls whether the component is visible or hidden.',
        },
      },
    ],
    mixins: [
      'bootable',
      'colorable',
      'registrable-inject',
      'toggleable',
    ],
    slots: [
      {
        name: 'activator',
        description: {
          en: 'When used, will activate the component when clicked (or hover for specific components). This manually stops the event propagation. Without this slot, if you open the component through its model, you will need to manually stop the event propagation',
        },
      },
      {
        name: 'appendIcon',
        description: {
          en: '',
        },
      },
      {
        name: 'prependIcon',
        description: {
          en: '',
        },
      },
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
    events: [
      {
        name: 'click',
        value: 'MouseEvent',
        description: {
          en: 'Event that is emitted when the component is clicked',
        },
      },
    ],
  },
  'v-list-item': {
    props: [
      {
        name: 'activeClass',
        type: 'string',
        default: '',
        source: 'routable',
        description: {
          en: 'Configure the active CSS class applied when the link is active. You can find more information about the [**active-class** prop](https://router.vuejs.org/api/#active-class) on the vue-router documentation.',
        },
      },
      {
        name: 'append',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Setting **append** prop always appends the relative path to the current path. You can find more information about the [**append** prop](https://router.vuejs.org/api/#append) on the vue-router documentation.',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control when in an **active** state or **input-value** is **true** - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`)',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-list-item',
        description: {
          en: '',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Disables the component',
        },
      },
      {
        name: 'exact',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: "Exactly match the link. Without this, '/' will match every route. You can find more information about the [**exact** prop](https://router.vuejs.org/api/#exact) on the vue-router documentation.",
        },
      },
      {
        name: 'exactActiveClass',
        type: 'string',
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Configure the active CSS class applied when the link is active with exact match. You can find more information about the [**exact-active-class** prop](https://router.vuejs.org/api/#exact-active-class) on the vue-router documentation.',
        },
      },
      {
        name: 'href',
        type: [
          'string',
          'object',
        ],
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Designates the component as anchor and applies the **href** attribute.',
        },
      },
      {
        name: 'inactive',
        type: 'boolean',
        default: 'false',
        source: 'v-list-item',
        description: {
          en: '',
        },
      },
      {
        name: 'inputValue',
        type: 'any',
        default: 'undefined',
        source: 'toggleable',
        description: {
          en: 'Controls the **active** state of the item. This is typically used to highlight the component',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'link',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Designates that the component is a link. This is automatic when using the **href** or **to** prop.',
        },
      },
      {
        name: 'nuxt',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Specifies the link is a `nuxt-link`. For use with the [nuxt framework](https://nuxtjs.org/api/components-nuxt-link/).',
        },
      },
      {
        name: 'replace',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Setting **replace** prop will call `router.replace()` instead of `router.push()` when clicked, so the navigation will not leave a history record. You can find more information about the [**replace** prop](https://router.vuejs.org/api/#replace) on the vue-router documentation.',
        },
      },
      {
        name: 'ripple',
        type: [
          'boolean',
          'object',
        ],
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Mixins.Rippleable.props.ripple',
        },
      },
      {
        name: 'selectable',
        type: 'boolean',
        default: 'false',
        source: 'v-list-item',
        description: {
          en: 'Allow text selection inside `v-list-item`. This prop uses [user-select](https://developer.mozilla.org/en-US/docs/Web/CSS/user-select)',
        },
      },
      {
        name: 'tag',
        type: 'string',
        default: "'div'",
        source: 'routable',
        description: {
          en: 'Components.Sheets.props.tag',
        },
      },
      {
        name: 'target',
        type: 'string',
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Designates the target attribute. This should only be applied when using the **href** prop.',
        },
      },
      {
        name: 'threeLine',
        type: 'boolean',
        default: 'false',
        source: 'v-list-item',
        description: {
          en: '',
        },
      },
      {
        name: 'to',
        type: [
          'string',
          'object',
        ],
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Denotes the target route of the link. You can find more information about the [**to** prop](https://router.vuejs.org/api/#to) on the vue-router documentation.',
        },
      },
      {
        name: 'twoLine',
        type: 'boolean',
        default: 'false',
        source: 'v-list-item',
        description: {
          en: '',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'v-list-item',
        description: {
          en: 'The value used when a child of a [v-list-item-group](/components/list-item-groups).',
        },
      },
    ],
    mixins: [
      'colorable',
      'routable',
      'themeable',
      'groupable',
      'toggleable',
    ],
    slots: [
      {
        name: 'default',
        props: [
          {
            name: 'active',
            value: 'boolean',
          },
          {
            name: 'toggle',
            value: 'boolean',
          },
        ],
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
    events: [
      {
        name: 'click',
        value: 'MouseEvent | KeyboardEvent',
        description: {
          en: 'Event that is emitted when the component is clicked',
        },
      },
      {
        name: 'keydown',
        value: 'KeyboardEvent',
        description: {
          en: '',
        },
      },
    ],
  },
  'v-list-item-action': {
    props: [],
    mixins: [],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-list-item-avatar': {
    props: [
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the height for the component.',
        },
      },
      {
        name: 'horizontal',
        type: 'boolean',
        default: 'false',
        source: 'v-list-item-avatar',
        description: {
          en: 'Uses an alternative horizontal style.',
        },
      },
      {
        name: 'left',
        type: 'boolean',
        default: 'false',
        source: 'v-avatar',
        description: {
          en: 'Designates that the avatar is on the left side of a component. This is hooked into by components such as [v-chip](/components/chips) and [v-btn](/components/buttons).',
        },
      },
      {
        name: 'maxHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum height for the component.',
        },
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum width for the component.',
        },
      },
      {
        name: 'minHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum height for the component.',
        },
      },
      {
        name: 'minWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum width for the component.',
        },
      },
      {
        name: 'right',
        type: 'boolean',
        default: 'false',
        source: 'v-avatar',
        description: {
          en: 'Designates that the avatar is on the right side of a component. This is hooked into by components such as [v-chip](/components/chips) and [v-btn](/components/buttons).',
        },
      },
      {
        name: 'rounded',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'roundable',
        description: {
          en: 'Designates the **border-radius** applied to the component. You can find more information on the [Border Radius page](/styles/border-radius).',
        },
      },
      {
        name: 'size',
        type: [
          'number',
          'string',
        ],
        default: 40,
        source: 'v-avatar',
        description: {
          en: 'Sets the height and width of the component.',
        },
      },
      {
        name: 'tile',
        type: 'boolean',
        default: 'false',
        source: 'roundable',
        description: {
          en: "Removes the component's **border-radius**.",
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the width for the component.',
        },
      },
    ],
    mixins: [
      'colorable',
      'measurable',
      'roundable',
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-list-item-icon': {
    props: [],
    mixins: [],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-list-item-group': {
    props: [
      {
        name: 'activeClass',
        type: 'string',
        default: "'v-item--active'",
        source: 'base-item-group',
        description: {
          en: 'The **active-class** applied to children when they are activated.',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'mandatory',
        type: 'boolean',
        default: 'false',
        source: 'base-item-group',
        description: {
          en: 'Forces a value to always be selected (if available).',
        },
      },
      {
        name: 'max',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'base-item-group',
        description: {
          en: 'Sets a maximum number of selections that can be made.',
        },
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        source: 'base-item-group',
        description: {
          en: 'Allow multiple selections. The **value** prop must be an _array_.',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'proxyable',
        description: {
          en: 'Expands / Collapse list group',
        },
      },
    ],
    mixins: [
      'base-item-group',
      'proxyable',
      'themeable',
      'colorable',
    ],
    events: [
      {
        name: 'change',
        value: 'any[] | any',
        description: {
          en: 'Emitted when the component value is changed by user interaction',
        },
      },
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-main': {
    props: [
      {
        name: 'tag',
        type: 'string',
        default: "'main'",
        source: 'v-main',
        description: {
          en: '',
        },
      },
    ],
    mixins: [],
  },
  'v-menu': {
    props: [
      {
        name: 'absolute',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Applies **position: absolute** to the component.',
        },
      },
      {
        name: 'activator',
        type: 'any',
        default: 'undefined',
        source: 'activatable',
        description: {
          en: 'Designate a custom activator when the `activator` slot is not used. String can be any valid querySelector and Object can be any valid Node.',
        },
      },
      {
        name: 'allowOverflow',
        type: 'boolean',
        default: 'false',
        source: 'menuable',
        description: {
          en: 'Removes overflow re-positioning for the content',
        },
      },
      {
        name: 'attach',
        type: 'any',
        default: false,
        source: 'detachable',
        description: {
          en: 'Specifies which DOM element that this component should detach to. String can be any valid querySelector and Object can be any valid Node. This will attach to the root `v-app` component by default.',
        },
      },
      {
        name: 'auto',
        type: 'boolean',
        default: 'false',
        source: 'v-menu',
        description: {
          en: 'Centers list on selected element',
        },
      },
      {
        name: 'bottom',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the component towards the bottom.',
        },
      },
      {
        name: 'closeDelay',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'delayable',
        description: {
          en: 'Milliseconds to wait before closing component. Only works with the **open-on-hover** prop',
        },
      },
      {
        name: 'closeOnClick',
        type: 'boolean',
        default: 'true',
        source: 'v-menu',
        description: {
          en: 'Designates if menu should close on outside-activator click',
        },
      },
      {
        name: 'closeOnContentClick',
        type: 'boolean',
        default: 'true',
        source: 'v-menu',
        description: {
          en: 'Designates if menu should close when its content is clicked',
        },
      },
      {
        name: 'contentClass',
        type: 'string',
        default: 'undefined',
        source: 'detachable',
        description: {
          en: 'Applies a custom class to the detached element. This is useful because the content is moved to the beginning of the `v-app` component (unless the **attach** prop is provided) and is not targettable by classes passed directly on the component.',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'menuable',
        description: {
          en: '',
        },
      },
      {
        name: 'disableKeys',
        type: 'boolean',
        default: 'false',
        source: 'v-menu',
        description: {
          en: 'Removes all keyboard interaction',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'activatable',
        description: {
          en: 'Disables the menu',
        },
      },
      {
        name: 'eager',
        type: 'boolean',
        default: 'false',
        source: 'bootable',
        description: {
          en: 'Will force the components content to render on mounted. This is useful if you have content that will not be rendered in the DOM that you want crawled for SEO.',
        },
      },
      {
        name: 'fixed',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Applies **position: fixed** to the component.',
        },
      },
      {
        name: 'internalActivator',
        type: 'boolean',
        default: 'false',
        source: 'activatable',
        description: {
          en: '',
        },
      },
      {
        name: 'left',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the component towards the left.',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'menuable',
        description: {
          en: '',
        },
      },
      {
        name: 'maxHeight',
        type: [
          'number',
          'string',
        ],
        default: 'auto',
        source: 'v-menu',
        description: {
          en: 'Sets the max height of the menu content',
        },
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'auto',
        source: 'menuable',
        description: {
          en: 'Sets the maximum width for the content',
        },
      },
      {
        name: 'minWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'menuable',
        description: {
          en: 'Sets the minimum width for the content',
        },
      },
      {
        name: 'nudgeBottom',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'menuable',
        description: {
          en: 'Nudge the content to the bottom',
        },
      },
      {
        name: 'nudgeLeft',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'menuable',
        description: {
          en: 'Nudge the content to the left',
        },
      },
      {
        name: 'nudgeRight',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'menuable',
        description: {
          en: 'Nudge the content to the right',
        },
      },
      {
        name: 'nudgeTop',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'menuable',
        description: {
          en: 'Nudge the content to the top',
        },
      },
      {
        name: 'nudgeWidth',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'menuable',
        description: {
          en: 'Nudge the content width',
        },
      },
      {
        name: 'offsetOverflow',
        type: 'boolean',
        default: 'false',
        source: 'menuable',
        description: {
          en: 'Causes the component to flip to the opposite side when repositioned due to overflow',
        },
      },
      {
        name: 'offsetX',
        type: 'boolean',
        default: 'false',
        source: 'v-menu',
        description: {
          en: 'Offset the menu on the x-axis. Works in conjunction with direction left/right',
        },
      },
      {
        name: 'offsetY',
        type: 'boolean',
        default: 'false',
        source: 'v-menu',
        description: {
          en: 'Offset the menu on the y-axis. Works in conjunction with direction top/bottom',
        },
      },
      {
        name: 'openDelay',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'delayable',
        description: {
          en: 'Milliseconds to wait before opening component. Only works with the **open-on-hover** prop',
        },
      },
      {
        name: 'openOnClick',
        type: 'boolean',
        default: 'true',
        source: 'menuable',
        description: {
          en: 'Designates whether menu should open on activator click',
        },
      },
      {
        name: 'openOnFocus',
        type: 'boolean',
        default: 'false',
        source: 'activatable',
        description: {
          en: '',
        },
      },
      {
        name: 'openOnHover',
        type: 'boolean',
        default: 'false',
        source: 'activatable',
        description: {
          en: 'Designates whether menu should open on activator hover',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: "'top left'",
        source: 'v-menu',
        description: {
          en: '',
        },
      },
      {
        name: 'positionX',
        type: 'number',
        default: 'undefined',
        source: 'menuable',
        description: {
          en: 'Used to position the content when not using an activator slot',
        },
      },
      {
        name: 'positionY',
        type: 'number',
        default: 'undefined',
        source: 'menuable',
        description: {
          en: 'Used to position the content when not using an activator slot',
        },
      },
      {
        name: 'returnValue',
        type: 'any',
        default: 'undefined',
        source: 'returnable',
        description: {
          en: 'The value that is updated when the menu is closed - must be primitive. Dot notation is supported',
        },
      },
      {
        name: 'right',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the component towards the right.',
        },
      },
      {
        name: 'rounded',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'roundable',
        description: {
          en: 'Designates the **border-radius** applied to the component. You can find more information on the [Border Radius page](/styles/border-radius).',
        },
      },
      {
        name: 'tile',
        type: 'boolean',
        default: 'false',
        source: 'roundable',
        description: {
          en: "Removes the component's **border-radius**.",
        },
      },
      {
        name: 'top',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the content towards the top.',
        },
      },
      {
        name: 'transition',
        type: [
          'boolean',
          'string',
        ],
        default: 'v-menu-transition',
        source: 'v-menu',
        description: {
          en: '',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'toggleable',
        description: {
          en: 'Controls whether the component is visible or hidden.',
        },
      },
      {
        name: 'zIndex',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'menuable',
        description: {
          en: 'The z-index used for the component',
        },
      },
    ],
    mixins: [
      'dependent',
      'delayable',
      'detachable',
      'bootable',
      'menuable',
      'stackable',
      'positionable',
      'activatable',
      'delayable',
      'toggleable',
      'returnable',
      'roundable',
      'toggleable',
      'themeable',
    ],
    slots: [
      {
        name: 'activator',
        props: {
          attrs: '{ role: string, aria-haspopup: boolean, aria-expanded: string }',
          on: '{ [eventName]: eventHandler }',
          value: 'boolean',
        },
        description: {
          en: 'When used, will activate the component when clicked (or hover for specific components). This manually stops the event propagation. Without this slot, if you open the component through its model, you will need to manually stop the event propagation',
        },
      },
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-navigation-drawer': {
    props: [
      {
        name: 'absolute',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Applies **position: absolute** to the component.',
        },
      },
      {
        name: 'app',
        type: 'boolean',
        default: 'false',
        source: 'applicationable',
        description: {
          en: 'Designates the component as part of the application layout. Used for dynamically adjusting content sizing. Components using this prop should reside **outside** of `v-main` component to function properly. You can more information about layouts on the [application page](/components/application). **Note:** this prop automatically applies **position: fixed** to the layout element. You can overwrite this functionality by using the `absolute` prop',
        },
      },
      {
        name: 'bottom',
        type: 'boolean',
        default: 'false',
        source: 'v-navigation-drawer',
        description: {
          en: '',
        },
      },
      {
        name: 'clipped',
        type: 'boolean',
        default: 'false',
        source: 'v-navigation-drawer',
        description: {
          en: '',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'disableResizeWatcher',
        type: 'boolean',
        default: 'false',
        source: 'v-navigation-drawer',
        description: {
          en: '',
        },
      },
      {
        name: 'disableRouteWatcher',
        type: 'boolean',
        default: 'false',
        source: 'v-navigation-drawer',
        description: {
          en: '',
        },
      },
      {
        name: 'expandOnHover',
        type: 'boolean',
        default: 'false',
        source: 'v-navigation-drawer',
        description: {
          en: '',
        },
      },
      {
        name: 'fixed',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Applies **position: fixed** to the component.',
        },
      },
      {
        name: 'floating',
        type: 'boolean',
        default: 'false',
        source: 'v-navigation-drawer',
        description: {
          en: '',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: '100%',
        source: 'v-navigation-drawer',
        description: {
          en: '',
        },
      },
      {
        name: 'hideOverlay',
        type: 'boolean',
        default: 'false',
        source: 'overlayable',
        description: {
          en: 'Hides the display of the overlay.',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'miniVariant',
        type: 'boolean',
        default: 'false',
        source: 'v-navigation-drawer',
        description: {
          en: '',
        },
      },
      {
        name: 'miniVariantWidth',
        type: [
          'number',
          'string',
        ],
        default: 56,
        source: 'v-navigation-drawer',
        description: {
          en: '',
        },
      },
      {
        name: 'mobileBreakpoint',
        type: [
          'number',
          'string',
        ],
        source: 'mobile',
        description: {
          en: '',
        },
      },
      {
        name: 'overlayColor',
        type: 'string',
        default: 'undefined',
        source: 'overlayable',
        description: {
          en: 'Sets the overlay color.',
        },
      },
      {
        name: 'overlayOpacity',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'overlayable',
        description: {
          en: 'Sets the overlay opacity.',
        },
      },
      {
        name: 'permanent',
        type: 'boolean',
        default: 'false',
        source: 'v-navigation-drawer',
        description: {
          en: '',
        },
      },
      {
        name: 'right',
        type: 'boolean',
        default: 'false',
        source: 'v-navigation-drawer',
        description: {
          en: '',
        },
      },
      {
        name: 'src',
        type: [
          'string',
          'object',
        ],
        default: 'undefined',
        source: 'v-navigation-drawer',
        description: {
          en: '',
        },
      },
      {
        name: 'stateless',
        type: 'boolean',
        default: 'false',
        source: 'v-navigation-drawer',
        description: {
          en: '',
        },
      },
      {
        name: 'tag',
        type: 'string',
        default: "'aside'",
        source: 'v-navigation-drawer',
        description: {
          en: '',
        },
      },
      {
        name: 'temporary',
        type: 'boolean',
        default: 'false',
        source: 'v-navigation-drawer',
        description: {
          en: '',
        },
      },
      {
        name: 'touchless',
        type: 'boolean',
        default: 'false',
        source: 'v-navigation-drawer',
        description: {
          en: '',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'v-navigation-drawer',
        description: {
          en: '',
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 256,
        source: 'v-navigation-drawer',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'applicationable',
      'positionable',
      'colorable',
      'dependent',
      'mobile',
      'overlayable',
      'ssr-bootable',
      'themeable',
    ],
    slots: [
      {
        name: 'append',
        description: {
          en: '',
        },
      },
      {
        name: 'img',
        props: {
          height: 'string',
          src: 'string | srcObject',
        },
        description: {
          en: '',
        },
      },
      {
        name: 'prepend',
        description: {
          en: '',
        },
      },
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
    events: [
      {
        name: 'input',
        value: 'boolean',
        description: {
          en: 'The updated bound model',
        },
      },
      {
        name: 'transitionend',
        value: 'object',
        description: {
          en: '',
        },
      },
      {
        name: 'update:mini-variant',
        value: 'boolean',
        description: {
          en: '',
        },
      },
    ],
  },
  'v-overflow-btn': {
    props: [
      {
        name: 'allowOverflow',
        type: 'boolean',
        default: 'true',
        source: 'v-autocomplete',
        description: {
          en: 'Allow the menu to overflow off the screen',
        },
      },
      {
        name: 'appendIcon',
        type: 'string',
        default: "'$dropdown'",
        source: 'v-input',
        description: {
          en: 'Appends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'appendOuterIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: "Appends an icon to the outside the component's input, uses same syntax as `v-icon`",
        },
      },
      {
        name: 'attach',
        type: 'any',
        default: false,
        source: 'v-select',
        description: {
          en: 'Mixins.Detachable.props.attach',
        },
      },
      {
        name: 'autoSelectFirst',
        type: 'boolean',
        default: 'false',
        source: 'v-autocomplete',
        description: {
          en: 'When searching, will always highlight the first option',
        },
      },
      {
        name: 'autofocus',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Enables autofocus',
        },
      },
      {
        name: 'backgroundColor',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Changes the background-color of the input',
        },
      },
      {
        name: 'cacheItems',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Keeps a local _unique_ copy of all items that have been passed through the **items** prop.',
        },
      },
      {
        name: 'chips',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Changes display of selections to chips',
        },
      },
      {
        name: 'clearIcon',
        type: 'string',
        default: "'$clear'",
        source: 'v-text-field',
        description: {
          en: 'Applied when using **clearable** and the input is dirty',
        },
      },
      {
        name: 'clearable',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Add input clear functionality, default icon is Material Design Icons **mdi-clear**',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'counter',
        type: [
          'boolean',
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Creates counter for input length; if no number is specified, it defaults to 25. Does not apply any validation.',
        },
      },
      {
        name: 'counterValue',
        type: 'function',
        default: 'null',
        source: 'v-text-field',
        description: {
          en: '',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'deletableChips',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Adds a remove icon to selected chips',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Reduces the input height',
        },
      },
      {
        name: 'disableLookup',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Disables keyboard lookup',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Disable the input',
        },
      },
      {
        name: 'eager',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: '',
        },
      },
      {
        name: 'editable',
        type: 'boolean',
        default: 'false',
        source: 'v-overflow-btn',
        description: {
          en: 'Creates an editable button',
        },
      },
      {
        name: 'error',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual error state',
        },
      },
      {
        name: 'errorCount',
        type: [
          'number',
          'string',
        ],
        default: 1,
        source: 'validatable',
        description: {
          en: 'The total number of errors that should display at once',
        },
      },
      {
        name: 'errorMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in an error state and passes through custom error messages. Will be combined with any validations that occur from the **rules** prop. This field will not trigger validation',
        },
      },
      {
        name: 'filled',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Applies the alternate filled input style',
        },
      },
      {
        name: 'filter',
        type: 'function',
        default: '(item: object, queryText: string, itemText: string): boolean',
        source: 'v-select',
        description: {
          en: 'The function used for filtering items',
        },
      },
      {
        name: 'flat',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Mixins.Soloable.props.flat',
        },
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Designates input type as full-width',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the height of the input',
        },
      },
      {
        name: 'hideDetails',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display",
        },
      },
      {
        name: 'hideNoData',
        type: 'boolean',
        default: 'false',
        source: 'v-autocomplete',
        description: {
          en: 'Hides the menu when there are no options to show.  Useful for preventing the menu from opening before results are fetched asynchronously.  Also has the effect of opening the menu when the `items` array changes if not already open.',
        },
      },
      {
        name: 'hideSelected',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Do not display in the select menu items that are already selected',
        },
      },
      {
        name: 'hint',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Hint text',
        },
      },
      {
        name: 'id',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the DOM id on the component',
        },
      },
      {
        name: 'itemColor',
        type: 'string',
        default: "'primary'",
        source: 'v-select',
        description: {
          en: 'Sets color of selected items',
        },
      },
      {
        name: 'itemDisabled',
        type: [
          'string',
          'array',
          'function',
        ],
        default: 'disabled',
        source: 'v-select',
        description: {
          en: "Set property of **items**'s disabled value",
        },
      },
      {
        name: 'itemText',
        type: [
          'string',
          'array',
          'function',
        ],
        default: 'text',
        source: 'v-select',
        description: {
          en: "Set property of **items**'s text value",
        },
      },
      {
        name: 'itemValue',
        type: [
          'string',
          'array',
          'function',
        ],
        default: 'value',
        source: 'v-select',
        description: {
          en: "Set property of **items**'s value - **must be primitive**. Dot notation is supported. **Note:** This is currently not supported with `v-combobox` [GitHub Issue](https://github.com/vuetifyjs/vuetify/issues/5479)",
        },
      },
      {
        name: 'items',
        type: 'array',
        default: [],
        source: 'v-select',
        example: {
          text: 'string | number | object',
          value: 'string | number | object',
          disabled: 'boolean',
          divider: 'boolean',
          header: 'string',
        },
        description: {
          en: 'Can be an array of objects or array of strings. When using objects, will look for a text, value and disabled keys. This can be changed using the **item-text**, **item-value** and **item-disabled** props.  Objects that have a **header** or **divider** property are considered special cases and generate a list header or divider; these items are not selectable.',
        },
      },
      {
        name: 'label',
        type: 'string',
        source: 'v-input',
        description: {
          en: 'Sets input label',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'loaderHeight',
        type: [
          'number',
          'string',
        ],
        default: 2,
        source: 'loadable',
        description: {
          en: 'Specifies the height of the loader',
        },
      },
      {
        name: 'loading',
        type: [
          'boolean',
          'string',
        ],
        default: false,
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'menuProps',
        type: [
          'string',
          'array',
          'object',
        ],
        default: '{ "closeOnClick": false, "closeOnContentClick": false, "disableKeys": true, "openOnClick": false, "maxHeight": 304 }',
        source: 'v-select',
        description: {
          en: 'Pass props through to the `v-menu` component. Accepts either a string for boolean props `menu-props="auto, overflowY"`, or an object `:menu-props="{ auto: true, overflowY: true }"`',
        },
      },
      {
        name: 'messages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Displays a list of messages or message if using a string',
        },
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Changes select to multiple. Accepts array for value',
        },
      },
      {
        name: 'noDataText',
        type: 'string',
        default: "'$vuetify.noDataText'",
        source: 'filterable',
        description: {
          en: 'Display text when there is no data',
        },
      },
      {
        name: 'noFilter',
        type: 'boolean',
        default: 'false',
        source: 'v-autocomplete',
        description: {
          en: 'Do not apply filtering when searching. Useful when data is being filtered server side',
        },
      },
      {
        name: 'openOnClear',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'When using the **clearable** prop, once cleared, the select menu will either open or stay open, depending on the current state',
        },
      },
      {
        name: 'outlined',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Applies the outlined style to the input',
        },
      },
      {
        name: 'persistentHint',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Forces hint to always be visible',
        },
      },
      {
        name: 'placeholder',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Sets the input’s placeholder text',
        },
      },
      {
        name: 'prefix',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Displays prefix text',
        },
      },
      {
        name: 'prependIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Prepends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'prependInnerIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: "Prepends an icon inside the component's input, uses the same syntax as `v-icon`",
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Puts input in readonly state',
        },
      },
      {
        name: 'returnObject',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Changes the selection behavior to return the object directly rather than the value specified with **item-value**',
        },
      },
      {
        name: 'reverse',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Reverses the input orientation',
        },
      },
      {
        name: 'rounded',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Adds a border radius to the input',
        },
      },
      {
        name: 'rules',
        type: 'array',
        default: [],
        source: 'validatable',
        description: {
          en: 'Accepts an array of functions that take an input value as an argument and return either `true` / `false` or a `string` with an error message',
        },
      },
      {
        name: 'searchInput',
        type: 'string',
        default: 'undefined',
        source: 'v-autocomplete',
        description: {
          en: 'Search value. Can be used with `.sync` modifier.',
        },
      },
      {
        name: 'segmented',
        type: 'boolean',
        default: 'false',
        source: 'v-overflow-btn',
        description: {
          en: 'Creates a segmented button',
        },
      },
      {
        name: 'shaped',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Round if `outlined` and increase `border-radius` if `filled`. Must be used with either `outlined` or `filled`',
        },
      },
      {
        name: 'singleLine',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Label does not move on focus/dirty',
        },
      },
      {
        name: 'smallChips',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Changes display of selections to chips with the **small** property',
        },
      },
      {
        name: 'solo',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Mixins.Soloable.props.solo',
        },
      },
      {
        name: 'soloInverted',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Mixins.Soloable.props.soloInverted',
        },
      },
      {
        name: 'success',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual success state',
        },
      },
      {
        name: 'successMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in a success state and passes through custom success messages.',
        },
      },
      {
        name: 'suffix',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Displays suffix text',
        },
      },
      {
        name: 'type',
        type: 'string',
        default: "'text'",
        source: 'v-text-field',
        description: {
          en: 'Sets input type',
        },
      },
      {
        name: 'validateOnBlur',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Delays validation until blur event',
        },
      },
      {
        name: 'value',
        type: 'any',
        source: 'v-input',
        description: {
          en: "The input's value",
        },
      },
      {
        name: 'valueComparator',
        type: 'function',
        default: '(a: any, b: any): boolean',
        source: 'v-select',
        description: {
          en: 'The comparison algorithm used for values. [More info](https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/util/helpers.ts)',
        },
      },
    ],
    mixins: [
      'v-text-field',
      'v-input',
      'validatable',
      'colorable',
      'registrable-inject',
      'themeable',
      'intersectable',
      'loadable',
      'comparable',
      'filterable',
    ],
    events: [
      {
        name: 'update:error',
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'The `error.sync` event',
        },
      },
      {
        name: 'click',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when input is clicked',
        },
      },
      {
        name: 'mousedown',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is pressed',
        },
      },
      {
        name: 'mouseup',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is released',
        },
      },
      {
        name: 'click:append',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when appended icon is clicked',
        },
      },
      {
        name: 'click:prepend',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when prepended icon is clicked',
        },
      },
      {
        name: 'blur',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when the input is blurred',
        },
      },
      {
        name: 'click:clear',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when clearable icon clicked',
        },
      },
      {
        name: 'click:append-outer',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when appended outer icon is clicked',
        },
      },
      {
        name: 'click:prepend-inner',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when prepended inner icon is clicked',
        },
      },
      {
        name: 'focus',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when component is focused',
        },
      },
      {
        name: 'change',
        source: 'v-text-field',
        value: 'any',
        description: {
          en: 'Emitted when the input is changed by user interaction',
        },
      },
      {
        name: 'input',
        source: 'v-text-field',
        value: 'any',
        description: {
          en: 'The updated bound model',
        },
      },
      {
        name: 'keydown',
        source: 'v-text-field',
        value: 'KeyboardEvent',
        description: {
          en: 'Emitted when **any** key is pressed',
        },
      },
      {
        name: 'update:search-input',
        source: 'v-select',
        value: 'string',
        description: {
          en: 'The `search-input.sync` event',
        },
      },
      {
        name: 'update:list-index',
        source: 'v-select',
        value: 'number',
        description: {
          en: 'Emitted when menu item is selected using keyboard arrows',
        },
      },
    ],
    slots: [
      {
        name: 'append',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'default',
        source: 'v-input',
        description: {
          en: 'The default Vue slot.',
        },
      },
      {
        name: 'prepend',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'label',
        source: 'v-input',
        description: {
          en: 'Replaces the default label',
        },
      },
      {
        name: 'message',
        props: {
          key: 'number, // the messages index',
          message: 'string, // the message',
        },
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'append-outer',
        source: 'v-text-field',
        description: {
          en: 'Adds an item outside the input and after input content',
        },
      },
      {
        name: 'prepend-inner',
        source: 'v-text-field',
        description: {
          en: 'Adds an item inside the input and before input content',
        },
      },
      {
        name: 'progress',
        source: 'v-text-field',
        description: {
          en: 'Slot for custom progress linear (displayed when **loading** prop is not equal to Boolean False)',
        },
      },
      {
        name: 'append-item',
        source: 'v-select',
        description: {
          en: 'Adds an item after menu content',
        },
      },
      {
        name: 'prepend-item',
        source: 'v-select',
        description: {
          en: 'Adds an item before menu content',
        },
      },
      {
        name: 'item',
        props: {
          parent: 'VueComponent',
          item: 'object',
          on: 'object // Only needed when providing your own v-list-item',
          attrs: 'object // Only needed when providing your own v-list-item',
        },
        source: 'v-select',
        description: {
          en: 'Define a custom item appearance',
        },
      },
      {
        name: 'no-data',
        source: 'v-select',
        description: {
          en: '',
        },
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
        description: {
          en: 'Define a custom selection appearance',
        },
      },
    ],
  },
  'v-overlay': {
    props: [
      {
        name: 'absolute',
        type: 'boolean',
        default: 'false',
        source: 'v-overlay',
        description: {
          en: '',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: "'#212121'",
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'true',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'opacity',
        type: [
          'number',
          'string',
        ],
        default: 0.46,
        source: 'v-overlay',
        description: {
          en: 'Sets the overlay opacity',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: true,
        source: 'toggleable',
        description: {
          en: 'Controls whether the component is visible or hidden.',
        },
      },
      {
        name: 'zIndex',
        type: [
          'number',
          'string',
        ],
        default: 5,
        source: 'v-overlay',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'colorable',
      'themeable',
      'toggleable',
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-pagination': {
    props: [
      {
        name: 'circle',
        type: 'boolean',
        default: 'false',
        source: 'v-pagination',
        description: {
          en: 'Shape pagination elements as circles',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'currentPageAriaLabel',
        type: 'string',
        default: "'$vuetify.pagination.ariaLabel.currentPage'",
        source: 'v-pagination',
        description: {
          en: '',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'v-pagination',
        description: {
          en: 'Disables component',
        },
      },
      {
        name: 'length',
        type: 'number',
        default: 0,
        source: 'v-pagination',
        description: {
          en: 'The length of the pagination component',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'nextAriaLabel',
        type: 'string',
        default: "'$vuetify.pagination.ariaLabel.next'",
        source: 'v-pagination',
        description: {
          en: '',
        },
      },
      {
        name: 'nextIcon',
        type: 'string',
        default: "'$next'",
        source: 'v-pagination',
        description: {
          en: 'Specify the icon to use for the next icon',
        },
      },
      {
        name: 'pageAriaLabel',
        type: 'string',
        default: "'$vuetify.pagination.ariaLabel.page'",
        source: 'v-pagination',
        description: {
          en: '',
        },
      },
      {
        name: 'prevIcon',
        type: 'string',
        default: "'$prev'",
        source: 'v-pagination',
        description: {
          en: 'Specify the icon to use for the prev icon',
        },
      },
      {
        name: 'previousAriaLabel',
        type: 'string',
        default: "'$vuetify.pagination.ariaLabel.previous'",
        source: 'v-pagination',
        description: {
          en: '',
        },
      },
      {
        name: 'totalVisible',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-pagination',
        description: {
          en: 'Specify the max total visible pagination numbers',
        },
      },
      {
        name: 'value',
        type: 'number',
        default: 0,
        source: 'v-pagination',
        description: {
          en: 'Current selected page',
        },
      },
      {
        name: 'wrapperAriaLabel',
        type: 'string',
        default: "'$vuetify.pagination.ariaLabel.wrapper'",
        source: 'v-pagination',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'colorable',
      'intersectable',
      'themeable',
    ],
    events: [
      {
        name: 'input',
        value: 'number',
        description: {
          en: 'The updated bound model',
        },
      },
      {
        name: 'next',
        value: 'void',
        description: {
          en: 'Emitted when going to next item',
        },
      },
      {
        name: 'previous',
        value: 'void',
        description: {
          en: 'Emitted when going to previous item',
        },
      },
    ],
  },
  'v-sheet': {
    props: [
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'elevation',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'elevatable',
        description: {
          en: 'Designates an elevation applied to the component between 0 and 24. You can find more information on the [elevation page](/styles/elevation).',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the height for the component.',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'maxHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum height for the component.',
        },
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum width for the component.',
        },
      },
      {
        name: 'minHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum height for the component.',
        },
      },
      {
        name: 'minWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum width for the component.',
        },
      },
      {
        name: 'outlined',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
        description: {
          en: 'Removes elevation (box-shadow) and adds a *thin* border.',
        },
      },
      {
        name: 'rounded',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'roundable',
        description: {
          en: 'Designates the **border-radius** applied to the component. You can find more information on the [Border Radius page](/styles/border-radius).',
        },
      },
      {
        name: 'shaped',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
        description: {
          en: 'Applies a large border radius on the top left and bottom right of the card.',
        },
      },
      {
        name: 'tag',
        type: 'string',
        default: 'div',
        source: 'v-sheet',
        description: {
          en: 'Specify a custom tag used on the root element.',
        },
      },
      {
        name: 'tile',
        type: 'boolean',
        default: 'false',
        source: 'roundable',
        description: {
          en: "Removes the component's **border-radius**.",
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the width for the component.',
        },
      },
    ],
    mixins: [
      'colorable',
      'elevatable',
      'measurable',
      'roundable',
      'themeable',
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-parallax': {
    props: [
      {
        name: 'alt',
        type: 'string',
        default: 'undefined',
        source: 'v-parallax',
        description: {
          en: 'Attaches an alt property to the parallax image',
        },
      },
      {
        name: 'height',
        type: [
          'string',
          'number',
        ],
        default: 500,
        source: 'translatable',
        description: {
          en: '',
        },
      },
      {
        name: 'src',
        type: 'string',
        default: 'undefined',
        source: 'v-parallax',
        description: {
          en: 'The image to parallax',
        },
      },
      {
        name: 'srcset',
        type: 'string',
        default: 'undefined',
        source: 'v-parallax',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'translatable',
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-picker': {
    props: [
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'elevation',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'elevatable',
        description: {
          en: 'Designates an elevation applied to the component between 0 and 24. You can find more information on the [elevation page](/styles/elevation).',
        },
      },
      {
        name: 'flat',
        type: 'boolean',
        default: 'false',
        source: 'v-picker',
        description: {
          en: '',
        },
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        source: 'v-picker',
        description: {
          en: 'Forces 100% width',
        },
      },
      {
        name: 'landscape',
        type: 'boolean',
        default: 'false',
        source: 'v-picker',
        description: {
          en: '',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'noTitle',
        type: 'boolean',
        default: 'false',
        source: 'v-picker',
        description: {
          en: '',
        },
      },
      {
        name: 'transition',
        type: 'string',
        default: "'fade-transition'",
        source: 'v-picker',
        description: {
          en: '',
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 290,
        source: 'v-picker',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'colorable',
      'elevatable',
      'themeable',
    ],
  },
  'v-progress-circular': {
    props: [
      {
        name: 'button',
        type: 'boolean',
        default: 'false',
        source: 'v-progress-circular',
        description: {
          en: 'Deprecated - Pending removal',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'indeterminate',
        type: 'boolean',
        default: 'false',
        source: 'v-progress-circular',
        description: {
          en: 'Constantly animates, use when loading progress is unknown.',
        },
      },
      {
        name: 'rotate',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'v-progress-circular',
        description: {
          en: 'Rotates the circle start point in deg',
        },
      },
      {
        name: 'size',
        type: [
          'number',
          'string',
        ],
        default: 32,
        source: 'v-progress-circular',
        description: {
          en: 'Sets the diameter of the circle in pixels',
        },
      },
      {
        name: 'value',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'v-progress-circular',
        description: {
          en: 'The percentage value for current progress',
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 4,
        source: 'v-progress-circular',
        description: {
          en: 'Sets the stroke of the circle in pixels',
        },
      },
    ],
    mixins: [],
    slots: [
      {
        name: 'default',
        props: {
          value: 'number',
        },
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-progress-linear': {
    props: [
      {
        name: 'absolute',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Applies **position: absolute** to the component.',
        },
      },
      {
        name: 'active',
        type: 'boolean',
        default: 'true',
        source: 'v-progress-linear',
        description: {
          en: '',
        },
      },
      {
        name: 'backgroundColor',
        type: 'string',
        default: 'undefined',
        source: 'v-progress-linear',
        description: {
          en: '',
        },
      },
      {
        name: 'backgroundOpacity',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-progress-linear',
        description: {
          en: '',
        },
      },
      {
        name: 'bottom',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the component towards the bottom.',
        },
      },
      {
        name: 'bufferValue',
        type: [
          'number',
          'string',
        ],
        default: 100,
        source: 'v-progress-linear',
        description: {
          en: '',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: "'primary'",
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'fixed',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Applies **position: fixed** to the component.',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 4,
        source: 'v-progress-linear',
        description: {
          en: '',
        },
      },
      {
        name: 'indeterminate',
        type: 'boolean',
        default: 'false',
        source: 'v-progress-linear',
        description: {
          en: '',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'query',
        type: 'boolean',
        default: 'false',
        source: 'v-progress-linear',
        description: {
          en: 'Animates like **indeterminate** prop but inverse',
        },
      },
      {
        name: 'reverse',
        type: 'boolean',
        default: 'false',
        source: 'v-progress-linear',
        description: {
          en: 'Displays reversed progress (right to left in LTR mode and left to right in RTL)',
        },
      },
      {
        name: 'rounded',
        type: 'boolean',
        default: 'false',
        source: 'v-progress-linear',
        description: {
          en: 'Adds a border radius to the progress component',
        },
      },
      {
        name: 'stream',
        type: 'boolean',
        default: 'false',
        source: 'v-progress-linear',
        description: {
          en: 'An alternative style for portraying loading that works in tandem with **buffer-value**',
        },
      },
      {
        name: 'striped',
        type: 'boolean',
        default: 'false',
        source: 'v-progress-linear',
        description: {
          en: 'Adds a stripe background to the filled portion of the progress component',
        },
      },
      {
        name: 'top',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the content towards the top.',
        },
      },
      {
        name: 'value',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'proxyable',
        description: {
          en: 'The designated model value for the component.',
        },
      },
    ],
    mixins: [
      'colorable',
      'positionable',
      'proxyable',
      'themeable',
    ],
    events: [
      {
        name: 'change',
        value: 'number',
        description: {
          en: 'Emitted when the component value is changed by user interaction',
        },
      },
    ],
    slots: [
      {
        name: 'default',
        props: {
          value: 'number',
        },
        description: {
          en: 'Provides the current value of the component',
        },
      },
    ],
  },
  'v-radio-group': {
    props: [
      {
        name: 'activeClass',
        type: 'string',
        default: "'v-item--active'",
        source: 'base-item-group',
        description: {
          en: 'The **active-class** applied to children when they are activated.',
        },
      },
      {
        name: 'appendIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Appends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'backgroundColor',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Changes the background-color of the input',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'column',
        type: 'boolean',
        default: 'true',
        source: 'v-radio-group',
        description: {
          en: '',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Reduces the input height',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Disable the input',
        },
      },
      {
        name: 'error',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual error state',
        },
      },
      {
        name: 'errorCount',
        type: [
          'number',
          'string',
        ],
        default: 1,
        source: 'validatable',
        description: {
          en: 'The total number of errors that should display at once',
        },
      },
      {
        name: 'errorMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in an error state and passes through custom error messages. Will be combined with any validations that occur from the **rules** prop. This field will not trigger validation',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'auto',
        source: 'v-input',
        description: {
          en: 'Sets the height of the input',
        },
      },
      {
        name: 'hideDetails',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display",
        },
      },
      {
        name: 'hint',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Hint text',
        },
      },
      {
        name: 'id',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the DOM id on the component',
        },
      },
      {
        name: 'label',
        type: 'string',
        source: 'v-input',
        description: {
          en: 'Sets input label',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'mandatory',
        type: 'boolean',
        default: 'false',
        source: 'base-item-group',
        description: {
          en: 'Forces a value to always be selected (if available).',
        },
      },
      {
        name: 'max',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'base-item-group',
        description: {
          en: 'Sets a maximum number of selections that can be made.',
        },
      },
      {
        name: 'messages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Displays a list of messages or message if using a string',
        },
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        source: 'base-item-group',
        description: {
          en: 'Allow multiple selections. The **value** prop must be an _array_.',
        },
      },
      {
        name: 'name',
        type: 'string',
        default: 'undefined',
        source: 'v-radio-group',
        description: {
          en: '',
        },
      },
      {
        name: 'persistentHint',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Forces hint to always be visible',
        },
      },
      {
        name: 'prependIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Prepends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Puts input in readonly state',
        },
      },
      {
        name: 'row',
        type: 'boolean',
        default: 'false',
        source: 'v-radio-group',
        description: {
          en: '',
        },
      },
      {
        name: 'rules',
        type: 'array',
        default: [],
        source: 'validatable',
        description: {
          en: 'Accepts an array of functions that take an input value as an argument and return either `true` / `false` or a `string` with an error message',
        },
      },
      {
        name: 'success',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual success state',
        },
      },
      {
        name: 'successMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in a success state and passes through custom success messages.',
        },
      },
      {
        name: 'validateOnBlur',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Delays validation until blur event',
        },
      },
      {
        name: 'value',
        type: 'any',
        source: 'v-input',
        description: {
          en: "The input's value",
        },
      },
      {
        name: 'valueComparator',
        type: 'function',
        default: 'null',
        source: 'comparable',
        description: {
          en: 'Apply a custom value comparator function',
        },
      },
    ],
    mixins: [
      'comparable',
      'base-item-group',
      'proxyable',
      'themeable',
      'v-input',
      'validatable',
      'colorable',
      'registrable-inject',
      'themeable',
    ],
    events: [
      {
        name: 'update:error',
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'The `error.sync` event',
        },
      },
      {
        name: 'change',
        value: 'any',
        description: {
          en: '',
        },
      },
      {
        name: 'mousedown',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is pressed',
        },
      },
      {
        name: 'mouseup',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is released',
        },
      },
      {
        name: 'click:append',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when appended icon is clicked',
        },
      },
      {
        name: 'click:prepend',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when prepended icon is clicked',
        },
      },
    ],
    slots: [
      {
        name: 'append',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'default',
        source: 'v-input',
        description: {
          en: 'The default Vue slot.',
        },
      },
      {
        name: 'prepend',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'label',
        source: 'v-input',
        description: {
          en: 'Replaces the default label',
        },
      },
      {
        name: 'message',
        props: {
          key: 'number, // the messages index',
          message: 'string, // the message',
        },
        source: 'v-input',
        description: {
          en: '',
        },
      },
    ],
  },
  'v-radio': {
    props: [
      {
        name: 'activeClass',
        type: 'string',
        source: 'groupable',
        description: {
          en: 'Mixins.Routable.props.activeClass',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Disable the input',
        },
      },
      {
        name: 'id',
        type: 'string',
        default: 'undefined',
        source: 'v-radio',
        description: {
          en: 'Sets the DOM id on the component',
        },
      },
      {
        name: 'label',
        type: 'string',
        source: 'v-input',
        description: {
          en: 'Sets input label',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'name',
        type: 'string',
        default: 'undefined',
        source: 'v-radio',
        description: {
          en: '',
        },
      },
      {
        name: 'offIcon',
        type: 'string',
        default: "'$radioOff'",
        source: 'v-radio',
        description: {
          en: '',
        },
      },
      {
        name: 'onIcon',
        type: 'string',
        default: "'$radioOn'",
        source: 'v-radio',
        description: {
          en: '',
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Puts input in readonly state',
        },
      },
      {
        name: 'ripple',
        type: [
          'boolean',
          'object',
        ],
        default: true,
        source: 'rippleable',
        description: {
          en: 'Applies the [v-ripple](/directives/ripples) directive.',
        },
      },
      {
        name: 'value',
        type: 'any',
        source: 'v-input',
        description: {
          en: "The input's value",
        },
      },
    ],
    mixins: [
      'colorable',
      'rippleable',
      'groupable',
      'themeable',
    ],
    events: [
      {
        name: 'update:error',
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'The `error.sync` event',
        },
      },
      {
        name: 'change',
        value: 'any',
        description: {
          en: '',
        },
      },
      {
        name: 'mousedown',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is pressed',
        },
      },
      {
        name: 'mouseup',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is released',
        },
      },
      {
        name: 'click:append',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when appended icon is clicked',
        },
      },
      {
        name: 'click:prepend',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when prepended icon is clicked',
        },
      },
    ],
    slots: [
      {
        name: 'append',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'default',
        source: 'v-input',
        description: {
          en: 'The default Vue slot.',
        },
      },
      {
        name: 'prepend',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'label',
        source: 'v-input',
        description: {
          en: 'Replaces the default label',
        },
      },
      {
        name: 'message',
        props: {
          key: 'number, // the messages index',
          message: 'string, // the message',
        },
        source: 'v-input',
        description: {
          en: '',
        },
      },
    ],
  },
  'v-range-slider': {
    props: [
      {
        name: 'appendIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Appends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'backgroundColor',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Changes the background-color of the input',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Reduces the input height',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Disable the input',
        },
      },
      {
        name: 'error',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual error state',
        },
      },
      {
        name: 'errorCount',
        type: [
          'number',
          'string',
        ],
        default: 1,
        source: 'validatable',
        description: {
          en: 'The total number of errors that should display at once',
        },
      },
      {
        name: 'errorMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in an error state and passes through custom error messages. Will be combined with any validations that occur from the **rules** prop. This field will not trigger validation',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the height of the input',
        },
      },
      {
        name: 'hideDetails',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display",
        },
      },
      {
        name: 'hint',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Hint text',
        },
      },
      {
        name: 'id',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the DOM id on the component',
        },
      },
      {
        name: 'inverseLabel',
        type: 'boolean',
        default: 'false',
        source: 'v-slider',
        description: {
          en: 'Reverse the label position. Works with **rtl**.',
        },
      },
      {
        name: 'label',
        type: 'string',
        source: 'v-input',
        description: {
          en: 'Sets input label',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'loaderHeight',
        type: [
          'number',
          'string',
        ],
        default: 2,
        source: 'loadable',
        description: {
          en: 'Specifies the height of the loader',
        },
      },
      {
        name: 'loading',
        type: [
          'boolean',
          'string',
        ],
        default: false,
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'max',
        type: [
          'number',
          'string',
        ],
        default: 100,
        source: 'v-slider',
        description: {
          en: 'Sets the maximum allowed value',
        },
      },
      {
        name: 'messages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Displays a list of messages or message if using a string',
        },
      },
      {
        name: 'min',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'v-slider',
        description: {
          en: 'Sets the minimum allowed value',
        },
      },
      {
        name: 'persistentHint',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Forces hint to always be visible',
        },
      },
      {
        name: 'prependIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Prepends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Puts input in readonly state',
        },
      },
      {
        name: 'rules',
        type: 'array',
        default: [],
        source: 'validatable',
        description: {
          en: 'Accepts an array of functions that take an input value as an argument and return either `true` / `false` or a `string` with an error message',
        },
      },
      {
        name: 'step',
        type: [
          'number',
          'string',
        ],
        default: 1,
        source: 'v-slider',
        description: {
          en: 'If greater than 0, sets step interval for ticks',
        },
      },
      {
        name: 'success',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual success state',
        },
      },
      {
        name: 'successMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in a success state and passes through custom success messages.',
        },
      },
      {
        name: 'thumbColor',
        type: 'string',
        default: 'undefined',
        source: 'v-slider',
        description: {
          en: 'Sets the thumb and thumb label color',
        },
      },
      {
        name: 'thumbLabel',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-slider',
        description: {
          en: "Show thumb label. If `true` it shows label when using slider. If set to `'always'` it always shows label.",
        },
      },
      {
        name: 'thumbSize',
        type: [
          'number',
          'string',
        ],
        default: 32,
        source: 'v-slider',
        description: {
          en: 'Controls the size of the thumb label.',
        },
      },
      {
        name: 'tickLabels',
        type: 'array',
        default: [],
        source: 'v-slider',
        description: {
          en: 'When provided with Array<string>, will attempt to map the labels to each step in index order',
        },
      },
      {
        name: 'tickSize',
        type: [
          'number',
          'string',
        ],
        default: 2,
        source: 'v-slider',
        description: {
          en: 'Controls the size of **ticks**',
        },
      },
      {
        name: 'ticks',
        type: [
          'boolean',
          'string',
        ],
        default: false,
        source: 'v-slider',
        description: {
          en: "Show track ticks. If `true` it shows ticks when using slider. If set to `'always'` it always shows ticks.",
        },
      },
      {
        name: 'trackColor',
        type: 'string',
        default: 'undefined',
        source: 'v-slider',
        description: {
          en: "Sets the track's color",
        },
      },
      {
        name: 'trackFillColor',
        type: 'string',
        default: 'undefined',
        source: 'v-slider',
        description: {
          en: "Sets the track's fill color",
        },
      },
      {
        name: 'validateOnBlur',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Delays validation until blur event',
        },
      },
      {
        name: 'value',
        type: 'any',
        source: 'v-input',
        description: {
          en: "The input's value",
        },
      },
      {
        name: 'vertical',
        type: 'boolean',
        default: 'false',
        source: 'v-slider',
        description: {
          en: 'Changes slider direction to vertical',
        },
      },
    ],
    mixins: [
      'loadable',
    ],
    events: [
      {
        name: 'update:error',
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'The `error.sync` event',
        },
      },
      {
        name: 'click',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when input is clicked',
        },
      },
      {
        name: 'mousedown',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is pressed',
        },
      },
      {
        name: 'mouseup',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is released',
        },
      },
      {
        name: 'click:append',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when appended icon is clicked',
        },
      },
      {
        name: 'click:prepend',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when prepended icon is clicked',
        },
      },
      {
        name: 'start',
        source: 'v-slider',
        value: 'number',
        description: {
          en: 'Slider value emitted at start of slider movement',
        },
      },
      {
        name: 'end',
        source: 'v-slider',
        value: 'number',
        description: {
          en: 'Slider value emitted at the end of slider movement',
        },
      },
    ],
    slots: [
      {
        name: 'append',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'default',
        source: 'v-input',
        description: {
          en: 'The default Vue slot.',
        },
      },
      {
        name: 'prepend',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'label',
        source: 'v-input',
        description: {
          en: 'Replaces the default label',
        },
      },
      {
        name: 'message',
        props: {
          key: 'number, // the messages index',
          message: 'string, // the message',
        },
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'progress',
        source: 'v-slider',
        description: {
          en: 'Slot for custom progress linear (displayed when **loading** prop is not equal to Boolean False)',
        },
      },
      {
        name: 'thumb-label',
        props: {
          value: 'number | string',
        },
        source: 'v-slider',
        description: {
          en: 'Replaces the content inside the thumb label',
        },
      },
    ],
  },
  'v-rating': {
    props: [
      {
        name: 'backgroundColor',
        type: 'string',
        default: "'accent'",
        source: 'v-rating',
        description: {
          en: 'The color used empty icons',
        },
      },
      {
        name: 'clearable',
        type: 'boolean',
        default: 'false',
        source: 'v-rating',
        description: {
          en: 'Allows for the component to be cleared. Triggers when the icon containing the current value is clicked.',
        },
      },
      {
        name: 'closeDelay',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'delayable',
        description: {
          en: 'Milliseconds to wait before closing component.',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: "'primary'",
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-rating',
        description: {
          en: 'Icons have a smaller size',
        },
      },
      {
        name: 'emptyIcon',
        type: 'string',
        default: "'$ratingEmpty'",
        source: 'v-rating',
        description: {
          en: 'The icon displayed when empty',
        },
      },
      {
        name: 'fullIcon',
        type: 'string',
        default: "'$ratingFull'",
        source: 'v-rating',
        description: {
          en: 'The icon displayed when full',
        },
      },
      {
        name: 'halfIcon',
        type: 'string',
        default: "'$ratingHalf'",
        source: 'v-rating',
        description: {
          en: 'The icon displayed when half (requires **half-increments** prop)',
        },
      },
      {
        name: 'halfIncrements',
        type: 'boolean',
        default: 'false',
        source: 'v-rating',
        description: {
          en: 'Allows the selection of half increments',
        },
      },
      {
        name: 'hover',
        type: 'boolean',
        default: 'false',
        source: 'v-rating',
        description: {
          en: 'Provides visual feedback when hovering over icons',
        },
      },
      {
        name: 'large',
        type: 'boolean',
        default: 'false',
        source: 'sizeable',
        description: {
          en: 'Makes the component large.',
        },
      },
      {
        name: 'length',
        type: [
          'number',
          'string',
        ],
        default: 5,
        source: 'v-rating',
        description: {
          en: 'The amount of ratings to show',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'openDelay',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'delayable',
        description: {
          en: 'Milliseconds to wait before opening component.',
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'false',
        source: 'v-rating',
        description: {
          en: 'Removes all hover effects and pointer events',
        },
      },
      {
        name: 'ripple',
        type: [
          'boolean',
          'object',
        ],
        default: true,
        source: 'rippleable',
        description: {
          en: 'Applies the [v-ripple](/directives/ripples) directive.',
        },
      },
      {
        name: 'size',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-rating',
        description: {
          en: 'Sets the height and width of the component.',
        },
      },
      {
        name: 'small',
        type: 'boolean',
        default: 'false',
        source: 'sizeable',
        description: {
          en: 'Makes the component small.',
        },
      },
      {
        name: 'value',
        type: 'number',
        default: 0,
        source: 'v-rating',
        description: {
          en: 'The rating value',
        },
      },
      {
        name: 'xLarge',
        type: 'boolean',
        default: 'false',
        source: 'sizeable',
        description: {
          en: 'Makes the component extra large.',
        },
      },
      {
        name: 'xSmall',
        type: 'boolean',
        default: 'false',
        source: 'sizeable',
        description: {
          en: 'Makes the component extra small.',
        },
      },
    ],
    mixins: [
      'colorable',
      'delayable',
      'rippleable',
      'sizeable',
      'themeable',
    ],
    events: [
      {
        name: 'input',
        value: 'Number',
        description: {
          en: 'Emits the rating number when this value changes',
        },
      },
    ],
    slots: [
      {
        name: 'item',
        props: {
          click: '(i: number) => void',
          index: 'number',
          isFilled: 'boolean',
          isHalfFilled: '?boolean',
          isHalfHovered: '?boolean',
          isHovered: 'boolean',
          value: 'number',
        },
        description: {
          en: 'The slot for rendered items',
        },
      },
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-responsive': {
    props: [
      {
        name: 'aspectRatio',
        type: [
          'string',
          'number',
        ],
        default: 'undefined',
        source: 'v-responsive',
        description: {
          en: 'Sets a base aspect ratio, calculated as width/height. This will only set a **minimum** height, the component can still grow if it has a lot of content.',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the height for the component.',
        },
      },
      {
        name: 'maxHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum height for the component.',
        },
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum width for the component.',
        },
      },
      {
        name: 'minHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum height for the component.',
        },
      },
      {
        name: 'minWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum width for the component.',
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the width for the component.',
        },
      },
    ],
    mixins: [
      'measurable',
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-select': {
    props: [
      {
        name: 'appendIcon',
        type: 'string',
        default: "'$dropdown'",
        source: 'v-input',
        description: {
          en: 'Appends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'appendOuterIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: "Appends an icon to the outside the component's input, uses same syntax as `v-icon`",
        },
      },
      {
        name: 'attach',
        type: 'any',
        default: false,
        source: 'v-select',
        description: {
          en: 'Mixins.Detachable.props.attach',
        },
      },
      {
        name: 'autofocus',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Enables autofocus',
        },
      },
      {
        name: 'backgroundColor',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Changes the background-color of the input',
        },
      },
      {
        name: 'cacheItems',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Keeps a local _unique_ copy of all items that have been passed through the **items** prop.',
        },
      },
      {
        name: 'chips',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Changes display of selections to chips',
        },
      },
      {
        name: 'clearIcon',
        type: 'string',
        default: "'$clear'",
        source: 'v-text-field',
        description: {
          en: 'Applied when using **clearable** and the input is dirty',
        },
      },
      {
        name: 'clearable',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Add input clear functionality, default icon is Material Design Icons **mdi-clear**',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'counter',
        type: [
          'boolean',
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Creates counter for input length; if no number is specified, it defaults to 25. Does not apply any validation.',
        },
      },
      {
        name: 'counterValue',
        type: 'function',
        default: 'null',
        source: 'v-text-field',
        description: {
          en: '',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Components.Inputs.props.dark',
        },
      },
      {
        name: 'deletableChips',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Adds a remove icon to selected chips',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Reduces the input height',
        },
      },
      {
        name: 'disableLookup',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Disables keyboard lookup',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Disables the input',
        },
      },
      {
        name: 'eager',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: '',
        },
      },
      {
        name: 'error',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual error state',
        },
      },
      {
        name: 'errorCount',
        type: [
          'number',
          'string',
        ],
        default: 1,
        source: 'validatable',
        description: {
          en: 'The total number of errors that should display at once',
        },
      },
      {
        name: 'errorMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in an error state and passes through custom error messages. Will be combined with any validations that occur from the **rules** prop. This field will not trigger validation',
        },
      },
      {
        name: 'filled',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Applies the alternate filled input style',
        },
      },
      {
        name: 'filter',
        default: '(item: object, queryText: string, itemText: string): boolean',
        source: 'v-select',
        description: {
          en: 'The function used for filtering items',
        },
      },
      {
        name: 'flat',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Mixins.Soloable.props.flat',
        },
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Designates input type as full-width',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the height of the input',
        },
      },
      {
        name: 'hideDetails',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display",
        },
      },
      {
        name: 'hideSelected',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Do not display in the select menu items that are already selected',
        },
      },
      {
        name: 'hint',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Hint text',
        },
      },
      {
        name: 'id',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the DOM id on the component',
        },
      },
      {
        name: 'itemColor',
        type: 'string',
        default: "'primary'",
        source: 'v-select',
        description: {
          en: 'Sets color of selected items',
        },
      },
      {
        name: 'itemDisabled',
        type: [
          'string',
          'array',
          'function',
        ],
        default: 'disabled',
        source: 'v-select',
        description: {
          en: "Set property of **items**'s disabled value",
        },
      },
      {
        name: 'itemText',
        type: [
          'string',
          'array',
          'function',
        ],
        default: 'text',
        source: 'v-select',
        description: {
          en: "Set property of **items**'s text value",
        },
      },
      {
        name: 'itemValue',
        type: [
          'string',
          'array',
          'function',
        ],
        default: 'value',
        source: 'v-select',
        description: {
          en: "Set property of **items**'s value - **must be primitive**. Dot notation is supported. **Note:** This is currently not supported with `v-combobox` [GitHub Issue](https://github.com/vuetifyjs/vuetify/issues/5479)",
        },
      },
      {
        name: 'items',
        type: 'array',
        default: [],
        source: 'v-select',
        example: {
          text: 'string | number | object',
          value: 'string | number | object',
          disabled: 'boolean',
          divider: 'boolean',
          header: 'string',
        },
        description: {
          en: 'Can be an array of objects or array of strings. When using objects, will look for a text, value and disabled keys. This can be changed using the **item-text**, **item-value** and **item-disabled** props.  Objects that have a **header** or **divider** property are considered special cases and generate a list header or divider; these items are not selectable.',
        },
      },
      {
        name: 'label',
        type: 'string',
        source: 'v-input',
        description: {
          en: 'Sets input label',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'loaderHeight',
        type: [
          'number',
          'string',
        ],
        default: 2,
        source: 'loadable',
        description: {
          en: 'Specifies the height of the loader',
        },
      },
      {
        name: 'loading',
        type: [
          'boolean',
          'string',
        ],
        default: false,
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'menuProps',
        type: [
          'string',
          'array',
          'object',
        ],
        default: '{ "closeOnClick": false, "closeOnContentClick": false, "disableKeys": true, "openOnClick": false, "maxHeight": 304 }',
        source: 'v-select',
        description: {
          en: 'Pass props through to the `v-menu` component. Accepts either a string for boolean props `menu-props="auto, overflowY"`, or an object `:menu-props="{ auto: true, overflowY: true }"`',
        },
      },
      {
        name: 'messages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Displays a list of messages or message if using a string',
        },
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Changes select to multiple. Accepts array for value',
        },
      },
      {
        name: 'noDataText',
        type: 'string',
        default: "'$vuetify.noDataText'",
        source: 'filterable',
        description: {
          en: 'Display text when there is no data',
        },
      },
      {
        name: 'openOnClear',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'When using the **clearable** prop, once cleared, the select menu will either open or stay open, depending on the current state',
        },
      },
      {
        name: 'outlined',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Applies the outlined style to the input',
        },
      },
      {
        name: 'persistentHint',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Forces hint to always be visible',
        },
      },
      {
        name: 'placeholder',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Sets the input’s placeholder text',
        },
      },
      {
        name: 'prefix',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Displays prefix text',
        },
      },
      {
        name: 'prependIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Prepends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'prependInnerIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: "Prepends an icon inside the component's input, uses the same syntax as `v-icon`",
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Puts input in readonly state',
        },
      },
      {
        name: 'returnObject',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Changes the selection behavior to return the object directly rather than the value specified with **item-value**',
        },
      },
      {
        name: 'reverse',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Reverses the input orientation',
        },
      },
      {
        name: 'rounded',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Adds a border radius to the input',
        },
      },
      {
        name: 'rules',
        type: 'array',
        default: [],
        source: 'validatable',
        description: {
          en: 'Accepts an array of functions that take an input value as an argument and return either `true` / `false` or a `string` with an error message',
        },
      },
      {
        name: 'shaped',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Round if `outlined` and increase `border-radius` if `filled`. Must be used with either `outlined` or `filled`',
        },
      },
      {
        name: 'singleLine',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Label does not move on focus/dirty',
        },
      },
      {
        name: 'smallChips',
        type: 'boolean',
        default: 'false',
        source: 'v-select',
        description: {
          en: 'Changes display of selections to chips with the **small** property',
        },
      },
      {
        name: 'solo',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Mixins.Soloable.props.solo',
        },
      },
      {
        name: 'soloInverted',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Mixins.Soloable.props.soloInverted',
        },
      },
      {
        name: 'success',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual success state',
        },
      },
      {
        name: 'successMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in a success state and passes through custom success messages.',
        },
      },
      {
        name: 'suffix',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Displays suffix text',
        },
      },
      {
        name: 'type',
        type: 'string',
        default: "'text'",
        source: 'v-text-field',
        description: {
          en: 'Sets input type',
        },
      },
      {
        name: 'validateOnBlur',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Delays validation until blur event',
        },
      },
      {
        name: 'value',
        type: 'any',
        source: 'v-input',
        description: {
          en: "The input's value",
        },
      },
      {
        name: 'valueComparator',
        type: 'function',
        default: '(a: any, b: any): boolean',
        source: 'v-select',
        description: {
          en: 'The comparison algorithm used for values. [More info](https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/util/helpers.ts)',
        },
      },
    ],
    mixins: [
      'v-text-field',
      'v-input',
      'validatable',
      'colorable',
      'registrable-inject',
      'themeable',
      'intersectable',
      'loadable',
      'comparable',
      'filterable',
    ],
    events: [
      {
        name: 'update:error',
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'The `error.sync` event',
        },
      },
      {
        name: 'click',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when input is clicked',
        },
      },
      {
        name: 'mousedown',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is pressed',
        },
      },
      {
        name: 'mouseup',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is released',
        },
      },
      {
        name: 'click:append',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when appended icon is clicked',
        },
      },
      {
        name: 'click:prepend',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when prepended icon is clicked',
        },
      },
      {
        name: 'blur',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when the input is blurred',
        },
      },
      {
        name: 'click:clear',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when clearable icon clicked',
        },
      },
      {
        name: 'click:append-outer',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when appended outer icon is clicked',
        },
      },
      {
        name: 'click:prepend-inner',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when prepended inner icon is clicked',
        },
      },
      {
        name: 'focus',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when component is focused',
        },
      },
      {
        name: 'change',
        source: 'v-text-field',
        value: 'any',
        description: {
          en: 'Emitted when the input is changed by user interaction',
        },
      },
      {
        name: 'input',
        source: 'v-text-field',
        value: 'any',
        description: {
          en: 'The updated bound model',
        },
      },
      {
        name: 'keydown',
        source: 'v-text-field',
        value: 'KeyboardEvent',
        description: {
          en: 'Emitted when **any** key is pressed',
        },
      },
      {
        name: 'update:search-input',
        source: 'v-select',
        value: 'string',
        description: {
          en: 'The `search-input.sync` event',
        },
      },
      {
        name: 'update:list-index',
        source: 'v-select',
        value: 'number',
        description: {
          en: 'Emitted when menu item is selected using keyboard arrows',
        },
      },
    ],
    slots: [
      {
        name: 'append',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'default',
        source: 'v-input',
        description: {
          en: 'The default Vue slot.',
        },
      },
      {
        name: 'prepend',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'label',
        source: 'v-input',
        description: {
          en: 'Replaces the default label',
        },
      },
      {
        name: 'message',
        props: {
          key: 'number, // the messages index',
          message: 'string, // the message',
        },
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'append-outer',
        source: 'v-text-field',
        description: {
          en: 'Adds an item outside the input and after input content',
        },
      },
      {
        name: 'prepend-inner',
        source: 'v-text-field',
        description: {
          en: 'Adds an item inside the input and before input content',
        },
      },
      {
        name: 'progress',
        source: 'v-text-field',
        description: {
          en: 'Slot for custom progress linear (displayed when **loading** prop is not equal to Boolean False)',
        },
      },
      {
        name: 'append-item',
        source: 'v-select',
        description: {
          en: 'Adds an item after menu content',
        },
      },
      {
        name: 'prepend-item',
        source: 'v-select',
        description: {
          en: 'Adds an item before menu content',
        },
      },
      {
        name: 'item',
        props: {
          parent: 'VueComponent',
          item: 'object',
          on: 'object // Only needed when providing your own v-list-item',
          attrs: 'object // Only needed when providing your own v-list-item',
        },
        source: 'v-select',
        description: {
          en: 'Define a custom item appearance',
        },
      },
      {
        name: 'no-data',
        source: 'v-select',
        description: {
          en: '',
        },
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
        description: {
          en: 'Define a custom selection appearance',
        },
      },
    ],
  },
  'v-skeleton-loader': {
    props: [
      {
        name: 'boilerplate',
        type: 'boolean',
        default: 'false',
        source: 'v-skeleton-loader',
        description: {
          en: 'Remove the loading animation from the skeleton',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'elevation',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'elevatable',
        description: {
          en: 'Designates an elevation applied to the component between 0 and 24. You can find more information on the [elevation page](/styles/elevation).',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the height for the component.',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        source: 'v-skeleton-loader',
        description: {
          en: 'Applies a loading animation with a on-hover loading cursor. A value of **false** will only work when there is content in the `default` slot.',
        },
      },
      {
        name: 'maxHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum height for the component.',
        },
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum width for the component.',
        },
      },
      {
        name: 'minHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum height for the component.',
        },
      },
      {
        name: 'minWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum width for the component.',
        },
      },
      {
        name: 'tile',
        type: 'boolean',
        default: 'false',
        source: 'v-skeleton-loader',
        description: {
          en: '',
        },
      },
      {
        name: 'transition',
        type: 'string',
        default: 'undefined',
        source: 'v-skeleton-loader',
        description: {
          en: '',
        },
      },
      {
        name: 'type',
        type: 'string',
        default: 'undefined',
        source: 'v-skeleton-loader',
        options: {
          actions: 'button@2',
          article: 'heading, paragraph',
          avatar: 'avatar',
          button: 'button',
          card: 'image, card-heading',
          'card-avatar': 'image, list-item-avatar',
          'card-heading': 'heading',
          chip: 'chip',
          'date-picker': 'list-item, card-heading, divider, date-picker-options, date-picker-days, actions',
          'date-picker-options': 'text, avatar@2',
          'date-picker-days': 'avatar@28',
          heading: 'heading',
          image: 'image',
          'list-item': 'text',
          'list-item-avatar': 'avatar, text',
          'list-item-two-line': 'sentences',
          'list-item-avatar-two-line': 'avatar, sentences',
          'list-item-three-line': 'paragraph',
          'list-item-avatar-three-line': 'avatar, paragraph',
          paragraph: 'text@3',
          sentences: 'text@2',
          table: 'table-heading, table-thead, table-tbody, table-tfoot',
          'table-heading': 'heading, text',
          'table-thead': 'heading@6',
          'table-tbody': 'table-row-divider@6',
          'table-row-divider': 'table-row, divider',
          'table-row': 'table-cell@6',
          'table-cell': 'text',
          'table-tfoot': 'text@2, avatar@2',
          text: 'text',
        },
        description: {
          en: 'A string delimited list of skeleton components to create such as `type="text@3"` or `type="card, list-item"`. Will recursively generate a corresponding skeleton from the provided string. Also supports short-hand for multiple elements such as **article@3** and **paragraph@2** which will generate 3 _article_ skeletons and 2 _paragraph_ skeletons. Please see below for a list of available pre-defined options.',
        },
      },
      {
        name: 'types',
        type: 'object',
        default: {},
        source: 'v-skeleton-loader',
        description: {
          en: 'A custom types object that will be combined with the pre-defined options. For a list of available pre-defined options, see the **type** prop.',
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the width for the component.',
        },
      },
    ],
    mixins: [
      'elevatable',
      'measurable',
      'themeable',
    ],
  },
  'v-slider': {
    props: [
      {
        name: 'appendIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Appends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'backgroundColor',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Changes the background-color of the input',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Reduces the input height',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Disable the input',
        },
      },
      {
        name: 'error',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual error state',
        },
      },
      {
        name: 'errorCount',
        type: [
          'number',
          'string',
        ],
        default: 1,
        source: 'validatable',
        description: {
          en: 'The total number of errors that should display at once',
        },
      },
      {
        name: 'errorMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in an error state and passes through custom error messages. Will be combined with any validations that occur from the **rules** prop. This field will not trigger validation',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the height of the input',
        },
      },
      {
        name: 'hideDetails',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display",
        },
      },
      {
        name: 'hint',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Hint text',
        },
      },
      {
        name: 'id',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the DOM id on the component',
        },
      },
      {
        name: 'inverseLabel',
        type: 'boolean',
        default: 'false',
        source: 'v-slider',
        description: {
          en: 'Reverse the label position. Works with **rtl**.',
        },
      },
      {
        name: 'label',
        type: 'string',
        source: 'v-input',
        description: {
          en: 'Sets input label',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'loaderHeight',
        type: [
          'number',
          'string',
        ],
        default: 2,
        source: 'loadable',
        description: {
          en: 'Specifies the height of the loader',
        },
      },
      {
        name: 'loading',
        type: [
          'boolean',
          'string',
        ],
        default: false,
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'max',
        type: [
          'number',
          'string',
        ],
        default: 100,
        source: 'v-slider',
        description: {
          en: 'Sets the maximum allowed value',
        },
      },
      {
        name: 'messages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Displays a list of messages or message if using a string',
        },
      },
      {
        name: 'min',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'v-slider',
        description: {
          en: 'Sets the minimum allowed value',
        },
      },
      {
        name: 'persistentHint',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Forces hint to always be visible',
        },
      },
      {
        name: 'prependIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Prepends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Puts input in readonly state',
        },
      },
      {
        name: 'rules',
        type: 'array',
        default: [],
        source: 'validatable',
        description: {
          en: 'Accepts an array of functions that take an input value as an argument and return either `true` / `false` or a `string` with an error message',
        },
      },
      {
        name: 'step',
        type: [
          'number',
          'string',
        ],
        default: 1,
        source: 'v-slider',
        description: {
          en: 'If greater than 0, sets step interval for ticks',
        },
      },
      {
        name: 'success',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual success state',
        },
      },
      {
        name: 'successMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in a success state and passes through custom success messages.',
        },
      },
      {
        name: 'thumbColor',
        type: 'string',
        default: 'undefined',
        source: 'v-slider',
        description: {
          en: 'Sets the thumb and thumb label color',
        },
      },
      {
        name: 'thumbLabel',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-slider',
        description: {
          en: "Show thumb label. If `true` it shows label when using slider. If set to `'always'` it always shows label.",
        },
      },
      {
        name: 'thumbSize',
        type: [
          'number',
          'string',
        ],
        default: 32,
        source: 'v-slider',
        description: {
          en: 'Controls the size of the thumb label.',
        },
      },
      {
        name: 'tickLabels',
        type: 'array',
        default: [],
        source: 'v-slider',
        description: {
          en: 'When provided with Array<string>, will attempt to map the labels to each step in index order',
        },
      },
      {
        name: 'tickSize',
        type: [
          'number',
          'string',
        ],
        default: 2,
        source: 'v-slider',
        description: {
          en: 'Controls the size of **ticks**',
        },
      },
      {
        name: 'ticks',
        type: [
          'boolean',
          'string',
        ],
        default: false,
        source: 'v-slider',
        description: {
          en: "Show track ticks. If `true` it shows ticks when using slider. If set to `'always'` it always shows ticks.",
        },
      },
      {
        name: 'trackColor',
        type: 'string',
        default: 'undefined',
        source: 'v-slider',
        description: {
          en: "Sets the track's color",
        },
      },
      {
        name: 'trackFillColor',
        type: 'string',
        default: 'undefined',
        source: 'v-slider',
        description: {
          en: "Sets the track's fill color",
        },
      },
      {
        name: 'validateOnBlur',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Delays validation until blur event',
        },
      },
      {
        name: 'value',
        type: 'any',
        source: 'v-input',
        description: {
          en: "The input's value",
        },
      },
      {
        name: 'vertical',
        type: 'boolean',
        default: 'false',
        source: 'v-slider',
        description: {
          en: 'Changes slider direction to vertical',
        },
      },
    ],
    mixins: [
      'loadable',
    ],
    events: [
      {
        name: 'update:error',
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'The `error.sync` event',
        },
      },
      {
        name: 'click',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when input is clicked',
        },
      },
      {
        name: 'mousedown',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is pressed',
        },
      },
      {
        name: 'mouseup',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is released',
        },
      },
      {
        name: 'click:append',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when appended icon is clicked',
        },
      },
      {
        name: 'click:prepend',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when prepended icon is clicked',
        },
      },
      {
        name: 'start',
        source: 'v-slider',
        value: 'number',
        description: {
          en: 'Slider value emitted at start of slider movement',
        },
      },
      {
        name: 'end',
        source: 'v-slider',
        value: 'number',
        description: {
          en: 'Slider value emitted at the end of slider movement',
        },
      },
    ],
    slots: [
      {
        name: 'append',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'default',
        source: 'v-input',
        description: {
          en: 'The default Vue slot.',
        },
      },
      {
        name: 'prepend',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'label',
        source: 'v-input',
        description: {
          en: 'Replaces the default label',
        },
      },
      {
        name: 'message',
        props: {
          key: 'number, // the messages index',
          message: 'string, // the message',
        },
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'progress',
        source: 'v-slider',
        description: {
          en: 'Slot for custom progress linear (displayed when **loading** prop is not equal to Boolean False)',
        },
      },
      {
        name: 'thumb-label',
        props: {
          value: 'number | string',
        },
        source: 'v-slider',
        description: {
          en: 'Replaces the content inside the thumb label',
        },
      },
    ],
  },
  'v-slide-group': {
    props: [
      {
        name: 'activeClass',
        type: 'string',
        default: "'v-slide-item--active'",
        source: 'base-item-group',
        description: {
          en: 'The **active-class** applied to children when they are activated.',
        },
      },
      {
        name: 'centerActive',
        type: 'boolean',
        default: 'false',
        source: 'base-slide-group',
        description: {
          en: 'Forces the selected component to be centered',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'mandatory',
        type: 'boolean',
        default: 'false',
        source: 'base-item-group',
        description: {
          en: 'Forces a value to always be selected (if available).',
        },
      },
      {
        name: 'max',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'base-item-group',
        description: {
          en: 'Sets a maximum number of selections that can be made.',
        },
      },
      {
        name: 'mobileBreakpoint',
        type: [
          'number',
          'string',
        ],
        source: 'mobile',
        description: {
          en: '',
        },
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        source: 'base-item-group',
        description: {
          en: 'Allow multiple selections. The **value** prop must be an _array_.',
        },
      },
      {
        name: 'nextIcon',
        type: 'string',
        default: "'$next'",
        source: 'base-slide-group',
        description: {
          en: 'The appended slot when arrows are shown',
        },
      },
      {
        name: 'prevIcon',
        type: 'string',
        default: "'$prev'",
        source: 'base-slide-group',
        description: {
          en: 'The prepended slot when arrows are shown',
        },
      },
      {
        name: 'showArrows',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'base-slide-group',
        description: {
          en: 'Change when the overflow arrow indicators are shown. By **default**, arrows *always* display on Desktop when the container is overflowing. When the container overflows on mobile, arrows are not shown by default. A **show-arrows** value of `true` allows these arrows to show on Mobile if the container overflowing. A value of `desktop` *always* displays arrows on Desktop while a value of `mobile` always displays arrows on Mobile. A value of `always` always displays arrows on Desktop *and* Mobile. Find more information on how to customize breakpoint thresholds on the [breakpoints page](/customizing/breakpoints).',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'proxyable',
        description: {
          en: 'The designated model value for the component.',
        },
      },
    ],
    mixins: [
      'base-item-group',
      'proxyable',
      'themeable',
      'mobile',
    ],
    events: [
      {
        name: 'change',
        value: 'any[] | any',
        description: {
          en: 'Emitted when the component value is changed by user interaction',
        },
      },
      {
        name: 'click:location',
        value: 'void',
        description: {
          en: 'Emitted when a slide item is selected inside of the slide group',
        },
      },
    ],
    slots: [
      {
        name: 'next',
        description: {
          en: 'The next slot',
        },
      },
      {
        name: 'prev',
        description: {
          en: 'The prev slot',
        },
      },
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-slide-item': {
    props: [
      {
        name: 'activeClass',
        type: 'string',
        source: 'groupable',
        description: {
          en: 'Mixins.Routable.props.activeClass',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'groupable',
        description: {
          en: 'Mixins.Routable.props.disabled',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'groupable',
        description: {
          en: 'The value used when the component is selected in a group. If not provided, the index will be used.',
        },
      },
    ],
    mixins: [
      'groupable',
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-snackbar': {
    props: [
      {
        name: 'absolute',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Applies **position: absolute** to the component.',
        },
      },
      {
        name: 'app',
        type: 'boolean',
        default: 'false',
        source: 'v-snackbar',
        description: {
          en: 'Respects boundaries of—and will not overlap with—other `app` components like `v-app-bar`, `v-navigation-drawer`, and `v-footer`.',
        },
      },
      {
        name: 'bottom',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the component towards the bottom.',
        },
      },
      {
        name: 'centered',
        type: 'boolean',
        default: 'false',
        source: 'v-snackbar',
        description: {
          en: 'Positions the snackbar in the center of the screen, (x and y axis).',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'contentClass',
        type: 'string',
        default: 'undefined',
        source: 'v-snackbar',
        description: {
          en: 'Apply a custom class to the snackbar content',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'elevation',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'elevatable',
        description: {
          en: 'Designates an elevation applied to the component between 0 and 24. You can find more information on the [elevation page](/styles/elevation).',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the height for the component.',
        },
      },
      {
        name: 'left',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the component towards the left.',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'maxHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum height for the component.',
        },
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum width for the component.',
        },
      },
      {
        name: 'minHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum height for the component.',
        },
      },
      {
        name: 'minWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum width for the component.',
        },
      },
      {
        name: 'multiLine',
        type: 'boolean',
        default: 'false',
        source: 'v-snackbar',
        description: {
          en: 'Gives the snackbar a larger minimum height.',
        },
      },
      {
        name: 'outlined',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
        description: {
          en: 'Removes elevation (box-shadow) and adds a *thin* border.',
        },
      },
      {
        name: 'right',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the component towards the right.',
        },
      },
      {
        name: 'rounded',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'roundable',
        description: {
          en: 'Designates the **border-radius** applied to the component. You can find more information on the [Border Radius page](/styles/border-radius).',
        },
      },
      {
        name: 'shaped',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
        description: {
          en: 'Applies a large border radius on the top left and bottom right of the card.',
        },
      },
      {
        name: 'tag',
        type: 'string',
        default: "'div'",
        source: 'v-sheet',
        description: {
          en: 'Specify a custom tag used on the root element.',
        },
      },
      {
        name: 'text',
        type: 'boolean',
        default: 'false',
        source: 'v-snackbar',
        description: {
          en: '',
        },
      },
      {
        name: 'tile',
        type: 'boolean',
        default: 'false',
        source: 'roundable',
        description: {
          en: "Removes the component's **border-radius**.",
        },
      },
      {
        name: 'timeout',
        type: [
          'number',
          'string',
        ],
        default: 5000,
        source: 'v-snackbar',
        description: {
          en: 'Time (in milliseconds) to wait until snackbar is automatically hidden.  Use `-1` to keep open indefinitely (`0` in version < 2.3 ). It is recommended for this number to be between `4000` and `10000`. Changes to this property will reset the timeout.',
        },
      },
      {
        name: 'top',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the content towards the top.',
        },
      },
      {
        name: 'transition',
        type: [
          'boolean',
          'string',
        ],
        default: 'v-snack-transition',
        source: 'v-snackbar',
        description: {
          en: '',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'toggleable',
        description: {
          en: 'Controls whether the component is visible or hidden.',
        },
      },
      {
        name: 'vertical',
        type: 'boolean',
        default: 'false',
        source: 'v-snackbar',
        description: {
          en: 'Stacks snackbar content on top of the actions (button).',
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the width for the component.',
        },
      },
    ],
    mixins: [
      'v-sheet',
      'colorable',
      'elevatable',
      'measurable',
      'roundable',
      'themeable',
      'colorable',
      'toggleable',
      'positionable',
    ],
    events: [
      {
        name: 'input',
        value: 'boolean',
        description: {
          en: 'The updated bound model',
        },
      },
    ],
    slots: [
      {
        name: 'action',
        props: {
          attrs: 'object',
        },
        description: {
          en: 'Used to bind styles to [v-btn](/components/buttons) to match MD2 specification.',
        },
      },
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-sparkline': {
    props: [
      {
        name: 'autoDraw',
        type: 'boolean',
        default: 'false',
        source: 'v-sparkline',
        description: {
          en: 'Trace the length of the line when first rendered',
        },
      },
      {
        name: 'autoDrawDuration',
        type: 'number',
        default: 2000,
        source: 'v-sparkline',
        description: {
          en: 'Amount of time (in ms) to run the trace animation',
        },
      },
      {
        name: 'autoDrawEasing',
        type: 'string',
        default: "'ease'",
        source: 'v-sparkline',
        description: {
          en: 'The easing function to use for the trace animation',
        },
      },
      {
        name: 'autoLineWidth',
        type: 'boolean',
        default: 'false',
        source: 'v-sparkline',
        description: {
          en: 'Automatically expand bars to use space eficiently',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: "'primary'",
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'fill',
        type: 'boolean',
        default: 'false',
        source: 'v-sparkline',
        description: {
          en: 'Using the **fill** property allows you to better customize the look and feel of your sparkline.',
        },
      },
      {
        name: 'gradient',
        type: 'array',
        default: [],
        source: 'v-sparkline',
        description: {
          en: 'An array of colors to use as a linear-gradient',
        },
      },
      {
        name: 'gradientDirection',
        type: 'string',
        default: "'top'",
        source: 'v-sparkline',
        description: {
          en: 'The direction the gradient should run',
        },
      },
      {
        name: 'height',
        type: [
          'string',
          'number',
        ],
        default: 75,
        source: 'v-sparkline',
        description: {
          en: 'Height of the SVG trendline or bars',
        },
      },
      {
        name: 'labelSize',
        type: [
          'number',
          'string',
        ],
        default: 7,
        source: 'v-sparkline',
        description: {
          en: 'The label font size',
        },
      },
      {
        name: 'labels',
        type: 'array',
        default: [],
        source: 'v-sparkline',
        description: {
          en: 'An array of string labels that correspond to the same index as its data counterpart',
        },
      },
      {
        name: 'lineWidth',
        type: [
          'string',
          'number',
        ],
        default: 4,
        source: 'v-sparkline',
        description: {
          en: 'The thickness of the line, in px',
        },
      },
      {
        name: 'padding',
        type: [
          'string',
          'number',
        ],
        default: 8,
        source: 'v-sparkline',
        description: {
          en: 'Low `smooth` or high `line-width` values may result in cropping, increase padding to compensate',
        },
      },
      {
        name: 'showLabels',
        type: 'boolean',
        default: 'false',
        source: 'v-sparkline',
        description: {
          en: 'Show labels below each data point',
        },
      },
      {
        name: 'smooth',
        type: [
          'boolean',
          'number',
          'string',
        ],
        default: false,
        source: 'v-sparkline',
        description: {
          en: 'Number of px to use as a corner radius. `true` defaults to 8, `false` is 0',
        },
      },
      {
        name: 'type',
        type: 'string',
        default: "'trend'",
        source: 'v-sparkline',
        description: {
          en: 'Choose between a trendline or bars',
        },
      },
      {
        name: 'value',
        type: 'array',
        default: [],
        source: 'v-sparkline',
        description: {
          en: 'An array of numbers.',
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 300,
        source: 'v-sparkline',
        description: {
          en: 'Width of the SVG trendline or bars',
        },
      },
    ],
    mixins: [
      'colorable',
    ],
    slots: [
      {
        name: 'label',
        description: {
          en: 'Replaces the default label',
        },
      },
    ],
  },
  'v-speed-dial': {
    props: [
      {
        name: 'absolute',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Applies **position: absolute** to the component.',
        },
      },
      {
        name: 'bottom',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the component towards the bottom.',
        },
      },
      {
        name: 'direction',
        type: 'string',
        default: "'top'",
        source: 'v-speed-dial',
        description: {
          en: 'Direction in which speed-dial content will show. Possible values are `top`, `bottom`, `left`, `right`.',
        },
      },
      {
        name: 'fixed',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Applies **position: fixed** to the component.',
        },
      },
      {
        name: 'left',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the component towards the left.',
        },
      },
      {
        name: 'mode',
        type: 'string',
        default: 'undefined',
        source: 'transitionable',
        description: {
          en: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
        },
      },
      {
        name: 'openOnHover',
        type: 'boolean',
        default: 'false',
        source: 'v-speed-dial',
        description: {
          en: 'Opens speed-dial on hover',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: 'undefined',
        source: 'transitionable',
        description: {
          en: 'Sets the transition origin on the element. You can find more information on the MDN documentation [for transition origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin).',
        },
      },
      {
        name: 'right',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the component towards the right.',
        },
      },
      {
        name: 'top',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the content towards the top.',
        },
      },
      {
        name: 'transition',
        type: 'string',
        default: "'scale-transition'",
        source: 'transitionable',
        description: {
          en: 'Sets the component transition. Can be one of the [built in transitions](/styles/transitions) or one your own.',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'toggleable',
        description: {
          en: 'Controls whether the component is visible or hidden.',
        },
      },
    ],
    mixins: [
      'positionable',
      'toggleable',
      'transitionable',
    ],
    slots: [
      {
        name: 'activator',
        description: {
          en: 'When used, will activate the component when clicked (or hover for specific components). This manually stops the event propagation. Without this slot, if you open the component through its model, you will need to manually stop the event propagation',
        },
      },
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-stepper': {
    props: [
      {
        name: 'altLabels',
        type: 'boolean',
        default: 'false',
        source: 'v-stepper',
        description: {
          en: 'Places the labels beneath the step',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'nonLinear',
        type: 'boolean',
        default: 'false',
        source: 'v-stepper',
        description: {
          en: 'Allow user to jump to any step',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'proxyable',
        description: {
          en: 'The designated model value for the component.',
        },
      },
      {
        name: 'vertical',
        type: 'boolean',
        default: 'false',
        source: 'v-stepper',
        description: {
          en: 'Display steps vertically',
        },
      },
    ],
    mixins: [
      'registrable-provide',
      'proxyable',
      'themeable',
    ],
    events: [
      {
        name: 'change',
        value: 'number',
        description: {
          en: 'Emitted when step is changed by user interaction',
        },
      },
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-stepper-content': {
    props: [
      {
        name: 'step',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-stepper-content',
        description: {
          en: 'Sets step to associate the content to',
        },
      },
    ],
    mixins: [
      'registrable-inject',
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-stepper-step': {
    props: [
      {
        name: 'color',
        type: 'string',
        default: "'primary'",
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'complete',
        type: 'boolean',
        default: 'false',
        source: 'v-stepper-step',
        description: {
          en: '',
        },
      },
      {
        name: 'completeIcon',
        type: 'string',
        default: "'$complete'",
        source: 'v-stepper-step',
        description: {
          en: '',
        },
      },
      {
        name: 'editIcon',
        type: 'string',
        default: "'$edit'",
        source: 'v-stepper-step',
        description: {
          en: '',
        },
      },
      {
        name: 'editable',
        type: 'boolean',
        default: 'false',
        source: 'v-stepper-step',
        description: {
          en: '',
        },
      },
      {
        name: 'errorIcon',
        type: 'string',
        default: "'$error'",
        source: 'v-stepper-step',
        description: {
          en: '',
        },
      },
      {
        name: 'rules',
        type: 'array',
        default: [],
        source: 'v-stepper-step',
        description: {
          en: '',
        },
      },
      {
        name: 'step',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-stepper-step',
        description: {
          en: 'Content to display inside step circle',
        },
      },
    ],
    mixins: [
      'colorable',
      'registrable-inject',
    ],
    events: [
      {
        name: 'click',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when component is clicked',
        },
      },
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-stepper-header': {
    props: [],
    mixins: [],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-stepper-items': {
    props: [],
    mixins: [],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-subheader': {
    props: [
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'inset',
        type: 'boolean',
        default: 'false',
        source: 'v-subheader',
        description: {
          en: 'Adds indentation (72px)',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
    ],
    mixins: [
      'themeable',
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-switch': {
    props: [
      {
        name: 'appendIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Appends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'backgroundColor',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Changes the background-color of the input',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Reduces the input height',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Disable the input',
        },
      },
      {
        name: 'error',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual error state',
        },
      },
      {
        name: 'errorCount',
        type: [
          'number',
          'string',
        ],
        default: 1,
        source: 'validatable',
        description: {
          en: 'The total number of errors that should display at once',
        },
      },
      {
        name: 'errorMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in an error state and passes through custom error messages. Will be combined with any validations that occur from the **rules** prop. This field will not trigger validation',
        },
      },
      {
        name: 'falseValue',
        type: 'any',
        default: 'undefined',
        source: 'selectable',
        description: {
          en: 'Sets value for falsy state',
        },
      },
      {
        name: 'flat',
        type: 'boolean',
        default: 'false',
        source: 'v-switch',
        description: {
          en: '',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the height of the input',
        },
      },
      {
        name: 'hideDetails',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display",
        },
      },
      {
        name: 'hint',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Hint text',
        },
      },
      {
        name: 'id',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the DOM id on the component',
        },
      },
      {
        name: 'inputValue',
        type: 'any',
        default: 'undefined',
        source: 'selectable',
        description: {
          en: '',
        },
      },
      {
        name: 'inset',
        type: 'boolean',
        default: 'false',
        source: 'v-switch',
        description: {
          en: '',
        },
      },
      {
        name: 'label',
        type: 'string',
        source: 'v-input',
        description: {
          en: 'Sets input label',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'loading',
        type: [
          'boolean',
          'string',
        ],
        default: false,
        source: 'v-input',
        description: {
          en: "Displays circular progress bar. Can either be a String which specifies which color is applied to the progress bar (any material color or theme color - primary, secondary, success, info, warning, error) or a Boolean which uses the component color (set by color prop - if it's supported by the component) or the primary color",
        },
      },
      {
        name: 'messages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Displays a list of messages or message if using a string',
        },
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        source: 'selectable',
        description: {
          en: '',
        },
      },
      {
        name: 'persistentHint',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Forces hint to always be visible',
        },
      },
      {
        name: 'prependIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Prepends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Puts input in readonly state',
        },
      },
      {
        name: 'ripple',
        type: [
          'boolean',
          'object',
        ],
        default: true,
        source: 'rippleable',
        description: {
          en: 'Applies the [v-ripple](/directives/ripples) directive.',
        },
      },
      {
        name: 'rules',
        type: 'array',
        default: [],
        source: 'validatable',
        description: {
          en: 'Accepts an array of functions that take an input value as an argument and return either `true` / `false` or a `string` with an error message',
        },
      },
      {
        name: 'success',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual success state',
        },
      },
      {
        name: 'successMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in a success state and passes through custom success messages.',
        },
      },
      {
        name: 'trueValue',
        type: 'any',
        default: 'undefined',
        source: 'selectable',
        description: {
          en: 'Sets value for truthy state',
        },
      },
      {
        name: 'validateOnBlur',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Delays validation until blur event',
        },
      },
      {
        name: 'value',
        type: 'any',
        source: 'v-input',
        description: {
          en: "The input's value",
        },
      },
      {
        name: 'valueComparator',
        type: 'function',
        default: 'null',
        source: 'comparable',
        description: {
          en: 'Apply a custom value comparator function',
        },
      },
    ],
    mixins: [
      'v-input',
      'validatable',
      'colorable',
      'registrable-inject',
      'themeable',
      'rippleable',
      'comparable',
    ],
    events: [
      {
        name: 'update:error',
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'The `error.sync` event',
        },
      },
      {
        name: 'change',
        value: 'any',
        description: {
          en: '',
        },
      },
      {
        name: 'mousedown',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is pressed',
        },
      },
      {
        name: 'mouseup',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is released',
        },
      },
      {
        name: 'click:append',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when appended icon is clicked',
        },
      },
      {
        name: 'click:prepend',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when prepended icon is clicked',
        },
      },
    ],
    slots: [
      {
        name: 'append',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'default',
        source: 'v-input',
        description: {
          en: 'The default Vue slot.',
        },
      },
      {
        name: 'prepend',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'label',
        source: 'v-input',
        description: {
          en: 'Replaces the default label',
        },
      },
      {
        name: 'message',
        props: {
          key: 'number, // the messages index',
          message: 'string, // the message',
        },
        source: 'v-input',
        description: {
          en: '',
        },
      },
    ],
  },
  'v-system-bar': {
    props: [
      {
        name: 'absolute',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Applies **position: absolute** to the component.',
        },
      },
      {
        name: 'app',
        type: 'boolean',
        default: 'false',
        source: 'applicationable',
        description: {
          en: 'Designates the component as part of the application layout. Used for dynamically adjusting content sizing. Components using this prop should reside **outside** of `v-main` component to function properly. You can more information about layouts on the [application page](/components/application). **Note:** this prop automatically applies **position: fixed** to the layout element. You can overwrite this functionality by using the `absolute` prop',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'fixed',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Applies **position: fixed** to the component.',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-system-bar',
        description: {
          en: '',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'lightsOut',
        type: 'boolean',
        default: 'false',
        source: 'v-system-bar',
        description: {
          en: 'Reduces the system bar opacity.',
        },
      },
      {
        name: 'window',
        type: 'boolean',
        default: 'false',
        source: 'v-system-bar',
        description: {
          en: 'Increases the system bar height to 32px (24px default).',
        },
      },
    ],
    mixins: [
      'applicationable',
      'positionable',
      'colorable',
      'themeable',
    ],
  },
  'v-tabs': {
    props: [
      {
        name: 'activeClass',
        type: 'string',
        default: 'undefined',
        source: 'v-tabs',
        description: {
          en: 'Mixins.BaseItemGroup.props.activeClass',
        },
      },
      {
        name: 'alignWithTitle',
        type: 'boolean',
        default: 'false',
        source: 'v-tabs',
        description: {
          en: 'Make `v-tabs` lined up with the toolbar title',
        },
      },
      {
        name: 'backgroundColor',
        type: 'string',
        default: 'undefined',
        source: 'v-tabs',
        description: {
          en: 'Changes the background color of the component.',
        },
      },
      {
        name: 'centerActive',
        type: 'boolean',
        default: 'false',
        source: 'v-tabs',
        description: {
          en: 'Forces the selected tab to be centered',
        },
      },
      {
        name: 'centered',
        type: 'boolean',
        default: 'false',
        source: 'v-tabs',
        description: {
          en: 'Centers the tabs',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Mixins.Themeable.props.dark',
        },
      },
      {
        name: 'fixedTabs',
        type: 'boolean',
        default: 'false',
        source: 'v-tabs',
        description: {
          en: '`v-tabs-item` min-width 160px, max-width 360px',
        },
      },
      {
        name: 'grow',
        type: 'boolean',
        default: 'false',
        source: 'v-tabs',
        description: {
          en: "Force `v-tab`'s to take up all available space",
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-tabs',
        description: {
          en: 'Sets the height of the tabs bar',
        },
      },
      {
        name: 'hideSlider',
        type: 'boolean',
        default: 'false',
        source: 'v-tabs',
        description: {
          en: "Hide's the generated `v-tabs-slider`",
        },
      },
      {
        name: 'iconsAndText',
        type: 'boolean',
        default: 'false',
        source: 'v-tabs',
        description: {
          en: 'Will stack icon and text vertically',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Mixins.Themeable.props.light',
        },
      },
      {
        name: 'mobileBreakpoint',
        type: [
          'string',
          'number',
        ],
        default: 'undefined',
        source: 'v-tabs',
        description: {
          en: '',
        },
      },
      {
        name: 'nextIcon',
        type: 'string',
        default: "'$next'",
        source: 'v-tabs',
        description: {
          en: 'Right pagination icon',
        },
      },
      {
        name: 'optional',
        type: 'boolean',
        default: 'false',
        source: 'v-tabs',
        description: {
          en: 'Does not require an active item. Useful when using `v-tab` as a `router-link`',
        },
      },
      {
        name: 'prevIcon',
        type: 'string',
        default: "'$prev'",
        source: 'v-tabs',
        description: {
          en: 'Left pagination icon',
        },
      },
      {
        name: 'right',
        type: 'boolean',
        default: 'false',
        source: 'v-tabs',
        description: {
          en: 'Aligns tabs to the right',
        },
      },
      {
        name: 'showArrows',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-tabs',
        description: {
          en: 'Show pagination arrows if the tab items overflow their container. For mobile devices, arrows will only display when using this prop.',
        },
      },
      {
        name: 'sliderColor',
        type: 'string',
        default: 'undefined',
        source: 'v-tabs',
        description: {
          en: 'Changes the background color of an auto-generated `v-tabs-slider`',
        },
      },
      {
        name: 'sliderSize',
        type: [
          'number',
          'string',
        ],
        default: 2,
        source: 'v-tabs',
        description: {
          en: 'Changes the size of the slider, **height** for horizontal, **width** for vertical.',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'proxyable',
        description: {
          en: 'The designated model value for the component.',
        },
      },
      {
        name: 'vertical',
        type: 'boolean',
        default: 'false',
        source: 'v-tabs',
        description: {
          en: 'Stacks tabs on top of each other vertically.',
        },
      },
    ],
    mixins: [
      'colorable',
      'proxyable',
      'themeable',
    ],
    events: [
      {
        name: 'change',
        value: 'number',
        description: {
          en: 'Emitted when tab is changed by user interaction',
        },
      },
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-tab': {
    props: [
      {
        name: 'activeClass',
        type: 'string',
        source: 'routable',
        description: {
          en: 'Configure the active CSS class applied when the link is active. You can find more information about the [**active-class** prop](https://router.vuejs.org/api/#active-class) on the vue-router documentation.',
        },
      },
      {
        name: 'append',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Setting **append** prop always appends the relative path to the current path. You can find more information about the [**append** prop](https://router.vuejs.org/api/#append) on the vue-router documentation.',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Removes the ability to click or target the component.',
        },
      },
      {
        name: 'exact',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: "Exactly match the link. Without this, '/' will match every route. You can find more information about the [**exact** prop](https://router.vuejs.org/api/#exact) on the vue-router documentation.",
        },
      },
      {
        name: 'exactActiveClass',
        type: 'string',
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Configure the active CSS class applied when the link is active with exact match. You can find more information about the [**exact-active-class** prop](https://router.vuejs.org/api/#exact-active-class) on the vue-router documentation.',
        },
      },
      {
        name: 'href',
        type: [
          'string',
          'object',
        ],
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Designates the component as anchor and applies the **href** attribute.',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'link',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Designates that the component is a link. This is automatic when using the **href** or **to** prop.',
        },
      },
      {
        name: 'nuxt',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Specifies the link is a `nuxt-link`. For use with the [nuxt framework](https://nuxtjs.org/api/components-nuxt-link/).',
        },
      },
      {
        name: 'replace',
        type: 'boolean',
        default: 'false',
        source: 'routable',
        description: {
          en: 'Setting **replace** prop will call `router.replace()` instead of `router.push()` when clicked, so the navigation will not leave a history record. You can find more information about the [**replace** prop](https://router.vuejs.org/api/#replace) on the vue-router documentation.',
        },
      },
      {
        name: 'ripple',
        type: [
          'boolean',
          'object',
        ],
        default: true,
        source: 'routable',
        description: {
          en: 'Mixins.Rippleable.props.ripple',
        },
      },
      {
        name: 'tag',
        type: 'string',
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Components.Sheets.props.tag',
        },
      },
      {
        name: 'target',
        type: 'string',
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Designates the target attribute. This should only be applied when using the **href** prop.',
        },
      },
      {
        name: 'to',
        type: [
          'string',
          'object',
        ],
        default: 'undefined',
        source: 'routable',
        description: {
          en: 'Denotes the target route of the link. You can find more information about the [**to** prop](https://router.vuejs.org/api/#to) on the vue-router documentation.',
        },
      },
    ],
    mixins: [
      'routable',
      'groupable',
      'themeable',
    ],
    events: [
      {
        name: 'change',
        value: 'void',
        description: {
          en: 'Emitted when tab becomes active',
        },
      },
      {
        name: 'click',
        value: 'ClickEvent',
        description: {
          en: 'Emitted when the component is clicked',
        },
      },
      {
        name: 'keydown',
        value: 'KeyboardEvent',
        description: {
          en: 'Emitted when **enter** key is pressed',
        },
      },
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-tab-item': {
    props: [
      {
        name: 'activeClass',
        type: 'string',
        source: 'groupable',
        description: {
          en: 'Mixins.Routable.props.activeClass',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'groupable',
        description: {
          en: 'Mixins.Routable.props.disabled',
        },
      },
      {
        name: 'eager',
        type: 'boolean',
        default: 'false',
        source: 'bootable',
        description: {
          en: 'Will force the components content to render on mounted. This is useful if you have content that will not be rendered in the DOM that you want crawled for SEO.',
        },
      },
      {
        name: 'id',
        type: 'string',
        default: 'undefined',
        source: 'v-tab-item',
        description: {
          en: 'Sets the DOM id on the component',
        },
      },
      {
        name: 'reverseTransition',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-window-item',
        description: {
          en: '',
        },
      },
      {
        name: 'transition',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-window-item',
        description: {
          en: '',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'v-window-item',
        description: {
          en: 'Sets the value of the tab. If not provided, the index will be used.',
        },
      },
    ],
    mixins: [
      'bootable',
      'groupable',
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-tabs-items': {
    props: [
      {
        name: 'activeClass',
        type: 'string',
        default: "'v-window-item--active'",
        source: 'base-item-group',
        description: {
          en: 'The **active-class** applied to children when they are activated.',
        },
      },
      {
        name: 'continuous',
        type: 'boolean',
        default: 'false',
        source: 'v-window',
        description: {
          en: 'If `true`, window will "wrap around" from the last item to the first, and from the first item to the last',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'mandatory',
        type: 'boolean',
        default: 'false',
        source: 'base-item-group',
        description: {
          en: 'Forces a value to always be selected (if available).',
        },
      },
      {
        name: 'max',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'base-item-group',
        description: {
          en: 'Sets a maximum number of selections that can be made.',
        },
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        source: 'base-item-group',
        description: {
          en: 'Allow multiple selections. The **value** prop must be an _array_.',
        },
      },
      {
        name: 'nextIcon',
        type: [
          'boolean',
          'string',
        ],
        default: '$next',
        source: 'v-window',
        description: {
          en: 'Icon used for the "next" button if `show-arrows` is `true`',
        },
      },
      {
        name: 'prevIcon',
        type: [
          'boolean',
          'string',
        ],
        default: '$prev',
        source: 'v-window',
        description: {
          en: 'Icon used for the "prev" button if `show-arrows` is `true`',
        },
      },
      {
        name: 'reverse',
        type: 'boolean',
        default: 'false',
        source: 'v-window',
        description: {
          en: 'Reverse the normal transition direction.',
        },
      },
      {
        name: 'showArrows',
        type: 'boolean',
        default: 'false',
        source: 'v-window',
        description: {
          en: 'Display the "next" and "prev" buttons',
        },
      },
      {
        name: 'showArrowsOnHover',
        type: 'boolean',
        default: 'false',
        source: 'v-window',
        description: {
          en: 'Display the "next" and "prev" buttons on hover. `show-arrows` MUST ALSO be set.',
        },
      },
      {
        name: 'touch',
        type: 'object',
        default: 'undefined',
        source: 'v-window',
        description: {
          en: 'Provide a custom **left** and **right** function when swiped left or right.',
        },
      },
      {
        name: 'touchless',
        type: 'boolean',
        default: 'false',
        source: 'v-window',
        description: {
          en: 'Disable touch support.',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'proxyable',
        description: {
          en: 'The designated model value for the component.',
        },
      },
      {
        name: 'vertical',
        type: 'boolean',
        default: 'false',
        source: 'v-window',
        description: {
          en: 'Uses a vertical transition when changing windows.',
        },
      },
    ],
    mixins: [
      'proxyable',
      'themeable',
    ],
    events: [
      {
        name: 'change',
        value: 'string',
        description: {
          en: 'Emitted when user swipes between tabs.',
        },
      },
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-tabs-slider': {
    props: [
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
    ],
    mixins: [
      'colorable',
    ],
  },
  'v-textarea': {
    props: [
      {
        name: 'appendIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Appends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'appendOuterIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: "Appends an icon to the outside the component's input, uses same syntax as `v-icon`",
        },
      },
      {
        name: 'autoGrow',
        type: 'boolean',
        default: 'false',
        source: 'v-textarea',
        description: {
          en: 'Automatically grow the textarea depending on amount of text',
        },
      },
      {
        name: 'autofocus',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Enables autofocus',
        },
      },
      {
        name: 'backgroundColor',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Changes the background-color of the input',
        },
      },
      {
        name: 'clearIcon',
        type: 'string',
        default: "'$clear'",
        source: 'v-text-field',
        description: {
          en: 'Applied when using **clearable** and the input is dirty',
        },
      },
      {
        name: 'clearable',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Add input clear functionality, default icon is Material Design Icons **mdi-clear**',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'counter',
        type: [
          'boolean',
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Creates counter for input length; if no number is specified, it defaults to 25. Does not apply any validation.',
        },
      },
      {
        name: 'counterValue',
        type: 'function',
        default: 'null',
        source: 'v-text-field',
        description: {
          en: '',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Reduces the input height',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Disable the input',
        },
      },
      {
        name: 'error',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual error state',
        },
      },
      {
        name: 'errorCount',
        type: [
          'number',
          'string',
        ],
        default: 1,
        source: 'validatable',
        description: {
          en: 'The total number of errors that should display at once',
        },
      },
      {
        name: 'errorMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in an error state and passes through custom error messages. Will be combined with any validations that occur from the **rules** prop. This field will not trigger validation',
        },
      },
      {
        name: 'filled',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Applies the alternate filled input style',
        },
      },
      {
        name: 'flat',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Mixins.Soloable.props.flat',
        },
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Designates input type as full-width',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the height of the input',
        },
      },
      {
        name: 'hideDetails',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display",
        },
      },
      {
        name: 'hint',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Hint text',
        },
      },
      {
        name: 'id',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the DOM id on the component',
        },
      },
      {
        name: 'label',
        type: 'string',
        source: 'v-input',
        description: {
          en: 'Sets input label',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'loaderHeight',
        type: [
          'number',
          'string',
        ],
        default: 2,
        source: 'loadable',
        description: {
          en: 'Specifies the height of the loader',
        },
      },
      {
        name: 'loading',
        type: [
          'boolean',
          'string',
        ],
        default: false,
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'messages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Displays a list of messages or message if using a string',
        },
      },
      {
        name: 'noResize',
        type: 'boolean',
        default: 'false',
        source: 'v-textarea',
        description: {
          en: 'Remove resize handle',
        },
      },
      {
        name: 'outlined',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Applies the outlined style to the input',
        },
      },
      {
        name: 'persistentHint',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Forces hint to always be visible',
        },
      },
      {
        name: 'placeholder',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Sets the input’s placeholder text',
        },
      },
      {
        name: 'prefix',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Displays prefix text',
        },
      },
      {
        name: 'prependIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Prepends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'prependInnerIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: "Prepends an icon inside the component's input, uses the same syntax as `v-icon`",
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Puts input in readonly state',
        },
      },
      {
        name: 'reverse',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Reverses the input orientation',
        },
      },
      {
        name: 'rounded',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Adds a border radius to the input',
        },
      },
      {
        name: 'rowHeight',
        type: [
          'number',
          'string',
        ],
        default: 24,
        source: 'v-textarea',
        description: {
          en: 'Height value for each row. Requires the use of the **auto-grow** prop.',
        },
      },
      {
        name: 'rows',
        type: [
          'number',
          'string',
        ],
        default: 5,
        source: 'v-textarea',
        description: {
          en: 'Default row count',
        },
      },
      {
        name: 'rules',
        type: 'array',
        default: [],
        source: 'validatable',
        description: {
          en: 'Accepts an array of functions that take an input value as an argument and return either `true` / `false` or a `string` with an error message',
        },
      },
      {
        name: 'shaped',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Round if `outlined` and increase `border-radius` if `filled`. Must be used with either `outlined` or `filled`',
        },
      },
      {
        name: 'singleLine',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Label does not move on focus/dirty',
        },
      },
      {
        name: 'solo',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Mixins.Soloable.props.solo',
        },
      },
      {
        name: 'soloInverted',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Mixins.Soloable.props.soloInverted',
        },
      },
      {
        name: 'success',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual success state',
        },
      },
      {
        name: 'successMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in a success state and passes through custom success messages.',
        },
      },
      {
        name: 'suffix',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Displays suffix text',
        },
      },
      {
        name: 'type',
        type: 'string',
        default: "'text'",
        source: 'v-text-field',
        description: {
          en: 'Sets input type',
        },
      },
      {
        name: 'validateOnBlur',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Delays validation until blur event',
        },
      },
      {
        name: 'value',
        type: 'any',
        source: 'v-input',
        description: {
          en: "The input's value",
        },
      },
    ],
    mixins: [
      'v-text-field',
      'v-input',
      'validatable',
      'colorable',
      'registrable-inject',
      'themeable',
      'intersectable',
      'loadable',
    ],
    events: [
      {
        name: 'update:error',
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'The `error.sync` event',
        },
      },
      {
        name: 'click',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when input is clicked',
        },
      },
      {
        name: 'mousedown',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is pressed',
        },
      },
      {
        name: 'mouseup',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is released',
        },
      },
      {
        name: 'click:append',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when appended icon is clicked',
        },
      },
      {
        name: 'click:prepend',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when prepended icon is clicked',
        },
      },
      {
        name: 'blur',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when the input is blurred',
        },
      },
      {
        name: 'click:clear',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when clearable icon clicked',
        },
      },
      {
        name: 'click:append-outer',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when appended outer icon is clicked',
        },
      },
      {
        name: 'click:prepend-inner',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when prepended inner icon is clicked',
        },
      },
      {
        name: 'focus',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when component is focused',
        },
      },
      {
        name: 'change',
        source: 'v-text-field',
        value: 'any',
        description: {
          en: 'Emitted when the input is changed by user interaction',
        },
      },
      {
        name: 'input',
        source: 'v-text-field',
        value: 'any',
        description: {
          en: 'The updated bound model',
        },
      },
      {
        name: 'keydown',
        source: 'v-text-field',
        value: 'KeyboardEvent',
        description: {
          en: 'Emitted when **any** key is pressed',
        },
      },
    ],
    slots: [
      {
        name: 'append',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'default',
        source: 'v-input',
        description: {
          en: 'The default Vue slot.',
        },
      },
      {
        name: 'prepend',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'label',
        source: 'v-input',
        description: {
          en: 'Replaces the default label',
        },
      },
      {
        name: 'message',
        props: {
          key: 'number, // the messages index',
          message: 'string, // the message',
        },
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'append-outer',
        source: 'v-text-field',
        description: {
          en: 'Adds an item outside the input and after input content',
        },
      },
      {
        name: 'prepend-inner',
        source: 'v-text-field',
        description: {
          en: 'Adds an item inside the input and before input content',
        },
      },
      {
        name: 'progress',
        source: 'v-text-field',
        description: {
          en: 'Slot for custom progress linear (displayed when **loading** prop is not equal to Boolean False)',
        },
      },
    ],
  },
  'v-text-field': {
    props: [
      {
        name: 'appendIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Appends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'appendOuterIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: "Appends an icon to the outside the component's input, uses same syntax as `v-icon`",
        },
      },
      {
        name: 'autofocus',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Enables autofocus',
        },
      },
      {
        name: 'backgroundColor',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Changes the background-color of the input',
        },
      },
      {
        name: 'clearIcon',
        type: 'string',
        default: "'$clear'",
        source: 'v-text-field',
        description: {
          en: 'Applied when using **clearable** and the input is dirty',
        },
      },
      {
        name: 'clearable',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Add input clear functionality, default icon is Material Design Icons **mdi-clear**',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'counter',
        type: [
          'boolean',
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Creates counter for input length; if no number is specified, it defaults to 25. Does not apply any validation.',
        },
      },
      {
        name: 'counterValue',
        type: 'function',
        default: 'null',
        source: 'v-text-field',
        description: {
          en: '',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Components.Inputs.props.dark',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Reduces the input height',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Disable the input',
        },
      },
      {
        name: 'error',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual error state',
        },
      },
      {
        name: 'errorCount',
        type: [
          'number',
          'string',
        ],
        default: 1,
        source: 'validatable',
        description: {
          en: 'The total number of errors that should display at once',
        },
      },
      {
        name: 'errorMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in an error state and passes through custom error messages. Will be combined with any validations that occur from the **rules** prop. This field will not trigger validation',
        },
      },
      {
        name: 'filled',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Applies the alternate filled input style',
        },
      },
      {
        name: 'flat',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Mixins.Soloable.props.flat',
        },
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Designates input type as full-width',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the height of the input',
        },
      },
      {
        name: 'hideDetails',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-input',
        description: {
          en: "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display",
        },
      },
      {
        name: 'hint',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Hint text',
        },
      },
      {
        name: 'id',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Sets the DOM id on the component',
        },
      },
      {
        name: 'label',
        type: 'string',
        source: 'v-input',
        description: {
          en: 'Sets input label',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'loaderHeight',
        type: [
          'number',
          'string',
        ],
        default: 2,
        source: 'loadable',
        description: {
          en: 'Specifies the height of the loader',
        },
      },
      {
        name: 'loading',
        type: [
          'boolean',
          'string',
        ],
        default: false,
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'messages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Displays a list of messages or message if using a string',
        },
      },
      {
        name: 'outlined',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Applies the outlined style to the input',
        },
      },
      {
        name: 'persistentHint',
        type: 'boolean',
        default: 'false',
        source: 'v-input',
        description: {
          en: 'Forces hint to always be visible',
        },
      },
      {
        name: 'placeholder',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Sets the input’s placeholder text',
        },
      },
      {
        name: 'prefix',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Displays prefix text',
        },
      },
      {
        name: 'prependIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-input',
        description: {
          en: 'Prepends an icon to the component, uses the same syntax as `v-icon`',
        },
      },
      {
        name: 'prependInnerIcon',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: "Prepends an icon inside the component's input, uses the same syntax as `v-icon`",
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: false,
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'Puts input in readonly state',
        },
      },
      {
        name: 'reverse',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Reverses the input orientation',
        },
      },
      {
        name: 'rounded',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Adds a border radius to the input',
        },
      },
      {
        name: 'rules',
        type: 'array',
        default: [],
        source: 'validatable',
        description: {
          en: 'Accepts an array of functions that take an input value as an argument and return either `true` / `false` or a `string` with an error message',
        },
      },
      {
        name: 'shaped',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Round if `outlined` and increase `border-radius` if `filled`. Must be used with either `outlined` or `filled`',
        },
      },
      {
        name: 'singleLine',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Label does not move on focus/dirty',
        },
      },
      {
        name: 'solo',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Mixins.Soloable.props.solo',
        },
      },
      {
        name: 'soloInverted',
        type: 'boolean',
        default: 'false',
        source: 'v-text-field',
        description: {
          en: 'Mixins.Soloable.props.soloInverted',
        },
      },
      {
        name: 'success',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Puts the input in a manual success state',
        },
      },
      {
        name: 'successMessages',
        type: [
          'string',
          'array',
        ],
        default: [],
        source: 'validatable',
        description: {
          en: 'Puts the input in a success state and passes through custom success messages.',
        },
      },
      {
        name: 'suffix',
        type: 'string',
        default: 'undefined',
        source: 'v-text-field',
        description: {
          en: 'Displays suffix text',
        },
      },
      {
        name: 'type',
        type: 'string',
        default: "'text'",
        source: 'v-text-field',
        description: {
          en: 'Sets input type',
        },
      },
      {
        name: 'validateOnBlur',
        type: 'boolean',
        default: 'false',
        source: 'validatable',
        description: {
          en: 'Delays validation until blur event',
        },
      },
      {
        name: 'value',
        type: 'any',
        source: 'v-input',
        description: {
          en: "The input's value",
        },
      },
    ],
    mixins: [
      'v-input',
      'validatable',
      'colorable',
      'registrable-inject',
      'themeable',
      'intersectable',
      'loadable',
    ],
    events: [
      {
        name: 'update:error',
        source: 'validatable',
        value: 'boolean',
        description: {
          en: 'The `error.sync` event',
        },
      },
      {
        name: 'click',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when input is clicked',
        },
      },
      {
        name: 'mousedown',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is pressed',
        },
      },
      {
        name: 'mouseup',
        source: 'v-input',
        value: 'MouseEvent',
        description: {
          en: 'Emitted when click is released',
        },
      },
      {
        name: 'click:append',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when appended icon is clicked',
        },
      },
      {
        name: 'click:prepend',
        source: 'v-input',
        value: 'Event',
        description: {
          en: 'Emitted when prepended icon is clicked',
        },
      },
      {
        name: 'blur',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when the input is blurred',
        },
      },
      {
        name: 'click:clear',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when clearable icon clicked',
        },
      },
      {
        name: 'click:append-outer',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when appended outer icon is clicked',
        },
      },
      {
        name: 'click:prepend-inner',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when prepended inner icon is clicked',
        },
      },
      {
        name: 'focus',
        source: 'v-text-field',
        value: 'Event',
        description: {
          en: 'Emitted when component is focused',
        },
      },
      {
        name: 'change',
        source: 'v-text-field',
        value: 'any',
        description: {
          en: 'Emitted when the input is changed by user interaction',
        },
      },
      {
        name: 'input',
        source: 'v-text-field',
        value: 'any',
        description: {
          en: 'The updated bound model',
        },
      },
      {
        name: 'keydown',
        source: 'v-text-field',
        value: 'KeyboardEvent',
        description: {
          en: 'Emitted when **any** key is pressed',
        },
      },
    ],
    slots: [
      {
        name: 'append',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'default',
        source: 'v-input',
        description: {
          en: 'The default Vue slot.',
        },
      },
      {
        name: 'prepend',
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'label',
        source: 'v-input',
        description: {
          en: 'Replaces the default label',
        },
      },
      {
        name: 'message',
        props: {
          key: 'number, // the messages index',
          message: 'string, // the message',
        },
        source: 'v-input',
        description: {
          en: '',
        },
      },
      {
        name: 'append-outer',
        source: 'v-text-field',
        description: {
          en: 'Adds an item outside the input and after input content',
        },
      },
      {
        name: 'prepend-inner',
        source: 'v-text-field',
        description: {
          en: 'Adds an item inside the input and before input content',
        },
      },
      {
        name: 'progress',
        source: 'v-text-field',
        description: {
          en: 'Slot for custom progress linear (displayed when **loading** prop is not equal to Boolean False)',
        },
      },
    ],
  },
  'v-theme-provider': {
    props: [
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'root',
        type: 'boolean',
        default: 'false',
        source: 'v-theme-provider',
        description: {
          en: '',
        },
      },
    ],
    mixins: [],
  },
  'v-timeline': {
    props: [
      {
        name: 'alignTop',
        type: 'boolean',
        default: 'false',
        source: 'v-timeline',
        description: {
          en: 'Align caret and dot of timeline items to the top',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-timeline',
        description: {
          en: 'Hide opposite slot content, and position all items to one side of timeline',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'reverse',
        type: 'boolean',
        default: 'false',
        source: 'v-timeline',
        description: {
          en: 'Reverse direction of timeline items',
        },
      },
    ],
    mixins: [
      'themeable',
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-timeline-item': {
    props: [
      {
        name: 'color',
        type: 'string',
        default: "'primary'",
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'fillDot',
        type: 'boolean',
        default: 'false',
        source: 'v-timeline-item',
        description: {
          en: 'Remove padding from dot container',
        },
      },
      {
        name: 'hideDot',
        type: 'boolean',
        default: 'false',
        source: 'v-timeline-item',
        description: {
          en: 'Hide display of timeline dot',
        },
      },
      {
        name: 'icon',
        type: 'string',
        default: 'undefined',
        source: 'v-timeline-item',
        description: {
          en: 'Specify icon for dot container',
        },
      },
      {
        name: 'iconColor',
        type: 'string',
        default: 'undefined',
        source: 'v-timeline-item',
        description: {
          en: '',
        },
      },
      {
        name: 'large',
        type: 'boolean',
        default: 'false',
        source: 'v-timeline-item',
        description: {
          en: 'Large size dot',
        },
      },
      {
        name: 'left',
        type: 'boolean',
        default: 'false',
        source: 'v-timeline-item',
        description: {
          en: 'Explicitly set the item to a left orientation',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'right',
        type: 'boolean',
        default: 'false',
        source: 'v-timeline-item',
        description: {
          en: 'Explicitly set the item to a right orientation',
        },
      },
      {
        name: 'small',
        type: 'boolean',
        default: 'false',
        source: 'v-timeline-item',
        description: {
          en: 'Small size dot',
        },
      },
    ],
    mixins: [
      'colorable',
      'themeable',
    ],
    slots: [
      {
        name: 'icon',
        description: {
          en: "Used to customize the icon inside the timeline item's dot",
        },
      },
      {
        name: 'opposite',
        description: {
          en: 'Used to customize the opposite side of timeline items',
        },
      },
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-time-picker': {
    props: [
      {
        name: 'allowedHours',
        type: [
          'function',
          'array',
        ],
        default: 'undefined',
        source: 'v-time-picker',
        description: {
          en: 'Restricts which hours can be selected',
        },
      },
      {
        name: 'allowedMinutes',
        type: [
          'function',
          'array',
        ],
        default: 'undefined',
        source: 'v-time-picker',
        description: {
          en: 'Restricts which minutes can be selected',
        },
      },
      {
        name: 'allowedSeconds',
        type: [
          'function',
          'array',
        ],
        default: 'undefined',
        source: 'v-time-picker',
        description: {
          en: 'Restricts which seconds can be selected',
        },
      },
      {
        name: 'ampmInTitle',
        type: 'boolean',
        default: 'false',
        source: 'v-time-picker',
        description: {
          en: 'Place AM/PM switch in title, not near the clock.',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'v-time-picker',
        description: {
          en: 'disables picker',
        },
      },
      {
        name: 'elevation',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'elevatable',
        description: {
          en: 'Designates an elevation applied to the component between 0 and 24. You can find more information on the [elevation page](/styles/elevation).',
        },
      },
      {
        name: 'flat',
        type: 'boolean',
        default: 'false',
        source: 'picker',
        description: {
          en: 'Removes  elevation',
        },
      },
      {
        name: 'format',
        type: 'string',
        default: "'ampm'",
        source: 'v-time-picker',
        description: {
          en: 'Defines the format of a time displayed in picker. Available options are `ampm` and `24hr`.',
        },
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        source: 'picker',
        description: {
          en: 'Forces 100% width',
        },
      },
      {
        name: 'headerColor',
        type: 'string',
        default: 'undefined',
        source: 'picker',
        description: {
          en: 'Defines the header color. If not specified it will use the color defined by <code>color</code> prop or the default picker color',
        },
      },
      {
        name: 'landscape',
        type: 'boolean',
        default: 'false',
        source: 'picker',
        description: {
          en: 'Orients picker horizontal',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'max',
        type: 'string',
        default: 'undefined',
        source: 'v-time-picker',
        description: {
          en: 'Maximum allowed time',
        },
      },
      {
        name: 'min',
        type: 'string',
        default: 'undefined',
        source: 'v-time-picker',
        description: {
          en: 'Minimum allowed time',
        },
      },
      {
        name: 'noTitle',
        type: 'boolean',
        default: 'false',
        source: 'picker',
        description: {
          en: 'Hide the picker title',
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'false',
        source: 'v-time-picker',
        description: {
          en: 'Puts picker in readonly state',
        },
      },
      {
        name: 'scrollable',
        type: 'boolean',
        default: 'false',
        source: 'v-time-picker',
        description: {
          en: 'Allows changing hour/minute with mouse scroll',
        },
      },
      {
        name: 'useSeconds',
        type: 'boolean',
        default: 'false',
        source: 'v-time-picker',
        description: {
          en: 'Toggles the use of seconds in picker',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'v-time-picker',
        description: {
          en: 'Time picker model (ISO 8601 format, 24hr hh:mm)',
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 290,
        source: 'picker',
        description: {
          en: 'Width of the picker',
        },
      },
    ],
    mixins: [
      'picker',
      'colorable',
      'elevatable',
      'themeable',
      'colorable',
      'colorable',
    ],
    events: [
      {
        name: 'input',
        value: 'string',
        description: {
          en: 'The updated bound model',
        },
      },
      {
        name: 'change',
        value: 'string',
        description: {
          en: 'Emitted when the time selection is done (when user changes the minute for HH:MM picker and the second for HH:MM:SS picker',
        },
      },
      {
        name: 'click:hour',
        value: 'string',
        description: {
          en: 'Emitted when user selects the hour',
        },
      },
      {
        name: 'click:minute',
        value: 'string',
        description: {
          en: 'Emitted when user selects the minute',
        },
      },
      {
        name: 'click:second',
        value: 'string',
        description: {
          en: 'Emitted when user selects the second',
        },
      },
      {
        name: 'update:period',
        value: 'string',
        description: {
          en: 'Emitted when user clicks the AM/PM button',
        },
      },
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'Displayed below the clock, can be used for example for adding action button (`OK` and `Cancel`)',
        },
      },
    ],
  },
  'v-time-picker-clock': {
    props: [
      {
        name: 'allowedValues',
        type: 'function',
        default: 'null',
        source: 'v-time-picker-clock',
        description: {
          en: '',
        },
      },
      {
        name: 'ampm',
        type: 'boolean',
        default: 'false',
        source: 'v-time-picker-clock',
        description: {
          en: '',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'v-time-picker-clock',
        description: {
          en: '',
        },
      },
      {
        name: 'double',
        type: 'boolean',
        default: 'false',
        source: 'v-time-picker-clock',
        description: {
          en: '',
        },
      },
      {
        name: 'format',
        type: 'function',
        default: '(val: string): string',
        source: 'v-time-picker-clock',
        description: {
          en: '',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'max',
        type: 'number',
        default: 'undefined',
        source: 'v-time-picker-clock',
        description: {
          en: '',
        },
      },
      {
        name: 'min',
        type: 'number',
        default: 'undefined',
        source: 'v-time-picker-clock',
        description: {
          en: '',
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'false',
        source: 'v-time-picker-clock',
        description: {
          en: '',
        },
      },
      {
        name: 'rotate',
        type: 'number',
        default: 0,
        source: 'v-time-picker-clock',
        description: {
          en: '',
        },
      },
      {
        name: 'scrollable',
        type: 'boolean',
        default: 'false',
        source: 'v-time-picker-clock',
        description: {
          en: '',
        },
      },
      {
        name: 'step',
        type: 'number',
        default: 1,
        source: 'v-time-picker-clock',
        description: {
          en: '',
        },
      },
      {
        name: 'value',
        type: 'number',
        default: 'undefined',
        source: 'v-time-picker-clock',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'colorable',
      'themeable',
    ],
  },
  'v-time-picker-title': {
    props: [
      {
        name: 'ampm',
        type: 'boolean',
        default: 'false',
        source: 'v-time-picker-title',
        description: {
          en: '',
        },
      },
      {
        name: 'ampmReadonly',
        type: 'boolean',
        default: 'false',
        source: 'v-time-picker-title',
        description: {
          en: '',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'v-time-picker-title',
        description: {
          en: '',
        },
      },
      {
        name: 'hour',
        type: 'number',
        default: 'undefined',
        source: 'v-time-picker-title',
        description: {
          en: '',
        },
      },
      {
        name: 'minute',
        type: 'number',
        default: 'undefined',
        source: 'v-time-picker-title',
        description: {
          en: '',
        },
      },
      {
        name: 'period',
        type: 'string',
        default: 'undefined',
        source: 'v-time-picker-title',
        description: {
          en: '',
        },
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'false',
        source: 'v-time-picker-title',
        description: {
          en: '',
        },
      },
      {
        name: 'second',
        type: 'number',
        default: 'undefined',
        source: 'v-time-picker-title',
        description: {
          en: '',
        },
      },
      {
        name: 'selecting',
        type: 'number',
        default: 'undefined',
        source: 'v-time-picker-title',
        description: {
          en: '',
        },
      },
      {
        name: 'useSeconds',
        type: 'boolean',
        default: 'false',
        source: 'v-time-picker-title',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'colorable',
      'colorable',
    ],
  },
  'v-toolbar': {
    props: [
      {
        name: 'absolute',
        type: 'boolean',
        default: 'false',
        source: 'v-toolbar',
        description: {
          en: 'Applies position: absolute to the component.',
        },
      },
      {
        name: 'bottom',
        type: 'boolean',
        default: 'false',
        source: 'v-toolbar',
        description: {
          en: 'Aligns the component towards the bottom.',
        },
      },
      {
        name: 'collapse',
        type: 'boolean',
        default: 'false',
        source: 'v-toolbar',
        description: {
          en: 'Puts the toolbar into a collapsed state reducing its maximum width.',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-toolbar',
        description: {
          en: 'Reduces the height of the toolbar content to 48px (96px when using the **prominent** prop).',
        },
      },
      {
        name: 'elevation',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'elevatable',
        description: {
          en: 'Designates an elevation applied to the component between 0 and 24. You can find more information on the [elevation page](/styles/elevation).',
        },
      },
      {
        name: 'extended',
        type: 'boolean',
        default: 'false',
        source: 'v-toolbar',
        description: {
          en: 'Use this prop to increase the height of the toolbar _without_ using the `extension` slot for adding content. May be used in conjunction with the **extension-height** prop, and any of the other props that affect the height of the toolbar, e.g. **prominent**, **dense**, etc., **WITH THE EXCEPTION** of **height**.',
        },
      },
      {
        name: 'extensionHeight',
        type: [
          'number',
          'string',
        ],
        default: 48,
        source: 'v-toolbar',
        description: {
          en: 'Specify an explicit height for the `extension` slot. ',
        },
      },
      {
        name: 'flat',
        type: 'boolean',
        default: 'false',
        source: 'v-toolbar',
        description: {
          en: "Removes the toolbar's box-shadow.",
        },
      },
      {
        name: 'floating',
        type: 'boolean',
        default: 'false',
        source: 'v-toolbar',
        description: {
          en: 'Applies **display: inline-flex** to the component.',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Designates a specific height for the toolbar. Overrides the heights imposed by other props, e.g. **prominent**, **dense**, **extended**, etc.',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'maxHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum height for the component.',
        },
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum width for the component.',
        },
      },
      {
        name: 'minHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum height for the component.',
        },
      },
      {
        name: 'minWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum width for the component.',
        },
      },
      {
        name: 'outlined',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
        description: {
          en: 'Removes elevation (box-shadow) and adds a *thin* border.',
        },
      },
      {
        name: 'prominent',
        type: 'boolean',
        default: 'false',
        source: 'v-toolbar',
        description: {
          en: 'Increases the height of the toolbar content to 128px.',
        },
      },
      {
        name: 'rounded',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'roundable',
        description: {
          en: 'Designates the **border-radius** applied to the component. You can find more information on the [Border Radius page](/styles/border-radius).',
        },
      },
      {
        name: 'shaped',
        type: 'boolean',
        default: 'false',
        source: 'v-sheet',
        description: {
          en: 'Applies a large border radius on the top left and bottom right of the card.',
        },
      },
      {
        name: 'short',
        type: 'boolean',
        default: 'false',
        source: 'v-toolbar',
        description: {
          en: 'Reduce the height of the toolbar content to 56px (112px when using the **prominent** prop).',
        },
      },
      {
        name: 'src',
        type: [
          'string',
          'object',
        ],
        default: 'undefined',
        source: 'v-toolbar',
        description: {
          en: "Specifies a [v-img](/components/images) as the component's background.",
        },
      },
      {
        name: 'tag',
        type: 'string',
        default: "'header'",
        source: 'v-sheet',
        description: {
          en: 'Specify a custom tag used on the root element.',
        },
      },
      {
        name: 'tile',
        type: 'boolean',
        default: 'false',
        source: 'roundable',
        description: {
          en: "Removes the component's **border-radius**.",
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the width for the component.',
        },
      },
    ],
    mixins: [
      'colorable',
      'elevatable',
      'measurable',
      'roundable',
      'themeable',
    ],
    slots: [
      {
        name: 'extension',
        description: {
          en: 'Slot positioned directly under the main content of the toolbar. Height of this slot can be set explicitly with the **extension-height** prop. If this slot has no content, the **extended** prop may be used instead.',
        },
      },
      {
        name: 'img',
        props: {
          props: '{ height: string, src: string | srcObject }',
        },
        description: {
          en: 'Expects the [v-img](/components/images) component. Scoped **props** should be applied with `v-bind="props"`.',
        },
      },
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-toolbar-items': {
    props: [],
    mixins: [],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-toolbar-title': {
    props: [],
    mixins: [],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-tooltip': {
    props: [
      {
        name: 'absolute',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Applies **position: absolute** to the component.',
        },
      },
      {
        name: 'activator',
        type: 'any',
        default: 'undefined',
        source: 'activatable',
        description: {
          en: 'Designate a custom activator when the `activator` slot is not used. String can be any valid querySelector and Object can be any valid Node.',
        },
      },
      {
        name: 'allowOverflow',
        type: 'boolean',
        default: 'false',
        source: 'menuable',
        description: {
          en: 'Removes overflow re-positioning for the content',
        },
      },
      {
        name: 'attach',
        type: 'any',
        default: false,
        source: 'detachable',
        description: {
          en: 'Specifies which DOM element that this component should detach to. String can be any valid querySelector and Object can be any valid Node. This will attach to the root `v-app` component by default.',
        },
      },
      {
        name: 'bottom',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the component towards the bottom.',
        },
      },
      {
        name: 'closeDelay',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'delayable',
        description: {
          en: 'Delay (in ms) after which menu closes (when open-on-hover prop is set to true)',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: 'undefined',
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'contentClass',
        type: 'string',
        default: 'undefined',
        source: 'detachable',
        description: {
          en: 'Applies a custom class to the detached element. This is useful because the content is moved to the beginning of the `v-app` component (unless the **attach** prop is provided) and is not targettable by classes passed directly on the component.',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'menuable',
        description: {
          en: '',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'activatable',
        description: {
          en: 'Disables the tooltip',
        },
      },
      {
        name: 'eager',
        type: 'boolean',
        default: 'false',
        source: 'bootable',
        description: {
          en: 'Will force the components content to render on mounted. This is useful if you have content that will not be rendered in the DOM that you want crawled for SEO.',
        },
      },
      {
        name: 'fixed',
        type: 'boolean',
        default: 'true',
        source: 'positionable',
        description: {
          en: 'Applies **position: fixed** to the component.',
        },
      },
      {
        name: 'internalActivator',
        type: 'boolean',
        default: 'false',
        source: 'activatable',
        description: {
          en: 'Designates whether to use an internal activator',
        },
      },
      {
        name: 'left',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the component towards the left.',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'menuable',
        description: {
          en: '',
        },
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'auto',
        source: 'menuable',
        description: {
          en: 'Sets the maximum width for the content',
        },
      },
      {
        name: 'minWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'menuable',
        description: {
          en: 'Sets the minimum width for the content',
        },
      },
      {
        name: 'nudgeBottom',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'menuable',
        description: {
          en: 'Nudge the content to the bottom',
        },
      },
      {
        name: 'nudgeLeft',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'menuable',
        description: {
          en: 'Nudge the content to the left',
        },
      },
      {
        name: 'nudgeRight',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'menuable',
        description: {
          en: 'Nudge the content to the right',
        },
      },
      {
        name: 'nudgeTop',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'menuable',
        description: {
          en: 'Nudge the content to the top',
        },
      },
      {
        name: 'nudgeWidth',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'menuable',
        description: {
          en: 'Nudge the content width',
        },
      },
      {
        name: 'offsetOverflow',
        type: 'boolean',
        default: 'false',
        source: 'menuable',
        description: {
          en: 'Causes the component to flip to the opposite side when repositioned due to overflow',
        },
      },
      {
        name: 'openDelay',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'delayable',
        description: {
          en: 'Delay (in ms) after which tooltip opens (when `open-on-hover` prop is set to **true**)',
        },
      },
      {
        name: 'openOnClick',
        type: 'boolean',
        default: 'false',
        source: 'menuable',
        description: {
          en: 'Designates whether the tooltip should open on activator click',
        },
      },
      {
        name: 'openOnFocus',
        type: 'boolean',
        default: 'false',
        source: 'activatable',
        description: {
          en: '',
        },
      },
      {
        name: 'openOnHover',
        type: 'boolean',
        default: 'true',
        source: 'activatable',
        description: {
          en: 'Designates whether the tooltip should open on activator hover',
        },
      },
      {
        name: 'positionX',
        type: 'number',
        default: 'undefined',
        source: 'menuable',
        description: {
          en: 'Used to position the content when not using an activator slot',
        },
      },
      {
        name: 'positionY',
        type: 'number',
        default: 'undefined',
        source: 'menuable',
        description: {
          en: 'Used to position the content when not using an activator slot',
        },
      },
      {
        name: 'right',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the component towards the right.',
        },
      },
      {
        name: 'tag',
        type: 'string',
        default: "'span'",
        source: 'v-tooltip',
        description: {
          en: 'Specifies a custom tag for the activator wrapper',
        },
      },
      {
        name: 'top',
        type: 'boolean',
        default: 'false',
        source: 'positionable',
        description: {
          en: 'Aligns the content towards the top.',
        },
      },
      {
        name: 'transition',
        type: 'string',
        default: 'undefined',
        source: 'v-tooltip',
        description: {
          en: '',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'toggleable',
        description: {
          en: 'Controls whether the component is visible or hidden.',
        },
      },
      {
        name: 'zIndex',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'menuable',
        description: {
          en: 'The z-index used for the component',
        },
      },
    ],
    mixins: [
      'colorable',
      'delayable',
      'dependent',
      'detachable',
      'bootable',
      'menuable',
      'stackable',
      'positionable',
      'activatable',
      'delayable',
      'toggleable',
      'toggleable',
    ],
    slots: [
      {
        name: 'activator',
        props: {
          on: '{ [eventName]: eventHandler }',
          value: 'boolean',
        },
        description: {
          en: 'When used, will activate the component when clicked (or hover for specific components). This manually stops the event propagation. Without this slot, if you open the component through its model, you will need to manually stop the event propagation',
        },
      },
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-treeview': {
    props: [
      {
        name: 'activatable',
        type: 'boolean',
        default: 'false',
        source: 'v-treeview',
        description: {
          en: 'Allows user to mark a node as active by clicking on it',
        },
      },
      {
        name: 'active',
        type: 'array',
        default: [],
        source: 'v-treeview',
        description: {
          en: 'Syncable prop that allows one to control which nodes are active. The array consists of the `item-key` of each active item.',
        },
      },
      {
        name: 'activeClass',
        type: 'string',
        default: "'v-treeview-node--active'",
        source: 'v-treeview',
        description: {
          en: 'The class applied to the node when active',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: "'primary'",
        source: 'v-treeview',
        description: {
          en: 'Sets the color of the active node',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'false',
        source: 'v-treeview',
        description: {
          en: 'Decreases the height of the items',
        },
      },
      {
        name: 'expandIcon',
        type: 'string',
        default: "'$subgroup'",
        source: 'v-treeview',
        description: {
          en: 'Icon used to indicate that a node can be expanded',
        },
      },
      {
        name: 'filter',
        type: 'function',
        default: 'null',
        source: 'v-treeview',
        description: {
          en: "Custom item filtering function. By default it will use case-insensitive search in item's label.",
        },
      },
      {
        name: 'hoverable',
        type: 'boolean',
        default: 'false',
        source: 'v-treeview',
        description: {
          en: 'Applies a hover class when mousing over nodes',
        },
      },
      {
        name: 'indeterminateIcon',
        type: 'string',
        default: "'$checkboxIndeterminate'",
        source: 'v-treeview',
        description: {
          en: 'Icon used when node is in an indeterminate state. Only visible when `selectable` is `true`.',
        },
      },
      {
        name: 'itemChildren',
        type: 'string',
        default: "'children'",
        source: 'v-treeview',
        description: {
          en: 'Property on supplied `items` that contains its children',
        },
      },
      {
        name: 'itemDisabled',
        type: 'string',
        default: "'disabled'",
        source: 'v-treeview',
        description: {
          en: 'Property on supplied `items` that contains the disabled state of the item',
        },
      },
      {
        name: 'itemKey',
        type: 'string',
        default: "'id'",
        source: 'v-treeview',
        description: {
          en: 'Property on supplied `items` used to keep track of node state. The value of this property has to be unique among all items.',
        },
      },
      {
        name: 'itemText',
        type: 'string',
        default: "'name'",
        source: 'v-treeview',
        description: {
          en: 'Property on supplied `items` that contains its label text',
        },
      },
      {
        name: 'items',
        type: 'array',
        default: [],
        source: 'v-treeview',
        description: {
          en: 'An array of items used to build the treeview',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'loadChildren',
        type: 'function',
        default: 'null',
        source: 'v-treeview',
        description: {
          en: 'A function used when dynamically loading children. If this prop is set, then the supplied function will be run if expanding an item that has a `item-children` property that is an empty array. Supports returning a Promise.',
        },
      },
      {
        name: 'loadingIcon',
        type: 'string',
        default: "'$loading'",
        source: 'v-treeview',
        description: {
          en: 'Icon used when node is in a loading state',
        },
      },
      {
        name: 'multipleActive',
        type: 'boolean',
        default: 'false',
        source: 'v-treeview',
        description: {
          en: 'When `true`, allows user to have multiple active nodes at the same time',
        },
      },
      {
        name: 'offIcon',
        type: 'string',
        default: "'$checkboxOff'",
        source: 'v-treeview',
        description: {
          en: 'Icon used when node is not selected. Only visible when `selectable` is `true`.',
        },
      },
      {
        name: 'onIcon',
        type: 'string',
        default: "'$checkboxOn'",
        source: 'v-treeview',
        description: {
          en: 'Icon used when leaf node is selected or when a branch node is fully selected. Only visible when `selectable` is `true`.',
        },
      },
      {
        name: 'open',
        type: 'array',
        default: [],
        source: 'v-treeview',
        description: {
          en: 'Syncable prop that allows one to control which nodes are open. The array consists of the `item-key` of each open item.',
        },
      },
      {
        name: 'openAll',
        type: 'boolean',
        default: 'false',
        source: 'v-treeview',
        description: {
          en: 'When `true` will cause all branch nodes to be opened when component is mounted',
        },
      },
      {
        name: 'openOnClick',
        type: 'boolean',
        default: 'false',
        source: 'v-treeview',
        description: {
          en: 'When `true` will cause nodes to be opened by clicking anywhere on it, instead of only opening by clicking on expand icon. When using this prop with `activatable` you will be unable to mark nodes with children as active.',
        },
      },
      {
        name: 'returnObject',
        type: 'boolean',
        default: 'false',
        source: 'v-treeview',
        description: {
          en: 'When `true` will make `v-model`, `active.sync` and `open.sync` return the complete object instead of just the key',
        },
      },
      {
        name: 'rounded',
        type: 'boolean',
        default: 'false',
        source: 'v-treeview',
        description: {
          en: 'Provides an alternative active style for `v-treeview` node. Only visible when `activatable` is `true` and should not be used in conjunction with the `shaped` prop.',
        },
      },
      {
        name: 'search',
        type: 'string',
        default: 'undefined',
        source: 'v-treeview',
        description: {
          en: 'The search model for filtering results',
        },
      },
      {
        name: 'selectable',
        type: 'boolean',
        default: 'false',
        source: 'v-treeview',
        description: {
          en: 'Will render a checkbox next to each node allowing them to be selected',
        },
      },
      {
        name: 'selectedColor',
        type: 'string',
        default: "'accent'",
        source: 'v-treeview',
        description: {
          en: 'The color of the selection checkbox',
        },
      },
      {
        name: 'selectionType',
        type: 'string',
        default: "'leaf'",
        source: 'v-treeview',
        description: {
          en: "Controls how the treeview selects nodes. There are two modes available: 'leaf' and 'independent'",
        },
      },
      {
        name: 'shaped',
        type: 'boolean',
        default: 'false',
        source: 'v-treeview',
        description: {
          en: 'Provides an alternative active style for `v-treeview` node. Only visible when `activatable` is `true` and should not be used in conjunction with the `rounded` prop.',
        },
      },
      {
        name: 'transition',
        type: 'boolean',
        default: 'false',
        source: 'v-treeview',
        description: {
          en: 'Applies a transition when nodes are opened and closed',
        },
      },
      {
        name: 'value',
        type: 'array',
        default: [],
        source: 'v-treeview',
        description: {
          en: 'Allows one to control which nodes are selected. The array consists of the `item-key` of each selected item. Is used with `@input` event to allow for `v-model` binding.',
        },
      },
    ],
    mixins: [
      'registrable-provide',
      'themeable',
    ],
    slots: [
      {
        name: 'append',
        props: {
          item: 'any',
          leaf: 'boolean',
          selected: 'boolean',
          indeterminate: 'boolean',
          active: 'boolean',
          open: 'boolean',
        },
        description: {
          en: 'Appends content after label',
        },
      },
      {
        name: 'label',
        props: {
          item: 'any',
          leaf: 'boolean',
          selected: 'boolean',
          indeterminate: 'boolean',
          active: 'boolean',
          open: 'boolean',
        },
        description: {
          en: 'Label content',
        },
      },
      {
        name: 'prepend',
        props: {
          item: 'any',
          leaf: 'boolean',
          selected: 'boolean',
          indeterminate: 'boolean',
          active: 'boolean',
          open: 'boolean',
        },
        description: {
          en: 'Prepends content before label',
        },
      },
    ],
    functions: [
      {
        name: 'updateAll',
        signature: '(val: boolean): void',
        description: {
          en: 'Opens or closes all nodes',
        },
      },
    ],
    events: [
      {
        name: 'input',
        value: 'array',
        description: {
          en: 'Emits the array of selected items when this value changes',
        },
      },
      {
        name: 'update:active',
        value: 'array',
        description: {
          en: 'Emits the array of active items when this value changes',
        },
      },
      {
        name: 'update:open',
        value: 'array',
        description: {
          en: 'Emits the array of open items when this value changes',
        },
      },
    ],
  },
  'v-treeview-node': {
    props: [
      {
        name: 'activatable',
        type: 'boolean',
        default: 'false',
        source: 'v-treeview-node',
        description: {
          en: '',
        },
      },
      {
        name: 'activeClass',
        type: 'string',
        default: "'v-treeview-node--active'",
        source: 'v-treeview-node',
        description: {
          en: '',
        },
      },
      {
        name: 'color',
        type: 'string',
        default: "'primary'",
        source: 'colorable',
        description: {
          en: 'Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors).',
        },
      },
      {
        name: 'expandIcon',
        type: 'string',
        default: "'$subgroup'",
        source: 'v-treeview-node',
        description: {
          en: '',
        },
      },
      {
        name: 'indeterminateIcon',
        type: 'string',
        default: "'$checkboxIndeterminate'",
        source: 'v-treeview-node',
        description: {
          en: '',
        },
      },
      {
        name: 'item',
        type: 'object',
        default: null,
        source: 'v-treeview-node',
        description: {
          en: '',
        },
      },
      {
        name: 'itemChildren',
        type: 'string',
        default: "'children'",
        source: 'v-treeview-node',
        description: {
          en: '',
        },
      },
      {
        name: 'itemDisabled',
        type: 'string',
        default: "'disabled'",
        source: 'v-treeview-node',
        description: {
          en: '',
        },
      },
      {
        name: 'itemKey',
        type: 'string',
        default: "'id'",
        source: 'v-treeview-node',
        description: {
          en: '',
        },
      },
      {
        name: 'itemText',
        type: 'string',
        default: "'name'",
        source: 'v-treeview-node',
        description: {
          en: '',
        },
      },
      {
        name: 'level',
        type: 'number',
        default: 'undefined',
        source: 'v-treeview-node',
        description: {
          en: '',
        },
      },
      {
        name: 'loadChildren',
        type: 'function',
        default: 'null',
        source: 'v-treeview-node',
        description: {
          en: '',
        },
      },
      {
        name: 'loadingIcon',
        type: 'string',
        default: "'$loading'",
        source: 'v-treeview-node',
        description: {
          en: '',
        },
      },
      {
        name: 'offIcon',
        type: 'string',
        default: "'$checkboxOff'",
        source: 'v-treeview-node',
        description: {
          en: '',
        },
      },
      {
        name: 'onIcon',
        type: 'string',
        default: "'$checkboxOn'",
        source: 'v-treeview-node',
        description: {
          en: '',
        },
      },
      {
        name: 'openOnClick',
        type: 'boolean',
        default: 'false',
        source: 'v-treeview-node',
        description: {
          en: '',
        },
      },
      {
        name: 'parentIsDisabled',
        type: 'boolean',
        default: 'false',
        source: 'v-treeview-node',
        description: {
          en: '',
        },
      },
      {
        name: 'rounded',
        type: 'boolean',
        default: 'false',
        source: 'v-treeview-node',
        description: {
          en: '',
        },
      },
      {
        name: 'selectable',
        type: 'boolean',
        default: 'false',
        source: 'v-treeview-node',
        description: {
          en: '',
        },
      },
      {
        name: 'selectedColor',
        type: 'string',
        default: "'accent'",
        source: 'v-treeview-node',
        description: {
          en: '',
        },
      },
      {
        name: 'selectionType',
        type: 'string',
        default: "'leaf'",
        source: 'v-treeview-node',
        description: {
          en: '',
        },
      },
      {
        name: 'shaped',
        type: 'boolean',
        default: 'false',
        source: 'v-treeview-node',
        description: {
          en: '',
        },
      },
      {
        name: 'transition',
        type: 'boolean',
        default: 'false',
        source: 'v-treeview-node',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'colorable',
      'registrable-inject',
    ],
  },
  'v-virtual-scroll': {
    props: [
      {
        name: 'bench',
        type: [
          'number',
          'string',
        ],
        default: 0,
        source: 'v-virtual-scroll',
        description: {
          en: '',
        },
      },
      {
        name: 'height',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the height for the component.',
        },
      },
      {
        name: 'itemHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'v-virtual-scroll',
        description: {
          en: '',
        },
      },
      {
        name: 'items',
        type: 'array',
        default: [],
        source: 'v-virtual-scroll',
        description: {
          en: '',
        },
      },
      {
        name: 'maxHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum height for the component.',
        },
      },
      {
        name: 'maxWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the maximum width for the component.',
        },
      },
      {
        name: 'minHeight',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum height for the component.',
        },
      },
      {
        name: 'minWidth',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the minimum width for the component.',
        },
      },
      {
        name: 'width',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'measurable',
        description: {
          en: 'Sets the width for the component.',
        },
      },
    ],
    mixins: [],
    slots: [
      {
        name: 'default',
        props: {
          index: 'number',
          item: 'any',
        },
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-window': {
    props: [
      {
        name: 'activeClass',
        type: 'string',
        default: "'v-window-item--active'",
        source: 'base-item-group',
        description: {
          en: 'The **active-class** applied to children when they are activated.',
        },
      },
      {
        name: 'continuous',
        type: 'boolean',
        default: 'false',
        source: 'v-window',
        description: {
          en: 'If `true`, window will "wrap around" from the last item to the first, and from the first item to the last',
        },
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html).',
        },
      },
      {
        name: 'light',
        type: 'boolean',
        default: 'false',
        source: 'themeable',
        description: {
          en: 'Applies the light theme variant to the component.',
        },
      },
      {
        name: 'mandatory',
        type: 'boolean',
        default: 'true',
        source: 'base-item-group',
        description: {
          en: 'Forces a value to always be selected (if available).',
        },
      },
      {
        name: 'max',
        type: [
          'number',
          'string',
        ],
        default: 'undefined',
        source: 'base-item-group',
        description: {
          en: 'Sets a maximum number of selections that can be made.',
        },
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        source: 'base-item-group',
        description: {
          en: 'Allow multiple selections. The **value** prop must be an _array_.',
        },
      },
      {
        name: 'nextIcon',
        type: [
          'boolean',
          'string',
        ],
        default: '$next',
        source: 'v-window',
        description: {
          en: 'Icon used for the "next" button if `show-arrows` is `true`',
        },
      },
      {
        name: 'prevIcon',
        type: [
          'boolean',
          'string',
        ],
        default: '$prev',
        source: 'v-window',
        description: {
          en: 'Icon used for the "prev" button if `show-arrows` is `true`',
        },
      },
      {
        name: 'reverse',
        type: 'boolean',
        default: 'false',
        source: 'v-window',
        description: {
          en: 'Reverse the normal transition direction.',
        },
      },
      {
        name: 'showArrows',
        type: 'boolean',
        default: 'false',
        source: 'v-window',
        description: {
          en: 'Display the "next" and "prev" buttons',
        },
      },
      {
        name: 'showArrowsOnHover',
        type: 'boolean',
        default: 'false',
        source: 'v-window',
        description: {
          en: 'Display the "next" and "prev" buttons on hover. `show-arrows` MUST ALSO be set.',
        },
      },
      {
        name: 'touch',
        type: 'object',
        default: 'undefined',
        source: 'v-window',
        example: {
          left: 'Function',
          right: 'Function',
        },
        description: {
          en: 'Provide a custom **left** and **right** function when swiped left or right.',
        },
      },
      {
        name: 'touchless',
        type: 'boolean',
        default: 'false',
        source: 'v-window',
        description: {
          en: 'Disable touch support.',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'proxyable',
        description: {
          en: 'The designated model value for the component.',
        },
      },
      {
        name: 'vertical',
        type: 'boolean',
        default: 'false',
        source: 'v-window',
        description: {
          en: 'Uses a vertical transition when changing windows.',
        },
      },
    ],
    mixins: [
      'proxyable',
      'themeable',
    ],
    events: [
      {
        name: 'change',
        value: 'number',
        description: {
          en: 'Emitted when the component value is changed by user interaction',
        },
      },
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-window-item': {
    props: [
      {
        name: 'activeClass',
        type: 'string',
        source: 'groupable',
        description: {
          en: 'Mixins.Routable.props.activeClass',
        },
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        source: 'groupable',
        description: {
          en: 'Prevents the item from becoming active when using the "next" and "prev" buttons or the `toggle` method',
        },
      },
      {
        name: 'eager',
        type: 'boolean',
        default: 'false',
        source: 'bootable',
        description: {
          en: 'Will force the components content to render on mounted. This is useful if you have content that will not be rendered in the DOM that you want crawled for SEO.',
        },
      },
      {
        name: 'reverseTransition',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-window-item',
        description: {
          en: '',
        },
      },
      {
        name: 'transition',
        type: [
          'boolean',
          'string',
        ],
        default: 'undefined',
        source: 'v-window-item',
        description: {
          en: '',
        },
      },
      {
        name: 'value',
        type: 'any',
        default: 'undefined',
        source: 'v-window-item',
        description: {
          en: '',
        },
      },
    ],
    mixins: [
      'bootable',
      'groupable',
    ],
    slots: [
      {
        name: 'default',
        description: {
          en: 'The default Vue slot.',
        },
      },
    ],
  },
  'v-carousel-transition': {
    props: [
      {
        name: 'group',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Creates a `transition-group` component. [vue docs](https://vuejs.org/v2/api/#transition-group)',
        },
      },
      {
        name: 'hideOnLeave',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Hides the leaving element (no exit animation)',
        },
      },
      {
        name: 'leaveAbsolute',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Absolutely positions the leaving element (useful for [FLIP](https://aerotwist.com/blog/flip-your-animations/))',
        },
      },
      {
        name: 'mode',
        type: 'string',
        default: 'undefined',
        source: 'transitions',
        description: {
          en: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: "'top center 0'",
        source: 'transitions',
        description: {
          en: 'Sets the transition origin on the element. You can find more information on the MDN documentation [for transition origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin).',
        },
      },
    ],
    mixins: [],
  },
  'v-carousel-reverse-transition': {
    props: [
      {
        name: 'group',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Creates a `transition-group` component. [vue docs](https://vuejs.org/v2/api/#transition-group)',
        },
      },
      {
        name: 'hideOnLeave',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Hides the leaving element (no exit animation)',
        },
      },
      {
        name: 'leaveAbsolute',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Absolutely positions the leaving element (useful for [FLIP](https://aerotwist.com/blog/flip-your-animations/))',
        },
      },
      {
        name: 'mode',
        type: 'string',
        default: 'undefined',
        source: 'transitions',
        description: {
          en: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: "'top center 0'",
        source: 'transitions',
        description: {
          en: 'Sets the transition origin on the element. You can find more information on the MDN documentation [for transition origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin).',
        },
      },
    ],
    mixins: [],
  },
  'v-tab-transition': {
    props: [
      {
        name: 'group',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Creates a `transition-group` component. [vue docs](https://vuejs.org/v2/api/#transition-group)',
        },
      },
      {
        name: 'hideOnLeave',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Hides the leaving element (no exit animation)',
        },
      },
      {
        name: 'leaveAbsolute',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Absolutely positions the leaving element (useful for [FLIP](https://aerotwist.com/blog/flip-your-animations/))',
        },
      },
      {
        name: 'mode',
        type: 'string',
        default: 'undefined',
        source: 'transitions',
        description: {
          en: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: "'top center 0'",
        source: 'transitions',
        description: {
          en: 'Sets the transition origin on the element. You can find more information on the MDN documentation [for transition origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin).',
        },
      },
    ],
    mixins: [],
  },
  'v-tab-reverse-transition': {
    props: [
      {
        name: 'group',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Creates a `transition-group` component. [vue docs](https://vuejs.org/v2/api/#transition-group)',
        },
      },
      {
        name: 'hideOnLeave',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Hides the leaving element (no exit animation)',
        },
      },
      {
        name: 'leaveAbsolute',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Absolutely positions the leaving element (useful for [FLIP](https://aerotwist.com/blog/flip-your-animations/))',
        },
      },
      {
        name: 'mode',
        type: 'string',
        default: 'undefined',
        source: 'transitions',
        description: {
          en: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: "'top center 0'",
        source: 'transitions',
        description: {
          en: 'Sets the transition origin on the element. You can find more information on the MDN documentation [for transition origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin).',
        },
      },
    ],
    mixins: [],
  },
  'v-menu-transition': {
    props: [
      {
        name: 'group',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Creates a `transition-group` component. [vue docs](https://vuejs.org/v2/api/#transition-group)',
        },
      },
      {
        name: 'hideOnLeave',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Hides the leaving element (no exit animation)',
        },
      },
      {
        name: 'leaveAbsolute',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Absolutely positions the leaving element (useful for [FLIP](https://aerotwist.com/blog/flip-your-animations/))',
        },
      },
      {
        name: 'mode',
        type: 'string',
        default: 'undefined',
        source: 'transitions',
        description: {
          en: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: "'top center 0'",
        source: 'transitions',
        description: {
          en: 'Sets the transition origin on the element. You can find more information on the MDN documentation [for transition origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin).',
        },
      },
    ],
    mixins: [],
  },
  'v-fab-transition': {
    props: [
      {
        name: 'group',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Creates a `transition-group` component. [vue docs](https://vuejs.org/v2/api/#transition-group)',
        },
      },
      {
        name: 'hideOnLeave',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Hides the leaving element (no exit animation)',
        },
      },
      {
        name: 'leaveAbsolute',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Absolutely positions the leaving element (useful for [FLIP](https://aerotwist.com/blog/flip-your-animations/))',
        },
      },
      {
        name: 'mode',
        type: 'string',
        default: "'out-in'",
        source: 'transitions',
        description: {
          en: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: "'center center'",
        source: 'transitions',
        description: {
          en: 'Sets the transition origin on the element. You can find more information on the MDN documentation [for transition origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin).',
        },
      },
    ],
    mixins: [],
  },
  'v-dialog-transition': {
    props: [
      {
        name: 'group',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Creates a `transition-group` component. [vue docs](https://vuejs.org/v2/api/#transition-group)',
        },
      },
      {
        name: 'hideOnLeave',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Hides the leaving element (no exit animation)',
        },
      },
      {
        name: 'leaveAbsolute',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Absolutely positions the leaving element (useful for [FLIP](https://aerotwist.com/blog/flip-your-animations/))',
        },
      },
      {
        name: 'mode',
        type: 'string',
        default: 'undefined',
        source: 'transitions',
        description: {
          en: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: "'top center 0'",
        source: 'transitions',
        description: {
          en: 'Sets the transition origin on the element. You can find more information on the MDN documentation [for transition origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin).',
        },
      },
    ],
    mixins: [],
  },
  'v-dialog-bottom-transition': {
    props: [
      {
        name: 'group',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Creates a `transition-group` component. [vue docs](https://vuejs.org/v2/api/#transition-group)',
        },
      },
      {
        name: 'hideOnLeave',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Hides the leaving element (no exit animation)',
        },
      },
      {
        name: 'leaveAbsolute',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Absolutely positions the leaving element (useful for [FLIP](https://aerotwist.com/blog/flip-your-animations/))',
        },
      },
      {
        name: 'mode',
        type: 'string',
        default: 'undefined',
        source: 'transitions',
        description: {
          en: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: "'top center 0'",
        source: 'transitions',
        description: {
          en: 'Sets the transition origin on the element. You can find more information on the MDN documentation [for transition origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin).',
        },
      },
    ],
    mixins: [],
  },
  'v-fade-transition': {
    props: [
      {
        name: 'group',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Creates a `transition-group` component. [vue docs](https://vuejs.org/v2/api/#transition-group)',
        },
      },
      {
        name: 'hideOnLeave',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Hides the leaving element (no exit animation)',
        },
      },
      {
        name: 'leaveAbsolute',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Absolutely positions the leaving element (useful for [FLIP](https://aerotwist.com/blog/flip-your-animations/))',
        },
      },
      {
        name: 'mode',
        type: 'string',
        default: 'undefined',
        source: 'transitions',
        description: {
          en: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: "'top center 0'",
        source: 'transitions',
        description: {
          en: 'Sets the transition origin on the element. You can find more information on the MDN documentation [for transition origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin).',
        },
      },
    ],
    mixins: [],
  },
  'v-scale-transition': {
    props: [
      {
        name: 'group',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Creates a `transition-group` component. [vue docs](https://vuejs.org/v2/api/#transition-group)',
        },
      },
      {
        name: 'hideOnLeave',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Hides the leaving element (no exit animation)',
        },
      },
      {
        name: 'leaveAbsolute',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Absolutely positions the leaving element (useful for [FLIP](https://aerotwist.com/blog/flip-your-animations/))',
        },
      },
      {
        name: 'mode',
        type: 'string',
        default: 'undefined',
        source: 'transitions',
        description: {
          en: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: "'top center 0'",
        source: 'transitions',
        description: {
          en: 'Sets the transition origin on the element. You can find more information on the MDN documentation [for transition origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin).',
        },
      },
    ],
    mixins: [],
  },
  'v-scroll-x-transition': {
    props: [
      {
        name: 'group',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Creates a `transition-group` component. [vue docs](https://vuejs.org/v2/api/#transition-group)',
        },
      },
      {
        name: 'hideOnLeave',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Hides the leaving element (no exit animation)',
        },
      },
      {
        name: 'leaveAbsolute',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Absolutely positions the leaving element (useful for [FLIP](https://aerotwist.com/blog/flip-your-animations/))',
        },
      },
      {
        name: 'mode',
        type: 'string',
        default: 'undefined',
        source: 'transitions',
        description: {
          en: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: "'top center 0'",
        source: 'transitions',
        description: {
          en: 'Sets the transition origin on the element. You can find more information on the MDN documentation [for transition origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin).',
        },
      },
    ],
    mixins: [],
  },
  'v-scroll-x-reverse-transition': {
    props: [
      {
        name: 'group',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Creates a `transition-group` component. [vue docs](https://vuejs.org/v2/api/#transition-group)',
        },
      },
      {
        name: 'hideOnLeave',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Hides the leaving element (no exit animation)',
        },
      },
      {
        name: 'leaveAbsolute',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Absolutely positions the leaving element (useful for [FLIP](https://aerotwist.com/blog/flip-your-animations/))',
        },
      },
      {
        name: 'mode',
        type: 'string',
        default: 'undefined',
        source: 'transitions',
        description: {
          en: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: "'top center 0'",
        source: 'transitions',
        description: {
          en: 'Sets the transition origin on the element. You can find more information on the MDN documentation [for transition origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin).',
        },
      },
    ],
    mixins: [],
  },
  'v-scroll-y-transition': {
    props: [
      {
        name: 'group',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Creates a `transition-group` component. [vue docs](https://vuejs.org/v2/api/#transition-group)',
        },
      },
      {
        name: 'hideOnLeave',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Hides the leaving element (no exit animation)',
        },
      },
      {
        name: 'leaveAbsolute',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Absolutely positions the leaving element (useful for [FLIP](https://aerotwist.com/blog/flip-your-animations/))',
        },
      },
      {
        name: 'mode',
        type: 'string',
        default: 'undefined',
        source: 'transitions',
        description: {
          en: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: "'top center 0'",
        source: 'transitions',
        description: {
          en: 'Sets the transition origin on the element. You can find more information on the MDN documentation [for transition origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin).',
        },
      },
    ],
    mixins: [],
  },
  'v-scroll-y-reverse-transition': {
    props: [
      {
        name: 'group',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Creates a `transition-group` component. [vue docs](https://vuejs.org/v2/api/#transition-group)',
        },
      },
      {
        name: 'hideOnLeave',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Hides the leaving element (no exit animation)',
        },
      },
      {
        name: 'leaveAbsolute',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Absolutely positions the leaving element (useful for [FLIP](https://aerotwist.com/blog/flip-your-animations/))',
        },
      },
      {
        name: 'mode',
        type: 'string',
        default: 'undefined',
        source: 'transitions',
        description: {
          en: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: "'top center 0'",
        source: 'transitions',
        description: {
          en: 'Sets the transition origin on the element. You can find more information on the MDN documentation [for transition origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin).',
        },
      },
    ],
    mixins: [],
  },
  'v-slide-x-transition': {
    props: [
      {
        name: 'group',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Creates a `transition-group` component. [vue docs](https://vuejs.org/v2/api/#transition-group)',
        },
      },
      {
        name: 'hideOnLeave',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Hides the leaving element (no exit animation)',
        },
      },
      {
        name: 'leaveAbsolute',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Absolutely positions the leaving element (useful for [FLIP](https://aerotwist.com/blog/flip-your-animations/))',
        },
      },
      {
        name: 'mode',
        type: 'string',
        default: 'undefined',
        source: 'transitions',
        description: {
          en: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: "'top center 0'",
        source: 'transitions',
        description: {
          en: 'Sets the transition origin on the element. You can find more information on the MDN documentation [for transition origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin).',
        },
      },
    ],
    mixins: [],
  },
  'v-slide-x-reverse-transition': {
    props: [
      {
        name: 'group',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Creates a `transition-group` component. [vue docs](https://vuejs.org/v2/api/#transition-group)',
        },
      },
      {
        name: 'hideOnLeave',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Hides the leaving element (no exit animation)',
        },
      },
      {
        name: 'leaveAbsolute',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Absolutely positions the leaving element (useful for [FLIP](https://aerotwist.com/blog/flip-your-animations/))',
        },
      },
      {
        name: 'mode',
        type: 'string',
        default: 'undefined',
        source: 'transitions',
        description: {
          en: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: "'top center 0'",
        source: 'transitions',
        description: {
          en: 'Sets the transition origin on the element. You can find more information on the MDN documentation [for transition origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin).',
        },
      },
    ],
    mixins: [],
  },
  'v-slide-y-transition': {
    props: [
      {
        name: 'group',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Creates a `transition-group` component. [vue docs](https://vuejs.org/v2/api/#transition-group)',
        },
      },
      {
        name: 'hideOnLeave',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Hides the leaving element (no exit animation)',
        },
      },
      {
        name: 'leaveAbsolute',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Absolutely positions the leaving element (useful for [FLIP](https://aerotwist.com/blog/flip-your-animations/))',
        },
      },
      {
        name: 'mode',
        type: 'string',
        default: 'undefined',
        source: 'transitions',
        description: {
          en: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: "'top center 0'",
        source: 'transitions',
        description: {
          en: 'Sets the transition origin on the element. You can find more information on the MDN documentation [for transition origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin).',
        },
      },
    ],
    mixins: [],
  },
  'v-slide-y-reverse-transition': {
    props: [
      {
        name: 'group',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Creates a `transition-group` component. [vue docs](https://vuejs.org/v2/api/#transition-group)',
        },
      },
      {
        name: 'hideOnLeave',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Hides the leaving element (no exit animation)',
        },
      },
      {
        name: 'leaveAbsolute',
        type: 'boolean',
        default: 'false',
        source: 'transitions',
        description: {
          en: 'Absolutely positions the leaving element (useful for [FLIP](https://aerotwist.com/blog/flip-your-animations/))',
        },
      },
      {
        name: 'mode',
        type: 'string',
        default: 'undefined',
        source: 'transitions',
        description: {
          en: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
        },
      },
      {
        name: 'origin',
        type: 'string',
        default: "'top center 0'",
        source: 'transitions',
        description: {
          en: 'Sets the transition origin on the element. You can find more information on the MDN documentation [for transition origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin).',
        },
      },
    ],
    mixins: [],
  },
  'v-expand-transition': {
    props: [
      {
        name: 'mode',
        type: 'string',
        default: "'in-out'",
        source: 'transitions',
        description: {
          en: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
        },
      },
    ],
    mixins: [],
  },
  'v-expand-x-transition': {
    props: [
      {
        name: 'mode',
        type: 'string',
        default: "'in-out'",
        source: 'transitions',
        description: {
          en: 'Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition).',
        },
      },
    ],
    mixins: [],
  },
  vuetify: {
    functions: [
      {
        name: 'goTo',
        signature: '(target: string | number | HTMLElement | VueComponent, options?: object): void',
        description: {
          en: 'Scroll to target location, using provided options',
        },
      },
    ],
  },
  internationalization: {
    props: [
      {
        name: 'locales',
        default: '{ en: VuetifyLocale }',
        type: 'Record<string, VuetifyLocale>',
        description: {
          en: 'Available locales',
        },
      },
      {
        name: 'current',
        default: 'en',
        type: 'string',
        description: {
          en: 'Current locale',
        },
      },
    ],
    functions: [
      {
        name: 't',
        default: '(key: string, ...params: Array<string | number>): string',
        type: 'Function',
        description: {
          en: 'Translation function used internally',
        },
      },
    ],
  },
  'v-mutate': {
    options: [
      {
        name: 'modifiers.once',
        default: false,
        type: 'boolean',
        snippet: 'html_directive_mutate_once',
        description: {
          en: 'Will only invoke the provided user callback once, then directive will be unbound.',
        },
      },
      {
        name: 'modifiers.attr',
        default: true,
        type: 'boolean',
        snippet: 'html_directive_mutate_attr',
        description: {
          en: 'Sets the value of [attributes](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit/attributes) to true.',
        },
      },
      {
        name: 'modifiers.char',
        default: true,
        type: 'boolean',
        snippet: 'html_directive_mutate_char',
        description: {
          en: 'Sets the value of [characterData](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit/characterData) to true.',
        },
      },
      {
        name: 'modifiers.child',
        default: true,
        type: 'boolean',
        snippet: 'html_directive_mutate_child',
        description: {
          en: 'Sets the value of [childList](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit/childList) to true.',
        },
      },
      {
        name: 'modifiers.sub',
        default: true,
        type: 'boolean',
        snippet: 'html_directive_mutate_sub',
        description: {
          en: 'Sets the value of [subtree](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe#Parameters) to true.',
        },
      },
      {
        name: 'value',
        default: '(): {}',
        type: 'function | object',
        snippet: 'html_directive_mutate',
        description: {
          en: 'The function to invoke when the target element is updated.',
        },
      },
    ],
    type: 'undefined',
  },
  'v-intersect': {
    options: [
      {
        name: 'modifiers.once',
        default: false,
        type: 'boolean',
        snippet: 'html_directive_intersect_once',
        description: {
          en: 'Will only invoke the provided user callback on mount and once intersected. If using the **quiet** modifier will only invoke once.',
        },
      },
      {
        name: 'modifiers.quiet',
        default: false,
        type: 'boolean',
        snippet: 'html_directive_intersect_quiet',
        description: {
          en: 'Will not automatically invoke the provided callback on bind.',
        },
      },
      {
        name: 'value',
        default: 'undefined',
        type: 'Function | { handler: Function, options?: IntersectionObserverInit }',
        snippet: 'html_directive_intersect',
        description: {
          en: 'The function to invoke when the targeted element is intersected.',
        },
      },
    ],
    type: 'undefined',
  },
  'v-ripple': {
    options: [
      {
        name: 'value',
        default: '{}',
        type: 'object',
        description: {
          en: '',
        },
      },
      {
        name: 'center',
        default: 'false',
        type: 'boolean',
        description: {
          en: '`v-ripple="{ "center": true }"` Force ripple to originate from the center of the target',
        },
      },
      {
        name: 'class',
        default: '""',
        type: 'string',
        description: {
          en: "`v-ripple=\"{ \"class\": 'my-class' }\"` Applies a custom class to the ripple, used for changing color",
        },
      },
    ],
    type: 'undefined',
  },
  'v-resize': {
    options: [
      {
        name: 'modifiers.quiet',
        default: 'false',
        type: 'boolean',
        description: {
          en: '`v-resize.quiet="callback"` Will **not** automatically invoke the provided callback on bind.',
        },
      },
      {
        name: 'value',
        default: 'undefined',
        type: 'Function',
        description: {
          en: '`v-resize="callback"` The function to invoke on window resize',
        },
      },
    ],
    type: 'undefined',
  },
  'v-scroll': {
    options: [
      {
        name: 'arg:target',
        default: 'window',
        type: 'string',
        description: {
          en: '`v-scroll:#target="callback"` The target watched for scroll changes. Defaults to window but can be changed to any valid id selector.',
        },
      },
      {
        name: 'arg:self',
        default: false,
        type: 'boolean',
        description: {
          en: '`v-scroll.self="callback"` Binds to the element that the the directive is attached.',
        },
      },
      {
        name: 'value',
        default: '(): {}',
        type: 'Function',
        description: {
          en: '`v-scroll="callback"` The function to invoke on target scroll',
        },
      },
    ],
    type: 'undefined',
  },
  'v-touch': {
    options: [
      {
        name: 'value',
        default: '{}',
        type: 'object',
        description: {
          en: '',
        },
      },
    ],
    type: 'undefined',
  },
  'v-click-outside': {
    options: [
      {
        name: 'value',
        default: 'undefined',
        type: '((e: Event) => void) | ClickOutsideBindingArgs',
        snippet: 'ts_directive_click_outside_value',
        description: {
          en: 'A callback or options object.',
        },
      },
    ],
    type: 'undefined',
  },
}

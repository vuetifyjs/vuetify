<usage-new
  value="{
  'booleans': [
    'disabled',
    'hide-canvas',
    'hide-inputs',
    'hide-mode-switch',
    'show-swatches',
    'flat'
  ],
  'selects': [
    {
      'prop': 'mode',
      'label': 'Mode',
      'attrs': {
        'items': [
          'rgba',
          'hsla',
          'hexa'
        ]
      }
    }
  ],
  'sliders': [
    {
      'prop': 'dot-size',
      'attrs': {
        'min': 0,
        'max': 50
      }
    },
    {
      'prop': 'swatches-max-height',
      'attrs': {
        'min': 100,
        'max': 250
      }
    }
  ]
  }"
></usage-new>

<api
  value="[
  'v-color-picker'
  ]"
></api>

<examples
  value="[
  'simple/model',
  'intermediate/swatches',
  'intermediate/inputs',
  'intermediate/canvas'
  ]"
></examples>

<up-next
  value="[
  'components/menus',
  'styles/colors',
  'customization/theme'
  ]"
></up-next>
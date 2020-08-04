module.exports = {
  'v-click-outside': {
    options: [
      {
        name: 'value',
        default: 'undefined',
        type: '((e: Event) => void) | ClickOutsideBindingArgs',
        snippet: 'ts_directive_click_outside_value',
      },
    ],
  },
}

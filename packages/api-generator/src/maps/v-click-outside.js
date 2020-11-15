module.exports = {
  'v-click-outside': {
    argument: [{
      name: 'argument',
      type: ['((e: Event) => void)', 'ClickOutsideBindingArgs'],
      default: undefined,
      example: {
        handler: '(e: Event) => void',
        'closeConditional?': '(e: Event) => boolean',
        'include?': '() => HTMLElement[]',
      },
    }],
  },
}

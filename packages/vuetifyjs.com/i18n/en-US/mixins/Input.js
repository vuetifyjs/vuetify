export default {
  props: {
    appendIcon: 'Append an icon to the component, uses same syntax as `v-icon`',
    appendIconCb: 'Callback for appended icon when clicked',
    disabled: 'Input is disabled',
    hideDetails: 'Hides hint, validation errors',
    hint: 'Hint text',
    label: 'Sets input label',
    persistentHint: 'Forces hint to always be visible',
    placeholder: `Sets the input's placeholder text`,
    prependIcon: 'Prepend an icon to the component, uses same syntax as `v-icon`',
    prependIconCb: 'Callback for prepended icon when clicked',
    readonly: 'Puts input in readonly state',
    required: 'Designates the input as required. Adds an asertisk to end of label. Does not perform any validation.',
    tabindex: 'Tabindex of input',
    toggleKeys: 'Array of key codes that will toggle the input (if it supports toggling)',
    value: 'Input value'
  }
}

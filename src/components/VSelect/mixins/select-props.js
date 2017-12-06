export default {
  props: {
    appendIcon: {
      type: String,
      default: 'arrow_drop_down'
    },
    appendIconCb: Function,
    attach: Boolean,
    auto: Boolean,
    autocomplete: Boolean,
    browserAutocomplete: {
      type: String,
      default: 'on'
    },
    cacheItems: Boolean,
    chips: Boolean,
    clearable: Boolean,
    combobox: Boolean,
    contentClass: String,
    debounceSearch: {
      type: [Number, String],
      default: 200
    },
    deletableChips: Boolean,
    dense: Boolean,
    editable: Boolean,
    hideSelected: Boolean,
    items: {
      type: Array,
      default: () => []
    },
    itemAvatar: {
      type: String,
      default: 'avatar'
    },
    itemDisabled: {
      type: String,
      default: 'disabled'
    },
    itemText: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    maxHeight: {
      type: [Number, String],
      default: 300
    },
    minWidth: {
      type: [Boolean, Number, String],
      default: false
    },
    multiple: Boolean,
    multiLine: Boolean,
    openOnClear: Boolean,
    overflow: Boolean,
    returnObject: Boolean,
    searchInput: {
      default: null
    },
    segmented: Boolean,
    singleLine: Boolean,
    solo: Boolean,
    tags: Boolean,
    valueComparator: {
      type: Function,
      default: (a, b) => {
        if (a !== Object(a)) return a === b
        const aProps = Object.keys(a)
        const bProps = Object.keys(b)
        return aProps.length === bProps.length && aProps.every(propName => (a[propName] === b[propName]))
      }
    }
  }
}

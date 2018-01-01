export default {
  header: 'Select',
  headerText: 'Select fields components are used for collecting user provided information from a list of options.',
  components: ['v-select'],
  supplemental: ['MaskTable'],
  examples: [{
    light: {
        header: 'Light theme',
        desc: 'A standard single select has a multitude of configuration options.'
      },
      dark: {
        header: 'Dark theme',
        desc: 'Selects also support theming, dark and light.',
        inverted: true,
        uninverted: true
      },
      icons: {
        header: 'Icons',
        desc: 'Use a custom prepended or appended icon.'
      },
      multiple: {
        header: 'Multiple',
        desc: 'A multi-select can utilize v-chip as the display for selected items.'
      },
      autocomplete: {
        header: 'Autocomplete',
        desc: 'Provides type-ahead autocomplete functionality.'
      },
      scopedSlots: {
        header: 'Scoped slots',
        desc: 'With the power of scoped slots, you can customize the visual output of the select. In this example we add a profile picture for both the chips and list items.'
      },
      customTextAndValue: {
        header: 'Customized item text and value',
        desc: 'You can specify the specific properties within your items array correspond to the text and value fields. By default, this is **text** and **value**. In this example we also use the `return-object` prop which will return the entire object of the selected item on selection.'
      },
      tags: {
        header: 'Tags',
        desc: 'With tags you can allow a user to create new values that may not be present in a provided items list. Keep in mind, tags only supports arrays of **primitive** items and cannot be used with props such as `item-text`, `item-value` for example.'
      },
      asynchronous: {
        header: 'Asynchronous items',
        desc: 'Sometimes you need to load data externally based upon a search query. Use the `search-input` prop with the **.sync** modifier when using the `autocomplete` prop. We also make use of the new `cache-items` prop. This will keep a unique list of all items that have been passed to the `items` prop and is **REQUIRED** when using asynchronous items and the **multiple** prop.'
      }
  }],
  props: {
    attach: 'Mixins.Detachable.props.attach',
    autocomplete: 'Filter the items in the list based on user input',
    browserAutocomplete: 'Set the autocomplete prop for the search input when using the **autocomplete** prop',
    cacheItems: 'Keeps a local _unique_ copy of all items that have been passed through the **items** prop.',
    chips: 'Changes display of selections to chips',
    combobox: 'The single select variant of **tags**',
    contentClass: 'Mixins.Detachable.props.contentClass',
    debounceSearch: 'Debounces the search input value being emitted',
    deletableChips: 'Adds a remove icon to selected chips',
    dense: 'Lowers max height of list items',
    disabled: 'Disables the input',
    editable: ' Creates an editable button - <a href="https://material.io/guidelines/components/buttons.html#buttons-dropdown-buttons" target="_blank" rel="noopener">spec<a/>',
    filter: 'The function used for filtering items',
    hideSelected: 'Do not display in the select menu items that are already selected',
    itemAvatar: 'Set property of **items**\'s avatar value',
    itemDisabled: 'Set property of **items**\'s disabled value',
    itemText: 'Set property of **items**\'s text value',
    itemValue: 'Set property of **items**\'s value',
    items: 'Can be an array of objects or array of strings. When using objects, will look for a text and value field. This can be changed using the **item-text** and **item-value** props.',
    minWidth: 'Mixins.Menuable.props.minWidth',
    multiple: 'Changes select to multiple. Accepts array for value',
    multiLine: 'Causes label to float when the select component is focused or dirty',
    noDataText: 'Display text when there is no data',
    openOnClear: 'When using the **clearable** prop, once cleared, the select menu will either open or stay open, depending on the current state',
    overflow: 'Creates an overflow button - <a href="https://material.io/guidelines/components/buttons.html#buttons-dropdown-buttons" target="_blank" rel="noopener">spec</a>',
    returnObject: 'Changes the selection behavior to return the object directly rather than the value specified with item-value',
    searchInput: 'Bound when using the autocomplete prop. Use the .sync modifier to catch user input from the autocomplete search input',
    segmented: 'Creates a segmented button - <a href="https://material.io/guidelines/components/buttons.html#buttons-dropdown-buttons" target="_blank" rel="noopener">spec</a>',
    tags: 'Tagging functionality, allows the user to create new values not available from the **items** prop'
  },
  slots: {
    item: 'Scoped slot for designating the markup for a list-tile',
    selection: 'Scoped slot for designating the markup for the selected items'
  }
}

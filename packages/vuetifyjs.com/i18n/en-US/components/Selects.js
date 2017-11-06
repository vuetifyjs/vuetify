export default {
  header: 'Select',
  headerText: 'Select fields components are used for collecting user provided information from a list of options.',
  props: {
    autocomplete: 'Filter the items in the list based on user input',
    browserAutocomplete: 'Set the autocomplete prop for the search input when using the <strong>autocomplete</strong> prop',
    cacheItems: 'Keeps a local <em>unique</em> copy of all items that have been passed through the <strong>items</strong> prop.',
    chips: 'Changes display of selections to chips',
    combobox: 'The single select variant of <strong>tags</strong>',
    debounceSearch: 'Debounces the search input value being emitted',
    disabled: 'Disables the input',
    editable: ' Creates an editable button - <a href="https://material.io/guidelines/components/buttons.html#buttons-dropdown-buttons" target="_blank" rel="noopener">spec<a/>',
    filter: 'The function used for filtering items',
    hideSelected: 'Do not display in the select menu items that are already selected',
    itemAvatar: `Set property of <strong>items</strong>'s avatar value`,
    itemDisabled: `Set property of <strong>items</strong>'s disabled value`,
    itemText: `Set property of <strong>items</strong>'s text value`,
    itemValue: `Set property of <strong>items</strong>'s value`,
    items: 'Can be an array of objects or array of strings. When using objects, will look for a text and value field. This can be changed using the <strong>item-text</strong> and <strong>item-value</strong> props.',
    multiple: 'Changes select to multiple. Accepts array for value',
    multiLine: 'Causes label to float when the select component is focused or dirty',
    noDataText: 'Display text when there is no data',
    overflow: 'Creates an overflow button - <a href="https://material.io/guidelines/components/buttons.html#buttons-dropdown-buttons" target="_blank" rel="noopener">spec</a>',
    returnObject: 'Changes the selection behavior to return the object directly rather than the value specified with item-value',
    searchInput: 'Bound when using the autocomplete prop. Use the .sync modifier to catch user input from the autocomplete search input',
    segmented: 'Creates a segmented button - <a href="https://material.io/guidelines/components/buttons.html#buttons-dropdown-buttons" target="_blank" rel="noopener">spec</a>',
    tags: 'Tagging functionality, allows the user to create new values not available from the <strong>items</strong> prop'
  }
}

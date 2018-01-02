export default {
  props: {
    customFilter: 'Custom search filter',
    customSort: 'Custom sort filter',
    disableInitialSort: 'Disable default sorting on initial render',
    expand: 'Designates the table as containing rows that are expandable',
    filter: 'The function used for filtering items',
    hideActions: 'Hide the table actions',
    itemKey: 'The field in the item object that designates a unique key',
    items: 'The array of table rows',
    mustSort: 'Forces at least one column to always be sorted instead of toggling between <code>sorted ascending</code>/<code>sorted descending</code>/<code>unsorted</code> states',
    noResultsText: 'Display text when there are no filtered results',
    pagination: 'Used to control pagination and sorting from outside the data table. Can also be used to set default sorted column',
    rowsPerPageItems: 'The default values for the rows-per-page dropdown',
    rowsPerPageText: 'The default rows per page text',
    search: ' The search model for filtering results',
    selectAll: 'Adds header row select all checkbox. Can either be a String which specifies which color is applied to the button, or a Boolean (which uses the default color)',
    totalItems: 'Manually sets total number of row items, which disables built-in sort and pagination. Used together with pagination prop to enable server-side sort and pagination',
    value: 'Selected row items'
  },
  slots: {
    footer: 'Slot to specify an extra footer'
  },
  scopedSlots: {
    items: 'Slot to specify how items are rendered'
  }
}

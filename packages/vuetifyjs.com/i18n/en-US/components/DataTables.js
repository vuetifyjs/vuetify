export default {
  header: 'Data table',
  headerText: 'The <code>v-data-table</code> component is used for displaying tabular data. Features include sorting, searching, pagination, inline-editing, header tooltips, and row selection.',
  props: {
    cancelText: `Set's the default text for the cancel button when using the <strong>large</strong> prop`,
    customFilter: 'Custom search filter',
    customSort: 'Custom sort filter',
    expand: 'Designates the table as containing rows that are expandable',
    filter: 'The function used for filtering items',
    headerText: 'If using an object, the text value for the header',
    headers: 'The array of headers',
    hideActions: 'Hide the table actions',
    hideHeaders: 'Hide the table headers',
    itemKey: 'The field in the item object that designates a unique key',
    items: 'The array of table rows',
    large: 'Attachs a submit and cancel button to the dialog',
    lazy: 'Lazily load the dialog contents',
    mustSort: 'Forces at least one column to always be sorted instead of toggling between <code>sorted ascending</code>/<code>sorted descending</code>/<code>unsorted</code> states',
    noDataText: 'Display text when there is no data',
    noResultsText: 'Display text when there are no filtered results',
    pagination: 'Used to control pagination and sorting from outside the data table. Can also be used to set default sorted column',
    rowsPerPageItems: 'The default values for the rows-per-page dropdown',
    rowsPerPageText: 'The default rows per page text',
    saveText: `Set's the default text for the save button when using the <strong>large</strong> prop`,
    search: ' The search model for filtering results',
    selectAll: 'Adds header row select all checkbox. Can either be a String which specifies which color is applied to the button, or a Boolean (which uses the default color)',
    totalItems: 'Manually sets total number of row items, which disables built-in sort and pagination. Used together with pagination prop to enable server-side sort and pagination'
  }
}

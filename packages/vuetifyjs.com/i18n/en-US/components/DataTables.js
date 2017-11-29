export default {
  header: 'Data table',
  headerText: 'The <code>v-data-table</code> component is used for displaying tabular data. Features include sorting, searching, pagination, inline-editing, header tooltips, and row selection.',
  components: ['v-data-table', 'v-edit-dialog'],
  examples: [{
    standard: {
        header: 'Standard',
        desc: 'The standard data-table contains data with no additional functionality. You can opt out of displaying table actions that allow you to control the pagination of information with the <code>hide-actions</code> prop.'
      },
      noData: {
        header: 'Slots: no-data / no-results',
        desc: 'The <code>no-data</code> and <code>no-results</code> slots can display custom HTML when there\s no data or no filtered data in the table'
      },
      headers: {
        header: 'Slots: items and headers',
        desc: 'The <code>items</code> and <code>headers</code> slots can accept either a collection of <kbd>td/th</kbd> tags, or if you want control of the entire row, a <kbd>tr</kbd> tag.'
      },
      headerCell: {
        header: 'Slots: headerCell',
        desc: 'If you only want to apply some common markup or effect on each of the header cells, you can use the slot <code>headerCell</code>. In this example is has been used to apply a tooltip to each header.'
      },
      footer: {
        header: 'Slots: footer',
        desc: 'There is also a <code>footer</code> slot for when you want to add some extra functionality to tables, for example per column filtering or search.'
      },
      expand: {
        header: 'Slots: expand',
        desc: 'The <code>v-data-table</code> component also supports expandable rows using the <code>expand</code> slot. You can use the prop <code>expand</code> to prevent expanded rows from closing when clicking on another row.'
      },
      select: {
        header: 'Selectable rows',
        desc: 'Selectable rows allow you to perform an action on specific and all rows.'
      },
      search: {
        header: 'Search with custom page text',
        desc: 'The data table exposes a <code>search</code> prop that allows you to filter your data.'
      },
      paginate: {
        header: 'External pagination',
        desc: 'Pagination can be controlled externally by using the <code>pagination</code> prop. Remember that you must apply the <code>.sync</code> modifier.'
      },
      sort: {
        header: 'External sorting',
        desc: 'Sorting can also be controlled externally by using the <code>pagination</code> prop. Remember that you must apply the <code>.sync</code> modifier. You can also use the prop to set the default sorted column.'
      },
      server: {
        header: 'Paginate and sort server-side',
        desc: 'If you\'re loading data from a backend and want to paginate and sort the results before displaying them, you can use the <code>total-items</code> prop. Defining this prop will disable the built-in sorting and pagination, and you will instead need to use the <code>pagination</code> prop to listen for changes. Use the <code>loading</code> prop to display a progress bar while fetching data.'
      },
      headerless: {
        header: 'Headerless tables',
        desc: 'Setting the <code>hide-headers</code> prop creates a headerless table.'
      }
  }],
  props: {
    cancelText: `Set's the default text for the cancel button when using the **large** prop`,
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
    saveText: `Set's the default text for the save button when using the **large** prop`,
    search: ' The search model for filtering results',
    selectAll: 'Adds header row select all checkbox. Can either be a String which specifies which color is applied to the button, or a Boolean (which uses the default color)',
    totalItems: 'Manually sets total number of row items, which disables built-in sort and pagination. Used together with pagination prop to enable server-side sort and pagination'
  }
}

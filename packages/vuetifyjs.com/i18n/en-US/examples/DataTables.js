export default {
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
  theme: {
    header: 'Theme support',
    desc: 'The <code>v-data-table</code> component supports the application dark theme.'
  },
  headerless: {
    header: 'Headerless tables',
    desc: 'Setting the <code>hide-headers</code> prop creates a headerless table.'
  }
}

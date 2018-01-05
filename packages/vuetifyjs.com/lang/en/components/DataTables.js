export default {
  header: 'Data table',
  headerText: 'The `v-data-table` component is used for displaying tabular data. Features include sorting, searching, pagination, inline-editing, header tooltips, and row selection.',
  components: ['v-data-table', 'v-edit-dialog'],
  examples: [{
    standard: {
        header: 'Standard',
        desc: 'The standard data-table contains data with no additional functionality. You can opt out of displaying table actions that allow you to control the pagination of information with the `hide-actions` prop.'
      },
      noData: {
        header: 'Slots: no-data / no-results',
        desc: 'The `no-data` and `no-results` slots can display custom HTML when there\s no data or no filtered data in the table'
      },
      headers: {
        header: 'Slots: items and headers',
        desc: 'The `items` and `headers` slots can accept either a collection of <kbd>td/th</kbd> tags, or if you want control of the entire row, a <kbd>tr</kbd> tag.'
      },
      headerCell: {
        header: 'Slots: headerCell',
        desc: 'If you only want to apply some common markup or effect on each of the header cells, you can use the slot `headerCell`. In this example is has been used to apply a tooltip to each header.'
      },
      footer: {
        header: 'Slots: footer',
        desc: 'There is also a `footer` slot for when you want to add some extra functionality to tables, for example per column filtering or search.'
      },
      expand: {
        header: 'Slots: expand',
        desc: 'The `v-data-table` component also supports expandable rows using the `expand` slot. You can use the prop `expand` to prevent expanded rows from closing when clicking on another row.'
      },
      select: {
        header: 'Selectable rows',
        desc: 'Selectable rows allow you to perform an action on specific and all rows.'
      },
      search: {
        header: 'Search with custom page text',
        desc: 'The data table exposes a `search` prop that allows you to filter your data.'
      },
      paginate: {
        header: 'External pagination',
        desc: 'Pagination can be controlled externally by using the `pagination` prop. Remember that you must apply the `.sync` modifier.'
      },
      sort: {
        header: 'External sorting',
        desc: 'Sorting can also be controlled externally by using the `pagination` prop. Remember that you must apply the `.sync` modifier. You can also use the prop to set the default sorted column.'
      },
      server: {
        header: 'Paginate and sort server-side',
        desc: 'If you\'re loading data from a backend and want to paginate and sort the results before displaying them, you can use the `total-items` prop. Defining this prop will disable the built-in sorting and pagination, and you will instead need to use the `pagination` prop to listen for changes. Use the `loading` prop to display a progress bar while fetching data.'
      },
      headerless: {
        header: 'Headerless tables',
        desc: 'Setting the `hide-headers` prop creates a headerless table.'
      },
      editdialog: {
        header: 'Inline Editing',
        desc: 'The `v-edit-dialog` component is used for inline-editing within data tables.'
      },
      crud: {
        header: 'CRUD Actions',
        desc: 'data-table with CRUD actions using a `v-dialog` component for editing each row'
      }
  }],
  props: {
    'v-edit-dialog': {
      cancelText: 'Sets the default text for the cancel button when using the **large** prop',
      lazy: 'Mixins.Bootable.props.lazy',
      large: 'Attachs a submit and cancel button to the dialog',
      saveText: 'Sets the default text for the save button when using the **large** prop',
      transition: 'Mixins.Transitionable.props.transition'
    },
    'v-data-table': {
      headerText: 'If using an object, the text value for the header',
      headers: 'The array of headers',
      hideHeaders: 'Hide the table headers'
    }
  },
  scopedSlots: {
    'v-data-table': {
      headerCell: 'Slot to customize header cells',
      headers: 'Slot to customize entire header'
    }
  }
}

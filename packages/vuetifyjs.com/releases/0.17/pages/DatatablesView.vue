<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          component: 'VDataTable',
          edit: 'DatatablesView',
          title: 'Data tables',
          id: '#data-tables-view',
          desc: `The <code>v-data-table</code> component is used for displaying tabular data. Features include sorting, searching, pagination, inline-editing, header tooltips, and row selection.`,
          examples: [
            { header: 'Standard', file: 'tables/standard', desc: 'The standard data-table contains data with no additional functionality. You can opt out of displaying table actions that allow you to control the pagination of information with the <code>hide-actions</code> prop.' },
            { header: 'Slots: no-data / no-results', file: 'tables/noData', desc: 'The <code>no-data</code> and <code>no-results</code> slots can display custom HTML when there\s no data or no filtered data in the table' },
            { header: 'Slots: items and headers', file: 'tables/headers', desc: 'The <code>items</code> and <code>headers</code> slots can accept either a collection of <kbd>td/th</kbd> tags, or if you want control of the entire row, a <kbd>tr</kbd> tag.' },
            { header: 'Slots: headerCell', file: 'tables/headerCell', desc: 'If you only want to apply some common markup or effect on each of the header cells, you can use the slot <code>headerCell</code>. In this example is has been used to apply a tooltip to each header.' },
            { header: 'Slots: footer', file: 'tables/footer', desc: 'There is also a <code>footer</code> slot for when you want to add some extra functionality to tables, for example per column filtering or search.' },
            { header: 'Slots: expand', file: 'tables/expand', desc: 'The <code>v-data-table</code> component also supports expandable rows using the <code>expand</code> slot. You can use the prop <code>expand</code> to prevent expanded rows from closing when clicking on another row.'},
            { header: 'Selectable rows', file: 'tables/select', desc: 'Selectable rows allow you to perform an action on specific and all rows.' },
            { header: 'Search with custom page text', file: 'tables/search', desc: 'The data table exposes a <code>search</code> prop that allows you to filter your data.' },
            { header: 'External pagination', file: 'tables/paginate', desc: 'Pagination can be controlled externally by using the <code>pagination</code> prop. Remember that you must apply the <code>.sync</code> modifier.' },
            { header: 'External sorting', file: 'tables/sort', desc: 'Sorting can also be controlled externally by using the <code>pagination</code> prop. Remember that you must apply the <code>.sync</code> modifier. You can also use the prop to set the default sorted column.' },
            { header: 'Paginate and sort server-side', file: 'tables/server', desc: 'If you\'re loading data from a backend and want to paginate and sort the results before displaying them, you can use the <code>total-items</code> prop. Defining this prop will disable the built-in sorting and pagination, and you will instead need to use the <code>pagination</code> prop to listen for changes. Use the <code>loading</code> prop to display a progress bar while fetching data.'},
            { header: 'Theme support', file: 'tables/theme', desc: 'The <code>v-data-table</code> component supports the application dark theme.'},
            { header: 'Headerless tables', file: 'tables/headerless', desc: 'Setting the <code>hide-headers</code> prop creates a headerless table.', new: '0.16.4'}
          ],
          props: {
            'v-data-table': {
              shared: ['filterable', 'loadable', 'theme'],
              params: [
                [
                  'headers',
                  'Array',
                  '[]',
                  'The array of headers'
                ],
                [
                  'header-text',
                  'String',
                  'text',
                  'If using an object, the text value for the header'
                ],
                [
                  'hide-actions',
                  'Boolean',
                  'False',
                  'Hide the table actions'
                ],
                [
                  'hide-headers',
                  'Boolean',
                  'False',
                  'Hide the table headers'
                ],
                [
                  'disable-initial-sort',
                  'Boolean',
                  'False',
                  'Disable default sorting on initial render'
                ],
                [
                  'items',
                  'Array',
                  '[]',
                  'The array of table rows'
                ],
                [
                  'no-results-text',
                  'String',
                  'No matching records found',
                  'Display text when there are no filtered results'
                ],
                [
                  'rows-per-page-text',
                  'String',
                  'Rows per page:',
                  'The default rows per page text'
                ],
                [
                  'rows-per-page-items',
                  'Array',
                  '[5, 15, 25, { text: "All", value: -1 }]',
                  'The default values for the rows-per-page dropdown'
                ],
                [
                  'select-all',
                  '[Boolean, String]',
                  'False',
                  'Adds header row select all checkbox. Can either be a String which specifies which color is applied to the button, or a Boolean (which uses the default color)'
                ],
                [
                  'item-key',
                  'String',
                  'id',
                  'Determines the item value used for identifying selected items'
                ],
                [
                  'search',
                  'String',
                  '-',
                  'The search model for filtering results'
                ],
                [
                  'filter',
                  'Function',
                  `(val, search) => boolean`,
                  'The method used by customFilter to filter each individual item. The default function does a simple indexOf check. Should return a boolean indicating if item matches search input.'
                ],
                [
                  'custom-filter',
                  'Function',
                  '(items, search, filter, headers) => array',
                  'Custom search filter. A default implementation will be used if prop is not specified. Should return an array of items matching the search input.'
                ],
                [
                  'custom-sort',
                  'Function',
                  '-',
                  'Custom sort filter'
                ],
                [
                  'must-sort',
                  'Boolean',
                  'False',
                  'Forces at least one column to always be sorted instead of toggling between <code>sorted ascending</code>/<code>sorted descending</code>/<code>unsorted</code> states'
                ],
                [
                  'total-items',
                  'Number',
                  '-',
                  'Manually sets total number of row items, which disables built-in sort and pagination. Used together with pagination prop to enable server-side sort and pagination'
                ],
                [
                  'pagination.sync',
                  'Object',
                  `{
                    sortBy: 'column',
                    page: 1,
                    rowsPerPage: 5,
                    descending: false,
                    totalItems: 0
                  }`,
                  'Used to control pagination and sorting from outside the data table. Can also be used to set default sorted column'
                ],
                [
                  'expand',
                  'Boolean',
                  'False',
                  'Designates the table as containing rows that are expandable'
                ]
              ],
              model: {
                type: ['Array'],
                default: '',
                description: 'Holds selected row items'
              }
            },
            'v-edit-dialog': {
              params: [
                [
                  'cancel-text',
                  'String',
                  'Cancel',
                  `Set's the default text for the cancel button when using the <code>large</code> prop`
                ],
                [
                  'save-text',
                  'String',
                  'Save',
                  `Set's the default text for the save button when using the <code>large</code> prop`
                ],
                [
                  'large',
                  'Boolean',
                  'False',
                  'Attaches a submit and cancel button to the dialog'
                ],
                [
                  'lazy',
                  'Boolean',
                  'False',
                  'Lazily load the dialog contents'
                ],
                [
                  'transition',
                  'String',
                  'v-slide-x-reverse-transition',
                  'The transition of the edit dialog'
                ]
              ]
            }
          },
          slots: {
            shared: ['progress'],
            'v-data-table': {
              params: [
                [
                  'scope[headerCell]',
                  'The scoped slot for each individual header cell. The available prop is <code>header</code> which is the current header. Can be used to apply some markup or effect to each cell, such as a tooltip.'
                ],
                [
                  'scope[headers]',
                  `The scoped slot for templating the headers. Provide either a <kbd>tr</kbd> tag or <kbd>th</kbd> tags for all headers. Scope properties <code>headers</code>, <code>indeterminate</code>, and <code>all</code>.`
                ],
                [
                  'scope[items]',
                  'The scoped slot for templating the row display. Available props are the currently iterated <code>item</code> and its <code>index</code> within the iterated items array. Provide either a <kbd>tr</kbd> tag or <kbd>td</kbd> tags for all columns.'
                ],
                [
                  'scope[pageText]',
                  'The scoped slot for adding custom page text.'
                ],
                [
                  'no-data',
                  'Slot displayed in the table body when there is no data (see also <code>no-data-text</code> prop)'
                ],
                [
                  'no-results',
                  'Slot displayed in the table body when there are no filtered results (see also <code>no-results-text</code> prop)'
                ]
              ]
            }
          },
          events: {
            'v-data-table': {
              params: [
                ['input', 'Array', 'Array will contain selected rows'],
              ]
            },
            'v-edit-dialog': {
              params: [
                ['open', '-', 'Edit dialog opened'],
                ['close', '-', 'Edit dialog closed'],
                ['cancel', '-', 'Cancel button was clicked'],
                ['save', '-', 'Save button was clicked'],
              ]
            },
          }
        }
      }
    },

    methods: {
      saving () {
        console.log('I saved!')
      }
    }
  }
</script>

<style lang="stylus">
  #data-tables-view
    max-width: 1200px
</style>

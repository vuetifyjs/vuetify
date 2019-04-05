const dataIteratorProps = [
  { name: 'value', source: 'v-data-iterator' },
  { name: 'singleSelect', source: 'v-data-iterator' },
  { name: 'expanded', source: 'v-data-iterator' },
  { name: 'singleExpand', source: 'v-data-iterator' },
  { name: 'loading', source: 'v-data-iterator' },
  { name: 'loadingText', source: 'v-data-iterator' },
  { name: 'noResultsText', source: 'v-data-iterator' },
  { name: 'noDataText', source: 'v-data-iterator' },
  { name: 'hideDefaultFooter', source: 'v-data-iterator' },
  { name: 'footerProps', source: 'v-data-iterator' }
]

const dataOptions = {
  page: 'number',
  itemsPerPage: 'number',
  sortBy: 'string[]',
  sortDesc: 'boolean[]',
  groupBy: 'string[]',
  groupDesc: 'boolean[]',
  multiSort: 'boolean',
  mustSort: 'boolean'
}

const dataPagination = {
  page: 'number',
  itemsPerPage: 'number',
  pageStart: 'number',
  pageStop: 'number',
  pageCount: 'number',
  itemsLength: 'number'
}

const dataScopedProps = {
  items: 'any[]',
  pagination: dataPagination,
  options: dataOptions,
  updateOptions: '(obj: any): void',
  sort: '(value: string): void',
  group: '(value: string): void',
  groupedItems: 'Record<string, any[]>'
}

const dataEvents = [
  { name: 'current-items', source: 'v-data', value: 'any[]' },
  { name: 'page-count', source: 'v-data', value: 'number' },
  { name: 'pagination', source: 'v-data', value: dataPagination },
  { name: 'update:options', source: 'v-data', value: dataOptions },
  { name: 'update:page', source: 'v-data', value: 'number' },
  { name: 'update:items-per-page', source: 'v-data', value: 'number' },
  { name: 'update:sort-by', source: 'v-data', value: 'string | string[]' },
  { name: 'update:sort-desc', source: 'v-data', value: 'boolean | boolean[]' },
  { name: 'update:group-by', source: 'v-data', value: 'string | string[]' },
  { name: 'update:group-desc', source: 'v-data', value: 'boolean | boolean[]' },
  { name: 'update:multi-sort', source: 'v-data', value: 'boolean' },
  { name: 'update:must-sort', source: 'v-data', value: 'boolean' }
]

const dataIteratorEvents = [
  { name: 'input', source: 'v-data', value: 'any[]' },
  { name: 'update:expanded', source: 'v-data', value: 'any[]' },
  { name: 'item-selected', source: 'v-data', value: '{ item: any, value: boolean }' },
  { name: 'item-expanded', source: 'v-data', value: '{ item: any, value: boolean }' }
].concat(dataEvents)

const dataTableEvents = [].concat(dataIteratorEvents)

const dataProps = [
  { name: 'items', source: 'v-data' },
  { name: 'itemKey', source: 'v-data' },
  { name: 'options', source: 'v-data' },
  { name: 'sortBy', source: 'v-data' },
  { name: 'sortDesc', source: 'v-data' },
  { name: 'customSort', source: 'v-data', default: '(items: any[], sortBy: string[], sortDesc: boolean[], locale: string, customSorters?: Record<string, compareFn>): any[]' },
  { name: 'mustSort', source: 'v-data' },
  { name: 'multiSort', source: 'v-data' },
  { name: 'page', source: 'v-data' },
  { name: 'itemsPerPage', source: 'v-data' },
  { name: 'groupBy', source: 'v-data' },
  { name: 'groupDesc', source: 'v-data' },
  { name: 'locale', source: 'v-data' },
  { name: 'disableSort', source: 'v-data' },
  { name: 'disablePagination', source: 'v-data' },
  { name: 'disableFiltering', source: 'v-data' },
  { name: 'search', source: 'v-data' },
  { name: 'customFilter', source: 'v-data', default: '(items: any[], search: string): any[]' },
  { name: 'serverItemsLength', source: 'v-data' }
]

const tableHeader = {
  text: 'string',
  value: 'string',
  'align?': '\'start\' | \'center\' | \'end\'',
  'sortable?': 'boolean',
  'divider?': 'boolean',
  'class?': 'string | string[]',
  'width?': 'string | number',
  'filter?': '(value: any, search: string, item: any): boolean',
  'sort?': '(a: any, b: any): number'
}

const dataTableHeaderScopedProps = {
  props: {
    options: dataOptions,
    pagination: dataPagination
    // TOOD: Also the rest of v-data-footer props
  },
  on: {
    'update:options': '(value: any): void'
  },
  widths: 'number[]',
  headers: 'TableHeader[]' // TODO: expand this?
}

const dataTableSlots = [
  { name: 'body.append', props: dataScopedProps },
  { name: 'body.prepend', props: dataScopedProps },
  { name: 'body', props: dataScopedProps },
  { name: 'footer', props: dataScopedProps },
  { name: 'header', props: dataTableHeaderScopedProps },
  { name: 'top', props: dataScopedProps },
  { name: 'progress', props: dataScopedProps },
  { name: 'group', props: dataScopedProps },
  { name: 'group.header', props: dataScopedProps },
  { name: 'group.summary', props: dataScopedProps },
  { name: 'item', props: dataScopedProps },
  { name: 'item.dataTableSelect', props: dataScopedProps },
  { name: 'item.dataTableExpand', props: dataScopedProps },
  { name: 'item.column.<name>', props: dataScopedProps },
  { name: 'item.expanded', props: dataScopedProps }
]

module.exports = {
  'v-data-table': {
    props: [
      {
        name: 'headers',
        example: tableHeader
      }
    ].concat(dataIteratorProps).concat(dataProps),
    slots: dataTableSlots,
    scopedSlots: dataTableSlots,
    events: dataTableEvents
  }
}

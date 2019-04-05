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

module.exports = {
  'v-data': {
    props: dataProps,
    events: dataEvents
  }
}

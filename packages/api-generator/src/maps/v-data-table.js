const deepmerge = require('../helpers/merge')
const { DataDefaultScopedSlotProps, DataOptions } = require('./v-data')
const { DataIteratorEvents, DataIteratorProps, DataIteratorSlots, DataIteratorItemScopedProps } = require('./v-data-iterator')
const { DataFooterPageTextScopedProps } = require('./v-data-footer')

const TableHeader = {
  text: 'string',
  value: 'string',
  'align?': '\'start\' | \'center\' | \'end\'',
  'sortable?': 'boolean',
  'filterable?': 'boolean',
  'divider?': 'boolean',
  'class?': 'string | string[]',
  'width?': 'string | number',
  'filter?': '(value: any, search: string, item: any) => boolean',
  'sort?': '(a: any, b: any) => number',
}

const DataTableEvents = [
  { name: 'click:row', source: 'v-data-table', value: 'any, { select: (value: boolean) => void, isSelected: boolean, expand: (value: boolean) => void, isExpanded: boolean }' },
].concat(DataIteratorEvents)

const DataTableHeaderScopedProps = {
  props: {
    headers: 'TableHeader[]',
    options: DataOptions,
    mobile: 'boolean',
    showGroupBy: 'boolean',
    someItems: 'boolean',
    everyItem: 'boolean',
  },
  on: {
    sort: DataDefaultScopedSlotProps.sort,
    group: DataDefaultScopedSlotProps.group,
    'toggle-select-all': '(value: boolean) => void',
  },
}

const DataTableFooterScopedProps = {
  props: {
    options: DataOptions,
    pagination: DataDefaultScopedSlotProps.pagination,
    itemsPerPageText: 'string',
  },
  on: '{}',
  headers: 'TableHeader[]',
  widths: '[]',
}

const DataTableHeaderColumnScopedProps = {
  header: 'TableHeader',
}

const DataTableItemScopedProps = {
  ...DataIteratorItemScopedProps,
  headers: 'TableHeader[]',
}

const DataTableItemColumnScopedProps = {
  item: 'any',
  header: 'TableHeader',
  value: 'any',
}

const DataTableHeaderSelectScopedProps = {
  props: {
    value: 'boolean',
    indeterminate: 'boolean',
  },
  on: {
    input: '(value: boolean) => void',
  },
}

const DataTableExpandedItemScopedProps = {
  item: 'any',
  headers: 'TableHeader[]',
}

const DataTableBodyScopedProps = {
  ...DataDefaultScopedSlotProps,
  headers: 'TableHeader[]',
  isMobile: 'boolean',
  isSelected: '(item: any) => boolean',
  select: '(item: any, value: boolean) => void',
  isExpanded: '(item: any) => boolean',
  expand: '(item: any, value: boolean) => void',
}

const DataGroupScopedProps = {
  group: 'string',
  options: DataOptions,
  items: 'any[]',
  headers: 'TableHeader[]',
}

const DataGroupHeaderScopedProps = {
  group: 'string',
  groupBy: DataOptions.groupBy,
  items: 'any[]',
  headers: 'TableHeader[]',
  isOpen: 'boolean',
  toggle: '() => void',
  remove: '() => void',
}

const DataGroupSummaryScopedProps = {
  group: 'string',
  groupBy: DataOptions.groupBy,
  items: 'any[]',
  headers: 'TableHeader[]',
  isOpen: 'boolean',
  toggle: '() => void',
}

const DataTableSlots = [
  { name: 'body.append', props: DataTableBodyScopedProps },
  { name: 'body.prepend', props: DataTableBodyScopedProps },
  { name: 'body', props: DataTableBodyScopedProps },
  { name: 'footer', props: DataTableFooterScopedProps },
  { name: 'footer.page-text', props: DataFooterPageTextScopedProps },
  { name: 'header', props: DataTableHeaderScopedProps },
  { name: 'header.data-table-select', props: DataTableHeaderSelectScopedProps },
  { name: 'header.<name>', props: DataTableHeaderColumnScopedProps },
  { name: 'top', props: DataDefaultScopedSlotProps },
  { name: 'progress' },
  { name: 'group', props: DataGroupScopedProps },
  { name: 'group.header', props: DataGroupHeaderScopedProps },
  { name: 'group.summary', props: DataGroupSummaryScopedProps },
  { name: 'item', props: { ...DataTableItemScopedProps, index: 'number' } },
  { name: 'item.data-table-select', props: DataTableItemScopedProps },
  { name: 'item.data-table-expand', props: DataTableItemScopedProps },
  { name: 'item.<name>', props: DataTableItemColumnScopedProps },
  { name: 'expanded-item', props: DataTableExpandedItemScopedProps },
]

module.exports = {
  'v-data-table': {
    props: deepmerge(DataIteratorProps, [
      {
        name: 'headers',
        type: 'TableHeader[]',
        example: TableHeader,
      },
      {
        name: 'customFilter',
        default: '(value: any, search: string | null, item: any) => boolean',
      },
    ]),
    slots: deepmerge(DataTableSlots, DataIteratorSlots),
    events: DataTableEvents,
  },
  TableHeader,
  DataTableEvents,
  DataTableHeaderScopedProps,
  DataTableSlots,
}

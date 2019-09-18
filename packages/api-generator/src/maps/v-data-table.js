const deepmerge = require('../helpers/merge')
const { DataDefaultScopedSlotProps, DataOptions } = require('./v-data')
const { DataIteratorEvents, DataIteratorProps, DataIteratorSlots, DataIteratorItemScopedProps } = require('./v-data-iterator')
const { DataFooterPageTextScopedProps } = require('./v-data-footer')

const TableHeader = {
  text: 'string',
  value: 'string',
  'align?': '\'start\' | \'center\' | \'end\'',
  'sortable?': 'boolean',
  'divider?': 'boolean',
  'class?': 'string | string[]',
  'width?': 'string | number',
  'filter?': '(value: any, search: string, item: any) => boolean',
  'sort?': '(a: any, b: any) => number',
}

const DataTableEvents = [
  { name: 'click:row', source: 'v-data-table', value: 'any' },
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
}

const DataTableSlots = [
  { name: 'body.append', props: DataTableBodyScopedProps },
  { name: 'body.prepend', props: DataTableBodyScopedProps },
  { name: 'body', props: DataTableBodyScopedProps },
  { name: 'footer', props: DataDefaultScopedSlotProps },
  { name: 'footer.page-text', props: DataFooterPageTextScopedProps },
  { name: 'header', props: DataTableHeaderScopedProps },
  { name: 'header.data-table-select', props: DataTableHeaderSelectScopedProps },
  { name: 'header.<name>', props: DataTableHeaderColumnScopedProps },
  { name: 'top', props: DataDefaultScopedSlotProps },
  { name: 'progress', props: DataDefaultScopedSlotProps },
  { name: 'group', props: DataDefaultScopedSlotProps },
  { name: 'group.header', props: DataDefaultScopedSlotProps },
  { name: 'group.summary', props: DataDefaultScopedSlotProps },
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

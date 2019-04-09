const { DataDefaultScopedSlotProps, DataOptions, DataPagination, DataProps } = require('./v-data')
const { DataIteratorEvents, DataIteratorProps } = require('./v-data-iterator')

const TableHeader = {
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

const DataTableEvents = [].concat(DataIteratorEvents)

const DataTableHeaderScopedProps = {
  props: {
    options: DataOptions,
    pagination: DataPagination
    // TOOD: Also the rest of v-data-footer props
  },
  on: {
    'update:options': '(value: any): void'
  },
  widths: 'number[]',
  headers: 'TableHeader[]' // TODO: expand this?
}

const DataTableSlots = [
  { name: 'body.append', props: DataDefaultScopedSlotProps },
  { name: 'body.prepend', props: DataDefaultScopedSlotProps },
  { name: 'body', props: DataDefaultScopedSlotProps },
  { name: 'footer', props: DataDefaultScopedSlotProps },
  { name: 'header', props: DataTableHeaderScopedProps },
  { name: 'top', props: DataDefaultScopedSlotProps },
  { name: 'progress', props: DataDefaultScopedSlotProps },
  { name: 'group', props: DataDefaultScopedSlotProps },
  { name: 'group.header', props: DataDefaultScopedSlotProps },
  { name: 'group.summary', props: DataDefaultScopedSlotProps },
  { name: 'item', props: DataDefaultScopedSlotProps },
  { name: 'item.dataTableSelect', props: DataDefaultScopedSlotProps },
  { name: 'item.dataTableExpand', props: DataDefaultScopedSlotProps },
  { name: 'item.column.<name>', props: DataDefaultScopedSlotProps },
  { name: 'item.expanded', props: DataDefaultScopedSlotProps }
]

module.exports = {
  'v-data-table': {
    props: [
      {
        name: 'headers',
        example: TableHeader
      }
    ].concat(DataIteratorProps).concat(DataProps),
    slots: DataTableSlots,
    scopedSlots: DataTableSlots,
    events: DataTableEvents
  },
  TableHeader,
  DataTableEvents,
  DataTableHeaderScopedProps,
  DataTableSlots
}

const { DataDefaultScopedSlotProps, DataOptions, DataProps } = require('./v-data')
const { DataIteratorEvents, DataIteratorProps } = require('./v-data-iterator')
const { DataFooterPageTextScopedProps } = require('./v-data-footer')

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
    headers: 'TableHeader[]',
    options: DataOptions,
    mobile: 'boolean',
    showGroupBy: 'boolean',
    someItems: 'boolean',
    everyItem: 'boolean'
  },
  on: {
    sort: DataDefaultScopedSlotProps.sort,
    group: DataDefaultScopedSlotProps.group,
    'toggle-select-all': '(value: boolean): void'
  }
}

const DataTableHeaderColumnScopedProps = {
  header: 'TableHeader'
}

const DataTableItemColumnScopedProps = {
  item: 'any',
  header: 'TableHeader',
  value: 'any'
}

const DataTableSelectScopedProps = {
  item: 'any',
  props: {
    value: 'boolean'
  },
  on: {
    input: '(value: boolean): void'
  }
}

const DataTableExpandScopedProps = {
  item: 'any',
  props: {
    expanded: 'boolean'
  },
  on: {
    click: '(value: boolean): void'
  }
}

const DataTableExpandedItemScopedProps = {
  item: 'any',
  headers: 'TableHeader[]'
}

const DataTableSlots = [
  { name: 'body.prepend', props: DataDefaultScopedSlotProps },
  { name: 'body', props: DataDefaultScopedSlotProps },
  { name: 'footer', props: DataDefaultScopedSlotProps },
  { name: 'footer.page-text', props: DataFooterPageTextScopedProps },
  { name: 'header', props: DataTableHeaderScopedProps },
  { name: 'header.data-table-select', props: DataTableSelectScopedProps },
  { name: 'header.data-table-expand', props: DataTableExpandScopedProps },
  { name: 'header.<name>', props: DataTableHeaderColumnScopedProps },
  { name: 'top', props: DataDefaultScopedSlotProps },
  { name: 'progress', props: DataDefaultScopedSlotProps },
  { name: 'group', props: DataDefaultScopedSlotProps },
  { name: 'group.header', props: DataDefaultScopedSlotProps },
  { name: 'group.summary', props: DataDefaultScopedSlotProps },
  { name: 'item', props: DataDefaultScopedSlotProps },
  { name: 'item.data-table-select', props: DataTableSelectScopedProps },
  { name: 'item.data-table-expand', props: DataTableExpandScopedProps },
  { name: 'item.<name>', props: DataTableItemColumnScopedProps },
  { name: 'expanded-item', props: DataTableExpandedItemScopedProps }
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

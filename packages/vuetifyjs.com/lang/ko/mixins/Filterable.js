export default {
  props: {
    noDataText: '데이터가 없을때 보여지는 문자열'
  },
  slots: {
    blur: 'Emitted when the input is blurred',
    change: 'Emitted when the select is changed by user interaction',
    'update:error': 'The `update.sync` event'
  }
}

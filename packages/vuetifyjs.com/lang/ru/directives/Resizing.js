export default {
  header: 'Изменить размер',
  headerText: 'Директива `v-resize` может использоваться для вызова определенных функций при изменении размера окна.',
  components: ['v-resize'],
  examples: [{
    default: {
      header: 'По умолчанию',
      desc: 'Измените размер окна и соблюдайте изменения значений.',
      uninverted: true
    }
  }],
  params: [{
    'v-resize': [
      {
        name: 'callback',
        type: 'Function',
        default: 'null'
      },
      {
        name: 'quiet',
        type: 'Boolean',
        default: 'false',
        desc: 'Не вызывать метод обратного вызова, когда директива привязана'
      },
      {
        name: 'debounce',
        type: 'Number',
        default: '200'
      }
    ]
  }]
}

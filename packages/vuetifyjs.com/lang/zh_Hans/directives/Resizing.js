export default {
  header: '调整指令',
  headerText: '当调整窗口大小时，`v-resize`指令可用于调用指定的函数。',
  components: ['v-resize'],
  examples: [{
    default: {
      header: 'Default',
      desc: '调整您的浏览器窗口大小并观察值的变化..',
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
        desc: '绑定指令时不要调用回调方法'
      },
      {
        name: 'debounce',
        type: 'Number',
        default: '200'
      }
    ]
  }]
}

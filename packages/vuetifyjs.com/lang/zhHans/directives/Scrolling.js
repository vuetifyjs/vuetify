export default {
  header: '滚动指令',
  headerText: '`v-scroll`指令允许您在窗口或者特定定义的元素滚动时提供回调。',
  components: ['v-scroll'],
  examples: [{
    default: {
      header: 'Default',
      desc: '默认行为是绑定到窗口。如果不需要其他配置选项，则可以简单得传递回调函数。',
      uninverted: true
    },
    options: {
      header: '滚动选项',
      desc: '为了更好地调整方法，您可以给指定目标绑定滚动事件监听器。',
      uninverted: true
    }
  }],
  params: [{
    'v-scroll': [
      {
        name: 'callback',
        type: 'Function',
        default: 'null'
      },
      {
        name: 'target',
        type: 'String',
        default: 'null',
        desc: '用于绑定滚动事件监听器的DOM元素'
      },
      {
        name: 'debounce',
        type: 'Object',
        default: '{ _passive_: **true** }',
        desc: '要传递给绑定了目标的事件监听器的选项'
      }
    ]
  }]
}

export default {
  header: '触摸支持',
  headerText: '`v-touch`</code>`指令允许您捕获轻扫手势手势并应用定向回调。',
  components: ['v-touch'],
  examples: [{
    default: {
      header: 'Default',
      desc: '在一个移动设备上，尝试向各个方向滑动。',
      uninverted: true
    }
  }],
  props: [{
    'v-touch': [
      {
        name: '[up, down, left, right]',
        type: 'Function',
        default: 'null',
        desc: '根据滑动方向分配回调。目前不建议配对x轴和y轴回调。'
      },
      {
        name: '[move, start, end]',
        type: 'Function',
        default: 'null',
        desc: '在触摸事件开始、结束或者正在进行的时候分配一个回调。'
      }
    ]
  }]
}

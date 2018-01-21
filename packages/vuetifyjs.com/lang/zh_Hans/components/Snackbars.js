export default {
  header: '小吃吧',
  headerText: '`v-snackbar`组件用于向用户显示快速消息，小吃吧支持定位、删除延迟和回调。',
  components: ['v-snackbar'],
  examples: [{
    position: {
      header: '位置',
      desc: '标准小吃吧对于引起用户对刚发生的一些功能的注意力是有用的。'
    },
    contextual: {
      header: '上下文',
      desc: '您可以在小吃吧上应用一个色彩，以更好的适应您的实现。'
    }
  }],
  props: {
    multiLine: '识小吃吧更高（移动设备）',
    timeout: '等待小吃吧自动隐藏的时间',
    vertical: '垂直折叠小吃店的内容（移动设备）'
  }
}

export default {
  header: '头像',
  headerText: '`v-avatar`组件被用来控制用于控制响应图像的大小和边界半径，通常用于显示个人介绍的图片。',
  components: ['v-avatar'],
  examples: [{
    standard: {
      header: '标准显示',
      desc: '头像有一个动态的大小，可以在任何情况下缩放。一个**瓷砖** 的变体可用于显示无边框半径的头像。'
    },
    advanced: {
      header: '高级用法',
      desc: '将头像与其他组件组合在一起，您就可以构建漂亮的用户界面。'
    },
    iconAndText: {
      header: '图标和文本',
      desc: '头像也接受`v-icon`组件或者文本。将他们混合和匹配功能，就可以创建一些独特的东西。'
    }
  }]
}

export default {
  header: '扩展面板',
  headerText: '`v-expansion-panel`组件对于减少大量信息的垂直空间非常有用。该组件的默认功能是一次仅显示一个展开面板主题。但是使用`expandable`属性后，扩展面板会保持打开状态，直到被显式关闭。',
  components: ['v-expansion-panel', 'v-expansion-panel-content'],
  examples: [{
    accordion: {
      header: '手风琴',
      desc: '手风琴面板一次只能打开一个面板。'
    },
    expand: {
      header: '扩展',
      desc: '扩展面板将保持打开知道被关闭。',
      uninverted: true
    },
    popout: {
      header: '弹出与嵌入',
      desc: '扩展面板还有两种可以用属性`popout`和`inset`激活的替代设计',
      inverted: true
    },
    customIcons: {
      header: 'Custom icon',
      desc: 'Expand action icon can be customized with `expand-icon` prop.'
    },
    focusable: {
      header: '调焦',
      desc: '扩展面板头部可以通过`focusable`属性进行调焦。',
      uninverted: true
    }
  }],
  props: {
    'v-expansion-panel': {
      expand: '选择另一个时，将扩展面板打开',
      focusable: '使扩展面板标题可以调焦',
      inset: '使扩展面板以嵌入的样式打开',
      popout: '使扩展面板以弹出的样式打开'
    },
    'v-expansion-panel-content': {
      hideActions: '隐藏内容标题中的展开图标',
      expandIcon: 'Set the expand action icon'
    }
  }
}

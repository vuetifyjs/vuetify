export default {
  header: '分页',
  headerText: '`v-pagination`组件用于分隔长的数据集，以便用户更容易地使用信息。根据提供的长度，分页组件将自动缩放。要维护当前页面，只需提供一个v-model标签。',
  components: ['v-pagination'],
  examples: [{
    short: {
      header: '短的',
      desc: '如果父容器足够大，分页器会显示所有页面按钮。'
    },
    long: {
      header: '长的',
      desc: '当页面按钮的水浪超过父容器时，组件将截断列表。'
    },
    limit: {
      header: '限制',
      desc: '您可以用`total-visible`属性手动设置可见页面按钮的最大数量。'
    },
    round: {
      header: '圆形',
      desc: '分页的另一种分割是圆形页面按钮'
    },
    icons: {
      header: 'Icons',
      desc: 'Previous and next page icons can be customized with `prev-icon` and `next-icon` props.'
    },
    disabled: {
      header: '禁用',
      desc: '分页按钮可以手动禁用。'
    }
  }]
}

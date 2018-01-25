export default {
  header: '对话框',
  headerText: '`v-dialog` 组件用来通知用户有关特定任务的信息，并且可能包含重要信息，需要作出决定或者涉及多任务；应谨慎使用对话框，因为它是中断的。',
  components: ['v-dialog'],
  examples: [{
    simple: {
      header: '简易对话框',
      desc: '选择一个选项立即提交后会关闭菜单；点击对话框之外，或者按下后退，取消操作即可关闭对话框。',
      uninverted: true
    },
    withoutActivator: {
      header: '没有激活器',
      desc: '如果因为某些原因而不能使用 activator slot(激活器插槽)，请确保将`.stop`修饰符添加到触发对话框的事件。',
      uninverted: true
    },
    modal: {
      header: '模态框',
      desc: '类似于简单对话框，除了说点击对话框外部不会关闭外。',
      uninverted: true
    },
    fullscreen: {
      header: '全屏对话框',
      desc: '由于空间的限制，全屏对话框可能更适用于移动设备，相对大屏设备来说。',
      uninverted: true
    },
    form: {
      header: '表单对话框',
      desc: '这里有一个简单的表单对话框的例子。',
      uninverted: true
    },
    scrollable: {
      header: '可滚动',
      desc: '一个可滚动内容的对话框示例',
      uninverted: true
    },
    overflowed: {
      header: '溢出',
      desc: '如果内容溢出有效窗口空间，将会滚动容器',
      uninverted: true
    }
  }],
  props: {
    disabled: '禁用打开对话框',
    fullWidth: '指定模态框强制100%宽度',
    fullscreen: '改变布局全屏显示',
    hideOverlay: '隐藏遮罩',
    lazy: 'Mixins.Bootable.props.lazy',
    maxWidth: '内容的最大宽度',
    origin: 'Mixins.Transitionable.props.origin',
    persistent: '点击对话框外部不能使其关闭',
    scrollable: '当包含card, card-title, card-text 以及 card-actions这几个的对话框可滚动设为 true 的时候； card-text 应该指定高度并且设置 overflow-y',
    width: '设置对话框的宽度'
  }
}

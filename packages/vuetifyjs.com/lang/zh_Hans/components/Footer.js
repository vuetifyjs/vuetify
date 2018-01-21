export default {
  header: '脚部',
  headerText: '`v-footer`用于显示用户可能希望从站点内的所有页面访问到的公共信息。',
  components: ['v-footer'],
  examples: [{
    default: {
      header: '默认',
      desc: '脚部组件只是一个普通的容器'
    }
  }],
  props: {
    absolute: 'Mixins.Positionable.props.absolute',
    fixed: 'Mixins.Positionable.props.fixed',
    inset: '定位工具栏偏离应用程序的`v-navigation-drawer`的位置'
  }
}

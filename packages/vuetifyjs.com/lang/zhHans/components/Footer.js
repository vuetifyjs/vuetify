export default {
  header: '页脚',
  headerText: '`v-footer`用于显示用户可能希望从站点内的所有页面访问到的公共信息。',
  components: ['v-footer'],
  examples: [{
    default: {
      header: '默认',
      desc: '页脚组件只是一个基本的容器。'
    },
    companyFooter: {
      header: '公司页脚',
      desc: '使用 footer 组件制作一个包含一些页面链接的公司页脚。'
    },
    indigoFooter: {
      header: '靛蓝色页脚',
      desc: '使用 footer 组件制作一个靛蓝背景以及包含一些社交媒体图标按钮的页脚。'
    },
    tealFooter: {
      header: '蓝绿色页脚',
      desc: '使用 footer 组件制作一个蓝绿色顶部以及几个行列链接的页脚。'
    }
  }],
  props: {
    absolute: 'Mixins.Positionable.props.absolute',
    fixed: 'Mixins.Positionable.props.fixed',
    inset: '定位工具栏偏离应用程序的`v-navigation-drawer`的位置'
  }
}

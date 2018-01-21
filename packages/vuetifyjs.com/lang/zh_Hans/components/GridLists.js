export default {
  header: '栅格列表',
  headerText: '栅格列表是`v-container`组件的一个插件，可以在项目之间添加沟槽控件。',
  components: ['v-container', 'v-layout', 'v-flex', 'v-spacer'],
  examples: [{
    default: {
      header: '栅格列表',
      desc: '栅格列表增加了`v-container`空间，以便为排水沟提供更大的灵活性。它有5个变种，从xs到xl都可以动态改变。'
    },
    subheader: {
      header: '栅格列表',
      desc: '栅格列表将与您当前的栅格实现无缝协作，并允许您创建出色的用户界面。'
    }
  }],
  props: {
    tag: 'Mixins.Routable.props.tag'
  }
}

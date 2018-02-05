export default {
  header: '选项卡',
  headerText: '`v-tabs`组件用于隐藏可选项目后面的内容。这也可以用作页面的伪导航（pseudo-navigation），其中标签是链接，选项卡子项是内容。',
  components: [
    'v-tabs',
    'v-tabs-slider',
    'v-tabs-item',
    'v-tabs-items',
    'v-tabs-content'
  ],
  examples: [{
    toolbar: {
      header: '工具栏选项卡',
      desc: ''
    },
    fixedTabs: {
      header: '固定选项卡',
      desc: '**fixed-tabs**属性设置一个较高的最小宽度，并将一个新的最大宽度应用于`v-tabs-items`。在桌面屏幕上，选项卡标签项目将在`v-tabs`组件中居中，切换到移动设备时则均匀填充。'
    },
    // right: {
    //   header: 'Right aligned tabs',
    //   desc: 'The **right** prop aligns the tabs to the right'
    // },
    content: {
      header: '内容',
      desc: '选项卡不是您在`v-tabs`组件中唯一可以放置的东西。在这个例子中，我们还添加了一个工具栏。'
    },
    search: {
      header: '搜索框',
      desc: '这是在`v-tabs`中添加内容的另一个例子。'
    },
    iconsAndText: {
      header: '图标和文本',
      desc: '通过使用**icons-and-text**属性，您可以为每个选项卡标签项添加图标。'
    },
    desktop: {
      header: '桌面选项卡',
      desc: ''
    },
    alignWithTitle: {
      header: '与工具栏标题对齐选项卡',
      desc: '使`v-tabs`和`v-toolbar-title`组件已知（`v-toolbar-side-icon`或`v-btn`必须在`v-toolbar`中使用）。如果标签文本被包装，可能无法正常工作。'
    },
    grow: {
      header: '长大',
      desc: '**grow**属性将使选项卡标签占用所有可用空间。'
    },
    pagination: {
      header: '分页',
      desc: '如果选项卡标签溢出它们的容器，分页控件将会出现'
    },
    icons: {
      header: '自定义图标',
      desc: '**prev-icon**和**next-icon**可以用来设置分页器的自定义图标'
    }
  }],
  props: {
    alignWithTitle: '让`v-tabs`与工具栏标题对齐',
    prevIcon: '右分页图标',
    nextIcon: '左分页图标',
    right: '将选项向右侧对齐'
  }
}

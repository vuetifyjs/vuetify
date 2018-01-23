export default {
  header: '栅格系统',
  headerText: 'Vuetify拥有一个12点的栅格系统，它使用<kbd>flex-box</kbd>构建，栅格用于布局应用程序的内容。它包含5种类型的媒体断点，用于定位特定的屏幕大小或方向。栅格组件的属性实际上是从它们定义的属性派生的类，这允许您轻松地将这些辅助类指定为属性，同时仍然提供在任何地方使用的类。',
  components: ['v-container', 'v-layout', 'v-flex', 'v-spacer'],
  examples: [{
    grid: {
      header: '用例',
      desc: '`v-container`可以用于中心聚焦的页面，或者用`fluid`来扩展它的全部宽度。`v-layout`用于分隔各部分，并包含`v-flex`。您的布局结构如下，**v-container** &raquo; **v-layout** &raquo; **v-flex**。栅格链的每个部分都是一个弹性框元素，最后，`v-flex`会自动设置它的子元素获得<kbd>flex: 1 1 auto</kbd>。',
      uninverted: true
    },
    offset: {
      header: '偏移',
      desc: '偏移对于补偿可能还不可见的元素或控制内容的位置很有用。就像断点一样，您可以为仍和可用的大小设置偏移量，这使您可以根据需要精确调整应用程序布局。',
      uninverted: true
    },
    order: {
      header: '排序',
      desc: '您可以控制栅格子项目的排序。与偏移一样，您可以为不同的尺寸设置不同的排序，设计适合任何应用程序的专门的屏幕布局。',
      uninverted: true
    },
    directionAndAlign: {
      header: '方向和对齐',
      desc: '以各种方式指定方向和对齐方式。所有可用的<kbd>flex-box</kbd> api都可以通过直观的辅助器属性获得。',
      uninverted: true
    },
    rowColumnBreakpoint: {
      header: '行和列断点',
      desc: '更具分辨率动态更改布局。**（调整您的屏幕，并观看布局更改为一个`行`的小断点）**',
      uninverted: true
    },
    nestedGrid: {
      header: '嵌套栅格',
      desc: '栅格可以被嵌套，类似于其它框架，以实现非常自定义的布局。',
      uninverted: true
    },
    uniqueLayouts: {
      header: '独特的布局',
      desc: 'Vuetify栅格系统的强大和灵活性使您可以创建出色的用户界面。',
      uninverted: true
    },
    spacer: {
      header: 'v-spacer',
      desc: '当您想要填充可用空间或在两个组件之间留出空间时，`v-spacer`组件会很有用。'
    },
    tags: {
      header: 'Html标签',
      desc: '有的时候您会想要将一个布局项指定为特定的标签，比如一个`section`或者`li`元素。'
    }
  }],
  props: {
    tag: 'Mixins.Routable.props.tag'
  },
  breakpointHeader: 'Breakpoint object',
  breakpointText1: 'Vuetify将可用的断点转换为应用程序内的可访问对象。这将允许您根据视野大小分配/应用特定的属性和特性。该对象可以从一下位置被访问：',
  breakpointText2: '该对象包含与您已经习惯使用的栅格系统相同的语义属性。让我们尝试一个真实世界的例子。您有一个`v-dialog`组件，您想要在移动设备上转换成一个**全屏**对话框。通常情况下，您需要将视野大小绑定在观察者上，和/或在页面加载时进行检查。',
  breakpointText3: '这是很多的样板文字。即使您选择使用内置的[v-resize](/directives/resizing)指令，仍然必须定义调整大小的方法。使用**断点**对象，您可以完全跳过这个逻辑并重新构建您的应用程序。'
}

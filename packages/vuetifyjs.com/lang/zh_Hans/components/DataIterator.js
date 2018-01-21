export default {
  header: '数据迭代器',
  headerText: '`v-data-iterator`组件用于显示数据，并将其大部分功能与`v-data-table`组件共享。功能包括排序、搜索、分页和选择。',
  components: ['v-data-iterator'],
  examples: [{
    simple: {
      header: '示例',
      desc: '`v-data-iterator`允许您自定义如何显示您的数据。在这个例子中，我们正在使用带有卡片的栅格列表。我们可以使用`content-tag`属性（以及`content-class`和`content-props`）来指定项目周围的包装元素的外观。'
    }
  }],
  props: {
    contentClass: '将自定义类应用于列表项周围的包装元素',
    contentProps: '将自定义属性应用于列表项周围的包装元素',
    contentTag: '指定那些标签需要用于列表项周围的包装元素'
  }
}

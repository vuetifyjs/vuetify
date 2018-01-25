export default {
  header: '选择器',
  headerText: '选择器组件用于从选项列表中收集用户提供的信息。',
  components: ['v-select'],
  supplemental: ['MaskTable'],
  examples: [{
    light: {
      header: '亮色主题',
      desc: '标准的单选有多种配置选项'
    },
    icons: {
      header: '图标',
      desc: '使用自定义前置或者后置图标。'
    },
    multiple: {
      header: '多选',
      desc: '多选择器可以使用 `v-chip` 组件来显示已选项。'
    },
    autocomplete: {
      header: '自动补全',
      desc: '提供输入提前自动补全功能。'
    },
    customFilter: {
      header: '自动补全的自定义筛选',
      desc: '`filter` 属性可以用来自定义逻辑过滤每个单项，在这个例子中，我们按名称过滤选项。'
    },
    scopedSlots: {
      header: '范围插槽',
      desc: '通过使用 scoped 插槽, 你可以自定义选项的视觉输出，在这个例子中，我们将个人资料图片添加到小纸片（chips）和列表项中。'
    },
    customTextAndValue: {
      header: '自定义选项的文本和值',
      desc: '你可以指定选项数组中的文本与值字段对应的特定属性，在默认情况下是 **text** 和 **value**。在这个例子中，我们也可以用 `return-object` 属性来返回被选中的对象。'
    },
    tags: {
      header: '标签',
      desc: '使用标签，你可以允许用户创建新值，这些值可能不在提供的选项中。请记住，标签只支持原始项的数组，并且不能和 `item-text`, `item-value` 这些属性一起使用。'
    },
    asynchronous: {
      header: '异步选项',
      desc: '有时候你需要根据搜索查询从外部获取数据。当你使用 `autocomplete` 属性时可以使用 `search-input` 属性加上 **.sync** 修饰符。 我们也可以使用新的 `cache-items` 属性。这将保持传给 `items` 属性一个所有选项中的唯一列表，并且在使用异步选项以及 **multiple** 属性时是必须的。'
    }
  }],
  props: {
    attach: 'Mixins.Detachable.props.attach',
    autocomplete: '根据用户输入进行筛选',
    browserAutocomplete: '当使用 **autocomplete** 属性时为搜索框设置自动补全属性',
    cacheItems: '保留已经通过 **items** 属性的项在本地的唯一副本',
    chips: '改变一个已选择项为小纸片（chips）的显示方式',
    combobox: '在单选中 **tags** 的一个变种',
    contentClass: 'Mixins.Detachable.props.contentClass',
    debounceSearch: '去除搜索框正在 emitted 的值',
    deletableChips: '添加一个去除图标的到选定的小纸片（chips）',
    dense: '减小列表的最大高度',
    disabled: '禁用输入',
    editable: ' 创建一个可编辑按钮 - <a href="https://material.io/guidelines/components/buttons.html#buttons-dropdown-buttons" target="_blank" rel="noopener">spec<a/>',
    filter: '用于过滤选项的函数',
    hideSelected: '不要在选择菜单中显示已选择的项',
    itemAvatar: '设置 **items** 属性的头像',
    itemDisabled: ' 禁用 **items** 的属性值',
    itemText: '设置**items**\'属性的文本值',
    itemValue: '设置**items**属性的值',
    items: '可以是一个对象数组或字符窜数组，当使用对象时，会查找文本和值字段，这可以使用 **item-text** 和 **item-value** 属性来改变。',
    minWidth: 'Mixins.Menuable.props.minWidth',
    multiple: '多选，接受数组作为值',
    multiLine: '当选择器组件被聚焦或使用时，使标签浮动',
    noDataText: '当没有数据时现实的文本',
    openOnClear: '当使用 **clearable** 属性, 一旦清除，选择菜单将打开或保持打开，这个取决于当前状态',
    overflow: '创建一个溢出按钮 - <a href="https://material.io/guidelines/components/buttons.html#buttons-dropdown-buttons" target="_blank" rel="noopener">spec</a>',
    returnObject: '将选择器的行为更改为直接返回对象，而不是 item-value 指定的值',
    searchInput: '使用自动补全（autocomplete）属性，使用 .sync 修饰符从自动补全搜索框中捕获用户的输入',
    segmented: '创建一个分段按钮 - <a href="https://material.io/guidelines/components/buttons.html#buttons-dropdown-buttons" target="_blank" rel="noopener">spec</a>',
    tags: '标记功能允许用户创建一个 **items** 属性中不存在的新值'
  },
  slots: {
    item: 'Scoped slot for designating the markup for a list-tile',
    selection: 'Scoped slot for designating the markup for the selected items'
  }
}

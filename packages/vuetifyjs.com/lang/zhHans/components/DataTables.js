export default {
  header: '数据表格',
  headerText: '`v-data-table` 用于显示表格数据，功能包括排序、搜索、分页、行内编辑、头部提示以及行选择。',
  components: ['v-data-table', 'v-edit-dialog'],
  examples: [{
    standard: {
      header: '标准',
      desc: '标准的数据表格包含没有附加功能的数据。你可以通过 `hide-actions` 属性来控制是否需要显示分页信息，即 使用 `hide-action`将不分页，直接显示全部数据。'
    },
    noData: {
      header: 'no-data 插槽',
      desc: '当没有数据的时候，可以使用 `no-data` 插槽显示一段自定义HTML。'
    },
    headers: {
      header: 'items 和 headers 插槽',
      desc: '`items` 和 `headers` 可以接受 <kbd>td/th</kbd> 标签, 或者你想控制一整行，可以使用 <kbd>tr</kbd> 标签.'
    },
    headerCell: {
      header: 'headerCell 插槽',
      desc: '如果你想对每个表头单元应用一些常见的标记或者效果，可以使用 `headerCell` 插槽，这下面的例子中就是将提示信息应用到表头的每个单元。'
    },
    progress: {
      header: 'progress 插槽',
      desc: '这里也有一个 `progress` 插槽让你可以自定义显示表格的加载状态，默认情况下这是一个`indeterminate` `v-progress-linear`（即不确定进度的线性进度条）。'
    },
    footer: {
      header: 'footer 插槽',
      desc: '如果你还想添加一些额外的功能，比如每列过滤或者搜索，你可以使用 `footer` 插槽。'
    },
    expand: {
      header: 'expand 插槽',
      desc: '`v-data-table` 组件还支持行展开，通过使用`expand` 插槽。 另外你可以使用 `expand` 属性来避免你点击另一行的时候已展开的行关闭。'
    },
    pageText: {
      header: 'page-text 插槽',
      desc: '你可以使用`page-text` 插槽来自定义显示范围以及总条目。'
    },
    select: {
      header: '行选择框',
      desc: '使用行选择框能让你进行行选择操作。'
    },
    search: {
      header: '搜索以及无结果时的 no-result 插槽',
      desc: '数据表格还提供了一个 `search` 属性，允许你进行数据筛选。'
    },
    customIcons: {
      header: 'Custom icons',
      desc: 'Previous/next pagination icons and sort icon can be customized with **prev-icon**, **next-icon** and **sort-icon** props.'
    },
    paginate: {
      header: '外部分页',
      desc: '分页可以通过 `pagination` 属性在外部控制，切记使用时必须应用 `.sync` 修饰符。'
    },
    sort: {
      header: '外部排序',
      desc: '排序也同样可以通过 `pagination` 属性在外部控制，也必须使用 `.sync` 修饰符。你也可以使用该属性设置默认的排序序列。'
    },
    server: {
      header: '服务端分页和排序',
      desc: '如果你从后台加载数据，并希望显示结果之前进行分页和排序，你可以使用 `total-items` 属性。定义这个属性将会禁用内置的分页和排序，并且你需要使用 `pagination` 属性来监听变化。使用 `loading` 属性来显示获取数据时的进度条。'
    },
    headerless: {
      header: '无头表格',
      desc: '设置 `hide-headers` 属性来创建一个无头表格。'
    },
    editdialog: {
      header: '行内编辑',
      desc: '使用 `v-edit-dialog` 组件来进行数据表格的行内编辑。 You can block closing the dialog when clicked outside by adding the **persistent** prop.'
    },
    crud: {
      header: 'CRUD 操作',
      desc: '数据表格使用 `v-dialog` 组件来进行每行的CRUD操作。'
    }
  }],
  props: {
    'v-edit-dialog': {
      cancelText: '为取消按钮设置默认文本，当使用了 `large` 属性时（即有提交和取消按钮的对话框）。',
      lazy: 'Mixins.Bootable.props.lazy',
      large: '附加一个提交和取消按钮到对话框',
      saveText: '为保存按钮设置默认文本，当使用了 `large` 属性时。',
      transition: 'Mixins.Transitionable.props.transition'
    },
    'v-data-table': {
      headerText: '使用一个对象时表头的文本值',
      headers: '表头数组',
      hideHeaders: '隐藏表头'
    }
  },
  scopedSlots: {
    'v-data-table': {
      headerCell: '自定义表头每个单元的插槽',
      headers: '自定义整个表头的插槽'
    }
  }
}

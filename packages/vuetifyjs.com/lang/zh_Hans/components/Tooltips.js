export default {
  header: '提示',
  headerText: '`v-tooltip`对于用户悬停在元素上时传递信息很有用。您也可以通过一个**v-model**以编程方式控制提示组件的显示。',
  components: ['v-tooltip'],
  examples: [{
    default: {
      header: '默认',
      desc: '提示组件可以包装任何元素。'
    },
    alignment: {
      header: '对齐',
      desc: '提示组件可以与激活器元素的四个边中的任何一个对齐。'
    },
    visibility: {
      header: '可见性',
      desc: 'Tooltip的可见性可以使用`v-model`以编程的方式改变。'
    }
  }],
  props: {
    closeDelay: '当（open-on-hover）属性设置为true时，会在菜单关闭之后延时（以毫秒为单位）',
    debounce: 'Duration before tooltip is shown and hidden when hovered',
    openDelay: 'Delay (in ms) after which menu opens (when open-on-hover prop is set to true)'
  }
}

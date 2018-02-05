export default {
  header: '轮播',
  headerText: '`v-carousel`组件用于在旋转的计时器上显示大量的可视内容。',
  components: ['v-carousel', 'v-carousel-item'],
  examples: [{
    default: {
      header: '默认情况',
      desc: '一个轮播默认情况下有一个滑动过渡。',
      uninverted: true
    },
    customTransition: {
      header: '自定义过渡',
      desc: '您也可以应用您自己的自定义过渡。',
      uninverted: true
    },
    customIcons: {
      header: '自定义分隔符',
      desc: '您也可以更改轮播分隔符的图标。',
      uninverted: true
    },
    hideControls: {
      header: '隐藏控件',
      desc: '您可以使用`hide-controls`属性隐藏控件。',
      uninverted: true
    }
  }],
  props: {
    nextIcon: 'Mixins.Input.props.appendIcon',
    prevIcon: 'Mixins.Input.props.prependIcon',
    cycle: '指定轮播是否应循环显示图像',
    delimiterIcon: '设置轮播分隔符的图标',
    hideControls: '隐藏导航控件',
    hideDelimiters: '用轮播分隔符隐藏面部',
    interval: '图像周期之间的持续时间',
    reverseTransition: '设置反向转换',
    src: '图片源',
    transition: 'Mixins.Transitionable.props.transition'
  }
}

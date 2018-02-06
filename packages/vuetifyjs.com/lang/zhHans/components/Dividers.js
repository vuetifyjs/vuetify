export default {
  header: '分隔线',
  headerText: '`v-divider`组件用来分隔列表的各部分',
  components: ['v-divider'],
  examples: [{
    fullBleed: {
      header: '完全流血（Full bleed）',
      desc: '完全出血分隔线扩展了整个内容的宽度。'
    },
    lightAndDark: {
      header: '明亮与暗黑',
      desc: '分隔线有明亮和暗黑的变种',
      uninverted: true
    },
    inset: {
      header: '插页分隔线',
      desc: '插页隔线向右移动72px，这将使他们将列表项分隔。'
    },
    subheaders: {
      header: '副标题和分割线',
      desc: '副标题可以使用相同的属性与插页分割线对齐。'
    },
    dividerList: {
      header: 'List dividers',
      desc: 'Inset dividers and subheaders can help break up content'
    },
    dividerListPortrait: {
      header: 'Divivders in Portrait View',
      desc: 'Create custom cards to fit any use-case'
    }
  }],
  props: {
    inset: '添加缩进 (72px)'
  }
}

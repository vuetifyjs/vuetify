export default {
  header: 'Tooltip',
  headerText: '`v-tooltip` コンポーネントはユーザーが要素をホバーした際に情報を表示するのに便利です。**v-model** を経由してTooltipの表示をプログラム的に制御することができます。',
  components: ['v-tooltip'],
  examples: [{
    default: {
      header: 'Default',
      desc: 'Tooltipsはどんな要素もラップすることができます。'
    },
    alignment: {
      header: '配置',
      desc: 'Tooltipは対象になる要素の四方向のどこにでも配置することができます。'
    },
    visibility: {
      header: '表示',
      desc: '`v-model`を使用してTooltipの表示をプログラム的制御できます。'
    }
  }],
  props: {
    closeDelay: 'open-on-hover prop が true の場合に、メニューが閉じられるまでの遅延時間。(ミリ秒単位)',
    debounce: 'Tooltipがホバーされた際に表示されてから消えるまでの時間。',
    openDelay: 'open-on-hover prop が true の場合に、メニューが開くまでの遅延時間。(ミリ秒単位)'
  }
}

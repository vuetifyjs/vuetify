export default {
  header: 'Breadcrumbs',
  headerText: '`v-breadcrumbs` コンポーネントはページ用のナビゲーションヘルパーです。**Material Icons** のアイコン、もしくは文字を区切りとして使用できます。_href_、_text_ そして任意で _disabled_ を含んだオブジェクトの配列を **items** プロパティに渡すことができます。 加えて、 Breadcrumbs をより細かく制御するために slot を使用したり、`v-breadcrumbs-item` や他のカスタムマークアップを利用することができます。',
  components: ['v-breadcrumbs', 'v-breadcrumbs-items'],
  examples: [{
    textDividers: {
      header: 'テキスト区切り',
      desc: 'Breadcrumbs はデフォルトでテキストで区切られます。あらゆる文字を使用することができます。'

    },
    iconDividers: {
      header: 'アイコン区切り',
      desc: 'icon 変数を使用することで、 Material Design Icon に存在するアイコンを Breadcrumbs に使用することができます。'
    }
  }],
  props: {
    divider: '区切り文字を指定します。',
    icons: '区切りとなるアイコンを指定します。',
    justifyCenter: 'Breadcrumbs を中央寄せにします。',
    justifyEnd: 'Breadcrumbs を右側寄せにします。',
    large: 'Breadcrumbs の項目のテキストを大きくします。'
  }
}

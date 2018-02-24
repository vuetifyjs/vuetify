export default {
  header: 'Card',
  headerText: '`v-card` コンポーネントは、パネルから画像まであらゆる用途に使用できる汎用的なコンポーネントです。**card** コンポーネントには、可能な限りマークアップを簡単にするためのたくさんのヘルパーコンポーネントが存在します。オプションを持たないコンポーネントはレンダリングを高速化し、構築を簡単にするための糖衣構文として機能するために、Vueのコンポーネント機能を使用しています。',
  components: [
    'v-card',
    'v-card-media',
    'v-card-title',
    'v-card-actions'
  ],
  examples: [{
    components: {
      header: 'コンポーネント',
      desc: 'Card には `v-card-media` 、 `v-card-title` 、 `v-card-text` と `v-card-actions` のベースとなる4種類のコンポーネントが用意されています。'
    },
    mediaWithText: {
      header: 'テキスト付きメディア',
      desc: 'レイアウトシステムを使用すると、背景のどこにでもカスタムテキストを追加することができます。'
    },
    horizontal: {
      header: '水平型Card',
      desc: '`v-flex` を使用することで、カスタマイズされた水平型Cardを作成することができます。`v-card-media` の `contain` プロパティを使用すると、コンテナの内側に収まるように縮小することができます。'
    },
    grids: {
      header: 'グリッド',
      desc: 'グリッドリストを使用すると、美しいレイアウトを作成することができます。'
    },
    customActions: {
      header: 'カスタムアクション',
      desc: 'シンプルな条件によって、開くまで閉じられている補助的なテキストを簡単に追加できます。'
    }
  }],
  props: {
    contain: 'background-size を内容に合わせます。',
    flat: 'Card の box-shadow を削除します。',
    height: 'Card の高さを手動で設定します。',
    hover: 'ホバーした際により高く浮き出します。',
    img: '背景に設定する画像を設定します。',
    primaryTitle: 'プライマリタイトル向けのパディングを適用します。',
    raised: 'デフォルトで高く浮き出だします。',
    src: '背景に設定する画像を設定します。',
    tile: '角丸を削除し、Card をタイルのようにします。'
  }
}

export default {
  header: 'Footer',
  headerText: '`v-footer`コンポーネントは、あなたのサイト内のどのページからでもアクセスしたい一般的な情報を表示するために使われます。',
  components: ['v-footer'],
  examples: [{
    default: {
      header: 'Default',
      desc: 'フッターコンポーネントは単なる基本的なコンテナです。'
    },
    companyFooter: {
      header: '会社のフッター',
      desc: 'リンクを持つ基本的な会社のフッターとしてのフッターコンポーネントです。'
    },
    indigoFooter: {
      header: 'インディゴ色のフッター',
      desc: 'インディゴ色の背景色で、ソーシャルメディアのアイコンとボタンのあるフッターコンポーネントです。'
    },
    tealFooter: {
      header: '青緑色のフッター',
      desc: '青緑色見出しと、列と行のリンクを含むフッターコンポーネントです。'
    }
  }],
  props: {
    absolute: 'Mixins.Positionable.props.absolute',
    fixed: 'Mixins.Positionable.props.fixed',
    inset: 'アプリケーションからのツールバーの位置を `v-navigation-drawer`で指定します。'
  }
}

export default {
  header: 'Divider',
  headerText: '`v-divider` コンポーネントは、リスト中のセクションの区切り線として使用することができます。',
  components: ['v-divider'],
  examples: [{
    fullBleed: {
      header: '全幅',
      desc: '区切り線はコンテンツの幅に合わせて表示されます。'
    },
    lightAndDark: {
      header: 'テーマ対応',
      desc: '区切り線は light テーマ と dark テーマ の切り替えに対応しています。',
      uninverted: true
    },
    inset: {
      header: 'インデント',
      desc: '水平方向の位置をリストアイテムと揃えるために、72px 右に寄せて表示できます。'
    },
    subheaders: {
      header: 'サブヘッダと区切り線',
      desc: 'サブヘッダと区切り線は、両方で inset プロパティを使用することで水平方向の位置を揃えることができます。'
    },
    dividerList: {
      header: 'リスト中の区切り',
      desc: 'インデントしたサブヘッダと区切り線を同時に用いることで、リスト内のコンテンツを明確に区分けすることができます。'
    },
    dividerListPortrait: {
      header: 'ポートレート',
      desc: '横長のコンポーネント内でも区切り線は問題なく表示できます。'
    }
  }],
  props: {
    inset: 'インデントを加えます。 (72px)'
  }
}

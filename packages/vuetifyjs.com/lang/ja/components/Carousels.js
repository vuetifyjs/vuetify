export default {
  header: 'Carousel',
  headerText: '`v-carousel` コンポーネントは、タイマーで入れ替わる数枚の大きなビジュアルコンテンツを表示するために使います。',
  components: ['v-carousel', 'v-carousel-item'],
  examples: [{
    default: {
      header: 'デフォルト',
      desc: 'Carousel はデフォルトでスライドの遷移が行われます。',
      uninverted: true
    },
    customTransition: {
      header: 'カスタムトランジション',
      desc: '独自のカスタムトランジションを適用することもできます。',
      uninverted: true
    },
    customDelimiter: {
      header: 'カスタムデリミター',
      desc: 'Carousel のデリミターに使用されるアイコンを変更することができます。',
      uninverted: true
    },
    hideControls: {
      header: 'コントロールを隠す',
      desc: '`hide-controls` prop を使用することで下部のコントローラーを隠すことができます。',
      uninverted: true
    }
  }],
  props: {
    appendIcon: 'Mixins.Input.props.appendIcon',
    prependIcon: 'Mixins.Input.props.prependIcon',
    cycle: 'Carousel が画像を循環させるかどうかを設定します。',
    delimiterIcon: 'Carousel のデリミターとして使用するアイコンを設定します。',
    hideControls: 'ナビゲーションコントロールを隠します。',
    hideDelimiters: 'Carousel のデリミターを隠します。',
    interval: '画像が切り替わるまでの時間を設定します。',
    reverseTransition: '戻す際のトランジションを設定します。',
    src: '画像を設定します。',
    transition: 'Mixins.Transitionable.props.transition'
  }
}

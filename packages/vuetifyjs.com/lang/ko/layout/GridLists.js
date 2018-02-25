export default {
  header: '그리드 리스트 (Grid list)',
  headerText: '그리드 리스트는 아이템들 사이에 여백을 넣을 수 있도록 도와주는 `v-container`를 위한 애드온입니다.',
  components: ['v-container', 'v-layout', 'v-flex', 'v-spacer'],
  examples: [{
    default: {
      header: '그리드 리스트 (Grid lists)',
      desc: '그리드 리스트는 더 유연한 여백 기능을 쓸 수 있도록 `v-container` 컴포넌트를 확장합니다. xs 에서 xl 까지 5가지 변형이 있으며 동적으로 변환됩니다.'
    },
    subheader: {
      header: '그리드 리스트 (Grid lists)',
      desc: '그리드 리스트는 놀라운 인터페이스를 만들 수 있도록 현재 그리드 구현과 함께 연속적으로(seamlessly) 작동합니다.'
    }
  }],
  props: {
    tag: 'Mixins.Routable.props.tag'
  }
}

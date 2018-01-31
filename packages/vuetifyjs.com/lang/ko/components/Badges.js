export default {
  header: '배지 (Badge)',
  headerText: '`v-badge` 컴포넌트는 특정 정보를 부각시키거나(highlight) 특정 요소에 대해 이목을 끌기 위해 사용되며 어떤 종류의 컨텐츠에도 사용할 수 있습니다.',
  components: ['v-badge'],
  examples: [{
    character: {
      header: '글자 (Character)',
      desc: '어떤 요소에든 배지를 사용할 수 있습니다.'
    },
    overlap: {
      header: '중첩 (Overlap)',
      desc: '`overlap` prop을 사용하면 배지는 컨텐츠 위에 중첩됩니다.'
    },
    inline: {
      header: '인라인 (Inline)',
      desc: '배지는 텍스트와 같은 줄 위에(inline) 놓일 수 있습니다.'
    },
    icon: {
      header: '아이콘 (Icon)',
      desc: '배지는 적용된 모든 아이콘 셋을 사용할 수 있습니다.'
    },
    visibility: {
      header: '표시여부 (Visibility)',
      desc: '배지의 표시여부는 `v-model` 로 조절할 수 있습니다.'
    }
  }],
  props: {
    bottom: 'Mixins.Positionable.props.bottom',
    left: 'Mixins.Positionable.props.left',
    transition: 'Mixins.Transitionable.props.transition'
  }
}

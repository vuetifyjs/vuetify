export default {
  header: '바닥 시트 (Bottom sheet)',
  headerText: '바닥시트(bottom sheet)는 스크린 바닥으로 부터의 슬라이드를 추가한  `v-dialog` 의 변형이며 `v-bottom-nav`와 유사합니다. 바닥 네비게이션 (bottom navigation)이 버튼이나 어플리케이션 레벨 동작을 위한 컴포넌트라면, 바닥시트는 무엇이든 포함할 수 있습니다.',
  components: ['v-bottom-sheet'],
  examples: [{
    standard: {
      header: '표준 디스플레이 (Standard display)',
      desc: '어플리케이션에서 사용할 수 있는 동작(action)의 목록 예제입니다.'
    },
    inset: {
      header: '삽입형 바닥시트 (Inset bottom sheets)',
      desc: '바닥시트는 최대넓이를 전체 화면의 70%로 줄여서 삽입될 수 있습니다. `width` prop 를 사용하여 수동으로 너비를 추가 조정할 수 있습니다. We also showcase dynamic class binding using the Vuetify breakpoint object.'
    }
  }],
  props: {
    disabled: '대화창(dialog)이 열릴 수 없도록 설정',
    hideOverlay: 'Hide the display of the overlay',
    inset: '대화창(dialog) 컨텐츠의 최대 너비를 70%로 줄임',
    lazy: 'Mixins.Bootable.props.lazy',
    maxWidth: '시트의 컨테이너의 최대 너비를 설정'
  }
}

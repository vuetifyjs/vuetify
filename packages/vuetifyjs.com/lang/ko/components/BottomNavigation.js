export default {
  header: '바닥 내비게이션 (Bottom nav)',
  headerText: '`v-bottom-nav` 사이드바(sidebar)의 대용품입니다. 주로 모바일 장치에 사용하면 두가지 변형 "아이콘과 텍스트", shift가 있습니다.',
  components: ['v-bottom-nav'],
  examples: [{
    iconsAndText: {
      header: '아이콘과 텍스트 (Icons and text)',
      desc: '바닥 네비게이션(bottom nav)은  뷰-라우터(`vue-router`)와 함께 사용하도록 설계되어 있으며 `active.sync` prop을 사용하여 프로그램적으로 버튼의 활성화 상태를 조절할 수 있습니다. 버튼의 값은 `value` 속성(attribute)으로 바꿀 수 있습니다.'
    },
    colorAndShift: {
      header: 'Color & shift',
      desc: '배경색을 사용할때, `light` prop을 사용하기를 권장합니다. `shift` prop은 버튼이 활성화 되기 전에는 보이지 않게 합니다. `v-btn`의 텍스트는 `<span>` 태그로 감싸야 한다는 점을 기억하십시오.'
    },
    toggle: {
      header: '토글 (Toggle)',
      desc: '다른 Vuetify 컴포넌트들 처럼, `v-model` 로 표시 상태를 조절할 수 있습니다.'
    }
  }],
  props: {
    active: '현재 활성화된 버튼의 값이 저장됩니다. 만약 버튼에 지정된 값이 없다면, 버튼의 인덱스가 사용됩니다. 이 prop은 **.sync** 수식어(modifier)를 지원합니다.',
    absolute: 'Mixins.Positionable.props.absolute',
    fixed: 'Mixins.Positionable.props.fixed'
  }
}

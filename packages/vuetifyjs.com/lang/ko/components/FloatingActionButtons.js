export default {
  header: '버튼 : 플로팅 액션 버튼 (Buttons: Floating Action Button)',
  headerText: '`v-btn` 컴포넌트는 플로팅 액션버튼에 사용됩니다. 이는 어플리케이션에 주요 액션 포인트를 제공합니다. `v-speed-dial` 컴포넌트와 결합하면 사용자가 사용할 수 있는 기능들을 다양한 그룹으로 만들 수 있습니다.',
  components: ['v-speed-dial', 'v-btn'],
  examples: [{
    promotedAction: {
      header: '장려되는 액션 (Promoted action)',
      desc: '플로팅 액션 버튼을 구성요소에 결합하면 어플리케이션에서 장려되는 액션을 강조할 수 있습니다. 대부분의 경우 기본 크기가 사용되지만, 다른 요소와의 조화를 위해 `small` 변형이 있습니다.'
    },
    small: {
      header: '작은 버튼 (Small variant)',
      desc: '더 나은 화면 구성을 위해 리스트 아바타에 맞는 작은 버튼을 사용합니다.'
    },
    displayAnimation: {
      header: '애니메이션 (Display animation)',
      desc: '처음 보여질때, 플로팅 액션 버튼은 스크린 위로 애니매이션 효과와 함께 나타납니다. 여기서 v-show 와 함께 `v-fab-transition`이 사용되었습니다. 또한 Vuetify 에서 재공하는 또는 직접 만든 커스텀 트랜지션을 사용할 수도 있습니다.'
    },
    lateralScreens: {
      header: '가로 화면 (Lateral screens)',
      desc: '버튼의 기본 액션을 바꿀땐, 바뀌는 것을 강조하기 위한 트랜지션을 사용하는 것이 권장됩니다. 이를 위해 `key` prop에 Vue 트랜지션 시스템을 전환을 지시하기 위한 일련의 데이터를 연결합니다. 커스텀 트랜지션을 사용할 수 있지만 이때 `mode` prop 을 **out-in**으로 설정해야 합니다.'
    },
    speedDial: {
      header: 'FAB(플로팅 액션 버튼)와 스피드 다이얼 (FAB with speed-dial)',
      desc: '스피드다이얼(speed-dial) 컴포넌트는 FAB 경험을 정확히 원하는 대로 커스터마이즈 할 수 있는 강력한 API 를 가지고 있습니다.'
    }
  }],
  props: {
    'v-btn': {
      block: '버튼을 가능한 영역의 100%로 확장',
      depressed: '버튼 박스의 그림자를 제거',
      fab: '버튼을 둥글게 만듬',
      flat: '버튼의 배경색을 제거',
      icon: '버튼을 아이콘형태로 만듬 - round와 flat',
      inputValue: '버튼의 활성 상태(active state)를 제어',
      large: '큰 버튼',
      loading: '로딩 아이콘 애니메이션을 추가',
      outline: '버튼이 테두리(outline)를 가짐',
      round: '버튼의 테두리가 둥글어짐',
      small: '작은 버튼',
      type: '버튼의 타입(type) 어트리뷰트(attribute)'
    },
    'v-speed-dial': {
      direction: '스피드다이얼 내용이 보여지는 방향. 가능한 값은 `top`, `bottom`, `left`, `right`.',
      openOnHover: '마우스가 올려졌을때 (hover) 엽니다.'
    }
  }
}

export default {
  header: '버튼 (Button)',
  headerText: '`v-btn` 컴포넌트는 표준 HTML 버튼을 대체하며 머티리얼 디자인 테마를 따르고 다양한 옵션을 가지고 있습니다. 어떤 색상 헬퍼(color helper)든 버튼의 배경과 글자색을 조절하는데 쓰일 수 있습니다.',
  components: ['v-btn'],
  examples: [{
    usage: {
      header: '사용법',
      desc: ''
    },
    flat: {
      header: '플랫 (Flat)',
      desc: '평평한 플랫 버튼은 박스 그림자와 배경이 없습니다. 마우스 포인터를 버튼 컨테이너 위에 올려야만 (Only on hover) 버튼 형태가 보입니다.'
    },
    raised: {
      header: 'Raised',
      desc: 'Raised 버튼은 클릭할때 박스의 그림자가 커집니다. 버튼의 기본 스타일입니다.'
    },
    depressed: {
      header: 'Depressed',
      desc: 'Depressed 버튼은 여전히 배경색을 관리하지만 박스 그림자가 없습니다.'
    },
    dropdown: {
      header: '버튼 드롭다운 변형 (Button Dropdown Variants)',
      desc: 'Button dropdowns are regular selects with additional styling.',
      uninverted: true
    },
    toggle: {
      header: '버튼 토글 (Button Toggle)',
      desc: '토글 버튼은 선택된 속성에 따라 본질적으로 라디오(radio) 나 체크박스(checkbox) 스타일입니다. 이 컴포넌트는 `v-toolbar` 컴포넌트와 호환됩니다. '
    },
    icon: {
      header: '아이콘 (Icon)',
      desc: '아이콘은 버튼의 주요 컨텐츠로 사용될 수 있습니다.'
    },
    floating: {
      header: '플로팅 (Floating)',
      desc: '플로팅 버튼(Floating buttons)은 둥글고 보통 아이콘을 포함합니다.'
    },
    loaders: {
      header: '로더 (Loaders)',
      desc: '`loading` prop을 사용해서 사용자에게 어떤 것이 진행되고 있다는 것을 알릴 수 있습니다. 기본적으로는  `v-progress-circular`가 사용되지만 커스터마이즈 할 수 있습니다.'
    },
    sizing: {
      header: '크기조절 (Sizing)',
      desc: '여러 시나리오에 따른 다양한 크기 옵션이 있습니다.'
    },
    outline: {
      header: '테두리 강조 (Outline)',
      desc: '테두리가 강조된 버튼(Outline buttons)의 테두리(border) 색은 현재 적용된 색에서 상속됩니다.'
    },
    round: {
      header: '둥근 버튼 (Round)',
      desc: '둥근 버튼(Rounded buttons)은 둥근 모서리를 가지고 있을 뿐 보통 버튼과 똑같이 작동합니다.'
    },
    block: {
      header: '블럭 (Block)',
      desc: '블럭 버튼은 너비가 가능한 최대값으로 확장됩니다.'
    }
  }],
  props: {
    'v-btn': {
      block: '가능한 공간의 100%로 버튼을 확장',
      depressed: '버튼 박스의 그림자를 없앰',
      fab: 'Makes button round',
      flat: '버튼의 배경색을 없앰',
      icon: '버튼이 아이콘임을 지정 - round and flat',
      inputValue: '버튼의 활성화 상태를 조절',
      large: '큰 버튼',
      loading: '로딩 아이콘 애니메이션을 추가',
      outline: '테두리 강조 버튼',
      round: '버튼의 모서리가 둥글어짐',
      small: '작은 버튼',
      type: '버튼의 type attribute 를 설정'
    }
  }
}

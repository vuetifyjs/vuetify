export default {
  header: '리플 디렉티브 (Ripple directive)',
  headerText: '`v-ripple` 디렉티브는 사용자의 액션을 보여주는데 사용됩니다. 이 디렉티브는 어떤 블록 레벨 요소에든 적용될 수 있습니다. 다양한 컴포넌트들이 리플 디렉트브와 함께 사용될 수 있습니다. 예르 들어 `v-btn`, `v-tabs-item` 등과 더 많은 다양한 내장 컴포넌트들이 있습니다.',
  components: ['v-ripple'],
  examples: [{
    buttons: {
      header: '기본값',
      desc: '기본적으로 버튼은 리플이 활성화되어 있습니다. `:ripple="false"` prop으로 제거할 수도 있습니다.',
      uninverted: true
    },
    customColor: {
      header: '커스텀 색상 (Custom color)',
      desc: '헬퍼 클래스를 사용하여 리플의 색을 바꿀 수 있습니다.',
      uninverted: true
    },
    tabs: {
      header: '탭 (Tabs)',
      desc: '기본적으로 탭은 리플이 비활성화 되어 있습니다. `ripple` prop으로 활성화할 수 있습니다.',
      uninverted: true
    },
    navigationDrawers: {
      header: '네비게이션 서랍 (Navigation drawers)',
      desc: '기본적으로 리스트 아이템들은 리플이 비활성화 되어 있습니다. `ripple` prop으로 활성화할 수 있습니다.',
      uninverted: true
    },
    toolbars: {
      header: '툴바 (Toolbars)',
      desc: '툴바 아이템들은 기본적으로 리플이 비활성화 되어 있습니다. `ripple` prop으로 활성화할 수 있습니다.',
      uninverted: true
    },
    expansionPanels: {
      header: '확장패널 (Expansion panels)',
      desc: '확장패널은 기본적으로 리플이 비활성화 되어 있습니다. `ripple` prop으로 활성화할 수 있습니다.',
      uninverted: true
    },
    customRipple: {
      header: '컴포넌트 (Components)',
      desc: '여러 다른 컴포넌트들도 리플을 지원합니다. `ripple` prop으로 활성화할 수 있습니다.',
      uninverted: true
    },
    htmlElement: {
      header: '표준 HTML 요소 (Standard HTML element)',
      desc: '표준 HTML 요소에 리플효과를 추가하세요. `v-lipple` 디렉티브로 활성화할 수 있습니다.',
      uninverted: true
    }
  }],
  options: {
    'class': '`v-ripple="{ class: \'my-class\' }"` 커스텀 클래스를 리플에 적용. 색상을 바꾸는데 사용됨',
    'center': '`v-ripple="{ center: true }"` 리플이 타겟의 중심에서 시작되도록 설정'
  }
}

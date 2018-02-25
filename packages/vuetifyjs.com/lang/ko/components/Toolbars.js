export default {
  header: '툴바 (Toolbar)',
  headerText: '툴바가 일반적으로 가장 중요한 사이트 탐색 방법인 것 처럼 `v-toolbar` 컴포넌트 역시 모든 그래픽 환경에서 충추적인 컴포넌트 입니다. The toolbar component works great in conjunction with a navigation drawer for hiding links and presenting an activator to open the sidebar on mobile.',
  components: [
    'v-toolbar',
    'v-system-bar'
  ],
  examples: [{
    usage: {
      header: '사용법 (Usage)',
      desc: '툴바는 여러 방법으로 쓰일 수 있는 유연한 컨테이너 입니다. 기본적으로 툴바는 데스크탑에서 64px, 세로 모바일에서 56px, 가로 모바일에서 48px 높이를 가집니다. 툴바와 함께 쓰일 수 있는 `v-toolbar-side-icon`, `v-toolbar-title`, `v-toolbar-items` 같은 여러 헬퍼 컴포넌트가 있습니다.'
    },
    appBar: {
      header: '앱바 (App bar)',
      desc: '앱바는 어플리케이션의 주된 툴바입니다. 앱 바는 아이콘, 메뉴 등을 포함할 수 있습니다.'
    },
    appBarItems: {
      header: '앱바와 아이템 (App bar with items)',
      desc: '`v-toolbar-items` 컴포넌트를 사용해서 일반적인 `v-btn` 컴포넌틀 앱바 아이템으로 사용할 수 있습니다. 각 버튼에 `flat` prop 을 적용하는 것을 잊지 마세요.'
    },
    appBarExtension: {
      header: '앱바와 확장 (App bar with extension)',
      desc: '더 두드러지는 바를 만들기 위해 확장을 사용할 수 있습니다. An extension can be used that creates a much more prominent bar. If a title is placed within the extension, it will automatically be shifted to the right to match the normal location it would be at in the main bar.'
    },
    columnWidthWithHierarchy: {
      header: '컬럼 너비와 계층 (Column width with hierarchy)',
      desc: '툴바는 라이트/다크 두개의 변형이 있습니다. 라이트 툴바는 다크 버튼과 다크 텍스트를 가지고 다크 툴바는 흰색 버튼과 흰색 텍스트를 가집니다.'
    },
    flexibleAndCard: {
      header: '유연한 툴바와 카드 툴바 (Flexible toolbar and card toolbar)',
      desc: '소수의 커스텀 스타일로 놀라운 인터페이스를 만들 수 있습니다.'
    },
    floatingWithSearch: {
      header: '플로팅과 검색 (Floating with search)',
      desc: '플로팅 툴바는 툴바가 참조하는 컨텡츠 위에 위치할 수 있습니다.'
    },
    variations: {
      header: '변형 (Variations)',
      desc: '앱바는 테마와 헬퍼 클라스들을 적용하여 다양한 변형을 만들 수 있습니다. 라이트, 다크 테마부터 색상, 투명한 변형도 가능합니다.',
      uninverted: true
    },
    prominent: {
      header: '두드러지는 툴바 (Prominent toolbars)',
      desc: '두드러지는 툴바는 확정된 공간에 요소를 추가할 수 있는 슬롯을 추가합니다. 컨텐츠와 확장 공간은 64px 높이로 고정됩니다.'
    },
    dense: {
      header: '밀집된 툴바 (Dense toolbars)',
      desc: '밀집된 툴바는 48px 높이를 사용합니다. 이는 가로 모바일 모드의 기본 작동방식이기도 합니다.'
    },
    denseProminent: {
      header: '밀집되고 두드러진 툴바',
      desc: '더 작은 툴바를 위해서 두드러짐과 밀집됨을 결합할 수 있습니다.'
    },
    scrolling: {
      header: '스크롤링 테크닉 (Scrolling techniques)',
      desc: '툴바는 스크롤시에 트렌지션되어 사라질 수(transition off) 될 수 있습니다. 이 예제는 어떻게 스크롤 타겟을 정의할 수 있는지(기본값은 window) 보여줍니다. 이 예제에서 일반적인 어플리케이션에 아마도 필요없을 특별한 마크업이 사용되었다는 것을 기억하세요'
    },
    appBarMenu: {
      header: '앱바와 메뉴 (App bar with menu)',
      desc: '툴바에 메뉴 컴포넌트를 추가할 수 있습니다.'
    },
    systemBarsStatusWindow: {
      header: '시스템 바 - 상태/윈도우 (System bars - status/window)',
      desc: '시스템바는 모바일과 데스크탑에서 알람 아이콘을 보여주는데 유용합니다. For live examples of, head to the pre-defined layouts.'
    }
  }],
  props: {
    card: '`v-card`에 사용될 때 테두리 반경(border radius)를 상속',
    clippedLeft: 'Designates that the applications `v-navigation-drawer` is clipped on the left side of the toolbar',
    clippedRight: 'Designates that the applications `v-navigation-drawer` is clipped on the right side of the toolbar',
    dense: '툴바 컨텢츠와 확장의 높이를 줄임',
    extended: '툴바가 슨롯을 사용하지 않고 확장을 생성하도록 강제 (Force the toolbar to generate the extension without using the slot)',
    flat: '툴바의 박스 그림자를 제거',
    floating: 'Makes the toolbar float inline',
    height: '툴바의 높이를 설정',
    lightsOut: '시스템바의 투명도를 줄임',
    manualScroll: 'Manually apply the **scroll-off-screen** functionality',
    prominent: 'Increases the height of the toolbar content and extension',
    scrollOffScreen: 'Will transition the toolbar off screen when scrolling down',
    scrollTarget: 'Assign the scroll target for scroll-off-screen',
    scrollThreshold: 'The amount of scroll distance down before the toolbar uses scroll-off-screen',
    status: '시스템 바의 높이를 감소',
    window: '시스템 바의 높이를 증가'
  }
}

export default {
  header: '그리드 시스템 (Grid system)',
  headerText: 'Vuetify 12 포인트 그리드 시스템을 사용합니다. <kbd>flex-box</kbd>를 사용하는 이 그리드는 어플리케이션 컨텐츠의 레이아웃에 사용됩니다. 여기엔 여러 화면 크기와 방향에 대응하는 5가지 타입의 미디어 브레이크포인트가 있습니다. 그리드 컴포넌트의 prop들은 사실 정의된 속성에 따라 파생되는 (css) 클래스들입니다. 이를 이용해 이들 (css) 헬퍼 클래스들을 prop 형태로 쉽게 사용할 수 있습니다. 물론 이 클래스들은 여전히 어디든지 사용할 수 있습니다.',
  components: ['v-container', 'v-layout', 'v-flex', 'v-spacer'],
  toc: [
    {
      text: '소개',
      href: 'introduction'
    },
    {
      text: '사용법',
      href: 'usage'
    },
    {
      text: 'API',
      href: 'api'
    },
    {
      text: '보충',
      href: 'supplemental'
    },
    {
      text: '예제',
      href: 'examples'
    },
    {
      text: 'Breakpoint object',
      href: 'breakpoint-object'
    }
  ],
  examples: [{
    grid: {
      header: '사용법',
      desc: '`v-container` 중앙 집중형 페이지(center focused page)에 사용될 수 있습니다. 또는 `fluid` prop으로 전체 너비로 확장할 수 있습니다. \n`v-layout`은 섹션을 분리하기 위해 사용하며 `v-flex`를 포함합니다. 레이아웃의 구조는 다음과 같습니다. \n**v-container** &raquo; **v-layout** &raquo; **v-flex**. \n그리드 체인의 각 부분은 flex-box 요소입니다. 마지막의 `v-flex`는 자동으로 자식 요소들을 <kbd>flex: 1 1 auto</kbd>로 설정합니다.',
      uninverted: true
    },
    offset: {
      header: '오프셋 (Offset)',
      desc: '오프셋은 아직 보이지 않는 요소를 보완하거나 컨텐츠의 위치를 제어하는데 유용합니다. 중단점(Breakpoint) 처럼, 여러 크기에 대응하여 오프셋을 정할 수 있습니다. 이를 통해 필요에 따라 레이아웃을 정확하게 미세 조정할 수 있습니다.',
      uninverted: true
    },
    order: {
      header: '순서 (Order)',
      desc: '그리드 항목의 순서를 제어할 수 있습니다. 오프셋처럼 다양한 화면크기에 대응하는 순서를 지정할 수 있습니다. 어떤 어플리케이션에도 적합한 특수화된 스크린 레이아웃을 디자인 하세요.',
      uninverted: true
    },
    directionAndAlign: {
      header: '방향과 정렬 (Direction and Align)',
      desc: '방향과 정렬을 다양한 방법으로 지정합니다. 가능한 모든 <kbd>flex-box</kbd> api 는 직관적인 헬퍼 prop을 통해 가능합니다.',
      uninverted: true
    },
    rowColumnBreakpoint: {
      header: '행과 열 중단점 (Row and column breakpoints)',
      desc: '해상도에 따라 동적으로 레이아웃을 변경하세요. **(화면 크기를 바꾸면서 작은 중단 점에서 레이아웃이 "하나의 `행"으로 바뀌는 것을 관찰해보세요)**',
      uninverted: true
    },
    nestedGrid: {
      header: '중첩 그리드 (Nested grid)',
      desc: '다른 프레임워크들 처럼 다양한 커스텀 레이아웃을 구현하기 위해 그리드는 중첩될 수 있습니다.',
      uninverted: true
    },
    uniqueLayouts: {
      header: '유니크한 레이아웃 (Unique layouts)',
      desc: 'Vuetify 그리드 시스템의 강력함과 유연함과 함께 놀라운 사용자 인터페이스를 만들 수 있습니다.',
      uninverted: true
    },
    spacer: {
      header: 'v-spacer',
      desc: '`v-spacer` 컴포넌트는 가능한 공간을 체우거나 두 컴포넌트 사이에 공간을 만들고 싶을때 유용합니다.'
    },
    tags: {
      header: 'HTML 태그 (Html tags)',
      desc: '때로 레이아웃 항목에 `section` 이나 `li` 같은 특정 태그를 사용하고 싶을 경우'
    }
  }],
  props: {
    tag: 'Mixins.Routable.props.tag',
    alignBaseline: '항목을 베이스라인(baseline)으로 정렬',
    alignCenter: '항목들을 중앙으로 정렬',
    alignContentCenter: '컨텐츠를 중앙으로 정렬',
    alignContentEnd: '컨텐츠를 끝 쪽으로 정렬',
    alignContentSpaceAround: '컨텐츠를 좌우정렬(Align content to the space around).',
    alignContentSpaceBetween: 'Align content to the space between.',
    alignContentStart: '컨텐츠를 앞 쪽으로 정렬',
    alignEnd: '항목들을 끝 쪽으로 정렬',
    alignStart: '항목들을 앞쪽으로 정렬',
    'd-{type}': 'display 항목을 flex/inline-flex/block 등으로 설정. 형식)`d-{타입}`. 예)`d-flex`.',
    fillHeight: 'Make sure that col element height is filled with parent and child. 자식이 column 요소일 경우, 사파리/파이어폭스 에서 중요함',
    justifyCenter: 'Justify content to the center.',
    justifyEnd: 'Justify content to the end.',
    justifySpaceAround: 'Justify content to the space around.',
    justifySpaceBetween: 'Justify content to the space between.',
    justifyStart: 'Justify content to the start.',
    reverse: 'Reverses the currently selected direction (column, row).',
    wrap: 'Allows children to wrap within the container if the elements use more than 100%.',
    'v-container': {
      'grid-list-{xs through xl}': 'Sets the gutter between grid list items ranging from 2px to 24px',
      fluid: 'Removes viewport size breakpoints'
    },
    'v-flex': {
      'offset-(size)(1-12)': 'offset-xs: extra small, offset-sm: small, offset-md: medium, offset-lg: large, offset-xl: extra large. Example: offset-xs3',
      'order-(size)(1-12)': 'order-xs: extra small, order-sm: small, order-md: medium, order-lg: large, order-xl: extra large. Example: order-xs3',
      '(size)(1-12)': 'xs: extra small, sm: small, md: medium, lg: large, xl: extra large - 1 through 12'
    },
    'v-layout': {
      row: 'Sets flex direction to row',
      column: 'Sets flex direction to column'
    }
  },
  breakpointHeader: 'Breakpoint object',
  breakpointText1: 'Vuetify converts the available breakpoints into an accessible object from within your application. This will allow you to assign/apply specific properties and attributes based upon viewport size. The object can be accessed from:',
  breakpointText2: 'This object contains the same semantic properties that you are already used to using from the grid system. Let\'s try a real world example. You have a `v-dialog` component that you want to convert to a **full-screen** dialog on mobile devices. Normally you would need to bind watchers for the viewport size, and/or check whenever the page loads.',
  breakpointText3: 'That\'s a lot of boilerplate to write. Even if you opt to use the built in <a href="/directives/resizing">v-resize</a> directive, you are still going to have to define a resize method. With the **breakpoint** object you can completely skip this logic and get back to building your application.'
}

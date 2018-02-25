export default {
  header: '메뉴 (Menu)',
  headerText: '`v-menu` 컴포넌트는 (메뉴를) 활성화할 요소의 위치에 메뉴를 보여줍니다.',
  components: ['v-menu'],
  examples: [{
    activator: {
      header: '활성자 (Activator)',
      desc: '`activator` 슬롯에 메뉴를 활성화 할 요소를 넣으세요.',
      uninverted: true
    },
    absolute: {
      header: '절대위치 (Absolute position)',
      desc: '메뉴는 또한 `absolute` prop을 사용하는 요소의 위에 절대적으로 (원하는 위치에) 나타낼 수 있습니다. 이미지의 아무곳이나 클릭해보세요.',
      uninverted: true
    },
    absoluteWithoutActivator: {
      header: '활성자가 없는 절대위치 (Absolute position without activator)',
      desc: '또한 `absolute` 와 `position-x`, `position-y` prop들을 함께 사용하면 활성자(activator) 없이도 메뉴를 원하는 절대좌표에 나타낼 수 있습니다. 이미지의 아무곳에나 오른쪽 클릭을 해보세요.',
      uninverted: true
    },
    hover: {
      header: '호버링 (Hover)',
      desc: '`open-on-hover` prop을 사용하면 클릭 대신 호버링으로 메뉴에 접근할 수 있습니다.',
      uninverted: true
    },
    menus: {
      header: '여러 메뉴 (Menus)',
      desc: '메뉴는 또한 거의 모든 컴포넌트 안에 위치할 수 있습니다.',
      uninverted: true
    },
    customTransition: {
      header: '커스텀 트랜지션 (Custom transitions)',
      desc: 'Vuetify엔 3개의 기본 트랜지션 **scale**, **slide**, **slide-x**, **slide-y** 가 있습니다. 하지만 트랜지션 인자로 직접 만든 트랜지션을 사용할 수도 있ㅅ브니다. 예를 들어 어떻게 스톡(stock) 트랜지션이 작동하는지 보려면  <a href="https://github.com/vuetifyjs/vuetify/blob/master/src/util/helpers.js#L13" target="_blank" rel="noopener">here</a>를 방문하세요.',
      uninverted: true
    },
    popover: {
      header: '팝오버 메뉴 (Popover menu)',
      desc: 'A menu can be configured to be static when opened, allowing it to function as a popover. 이는 메뉴 안에 여러 인터렉티브한 아이템이 있을 때 유용합니다.',
      uninverted: true
    }
  }],
  props: {
    closeOnClick: '활성자의 바깥을 클릭하면 메뉴를 닫음',
    closeOnContentClick: '메뉴의 컨텐츠를 클릭하면 메뉴를 닫음',
    disabled: '메뉴를 비활성화',
    offsetX: '메뉴의 x축 오프셋. left/right 방향과 결합하여 작동',
    offsetY: '메유의 y축 오프셋. top/bottom 방향과 결합하여 작동',
    openOnClick: '활성자(activator)를 클릭하면 메뉴가 열림',
    openOnHover: '활성자(activator) 위에 마우스를 올리면(hover) 메뉴가 열림',
    origin: 'Mixins.Transitionable.props.origin',
    transition: 'Mixins.Transitionable.props.transition'
  }
}

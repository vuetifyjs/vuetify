export default {
  header: '확장 패널 (Expansion Panel)',
  headerText: '`v-expansion-panel` 컴포넌트는 다량의 정보가 있을때 세로 공간을 줄이는데 유용합니다. 기본 기능은 단순히 확장 패널(expansion-panel)을 한번에 하나씩 보여줍니다. 하지만 `expandable` 속성(propertiy)를 사용하면 확장패널이 명시적으로 닫기 전까지 열려있게 할 수 있습니다.',
  components: ['v-expansion-panel', 'v-expansion-panel-content'],
  examples: [{
    accordion: {
      header: '어커디언 (Accordion)',
      desc: '어커디언(또는 아코디언. 원래 악기입니다) 확장 패널은 한번에 하나의 패널만 열립니다.'
    },
    expand: {
      header: '확장 (Expand)',
      desc: '확장된 확장 패널(Expand expansion panels)은 닫기 전까지 열려있습니다. will stay open until closed.',
      uninverted: true
    },
    popout: {
      header: '팝업 & 인셋 (Popout & Inset)',
      desc: '확장패널은 `popout` 과 `inset` prop과 함께 두가지 다른 형태로 활성화 됩니다.',
      inverted: true
    },
    customIcons: {
      header: 'Custom icon',
      desc: '`expand-icon` prop으로 확장 액션 아이콘을 커스터마이즈 합니다.'
    },
    focusable: {
      header: '포커스 가능 (Focusable)',
      desc: '`focusable` prop으로 확장패널 헤더의 포커스 가능 여부를 조절합니다.',
      uninverted: true
    }
  }],
  props: {
    'v-expansion-panel': {
      expand: '다른 패널을 선택해도 확장된 패널이 열려있도록 설정',
      focusable: '확장패널의 헤더가 포커스 가능하도록 설정',
      inset: '확장패널을 인셋(inset) 스타일로 엽니다.',
      popout: '확장패널을 팝업(popup) 스타일로 엽니다.'
    },
    'v-expansion-panel-content': {
      hideActions: '컨텐층 헤더의 확장 아이콘을 숨깁니다.',
      expandIcon: '확장 액션 아이콘(expand actio icon)을 설정'
    }
  },
  slots: {
    actions: '확장 해더 액션',
    header: '확장 헤더 컨탠츠'
  }
}

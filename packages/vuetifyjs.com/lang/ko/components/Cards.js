export default {
  header: '카드 (Card)',
  headerText: '`v-card` 컴포넌트는 패널부터 스태틱 이미지까지 어떤 것에든 쓸 수 있는 다재다능한 컴포넌트입니다. **card** 컴포넌트엔 쉬운 마크업(markup)을 도와주는 여러 헬퍼 컴포넌트가 있습니다. 나열된 옵션 이 없는 컴포넌트들은 더 빠른 렌더링을 위해 **Vue의** 펑셔널 컴포넌트(functional component) 옵션을 사용하고 쉽게 만들기 위한 마크업 슈거로 작동합니다.',
  components: [
    'v-card',
    'v-card-media',
    'v-card-title',
    'v-card-actions'
  ],
  examples: [{
    components: {
      header: '컴포넌트 (Components)',
      desc: '카드는 4가지 기본 컴포넌트를 가지고 있습니다. `v-card-media`, `v-card-title`, `v-card-text` and `v-card-actions`.'
    },
    mediaWithText: {
      header: '미디어와 텍스트 (Media with text)',
      desc: '레이아웃 시스템을 이용해 커스텀 텍스트를 백그라운드 위의 어느 곳에든 넣을 수 있습니다.'
    },
    horizontal: {
      header: '수평 카드(Horizontal cards)',
      desc: '`v-flex`를 이용해 커스텀 수평 카드를 만들 수 있습니다. `v-card-media`가 컨테이너를 덮지 않고 딱 맞게 들어갈 수 있도록 `contain` 속성(property)를 사용해서 크기를 줄이세요(shrink).'
    },
    grids: {
      header: '그리드 (Grids)',
      desc: '그리드 리스트(grid lists)를 사용하면 아름다운 레이아웃을 만들 수 있습니다.Using grid lists, you can create beautiful layouts.'
    },
    customActions: {
      header: '커스텀 액션 (Custom Actions)',
      desc: '간단한 조건과 함께 열릴때 까지 보이지 않는 추가 텍스트를 쉽게 넣을 수 있습니다.'
    }
  }],
  props: {
    contain: '백그라운드 사이즈 (background-size) 를 컨테이너에 맞게 조정합니다.',
    flat: '카드 박스의 그림자를 제거',
    height: '카드의 높이를 설정',
    hover: '마우스를 올릴때 (hover) 더 높은 고도/높이(elevation)를 적용',
    img: '이미지 백그라운드 설정',
    primaryTitle: 'Applies primary title specific padding.',
    raised: '기본 고도/높이(elevation) 보다 높게 설정',
    src: '백그라운드로 사용할 이미지 주소',
    tile: '카드의 둥근 모서리(border radious) 를 제거하여 타일(tile)로 만듬'
  }
}

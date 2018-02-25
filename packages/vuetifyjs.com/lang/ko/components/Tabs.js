export default {
  header: '탭 (Tab)',
  headerText: '`v-tabs` 컴포넌트는 선택가능한 아이템의 뒤로 컨텐츠를 숨기는데 사용됩니다. 탭은 페이지 내에서 탭이 링크이고 탭-아이템이 컨텐츠인 것 처럼 유사-탐색(pseudo-navigation)으로 사용될 수 있습니다.',
  components: [
    'v-tabs',
    'v-tab',
    'v-tabs-items',
    'v-tab-item',
    'v-tabs-slider'
  ],
  examples: [{
    toolbar: {
      header: '툴바 탭 (Toolbar tabs)',
      desc: ''
    },
    fixedTabs: {
      header: '고정된 탭 (Fixed tabs)',
      desc: '**fixed-tabs** prop 은 더 높은 최소 너비를 설정하고 새로운 최대 너비를 `v-tabs-item`에 적용합니다. 데스크탑 스크린에서, 탭 아이템은 `v-tabs` 컴포넌트위 중앙에 표시되고, 모바일에선 균등하게 채워집니다.'
    },
    right: {
      header: '오른쪽으로 정렬된 탭 (Right aligned tabs)',
      desc: '**right** prop은 탭들을 오른쪽으로 정렬합니다.'
    },
    content: {
      header: '컨텐츠 (Content)',
      desc: '`v-tabs` 컴포넌트에 넣을 수 있는 건 탭뿐이 아닙니다. 이 예제에서는 툴바를 추가합니다.'
    },
    search: {
      header: '검색 (With search)',
      desc: '`v-tabs` 컴포넌트 안에 넣을 수 있는 다른 컨텐츠 예제입니다.'
    },
    iconsAndText: {
      header: '아이콘과 텍스트 (Icons and text)',
      desc: '**icons-and-text** prop을 이용해 각 탭 아이템에 아이콘을 추가할 수 있습니다.'
    },
    desktop: {
      header: '데스크톱 탭 (Desktop tabs)',
      desc: ''
    },
    alignWithTitle: {
      header: '툴바 타이틀과 탭 정렬 (Align tabs with toolbar title)',
      desc: '`v-tabs`을 `v-toolbar-title` 컴포넌트와 함께 나열합니다. (`v-toolbar-side-icon`나 `v-btn` 컴포넌트가 `v-toolbar` 안에 사용되어야만 합니다. May not work if the tab text is wrapped.'
    },
    grow: {
      header: 'Grow',
      desc: '**grow** prop을 사용하면 탭 아이템 들이 사옹가능한 모든 공간을 사용합니다.'
    },
    overflowToMenu: {
      header: '메뉴와 함께 (With menu)',
      desc: '메뉴가 추가적인 탭들을 가지고 그들을 동적으로 바꿀 수 있도록 할 수 있습니다.'
    },
    pagination: {
      header: '페이지네이션 (Pagination)',
      desc: '탭 아이템들이 컨테이너를 넘어설(overflow) 경우 페이지네이션으로 표시를 조절할 수 있습니다.'
    },
    icons: {
      header: '커스텀 아이콘 (Custom icons)',
      desc: '**prev-icon**과 **next-icon**를 사용하여 커스텀 페이지네이션 아이콘을 적용할 수 있습니다.'
    }
  }],
  props: {
    alignWithTitle: '`v-tabs` 툴바 타이틀과 함께 나열되도록 설정',
    prevIcon: '왼쪽 페이지네이션 아이콘',
    nextIcon: '오른쪽 페이지네이션 아이콘',
    right: '탭을 오른쪽으로 정렬'
  }
}

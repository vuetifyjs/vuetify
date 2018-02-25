export default {
  header: '셀렉트 (Select)',
  headerText: '셀렉트 필드 컴포넌트는 옵션 목록에서 사용자가 제공하는 정보를 수집하는데 사용됩니다.',
  components: ['v-select'],
  supplemental: ['MaskTable'],
  examples: [{
    light: {
      header: '라이트 테마 (Light theme)',
      desc: '표준 단일 셀렉트는 다양한 설정 옵션을 가지고 있습니다.'
    },
    icons: {
      header: '아이콘 (Icons)',
      desc: '앞이나 뒤에 커스텀 아이콘 붙이세요'
    },
    multiple: {
      header: '복수선택 (Multiple)',
      desc: 'multi-select 에서 선택된 항목들을 보여줄때 `v-chip`을 사용할 수 있습니다.'
    },
    autocomplete: {
      header: '자동완성 (Autocomplete)',
      desc: 'type-ahead 자동완성 기능.'
    },
    customFilter: {
      header: '자동완성에서 커스텀 필터 사용 (Custom filter on autocomplete)',
      desc: '`filter` prop 을 사용하면 각각의 항목을 커스텀 로직으로 필터링할 수 있습니다. 예를 들어 항목을 이름으로 필터링 합니다.'
    },
    scopedSlots: {
      header: '스코프드 슬롯 (Scoped slots)',
      desc: '스코프드 슬롯의 강력함으로, 셀렉트의 아웃풋을 다양하게 표시할 수 있습니다. 예로 칩(chip)과 리스트 항목에 프로필 사진을 추가합니다.'
    },
    customTextAndValue: {
      header: '항목 텍스트와 값의 커스터마이즈 (Customized item text and value)',
      desc: '텍스트와 값 필드에 해당하는 항목 배열 내의 특정 속성을 지정할 수 있습니다. 기본값은 **text** 와 **value** 입니다. 이 예제에서는 선택된 아이템의 전체 오브젝트를 반환하는 `return-opject` prop을 사용합니다..'
    },
    tags: {
      header: '태그 (Tags)',
      desc: '태그를 사용하여 사용자가 아이템리스트에 아직 없는 새로운 값을 만들 수 있게 합니다. 태그는 **primitive** 항목들의 배열만 지원하고 `item-text` 나 `item-value` 와 같은 prop들과는 사용할 수 없다는 점을 명심하세요.'
    },
    asynchronous: {
      header: '비동기 항목 (Asynchronous items)',
      desc: '때로, 검색 쿼리에 따라 외부에서 데이터를 가져올 필요가 있습니다. `autocomplete` prop을 사용할때  `search-input` prop을 **.sync** 수식어와 사용하세요. 또한 새로운 `cache-item` prop을 사용하면 비동기 아이템과 **복수의** prop을 사용할때 `items` prop으로 넘겨지고 **REQUIRED** 인 모든 항목의 유니크 리스트를 보관합니다.'
    }
  }],
  props: {
    attach: 'Mixins.Detachable.props.attach',
    autocomplete: '사용자 인풋에 기반하여 리스트안의 아이템들을 필터링합니다.',
    browserAutocomplete: '**autocomplete** prop을 사용할때 검색 인풋을 위한 autocomplete prop을 설정합니다.(??)',
    cacheItems: '**items** prop으로 넘겨진 모든 항목의 _유니크한_ 로컬 사본을 보관합니다.',
    chips: 'Changes display of selections to chips',
    combobox: '**태그** 를 위한 단일 셀렉션의 한 종류',
    contentClass: 'Mixins.Detachable.props.contentClass',
    debounceSearch: '검색 인풋 값이 들어올때 디바운스(Debounces)',
    deletableChips: '선택된 칩(chip)에 삭제(remove) 아이콘을 추가',
    dense: '리스트 항목의 최대 높이를 낮춤',
    disabled: '인풋(input)을 비활성화',
    editable: ' 편집 버튼을 생성 - [스펙](https://material.io/guidelines/components/buttons.html#buttons-dropdown-buttons)',
    filter: '항목 필터링에 사용되는 함수',
    hideSelected: '이미 선택된 셀렉트 메뉴 항목을 보여주지 않음',
    itemAvatar: '**항목** 의 아바타 값 속성을 설정',
    itemDisabled: '**항목** 의 비활성화(disabled) 값 속성을 설정',
    itemText: '**항목** 의 텍스트 값 속성을 설정',
    itemValue: '**항목** 의 값 속성을 설정',
    items: '오브젝트 배열이나 문자열 배열. 오브젝트를 사용하면 text 와 value 필드를 사용. 이는 **item-text** 와 **item-value** 를 사용해서 바꿀 수 있습니다.',
    minWidth: '셀렉트의 `v-menu` 컨텐츠의 최소 너비를 설정',
    multiple: '복수 선택이 가능하도록 변경. 값의 배열을 받음(?).',
    multiLine: '셀렉트 컴포넌트가 포커스 되거나 dirty(?) 할때 레이블이 떠다니도록(float) 만듬.',
    noDataText: '데이타가 없을때 보여줄 텍스트',
    openOnClear: '**clearable** prop을 사용할때, 일단 한번 클리어되면 현재 상태에 따라 선택 메뉴가 열리거나 열려있게 됩니다. When using the **clearable** prop, once cleared',
    overflow: '오버플로우 버튼을 생성 - [스펙](https://material.io/guidelines/components/buttons.html#buttons-dropdown-buttons)',
    returnObject: '선택시 **item-value** 로 지정된 값이 아니라 오브젝트가 바로 반환되도록 바꿈.',
    searchInput: 'Bound when using the autocomplete prop. Use the **.sync** modifier to catch user input from the autocomplete search input',
    segmented: 'Creates a segmented button - [spec](https://material.io/guidelines/components/buttons.html#buttons-dropdown-buttons)',
    tags: '태그 기능. 사용자가 **items** prop에 없는 새로운 값을 만들 수 있게해줌',
    valueComparator: 'Apply a custom value comparator function'
  },
  slots: {
    item: 'Scoped slot for designating the markup for a list-tile',
    'no-data': 'Mixins.Filterable.slots.noData',
    selection: 'Scoped slot for designating the markup for the selected items'
  },
  scopedSlots: {
    item: 'Define a custom item appearance',
    selection: 'Define a custom selection appearance'
  },
  events: {
    change: 'Mixins.Input.events.change',
    'update:error': 'Mixins.Input.events.update:error',
    'update:searchInput': 'The `search-input.sync` event'
  }
}

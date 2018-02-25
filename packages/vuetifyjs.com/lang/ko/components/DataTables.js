export default {
  header: '데이터 테이블 (Data table)',
  headerText: '`v-data-table` 컴포넌트는 데이터를 테이블 형태로 보여줍니다. 정렬(sorting), 검색(searching), 페이지네이션(pagination), 선택(selection) 등이 가능합니다.',
  components: ['v-data-table', 'v-edit-dialog'],
  examples: [{
    standard: {
      header: '표준 (Standard)',
      desc: '표준 데이터 테이블은 추가 기능 없이 데이터를 보여줍니다. The standard data-table contains data with no additional functionality. You can opt out of displaying table actions that allow you to control the pagination of information with the `hide-actions` prop.'
    },
    noData: {
      header: '슬롯: no-data',
      desc: '`no-data` 슬롯(slot)은 데이터가 없을 경우 보여지는 커스텀 HTML 에 쓰입니다.'
    },
    headers: {
      header: '슬롯: items 과 headers',
      desc: '`items` 과 `headers` 슬롯엔 <kbd>td/th</kbd> 태그 모음이나 전체 row 를 제어하고 싶을 경우 <kbd>tr</kbd> 태그를 넣습니다.'
    },
    headerCell: {
      header: '슬롯: headerCell',
      desc: '만약 각 헤더 셀(header cells)에 공용 마크업이나 이펙트를 적용하고 싶으면 `headerCell` 슬롯을 사용합니다. 이 예제는 각 헤더에 툴팁을 적용합니다.'
    },
    progress: {
      header: '슬롯: progress',
      desc: '`progress` 슬롯은 데이터 테이블의 `로딩` 상태 표시를 커스터마이즈 할 수 있습니다.\n기본 값은 `indeterminate` `v-progress-linear` 입니다.'
    },
    footer: {
      header: '슬롯: footer',
      desc: '`footer` 슬롯으로 테이블에 별도의 기능을 추가할 수 있습니다. 예) 컬럼 필터링이나 검색'
    },
    expand: {
      header: '슬롯: expand',
      desc: '`expand` 슬롯을 이용하여 확장 가능한 행(row)을 만들 수 있습니다. `expand` prop으로 다른 행(row)을 클릭했을때 확장된 행이 닫히는 것을 방지할 수 있습니다.'
    },
    pageText: {
      header: '슬롯: page-text',
      desc: '`page-text` 슬롯으로 전체 아이템수와 표시된 범위를 나타내는 페이지 텍스트를 바꿀 수 있습니다.'
    },
    select: {
      header: '선택 가능한 행 (Selectable rows)',
      desc: '선택 가능한 열은 특정 행이나 전체 행에 대한 액션을 실행할 수 있도록 해줍니다. (Selectable rows allow you to perform an action on specific and all rows.)'
    },
    search: {
      header: '검색과 "검색결과 없음"(no-results) 슬롯',
      desc: '`search` prop으로 데이터를 필터링 할 수 있습니다.'
    },
    customIcons: {
      header: 'Custom icons',
      desc: '이전/다음 페이지네이션 아이콘과 정렬아이콘을 **prev-icon**, **next-icon** and **sort-icon** props으로 바꿀 수 있습니다.'
    },
    paginate: {
      header: '외부 페이지네이션 (External pagination)',
      desc: '페이지네이션(Pagination)은 `pagination` prop을 통해 외부에서 제어될 수 있습니다.\n `.sync` 수식어(modifier)를 반드시 사용해야 합니다.'
    },
    sort: {
      header: '외부 정렬 (External sorting)',
      desc: '정렬 또한 `pagenation` prop을 통해 외부에서 제어될 수 있습니다. `.sync` 수식어(modifier)를 반드시 사용해야 한다는 것을 기억하세요. \n `pagenation` prop으로 또한 기본 정렬 열(default sorted column) 을 정할 수도 있습니다.'
    },
    server: {
      header: '서버사이드 페이지네이트와 검색 (Paginate and sort server-side)',
      desc: 'If you\'re loading data from a backend and want to paginate and sort the results before displaying them, you can use the `total-items` prop. Defining this prop will disable the built-in sorting and pagination, and you will instead need to use the `pagination` prop to listen for changes. Use the `loading` prop to display a progress bar while fetching data.'
    },
    headerless: {
      header: '헤더가 없는 테이블 (Headerless tables)',
      desc: '`hide-headers` prop은 헤더가 없는 테이블을 만듭니다.'
    },
    editdialog: {
      header: '인라인 편집 (Inline Editing)',
      desc: '`v-edit-dialog` 컴포넌트로 데이터 테이블 내에서의 인라인 편집이 가능합니다. **persistent* prop 을 추가하여 외부를 클릭했을 때 다이얼로그가 닫히는 것을 막을 수 있습니다.'
    },
    crud: {
      header: 'CRUD 액션',
      desc: '데이터 테이블에서 `v-dialog` 컴포넌트를 이용해 각 행을 편집하는 방식의 CRUD 액션입니다.\n(data-table with CRUD actions using a v-dialog component for editing each row)'
    }
  }],
  props: {
    'v-edit-dialog': {
      cancelText: '**large** prop을 사용할때 나오는 취소(cancel) 버튼의 기본 텍스트를 설정',
      lazy: 'Mixins.Bootable.props.lazy',
      large: '대화찰(dialog)에 서브밋(submit)과 취소(cancel) 버튼을 추가합니다.',
      saveText: '**large** prop을 사용할때 나오는 저장(save) 버튼의 기본 텍스트를 설정',
      transition: 'Mixins.Transitionable.props.transition'
    },
    'v-data-table': {
      headerText: '오브젝트를 사용할 경우 헤더의 텍스트 값',
      headers: '각 헤더 컬럼을 정의하는 오브젝트의 배열(array). 모든 속성(propertiy)의 정의는 아래 예제를 참조하세요.',
      hideHeaders: '테이블 헤더를 숨김',
      sortIcon: '커스텀 정렬 아이콘. `v-icon`과 같은 문법',
      nextIcon: 'Mixins.Input.props.appendIcon',
      prevIcon: 'Mixins.Input.props.prependIcon'
    }
  },
  scopedSlots: {
    'v-data-table': {
      headerCell: '커스텀 헤더 셀을 위한 슬롯Slot to customize header cells',
      headers: '전체 헤더 커스터마이즈를 위한 슬롯'
    }
  }
}

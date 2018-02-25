export default {
  props: {
    customFilter: '커스텀 검색 필터',
    customSort: '커스컴 정렬 필터',
    disableInitialSort: '초기 랜더링에서 기본 정렬을 비활성화',
    expand: '테이블이 확장 가능한 행(row)를 가지도록 지정',
    filter: '아이템을 필터링하는데 사용되는 함수',
    hideActions: '테이블 액션을 감춤',
    itemKey: '유일한 키로 지정된 아이템 객체의 필드',
    items: '테이블 행(row) 배열',
    mustSort: '**sorted ascending** / **sorted descending** / **unsorted** 상태를 바꾸는(toggle) 대신 적어도 한 열(column)이 항상 정열되도록 함.',
    noResultsText: '필터링 결과가 없을때 보여주는 문자열',
    pagination: '데이터 테이블 외부에서 페이지네이션과 정렬을 제어하는데 사용됨. 기본 정렬 열(column)을 지정하는데도 사용됨',
    rowsPerPageItems: 'row-per-page 드롭다운에 사용되는 기본값',
    rowsPerPageText: '페이지 텍스트의 기본 행',
    search: ' 필터링 결과를 위한 검색 모델',
    selectAll: '모든 체크박스를 선택할 수 있는 헤더-행을 추가. 버튼의 색깔을 나타내는 문자열이나 불린(boolean) 이 가능. 불린의 경우 기본 색이 쓰임.',
    totalItems: '수동으로 행(row) 아이템의 총 개수를 설정. 내장 정렬과 페이지네이션은 비활성화 됨. 서버사이드 정렬과 페이지네이션을 위해 pagination prop과 함께 사용가능',
    value: '선택된 행'
  },
  slots: {
    footer: '추가 풋터(exra footer)를 위한 슬롯',
    noData: '아이템이 없을때 보여짐 (takes precedence over `no-results`)',
    noResults: '필터링된 아이템이 없을때 보여짐'
  },
  scopedSlots: {
    items: '아이템들의 렌더링 방식을 지정하는 슬롯',
    pageText: '페이지네이션 컨트롤의 페이지 텍스트 구역을 커스터마이즈.'
  }
}

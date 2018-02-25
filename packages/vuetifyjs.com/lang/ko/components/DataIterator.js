export default {
  header: '데이터 반복자 (Data iterator)',
  headerText: '`v-data-iterator` 컴포넌트는 데이터를 보여주는데 사용합니다. 주요 기능은 `v-data-table`과 공유합니다.\n정렬(sorting), 검색(searching), 페이지네이션(pagination), 선택(selection) 등이 가능합니다.',
  components: ['v-data-iterator'],
  examples: [{
    simple: {
      header: '간단한 사용 (Simple)',
      desc: '`v-data-iterator`로 데이터가 어떻게 보일지 정확하게 커스터마이즈 할 수 있습니다. 이 예제에서는 카드(Cards)와 그리드 리스트(Grid lists)를 사용합니다.\n`content-tag` prop을 (`content-class`, `content-props`와 함께) 사용하여 아이템들을 둘러싼 요소가 어떻게 보여야할지 지정할 수 있습니다.'
    }
  }],
  props: {
    contentClass: '아이템을 둘러싼 요소에 커스텀 클래스를 적용',
    contentProps: '아이템을 둘러싼 요소에 커스텀 prop을 적용',
    contentTag: '아이템을 둘러싼 요소의 태그를 지정',
    nextIcon: 'Mixins.Input.props.appendIcon',
    prevIcon: 'Mixins.Input.props.prependIcon'
  },
  events: {
    'update:pagination': '`pagination.sync` update 이벤트'
  }
}

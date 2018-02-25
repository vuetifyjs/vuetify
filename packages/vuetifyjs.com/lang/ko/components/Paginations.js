export default {
  header: '페이지네이션 (Pagination)',
  headerText: '`v-pagination` 컴포넌트는 긴 데이터 뭉치를 사용자가 쉽게 볼 수 있도록 나누는 데 쓰입니다. 설정된 길이에 따라 페이지네이션 컴포넌트는 자동으로 확장됩니다. 현재 페이지를 관리하기 위해 간단히 `v-model` 속성을 사용하세요.',
  components: ['v-pagination'],
  examples: [{
    short: {
      header: '짧은 (Short)',
      desc: '부모 컴포넌트가 충분히 크다면, 페이지네이션은 모든 페이지를 표시합니다.'
    },
    long: {
      header: '긴 경우 (Long)',
      desc: '페이지 버튼 개수가 부모 컨테이너를 초과하면, 페이지네이션 컴포넌트는 자동으로 리스트를 자릅니다.'
    },
    limit: {
      header: '제한 (Limit)',
      desc: '`total-visible` prop을 이용해서 표시되는 페이지 버튼의 개수를 수동으로 지정할 수 있습니다.'
    },
    round: {
      header: '둥근 버튼 (Round)',
      desc: '페이지네이션 스타일에 둥근 페이지 버튼을 사용할 수 있습니다.'
    },
    icons: {
      header: '아이콘',
      desc: '이전/다음페이지 아이콘은 `prev-icon` 과 `next-icon` prop으로 커스터마이즈할 수 있습니다.'
    },
    disabled: {
      header: '비활성화 (Disabled)',
      desc: '페이지네이션 아이템들은 수동으로 비활성활 할 수 있습니다.'
    }
  }],
  props: {
    circle: '페이지네이션 요소들의 형태를 둥글게',
    disabled: '컴포넌트 비활성화',
    length: '페이지네이션 길이',
    nextIcon: '"다음" 아이콘을 지정',
    prevIcon: '"이전" 아이콘을 지정',
    totalVisible: '표시할 전체 페이지네이션 최대 값을 지정',
    value: '현재 선택된 페이지'
  }
}

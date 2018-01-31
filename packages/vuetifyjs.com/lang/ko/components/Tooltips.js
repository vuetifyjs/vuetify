export default {
  header: '툴팁 (Tooltip)',
  headerText: '`v-tooltip` 컴포넌트는 사용자가 마우스 포인터를 요소 위에 올렸을 때 (hover) 정보를 전달하는데 유용합니다. 또한 **v-model** 을 이용하여 툴팁의 표시를 프로그램적으로 제어할 수 있습니다.',
  components: ['v-tooltip'],
  examples: [{
    default: {
      header: '기본설정 (Default)',
      desc: '툴팁은 어떤 요소(element)든 감쌀 수 있습니다.'
    },
    alignment: {
      header: '정렬 (Alignment)',
      desc: '툴팁은 활성 요소(activator elements) 의 4방향 어느쪽으로든 정렬될 수 있습니다.'
    },
    visibility: {
      header: '표시여부 (Visibility)',
      desc: '툴팁의 표시여부는 `v-model`을 이용해 프로그램적으로 바꿀 수 있습니다.'
    }
  }],
  props: {
    closeDelay: '메뉴가 닫힌 후(`open-on-hover` prop 이 true(오타인것 같습니다. 확인 필요) 로 설정되었을 때) 지연시간 (ms;밀리세컨드)',
    debounce: '마우스를 올렸을때(hover) 툴팁이 보인 후 사라지는 시간',
    openDelay: '메뉴가 열린 후(`open-on-hover` prop 이 true 로 설정되었을 때) 지연시간 (ms;밀리세컨드)'
  }
}

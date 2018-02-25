export default {
  props: {
    appendIcon: '컴포넌트 뒤에 아이콘을 덧붙임. `v-icon`과 같은 문법을 사용',
    appendIconCb: '덧붙여진 아이콘이 클릭됐을때 호출되는 콜백',
    disabled: '인풋이 비활성화됨',
    hideDetails: '힌트와 검증 오류(validation errors)를 숨김',
    hint: '힌트 문자열',
    label: '인풋 레이블을 지정',
    persistentHint: '힌트가 항상 보이도록 지정',
    placeholder: '인풋 플레이스홀더(placeholder) 문자열',
    prependIcon: '컴포넌트 앞에 아이콘을 추가. `v-icon`과 같은 문법을 사용',
    prependIconCb: '앞에 추가된 아이콘이 클릭되었을 때 호출되는 콜백',
    readonly: '읽기전용 인풋으로 지정',
    required: '인풋을 필수 요소로 지정. 레이블 끝에 별표(asertisk)가 추가됨. 실제 검증은 실행되지 않음',
    tabindex: '인풋의 탭 인덱스(Tabindex)',
    toggleKeys: '인풋을 토글하는 키 코드의 배열 (토글이 지원될 경우)',
    value: '인풋 값'
  }
}

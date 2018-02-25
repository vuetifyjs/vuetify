export default {
  header: '스크롤 디렉티브 (Scrolling directive)',
  headerText: '`v-scroll` 디렉티브로 윈도우나 명시적으로(specifically) 정의된 요소가 스크롤 될때 실행되는 콜백을 제공할 수 있습니다.',
  components: ['v-scroll'],
  examples: [{
    default: {
      header: '기본값 (Default)',
      desc: '기본동작은 윈도우에 연결(bind)됩니다. 추가 설정 옵션이 필요없다면, 단순히 콜백 함수를 넘겨주면 됩니다.',
      uninverted: true
    },
    options: {
      header: '스크롤과 옵션 (Scroll with options)',
      desc: '더 자세한 설정을 위해서, 타겟을 스크롤 이벤트 리스너와 연결할 수 있습니다.',
      uninverted: true
    }
  }],
  options: {
    'arg:target': '`v-scroll:#target="callback"` 타겟의 스크롤 변화를 관찰. 기본 타겟은 윈도우지만 임의의 유효한 id selector 로 바꿀 수 있음',
    'value': '`v-scroll="callback"` 타겟이 스크롤 될때 호출되는 함수'
  }
}

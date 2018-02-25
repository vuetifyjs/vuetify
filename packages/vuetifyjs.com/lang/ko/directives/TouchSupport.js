export default {
  header: '터치 지원 (Touch Support)',
  headerText: '`v-touch` 디렉티브로 스와이프 동작을 감지하고 방향에따른(directional) 콜백을 호출할 수 있습니다.',
  components: ['v-touch'],
  examples: [{
    default: {
      header: 'Default',
      desc: '모바일 디바이스에서 여러 방향으로 스와이핑 해보세요',
      uninverted: true
    }
  }],
  options: {
    '{ move, start, end }': '터치 이벤트가 시작/종료/진행 될 때의 콜백을 지정',
    '{ up, down, left, right }': '스와이프 방향에 따른 콜백을 지정. x-axis 와 y-axis 콜백을 묶는 것은 현재 권장하지 않음'
  }
}

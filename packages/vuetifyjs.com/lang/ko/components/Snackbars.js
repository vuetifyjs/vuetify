export default {
  header: '스낵바 (Snackbar)',
  headerText: '`v-snackbar` 컴포넌트는 사용자에게 퀵 메시지를 표여주기 위해 사용됩니다. 스낵바는 위치지정, 제거 지연(removal delay), 콜백(callback) 등을 지원합니다.',
  components: ['v-snackbar'],
  examples: [{
    position: {
      header: '위치 (Position)',
      desc: '기본 스낵바는 방금 발생한 기능에 주목하도록 만드는데 유용합니다.'
    },
    contextual: {
      header: '문맥 (Contextual)',
      desc: '당신의 구현에 더 적합한 색상을 적용할 수 있습니다.'
    }
  }],
  props: {
    multiLine: '스낵바의 높이를 증가 (mobile)',
    timeout: '스낵바가 자동으로 숨겨질때 까지 걸리는 시간',
    vertical: '스낵바의 컨탠츠를 세로로 쌓음 (mobile)'
  }
}

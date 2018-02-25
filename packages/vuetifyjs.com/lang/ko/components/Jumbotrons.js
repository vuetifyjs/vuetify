export default {
  header: '점보트론 (Jumbotron)',
  headerText: '점포트론은 유연한 액션컴포넌트 입니다. 배경 이미지와 그래디언트 오버레이, 그리고 여러가지를 지원합니다.',
  components: [
    'v-jumbotron'
  ],
  examples: [{
    usage: {
      header: '사용법 (Usage)',
      desc: ''
    },
    color: {
      header: '커스텀 색상 (Custom color)',
      desc: '커스텀 배경색을 적용해보세요.'
    },
    gradient: {
      header: '그래디언트 (Gradient)',
      desc: '그래디언트를 작성하기 위한 더 자세한 정보는  [여기](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient)에서 찾을 수 있습니다.'
    },
    gradientWithImage: {
      header: '그래디언트와 이미지 (Gradient with image)',
      desc: '그래디언트를 작성하기 위한 더 자세한 정보는  [여기](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient)에서 찾을 수 있습니다.'
    }
  }],
  props: {
    gradient: '그래디언트 배경을 적용 **src** prop과 함께 쓰이면 **src** 를 대체합니다.',
    src: '이미지 소스 (img src)'
  }
}

export default {
  header: 'Parallax',
  headerText: '`v-parallax` 컴포넌트는 이미지가 윈도우 보다 늦게 스크롤되어 나타다는 3차원 효과를 만듭니다.',
  components: ['v-parallax'],
  examples: [{
    default: {
      header: '기본값  (Default)',
      desc: 'Parallax는 사용자가 페이지에서 스크롤할때 백그라운드의 움직임을 만듭니다.'
    },
    content: {
      header: '컨텐츠와 함께 (With content)',
      desc: 'Parallax 안에 어떤 컨텐츠라도 포함할 수 있습니다. 이로써 parallax 를 Hero 이미지 처럼 사용할 수 있습니다.'
    },
    customHeight: {
      header: '사용자 지정 높이 (Custom height)',
      desc: 'Parallax에 사용자 지정 높이를 지정할 수 있습니다. 이미지의 크기를 적절하게 조절하지 않으면 parallax가 깨질 수도 있다는 점을 명심하세요'
    },
    jumbotron: {
      header: '점보트론 (Jumbotron)',
      desc: 'Parallax를 표준 **점보트론** 처럼 쓰기 위해 parallax의 효과를 끌 수도 있습니다.'
    }
  }],
  props: {
    alt: 'parallax 이미지에 alt 프로퍼티를 추가',
    src: 'parallax에 사용할 이미지'
  }
}

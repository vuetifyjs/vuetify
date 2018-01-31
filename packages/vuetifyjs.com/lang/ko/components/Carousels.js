export default {
  header: '캐러셀 (Carousel)',
  headerText: '`v-carousel` 컴포넌트는 많은 수의 비쥬얼 컨텐츠(visual conents) 를 회전 타이머(rotating timer)를 이용해 보여줍니다.',
  components: ['v-carousel', 'v-carousel-item'],
  examples: [{
    default: {
      header: '기본',
      desc: '캐러셀의 기본 동작은 슬라이드 트랜지션입니다.',
      uninverted: true
    },
    customTransition: {
      header: '커스텀 트랜지션 (Custom transition)',
      desc: '사용자 커스텀 트랜지션을 적용할 수 있습니다.',
      uninverted: true
    },
    customDelimiter: {
      header: '커스텀 구분자 (Custom delimiter)',
      desc: '캐러셀의 구분자로 아이콘도 쓸 수 있습니다..',
      uninverted: true
    },
    hideControls: {
      header: '컨트롤 숨기기 (Hide controls)',
      desc: '하단의 컨트롤을 숨기려면 `hide-controls` prop 을 사용합니다.(이것도 오타같습니다. 실제론 좌우 전환 컨트롤을 숨깁니다. 델리미터를 숨기는 건 `hide-delemiters` 입니다.)',
      uninverted: true
    }
  }],
  props: {
    appendIcon: 'Mixins.Input.props.appendIcon',
    prependIcon: 'Mixins.Input.props.prependIcon',
    cycle: '케러솔의 이미지가 순환할 것인지 정합니다.',
    delimiterIcon: '아이콘을 케러설 구분자(delimiter)로 지정합니다.',
    hideControls: '내비게이션 컨트롤러를 숨깁니다',
    hideDelimiters: '캐러셀 구분자(delimiter)를 숨깁니다.',
    interval: '이미지 순환 시간 간격',
    reverseTransition: '트랜지션을 반대로 설정합니다.(reverse transition)',
    src: '이미지 주소(src)',
    transition: 'Mixins.Transitionable.props.transition'
  }
}

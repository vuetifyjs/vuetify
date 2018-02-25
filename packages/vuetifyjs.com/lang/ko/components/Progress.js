export default {
  header: '프로그레스 (Progress)',
  headerText: '`v-progress-circular`와 `v-progress-linear` 컴포넌트는 사용자에게 데이터를 시각적으로 전달하는데 쓰입니다. 이들은 로딩, 프로세싱과 같은 확정되지 않은 진행 중인 상태를 표시할 수 있습니다. 이 컴포넌트들은 컴포넌트 컨테이너 안의 중앙에 표시되는 슬롯을 가지고 있습니다.',
  components: ['v-progress-circular', 'v-progress-linear'],
  examples: [{
    circularDefault: {
      header: '기본값 (Default)',
      desc: '기본적으로, 원형(circular) 프로그레스는 어플리케이션의 secondary 색을 사용합니다.'
    },
    circularColored: {
      header: '색 (Colored)',
      desc: '여러 다른 색이 사용될 수 있습니다.'
    },
    circularIndeterminate: {
      header: '불확정 상태 (Indeterminate)',
      desc: '불확정 원형(circular) 진행상태(progress)의 에니메이션은 영원히 지속됩니다.'
    },
    circularSizeAndWidth: {
      header: '크기와 너비 (Size & Width)',
      desc: '원형 프로그레스(progress circular) 컴포넌트는 여러 너비와 크기를 가질 수 있습니다.'
    },
    circularRotate: {
      header: '회전 (Rotate)',
      desc: '프로그레스의 중심은 회전할 수 있습니다. (The progress origin can be rotated.)'
    },
    linearDeterminate: {
      header: '확정적 상태 (Determinate)',
      desc: '선형 진행상태(progress linear) 컴포넌트는 `v-model` 에 의해 변경가능한 확정적 상태를 가질 수 있습니다.'
    },
    linearIndeterminate: {
      header: '불확정 상태 (Indeterminate)',
      desc: '원형(circular) 진행상태(progress) 컴포넌트처럼, 선형 진생상태는 불확정 상태를 가질 수 있습니다.'
    },
    linearBuffer: {
      header: '버퍼 (Buffer)',
      desc: '버퍼 상태는 두 값을 동시에 나타냅니다. 주된(primary) 값은 모델에 의해 제어되고 버퍼는 `buffer-value` prop에 의해 제어됩니다.'
    },
    linearQueryIndeterminateAndDeterminate: {
      header: 'Query Indeterminate and Determinate',
      desc: 'To query state is controlled by the truthiness of indeterminate with the query prop set to true.'
    },
    linearCustomHeightAndContextualColors: {
      header: '커스텀 높이와 문맥상(contextual) 색상 (Custom height and contextual colors)',
      desc: 'A custom height or contextual color can be applied to a progress bar. The bars primary color is your applications primary color.'
    },
    linearCustomColors: {
      header: '사용자지정 색상',
      desc: '`color`와 `background-color` prop을 사용해 색상을 정할 수 있습니다.'
    }
  }]
}

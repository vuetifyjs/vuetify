export default {
  header: '슬라이더 (Slider)',
  headerText: '`v-slider` 컴포넌트는 숫자 입력을 위한 더 나은 시각화를 제공합니다. 사용의 숫자형 데이터를 수집하기 위해 사용도비니다.',
  components: ['v-slider'],
  examples: [{
    continuous: {
      header: '연속적 (Continuous)',
      desc: '연속적(Continuous) 슬라이더는 정확도가 문제가 되지 않을 때만 사용해야 합니다.'
    },
    discrete: {
      header: '불연속 (Discrete)',
      desc: '불연속(Discrete) 슬라이더는 정확한 현재 값을 보여주기 위한 작은 레이블(Thumb label)을 제공합니다. `step` prop를 이용하여 step 을 이외의 값을 선택하는 것을 방지할 수 있습니다.'
    },
    icons: {
      header: '아이콘 (Icons)',
      desc: '`append-icon`과 `prepend-icon` prop을 이용하여 슬라이더에 아이콘을 추가할 수 있습니다.'
    },
    editableNumericValue: {
      header: '수정가능한 숫자값 (With an editable numeric value)',
      desc: '슬라이더는 더 낳은 표현을 위해 다른 컴포넌트와 결합될 수 있습니다.'
    },
    customColors: {
      header: '사용자지정 생상 (Custom colors)',
      desc: '`color`, `track-color`와 `thumb-color` prop들을 이용해 슬라이더의 색상을 정의할 수 있습니다.'
    }
  }],
  props: {
    step: '0 보다 크면 스텝 간격으로 쓰임',
    thumbColor: 'Thumb과 thumb 레이블 색상',
    thumbLabel: 'thumb 레이블을 표시',
    ticks: '',
    trackColor: 'Sets the track fill color'
  }
}

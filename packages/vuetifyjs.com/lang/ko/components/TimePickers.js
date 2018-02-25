export default {
  header: '타임 피커 (Time picker)',
  headerText: '`v-time-picker`는 다른 Vuetify 컴포넌트들에 사용될 수 있는 독자적(stand-alone) 컴포넌트 입니다. 타임 피커는 시간을 선택할 수 있는 시각적 표현을 제공합니다.',
  components: ['v-time-picker'],
  examples: [{
    timeLight: {
      header: '타임 피커 (Time pickers)',
      desc: '타임피커는 기본적으로 라이트 테마를 사용합니다.'
    },
    timeColorable: {
      header: '타임 피커 - 색상 (Time pickers - Colors)',
      desc: '타임 피커의 색상은 `color`와 `header-color` prop을 이용하여 설정할 수 있습니다. `header-color`가 제공되지 않으면 `color` prop이 사용됩니다.'
    },
    timeDialogAndMenu: {
      header: '타임 피커 - 다이얼로그와 메뉴 (Time pickers - In dialog and menu)',
      desc: '피커들의 유연성으로 인해, 원하는 방식을 정확히 그대로 구현할 수 있습니다.'
    },
    time24hFormat: {
      header: '타임 피커 - 24시간 형식 (24h format)',
      desc: '타임 피커는 24시간 형식으로 사용할 수 있습니다.'
    },
    timeAllowedTimes: {
      header: '타임 피커 - 허락된 시간 (Allowed times)',
      desc: '선택 가능한 시간을 배열, 오브젝트, 함수를 이용하여 정의할 수 있습니다.'
    },
    timeWidth: {
      header: '타임 피커 - 너비 지정(Setting picker width)',
      desc: '피커의 너비를 지정하거나 전체 너비로 만들 수도 있습니다.'
    }
  }],
  props: {
    'v-time-picker': {
      format: '사용가능한 옵션은 `ampm`과 `24hr`',
      allowedHours: '선택할 수 있는 시간(hour)를 제한',
      allowedMinutes: '선택할 수 있는 분(minute)를 제한',
      scrollable: '마우스 스크롤로 시간/분을 바꿀 수 있도록 설정',
      min: '선택할 수 있는 최소 시간',
      max: '선택할 수 있는 최대 시간'
    }
  }
}

export default {
  header: '경고창 (Alert)',
  headerText: '`v-alert` 컴포넌트 중요한 정보를 유저에게 전하는데 쓰입니다. 다음의 4가지 종류가 있습니다; **success**, **info**, **warning** 그리고 **error**. 기본 아이콘은 각기 다른 동작(Action)을 나타내고, 바꿀 수 있습니다.',
  components: ['v-alert'],
  examples: [{
    contextual: {
      header: 'Contextual'
    },
    closable: {
      header: '닫기 (Closable)',
      desc: '`v-model`을 사용하여 경고창(Alert)의 상태(state)을 조절할 수 있습니다. 만약 `v-model`을 설정하지 않고 단지 경고창을 보여주기만 원한다면, 단순하게 `value` prop 을 설정하세요. (역주: `v-model`은 내부적으로 `value` prop을 사용합니다.)'
    },
    icon: {
      header: '커스텀 아이콘 또는 아이콘 없애기 (Custom Icon / No Icon)',
      desc: '쉽게 아이콘을 변경하거나 아예 없앨 수 있습니다.'
    },
    transition: {
      header: '디스플레이 트랜지션 (Display transition)',
      desc: '경고창을 보여주거나 숨길 때 커스텀 트랜지션을 적용할 수 있습니다.'
    },
    outline: {
      header: '테두리 강조 (Outline)',
      desc: '테두리가 강조된 경고창(Outline Alert)의 테두리(Border) 색은 현재 적용된 색상으로 부터 상속됩니다.'
    }
  }],
  props: {
    dismissible: 'Specifies that the Alert can be closed',
    icon: 'Designates a specific icon',
    outline: 'Alert will have an outline',
    type: 'Specify a **success**, **info**, **warning** or **error** alert. Uses the contextual color and a pre-defined icon.'
  }
}

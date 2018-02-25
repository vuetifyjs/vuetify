export default {
  header: '선택 컨트롤 (Selection controls)',
  headerText: '선택 컨트롤 컴포넌트는 사용자가 옵션을 선택할 수 있도록 합니다.Selection control components allow a user to select options. 이 컴포넌트들은 자신의 상태를 관리하지 않기 때문에 **반드시** `v-model` prop을 사용해야 합니다.',
  components: ['v-radio-group', 'v-radio', 'v-checkbox', 'v-switch'],
  examples: [{
    example: {
      header: '기본 예제',
      desc: ''
    },
    checkboxesBoolean: {
      header: '체크박스 - 불린 (Boolean)',
      desc: ''
    },
    checkboxesArray: {
      header: '체크박스 - 배열',
      desc: ''
    },
    checkboxesStates: {
      header: '체크박스 - 상태',
      desc: ''
    },
    checkboxesColors: {
      header: '체크박스 - 색깔',
      desc: '`color` prop를 이용하면 체크박스를 어떠한 내장 색(builtin colors) 이나 contextual 이름에 대응 하는 색으로 만들 수 있습니다.'
    },
    checkboxesInlineTexfield: {
      header: '체크박스 - textfield 를 이용한 Inline',
      desc: ''
    },
    radiosDefault: {
      header: '라디오 - 기본',
      desc: '기본적으로는 라디오그룹이 반드시 필요합니다. 하지만 `mandatory` prop 을 사용해 바꿀 수 있습니다.'
    },
    radiosDirection: {
      header: '라디오 - 방향',
      desc: '라디오그룹은 행이나 열로 나타낼 수 있습니다. 기본값은 열(column)입니다.'
    },
    radiosColors: {
      header: '라디오 - 색깔',
      desc: '`color` prop를 이용하면 라디오를 어떠한 내장 색(builtin colors) 이나 contextual 이름에 대응 하는 색으로 만들 수 있습니다.'
    },
    switchesBoolean: {
      header: '스위치 - 불린',
      desc: ''
    },
    switchesArray: {
      header: '스위치 - 배열',
      desc: ''
    },
    switchesStates: {
      header: '스위치 - 상태',
      desc: ''
    },
    switchesColors: {
      header: '스위치 - 색깔',
      desc: '`color` prop를 이용하면 스위치를 어떠한 내장 색(builtin colors) 이나 contextual 이름에 대응 하는 색으로 만들 수 있습니다.'
    }
  }],
  props: {
    column: '라디오 버튼을 열(column)로 표시',
    disabled: 'Mixins.Input.props.disabled',
    label: 'Mixins.Input.props.label',
    mandatory: 'Forces a selection on a `v-radio` child',
    name: '컴포넌트의 name 어트리뷰트를 설정',
    row: '라디오 버튼을 행(row)으로 표시',
    indeterminate: 'Sets an indeterminate state for the checkbox',
    inputValue: 'The **v-model** bound value',
    value: 'Sets the value of the selection control component'
  },
  events: {
    blur: 'Mixins.Input.events.blur',
    change: 'Mixins.Input.events.change',
    'update:error': 'Mixins.Input.events.update:error'
  }
}

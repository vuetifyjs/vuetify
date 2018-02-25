export default {
  header: '텍스트 필드 (Text field)',
  headerText: '텍스트 필드 컴포넌트는 사용자가 제공한 정보를 모으는데 사용됩니다.',
  components: ['v-text-field'],
  supplemental: ['MaskTable'],
  examples: [{
    label: {
      header: '레이블과 함께 (With label)',
      desc: '텍스트필드는 다크/라이트 두 테마 옵션과 함께 사용됩니다.'
    },
    singleLine: {
      header: '한 줄 라이트 테마 (Single line light theme)',
      desc: 'Single line text-fields do not float their label on focus or with data.'
    },
    icon: {
      header: '아이콘과 함께 (With Icon)',
      desc: '아이콘은 앞(prepended)이나 뒤(appended)에 넣을 수 있습니다.'
    },
    multiLine: {
      header: '여러 줄 (Multi-Line)',
      desc: '여러 줄 텍스트 필드는 다량의 텍스트에 유용합니다.'
    },
    characterCounter: {
      header: '글자수 카운터 (Character counter)',
      desc: '사용자에게 글자수 제한을 보여주기 위해 카운터를 사용합니다. 카운터는 그 자체로 어떤 검증(validation)도 하지 않습니다. 검증을 위해서는 내부 검증 시스템이나 서드파티 파이브러리를 연결해야 합니다.'
    },
    password: {
      header: '암호 입력 (Password input)',
      desc: '암호 입력은 덧붙여지는 아이콘과 표시를 제어하는 콜백과 함께 사용됩니다.'
    },
    validation: {
      header: '검증 (Validation)',
      desc: 'Vuetify는 `rules` prop 을 통해 간단한 검증(validation)을 제공합니다. `rules` prop은 콜백 배열을 받습니다. 규칙들(rules)을 검증할 때, 현재 v-model 값이 콜백으로 전달됩니다. 이 콜백은 `true` 나 에러 메시지로 `String`을 반환해야 합니다.'
    },
    fullWidthWithCharacterCounter: {
      header: '전체-너비 텍스트 필드와 글자수 카운터 (Full-width text field with character counter)',
      desc: '전체 너비 텍스트 필드는 무제한 인풋을 만들 수 있도록 해줍니다. 이 예제에서는 `v-divider` 를 이용해 필드들을 분리하였습니다. '
    },
    requiredFields: {
      header: '필수 필드 (Required fields)',
      desc: '이 예제에서는 두 개의 필수 텍스트 필드가 사용되었습니다. 레이블에 애스터리스크를 적용하고 필드 검증을 하기 위해 **required** prop을 활용하였습니다.'
    },
    hint: {
      header: '힌트 텍스트 (Hint text)',
      desc: '텍스트 필드의 **hint** 프로퍼티는 텍스트 필드 아래 문자열을 추가합니다. **persistent-hint** 를 사용하면 텍스트 필드가 포커스 되지 않았을 때도 힌트 문자열을 유지할 수 있습니다.'
    },
    prefixesAndSuffixes: {
      header: '접두사와 접미사 (Prefixes & suffixes)',
      desc: '**prefix**와 **suffix** 프로퍼티는 텍스트 필드에 편집 불가능한 인라인 텍스트를 앞이나 뒤에 붙일 수 있습니다.'
    },
    customValidation: {
      header: '사용자 검증 (Custom validation)',
      desc: '내장된 `v-form`이나 [vuelidate](https://github.com/monterail/vuelidate),[vee-validation](https://github.com/logaretm/vee-validate)같은 서드파티 플러그인은 검증 프로세스를 구성하는 것을 도와주지만 동시에 간단한 사용자 검증을 선택 할 수도 있습니다.'
    },
    textarea: {
      header: 'Textarea',
      desc: 'Textarea 텍스트 필드는 대체 스타일을 가지고 있습니다.',
      uninverted: true
    },
    box: {
      header: '박스 스타일 (Box style)',
      desc: '텍스트 필드는 대체 박스 디자인과 함께 사용될 수 있습니다. Append 나 prepend 아이콘 prop들은 이 모드를 지원하지 "않습니다".'
    },
    solo: {
      header: '솔로 스타일 (Solo style)',
      desc: '텍스트 필드들은 솔로 디자인과 함께 사용될 수도 있습니다.'
    },
    customColors: {
      header: '사용자 색상 (Custom colors)',
      desc: '선택적으로 택스트필드의 칼라를 마테리얼 디자인 팔레트의 어떤 색상으로든 바꿀 수 있습니다. 아래 예는 검증과 커스텀 폼의 구현입니다.'
    },
    masks: {
      header: '마스크 (Masks)',
      desc: '텍스트 필드는 문자 마스크로 검증할 수 있습니다. 미리 만들어져 있거나 혹은 사용자가 만든 규칙들을 이용하여 선택적으로 특정한 문자열 포맷을 만들고 검증할 수 있습니다.'
    },
    progressBar: {
      header: '프로그레스 바 (Progress bar)',
      desc: '바텀 라인(bottom line) 대신 프로그레스 바를 표시할 수도 있습니다. 기본적으로 텍스트 필드와 같은 색상을 가진 불확정 프로그래스를 사용하 ㄹ수도 있고  `progress` 슬롯을 이용해서 커스터마이즈할 수도 있습니다.'
    }
  }],
  props: {
    autoGrow: '인풋의 자동 확장(Auto-grows). 이 옵션은 **v-model**을 필요로 합니다.',
    autofocus: '오토 포커스 활성화',
    box: '대체 박스 인풋 스타일을 적용',
    counter: '인풋 길이 카운터를 생성. 넘버가 지정되지 않으면 25가 기본 값으로 쓰입니다. 검증(validation)은 적용되지 않습니다.',
    fullWidth: '인풋 타입을 전체-너비로 설정',
    multiLine: 'textarea 로 전환',
    prefix: '접두사(prefix) 표시',
    rows: 'textarea 의 열(row) 수',
    suffix: '접미사(suffix) 표시',
    textarea: '대체 스타일의 Textarea 텍스트 필드',
    toggleKeys: '인풋을 토글하기 위한 키 코드 배열 (토글이 지원될 경우)',
    type: '인풋 타입을 설정'
  },
  events: {
    change: 'Mixins.Input.events.change',
    'update:error': 'Mixins.Input.events.update:error'
  }
}

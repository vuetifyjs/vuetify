export default {
  header: '폼 (Form)',
  headerText: 'Vuetify 는 폼 유효성 검사(validation)과 관련하여 다양한 통합기능을 가지고 있고 기능면에서 숙성되어 있습니다. 서드파티(3rd party) 플러긴을 사용하고 싶습니까? Out of the box you can use [Vee-validate](https://github.com/baianat/Vee-validate) and [vuelidate](https://github.com/monterail/vuelidate).',
  components: ['v-form'],
  examples: [{
    basicValidation: {
      header: 'VForm - 기본 유효성 검사 (Basic validation)',
      desc: '내장된 `v-form` 컴포넌트는 폼에 입력에 쉽게 유효성 검사를 추가할 수 있게 합니다. 모든 입력 컴포넌트는 함수 배열을 사용하는 `rules` prop을 가지고 있습니다. 입력 값이 변경될때 마다, 배열의 각 함수는 새로운 값을 받습니다. 함수가 false나 문자열을 반환하면, 유효성 검사는 실패한 것으로 간주됩니다.'
    },
    validationWithSubmitAndClear: {
      header: '서브밋/클리어 유효성 검사 (Validation with submit & clear)',
      desc: '`v-form` 컴포넌트는 `ref`를 설정하여 액세스할 수 있는 두 개의 함수를 가지고 있습니다. `validate()` 함수는 모든 입력값에 대해 유효성을 검사하고 모두 유효한지를 리턴합니다. `reset()` 함수는 모든 인풋(inputs)에서 유효성 검사 에러를 제거합니다.'
    },
    vuelidate: {
      header: 'Vuelidate',
      desc: ''
    },
    veeValidate: {
      header: 'Vee-validate',
      desc: 'Vee-validate 폼을 체크하는 것을 도와주는 또 다른 유효성 검사 플러그인입니다. 한가지 주의사항(caveat)은 **value** prop을 사용할때 `v-checkbox`를 제대로 검사하기 위해 반드시 **type="checkbox"** 를 추가해야 한다는 점입니다'
    }
  }],
  props: {
    lazyValidation: '**value** 는 검사 에러(validation error) 가 표시될때 까지 **vallue** 가 무조건 _true_가 됩니다. 검사를 수동으로 호출하려면 여전히 `validate()` 함수를 호출할 수 있습니다.'
  },
  functions: {
    reset: '모든 인풋의 검사를 리셋합니다.=',
    validate: '모든 인풋을 검사하고 결과를 리턴합니다.'
  }
}

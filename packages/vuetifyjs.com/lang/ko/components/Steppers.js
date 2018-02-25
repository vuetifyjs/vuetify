export default {
  header: '단계 (Stepper)',
  headerText: '`v-stepper` 컴포넌트는 숫자가 매겨진 단계를 가진 진행상태를 표시합니다.',
  components: [
    'v-stepper',
    'v-stepper-step',
    'v-stepper-content',
    'v-stepper-header'
  ],
  examples: [{
    example: {
      header: '예제 (Example)',
      desc: '단계(stepper) 는 쇼핑 카트나 레코드 생성 등 여러 시나리오에 사용될 수 있습니다.'
    },
    editable: {
      header: '편집가능한 단계 (Editable steps)',
      desc: '편집가능한 단계는 언제라도 사용자가 선택할 수 있으며 해당 단계로 이동됩니다.'
    },
    nonEditable: {
      header: '편집할 수 없는 단계 (Non-editable steps)',
      desc: '편집할 수 없는 단계는 사용자가 프로세스를 선형적으로만 진행할 수 있도록 강제합니다.'
    },
    optional: {
      header: '선택적 단계 (Optional steps)',
      desc: '선택적 단계는 보조 문자열(sub-text) 와 함께 호출 할 수 있습니다.'
    },
    horizontal: {
      header: '수평 단계 (Horizontal steps)',
      desc: '수평 단계는 유저가 X 축 위에서 정의된 단계를 따라 이동하게 합니다.'
    },
    vertical: {
      header: '수직 단계 (Vertical steppers)',
      desc: '수작 단계는 유저가 Y 축 위에서 정의된 단계를 따라 이동하게 합니다. 이를 제외하면 수평단계와 똑같이 작동합니다.'
    },
    linear: {
      header: '선형 단계 (Linear steppers)',
      desc: '선형 단계는 사용자가 언제나 미리 정의된 경로를 따라 이동하게 합니다.'
    },
    nonLinear: {
      header: '비선형 단계 (Non-linear steppers)',
      desc: '비선형 단계는 사용자의 선택에 따라 미리 정의된 진행방식을 따라 이동하게 합니다.'
    },
    alternateLabels: {
      header: '대체 레이블 (Alternate labels)',
      desc: '타이틀을 단계 아래에 배치할 수 있습니다.'
    },
    error: {
      header: '여러 줄 오류 상태 (Multi-line error state)',
      desc: '사용자에게 필수적인 액션을 알리기 위해 오류 상태를 표시할 수 있습니다.'
    },
    alternateError: {
      header: '여러줄 오류 상태의 대체 레이블 (Alternative label multi-line error state)',
      desc: '오류 상태에 대체 레이블 스타일을 적용할 수 있습니다.'
    },
    verticalError: {
      header: '세로 여러 줄 오류 상태 (Vertical multi-line error state)',
      desc: '오류 상태는 수직 단계로 표시할 수도 있습니다.'
    },
    dynamic: {
      header: '동적 단계 (Dynamic steps)',
      desc: '각 단계는 동적으로 추가되거나 제거 될 수 있습니다. 현제 활성화된 단계가 제거될 경우, 적용된 모델을 변경하여 이를 적절이 관리해야 합니다..'
    }
  }],
  props: {
    altLabels: '단계 아래에 레이블을 표시',
    complete: '단계가 완료된 것으로 표시',
    completeIcon: '단계가 완료되었을 때 표시할 아이콘',
    editable: '단계를 변경 가능하도록 설정',
    editIcon: '단계가 변경 가능할때 표시할 아이콘',
    errorIcon: '단계에 오류가 있을 대 표시할 아이콘',
    nonLinear: '사용자가 어떤 단계로든 이동할 수 있도록 설정',
    vertical: '단계를 세로로 표시',
    'v-stepper-step': {
      step: '단계의 원 안에 표시할 컨탠츠'
    },
    'v-stepper-content': {
      step: '단계와 연관된 컨텐츠'
    }
  }
}

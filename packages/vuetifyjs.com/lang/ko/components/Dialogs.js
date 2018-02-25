export default {
  header: '대화창 (Dialog)',
  headerText: '`v-dialog` 컴포넌트는 사용자에게 해야할 특정 작업에 대해 알리고 중요한 정보를 포함하거나 결정을 내리거나 여러 작업을 포함 할 수 있습니다. 대화창은 방해적(interruptive) 이므로 자제해서 사용하세요.',
  components: ['v-dialog'],
  examples: [{
    simple: {
      header: '간단한 대화창 (Simple dialogs)',
      desc: '선택된 옵션을 바로 커밋(commit) 하고 메뉴를 닫습니다. 대화창의 바깥을 건드리거나 (touch) 뒤로가기(Back)을 누르면 액션을 취소하고 대화창을 닫습니다.',
      uninverted: true
    },
    withoutActivator: {
      header: 'Without activator',
      desc: '어떤 이유로 activator 슬롯을 사용할 수 없을 경우, 선택창을 활성화하는 이벤트에 `.stop` 수식어(modifier)를 사용했는지 확인하세요(사용해야한다는 의미).',
      uninverted: true
    },
    modal: {
      header: '모달 (Modal)',
      desc: '바깥 부분을 건드려도 닫히지 않는 다는 점을 제외하면 간단한 대화창(Simple Dialog)과 비슷합니다.',
      uninverted: true
    },
    fullscreen: {
      header: '전체화면 (Fullscreen)',
      desc: '모바일 장치에서 공간이 부족할 경우 큰 화면을 가진 장치에서 쓰는 일반 대화창 보다 전체화면 대화창이 더 적당할 수도 있습니다.',
      uninverted: true
    },
    form: {
      header: '폼 (Form)',
      desc: '대화창내의 간단한 폼 예제.',
      uninverted: true
    },
    scrollable: {
      header: '스크롤 (Scrollable)',
      desc: '스크롤 되는 컨텐츠를 가진 대화창 예제',
      uninverted: true
    },
    overflowed: {
      header: '오버플로우 (Overflowed)',
      desc: '모달이 화면 크기에 맞지 않으면 컨텐츠를 스크롤할 수 있습니다..',
      uninverted: true
    }
  }],
  props: {
    disabled: 'Disabled the ability to open the dialog',
    fullWidth: 'Specifies the modal to force 100% width',
    fullscreen: 'Changes layout for fullscreen display',
    hideOverlay: 'Hide the display of the overlay',
    lazy: 'Mixins.Bootable.props.lazy',
    maxWidth: 'The maximum width of the content',
    origin: 'Mixins.Transitionable.props.origin',
    persistent: 'Clicking outside will not dismiss the dialog',
    scrollable: 'When set to true, expects a card, card-title, card-text and card-actions. Additionally card-text should have specified height. Will set card-text to overflow-y',
    transition: 'Mixins.Transitionable.props.transition',
    width: 'Sets the dialog width'
  }
}

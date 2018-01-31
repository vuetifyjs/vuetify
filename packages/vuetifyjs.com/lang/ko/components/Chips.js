export default {
  header: '칩 (Chip)',
  headerText: '`v-chip` 컴포넌트는 작은 조각의 정보를 전달하는데 사용합니다. `close` 속성을 사용하면 더 인터랙티브(대화형)해집니다.',
  components: ['v-chip'],
  examples: [{
    default: {
      header: '기본 (Default)',
      desc: '칩에는 다음 4가지 주 변형이 있습니다; 표준(regular), 아이콘 사용, 사진(portrait) 사용, 닫기 가능(closeable)',
      uninverted: true
    },
    colored: {
      header: '색상 (Colored)',
      desc: '머티리얼 디자인 팔레트의 어떤 색이는 칩의 색으로 쓸 수 있습니다.'
    },
    icon: {
      header: '아이콘 (Icon)',
      desc: '텍스트뿐 아니라 머티리얼 아이콘 폰트 라이브러이의 아이콘도 사용할 수 있습니다.'
    },
    outline: {
      header: '테두리형 (Outline)',
      desc: '테두리형 칩의 경계(border) 색은 현대 텍스트 색으로부터 상속됩니다.'
    },
    label: {
      header: '레이블 (Label)',
      desc: '레이블 칩은 `v-card`의 테두리 반경(border-radious)를 사용합니다.'
    },
    closable: {
      header: '닫기가능 (Closable)',
      desc: '닫기가 가능한 칩(Closable chips)은 `v-model`로 제어합니다. 칩이 닫혀있는지 알려면 `input` 이벤트를 Listen 하면 됩니다.',
      uninverted: true
    },
    inSelects: {
      header: 'Select 에 사용 (In selects)',
      desc: 'Select 시 선택된 데이터를 표시할때 칩을 사용할 수 있습니다.',
      uninverted: true
    }
  }],
  props: {
    close: '제거(닫기) 버튼 추가',
    disabled: '칩을 비활성화 하고 선택할 수 없게 만듬',
    label: '둥근 테두리를 제거',
    outline: '배경(background)를 제거하고 테두리(border)와 텍스트 색을 적용',
    selected: 'Selection color 를 칩에 적용. 주로 `v-select` 에서 선택을 강조하기 위해 사용됨',
    small: '작은 칩'
  }
}

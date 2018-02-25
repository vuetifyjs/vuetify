export default {
  header: '사이트 경로 (Breadcrumbs)',
  headerText: '`v-breadcrumbs` 컴포넌트는 페이지들을 위한 내비게이션형 헬퍼입니다.**머티리얼 아이콘** 이나 글자를 구분자(divider)로 사용할 수 있습니다. _href_ 필드, 텍스트 또는 선택적으로 _disabled_ 를 포함하는 오브젝트들의 배열이 컴포넌트의 **item** 속성으로 사용될 수 있습니다.  Additionally, a regular slot exists for more control of the breadcrumbs, either utilizing `v-breadcrumbs-item` or other custom markup.',
  components: ['v-breadcrumbs', 'v-breadcrumbs-item'],
  examples: [{
    textDividers: {
      header: '텍스트 구분자 (Text dividers)',
      desc: 'Breadcrumbs의 기본 구분자는 텍스트고 어떤 문자열이든 사용할수 있습니다.'
    },
    iconDividers: {
      header: '아이콘 구분자 (Icon dividers)',
      desc: '어떤 머티리얼 디자인 아이콘이든 사용할 수 있습니다.'
    }
  }],
  props: {
    divider: '구분자 문자열을 설정',
    icons: '아이콘을 구분자로 사용할 것을 지정',
    justifyCenter: '중앙정렬 (Align the breadcrumbs center)',
    justifyEnd: '우측정렬 (Align the breadcrumbs at the end)',
    large: '아이템의 글자크기를 키움'
  }
}

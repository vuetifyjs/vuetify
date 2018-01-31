export default {
  header: '바닥글 (Footer)',
  headerText: '`v-footer` 컴포넌트는 사이트내의 모든 페이지에서 유저에게 보여주고 싶은 일반적인 정보를 표시하는데 유용합니다.',
  components: ['v-footer'],
  examples: [{
    default: {
      header: '디폴트',
      desc: '바닥글 컴포넌트는 기본 컨테이너 입니다.'
    },
    companyFooter: {
      header: '회사 바닥글 (Company Footer)',
      desc: '링크를 가진 기본적인 회사 바닥글 컴포넌트 입니다.'
    },
    indigoFooter: {
      header: '인디고 바닥글 (Indigo Footer)',
      desc: '인디고 배경색과 소셜 미디어 아이콘/버튼을 가진 바닥글 입니다.'
    },
    tealFooter: {
      header: '틸 바닥글 (Teal Footer)',
      desc: '틸(Teal) 색상 헤더와 링크들의 열(column), 행(row)을 가진 바닥글 입니다.'
    }
  }],
  props: {
    absolute: 'Mixins.Positionable.props.absolute',
    fixed: 'Mixins.Positionable.props.fixed',
    inset: 'Positions the toolbar offset from an application `v-navigation-drawer`'
  }
}

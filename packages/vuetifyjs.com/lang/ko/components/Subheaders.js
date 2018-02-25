export default {
  header: '서브헤더 (Subheaders)',
  headerText: '`v-subheader` 컴포넌트는 리스트의 섹션을 분리하는데 사용됩니다.',
  components: ['v-subheader'],
  examples: [{
    list: {
      header: '리스트 서브헤더 (List subheaders)',
      desc: '서브헤더는 리스트 내에서 아래의 정보들을 기술하는데 사용됩니다.'
    },
    grid: {
      header: '그리드 서브헤더 (Grid subheaders)',
      desc: '서브헤더는 사용자가 보는 것에 대한 문맥을 추가할 수 있습니다.'
    },
    menu: {
      header: '메뉴 서브헤더 (Menu subheaders)',
      desc: '서브헤더는 여러 다른 종류의 액션을 분리하는 것을 도울 수 있습니다..'
    },
    social: {
      header: '서브헤더와 소셜 미디어 (Subheaders with social media)',
      desc: '서브헤더를 이용한 소셜미디어 인터렉션'
    }
  }],
  props: {
    inset: '들여쓰기(indentation)를 추가 (72px)'
  }
}

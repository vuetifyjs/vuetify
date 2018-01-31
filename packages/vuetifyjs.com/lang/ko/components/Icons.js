export default {
  header: '아이콘 (Icon)',
  headerText: '`v-icon` 컴포넌트는 다양한 상황에서 쓸 수 있는 많은 glyphs(그림문자)를 제공합니다.  Vuetify 아이콘들은 구글의 머티리얼 아이콘 폰트 라이브러리를 사용합니다. 사용가능한 모든 아이콘의 리스트를 보려면 공식 <a href="https://material.io/icons/" target="_blank" rel="noopener">머티리얼 아이콘</a> 페이지를 방문하세요.',
  components: ['v-icon'],
  examples: [{
    standard: {
      header: '표준',
      desc: '아이콘들은 두가지 테마(라이트와 다크)로 쓰이며 4가지 크기 (standard, medium, large, and x-large) 를 가지고 있습니다.'
    },
    fontAwesome: {
      header: '폰트어썸 (Font Awesome)',
      desc: '[폰트어썸(Font Awesome)](http://fontawesome.io/icons/) 도 지원됩니다. 간단히 아이콘 이름 앞에 `fa-`를 붙이세요. 물론 폰트어썸 라이브러리를 프로젝트에 직접 include 해야한다는 걸 기억하세요.'
    },
    mdi: {
      header: '머티리얼 디자인 아이콘 (Material Design Icons)',
      desc: '[머티리얼 디자인 아이콘](https://materialdesignicons.com/) 역시 지원됩니다. 간단히 `mdi-`를 아이콘 이름앞에 붙이세요. 물론 MDI를 라이브러리를 프로젝트에 직접 include해야한다는 걸 기억하세요.'
    },
    color: {
      header: '색상 Color',
      desc: '색상 헬퍼들을 이용하여 아이콘의 색을 기본적인 다크나 라이트 테마 이상으로 바꿀 수 있습니다.'
    },
    buttons: {
      header: '버튼 (Buttons)',
      desc: '아이콘은 액션을 강조하기 위해 버튼 안에서도 사용될 수 있습니다.'
    }
  }],
  props: {
    disabled: 'Mixins.Input.props.disabled',
    large: '큰 아이콘 **(36px)**',
    left: '버튼 안에 쓰일 때 아이콘을 왼쪽으로 위치시킵니다.',
    medium: '중간 크기 아이콘 **(28px)**',
    right: '버튼 안의 아이콘을 오른쪽으로 위치시킵니다.',
    small: '작은 아이콘 **(16px)**',
    xLarge: '아주 큰 아이콘 **(40px)**'
  }
}

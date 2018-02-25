export default {
  header: '개요',
  headerText: '컴포넌트 프레임웤인 Vuetify는 늘 수평적으로 확장됩니다. 프로젝트에 따라 작은 **패키지 크기**가 필요할 수도 있습니다. 아라카르트(A la crate) 시스템은 임포트(import) 할 컴포넌트들을 선택할 수 있게 하여 빌드 크기를 극적으로 _줄여줍니다_. **이미 `a-la-carte` 템플릿을 설치했다면  [다음 가이드](/guides/a-la-carte#application)로 건너 뛰셔도 됩니다.**',
  headerText2: '`vue init vuetifyjs/a-la-carte` 명령어를 사용하여 **a-la-carte** 템플릿을 cli 에서 설치하면 단일 컴포넌트를 임포트하는 예제 프로젝트를 볼 수 있습니다. 우리가 제공하는 다른 템플릿 중의 일부는 a-la-carte 컴포넌트들을 활성화하는 옵션을 제공하기도 합니다. 더 자세한 정보는 [빠른 시작 안내](/ko/getting-started/quick-start)를 참고하세요',
  importHeader: '컴포넌트 임포팅(importing)',
  importText1: '`transform-imports` 패키지가 a-la-carte 컴포넌트에 꼭 필요한 건 아니지만 패키지들을 임포팅하는 프로세스를 간단하게 만들기 때문에 "매우" 추천합니다. 이는 컴포넌트를 임포팅할때 더 간결한 문법을 사용하게 해 줍니다.',
  alert2: 'Vuetify 를 쓰려면 `Vuetify` 와 `VApp` 컴포넌트가 둘다 필요하다는 것을 기억하세요',
  alert3: '`Vue.use` 의 두번째 인자로 사용하는 옵션 객체는 _directives_ 와 _transitions_ 프로퍼티를 둘다 포함할 수 있습니다.',
  importText2: 'transform-imports 패키지를 사용하지 않는다면 다음처럼 각 컴포넌트를 직접 임포트해야 합니다.',
  importText3: '아래와 같이 .vue 파일에서 컴포넌트를 임포트할 수도 있습니다. 이 경우 중요한 점은 이름을 가진 export들(named exports)을 모두 임포트하고 컴포넌트 내내에서 비구조화(destructure)해야 한다는 것입니다. 그렇지 않으면 `v-card-text` 나 `v-expansion-panel-content` 와 같은 자식 컴포넌트들을 사용할 수 없게 됩니다.',
  styleHeader: '필요한 스타일 (Required styles)',
  styleText1: '필요한 모든 스타일을 적용하려면 스타일들을 stylus 내에 임포트해야 합니다. 웹팩이 이 것을 다루기 때문에, `stylus` 와 `stylus-loader` 를 **npm** 으로 설치해야 합니다.',
  alert4: 'stylus 설정에 대한 더 자세한 설명은 <a href="/ko/style/themes">테마 페이지</a>를 참고하세요.',
  styleText2: '이제 어플리케이션의 엔트리 포인트에서 stylus를 require 해야합니다. 이 엔트리 포인트는 Vue 와  Vuetify 를 임포팅한 것과 같은 파일입니다 (보통 `main.js`나 `app.js`). 메인 `App.vue`에서 stylus 를 require 하면 업데이트마다 다시 프로세싱되기 때문에 로딩 타임이 느려질 수 있습니다.',
  applicationHeader: '어플리케이션 (Application)',
  applicationText1: '**src** 폴더로 가서 `main.js` 를 여세요. a-la-carte 템플릿을 사용하고 계신다면 이미 일부 컴포넌트들이 로딩되도록 설정되어 있을 겁니다.',
  applicationText2: '아래 코드 예제는 `<v-app>`,`<v-navigation-drawer>`, `<v-footer>`, `<v-toolbar>` 를 사용하는 어플리케이션입니다. 일단 정의된 후에는 이 마크업들을 어떤 .vue 파일에서든 사용할 수 있습니다.`',
  componentNameListHeader: 'UI 컴포넌트 네임 리스트 (UI Component Name List)',
  componentNameListText1: '`VLayout` 이나 `VFlex` 같은 일부 컴포넌트들은 구조적인(organizational) 이유로 다른 컴포넌트들(이 경우엔 `VGrid`)에 포함되어 있습니다. 어떤 컴포넌트들을 import 해야할지 알기 위해선 다음 테이블을 참조하세요.',
  toc: [
    {
      text: '개요',
      href: 'introduction'
    },
    {
      text: '컴포넌트 임포팅',
      href: 'importing-components'
    },
    {
      text: '필요한 스타일들',
      href: 'required-styles'
    },
    {
      text: '어플리케이션',
      href: 'application'
    },
    {
      text: 'UI 컴포넌트 네임 리스트',
      href: 'component-name-list'
    }
  ]
}

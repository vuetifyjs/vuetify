export default {
  header: '개요 (Overview)',
  headerText: '이 오버뷰는 여러분이 **Vuetify** 의 Vue SSR 템플릿에 능통해 지는 것을 도와주기 위해 디자인되었습니다. 아직 `webpack-ssr` 템플릿을 설치하지 않으셨다면  <router-link to="/ko/vuetify/quick-start">빠른 시작</router-link>를 참고하여 설치하세요.',
  structureHeader: '구조 (Structure)',
  structureText1: 'Vue CLI 템플릿은 성능, SEO 최적화, 사용성을 위해 설계되었습니다. 이 템플릿은 css, sass, stylus 전처리가 이미 설정되어 있습니다.',
  structureText2: '프로젝트와 관련된 웹팩 빌드 설정은 모두 **Build** 폴더에 있습니다. **Src** 폴더엔 모든 개발프로젝트 파일들이 위치합니다. Webpack-SSR 템플릿은 [Vue Router](https://router.vuejs.org/en/), [Vuex](https://vuex.vuejs.org/en/intro.html), [Vue Server Renderer](https://vuejs.org/v2/guide/ssr.html) 를 사용하기 위한 설정들이 이미 포함되어 있습니다. 따라서 여러분은 빠르고/효과적일뿐 아니라 **SEO** 친화적인 간단하거나 복잡한 어플리케이션을 쉽게 만들 수 있습니다.',
  structureSubHeader: '폴더구조 (Folder Structure)',
  applicationHeader: '어플리케이션 (Application)',
  applicationText1: '**src** 폴더로 가서 `App.vue` 파일을 열어보세요. Vuetify는 의미 중심적(sematic-focused) 프레임웤입니다. 여러분이 쓰는 코드는 기억하기 쉽고, 관리하기도 쉬워야 합니다.  이를 위한 컴포넌트가 `v-app` 입니다. 이 컴포넌트는 여러분이 어플리케이션의 레이아웃을 정의할 수 있도록 합니다. 이 컴포넌트는 <code>v-toolbar</code>, <code>v-navigation-drawer</code>, <code>v-footer</code> 컴포넌트들과 연계하여 사용됩니다.',
  applicationText2: '아래 마크업(markup)은 `toolbar` 와 `footer` 를 가진 어플리케이션의 예제입니다. 일단 정의되면 컨텐츠 영역은 적절히 재조정됩니다. 레이아웃에 대한 더 자세한 정보는  <router-link to="/ko/layouts/pre-defined">레이아웃</router-link> 을 참조하세요.',
  applicationText3: '모든 정적으로 제공(serve)되는 애셋(assets)들은 `static` 폴더에 위치합니다. 이 폴더의 파일들은 `/static/picture.png` 처럼 접근할 수 있습니다.',
  applicationText4: '여러분의 커스텀 컴포넌트들은 components 폴더에 넣어야 합니다. 이 파일들을 자동으로 부트스트랩(bootstrap) 하려면 `components/_index.js` 파일을 편집하세요.',
  applicationSubHeader1: '정적인 애셋(tatic assets)',
  applicationSubHeader2: '컴포넌트 (Components)',
  routingHeader: '라우팅 (Routing)',
  routingText1: 'Webpac-SSR 템플릿은 어플리케이션의 흐름(flow)를 위해 공식 Vue Router 를 사용합니다. 어플리케이션의 모든 라우트들과 라우트 로직들은 `/src/route/index.js` 에서 정의됩니다. 이 파일에서 동적으로 페이지들을 임포트할 수 있게 해주는 함수도 볼 수 있습니다. 이 함수가 꼭 필오한 것은 아니지만 어플리케이션을 분할해서 필요한 뷰들만 로드하고 최종적으로 만들어지는 번들을 작게 만드는데 도움이 됩니다.',
  routingText2: '이 라우트들은 지정된 경로에 대한 링크나 Vue Router 의 `<router-link>` 컴포넌트로 접근할 수 있습니다. 더 자세한 정보는 [공식 Vue Router 문서](https://router.vuejs.org/ko/)를 참고하세요. 기본 기능은 여러분이 view 들을 <kbd>/pages</kbd> 폴더에 **View**로 끝나는 파일로 저장한다고 가정합니다. 예를 들면 <code>HomeView.vue</code>.',
  stateControlHeader: '상태 제어 (State control)',
  stateControlText1: '상태 제어는 공식 Vuex 라이브러리로 관리합니다. 이 Vue 플러긴은 페이스북의 Reflux 다자인 패턴을 따릅니다. <code>/store/index.js</code> 로 가보세요. 기본적으로 Vuex는 페이지가 최초로 렌더링 되기전에 저장소(store) 데이터를 미리 받아오도록(prefetch) 설정됩니다. 이 기능을 제어(hook into)하려면 `preFetch` 메소드를 view 컴포넌트에 추가하면 됩니다.',
  stateControlText2: '이는 임의의 필요한 데이터들이 최초 렌더링 이전에 사용가능하게 만들기 위해 어플리케이션을 설정하는데 유용합니다.',
  stateControlText3: '상태 제어, Vuex, view 에 대한 더 자세한 정보는 [공식 문서](https://vuex.vuejs.org/ko/intro.html)를 참고하세요.',
  stateControlText4: 'Vuetify 는 Vuex 와 통합되어 있어서 쉽게 디버깅하고 저장된 속성(propetity)들에 쉽게 액세스할 수 있습니다. 또한  watcher들을 사용해서 저장소 상태에 연결(hook)하고 변화에 반응(react)할 수 있습니다. 더 자세한 정보는 [여기](https://vuejs.org/v2/guide/reactivity.html)를 참고하세요.',
  metaDataHeader: '메타 데이타 (Meta data)',
  metaDataText: '페이지가 크롤링 될때 특정 메타 데이터가 보여질수 있도록 하기 위해서 `router/meta.json`에 어플리케이션의 페이지 관련 정보를 정의합니다. 이로써 모든 경로(route)에대한 페이지 제목, 설명(description), 키워드들을 지정할 수 있습니다. 이는 페이지가 로드되거나 변경될때 자동으로 적용됩니다.',
  redirectsHeader: '리다이렉트 (Redirects)',
  redirectsText: '어플리케이션이 발전함에 따라 라우터들도 변경됩니다. 여러분의 페이지를 인덱스한 봇으로 부터 이미 얻어진(garnered) 권한(autority)을 유지하려면 새로운 위치(location)으로의 301 리다이렉트를 설정하세요. `router/301.json`에서 페이지가 로드될때 자동으로 처리되는 301 리다이렉션들을 정의할 수 있습니다.',
  webAppSupportHeader: '웹앱 지원 (Web App support)',
  webAppSupportText: 'Vuetify SSR 은 스마트폰에서의 네이티브 웹 어플리케이션을 지원합니다. Progressive web app라고 잘 알려져 있듯이, 여러분의 웹사아트들은 디바이스의 홈스크린에 저장될 수 있고, 오프라인에서 사용될 수 있으면, 푸시 알람(notification)을 받을 수 있습니다. 웹앱 명세(Web App Manifest)에 대한 더 자세한 정보를 보려면 [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/Manifest)를 참고하세요. 실제 예제를 보려면 여러분의 모바일 디바이스의 홈스크린에 Vueify 도큐먼트를 추가해보세요.',
  toc: [
    {
      text: '개요',
      href: 'introduction'
    },
    {
      text: '구조',
      href: 'structure'
    },
    {
      text: '어플리케이션',
      href: 'application'
    },
    {
      text: '라우팅',
      href: 'routing'
    },
    {
      text: '상태제어',
      href: 'state-control'
    },
    {
      text: '메타 데이타',
      href: 'meta-data'
    },
    {
      text: '리다이렉트',
      href: 'redirects'
    },
    {
      text: '웹앱 지원',
      href: 'web-app-support'
    }
  ]
}

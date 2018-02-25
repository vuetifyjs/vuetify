export default {
  header: '빠른 시작',
  headerText: 'Vuetify 프로젝트를 바로 시작하려면 _(공식 예제를 바탕으로한)_ Vuetify Vue CLI 패키지를 사용하세요. Vuetify는 **SSR** (서버사이드 렌더링), **SPA** (싱글페이지 어플리케이션), **PWA** (프로그레시브 웹 어플리케이션)와 단독 **HTML** 페이지를 지원합니다.',
  alert1: '당신의 어플리케이션이 제대로 작동하려면, **반드시** 어플리케이션을 `v-app` 컴포넌트로 감싸야합니다. 이 컴포넌트는 동적으로 컨텐츠 영역을 관리하고 여러 컴포넌트들의 마운팅 포인트이기도 합니다.',
  newStoreAlert: '새로운 Vuetify 상점이 지금 **운영중**입니다.!. 이 프로젝트를 지원하면서 동시에 멋진 swag도 받으세요! <a href="https://vuetifyjs.com/store" class="btn btn--white primary--text"><span class="btn__content">지금 확인하세요</span></a>',
  browserHeader: '지원하는 브라우져',
  browserText: 'Vuetify는 웹개발의 다음 단계로 나아가는 것을 추구하는 진보적인 프레임웤입니다. 이 과업을 성취하기 위해, 오래된 버변의 인터넷 익스플로러를 지원하지 않는 다소의 희생이 있어야만 했습니다. 이 리스트는 호환되는 브라우져에 대한 완벽한 리스트는 아니지만 주로 지원하는 브라우져들입니다.',
  cdnHeader: 'CDN을 이용한 설치',
  cdnText: 'Vue CLI 를 이용한 템플릿 설치 없이 Vuetify.js를 테스트해보려면 아래 코드를 복사해서 `index.html` 파일에 붙여넣으세요. 이 코드는 최신 버젼의 Vue와 Vuetify를 받아서 컴포넌트들을 가지고 놀 수 있게 해줍니다. 또한 codepen 사이트의 [Vuetify starter](https://template.vuetifyjs.com)를 이용할 수도 있습니다.',
  newHeader: '새로운 어플리케이션',
  newText: 'Vuetify엔 8개의 미리 만들어진 Vue CLI 템플릿이 준비되어 있습니다. 이 중 3개는 [공식 Vue.js 템플릿](https://github.com/vuejs-templates)을 포크한 후 Vuetify를 더 빠르게 시작할수 있도록 살짝 변경하였습니다. 이 패키지들은 `vue-cli`를 필요로 합니다. vue-cli에 대해 더 알고 싶으시면 공식 [깃헙](https://github.com/vuejs/vue-cli) 저장소를 방문하세요. 이 템플릿들은 다음 프로젝트를 최대한 빨리 시작할 수 있도록 디자인 되었습니다.',
  existingHeader: '기존 어플리케이션',
  existingText1: 'Vuetify를 기존 프로젝트에 적용하려면 Vuetify를 node_modules에 반드시 설치해야 합니다. 이를 위해 `npm` 이나 `yarn`을 사용할 수 있습니다. 이 두 패키지 매니져는 당신의 어플리케이션에 사용되는 리소스를 관리할 수 있도록 해줍니다.',
  existingText2: '`npm` 을 사용하기 위한 더 자세한 설명은 [공식문서](https://docs.npmjs.com/getting-started/what-is-npm)에서 확인할 수 있습니다. `npm` 대신  `yarn` 을 사용하고 싶다면  [여기](https://yarnpkg.com/lang/en/docs/)에 공식문서가 있습니다. npm이나 yarn의 셋업(setup)이 끝나면 Vuetify를 설치하기 위해 다음 두 명령어중에 하나를 명령줄(command prompt)에서 사용할 수 있습니다.',
  existingText3: 'Vuetify 가 설치되었다면, 어플리케이션의 메인 엔트리 포인트로 이동합니다. 대부분의 경우는 `index.js`나 `main.js`일 겁니다. 이 파일에서 Vuetify 를 임포트(import)하고 Vue에게 Vuetify를 사용하도록 지시해야합니다.',
  existingText4: '다음엔 Vuetify css 파일은 인클루드(include) 해야합니다. 간단하게 `index.html` 파일에서 include 하거나 실제 스타일러스(stylus) 파일이나 minified css 파일을 import 합니다.',
  existingText5: '머티리얼 디자인 아이콘들을 include 하는 가장 쉬운 방법은 `index.hteml` 파일에 `link` 태그를 추가하는 것입니다.',
  alert2: '경고: Vuetify 는 css 충돌을 최대한 줄이려고 노력하지만, Vuetify 를 기존의 프로젝트의 추가할때 당신의 커스텀 스타일들과 문제를 만들지 않을 거라고 보장하지는 못합니다.',
  ie11Header: 'IE11 & Safari 9 지원',
  ie11Text: '프로젝트 디렉토리에 `babel-polyfill`을 설치하고 메인 엔트리에서 import 하세요',
  ie11Text2: '인터넷 익스플로러 `<template>` 태그를 제대로 지원하지 못하기 때문에 항상 완전히 컴파일된 DOM 요소들을 브라우져로 보내야 합니다. This can be done by either building your Vue code in advance or by creating helper components to replace the dom elements. For instance, if sent directly to IE, this will fail:',
  browserSupport: {
    supported: '지원됨',
    notSupported: '지원되지 않음',
    polyfill: '폴리필(polyfill)로 지원'
  },
  toc: [
    {
      text: '소개',
      href: 'introduction'
    },
    {
      text: '지원되는 브라우져',
      href: 'supported-browsers'
    },
    {
      text: 'CDN을 이용한 설치',
      href: 'cdn-install'
    },
    {
      text: '새 어플리케이션',
      href: 'new-applications'
    },
    {
      text: '기존 어플리케이션',
      href: 'existing-applications'
    },
    {
      text: 'IE11 지원',
      href: 'ie11-support'
    }
  ]
}

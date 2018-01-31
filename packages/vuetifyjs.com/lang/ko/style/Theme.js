export default {
  header: '테마 (Theme)',
  headerText: '프로그래밍 방식으로 어플리케이션의 색상을 쉽게 변경할 수 있습니다. 기본 스타일 시트를 다시 빌드하고 필요에 따라 프레임웤의 다양한 설정을 커스터마이즈 하세요. **테마 생성기** 를 원하시면 [여기](/theme-generator)를 방문하세요.',
  lightAndDarkHeader: '밝게, 어둡게 (Light and Dark)',
  lightAndDarkText1: 'Vuetify 는 메테리얼 디자인 스팩의 라이트(light) 와 다크(dark) 변화를 모두 지원합니다. 이 설정은 루트(root) 어플리케이션 컴포넌트 `v-app`부터 대부분의 주요 컴포넌트들을 지원합니다. 기본 설정은 **라이트** 테마이며 **dark** 프롭(prop)을 추가해서 바꿀 수 있습니다.',
  lightAndDarkText2: '컴포넌트에 라이트나 다크를 적용할때, 이는 모든 자식 컴포넌트에게 상속되고 다른 설정이 없는한 같은 값이 적용됩니다. CSS의 특성으로 인해, 하위 계층의 자식 컴포넌트에 _테마_ 를 추가로 설정해야 할 수도 있습니다. 이는 **dark** 테마를 사용할 때 가장 많이 발생합니다.',
  customizingHeader: '커스터마이징',
  customizingText1: '기본적으로 표준 테마(standard theme)가 모든 컴포넌트에 적용됩니다.',
  customizingText2: '이는 쉽게 변경될 수 있습니다. 간단히 **theme** 속성(property)으로 `Vue.use` 함수를 사용하세요. 또한 기본 테마의 속성을 상속하면서 동시에 모든 혹은 일부 테마 속성을 골라서 변경할 수 있습니다.',
  customizingText3: '또한 미리 정의된 메테리얼 색상표를 사용할 수 있습니다.',
  customizingText4: '내부적으로, Vuetify는 이 값들을 기반으로 DOM에서 사용될 수 있는 css 클래스들을 생성합니다. 이 클래스들은 예를 들어  `primary` or `secondary--text` 같은 다른 헬퍼 클래스들과 같은 형식으로 쓰입니다.',
  customizingText5: '또한 이 값들은 **$vuetify** 인스턴스의 **theme** 속성아래 오브젝트로 설정할 수 있습니다. 이는 테마를 _동적으로_ 바꾸는 것을 가능하게 합니다. 내부적으로는 Vuetifys는 테마 클래스들을 재생성하고 어플리케이션이 중단 없이 업데이트 되도록 클래스를 업데이트 합니다.',
  stylusHeader: '스타일러스 변수 변경하기',
  stylusText1: 'Vuetify는 **스타일러스 (stylus)** 를 기반으로 만들어졌습니다. **scss** 와 비슷하게, 당신은 변수를 바꾸고 스타일 파일들을 다시 컴파일할 수 있습니다. 가능한 변수 목록은  [여기](https://github.com/vuetifyjs/vuetify/blob/master/src/stylus/settings/_variables.styl)에 있습니다. 스타일러스(stylus) 파일을 빌드하려면, 어플리케이션이 스타일러스를 지원하도록 설정해야 합니다. 이미 [빠른 시작 (Quick Start)](/ko/getting-started/quick-start) 가이드에서 제공하는 Vue-CLI 템플릿을 사용하고 있다면, 이 섹션을 건너뛰어도 좋습니다.',
  stylusHeader2: '웹펙(Webpack)을 위한 stylus-loader 설정',
  stylusText2: '명령줄(command line)에서 다음 내용을 실행하세요',
  stylusText3: '이 명령은 스타일러스 파일들을 임포트(import) 하고 분석(parse) 하기 위해 필요한 의존(dependencies)을 설치합니다. 설치가 끝나면 웹팩(webpack) 설정파일(config)를 열어서 스타일러스를 위한 규칙(rule)들을 추가하세요. **SSR** 기반 어플리케이션의 경우, import가 메인 `client-entry` 안에 있는 것을 확인하세요(ensure that the import is in your main `client-entry`).',
  stylusText4: 'src 디렉토리(혹은 적절한 assets 디렉토리) 안에 `stylus` 폴더를 만들고 `main.styl` 파일을 만드세요. 이 파일은 Vuetify 기본 스타일을 import 하고 리빌드하는 엔트리 포인트의 역할을 합니다. 디렉토리와 파일을 만들고 나면 .styl 파일을 열어서 다음 엔트리를 추가합니다.',
  stylusText5: 'node_modules의 상대적인 위치가 프로젝트에 따라 다를 수 있으니 적절히 설정해야 합니다. 메인 어플리케이션의 `index.js` 이나 `client-entry.js` 에서 import 하는 것을 권장합니다.  **절대로** `main.styl`을 컴포넌트 내에서 import **하지 마세요**. 이는 성능을 떨어뜨리고 **HMR** (hot module reloading)을 많이 느리게 만들 수 있습니다.',
  stylusText6: 'import 위치를 결정했고, 아직 index 파일에 Vuetify 스타일시트가 `<link>` 태그로 남아있다면, 지워버리세요. 이제 빌드 프로세스를 재시작 하고 프로젝트를 다시 열면 모든 스타일이 제대로 작동하고 있는 걸 보실 수 있습니다.',
  stylusHeader3: '값 변경하기 (Changing values)',
  stylusText7: '이제 스타일러스가 설정되었으니 스타일러스의 변수의 기본값을 원하는 대로 바꿀 수 있습니다. 이는 반드시 import _하기 전에_ 선언되어야 하고, 자동으로 Vuetify 의 기본 값들을 대체합니다 (override).',
  toc: [
    {
      text: 'Theme',
      href: 'introduction'
    },
    {
      text: 'Light and Dark',
      href: 'light-and-dark'
    },
    {
      text: 'Customizing',
      href: 'customizing'
    },
    {
      text: 'Modifying Stylus variables',
      href: 'stylus-guide'
    }
  ]
}

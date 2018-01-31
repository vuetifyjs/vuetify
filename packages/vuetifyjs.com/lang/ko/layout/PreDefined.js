export default {
  header: '레이아웃 (Layouts)',
  headerText: `레이아웃 시스템은 모든 어플리케이션의 심장입니다. 아래에 데스크탑 부터 모바일 어플리케이션까지 공식적으로 지원되는 예제들이 있습니다.`,
  markupHeader: '기본 어플리케이션 마크업 (Default application markup)',
  markupText: 'Vuetify를 사용하는 기본 어플리케이션 마크업 예제입니다. *app* 속성을 적용하는 한 당신의 레이아웃 요소들을 어디에든지 둘 수 있습니다. 여기서 가장 핵심적인 컴포넌트는 `v-content`입니다. 이 컴포넌트는 **app** 컴포넌트들의 구조에 따라 동적으로 크기가 정해집니다. 이를 이용해 극단적으로 커스터마이즈된 솔루션을 만들 수 있습니다.',
  appHeader: '_app_ 의 모든 것',
  appText: 'Vuetify에서 `v-app` 컴포넌트와 **app** 는 어플리케이션과 `v-content`가 적잘한 크기를 가질 수 있도록 도와줍니다. 이로써, 레이아웃을 관리하는 고통 없이 정말 유니크한 인터페이스를 만들 수 있습니다. `v-app` 컴포넌트는 모든 어플리케이션에 **반드시 필요합니다**. 이 컴포넌트는 여러 Vuetify 컴포넌트들과 기능(functionality)의 시작점(마운트 포인트)입니다. ',
  alert1: '어플리케이션의 정상적으로 작동하기 위해서, 반드시 어플리케이션을 `v-app` 로 감싸야 합니다.\n이 `v-app` 컴포넌트는 레이아웃의 그리드 브레이크포인트를 결정하기 위해 필요합니다.\n이 컴포넌트는 바디(body)안의 어디에 있어도 되지만 반드시 다른 **모든** Vuetify 컴포넌트들의 부모여야합니다.',
  alert2: '**app** prop을 적용하면 자동으로 position: **fixed** 가 레이아웃 요소에 적용됩니다.\n만약 _absolute_ 요소가 필요하다면, **absolute** prop으로 바꿀 수 있습니다.',
  toc: [
    {
      text: '레이아웃',
      href: 'introduction'
    },
    {
      text: '기본 app 마크업',
      href: 'default-markup'
    },
    {
      text: 'app의 모든 것',
      href: 'all-about-app'
    }
  ]
}

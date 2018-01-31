export default {
  header: '모션 (Motion)',
  headerText: '부드러운 애니메이션은 UI에 대한 느낌을 좋게 만듭니다. Vue의 트랜지션 (transition; 장면전환) 시스템과 재사용가능한 펑셔널(functional) 컴포넌트를 사용하면 쉽게 어플리케이션의 모션을 조절할 수 있습니다.  대부분의 컴포넌트는 <code>transition</code> prop 을 이용하여 트랜지션을 조절할 수 있습니다.',
  components: [
    'v-fade-transition',
    'v-slide-x-transition',
    'v-slide-x-reverse-transition',
    'v-slide-y-transition',
    'v-slide-y-reverse-transition',
    'v-scale-transition'
  ],
  examples: [{
    slideXTransitions: {
      header: '슬라이드 X 트랜지션 (Slide X transitions)',
      desc: '슬라이드 x 트랜지션은 가로축 방향으로 움직입니다.'
    },
    slideYTransitions: {
      header: '슬라이드 Y 트랜지션 (Slide Y transitions)',
      desc: 'Animations use the applications <code>$primary-transition</code>.'
    },
    scaleTransition: {
      header: '스케일 트랜지션 (Scale transition)',
      desc: '많ㅇ느 Vuetify 컴포넌트들은 사용자가 설정할 수 있는 <code>transition</code> prop 을 가지고 있습니다.'
    },
    fadeTransition: {
      header: '페이드 트랜지션 (Fade transition)',
      desc: '페이드 트랜지션의 다른 예는 캐라솔 (Carousel) 컴포넌트에서 찾을 수 있습니다.'
    },
    customOrigin: {
      header: '커스텀 오리진 (Custom Origin)',
      desc: '간단한 prop을 사용해서 트랜지션의 원점(origin)을 프로그래매틱하게 조절할 수 있습니다.'
    }
  }],
  createYourOwnHeader: '사용자 트랜지션 만들기',
  createYourOwnText1: 'You can use Vuetify\'s transition helper function to easily create your own custom transitions. This function will return an object that you can import into Vue. Using Vue\'s <a href="https://vuejs.org/v2/guide/render-function.html#Functional-Components" target="_blank" rel="noopener">functional component</a> option will make sure your transition is as efficient as possible. Simply import the function:',
  createYourOwnText2: 'The <code>createSimpleTransition</code> function accepts 1 argument, name. This will be the name that you can hook into with your style. This is an example of what <code>v-fade-transition</code> looks like:',
  toc: [
    {
      text: 'Motion',
      href: 'introduction'
    },
    {
      text: 'Examples',
      href: 'examples'
    },
    {
      text: 'Create your own',
      href: 'create-your-own'
    }
  ]
}

export default {
  header: 'Motion',
  headerText: 'Smooth animations help make a UI feel great. Using Vue\'s transition system and re-usable functional components, you can easily control the motion of your application. Most components can have their transition altered through the <code>transition</code> prop.',
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
      header: 'Slide X transitions',
      desc: 'Slide x transitions move along the horizontal axis.'
    },
    slideYTransitions: {
      header: 'Slide Y transitions',
      desc: 'Animations use the applications <code>$primary-transition</code>.',
    },
    scaleTransition: {
      header: 'Scale transition',
      desc: 'Many of Vuetify\'s components contain a <code>transition</code> prop which allows you to specify your own.'
    },
    fadeTransition: {
      header: 'Fade transition',
      desc: 'Another example of the fade transition can be found on the Carousel component.'
    },
    customOrigin: {
      header: 'Custom Origin',
      desc: 'Programmatically control the transition origin with a simple prop.'
    }
  }],
  createYourOwnHeader: 'Create your own',
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

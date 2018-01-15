export default {
  header: 'Движение',
  headerText:
    'Плавная анимация помогает сделать интерфейс приятным. Используя систему перехода Vue и повторно используемые функциональные компоненты, вы можете легко контролировать движение своего приложения. Большинство компонентов могут изменять свой переход с помощью <code> transition </code> prop.',
  components: [
    'v-fade-transition',
    'v-slide-x-transition',
    'v-slide-x-reverse-transition',
    'v-slide-y-transition',
    'v-slide-y-reverse-transition',
    'v-scale-transition'
  ],
  examples: [
    {
      slideXTransitions: {
        header: 'Переходы слайдов X',
        desc: 'Переходы слайдов x движутся вдоль горизонтальной оси.'
      },
      slideYTransitions: {
        header: 'Переходы по слайду Y',
        desc: 'Анимация использует приложения <code> $primary-transition </code>.'
      },
      scaleTransition: {
        header: 'Переход по шкале',
        desc:
          'Многие компоненты Vuetify содержат ссылку <code> transition </code>, которая позволяет вам указать свой собственный.'
      },
      fadeTransition: {
        header: 'Переход с постепенным переходом',
        desc: 'Другой пример перехода затухания можно найти на компоненте карусели.'
      },
      customOrigin: {
        header: 'Пользовательское начало',
        desc: 'Программно управляйте происхождением перехода с помощью простых свойств.'
      }
    }
  ],
  createYourOwnHeader: 'Создайте свой собственный',
  createYourOwnText1:
    'Вы можете использовать вспомогательную функцию перехода Vuetify для простого создания собственных пользовательских переходов. Эта функция вернет объект, который вы можете импортировать в Vue. Использование Vue <a href="https://vuejs.org/v2/guide/render-function.html#Functional-Components" target="_blank" rel="noopener"> функционального компонента </a> убедитесь, что ваш переход настолько эффективен, насколько это возможно. Просто импортируйте функцию:',
  createYourOwnText2:
    'Функция <code> createSimpleTransition </code> принимает 1 аргумент, имя. Это будет имя, с которым вы можете вписаться в свой стиль. Это пример того, как выглядит <code> v-fade-transition </code>:',
  toc: [
    {
      text: 'Движение',
      href: 'introduction'
    },
    {
      text: 'Примеры',
      href: 'examples'
    },
    {
      text: 'Создайте свой собственный',
      href: 'create-your-own'
    }
  ]
}

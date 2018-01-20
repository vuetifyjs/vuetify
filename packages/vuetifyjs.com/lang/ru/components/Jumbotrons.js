export default {
  header: 'Jumbotron',
  headerText: 'Скоро...',
  components: [
    'v-jumbotron'
  ],
  examples: [{
    usage: {
      header: 'Применение',
      desc: 'Скоро..'
    },
    color: {
      header: 'Пользовательские цвета',
      desc: 'Скоро...'
    },
    gradient: {
      header: 'Градиент',
      desc: 'Более подробную информацию о градиентах можно найти [здесь](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient)'
    },
    gradientWithImage: {
      header: 'Градиент с изображением',
      desc: 'Более подробную информацию о градиентах можно найти [здесь](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient)'
    }
  }],
  props: {
    gradient: 'Примените градиент как фон. Если используется с **src** , наложите его',
    src: 'img src'
  }
}

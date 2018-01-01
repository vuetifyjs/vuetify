export default {
  header: 'Карусель',
  headerText: 'Компонент `v-carousel` используется для отображения большого количества визуального контента на вращающемся таймере.',
  components: ['v-carousel', 'v-carousel-item'],
  examples: [{
    default: {
      header: 'По умолчанию',
      desc: 'Карусель по умолчанию имеет переход слайдов.',
      uninverted: true
    },
    customTransition: {
      header: 'Пользовательский переход',
      desc: 'Вы также можете применить свой собственный переход.',
      uninverted: true
    },
    customDelimiter: {
      header: 'Пользовательский разделитель',
      desc: 'Вы также можете изменить значок карусельного разделителя.',
      uninverted: true
    },
    hideControls: {
      header: 'Скрыть элементы управления',
      desc: 'Вы можете скрыть нижние элементы управления с помощью `hide-controls`.',
      uninverted: true
    }
  }]
}

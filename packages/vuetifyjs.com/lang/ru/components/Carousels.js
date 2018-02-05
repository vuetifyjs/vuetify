export default {
  header: 'Карусель',
  headerText: 'Компонент `v-carousel` используется для перебора элементов—изображений или слайдов текста.',
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
    customIcons: {
      header: 'Пользовательский разделитель',
      desc: 'Вы также можете изменить значок карусельного разделителя.',
      uninverted: true
    },
    hideControls: {
      header: 'Скрыть элементы управления',
      desc: 'Вы можете скрыть нижние элементы управления с помощью `hide-controls`.',
      uninverted: true
    }
  }],
  props: {
    nextIcon: 'Mixins.Input.props.appendIcon',
    prevIcon: 'Mixins.Input.props.prependIcon',
    cycle: 'Определяет, должна ли карусель перемещаться по изображениям',
    delimiterIcon: 'Устанавливает значок для карусельного разделителя',
    hideControls: 'Скрывает элементы управления навигацией',
    hideDelimiters: 'Скрывает панель с разделителями карусели',
    interval: 'Продолжительность между циклами изображения',
    reverseTransition: 'Устанавливает обратный переход',
    src: 'Изображение src',
    transition: 'Mixins.Transitionable.props.transition'
  }
}

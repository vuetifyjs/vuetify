export default {
  header: 'Badge',
  headerText: 'Компонент `v-badge` может обернуть любой тип контента, чтобы выделить информацию пользователю или просто привлечь внимание к определенному элементу.',
  components: ['v-badge'],
  examples: [{
    character: {
      header: 'Xарактеристика',
      desc: 'Любой символ может быть помещен с иконкой.'
    },
    overlap: {
      header: 'Перекрытие',
      desc: 'Badge будет перекрывать его содержимое при использовании свойства `overlap`'
    },
    inline: {
      header: 'В одну линию',
      desc: 'Badge также могут быть помещены в линию с текстом.'
    },
    icon: {
      header: 'Иконка',
      desc: 'Иконки поддерживаюстя только Material Design.'
    },
    visibility: {
      header: 'Видимость',
      desc: 'Видимость значков можно контролировать с помощью `v-model`.'
    }
  }],
  props: {
    bottom: 'Mixins.Positionable.props.bottom',
    left: 'Mixins.Positionable.props.left',
    transition: 'Mixins.Transitionable.props.transition'
  }
}

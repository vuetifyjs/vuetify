export default {
  header: 'Breadcrumbs',
  headerText: 'Компонент `v-breadcrumbs` является навигационным помощником для страниц. Он может принимать значок **Material Icons** или символы в качестве разделителя. Массив объектов, содержащих поля _href_, _text_ и необязательный _disabled_, можно передать в свойство **items** компонента. Кроме того, существует регулярный слот для большего контроля над breadcrumbs, либо с использованием `v-breadcrumbs-item`, либо другой специальной разметки.',
  components: ['v-breadcrumbs', 'v-breadcrumbs-items'],
  examples: [{
    textDividers: {
      header: 'Текстовые разделители',
      desc: 'По умолчанию breadcrumbs используют разделитель текста. Это может быть любая строка.'
    },
    iconDividers: {
      header: 'Разделители иконок',
      desc: 'Для варианта иконок breadcrumbs могут использовать любую икону из иконок Material Design.'
    }
  }],
  props: {
    divider: 'Определяет разделительный символ',
    icons: 'Указывает, что разделители являются иконками',
    justifyCenter: 'Выровнять центр breadcrumbs',
    justifyEnd: 'Выравнять breadcrumbs в конце',
    large: 'Увеличить размер шрифта текста элемента палитры'
  }
}

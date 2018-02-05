export default {
  header: 'Панель расширения',
  headerText: 'Компонент `v-expand-panel` полезен для уменьшения вертикального пространства с большими объемами информации. Функциональность компонента по умолчанию состоит только в том, чтобы отображать только одно тело панели расширения, однако с помощью свойства `expandable` панель расширения может оставаться открытой до явного закрытия.',
  components: ['v-expansion-panel', 'v-expansion-panel-content'],
  examples: [{
    accordion: {
      header: 'Аккордеон',
      desc: 'У панелей расширения аккордеона может быть только одна панель открытой одновременно.'
    },
    expand: {
      header: 'Расширять',
      desc: 'Развертывание панелей расширения будет оставаться открытым до закрытия.',
      uninverted: true
    },
    popout: {
      header: 'Всплывающее Окно & Вставка',
      desc: 'Панель расширения также имеет два альтернативных варианта, которые вы можете активировать с помощью `popout` и `inset`.',
      inverted: true
    },
    customIcons: {
      header: 'Custom icon',
      desc: 'Expand action icon can be customized with `expand-icon` prop.'
    },
    focusable: {
      header: 'Фокусируемый',
      desc: 'На заголовок панели можно сделать фокус с помощью свойства `focusable`.',
      uninverted: true
    }
  }],
  props: {
    'v-expansion-panel': {
      expand: 'Панель раскрытия листов открывается при выборе другого',
      focusable: 'Делает заголовки панели расширения сфокусированными',
      inset: 'Делает панель расширения открытой с вставным стилем',
      popout: 'Открывает панель расширения с помощью всплывающего стиля'
    },
    'v-expansion-panel-content': {
      hideActions: 'Скрыть иконку разворота в заголовке содержимого',
      expandIcon: 'Set the expand action icon'
    }
  }
}

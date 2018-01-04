export default {
  header: 'Footer',
  headerText: 'Компонент `v-footer` используется для отображения общей информации, которую пользователь может получить с любой страницы вашего сайта.',
  components: ['v-footer'],
  examples: [{
    default: {
      header: 'По умолчанию',
      desc: 'Компонент footer - это просто базовый контейнер.'
    }
  }],
  props: {
    absolute: 'Mixins.Positionable.props.absolute',
    fixed: 'Mixins.Positionable.props.fixed',
    inset: 'Позиционирует смещение панели инструментов от приложения `v-navigation-drawer`'
  }
}

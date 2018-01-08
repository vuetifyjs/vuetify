export default {
  header: 'Директива Ripple',
  headerText: 'Директива `v-ripple` используется для отображения действий от пользователя. Он может применяться к любому элементу уровня блока. Многочисленные компоненты имеют встроенную директиву ряби, такую как `v-btn`, `v-tabs-item` и многие другие.',
  components: ['v-ripple'],
  examples: [{
    buttons: {
      header: 'По умолчанию',
      desc: 'Кнопки по умолчанию имеют рябь. Это можно удалить с помощью prop `:ripple ="false`.',
      uninverted: true
    },
    customColor: {
      header: 'Пользовательский цвет',
      desc: 'Используя класс-помощник, вы можете изменить цвет пульсации.',
      uninverted: true
    },
    tabs: {
      header: 'Вкладки',
      desc: 'По умолчанию вкладки отключены. Это можно включить с помощью **ripple** prop.',
      uninverted: true
    },
    navigationDrawers: {
      header: 'Навигационные ящики',
      desc: 'Список элементов по умолчанию имеет пульсацию отключен. Это можно активировать с помощью **ripple** prop',
      uninverted: true
    },
    toolbars: {
      header: 'Панели инструментов',
      desc: 'По умолчанию элементы панели инструментов отключены. Это можно включить с помощью **ripple** prop.',
      uninverted: true
    },
    expansionPanels: {
      header: 'Расширительные панели',
      desc: 'По умолчанию панели расширения отключены. Это можно включить с помощью **ripple** prop. ',
      uninverted: true
    },
    customRipple: {
      header: 'Пользовательский элемент',
      desc: 'Добавьте эффект пульсации в любой пользовательский элемент. Это можно сделать с помощью HTML-атрибута `v-ripple`.',
      uninverted: true
    },
    htmlElement: {
      header: 'Стандартный HTML-элемент',
      desc: 'Добавьте эффект ряби в стандартный элемент HTML. Это можно активировать с помощью HTML-атрибута `v-ripple`.',
      uninverted: true
    }
  }],
  props: [{
    'v-ripple': [
      {
        name: 'class',
        type: 'String',
        default: 'undefined',
        desc: 'Применяет пользовательский класс к пульсации, используемый для изменения цвета'
      },
      {
        name: 'center',
        type: 'Boolean',
        default: 'False',
        desc: 'Сила пульсации, исходящая от центра цели'
      }
    ]
  }]
}

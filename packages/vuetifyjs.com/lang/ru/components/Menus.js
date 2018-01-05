export default {
  header: 'Меню',
  headerText: 'Компонент `v-menu` показывает меню в позиции элемента, который его активирует.',
  components: ['v-menu'],
  examples: [{
    activator: {
      header: 'Активатор',
      desc: 'Не забудьте включить элемент, который активирует меню в слоте `activator`.',
      uninverted: true
    },
    absolute: {
      header: 'Absolute position',
      desc: 'Меню также могут быть помещены абсолютно поверх элемента активатора с помощью свойства `absolute`. Попробуйте кликнуть в любом месте изображения.',
      uninverted: true
    },
    absoluteWithoutActivator: {
      header: 'Абсолютное положение без активатора',
      desc: 'Меню также можно использовать без активатора, используя `absolute` вместе со свойствами `position-x` и `position-y`. Попробуйте кликнуть правой кнопкой мыши в любом месте изображения.',
      uninverted: true
    },
    hover: {
      header: 'Hover',
      desc: 'Доступ к меню можно получить с помощью наведения, вместо нажатия кнопки. Используйте свойство`open-on-hover`.',
      uninverted: true
    },
    menus: {
      header: 'Меню',
      desc: 'Меню можно размещать практически в любом компоненте.',
      uninverted: true
    },
    customTransition: {
      header: 'Пользовательские переходы',
      desc: 'Vuetify поставляется с 3 стандартными переходами, **scale**, **slide-x** и **lide-y**. Вы также можете создать свой собственный и передать его в качестве аргумента перехода. В качестве примера того, как создаются переходы, [посетите](https://github.com/vuetifyjs/vuetify/blob/master/src/util/helpers.js#L13)',
      uninverted: true
    },
    popover: {
      header: 'Меню Popover',
      desc: 'Меню можно настроить как статическое при открытии, что позволяет ему функционировать как popover. Это может быть полезно, когда в содержимом меню есть несколько интерактивных элементов.',
      uninverted: true
    }
  }]
}

export default {
  header: 'Menu',
  headerText: 'Компонент `v-menu` показывает меню в позиции элемента, используемого для его активации.',
  components: ['v-menu'],
  examples: [{
    activator: {
      header: 'Activator',
      desc: 'Не забудьте поставить элемент, который активирует меню в `activator` slot.',
      uninverted: true
    },
    absolute: {
      header: 'Абсолютное положение',
      desc: 'Меню также могут быть помещены абсолютно поверх элемента активатора с помощью `absolute` prop. Попробуйте щелкнуть в любом месте изображения.',
      uninverted: true
    },
    absoluteWithoutActivator: {
      header: 'Абсолютное положение без активатора',
      desc: 'Меню также можно использовать без активатора, используя `absolute` вместе с реквизитами `position-x` и `position-y`. Попробуйте щелкнуть правой кнопкой мыши в любом месте изображения.',
      uninverted: true
    },
    hover: {
      header: 'Hover',
      desc: 'Доступ к меню возможен с помощью наведения, а не щелчка `open-on-hover` prop.',
      uninverted: true
    },
    menus: {
      header: 'Меню',
      desc: 'Меню можно размещать практически в любом компоненте.',
      uninverted: true
    },
    customTransition: {
      header: 'Пользовательские переходы',
      desc: 'Vuetify поставляется с 3 стандартными переходами, **scale**, **slide-x** и **slide-y**. Вы также можете создать свой собственный и передать его в качестве аргумента перехода. Для примера того, как построены стоковые переходы,<a href="https://github.com/vuetifyjs/vuetify/blob/master/src/util/helpers.js#L13" target="_blank" rel="noopener"> посетите это</a>.',
      uninverted: true
    },
    popover: {
      header: 'Popover menu',
      desc: 'Меню можно настроить как статическое при открытии, что позволяет ему функционировать как popover. Это может быть полезно, когда в содержимом меню есть несколько интерактивных элементов.',
      uninverted: true
    }
  }],
  props: {
    closeOnClick: 'Указывает, должен ли меню закрываться на внешнем активаторе.',
    closeOnContentClick: 'Указывает, должен ли меню закрываться при нажатии на его содержимое',
    disabled: 'Отключает меню',
    offsetX: 'Сдвиньте меню по оси x. Работает вместе с направлением влево / вправо',
    offsetY: 'Смещение меню по оси y. Работает вместе с направлением сверху / снизу',
    openOnClick: 'Указывает, следует ли открывать меню при нажатии активатора',
    openOnHover: 'Указывает, следует ли открывать меню при наведении активатора',
    origin: 'Mixins.Transitionable.props.origin',
    transition: 'Mixins.Transitionable.props.transition'
  }
}

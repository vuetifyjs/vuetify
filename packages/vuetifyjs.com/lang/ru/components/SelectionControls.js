export default {
  header: 'Элементы управления выбора',
  headerText: 'Элементы управления выбора, позволяют пользователю выбирать параметры. Эти компоненты **должны** использоваться с помощью `v-model`, поскольку они не поддерживают свое собственное состояние.',
  components: ['v-radio-group', 'v-radio', 'v-checkbox', 'v-switch'],
  examples: [{
    example: {
      header: 'Примеры по умолчанию',
      desc: ''
    },
    checkboxesBoolean: {
      header: 'Checkboxes - Boolean',
      desc: ''
    },
    checkboxesArray: {
      header: 'Checkboxes - Массив',
      desc: ''
    },
    checkboxesStates: {
      header: 'Checkboxes - Состояние',
      desc: ''
    },
    checkboxesColors: {
      header: 'Checkboxes - Цвета',
      desc: 'Checkboxes могут быть окрашены с использованием любого из встроенных цветов и контекстных имен с помощью свойства `color`.'
    },
    checkboxesInlineTexfield: {
      header: 'Checkboxes - в одну линию с текстовым полем',
      desc: ''
    },
    radiosDefault: {
      header: 'Radio - по умолчанию',
      desc: 'Radio-группы по умолчанию обязательны. Это можно изменить с помощью свойства `mandatory`.'
    },
    radiosDirection: {
      header: 'Radios - управление',
      desc: 'Radio-группы могут быть представлены либо в виде строки, либо в столбце, используя их соответствующие свойства. По умолчанию используется столбец.'
    },
    radiosColors: {
      header: 'Radios - цвета',
      desc: 'Radio могут быть окрашены с использованием любого из встроенных цветов и контекстных имен, с помощью свойства `color`'
    },
    switchesBoolean: {
      header: 'Switches - Boolean',
      desc: ''
    },
    switchesArray: {
      header: 'Switches - Массив',
      desc: ''
    },
    switchesStates: {
      header: 'Switches - Состояние',
      desc: ''
    },
    switchesColors: {
      header: 'Switches - Цвета',
      desc: 'Switches можно покрасить, используя любой из встроенных цветов и контекстных имен, используя свойство `color`.'
    }
  }],
  props: {
    column: 'Показ radio кнопки в столбце',
    disabled: 'Mixins.Input.props.disabled',
    label: 'Mixins.Input.props.label',
    mandatory: 'Принудительный выбор для дочернего элемента `v-radio`',
    name: 'Устанавливает атрибут имени компонента',
    row: 'Показ radio кнопки в ряд',
    indeterminate: 'Устанавливает неопределенное состояние для checkbox',
    inputValue: 'связанное значение **v-model**',
    value: 'Устанавливает значение компонента управления выбора'
  },
  events: {
    blur: 'Mixins.Input.events.blur',
    change: 'Mixins.Input.events.change',
    'update:error': 'Mixins.Input.events.update:error'
  }
}

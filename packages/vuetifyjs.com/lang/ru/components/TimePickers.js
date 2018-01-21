export default {
  header: 'Time picker',
  headerText: '`v-date-picker` и` v-time-picker` являются автономными компонентами, которые могут использоваться во многих существующих компонентах Vuetify. Они предлагают пользователю визуальное представление для выбора даты и времени.',
  components: ['v-time-picker'],
  examples: [{
    timeLight: {
      header: 'Выбор времени',
      desc: 'У Выбора времени по умолчанию включена светлая тема.'
    },
    timeColorable: {
      header: 'Выбор времени - Цвета',
      desc: 'Цветовая схема Выбора времени может быть установлена с помощью `color` и `header-color`. Если `header-color` не указан, заголовок будет использовать значение `color`'
    },
    timeDialogAndMenu: {
      header: 'Выбор времени - В диалоговом окне и меню',
      desc: 'Благодаря гибкости Picker вы действительно можете собрать на любой случай, именно так, как вы этого хотите.'
    },
    time24hFormat: {
      header: 'Выбор времени - 24-часовой формат',
      desc: 'Выбор времени можно переключить на 24-часовой формат.'
    },
    timeAllowedTimes: {
      header: 'Выбор времени - Доступное для выбора время',
      desc: 'Вы можете указать доступное для выбора время, используя массивы, объекты и функции.'
    },
    timeWidth: {
      header: 'Time pickers - Setting picker width',
      desc: 'You can specify allowed the picker\'s width or make it full width.'
    }
  }],
  props: {
    'v-time-picker': {
      format: 'Доступны следующие опции: `am/pm` и` 24ч`',
      allowedHours: 'Ограничивает, часы которые могут быть выбраны',
      allowedMinutes: 'Ограничивает, какие минуты можно выбрать',
      scrollable: 'Allows changing hour/minute with mouse scroll',
      min: 'Minimum allowed time',
      max: 'Maximum allowed time'
    }
  }
}

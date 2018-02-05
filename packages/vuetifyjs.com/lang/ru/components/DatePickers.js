export default {
  header: 'Date/month picker',
  headerText: '`v-date-picker` и` v-time-picker` являются автономными компонентами, которые могут использоваться во многих существующих компонентах Vuetify. Они предлагают пользователю визуальное представление для выбора даты и времени.',
  components: ['v-date-picker'],
  examples: [{
    dateLight: {
      header: 'Выбор даты',
      desc: 'Ориентация Выбора даты присутствует в двух вариантах: портретная **(по умолчанию)** и альбомная. By default they are emitting `input` event when the day (for date picker) or month (for month picker), but with **reactive** prop they can update the model even after clicking year/month.'
    },
    dateColorable: {
      header: 'Выбор даты - Цвета',
      desc: 'Цвета Выбора даты можно установить с помощью `color` и `header-color`. Если `header-color` не указан, заголовок будет использовать значение `color`.'
    },
    dateDialogAndMenu: {
      header: 'Выбор даты - В диалоговом окне и меню',
      desc: 'При интеграции, в поле `v-text-field` рекомендуется использовать **readonly**. Это предотвратит запуск мобильных клавиатур. Чтобы сохранить вертикальное пространство, вы также можете скрыть заголовок Выбора даты. \n\n Выбор даты предоставляет доступный слот, который позволяет вам подключаться к функциям сохранения и отмены. Это позволит сохранить старое значение, которое может быть заменено, если пользователь отменит свой выбор.'
    },
    dateAllowedDates: {
      header: 'Выбор даты - Доступные даты',
      desc: 'Вы можете указать даты, которые будут доступны пользователю, с использованием массивов, объектов и функций.'
    },
    dateWidth: {
      header: 'Date pickers - Setting picker width',
      desc: 'You can specify allowed the picker\'s width or make it full width.'
    },
    dateBirthday: {
      header: 'Date pickers - birthday picker',
      desc: 'Starting with year picker by default, resticting dates range and closing the picker menu after selecting the day make the perfect birthday picker.'
    },
    datePickerDate: {
      header: 'Date pickers - react to disaplyed month/year change',
      desc: 'You can watch the `pickerDate` which is the displayed month/year (depending on the picker type and active view) to perform some action when it changes.'
    },
    dateInternationalization: {
      header: 'Выбор даты - интернационализация',
      desc: 'Выбор даты поддерживает интернационализацию через объект JavaScript Date. Укажите тег языка BCP 47, используя `locale`, а затем установите первый день недели с помощью свойства `first-day-of-week`.'
    },
    dateIcons: {
      header: 'Выбор даты - Иконки',
      desc: 'Вы можете переопределить иконки, которые используются по умолчанию, используемые в Выборе даты'
    },
    monthLight: {
      header: 'Выбор месяца',
      desc: 'Ориентация Выбора месяца присутствует в двух вариантах: портретная **(по умолчанию)** и альбомная.'
    },
    monthColorable: {
      header: 'Выбор месяца - цвета',
      desc: 'Цветовую тему Выбора месяца можно установить с помощью `color` и` header-color`. Если `header-color` не указан, заголовок будет использовать значение `color`.'
    },
    monthDialogAndMenu: {
      header: 'Выбор месяца - В диалоговом окне и меню',
      desc: 'При интеграции, в `v-text-field` рекомендуется использовать **readonly** prop. Это предотвратит запуск мобильных клавиатур. Чтобы сохранить вертикальное пространство, вы также можете скрыть заголовок Выбора месяца. \n\n Выбор месяца предоставляет доступный слот, который позволяет вам подключаться к функциям сохранения и отмены. Это позволит помнить старое значение, которое может быть заменено, если пользователь отменит свой выбор.'
    },
    monthAllowedMonths: {
      header: 'Выбор месяца - Доступные для выбора месяцы',
      desc: 'Вы можете указать доступные для выбора месяцы, используя массивы, объекты и функции.'
    },
    monthWidth: {
      header: 'Month pickers - Setting picker width',
      desc: 'You can specify allowed the picker\'s width or make it full width.'
    },
    monthInternationalization: {
      header: 'Выбор месяца - интернационализация',
      desc: 'Выбор месяца поддерживает интернационализацию через объект JavaScript Date. Укажите тег языка BCP 47, используя `locale`, а затем установите первый день недели с помощью свойства `first-day-of-week`.'
    },
    monthIcons: {
      header: 'Выбор месяца - Иконки',
      desc: 'Вы можете переопределить иконки по умолчанию, используемые в Выборе месяца'
    }
  }],
  props: {
    'v-date-picker': {
      type: 'Определяет тип - `date` для выбора даты,` month` для выбора месяца',
      monthFormat: 'Функция форматирования, используемая для отображения месяцев в таблице месяцев. Вызывается с датой(строка ISO 8601) и locale(строка).',
      allowedDates: 'Ограничивает, какие даты могут быть выбраны',
      eventColor: 'Sets the color for event dot. It can be string (all events will have the same color) or `object` where attribute is the event date and value is the color for specified date or `function` taking date as a parameter and returning color for that date',
      events: 'Marks the date as an event (only for date picker)',
      locale: 'Устанавливает языковой стандарт. Принимает строку с тегом языка BCP 47.',
      firstDayOfWeek: 'Устанавливает первый день недели, начиная с 0 для воскресенья.',
      titleDateFormat: 'Позволяет настроить формат строки даты, который отображается в заголовке выбора даты. Вызывается с датой(строка ISO 8601) и locale(строка).',
      headerDateFormat: 'Позволяет настроить формат строки месяца, который отображается в заголовке календаря. Вызывается с датой (строка ISO 8601) и locale (строка).',
      yearFormat: 'Позволяет настроить формат строки года, отображаемой в заголовке календаря. Вызывается с датой (строка ISO 8601) и locale(строка).',
      dayFormat: 'Позволяет настроить формат дневной строки, отображаемой в таблице даты. Вызывается с датой (строка ISO 8601) и locale(строка).',
      yearIcon: 'Создает Иконку рядом с годом',
      min: 'Minimum allowed date/month',
      max: 'Maximum allowed date/month',
      pickerDate: 'Displayed year/month',
      nextIcon: 'Устанавливает иконку для кнопки следующего месяца/года',
      prevIcon: 'Устанавливает иконку для кнопки предыдущий месяц/год',
      readonly: 'Makes the picker readonly (doesnt\'t allow to select new date or navigate through months/years)',
      scrollable: 'Allows changing displayed month with mouse scroll',
      showCurrent: 'Toggles visibility of the current date/month outline or shows the provided date/month as a current'
    }
  }
}

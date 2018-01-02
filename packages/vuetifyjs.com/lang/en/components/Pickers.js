export default {
  header: 'Picker',
  headerText: 'The `v-date-picker` and `v-time-picker` are stand-alone components that can be utilized in many existing Vuetify components. They offer the user a visual representation for selecting date and time.',
  components: ['v-date-picker', 'v-time-picker'],
  examples: [{
    dateLight: {
      header: 'Date pickers',
      desc: 'Date pickers come in two orientation variations, portrait **(default)** and landscape.'
    },
    dateColorable: {
      header: 'Date pickers - Colors',
      desc: 'Date picker colors can be set using the `color` and `header-color` props. If `header-color` prop is not provided header will use the `color` prop value.'
    },
    dateDialogAndMenu: {
      header: 'Date pickers - In dialog and menu',
      desc: 'When integrating a picker into a `v-text-field`, it is recommended to use the **readonly** prop. This will prevent mobile keyboards from triggering. To save vertical space, you can also hide the picker title.  \n\n  Pickers expose a scoped slot that allow you to hook into save and cancel functionality. This will maintain an old value which can be replaced if the user cancels.'
    },
    dateAllowedDates: {
      header: 'Date pickers - Allowed dates',
      desc: 'You can specify allowed dates using arrays, objects, and functions.'
    },
    dateInternationalization: {
      header: 'Date pickers - Internationalization',
      desc: 'The date picker supports internationalization through the JavaScript Date object. Specify a BCP 47 language tag using the `locale` prop, and then set the first day of the week with the `first-day-of-week` prop.'
    },
    dateIcons: {
      header: 'Date pickers - icons',
      desc: 'You can override the default icons used in the picker.'
    },
    monthLight: {
      header: 'Month pickers',
      desc: 'Month pickers come in two orientation variations, portrait **(default)** and landscape.'
    },
    monthColorable: {
      header: 'Month pickers - Colors',
      desc: 'Month picker colors can be set using the `color` and `header-color` props. If `header-color` prop is not provided header will use the `color` prop value.'
    },
    monthDialogAndMenu: {
      header: 'Month pickers - In dialog and menu',
      desc: 'When integrating a picker into a `v-text-field`, it is recommended to use the **readonly** prop. This will prevent mobile keyboards from triggering. To save vertical space, you can also hide the picker title. \n\n Pickers expose a scoped slot that allow you to hook into save and cancel functionality. This will maintain an old value which can be replaced if the user cancels.'
    },
    monthAllowedMonths: {
      header: 'Month pickers - Allowed months',
      desc: 'You can specify allowed months using arrays, objects, and functions.'
    },
    monthInternationalization: {
      header: 'Month pickers - Internationalization',
      desc: 'The month picker supports internationalization through the JavaScript Date object. Specify a BCP 47 language tag using the `locale` prop, and then set the first day of the week with the `first-day-of-week` prop.'
    },
    monthIcons: {
      header: 'Month pickers - icons',
      desc: 'You can override the default icons used in the picker.'
    },
    timeLight: {
      header: 'Time pickers',
      desc: 'Time pickers have the light theme enabled by default.'
    },
    timeColorable: {
      header: 'Time pickers - Colors',
      desc: 'Time picker colors can be set using the `color` and `header-color` props. If `header-color` prop is not provided  header will use the `color` prop value.'
    },
    timeDialogAndMenu: {
      header: 'Time pickers - In dialog and menu',
      desc: 'Due to the flexibility of pickers, you can really dial in the experience exactly how you want it.'
    },
    time24hFormat: {
      header: 'Time pickers - 24h format',
      desc: 'A time picker can be switched to 24hr format.'
    },
    timeAllowedTimes: {
      header: 'Time pickers - Allowed times',
      desc: 'You can specify allowed times using arrays, objects, and functions.'
    }
  }],
  props: {
    'v-date-picker': {
      'type': 'Determines the type of the picker - `date` for date picker, `month` for month picker',
      'monthFormat': 'Formatting function used for displaying months in the months table. Called with date (ISO 8601 string) and locale (string) arguments.',
      'allowedDates': 'Restricts which dates can be selected',
      'locale': 'Sets the locale. Accepts a string with a BCP 47 language tag.',
      'firstDayOfWeek': 'Sets the first day of the week, starting with 0 for Sunday.',
      'titleDateFormat': 'Allows you to customize the format of the date string that appears in the title of the date picker. Called with date (ISO 8601 string) and locale (string) arguments.',
      'headerDateFormat': 'Allows you to customize the format of the month string that appears in the header of the calendar. Called with date (ISO 8601 string) and locale (string) arguments.',
      'yearFormat': 'Allows you to customize the format of the year string that appears in the header of the calendar. Called with date (ISO 8601 string) and locale (string) arguments.',
      'dayFormat': 'Allows you to customize the format of the day string that appears in the date table. Called with date (ISO 8601 string) and locale (string) arguments.',
      'yearIcon': 'Generates an icon next to the year',
      'appendIcon': 'Sets the icon for next month/year button',
      'prependIcon': 'Sets the icon for previous month/year button'
    },
    'v-time-picker': {
      'format': 'Available options are `ampm` and `24hr`',
      'allowedHours': 'Restricts which hours can be selected',
      'allowedMinutes': 'Restricts which minutes can be selected'
    }
  }
}

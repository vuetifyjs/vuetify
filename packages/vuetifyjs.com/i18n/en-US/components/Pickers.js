export default {
  header: 'Picker',
  headerText: 'The <code>v-date-picker</code> and <code>v-time-picker</code> are stand-alone components that can be utilized in many existing Vuetify components. They offer the user a visual representation for selecting date and time.',
  components: ['v-date-picker', 'v-time-picker'],
  examples: [{
    dateLight: {
      header: "Date pickers",
      desc: 'Date pickers come in two orientation variations, portrait **(default)** and landscape.'
    },
    dateColorable: {
      header: "Date pickers - Colors",
      desc: 'Date picker colors can be set using the <code>color</code> and <code>header-color</code> props. If <code>header-color</code> prop is not provided header will use the <code>color</code> prop value.'
    },
    dateDialogAndMenu: {
      header: "Date pickers - In dialog and menu",
      desc: '<p>When integrating a picker into a <code>v-text-field</code>, it is recommended to use the **readonly** prop. This will prevent mobile keyboards from triggering. To save vertical space, you can also hide the picker title.</p><p>Pickers expose a scoped slot that allow you to hook into save and cancel functionality. This will maintain an old value which can be replaced if the user cancels.</p>'
    },
    dateAllowedDates: {
      header: "Date pickers - Allowed dates",
      desc: 'You can specify allowed dates using arrays, objects, and functions.'
    },
    dateInternationalization: {
      header: "Date pickers - Internationalization",
      desc: 'The date picker supports internationalization through the JavaScript Date object. Specify a BCP 47 language tag using the <code>locale</code> prop, and then set the first day of the week with the <code>first-day-of-week</code> prop.'
    },
    monthLight: {
      header: "Month pickers",
      desc: 'Month pickers come in two orientation variations, portrait **(default)** and landscape.'
    },
    monthColorable: {
      header: "Month pickers - Colors",
      desc: 'Month picker colors can be set using the <code>color</code> and <code>header-color</code> props. If <code>header-color</code> prop is not provided header will use the <code>color</code> prop value.'
    },
    monthDialogAndMenu: {
      header: "Month pickers - In dialog and menu",
      desc: '<p>When integrating a picker into a <code>v-text-field</code>, it is recommended to use the **readonly** prop. This will prevent mobile keyboards from triggering. To save vertical space, you can also hide the picker title.</p><p>Pickers expose a scoped slot that allow you to hook into save and cancel functionality. This will maintain an old value which can be replaced if the user cancels.</p>'
    },
    monthAllowedMonths: {
      header: "Month pickers - Allowed months",
      desc: 'You can specify allowed months using arrays, objects, and functions.'
    },
    monthInternationalization: {
      header: "Month pickers - Internationalization",
      desc: 'The month picker supports internationalization through the JavaScript Date object. Specify a BCP 47 language tag using the <code>locale</code> prop, and then set the first day of the week with the <code>first-day-of-week</code> prop.'
    },
    timeLight: {
      header: "Time pickers",
      desc: 'Time pickers have the light theme enabled by default.'
    },
    timeColorable: {
      header: "Time pickers - Colors",
      desc: 'Time picker colors can be set using the <code>color</code> and <code>header-color</code> props. If <code>header-color</code> prop is not provided header will use the <code>color</code> prop value.'
    },
    timeDialogAndMenu: {
      header: "Time pickers - In dialog and menu",
      desc: 'Due to the flexibility of pickers, you can really dial in the experience exactly how you want it.'
    },
    time24hFormat: {
      header: "Time pickers - 24h format",
      desc: 'A time picker can be switched to 24hr format.'
    },
    timeAllowedTimes: {
      header: "Time pickers - Allowed times",
      desc: 'You can specify allowed times using arrays, objects, and functions.'
    }
  }]
}

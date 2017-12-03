<template lang="pug">
  component-view(v-bind:doc="doc")
    v-alert(color="info" icon="info" value="true" slot="top").mb-5 Date/Time pickers store internally the current value of your model and only change once saved. This can be accomplished by using the <code>actions</code> prop in conjunction with a scopedSlot to define your buttons, or by using the <code>autosave</code> prop.
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          component: '',
          edit: 'PickersView',
          title: 'Pickers',
          desc: 'The <code>v-date-picker</code> and <code>v-time-picker</code> are stand-alone components that can be utilized in many existing Vuetify components. They offer the user a visual representation for selecting date and time.',
          examples: [
            { header: "Date pickers - Light", file: "pickers/date-light", desc: 'Date pickers come in two orientation variations, portrait <strong>(default)</strong> and landscape.'},
            { header: "Date pickers - Dark", file: "pickers/date-dark", desc: 'Date pickers come in a dark variant which utilizes the applications primary accent color.'},
            { header: "Date pickers - Colors", file: "pickers/date-colorable", desc: 'Date picker colors can be set using the <code>color</code> and <code>header-color</code> props. If <code>header-color</code> prop is not provided header will use the <code>color</code> prop value.'},
            { header: "Date pickers - In dialog and menu", file: "pickers/date-dialog-and-menu", desc: '<p>When integrating a picker into a <code>v-text-field</code>, it is recommended to use the <strong>readonly</strong> prop. This will prevent mobile keyboards from triggering. To save vertical space, you can also hide the picker title.</p><p>Pickers expose a scoped slot that allow you to hook into save and cancel functionality. This will maintain an old value which can be replaced if the user cancels.</p>' },
            { header: "Date pickers - Formatting date", file: "pickers/date-formatting", desc: '<p>You can use your own formatting function if you want to display the date in the different format than ISO 8601</p>' },
            { header: "Date pickers - Allowed dates", file: "pickers/date-allowed-dates", desc: 'You can specify allowed dates using arrays, objects, and functions.'},
            { header: "Date pickers - Internationalization", file: "pickers/date-internationalization", desc: 'The date picker supports internationalization through the JavaScript Date object. Specify a BCP 47 language tag using the <code>locale</code> prop, and then set the first day of the week with the <code>first-day-of-week</code> prop.'},
            { header: "Month pickers - Light", file: "pickers/month-light", desc: 'Month pickers come in two orientation variations, portrait <strong>(default)</strong> and landscape.'},
            { header: "Month pickers - Dark", file: "pickers/month-dark", desc: 'Month pickers come in a dark variant which utilizes the applications primary accent color.'},
            { header: "Month pickers - Colors", file: "pickers/month-colorable", desc: 'Month picker colors can be set using the <code>color</code> and <code>header-color</code> props. If <code>header-color</code> prop is not provided header will use the <code>color</code> prop value.'},
            { header: "Month pickers - In dialog and menu", file: "pickers/month-dialog-and-menu", desc: '<p>When integrating a picker into a <code>v-text-field</code>, it is recommended to use the <strong>readonly</strong> prop. This will prevent mobile keyboards from triggering. To save vertical space, you can also hide the picker title.</p><p>Pickers expose a scoped slot that allow you to hook into save and cancel functionality. This will maintain an old value which can be replaced if the user cancels.</p>' },
            { header: "Month pickers - Allowed months", file: "pickers/month-allowed-months", desc: 'You can specify allowed months using arrays, objects, and functions.'},
            { header: "Month pickers - Internationalization", file: "pickers/month-internationalization", desc: 'The month picker supports internationalization through the JavaScript Date object. Specify a BCP 47 language tag using the <code>locale</code> prop, and then set the first day of the week with the <code>first-day-of-week</code> prop.'},
            { header: "Time pickers - Light", file: "pickers/time-light", desc: 'Time pickers have the light theme enabled by default.'},
            { header: "Time pickers - Dark", file: "pickers/time-dark", desc: 'An alternate dark theme can be used for dark theme applications.'},
            { header: "Date pickers - Colors", file: "pickers/time-colorable", desc: 'Time picker colors can be set using the <code>color</code> and <code>header-color</code> props. If <code>header-color</code> prop is not provided header will use the <code>color</code> prop value.'},
            { header: "Time pickers - In dialog and menu", file: "pickers/time-dialog-and-menu", desc: 'Due to the flexibility of pickers, you can really dial in the experience exactly how you want it.'},
            { header: "Time pickers - 24h format", file: "pickers/time-24h-format", desc: 'A time picker can be switched to 24hr format.'},
            { header: "Time pickers - Allowed times", file: "pickers/time-allowed-times", desc: 'You can specify allowed times using arrays, objects, and functions.'},
          ],
          props: {
            'v-date-picker': {
              shared: ['theme', 'colorable'],
              model: {
                type: ['String'],
                default: 'null',
                description: 'Controls the displayed date. Must use ISO 8601 format.'
              },
              params: [
                [
                  'type',
                  'String',
                  'date',
                  'Determines the type of the picker - <code>\'date\'</code> for date picker, <code>\'month\'</code> for month picker'
                ],
                [
                  'header-color',
                  'String',
                  '-',
                  'Defines the header color. If not specified it will use the color defined by <code>color</code> prop or the default picker color'
                ],
                [
                  'actions',
                  'Boolean',
                  'True',
                  'Use this when using actions inside the picker'
                ],
                [
                  'autosave',
                  'Boolean',
                  'True',
                  'Automatically save the selected value. This updates the internal previous value so if cancel is clicked, it will not revert the user changes'
                ],
                [
                  'landscape',
                  'Boolean',
                  'True',
                  'Orients picker horizontal'
                ],
                [
                  'no-title',
                  'Boolean',
                  'True',
                  'Hide the picker title'
                ],
                [
                  'month-format',
                  'Function',
                  'Date::toLocaleDateString(locale, { month: \'short\' })',
                  'Formatting function used for displaying months in the months table. Called with date (ISO 8601 string) and locale (string) arguments.'
                ],
                [
                  'scrollable',
                  'Boolean',
                  'False',
                  'Allows the use of the mousewheel in the picker'
                ],
                [
                  'allowed-dates',
                  'Array, Object, Function',
                  'null',
                  'Restricts which dates can be selected'
                ],
                [
                  'locale',
                  'String',
                  'en-US',
                  'Sets the locale. Accepts a string with a BCP 47 language tag.'
                ],
                [
                  'first-day-of-week',
                  '[Number, String]',
                  '0',
                  'Sets the first day of the week, starting with 0 for Sunday.'
                ],
                [
                  'title-date-format',
                  'Function',
                  'Date::toLocaleDateString(locale, { weekday: \'short\', month: \'short\', day: \'numeric\' })',
                  'Allows you to customize the format of the date string that appears in the title of the date picker. Called with date (ISO 8601 string) and locale (string) arguments.'
                ],
                [
                  'header-date-format',
                  'Function',
                  'Date::loLocaleDateString(locale, { month: \'long\', year: \'numeric\' })',
                  'Allows you to customize the format of the month string that appears in the header of the calendar. Called with date (ISO 8601 string) and locale (string) arguments.'
                ],
                [
                  'year-format',
                  'Function',
                  'Date::loLocaleDateString(locale, { year: \'numeric\' })',
                  'Allows you to customize the format of the year string that appears in the header of the calendar. Called with date (ISO 8601 string) and locale (string) arguments.'
                ],
                [
                  'day-format',
                  'Function',
                  'Date::loLocaleDateString(locale, { day: \'numeric\' })',
                  'Allows you to customize the format of the day string that appears in the date table. Called with date (ISO 8601 string) and locale (string) arguments.'
                ],
                [
                  'year-icon',
                  'String',
                  `''`,
                  'Generates an icon next to the year'
                ]
              ]
            },
            'v-time-picker': {
              shared: ['theme', 'colorable'],
              model: {
                type: ['String'],
                default: 'null',
                description: 'Controls the displayed time.'
              },
              params: [
                [
                  'actions',
                  'Boolean',
                  'True',
                  'Use this when using actions inside the picker'
                ],
                [
                  'header-color',
                  'String',
                  '-',
                  'Defines the header color. If not specified it will use the color defined by <code>color</code> prop or the default picker color'
                ],
                [
                  'autosave',
                  'Boolean',
                  'True',
                  'Automatically save the selected value. This updates the internal previous value so if cancel is clicked, it will not revert the user changes'
                ],
                [
                  'landscape',
                  'Boolean',
                  'True',
                  'Orients picker horizontal'
                ],
                [
                  'no-title',
                  'Boolean',
                  'True',
                  'Hide the picker title'
                ],
                [
                  'format',
                  'String',
                  'ampm',
                  `Available options are ['ampm', '24hr']`
                ],
                [
                  'scrollable',
                  'Boolean',
                  'False',
                  'Allows the use of the mousewheel in the picker'
                ],
                [
                  'allowed-hours',
                  'Array, Object, Function',
                  'null',
                  'Restricts which hours can be selected'
                ],
                [
                  'allowed-minutes',
                  'Array, Object, Function',
                  'null',
                  'Restricts which minutes can be selected'
                ]
              ]
            }
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
  #pickers-view
    min-height: 150vh

    .component-example .col
      margin: 1rem auto
</style>

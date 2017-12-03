<template lang="pug">
  component-view(v-bind:doc="doc")
    v-alert(info value="true" slot="top").mb-5 Date/Time pickers store internally the current value of your model and only change once saved. This can be accomplished by using the <code>actions</code> prop in conjunction with a scopedSlot to define your buttons, or by using the <code>autosave</code> prop.
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          component: 'pickers',
          edit: 'PickersView',
          title: 'Pickers',
          desc: 'The <code>v-date-picker</code> and <code>v-time-picker</code> are stand-alone components that can be utilized in many existing Vuetify components. They offer the user a visual reprensetation for selecting date and time.',
          examples: [
            { header: "Date pickers - Light", file: "pickers/1", desc: 'Date pickers come in two orientation variations, portrait <strong>(default)</strong> and landscape.'},
            { header: "Date pickers - Dark", file: "pickers/2", desc: 'Date pickers come in a dark variant which utilizes the applications primary accent color.'},
            { header: "Date pickers - In dialog and menu", file: "pickers/3", desc: '<p>When integrating a picker into a <code>v-text-field</code>, it is recommended to use the <strong>readonly</strong> prop. This will prevent mobile keyboards from triggering. To save vertical space, you can also hide the picker title.</p><p>Pickers expose a scoped slot that allow you to hook into save and cancel functionality. This will maintain an old value which can be replaced if the user cancels.</p>' },
            { header: "Date pickers - Allowed dates", file: "pickers/11", desc: 'You can specify allowed dates using arrays, objects, and functions.'},
            { header: "Date pickers - Custom format", file: "pickers/12", desc: 'You can specify a custom date format. This will be returned through the <prop>formatted-value</code> prop. Using the sync property (new in Vue 2.3), you can link up a formatted version of the date.'},
            { header: "Date pickers - Internationalization", file: "pickers/13", desc: 'The date picker supports internationalization through the JavaScript Date object. Specify a BCP 47 language tag using the <code>locale</code> prop, and then set the first day of the week with the <code>first-day-of-week</code> prop.'},
            { header: "Time pickers - Light", file: "pickers/4", desc: 'Time pickers have the light theme enabled by default.'},
            { header: "Time pickers - Dark", file: "pickers/5", desc: 'An alternate dark theme can be used for dark theme applications.'},
            { header: "Time pickers - In dialog and menu", file: "pickers/6", desc: 'Due to the flexibility of pickers, you can really dial in the experience exactly how you want it.'},
            { header: "Time pickers - 24h format", file: "pickers/7", desc: 'A time picker can be switched to 24hr format.'},
            { header: "Time pickers - Allowed times", file: "pickers/10", desc: 'You can specify allowed times using arrays, objects, and functions.'},
          ],
          props: {
            'v-date-picker': {
              model: {
                type: ['null, String, Date Object, Number'],
                default: 'null',
                description: 'Controls the displayed date.'
              },
              params: [
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
                  'dark',
                  'Boolean',
                  'True',
                  'Applies the dark theme'
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
                  'date-format',
                  'Function',
                  'val => new Date(val).toISOString().substr(0, 10)',
                  'This is the date format emitted on the <strong>formatted-value</strong> prop when the picker\'s model changes.'
                ],
                [
                  'formatted-value',
                  'Function',
                  'val => new Date(val).toISOString().substr(0, 10)',
                  'This is the formatted value.'
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
                  'Object',
                  '{ weekday: \'short\', month: \'short\', day: \'numeric\' }',
                  'Allows you to customize the format of the date string that appears in the title of the date picker. The format is equal to the options argument of the <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString">Date.toLocaleString</a> function.'
                ],
                [
                  'header-date-format',
                  'Object',
                  '{ month: \'long\', year: \'numeric\' }',
                  'Allows you to customize the format of the month string that appears in the header of the calendar. The format is equal to the options argument of the <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString">Date.toLocaleString</a> function.'
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
                  'autosave',
                  'Boolean',
                  'True',
                  'Automatically save the selected value. This updates the internal previous value so if cancel is clicked, it will not revert the user changes'
                ],
                [
                  'dark',
                  'Boolean',
                  'True',
                  'Applies the dark theme'
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

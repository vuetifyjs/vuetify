<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    name: 'alerts-view',

    data () {
      return {
        doc: {
          component: 'VAlert',
          edit: 'AlertsView',
          title: 'Alert',
          desc: 'The <code>v-alert</code> component is used to convey information to the user. Designed to stand out, the alerts come in four contextual styles, success, info, warning, and error.',
          examples: [
            { header: 'Contextual', file: 'alerts/contextual', desc: `The <code>v-alert</code> component comes in 4 variations, <strong>success</strong>, <strong>info</strong>, <strong>warning</strong> and <strong>error</strong>. These have default icons assigned which can be changed and represent different actions.` },
            { header: 'Closable', file: 'alerts/closable', desc: `Using <code>v-model</code> you can control the state of the Alert. If you don't want to assign a v-model and just display the alert, you can simply assign the prop <code>value</code>.` },
            { header: 'Custom Icon / No Icon', file: 'alerts/icon', desc: `You can easily assign a custom icon or remove it all together.` },
            { header: 'Display transition', file: 'alerts/transition', desc: `You can apply a custom transition to the show/hide of the alert.`},
            { header: 'Outline', file: 'alerts/outline', desc: `Outline alerts inherit their borders from the current color applied.`}
          ],
          props: {
            'v-alert': {
              shared: ['colorable', 'transitionable'],
              model: {
                type: ['Boolean'],
                default: 'False'
              },
              params: [
                [
                  'dismissible',
                  'Boolean',
                  'False',
                  'Specifies that the Alert can be closed'
                ],
                [
                  'icon',
                  'String',
                  '-',
                  'Designates a specific icon'
                ],
                [
                  'outline',
                  'Boolean',
                  'False',
                  'Alert will have an outline'
                ],
                [
                  'type',
                  'String',
                  'null',
                  'Specify a <strong>success</strong>, <strong>info</strong>, <strong>warning</strong> or <strong>error</strong> alert. Uses the contextual color and a pre-defined icon.'
                ]
              ]
            }
          },
          slots: {
            'v-alert': {
              shared: ['default']
            }
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
  #alert-view
    .alert
      margin: 1rem 0
</style>

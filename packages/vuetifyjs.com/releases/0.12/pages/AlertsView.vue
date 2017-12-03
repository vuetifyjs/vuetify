<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    name: 'alerts-view',

    data () {
      return {
        doc: {
          component: 'alerts',
          edit: 'AlertsView',
          title: 'Alert',
          desc: 'The <code>v-alert</code> component is used to convey information to the user. Designed to stand out, the alerts come in four contextual styles, success, info, warning, and error.',
          examples: [
            { header: 'Contextual', file: 'alerts/1', desc: `The <code>v-alert</code> component comes in 4 variations, <strong>success</strong>, <strong>info</strong>, <strong>warning</strong> and <strong>error</strong>. These have default icons assigned which can be changed and represent different actions.` },
            { header: 'Closable', file: 'alerts/2', desc: `Using <code>v-model</code> you can control the state of the Alert. If you don't want to assign a v-model and just display the alert, you can simply do <code>:value="true"</code>.` },
            { header: 'Custom Icon / No Icon', file: 'alerts/3', desc: `You can easily assign a custom icon or remove it all together.` }
          ],
          props: {
            'v-alert': {
              shared: ['contextual'],
              model: {
                type: '*'
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
                  'hide-icon',
                  'Boolean',
                  'False',
                  'Hides the alert icon'
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

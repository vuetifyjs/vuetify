<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    data () {
      return {
        test: [],
        test2: false,
        doc: {
          title: 'Selection controls',
          component: 'selectioncontrols',
          edit: 'SelectionControlsView',
          desc: 'Selection control components allow a user to select options. These components <strong>must</strong> be used with the <code>v-model</code> prop as they do not maintain their own state.',
          examples: [
            { header: "Checkboxes - Boolean", file: "selection-controls/1", desc: '' },
            { header: "Checkboxes - Array", file: "selection-controls/2", desc: '' },
            { header: "Checkboxes - States", file: "selection-controls/3", desc: '' },
            { header: "Checkboxes - Contextual", file: "selection-controls/4", desc: '' },
            { header: "Radios - Default", file: "selection-controls/5", desc: '' },
            { header: "Radios - States", file: "selection-controls/6", desc: '' },
            { header: "Radios - Contextual", file: "selection-controls/7", desc: '' },
            { header: "Switches - Boolean", file: "selection-controls/8", desc: '' },
            { header: "Switches - Array", file: "selection-controls/9", desc: '' },
            { header: "Switches - States", file: "selection-controls/10", desc: '' },
            { header: "Switches - Contextual", file: "selection-controls/11", desc: '' },
          ],
          props: {
            'v-checkbox': {
              shared: ['contextual', 'input'],
              params: [
                [
                  'input-value',
                  'Array, Boolean, String',
                  '-',
                  'Sets possible input values'
                ],
                [
                  'true-value',
                  'String',
                  '-',
                  'Sets value for truthy state'
                ],
                [
                  'false-value',
                  'String',
                  '-',
                  'Sets value for falsy state'
                ],
                [
                  'indeterminate',
                  'Boolean',
                  'False',
                  'Sets an indeterminate state for the checkbox'
                ],
              ],
              model: {
                type: '*',
                default: 'None',
                description: 'Current input value'
              }
            },
            'v-radio': {
              shared: ['contextual', 'input'],
              params: [
                [
                  'input-value',
                  'String, Number',
                  '-',
                  'Sets the radio current input value'
                ]
              ],
              model: {
                type: '*',
                default: 'None',
                description: 'Current radio value'
              }
            },
            'v-switch': {
              shared: ['contextual', 'input'],
              params: [
                [
                  'input-value',
                  'Array, Boolean, String',
                  '-',
                  'Sets possible input values'
                ],
                [
                  'true-value',
                  'String',
                  '-',
                  'Sets value for truthy state'
                ],
                [
                  'false-value',
                  'String',
                  '-',
                  'Sets value for falsy state'
                ],
              ],
              model: {
                type: '*',
                default: 'None',
                description: 'Current switch value'
              }
            }
          },
          events: {
            'v-radio': {
              events: [
                ['change', 'String, Number', 'Input value changed.']
              ]
            },
          }
        }
      }
    },
  }
</script>

<style lang="stylus">
 #selection-controls-view
   .component-example
      table
        tr
          border-bottom: none !important
          height: 75px

          &:hover
            background: transparent !important

        td, th
          text-align: center

        td
          .input-group
            justify-content: center
</style>

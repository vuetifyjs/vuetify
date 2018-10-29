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
          component: '',
          edit: 'SelectionControlsView',
          desc: 'Selection control components allow a user to select options. These components <strong>must</strong> be used with the <code>v-model</code> prop as they do not maintain their own state.',
          examples: [
            { header: "Checkboxes - Boolean", file: "selection-controls/checkboxes-boolean", desc: '' },
            { header: "Checkboxes - Array", file: "selection-controls/checkboxes-array", desc: '' },
            { header: "Checkboxes - States", file: "selection-controls/checkboxes-states", desc: '' },
            { header: "Checkboxes - Colors", file: "selection-controls/checkboxes-colors", desc: 'Checkboxes can be colored by using any of the builtin colors and contextual names using the color prop.' },
            { header: "Radios - Default", file: "selection-controls/radios-default", desc: 'Radio-groups are by default mandatory. This can be changed with the <code>mandatory</code> prop.' },
            { header: "Radios - Direction", file: "selection-controls/radios-direction", desc: 'Radio-groups can be presented either as a row or a column, using their respective props. The default is as a column.' },
            { header: "Radios - Colors", file: "selection-controls/radios-colors", desc: 'Radios can be colored by using any of the builtin colors and contextual names using the color prop.' },
            { header: "Switches - Boolean", file: "selection-controls/switches-boolean", desc: '' },
            { header: "Switches - Array", file: "selection-controls/switches-array", desc: '' },
            { header: "Switches - States", file: "selection-controls/switches-states", desc: '' },
            { header: "Switches - Colors", file: "selection-controls/switches-colors", desc: 'Switches can be colored by using any of the builtin colors and contextual names using the color prop.' },
          ],
          props: {
            'v-checkbox': {
              shared: ['colorable', 'input'],
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
              shared: ['colorable', 'input'],
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
            'v-radio-group': {
              params: [
                [
                  'column',
                  'Boolean',
                  'True',
                  'Displays radio buttons in column'
                ],
                [
                  'row',
                  'Boolean',
                  'False',
                  'Displays radio buttons in row'
                ]
              ],
            },
            'v-switch': {
              shared: ['colorable', 'input'],
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
          slots: {
            'v-checkbox': {
              shared: ['label']
            },
            'v-radio': {
              shared: ['label']
            },
            'v-radio-group': {
              shared: ['default']
            },
            'v-switch': {
              shared: ['label']
            }
          },
          events: {
            'v-radio': {
              params: [
                ['change', 'String, Number', 'Input value changed.']
              ]
            },
            'v-radio-group': {
              params: [
                ['change', 'String, Number', 'Input value changed.'],
                ['blur', 'String, Number', 'Last active input value.']
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

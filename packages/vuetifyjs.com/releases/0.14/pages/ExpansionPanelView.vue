<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Expansion Panel',
          edit: 'ExpansionPanelView',
          component: 'expansion-panel',
          desc: `The <code>v-expansion-panel</code> component is useful for reducing vertical space with large amounts of information. The default functionality of the component is to only display one expansion-panel body at a time, however, with the <code>expandable</code> property, the expansion-panel can remain open until explicity closed.`,
          examples: [
            { header: 'Accordion', file: 'expansion-panel/1', desc: 'Accordion expansion panels can only have 1 panel open at a time.' },
            { header: 'Expand', file: 'expansion-panel/2', desc: 'Expand expansion panels will stay open until closed.' }
          ],
          props: {
            'v-expansion-panel': {
              params: [
                [
                  'expand',
                  'Boolean',
                  'False',
                  'Leaves expansion-panel open when selecting another'
                ]
              ]
            },
            'v-expansion-panel-content': {
              params: [
                [
                  'ripple',
                  'Boolean',
                  'False',
                  'Applies the ripple directive'
                ]
              ],
              model: {
                types: ['Boolean'],
                default: 'False',
                description: 'Designates whether content is expanded or not'
              }
            }
          },
          slots: {
            'v-expansion-panel': {
              shared: ['default']
            },
            'v-expansion-panel-content': {
              shared: ['default'],
              params: [
                [
                  'header',
                  'Expansion header content'
                ]
              ]
            }
          }
        }
      }
    }
  }
</script>

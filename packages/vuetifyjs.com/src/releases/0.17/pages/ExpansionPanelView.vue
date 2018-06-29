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
          component: 'VExpansionPanel',
          desc: `The <code>v-expansion-panel</code> component is useful for reducing vertical space with large amounts of information. The default functionality of the component is to only display one expansion-panel body at a time, however, with the <code>expandable</code> property, the expansion-panel can remain open until explicitly closed.`,
          examples: [
            { header: 'Accordion', file: 'expansion-panel/accordion', desc: 'Accordion expansion panels can only have 1 panel open at a time.' },
            { header: 'Expand', file: 'expansion-panel/expand', desc: 'Expand expansion panels will stay open until closed.' },
            { header: 'Popout & Inset', file: 'expansion-panel/popout', desc: 'The expansion panel also has two alternative designs you can activate with the props <code>popout</code> and <code>inset</code>.' },
            { header: 'Focusable', file: 'expansion-panel/focusable', desc: 'The expansion panel headers can be made focusable with the prop <code>focusable</code>.' }
          ],
          props: {
            'v-expansion-panel': {
              shared: ['theme'],
              params: [
                [
                  'expand',
                  'Boolean',
                  'False',
                  'Leaves expansion-panel open when selecting another'
                ],
                [
                  'focusable',
                  'Boolean',
                  'False',
                  'Makes the expansion panel headers focusable'
                ],
                [
                  'inset',
                  'Boolean',
                  'False',
                  'Makes the expansion panel open with an inset style'
                ],
                [
                  'popout',
                  'Boolean',
                  'False',
                  'Makes the expansion panel open with a popout style'
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
                ],
                [
                  'hide-actions',
                  'Boolean',
                  'False',
                  'Hide the icon in the content header'
                ],
                [
                  'lazy',
                  'Boolean',
                  'False',
                  'Lazily load the expansion panel contents'
                ]
              ],
              model: {
                type: ['Boolean'],
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
                ],
                [
                  'actions',
                  'Expansion header actions'
                ]

              ]
            }
          }
        }
      }
    }
  }
</script>

<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Tooltip',
          component: 'VTooltip',
          edit: 'TooltipsView',
          desc: 'The <code>v-tooltip</code> component is useful for conveying information when a user hovers over an element. You can also programmatically control the display of tooltips through a <strong>v-model</strong>',
          props: {
            'v-tooltip': {
              shared: ['delayable', 'menu', 'lazy'],
              model: {
                type: ['Boolean'],
                default: 'False'
              },
              params: [
                [
                  'color',
                  'String',
                  '-',
                  'Apply a custom color to the tooltip background'
                ],
                [
                  'disabled',
                  'Boolean',
                  'False',
                  'Disables showing tooltip on mouse hover'
                ],
                [
                  'debounce',
                  '[Number, String]',
                  '100',
                  'Duration before tooltip is shown and hidden when hovered'
                ],
                [
                  'tag',
                  'String',
                  'span',
                  'The tooltip tag'
                ],
                [
                  'transition',
                  'String',
                  '-',
                  'By default, this is automatically calculated depending on the position options used. Can be removed with a Boolean (false) value or changed by providing your own'
                ],
                [
                  'z-index',
                  '*',
                  '99',
                  'The z-index used for the tooltip'
                ]
              ]
            }
          },
          examples: [
            { header: 'Default', file: 'tooltips/default', desc: 'Tooltips can wrap any element.' },
            { header: 'Visibility', file: 'tooltips/visibility', desc: 'Tooltip visibility can be programmatically changed using <code>v-model</code>.' }
          ]
        }
      }
    }
  }
</script>

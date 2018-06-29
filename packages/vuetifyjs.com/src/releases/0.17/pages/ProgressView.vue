<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          component: '',
          edit: 'ProgressView',
          title: 'Progress',
          desc: 'The <code>v-progress-circular</code> and <code>v-progress-linear</code> components are used to convey data visually to users. They can also represent an indeterminate amount, such as loading or processing. These components contains a slot that is centered within the component container.',
          examples: [
            { header: 'Default', file: 'progress-circular/default', desc: 'By default, progress circular uses the applications secondary color.' },
            { header: 'Colored', file: 'progress-circular/colored', desc: 'Alternate colors can be applied.' },
            { header: 'Indeterminate', file: 'progress-circular/indeterminate', desc: 'An indeterminate progress circular animates forever.' },
            { header: 'Size & Width', file: 'progress-circular/size-and-width', desc: 'The progress circular component can have an altered width and size.' },
            { header: 'Rotate', file: 'progress-circular/rotate', desc: 'The progress origin can be rotated.' },
            { header: 'Determinate', file: 'progress-linear/determinate', desc: 'The progress linear component can have a determinate state modified by v-model.' },
            { header: 'Indeterminate', file: 'progress-linear/indeterminate', desc: 'Just as with the progress circular component, progress linear has an indeterminate state.' },
            { header: 'Buffer', file: 'progress-linear/buffer', desc: 'A buffer state represents two values simultaneously. The primary value is controlled by the model, whereas the buffer is controlled by the <code>buffer-value</code> prop.'},
            { header: 'Query Indeterminate and Determinate', file: 'progress-linear/query-indeterminate-and-determinate', desc: 'To query state is controlled by the truthiness of indeterminate with the query prop set to true.'},
            { header: 'Custom height and contextual colors', file: 'progress-linear/custom-height-and-contextual-colors', desc: 'A custom height or contextual color can be applied to a progress bar. The bars primary color is your applications primary color.'},
            { header: 'Custom colors', file: 'progress-linear/custom-colors', desc: 'You can also set the color using the props <code>color</code> and <code>background-color</code>.'},
          ],
          props: {
            'v-progress-circular': {
              shared: ['colorable'],
              params: [
                [
                  'fill',
                  'String',
                  "[indeterminate ? 'none' : 'transparent']",
                  'Sets the fill color of the circle'
                ],
                [
                  'indeterminate',
                  'Boolean',
                  'False',
                  'Never stops rotating. Use when loading progress is unknown.'
                ],
                [
                  'rotate',
                  'Number',
                  '0',
                  'Rotates the circle start point in deg'
                ],
                [
                  'size',
                  'Number',
                  '32',
                  'Sets the diameter of the circle in pixels'
                ],
                [
                  'width',
                  'Number',
                  '4',
                  'Sets the stroke of the circle in pixels'
                ]
              ],
              model: {
                type: ['Number'],
                default: '0',
                description: 'The percentage value for current progress'
              }
            },

            'v-progress-linear': {
              shared: ['colorable'],
              params: [
                [
                  'background-color',
                  'String',
                  'null',
                  'Background color, set to component\'s color if null'
                ],
                [
                  'background-opacity',
                  '[Number, String]',
                  'null',
                  'Background opacity, if null it defaults to 0.3 if background color is not specified or 1 otherwise'
                ],
                [
                  'buffer-value',
                  'Number',
                  'None',
                  'The percentage value for the buffer'
                ],
                [
                  'height',
                  'number',
                  '7',
                  'The height of the progress bar'
                ],
                [
                  'indeterminate',
                  'Boolean',
                  'False',
                  'Sets the indeterminate state of the component. Use when loading progress is unknown'
                ],
                [
                  'active',
                  'Boolean',
                  'True',
                  'When disabled, the component will shrink up'
                ],
                [
                  'query',
                  'Boolean',
                  'False',
                  'Sets the query state of the component'
                ],
              ],
              model: {
                type: ['Number'],
                default: '0',
                description: 'The percentage value for current progress'
              }
            }
          },
          slots: {
            'v-progress-circular': {
              default: true
            }
          }
        }
      }
    }
  }
</script>

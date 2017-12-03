<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          component: 'VSlider',
          edit: 'SliderView',
          title: 'Slider',
          desc: 'The <code>v-slider</code> component is a better visualization of the number input. It is used for gathering numerical user data.',
          examples: [
            { header: 'Continuous', file: 'sliders/continuous', desc: 'Continuous sliders should be used when precision is not a concern.' },
            { header: 'Discrete', file: 'sliders/discrete', desc: 'Discrete sliders offer a thumb label that displays the exact current amount. Using the <code>step</code> prop you can disallow selecting values outside of steps.' },
            { header: 'Icons', file: 'sliders/icons', desc: 'You can add icons to the slider with the <code>append-icon</code> and <code>prepend-icon</code> props.' },
            { header: 'With an editable numeric value', file: 'sliders/editable-numeric-value', desc: 'Sliders can be combined with other components for a better display.' },
            { header: 'Dark theme', file: 'sliders/dark', desc: 'Sliders also support theming.' },
            { header: 'Custom colors', file: 'sliders/custom-colors', desc: 'You can set the colors of the slider using the props <code>color</code>, <code>track-color</code> and <code>thumb-color</code>.', new: '0.16.0' }
          ],
          props: {
            'v-slider': {
              shared: ['input', 'theme'],
              params: [
                [
                  'color',
                  'String',
                  '-',
                  'Sets the track color'
                ],
                [
                  'min',
                  'Number',
                  '0',
                  'Sets minimum value'
                ],
                [
                  'max',
                  'Number',
                  '100',
                  'Sets maximum value'
                ],
                [
                  'thumb-color',
                  'String',
                  '-',
                  'Sets the thumb and thumb label color'
                ],
                [
                  'thumb-label',
                  'Boolean',
                  'False',
                  'Show thumb label'
                ],
                [
                  'track-color',
                  'String',
                  '-',
                  'Sets the track fill color'
                ],
                [
                  'ticks',
                  'Boolean',
                  'False',
                  'Displays dots at every step (defined with <code>step</code> prop)'
                ],
                [
                  'step',
                  'Number',
                  '1',
                  'If greater than 0, sets step interval for ticks and makes the thumb snapping to each step'
                ]
              ],
            }
          },
          events: {
            'v-slider': {
              params: [
                [
                  'input',
                  ['Number', 'String'],
                  'Selected value'
                ]
              ]
            }
          }
        }
      }
    },
  }
</script>

<style lang="stylus">
</style>

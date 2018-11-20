<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Snackbar',
          component: 'VSnackbar',
          edit: 'SnackbarView',
          desc: 'The <code>v-snackbar</code> component is used to display a quick message to a user. Snackbars support positioning, removal delay and callbacks.',
          examples: [
            { header: 'Position', file: 'snackbars/position', desc: 'The standard snackbar is useful for calling attention to some function that has just happened.'},
            { header: 'Contextual', file: 'snackbars/contextual', desc: 'You can also apply a color to the snackbar to better fit your implementation.'}
          ],
          props: {
            'v-snackbar': {
              shared: ['colorable'],
              params: [
                [
                  'absolute',
                  'Boolean',
                  'False',
                  'Set the position to absolute, allowing you to place snackbar inside any container'
                ],
                [
                  'bottom',
                  'Boolean',
                  'True',
                  'Position the snackbar at the bottom'
                ],
                [
                  'top',
                  'Boolean',
                  'False',
                  'Position the snackbar at the top'
                ],
                [
                  'left',
                  'Boolean',
                  'False',
                  'Position the snackbar on the left'
                ],
                [
                  'right',
                  'Boolean',
                  'False',
                  'Position the snackbar on the right'
                ],
                [
                  'multi-line',
                  'Boolean',
                  'False',
                  'Makes the snackbar higher (mobile)'
                ],
                [
                  'timeout',
                  'Number',
                  '6000',
                  'Time to wait until snackbar is automatically hidden'
                ],
                [
                  'vertical',
                  'Boolean',
                  'False',
                  'Stacks snackbar content vertically (mobile)'
                ]
              ],
              model: {
                type: ['Boolean'],
                default: 'False'
              }
            }
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
  #snackbar-view // Needed so snackbar can show in docs
    .component-example > .card
      z-index: initial !important
</style>

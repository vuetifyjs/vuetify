export default {
  header: 'Snackbar',
  headerText: 'The `v-snackbar` component is used to display a quick message to a user. Snackbars support positioning, removal delay and callbacks.',
  components: ['v-snackbar'],
  examples: [{
    position: {
      header: 'Position',
      desc: 'The standard snackbar is useful for calling attention to some function that has just happened.'
    },
    contextual: {
      header: 'Contextual',
      desc: 'You can also apply a color to the snackbar to better fit your implementation.'
    }
  }],
  props: {
    multiLine: 'Makes the snackbar higher (mobile)',
    timeout: 'Time to wait until snackbar is automatically hidden',
    vertical: 'Stacks snackbar content vertically (mobile)'
  }
}

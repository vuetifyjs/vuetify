export default {
  header: 'Progress',
  headerText: 'The `v-progress-circular` and `v-progress-linear` components are used to convey data visually to users. They can also represent an indeterminate amount, such as loading or processing. These components contains a slot that is centered within the component container.',
  components: ['v-progress-circular', 'v-progress-linear'],
  examples: [{
    circularDefault: {
      header: 'Default',
      desc: 'By default, progress circular uses the applications secondary color.'
    },
    circularColored: {
      header: 'Colored',
      desc: 'Alternate colors can be applied.'
    },
    circularIndeterminate: {
      header: 'Indeterminate',
      desc: 'An indeterminate progress circular animates forever.'
    },
    circularSizeAndWidth: {
      header: 'Size & Width',
      desc: 'The progress circular component can have an altered width and size.'
    },
    circularRotate: {
      header: 'Rotate',
      desc: 'The progress origin can be rotated.'
    },
    linearDeterminate: {
      header: 'Determinate',
      desc: 'The progress linear component can have a determinate state modified by v-model.'
    },
    linearIndeterminate: {
      header: 'Indeterminate',
      desc: 'Just as with the progress circular component, progress linear has an indeterminate state.'
    },
    linearBuffer: {
      header: 'Buffer',
      desc: 'A buffer state represents two values simultaneously. The primary value is controled by the model, whereas the buffer is controlled by the `buffer-value` prop.'
    },
    linearQueryIndeterminateAndDeterminate: {
      header: 'Query Indeterminate and Determinate',
      desc: 'To query state is controlled by the truthiness of indeterminate with the query prop set to true.'
    },
    linearCustomHeightAndContextualColors: {
      header: 'Custom height and contextual colors',
      desc: 'A custom height or contextual color can be applied to a progress bar. The bars primary color is your applications primary color.'
    },
    linearCustomColors: {
      header: 'Custom colors',
      desc: 'You can also set the color using the props `color` and `background-color`.'
    }
  }]
}

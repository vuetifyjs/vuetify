export default {
  header: 'Stepper',
  headerText: 'The <code>v-stepper</code> component displays progress through numbered steps.',
  props: {
    altLabels: 'Places the labels beneath the step',
    complete: 'Marks step as complete',
    completeIcon: 'Icon to display when step is marked as completed',
    editable: 'Marks step as editable',
    editIcon: 'Icon to display when step is editable',
    errorIcon: 'Icon to display when step has an error',
    nonLinear: 'Allow user to jump to any step',
    vertical: 'Display steps vertically'
  },
  special: {
    props: {
      'v-stepper-step': {
        step: 'Content to display inside step circle'
      },
      'v-stepper-content': {
        step: 'Sets step to associate the content to'
      }
    }
  }
}

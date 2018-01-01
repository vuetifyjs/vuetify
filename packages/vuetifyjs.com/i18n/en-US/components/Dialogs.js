export default {
  header: 'Dialog',
  headerText: 'The `v-dialog` component inform users about a specific task and may contain critical information, require decisions, or involve multiple tasks. Use dialogs sparingly because they are interruptive.',
  components: ['v-dialog'],
  examples: [{
    simple: {
      header: 'Simple dialogs',
      desc: 'Choosing an option immediately commits the option and closes the menu. Touching outside of the dialog, or pressing Back, cancels the action and closes the dialog.',
      uninverted: true
    },
    withoutActivator: {
      header: 'Without activator',
      desc: 'If for some reason you are unable to use the activator slot, be sure to add the `.stop` modifier to the event that triggers the dialog.',
      uninverted: true
    },
    modal: {
      header: 'Modal',
      desc: 'Similar to a Simple Dialog, except that it\'s not dismissed when touching outside.',
      uninverted: true
    },
    fullscreen: {
      header: 'Fullscreen',
      desc: 'Due to limited space, full-screen dialogs may be more appropriate for mobile devices than dialogs used on devices with larger screens.',
      uninverted: true
    },
    form: {
      header: 'Form',
      desc: 'Just a simple example of a form in a dialog.',
      uninverted: true
    },
    scrollable: {
      header: 'Scrollable',
      desc: 'Example of a dialog with scrollable content.',
      uninverted: true
    },
    overflowed: {
      header: 'Overflowed',
      desc: 'Modals that do not fit within the available window space will scroll the container.',
      uninverted: true
    }
  }],
  props: {
    disabled: 'Disabled the ability to open the dialog',
    fullWidth: 'Specifies the modal to force 100% width',
    fullscreen: 'Changes layout for fullscreen display',
    hideOverlay: 'Hide the display of the overlay',
    lazy: 'Mixins.Bootable.props.lazy',
    maxWidth: 'The maximum width the content',
    origin: 'Mixins.Transitionable.props.origin',
    persistent: 'Clicking outside will not dismiss the dialog',
    scrollable: 'When set to true, expects a card, card-title, card-text and card-actions. Additionally card-text should have specified height. Will set card-text to overflow-y',
    width: 'Sets the dialog width'
  }
}

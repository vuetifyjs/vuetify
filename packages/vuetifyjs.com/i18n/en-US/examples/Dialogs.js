export default {
  simple: {
    header: 'Simple dialogs',
    desc: `Choosing an option immediately commits the option and closes the menu. Touching outside of the dialog, or pressing Back, cancels the action and closes the dialog.`
  },
  withoutActivator: {
    header: 'Without activator',
    desc: `If for some reason you are unable to use the activator slot, be sure to add the <code>.stop</code> modifier to the event that triggers the dialog.`
  },
  modal: {
    header: 'Modal',
    desc: `Similar to a Simple Dialog, except that it's not dismissed when touching outside.`
  },
  fullscreen: {
    header: 'Fullscreen',
    desc: `Due to limited space, full-screen dialogs may be more appropriate for mobile devices than dialogs used on devices with larger screens.`
  },
  form: {
    header: 'Form',
    desc: `Just a simple example of a form in a dialog.`
  },
  scrollable: {
    header: 'Scrollable',
    desc: `Example of a dialog with scrollable content.`
  },
  overflowed: {
    header: 'Overflowed',
    desc: `Modals that do not fit within the available window space will scroll the container.`
  }
}

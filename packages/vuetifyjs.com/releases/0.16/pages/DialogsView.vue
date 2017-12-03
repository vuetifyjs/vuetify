<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    name: 'dialogs-view',

    data () {
      return {
        doc: {
          title: 'Dialog',
          component: 'VDialog',
          edit: 'DialogsView',
          desc: `<p>The <code>v-dialog</code> component inform users about a specific task and may contain critical information, require decisions, or involve multiple tasks. Use dialogs sparingly because they are interruptive.</p>
          <p>If you want to programmatically open or close the dialog, you can do so by using <code>v-model</code> with a boolean value. Keep in mind, if the trigger for the opening is not contained within the <code>activator</code> slot and is done so by a click, you must <strong>stopPropagation</strong> to avoid immediately triggering a close event.</p>`,
          examples: [
            { header: 'Simple dialogs', file: 'dialogs/simple', desc: `Choosing an option immediately commits the option and closes the menu. Touching outside of the dialog, or pressing Back, cancels the action and closes the dialog.` },
            { header: 'Without activator', file: 'dialogs/without-activator', desc: `If for some reason you are unable to use the activator slot, be sure to add the <code>.stop</code> modifier to the event that triggers the dialog.` },
            { header: 'Modal', file: 'dialogs/modal', desc: `Similar to a Simple Dialog, except that it's not dismissed when touching outside.` },
            { header: 'Fullscreen', file: 'dialogs/fullscreen', desc: `Due to limited space, full-screen dialogs may be more appropriate for mobile devices than dialogs used on devices with larger screens.` },
            { header: 'Form', file: 'dialogs/form', desc: `Just a simple example of a form in a dialog.` },
            { header: 'Scrollable', file: 'dialogs/scrollable', desc: `Example of a dialog with scrollable content.` },
            { header: 'Overflowed', file: 'dialogs/overflowed', desc: `Modals that do not fit within the available window space will scroll the container.` },
          ],
          props: {
            'v-dialog': {
              shared: ['overlay', 'detachable', 'dialog'],
              params: [
                [
                  'fullscreen',
                  'Boolean',
                  'False',
                  'Changes layout for fullscreen display'
                ],
                [
                  'origin',
                  'String',
                  'center center',
                  'Defines transition origin'
                ],
                [
                  'transition',
                  '[Boolean, String]',
                  'v-dialog-transition',
                  'Defines show/hide transition. Set to false for no transition'
                ]
              ],
              model: {
                type: ['Boolean'],
                default: 'False'
              }
            }
          },
          slots: {
            'v-dialog': {
              shared: ['default'],
              params: [
                [
                  'activator',
                  'The element that will activate the dialog'
                ]
              ]
            }
          }
        }
      }
    }
  }
</script>

<template lang="pug">
  component-view(:doc="doc")
</template>

<script>
  export default {
    data: () => ({
      doc: {
        component: 'VBottomSheet',
        edit: 'BottomSheetssView',
        title: 'Bottom sheets',
        desc: 'The bottom sheet is a modified <code>v-dialog</code> that slides from the bottom of the screen, similar to a <code>v-bottom-nav</code>. Whereas a bottom navigation component is for buttons and specific application level actions, a bottom sheet can contain anything.',
        examples: [
          { header: 'Standard display', file: 'bottom-sheets/1', desc: `Here we display an example list of actions that could be present in an application.` },
          { header: 'Inset bottom sheets', file: 'bottom-sheets/2', desc: `Bottom sheets can be inset, reducing their maximum width on desktop to 70%. This can be further reduced manually using the <code>width</code> prop. We also showcase dynamic class binding using the Vuetify breakpoint object.` }
        ],
        props: {
          'v-bottom-sheets': {
            shared: ['dialog'],
            model: {
              type: 'Boolean',
              default: 'False'
            },
            params: [
              [
                'inset',
                'Boolean',
                'False',
                'Reduces the dialog content maximum width to 70%'
              ]
            ]
          }
        },
        slots: {
          'v-bottom-sheets': {
            shared: ['default']
          }
        }
      }
    })
  }
</script>

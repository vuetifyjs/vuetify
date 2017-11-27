export default {
  header: 'Alert',
  headerText: 'The `v-alert` component is used to convey information to the user.',
  components: ['v-alert'],
  examples: [{
    contextual: {
      header: 'Contextual',
      desc: 'The `v-alert` component comes in 4 variations, **success**, **info**, **warning** and **error**. These have default icons assigned which can be changed and represent different actions.'
    },
    closable: {
      header: 'Closable',
      desc: 'Using `v-model` you can control the state of the Alert. If you don\'t want to assign a v-model and just display the alert, you can simply assign the prop `value`.'
    },
    icon: {
      header: 'Custom Icon / No Icon',
      desc: `You can easily assign a custom icon or remove it all together.`
    },
    transition: {
      header: 'Display transition',
      desc: `You can apply a custom transition to the show/hide of the alert.`
    }
  }],
  props: {
    dismissible: 'Specifies that the Alert can be closed',
    icon: 'Designates a specific icon',
    outline: 'Makes background transparent and colors both the border and text',
    type: 'Specifies a contextual color, [success, info, warning, error]. Has a pre-defined icon and color'
  }
}

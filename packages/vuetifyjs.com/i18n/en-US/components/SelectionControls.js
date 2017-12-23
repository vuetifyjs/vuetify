export default {
  header: 'Selection controls',
  headerText: 'Selection control components allow a user to select options. These components **must** be used with the <code>v-model</code> prop as they do not maintain their own state.',
  components: ['v-radio-group', 'v-radio', 'v-switch'],
  examples: [{
    example: {
      header: 'Default examples',
      desc: ''
    },
    checkboxesBoolean: {
      header: "Checkboxes - Boolean",
      desc: ''
    },
    checkboxesArray: {
      header: "Checkboxes - Array",
      desc: ''
    },
    checkboxesStates: {
      header: "Checkboxes - States",
      desc: ''
    },
    checkboxesColors: {
      header: "Checkboxes - Colors",
      desc: 'Checkboxes can be colored by using any of the builtin colors and contextual names using the color prop.'
    },
    radiosDefault: {
      header: "Radios - Default",
      desc: 'Radio-groups are by default mandatory. This can be changed with the <code>mandatory</code> prop.'
    },
    radiosDirection: {
      header: "Radios - Direction",
      desc: 'Radio-groups can be presented either as a row or a column, using their respective props. The default is as a column.'
    },
    radiosColors: {
      header: "Radios - Colors",
      desc: 'Radios can be colored by using any of the builtin colors and contextual names using the color prop.'
    },
    switchesBoolean: {
      header: "Switches - Boolean",
      desc: ''
    },
    switchesArray: {
      header: "Switches - Array",
      desc: ''
    },
    switchesStates: {
      header: "Switches - States",
      desc: ''
    },
    switchesColors: {
      header: "Switches - Colors",
      desc: 'Switches can be colored by using any of the builtin colors and contextual names using the color prop.'
    }
  }],
  props: {
    indeterminate: 'Sets an indeterminate state for the checkbox',
    inputValue: 'The **v-model** bound value',
    value: 'Sets the value of the selection control component'
  }
}

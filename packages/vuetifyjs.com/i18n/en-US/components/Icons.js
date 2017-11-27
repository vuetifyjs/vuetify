export default {
  header: 'Icon',
  headerText: 'The <code>v-icon</code> component provides a large set of glyphs to provide context to various aspects of your application. Vuetify icons utilize Google\\\'s Material Icons font library. For a list of all available icons, visit the official <a href="https://material.io/icons/" target="_blank" rel="noopener">Material Icons</a> page.',
  components: ['v-icon'],
  examples: [{
    standard: {
      header: 'Standard',
      desc: 'Icons come in two themes (light and dark), and four different sizes (standard, medium, large, and x-large).'
    },
    fontAwesome: {
      header: 'Font Awesome',
      desc: '<a href="http://fontawesome.io/icons/">Font Awesome</a> is also supported. Simply use the <code>fa-</code> prefixed icon name. Please note that you still need to include the Font Awesome icons in your project.'
    },
    mdi: {
      header: 'Material Design Icons',
      desc: '<a href="https://materialdesignicons.com/">Material Design Icons</a> is also supported. Simply use the <code>mdi-</code> prefixed icon name. Please note that you still need to include the MDI icons in your project.'
    },
    color: {
      header: 'Color',
      desc: 'Using color helpers you can change the color of an icon from the standard dark and light themes.'
    },
    buttons: {
      header: 'Buttons',
      desc: 'Icons can be used inside of buttons to add emphasis to the action.'
    }
  }]
}

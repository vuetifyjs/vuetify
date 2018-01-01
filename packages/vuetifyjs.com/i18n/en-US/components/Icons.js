export default {
  header: 'Icon',
  headerText: 'The `v-icon` component provides a large set of glyphs to provide context to various aspects of your application. Vuetify icons utilize Google\'s Material Icons font library. For a list of all available icons, visit the official <a href="https://material.io/icons/" target="_blank" rel="noopener">Material Icons</a> page.',
  components: ['v-icon'],
  examples: [{
    standard: {
      header: 'Standard',
      desc: 'Icons come in two themes (light and dark), and four different sizes (standard, medium, large, and x-large).'
    },
    fontAwesome: {
      header: 'Font Awesome',
      desc: '[Font Awesome](http://fontawesome.io/icons/) is also supported. Simply use the `fa-` prefixed icon name. Please note that you still need to include the Font Awesome icons in your project.'
    },
    mdi: {
      header: 'Material Design Icons',
      desc: '[Material Design Icons](https://materialdesignicons.com/) is also supported. Simply use the `mdi-` prefixed icon name. Please note that you still need to include the MDI icons in your project.'
    },
    color: {
      header: 'Color',
      desc: 'Using color helpers you can change the color of an icon from the standard dark and light themes.'
    },
    buttons: {
      header: 'Buttons',
      desc: 'Icons can be used inside of buttons to add emphasis to the action.'
    }
  }],
  props: {
    disabled: 'Mixins.Input.props.disabled',
    large: 'Makes the icon large **(36px)**',
    left: 'Places icon on the left, when used inside a button',
    medium: 'Makes the icon medium **(28px)**',
    right: 'Places icon on the right, when used inside a button',
    small: 'Makes the icon small **(16px)**',
    xLarge: 'Makes the icon extra large **(40px)**'
  }
}

<template lang="pug">
  component-view(v-bind:doc="doc")
    v-alert(color="warning" icon="priority_high" value)
      span Custom font libraries such as Icomoon can overwrite the <code>icon-</code> class and cause issues. While other icon packages can work, the only official support is for Material Icons, FontAwesome, and Material Design Icons.
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Icons',
          component: 'VIcon',
          edit: 'IconView',
          desc: 'The <code>v-icon</code> component provides a large set of glyphs to provide context to various aspects of your application. Vuetify icons utilize Google\'s Material Icons font library. For a list of all available icons, visit the official <a href="https://material.io/icons/" target="_blank" rel="noopener">Material Icons</a> page.',
          examples: [
            { header: 'Standard', file: 'icons/standard', desc: 'Icons come in two themes (light and dark), and four different sizes (standard, medium, large, and x-large).' },
            { header: 'Font Awesome', file: 'icons/font-awesome', desc: '<a href="http://fontawesome.io/icons/">Font Awesome</a> is also supported. Simply use the <code>fa-</code> prefixed icon name. Please note that you still need to include the Font Awesome icons in your project.' },
            { header: 'Material Design Icons', file: 'icons/mdi', desc: '<a href="https://materialdesignicons.com/">Material Design Icons</a> is also supported. Simply use the <code>mdi-</code> prefixed icon name. Please note that you still need to include the MDI icons in your project.' },
            { header: 'Color', file: 'icons/color', desc: 'Using color helpers you can change the color of an icon from the standard dark and light themes.' },
            { header: 'Buttons', file: 'icons/buttons', desc: 'Icons can be used inside of buttons to add emphasis to the action.' }
          ],
          props: {
            'v-icon': {
              shared: ['colorable', 'theme'],
              params: [
                [
                  'disabled',
                  'Boolean',
                  'False',
                  'Disables the icon, fading the color'
                ],
                [
                  'medium',
                  'Boolean',
                  'False',
                  'Medium size'
                ],
                [
                  'large',
                  'Boolean',
                  'False',
                  'Large size'
                ],
                [
                  'x-large',
                  'Boolean',
                  'False',
                  'Extra-Large size'
                ],
                [
                  'left',
                  'Boolean',
                  'False',
                  'Places icon on the left, when used inside a button'
                ],
                [
                  'right',
                  'Boolean',
                  'False',
                  'Places icon on the right, when used inside a button'
                ],
                [
                  'light',
                  'Boolean',
                  'False',
                  'Applies the light theme (default dark)'
                ]
              ]
            }
          }
        }
      }
    }
  }
</script>

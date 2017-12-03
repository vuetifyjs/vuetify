<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Bottom navigation',
          edit: 'BottomNavigationView',
          component: 'bottom-navigation/BottomNavigation.js',
          desc: `The <code>v-bottom-nav</code> is an alternative to the sidebar. It is primarily used on mobile and comes in two variants, icons and text, and shift.`,
          examples: [
            { header: 'Icons and text', file: 'bottom-navigation/1', desc: `While the bottom nav is meant to be used with the <code>vue-router</code>, you can also programmatically control the active state of the buttons by using a <code>v-model</code>.` },
            { header: 'Color & shift', file: 'bottom-navigation/2', desc: `When using a colored background, it is recommended to use the <code>light</code> prop. The <code>shift</code> prop will hide the button text until active. Keep in mind, <code>v-btn</code> text is required to be wrapped in a <code>&lt;span&gt;</code> tag.` },
            { header: 'Toggle', file: 'bottom-navigation/3', desc: `As with other Vuetify components, you can control the display state with <code>v-model</code>.` },
          ],
          props: {
            'v-bottom-navigation': {
              model: {
                type: '*'
              },
              params: [
                [
                  'absolute',
                  'Boolean',
                  'False',
                  'Change the position from fixed to absolute'
                ],
                [
                  'shift',
                  'Boolean',
                  'False',
                  'Hide text of button when not active'
                ]
              ]
            }
          },
          slots: {
            'v-bottom-navigation': {
              shared: ['default']
            }
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
  #bottom-navigation-view
    .bottom-nav
      z-index: 1
</style>

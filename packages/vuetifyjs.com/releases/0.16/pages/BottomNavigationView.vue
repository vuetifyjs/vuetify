<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Bottom nav',
          edit: 'BottomNavigationView',
          component: 'VBottomNav',
          desc: `The <code>v-bottom-nav</code> is an alternative to the sidebar. It is primarily used on mobile and comes in two variants, icons and text, and shift.`,
          examples: [
            { header: 'Icons and text', file: 'bottom-navigation/icons-and-text', desc: `While the bottom nav is meant to be used with the <code>vue-router</code>, you can also programmatically control the active state of the buttons by using the <code>active.sync</code> prop. You can change a button's value by using its <code>value</code> attribute.` },
            { header: 'Color & shift', file: 'bottom-navigation/color-and-shift', desc: `When using a colored background, it is recommended to use the <code>light</code> prop. The <code>shift</code> prop will hide the button text until active. Keep in mind, <code>v-btn</code> text is required to be wrapped in a <code>&lt;span&gt;</code> tag.` },
            { header: 'Toggle', file: 'bottom-navigation/toggle', desc: `As with other Vuetify components, you can control the display state with <code>v-model</code>.` },
          ],
          props: {
            'v-bottom-nav': {
              shared: ['colorable'],
              model: {
                type: ['Boolean'],
                default: 'False'
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
                ],
                [
                  'active',
                  'String, Number',
                  '-',
                  'The non-reactive version of <code>active.sync</code>. This will not update your bound value when changed internally.'
                ],
                [
                  'active.sync',
                  'String, Number',
                  '-',
                  'Holds the value of the currently active button. If the button has no value supplied, its index will be used instead.'
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

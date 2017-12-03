<template lang="pug">
  component-view(v-bind:doc="doc" id="menus-view")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Menu',
          component: 'VMenu',
          edit: 'MenusView',
          desc: 'The <code>v-menu</code> component shows a menu at the position of the element used to activate it.',
          examples: [
            { header: 'Activator', file: 'menus/activator', desc: 'Remember to put the element that activates the menu in the <code>activator</code> slot.' },
            { header: 'Absolute position', file: 'menus/absolute', desc: 'Menus can also be placed absolutely on top of the activator element using the <code>absolute</code> prop. Try clicking anywhere on the image.' },
            { header: 'Absolute position without activator', file: 'menus/absolute-without-activator', desc: 'Menus can also be used without an activator by using <code>absolute</code> together with the props <code>position-x</code> and <code>position-y</code>. Try right-clicking anywhere on the image.' },
            { header: 'Hover', file: 'menus/hover', desc: 'Menus can be accessed using hover instead of clicking with the <code>open-on-hover</code> prop.' },
            { header: 'Menus', file: 'menus/menus', desc: 'Menus can be placed within almost any component.' },
            { header: 'Custom transitions', file: 'menus/custom-transition', desc: `Vuetify comes with 3 standard transitions, <strong>scale</strong>, <strong>slide-x</strong> and <strong>slide-y</strong>. You can also create your own and pass it as the transition argument. For an example of how the stock transitions are constructed, visit <a href="https://github.com/vuetifyjs/vuetify/blob/master/src/util/helpers.js#L13" target="_blank" rel="noopener">here</a>.` },
            { header: 'Popover menu', file: 'menus/popover', desc: 'A menu can be configured to be static when opened, allowing it to function as a popover. This can be useful when there are multiple interactive items within the menu contents.' }
          ],
          props: {
            'v-menu': {
              shared: ['menu', 'delayable', 'lazy'],
              model: {
                type: ['Boolean'],
                default: 'False'
              },
              params: [
                [
                  'absolute',
                  'Boolean',
                  'False',
                  'Position the menu absolutely, useful for context menus'
                ],
                [
                  'fixed',
                  'Boolean',
                  'False',
                  ''
                ],
                [
                  'auto',
                  'Boolean',
                  'false',
                  ''
                ],
                [
                  'full-width',
                  'Boolean',
                  'False',
                  'Changes the menu display to block, useful for filling available width in forms'
                ],
                [
                  'offset-x',
                  'Boolean',
                  'False',
                  'Offset the menu on the x-axis. Works in conjunction with direction left/right'
                ],
                [
                  'offset-y',
                  'Boolean',
                  'False',
                  'Offset the menu on the y-axis. Works in conjunction with direction top/bottom'
                ],
                [
                  'disabled',
                  'Boolean',
                  'False',
                  'Disables the menu'
                ],
                [
                  'max-height',
                  '[Number, String]',
                  'auto',
                  'The maximum height of the menu, will overflow-y with scroll if content is too large'
                ],
                [
                  'open-on-hover',
                  'Boolean',
                  'False',
                  'Designates whether menu should open on activator hover'
                ],
                [
                  'open-on-click',
                  'Boolean',
                  'True',
                  'Designates whether menu should open on activator click'
                ],
                [
                  'close-on-click',
                  'Boolean',
                  'True',
                  'Designates if menu should close on outside-activator click'
                ],
                [
                  'close-on-content-click',
                  'Boolean',
                  'True',
                  'Designates if menu should close when its content is clicked'
                ],
                [
                  'origin',
                  'String',
                  'top left',
                  'Set the transform-origin of the transition'
                ],
                [
                  'transition',
                  'String',
                  'v-menu-transition',
                  'Set the transition component'
                ],
                [
                  'z-index',
                  '[Number, String]',
                  '6',
                  'Specify the z-index of the menu, useful when stacking multiple layers of components such as <code>v-dialog</code> with an inner <code>v-menu</code>'
                ]
              ]
            }
          },
          slots: {
            'v-menu': {
              shared: ['default'],
              params: [
                [
                  'activator',
                  'The element that will activate the menu'
                ]
              ]
            }
          }
        }
      }
    }
  }
</script>

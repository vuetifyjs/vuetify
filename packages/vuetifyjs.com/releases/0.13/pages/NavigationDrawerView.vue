<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>

  export default {
    data () {
      return {
        doc: {
          title: 'Navigation drawer',
          edit: 'NavigationDrawer',
          component: 'navigation-drawer',
          desc: `The <code>v-navigation-drawer</code> component is what your users will utilize to navigate through the application. The navigation-drawer is pre-configured to work with or without <strong>vue-router</strong> right out the box.`,
          examples: [
            { header: 'Google keep', file: 'navigation-drawers/1' },
            { header: 'Google contacts', file: 'navigation-drawers/2' },
            { header: 'Modern YouTube', file: 'navigation-drawers/3' }
          ],
          props: {
            'v-navigation-drawer': {
              shared: ['theme', 'overlay'],
              model: {
                type: ['Boolean'],
                default: 'True'
              },
              params: [
                [
                  'absolute',
                  'Boolean',
                  'False',
                  'Sets the sidebar position to absolute',
                ],
                [
                  'clipped',
                  'Boolean',
                  'False',
                  'A clipped drawer rests under the application toolbar',
                ],
                [
                  'disable-route-watcher',
                  'Boolean',
                  'False',
                  'Disables opening of Sidebar when route changes'
                ],
                [
                  'enable-resize-watcher',
                  'Boolean',
                  'False',
                  'Will automatically open/close drawer when resized depending if mobile or desktop.'
                ],
                [
                  'height',
                  'String',
                  '100%',
                  'Sets height of the sidebar',
                ],
                [
                  'floating',
                  'Boolean',
                  'False',
                  'A floating drawer has no visible container (no border-right)'
                ],
                [
                  'mini-variant.sync',
                  'Boolean',
                  'False',
                  'Condenses sidebar width',
                ],
                [
                  'permanent',
                  'Boolean',
                  'False',
                  'The drawer remains visible regardless of screen size'
                ],
                [
                  'persistent',
                  'Boolean',
                  'False',
                  'A persistent drawer can be opened or closed'
                ],
                [
                  'right',
                  'Boolean',
                  'False',
                  'Places the sidebar on the right'
                ],
                [
                  'temporary',
                  'Boolean',
                  'False',
                  'A temporary drawer sits above its application and uses a scrim (overlay) to darken the background',
                ],
              ]
            }
          },
          slots: {
            'v-navigation-drawer': {
              shared: ['default']
            }
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
  #navigation-drawer-view
    .navigation-drawer
      z-index: 0 !important
</style>

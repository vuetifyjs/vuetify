<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>

  export default {
    data () {
      return {
        doc: {
          title: 'Toolbar',
          component: 'toolbar',
          edit: 'ToolbarsView',
          desc: 'The <code>v-toolbar</code> component is pivotol to any gui, as it generally is the primary source of site navigation. The toolbar component works great in cojunction with a sidebar for hiding links and presenting an activator to open the sidebar on mobile.',
          examples: [
            { header: 'Default', file: 'toolbar/1', desc: 'A toolbar is a flexible container that can be utilized in a number of ways. By default, the toolbar is 64px high on desktop, 56px high on mobile portrait and 48px high on mobile landscape. These can be overwritten using the <code>dense</code> and <code>prominent</code> props.' },
            { header: 'App bar', file: 'toolbar/2', desc: 'An App bar is the primary toolbar of your application. It can contain icons, menus and more.' },
            { header: 'App bar with extension', file: 'toolbar/3', desc: 'An extension can be used that creates a much more prominent bar. If a title is placed within the extension, it will automatically be shifted to the right to match the normal locationit would be at in the main bar.' },
            { header: 'Column width with hierarchy', file: 'toolbar/4', desc: 'Toolbars come in 2 variants, light and dark. Light toolbars have dark tinted buttons and dark text whereas Dark toolbars have white tinted buttons and white text.' },
            { header: 'Flexible toolbar and card toolbar', file: 'toolbar/5', desc: 'With a few custom styles, you can easily create your amazing user interfaces.' },
            { header: 'Floating with search', file: 'toolbar/6', desc: 'A floating toolbar can be placed over the content that it references.' },
            { header: 'Detached toolbar palette', file: 'toolbar/7', desc: 'Create unique customized interfaces combining multiple components.' },
            { header: 'Variations', file: 'toolbar/8', desc: 'An app-bar has multiple variations that can be applied with themes and helper classes. These range from light and dark themes, colored and transparent.' },
            { header: 'Prominent toolbars', file: 'toolbar/9', desc: 'Prominent toolbars add a slot where you can placed elements in the extended area. The content and extension areas will be locked to 64px in height.' },
            { header: 'Dense toolbars', file: 'toolbar/10', desc: 'Dense toolbars reduce their height to 48px. This is also the default behavior for mobile landscape orientation.' },
            { header: 'Dense prominent toolbars', file: 'toolbar/11', desc: 'You can combine both the prominent and dense to extend a smaller variant of the toolbar.' },
            { header: 'Scrolling techniques', file: 'toolbar/14', desc: 'A toolbar can transition off screen when scrolling. Here we demonstrate how you can specify the scroll target (default is window). Keep in mind, for this example there is special markup that will not be required in your application.' },
            { header: 'App bar with menu', file: 'toolbar/12', desc: 'You can combine both the prominent and dense' },
            { header: 'System bars - status/window', file: 'toolbar/13', desc: 'System bars are useful for notification icons on mobile and desktop.' }
          ],
          props: {
            'v-toolbar': {
              shared: ['theme'],
              params: [
                [
                  'card',
                  'Boolean',
                  'False',
                  'Inherits border radius when used within a <code>v-card</code>'
                ],
                [
                  'extended',
                  'Boolean',
                  'False',
                  'Force the toolbar to generate the extension without using the slot'
                ],
                [
                  'dense',
                  'Boolean',
                  'False',
                  'Reduces the height of the toolbar content and extension'
                ],
                [
                  'fixed',
                  'Boolean',
                  'False',
                  'Sets the position of the toolbar to fixed'
                ],
                [
                  'flat',
                  'Boolean',
                  'False',
                  'Removes the toolbar box-shadow'
                ],
                [
                  'absolute',
                  'Boolean',
                  'False',
                  'Sets the position of the toolbar to absolute'
                ],
                [
                  'floating',
                  'Boolean',
                  'False',
                  'Makes the toolbar inline'
                ],
                [
                  'prominent',
                  'Boolean',
                  'False',
                  'Increases the height of the toolbar content and extension'
                ],
                [
                  'scroll-off-screen',
                  'Boolean',
                  'False',
                  'Will transition the toolbar off screen when scrolling down'
                ],
                [
                  'scroll-target',
                  'String',
                  'window',
                  'Assign the scroll target for scroll-off-screen'
                ],
                [
                  'scroll-threshold',
                  'Number',
                  '100',
                  'The amount of scroll distance down before the toolbar uses scroll-off-screen'
                ]
              ]
            },
            'v-system-bar': {
              shared: ['theme'],
              params: [
                [
                  'lights-out',
                  'Boolean',
                  'False',
                  'Reduces the system bar opacity'
                ],
                [
                  'status',
                  'Boolean',
                  'False',
                  'Reduces the system bar height'
                ],
                [
                  'window',
                  'Boolean',
                  'False',
                  'Increases the system bar height'
                ]
              ]
            }
          },
          slots: {
            'v-toolbar': {
              default: true
            },
            'v-system-bar': {
              default: true
            }
          },
          functional: {
            'v-toolbar': {
              params: [
                [
                  'v-toolbar-items',
                  '.toolbar__items'
                ],
                [
                  'v-toolbar-title',
                  '.toolbar__title'
                ],
                [
                  'v-toolbar-side-icon',
                  '.toolbar__side-icon'
                ]
              ]
            }
          },
          slots: {
            'v-toolbar': {
              shared: ['default']
            },
            'v-toolbar-item': {
              shared: ['default']
            }
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
  #toolbar
    .component-example
      position: relative
      z-index: 1

    .toolbar
      height: 64px !important
      margin: 1rem 0

  #toolbar-image
    height: 300px
    width: 100%

    .toolbar
      margin: 0
</style>

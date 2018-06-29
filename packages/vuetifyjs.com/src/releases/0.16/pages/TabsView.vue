<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>

  export default {
    name: 'tabs-view',

    data () {
      return {
        doc: {
          component: 'VTab',
          edit: 'TabsView',
          title: 'Tabs',
          desc: 'The <code>v-tabs</code> component is used for hiding content behind a selectable item. This can also be used as a pseudo-navigation for a page, where the tabs are links and the tab-items are the content.',
          examples: [
            { header: 'Toolbar tabs', file: 'tabs/toolbar', desc: 'The <code>v-tabs</code> component is highly customizable to suit your needs. You can get and set the currently active tab by using the <code>v-model</code> prop on the <code>v-tabs</code> component.' },
            { header: 'Centered tabs', file: 'tabs/centered', desc: 'Tabs can be centered by using the <code>centered</code> prop. Here we have also applied the <code>fixed</code> prop which gives all tab items a fixed size, regardless of content.' },
            { header: 'Content', file: 'tabs/content', desc: 'Tabs are not the only thing you can put inside the <code>v-tabs</code> component. In this example we\'ve also added a toolbar.' },
            { header: 'With search', file: 'tabs/search', desc: 'Here is another example of additional content inside the <code>v-tabs</code> component.' },
            { header: 'Icons', file: 'tabs/icons', desc: 'By using the <code>icons</code> prop you can add icons to each tab item.' },
            { header: 'Desktop tabs', file: 'tabs/desktop' },
            { header: 'Grow', file: 'tabs/grow', desc: 'The <code>grow</code> prop will make the tab items take up all available space.' },
            { header: 'Pagination', file: 'tabs/pagination', desc: 'If the tab items overflow their container, pagination controls will appear.' },
            { header: 'Disabled scroll', file: 'tabs/disabled-scroll', desc: 'You can disable the pagination controls by setting the <code>scrollable</code> prop to <code>false</code>. This also has the effect of removing the margins around the tab item container.' }
          ],
          props: {
            'v-tabs': {
              params: [
                [
                  'centered',
                  'Boolean',
                  'False',
                  'Centers the tabs'
                ],
                [
                  'fixed',
                  'Boolean',
                  'False',
                  'Items have a fixed size'
                ],
                [
                  'grow',
                  'Boolean',
                  'False',
                  'Items fill available space'
                ],
                [
                  'icons',
                  'Boolean',
                  'False',
                  'Applies the tabs--icons class'
                ],
                [
                  'scrollable',
                  'Boolean',
                  'True',
                  'Displays pagination controls when content overflows'
                ],
                [
                  'mobile-break-point',
                  '[Number, String]',
                  '1280',
                  'Sets the designated mobile breakpoint'
                ]
              ],
              model: {
                type: ['String'],
                default: '-',
                description: 'Current selected tab'
              }
            },
            'v-tabs-bar': {
              shared: ['theme'],
              params: []
            },
            'v-tabs-items': {
              params: [
                [
                  'cycle',
                  'Boolean',
                  'False',
                  'Will go to the first or last tab when swiped at the start or end of items'
                ],
                [
                  'touchless',
                  'Boolean',
                  'False',
                  'Remove touch functionality from component'
                ]
              ]
            },
            'v-tabs-item': {
              shared: ['router'],
              params: [
              ]
            },
            'v-tabs-content': {
              params: [
                [
                  'id',
                  'String',
                  'Required',
                  'The content id'
                ],
                [
                  'transition',
                  'String',
                  'v-tab-transition',
                  'Sets the default transition'
                ],
                [
                  'reverse-transition',
                  'String',
                  'v-tab-reverse-transition',
                  'Sets the reverse transition'
                ],
                [
                  'lazy',
                  'Boolean',
                  'False',
                  'Will not render contents until is active for the first time'
                ],
                //  Not implemented yet
                //  [
                //   'touchless',
                //   'Boolean',
                //   'False',
                //   'Remove mobile touch functionality'
                // ]
              ]
            },
            'v-tabs-slider': {
              shared: ['colorable']
            }
          },
          events: {
            'v-tabs': {
              params: [
                ['input', 'String', 'Current active tab'],
              ]
            },
          },
          slots: {
            'v-tabs': {
              shared: ['default']
            },
            'v-tabs-items': {
              shared: ['default']
            },
            'v-tabs-bar': {
              shared: ['default']
            }
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
  #components-tabs-view
    .tabs
      margin: 1rem 0
</style>

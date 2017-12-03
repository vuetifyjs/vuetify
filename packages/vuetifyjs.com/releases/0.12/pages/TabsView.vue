<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>

  export default {
    name: 'tabs-view',

    data () {
      return {
        doc: {
          component: 'tabs',
          edit: 'TabsView',
          title: 'Tabs',
          desc: 'The <code>v-tabs</code> component is used for hiding content behind a selectable item. This can also be used as a psuedo-navigation for a page, where the tabs are links and the tab-items are the content.',
          examples: [
            { header: 'Mobile tabs', file: 'tabs/1' },
            { header: '', file: 'tabs/2' },
            { header: '', file: 'tabs/3' },
            { header: '', file: 'tabs/4' },
            { header: '', file: 'tabs/5' },
            { header: 'Desktop tabs', file: 'tabs/6' },
            { header: '', file: 'tabs/7' }
          ],
          props: {
            'v-tabs': {
              shared: ['theme'],
              params: [
                [
                  'centered',
                  'Boolean',
                  'False',
                  'Centers the tabs'
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
                  'scroll-bars',
                  'Boolean',
                  'False',
                  'Displays scrollbars when content overflows'
                ]
              ],
              model: {
                type: ['String'],
                default: '-',
                description: 'Current selected tab'
              }
            },
            'v-tabs-item': {
              shared: ['router'],
              params: [
                [
                  'activeClass',
                  'String',
                  'toolbar__item--active',
                  'Class to apply for the active toolbar item'
                ]
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
                ]
              ]
            }
          },
          functional: {
            'v-tabs': {
              params: [
                [
                  'v-tabs-slider',
                  '.tabs__slider'
                ],
                [
                  'v-tabs-bar',
                  '.tabs__bar'
                ]
              ]
            },
          },
          events: {
            'v-tabs': {
              params: [
                ['input', 'Object', 'Current active tab'],
              ]
            },
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

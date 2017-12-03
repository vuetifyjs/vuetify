<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Grid list',
          component: 'VGrid',
          edit: 'GridListView',
          desc: 'Grid lists are an addon for the <code>v-container</code> component that add gutter control between items.',
          examples: [
            { header: 'Grid lists', file: 'grid-lists/default', desc: `Grid lists augment the <code>v-container</code> component to allow for greater flexibility with gutters. It comes in 5 variants, from xs to xl and can be dynamically changed.` },
            { header: 'Grid lists', file: 'grid-lists/subheader', desc: `Grid lists will work seamlessly with your current grid implementation and allow you to create amazing user interfaces.` }
          ],
          props: {
            'v-container': {
              params: [
                [
                  'grid-list-{xs through xl}',
                  'Boolean',
                  'False',
                  'Sets the gutter between grid list items ranging from 2px to 24px'
                ]
              ]
            }
          },
          slots: {
            'v-container': {
              default: true
            }
          }
        }
      }
    }
  }
</script>

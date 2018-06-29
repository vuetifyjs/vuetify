<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Dividers',
          component: 'VDivider',
          edit: 'DividerView',
          desc: 'The <code>v-divider</code> component is used to separate sections of lists.',
          examples: [
            { header: 'Full bleed', file: 'dividers/full-bleed', desc: 'Full bleed dividers extend the entire content width.' },
            { header: 'Light and dark', file: 'dividers/light-and-dark', desc: 'Dividers have light and dark variants.' },
            { header: 'Inset dividers', file: 'dividers/inset', desc: 'Inset dividers are moved 72px to the right. This will cause them to line up with list items.' },
            { header: 'Subheaders and dividers', file: 'dividers/subheaders', desc: 'Subheaders can be lined up with inset dividers by using the same prop.' },
          ],
          props: {
            'v-divider': {
              shared: ['theme'],
              params: [
                [
                  'inset',
                  'Boolean',
                  'False',
                  'Adds indentation (72px)'
                ]
              ]
            }
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
  #divider-view
    .grid
      max-height: 500px
      overflow-y: auto

    .component-example
      position: relative
      z-index: 1

      .card
        max-width: 400px
        margin: 0 auto

      .image
        width: 100%

    .toolbar
      height: 64px
      min-height: none
</style>

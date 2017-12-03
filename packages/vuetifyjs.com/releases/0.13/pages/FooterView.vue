<template lang="pug">
  component-view(v-bind:doc="doc" id="footer")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Footer',
          component: 'footer',
          edit: 'FooterView',
          desc: 'The <code>v-footer</code> component is used for displaying general information that a user might want to access from any page within your site.',
          examples: [
            { header: 'Default', file: 'footer/1', desc: 'The footer component is just a basic container.' }
          ],
          props: {
            'v-footer': {
              params: []
            }
          },
          slots: {
            'v-footer': {
              shared: ['default']
            }
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
  #footer
    .component-example__container
      > div
        width: 100%
      
    footer
      max-height: 36px
</style>
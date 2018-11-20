<template lang="pug">
  component-view(v-bind:doc="doc" id="footer-view")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Footer',
          component: 'VFooter',
          edit: 'FooterView',
          desc: 'The <code>v-footer</code> component is used for displaying general information that a user might want to access from any page within your site.',
          examples: [
            { header: 'Default', file: 'footer/default', desc: 'The footer component is just a basic container.' }
          ],
          props: {
            'v-footer': {
            shared: ['app', 'theme', 'colorable'],
              params: [
                [
                  'absolute',
                  'Boolean',
                  'False',
                  'Sets the position of the footer to absolute',
                ],
                [
                  'fixed',
                  'Boolean',
                  'False',
                  'Sets the position of the footer to fixed',
                ]
              ]
            }
          },
          slots: {
            'v-footer': {
              shared: ['default', 'colorable']
            }
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
  #footer-view
    .component-example__container
      > div
        width: 100%

    footer
      min-height: 36px
</style>

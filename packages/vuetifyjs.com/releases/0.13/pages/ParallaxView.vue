<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    name: 'parallax-view',

    data () {
      return {
        doc: {
          component: 'parallax',
          edit: 'ParallaxView',
          title: 'Parallax',
          desc: 'The <code>v-parallax</code> component creates a 3d effect that makes an image appear to scroll slower than the window.',
          examples: [
            { header: 'Default', file: 'parallax/1', desc: 'A parallax causes a shift in a background image when the user scrolls the page.' },
            { header: 'With content', file: 'parallax/2', desc: 'You can also place any content inside of the parallax. This allows you to use the parallax as a hero image.' },
            { header: 'Custom height', file: 'parallax/3', desc: 'You can specify a custom height on a parallax. Keep in mind this can break the parallax if your image is not sized properly' }
          ],
          props: {
            'v-parallax': {
              params: [
                [
                  'height',
                  'Number',
                  '500',
                  'The height of the parallax container'
                ],
                [
                  'src',
                  'String',
                  'Required',
                  'The image to parallax'
                ]
              ]
            }
          }
        }
      }
    },

    mounted () {
      this.$emit('view', this.meta())
    },

    preFetch () {
      return this.methods.meta()
    },

    methods: {
      meta () {
        return {
          title: 'Parallax Component | Vuetify.js',
          h1: 'Parallax',
          description: 'Parallax component for Vuetify Framework',
          keywords: 'vuetify, parallax, components'
        }
      }
    }
  }
</script>

<style lang="stylus">
</style>

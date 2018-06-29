<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    name: 'parallax-view',

    data () {
      return {
        doc: {
          component: 'VParallax',
          edit: 'ParallaxView',
          title: 'Parallax',
          desc: 'The <code>v-parallax</code> component creates a 3d effect that makes an image appear to scroll slower than the window.',
          examples: [
            { header: 'Default', file: 'parallax/default', desc: 'A parallax causes a shift in a background image when the user scrolls the page.' },
            { header: 'With content', file: 'parallax/content', desc: 'You can also place any content inside of the parallax. This allows you to use the parallax as a hero image.' },
            { header: 'Custom height', file: 'parallax/custom-height', desc: 'You can specify a custom height on a parallax. Keep in mind this can break the parallax if your image is not sized properly' },
            { header: 'Jumbotron', file: 'parallax/jumbotron', new: '0.15.3', desc: 'The parallax can have its effect disabled to be used as a standard <strong>jumbotron</strong>' }
          ],
          props: {
            'v-parallax': {
              params: [
                [
                  'alt',
                  'String',
                  'null',
                  'Attaches an alt property to the parallax image'
                ],
                [
                  'jumbotron',
                  'Boolean',
                  'False',
                  'Removes parallax effect'
                ],
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
    }
  }
</script>

<style lang="stylus">
</style>

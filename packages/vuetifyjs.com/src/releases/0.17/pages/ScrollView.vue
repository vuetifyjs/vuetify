<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Scrolling',
          desc: 'The <code>v-scroll</code> directive allows you to provide callbacks when the window or a specifically defined element are scrolled.',
          props: {
            'v-scroll': {
              params: [
                [
                  'callback',
                  'Function',
                  'Required',
                  'The function to be called on scroll',
                ],
                [
                  'target',
                  'String',
                  'window',
                  'The DOM element to bind the scroll event listener',
                ],
                [
                  'options',
                  'Object',
                  '{ passive: true }',
                  'The options to be passed to the event listener of the binding target'
                ]
              ]
            }
          },
          examples: [
            { header: 'Default', file: 'scroll/default', desc: 'The default behavior is to bind to the window. If no additional configuration options are needed, you can simple pass your callback function.' },
            { header: 'Scroll with options', file: 'scroll/options', desc: 'For a more fine tuned approach, you can designate the target to bind the scroll event listener.' }
          ]
        }
      }
    }
  }
</script>

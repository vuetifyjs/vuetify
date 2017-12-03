<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Touch Support',
          desc: 'The <code>v-touch</code> directive allows you to capture swipe gestures and apply directional callbacks.',
          props: {
            'v-touch': {
              params: [
                [
                  '[up, down, left, right]',
                  'Function',
                  '-',
                  'Assign a callback based upon a swipe direction. Pairing x-axis and y-axis callbacks is not recommended at this time.',
                ],
                [
                  '[move, start, end]',
                  'Function',
                  '-',
                  'Assign a callback when the touch event starts, ends, and while it is in progress',
                ]
              ]
            }
          },
          examples: [
            { header: 'Default', file: 'touch/default', desc: 'On a mobile device, try swiping in various directions.' }
          ]
        }
      }
    }
  }
</script>

<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Resize directive',
          edit: 'Resize',
          directive: 'resize',
          desc: 'The <code>v-resize</code> directive can be used for calling specific functions when the window resizes.',
          props: {
            'v-resize': {
              params: [
                [
                  'value',
                  'Function',
                  'Required',
                  'Function to be called on window resize',
                ]
              ]
            }
          },
          examples: [
            { header: 'Default', file: 'resize/default', desc: 'Resize your window and observe the values change.' }
          ]
        }
      }
    }
  }
</script>

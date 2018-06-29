<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            text: 'foo',
            value: 1
          },
          {
            text: 'foobar',
            value: 2
          }
        ],
        doc: {
          title: 'Tooltip',
          desc: 'The <code>v-tooltip</code> directive is useful for conveying information when a user hovers over an element.',
          props: {
            'v-tooltip': {
              params: [
                [
                  'modifiers',
                  'String',
                  'Required',
                  'top, right, bottom, left',
                ],
                [
                  'html',
                  'String',
                  'Required',
                  'The content for the tooltip',
                ],
                [
                  'visible',
                  'Boolean',
                  'True',
                  'Tooltip object property for determining visibility, see example #2'
                ]
              ]
            }
          },
          examples: [
            { header: 'Default', file: 'tooltips/1', desc: 'Tooltips can be applied to any element that does not use the <code>:before</code> pseudo element' },
            { header: 'Visibility', file: 'tooltips/2', desc: 'Tooltips can be disabled using the <code>visible</code> property value in the tooltip object.' }
          ]
        }
      }
    }
  }
</script>

<style lang="stylus"
       scoped
>
  .btn
    margin: 1rem
</style>

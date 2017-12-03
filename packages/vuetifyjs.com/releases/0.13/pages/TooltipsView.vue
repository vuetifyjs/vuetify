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
                ]
              ]
            }
          },
          examples: [
            { header: 'Default', file: 'tooltips/1', desc: 'Tooltips can be applied to any element that does not use the <code>:before</code> psuedo element' }
          ]
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
          title: 'Tooltip Directive | Vuetify.js',
          h1: 'Tooltips',
          description: 'Tooltip directive for Vuetify Framework',
          keywords: 'vuetify, tooltips, directives'
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

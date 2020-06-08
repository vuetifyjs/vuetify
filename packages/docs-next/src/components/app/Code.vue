<template>
  <v-sheet
    class="app-code overflow-hidden"
    color="grey lighten-5"
    rounded
  >
    <slot />

    <app-copy-btn
      :target="target"
      class="mr-n2 mt-n2"
    />
  </v-sheet>
</template>

<script>
  export default {
    name: 'AppCode',

    methods: {
      target () {
        return this.$el.querySelector('pre')
      },
    },
  }
</script>

<style lang="sass">
  .app-code
    position: relative
    padding: 12px 50px 12px 16px
    margin: 16px 0

    pre, code
      background: transparent
      font-size: 1rem
      font-weight: 300
      margin: 0 !important

    > pre
      border-radius: inherit

    code[class*=language],
    pre[class*=language]
      background: transparent
      color: #000000DE
      hyphens: none
      padding: 0
      tab-size: 4
      text-align: left
      white-space: pre
      word-break: normal
      word-spacing: normal
      word-wrap: normal

    pre[class*=language]
      &::after
        bottom: 0.75rem
        color: hsla(0, 0%, 19%, 0.5)
        font-family: inherit
        font-size: 0.7rem
        font-weight: 700
        position: absolute
        right: 1rem
        text-transform: uppercase

    pre.language-bash::after
      content: 'sh'

    pre.language-html::after
      content: 'html'

    pre.language-js::after
      content: 'js'
</style>

<template>
  <v-sheet
    class="overflow-hidden app-code"
    rounded
  >
    <slot />

    <app-copy-btn
      :target="target"
      class="mr-n2"
    />
  </v-sheet>
</template>

<script>
  export default {
    name: 'AppCode',

    inheritAttrs: false,

    data: () => ({ target: null }),

    mounted () {
      this.target = this.$el.querySelector('pre')
    },
  }
</script>

<style lang="sass">
  .app-code
    position: relative

    > pre
      border-radius: inherit

    code
      padding-left: 0

    code[class*=language],
    pre[class*=language]
      font-size: 1rem
      font-weight: 500
      position: relative

    pre[class*=language]
      &::after
        color: hsla(0, 0%, 19%, 0.5)
        font-family: inherit
        font-size: 0.7rem
        font-weight: 700
        position: absolute
        right: 16px
        text-transform: uppercase
        bottom: 8px

    pre.language-bash::after
      content: 'sh'

    pre.language-html::after
      content: 'html'

    pre.language-js::after
      content: 'js'
</style>

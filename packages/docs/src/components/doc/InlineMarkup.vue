<template>
  <prism
    class="v-inline-markup"
    :language="lang"
    :code="code"
    inline
  />
</template>

<script>
  export default {
    name: 'InlineMarkup',

    components: {
      Prism: () => import('vue-prism-component'),
    },

    props: {
      lang: {
        type: String,
        default: undefined,
      },
      code: {
        type: String,
        required: true,
      },
    },
  }
</script>

<style lang="sass">
.v-inline-markup
  padding: 0 !important
  background: transparent !important
  font-family: 'Roboto Mono', monospace !important
  color: rgba(0, 0, 0, .87) !important

  &::before, &::after
    display: none

  align-items: center
  box-shadow: none
  border-radius: 4px
  position: relative
  overflow-x: auto
  overflow-y: hidden
  background: #2d2d2d
  color: #fff
  font-weight: 300
  font-size: 15px
  line-height: 1.55

  .token.punctuation
    color: #bd4147

  .token.builtin, .token.keyword
    color: #75aad2

  .token.operator
    color: #9f9f9f

</style>

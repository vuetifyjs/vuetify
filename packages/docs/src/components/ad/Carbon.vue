<template>
  <v-card
    :class="isLoading && 'documentation-ad--is-loading'"
    class="px-4 pt-4 mt-4 mb-8 documentation-ad transition-swing"
    color="grey lighten-3"
    flat
    height="133"
    width="362"
    style="padding-bottom: 10px;"
  >
    <div id="carbonads"><!-- Ad --></div>
  </v-card>
</template>

<script>
  export default {
    name: 'AdCarbon',

    data: () => ({
      isLoading: true,
      script: null,
    }),

    mounted () {
      // Do nothing on ssr
      if (this.$ssrContext) return

      const script = document.createElement('script')

      script.type = 'text/javascript'
      script.id = '_carbonads_js'
      script.src = '//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=vuetifyjscom'
      script.onload = () => (this.isLoading = false)

      this.$el && this.$el.append(script)

      this.script = script
    },

    beforeDestroy () {
      this.script && this.$el && this.$el.removeChild(this.script)
    },
  }
</script>

<style lang="sass">
  .documentation-ad
    opacity: 1

    &--is-active
      opacity: 0

    .carbon-wrap
      display: flex

    .carbon-text,
    .carbon-poweredby
      max-width: 200px
      padding: 0 0 0 16px
      text-decoration: none

    .carbon-img img
      border-radius: 4px 0 0 4px

    .carbon-text
      color: #333
      font-size: 0.875rem

    .carbon-poweredby
      color: rgba(0, 0, 0, .56)
      font-size: 0.75rem
      position: absolute
      right: 16px
      bottom: 16px
</style>

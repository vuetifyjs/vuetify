<template>
  <v-card
    class="pa-4 d-inline-block"
    color="grey lighten-3"
    flat
    min-height="133"
    min-width="362"
  >
    <div id="carbonads"><!-- Ad --></div>
  </v-card>
</template>

<script>
  export default {
    name: 'AdCarbon',

    mounted () {
      // Do nothing on ssr
      if (this.$ssrContext) return

      const script = document.createElement('script')

      script.type = 'text/javascript'
      script.id = '_carbonads_js'
      script.src = '//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=vuetifyjscom'

      this.$el && this.$el.append(script)

      this.isLoading = false
    },
  }
</script>

<style lang="sass">
  #carbonads
    .carbon-wrap
      display: flex

      img
        margin-bottom: -6px

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

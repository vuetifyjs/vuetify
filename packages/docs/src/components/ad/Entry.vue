<template>
  <v-card
    class="px-4 pt-4 my-8 documentation-ad-entry"
    flat
    height="133"
    outlined
    width="362"
    style="padding-bottom: 10px;"
  >
    <div :id="id"><!-- Ad --></div>
  </v-card>
</template>

<script>
  export default {
    name: 'AdEntry',

    props: {
      id: {
        type: String,
        default: 'carbonads',
      },
      scriptId: {
        type: String,
        default: '_carbonads_js',
      },
    },

    data: () => ({
      script: null,
    }),

    mounted () {
      // Do nothing on ssr
      if (this.$ssrContext) return
      if (document.getElementById(this.scriptId)) return

      const script = document.createElement('script')

      script.type = 'text/javascript'
      script.id = this.scriptId
      script.src = '//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=vuetifyjscom'

      this.$el && this.$el.append(script)

      this.script = script
    },

    beforeDestroy () {
      this.script && this.$el && this.$el.removeChild(this.script)
    },
  }
</script>

<style lang="sass">
  .documentation-ad-entry
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

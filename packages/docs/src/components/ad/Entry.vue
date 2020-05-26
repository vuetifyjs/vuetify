<template>
  <v-card
    v-if="!hasError"
    :class="$vuetify.theme.dark ? 'entry--dark' : undefined"
    class="px-4 pt-4 my-8 documentation-ad-entry"
    flat
    height="133"
    outlined
    width="362"
    style="padding-bottom: 10px;"
  >
    <div :id="id"><!-- Ad --></div>
  </v-card>

  <ad-card v-else />
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
      hasError: false,
      script: null,
    }),

    mounted () {
      // Do nothing on ssr
      if (this.$ssrContext) return
      if (typeof document === 'undefined' || document.getElementById(this.scriptId)) return

      const script = document.createElement('script')

      script.type = 'text/javascript'
      script.id = this.scriptId
      script.src = '//cdn.carbonads.com/carbon.js?serve=CKYI5KQY&placement=vuetifyjscom'
      script.onerror = () => (this.hasError = true)

      this.$el && this.$el.appendChild(script)

      this.script = script
    },
  }
</script>

<style lang="sass">
  .documentation-ad-entry
    opacity: 1

    #carbonads_1,
    #carbonads_2
      display: none

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

    &.entry--dark
      .carbon-poweredby,
      .carbon-text
        color: #FFFFFF

    .v-list-item__subtitle
      text-overflow: initial
      white-space: initial
</style>

<template>
  <v-system-bar
    v-if="hasPromotion && false"
    class="cm-system-bar"
    app
    dark
    height="66"
  >
    <a
      class="cm-banner"
      href="https://cutt.ly/0JmRXHr"
      rel="noopener"
      target="_blank"
      @click="onClick"
    />

    <v-btn
      fab
      small
      absolute
      right
      @click="onClose"
    >
      <v-icon class="mr-0">$clear</v-icon>
    </v-btn>
  </v-system-bar>
</template>

<script>
  // Utilities
  import { differenceInHours } from 'date-fns'
  import { get, sync } from 'vuex-pathify'

  export default {
    name: 'DefaultSystemBar',

    computed: {
      last: sync('user/last@promotion'),
      name: get('route/name'),
      hasPromotion () {
        const now = Date.now()

        return (
          differenceInHours(now, Number(this.last)) > 1
        )
      },
    },

    methods: {
      onClick () {
        this.$gtag.event('click', {
          event_category: 'vuetify-banner',
          event_label: 'ui-lib-nitro',
          value: this.name.toLowerCase(),
        })
      },
      onClose () {
        this.last = Date.now()
      },
    },
  }
</script>

<style lang="sass">
  .cm-banner
    background-position: center
    background-repeat: no-repeat
    background-size: contain
    bottom: 0
    display: block
    height: 100%
    left: 0
    overflow: hidden
    position: absolute
    right: 0
    text-indent: 100%
    top: 0
    white-space: nowrap

  .cm-banner
    background-image: url(https://vuetifyjs.b-cdn.net/store/promotions/road-to-vuetify-3-ui-lib/road-to-vuetify-ui-lib-3.png)
    background-size: cover

    @media (min-width: 437px)
      background-image: url(https://vuetifyjs.b-cdn.net/store/promotions/road-to-vuetify-3-ui-lib/road-to-vuetify-ui-lib-2.png)

    @media (min-width: 992px)
      background-image: url(https://vuetifyjs.b-cdn.net/store/promotions/road-to-vuetify-3-ui-lib/road-to-vuetify-ui-lib-1.png)
</style>

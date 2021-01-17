<template>
  <v-system-bar
    v-if="false"
    app
    color="#1D1D22"
    dark
    height="84"
  >
    <a
      class="cm-banner"
      href="https://store.vuetifyjs.com/?utm_source=vuetify&utm_medium=banner&utm_campaign=cybermonday"
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
  import { differenceInHours, isBefore } from 'date-fns'
  import { get, sync } from 'vuex-pathify'

  export default {
    name: 'DefaultSystemBar',

    computed: {
      last: sync('user/last@promotion'),
      name: get('route/name'),
      hasPromotion () {
        const now = Date.now()

        return (
          isBefore(now, new Date(2020, 12, 1)) &&
          differenceInHours(now, Number(this.last)) > 1
        )
      },
    },

    methods: {
      onClick () {
        this.$gtag.event('click', {
          event_category: 'vuetify-banner',
          event_label: 'cyber-monday-2020',
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
    background-color: #1D1D22
    background-image: url(https://vuetifyjs.b-cdn.net/docs/images/promotions/cyber-monday-2020/cm-mobile.svg)
    background-position: center
    background-repeat: no-repeat
    background-size: contain
    bottom: 0
    display: block
    height: inherit
    left: 0
    overflow: hidden
    position: absolute
    right: 0
    text-indent: 100%
    top: 0
    white-space: nowrap

  @media (min-width: 660px)
    .cm-banner
      background-image: url(https://cdn.vuetifyjs.com/docs/images/promotions/cyber-monday-2020/cm-tablet.svg)

  @media (min-width: 992px)
    .cm-banner
      background-image: url(https://cdn.vuetifyjs.com/docs/images/promotions/cyber-monday-2020/cm-desktop.svg)
</style>

<template>
  <v-system-bar
    v-if="hasPromotion"
    app
    color="#1D1D22"
    dark
    height="84"
  >
    <a
      class="bf-banner"
      href="https://store.vuetifyjs.com/?utm_source=vuetify&utm_medium=banner&utm_campaign=blackfriday"
      rel="noopener"
      target="_blank"
      @click="onClick"
    />
  </v-system-bar>
</template>

<script>
  // Utilities
  // import { differenceInHours } from 'date-fns'
  import { sync } from 'vuex-pathify'

  export default {
    name: 'HomeSystemBar',

    computed: {
      last: sync('user/last@promotion'),
      hasPromotion () {
        return true

        // return differenceInHours(Date.now(), Number(this.last)) > 1
      },
    },

    methods: {
      onClick () {
        this.last = Date.now()

        this.$gtag.event('click', {
          event_category: 'vuetify-banner',
          event_label: 'black-friday-2020',
          value: 'home',
        })
      },
    },
  }
</script>

<style lang="sass">
  .bf-banner
    background-color: #1D1D22
    background-image: url(https://cdn.vuetifyjs.com/docs/images/promotions/black-friday-2020/bf-mobile.svg)
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
    .bf-banner
      background-image: url(https://cdn.vuetifyjs.com/docs/images/promotions/black-friday-2020/bf-tablet.svg)

  @media (min-width: 992px)
    .bf-banner
      background-image: url(https://cdn.vuetifyjs.com/docs/images/promotions/black-friday-2020/bf-desktop.svg)
</style>

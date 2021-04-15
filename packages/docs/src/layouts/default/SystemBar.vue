<template>
  <v-system-bar
    v-if="hasPromotion"
    :style="{ background: `linear-gradient(to right, #04091D 45%, ${hasAltPromotion ? '#1D408C' : '#7A3FAB'})` }"
    app
    dark
    height="76"
  >
    <a
      :class="[`cm-banner${hasAltPromotion ? '-alt' : ''}`]"
      href="https://vueschool.io/free-weekend/?friend=vuetify"
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
  // import { differenceInHours, isBefore } from 'date-fns'
  import { get, sync } from 'vuex-pathify'

  export default {
    name: 'DefaultSystemBar',

    computed: {
      last: sync('user/last@promotion'),
      name: get('route/name'),
      hasAltPromotion () {
        return true
      },
      hasPromotion () {
        return false
        // const now = Date.now()

        // return (
        //   isBefore(now, new Date(2021, 3, 29)) &&
        //   differenceInHours(now, Number(this.last)) > 1
        // )
      },
    },

    methods: {
      onClick () {
        this.$gtag.event('click', {
          event_category: 'vuetify-banner',
          event_label: 'vue-masterschool-free',
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
  .cm-banner,
  .cm-banner-alt
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

  .cm-banner
    background-image: url(https://cdn.vuetifyjs.com/docs/images/promotions/free-vue-masterclass/vueschool-mobile.png)

    @media (min-width: 660px)
      background-image: url(https://cdn.vuetifyjs.com/docs/images/promotions/free-vue-masterclass/vueschool-tablet.png)

    @media (min-width: 992px)
      background-image: url(https://cdn.vuetifyjs.com/docs/images/promotions/free-vue-masterclass/vueschool-desktop.png)

  .cm-banner-alt
    background-image: url(https://cdn.vuetifyjs.com/docs/images/promotions/free-vue-masterclass/vs-2-mobile.png)

    @media (min-width: 660px)
      background-image: url(https://cdn.vuetifyjs.com/docs/images/promotions/free-vue-masterclass/vs-2-tablet.png)

    @media (min-width: 992px)
      background-image: url(https://cdn.vuetifyjs.com/docs/images/promotions/free-vue-masterclass/vs-2-desktop.png)
</style>

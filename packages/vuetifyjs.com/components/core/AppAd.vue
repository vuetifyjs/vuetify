<template lang="pug">
  li
    v-card(
      flat
      height="205px"
      img="/static/doc-images/ads/store-ad-1.png"
      tile
      width="130px"
      :to="{ name: 'store/Index' }"
    ).mb-3
</template>

<script>
  export default {
    name: 'AppAd',

    mounted () {
      // if (process.env.NODE_ENV === 'development') return

      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = '//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=vuetifyjscom'
      script.id = '_carbonads_js'

      this.$el.append(script)
    }
  }
</script>

<style lang="stylus">
  #carbonads
    display: flex
    justify-content: flex-start
    // position: fixed
    // bottom: 140px
    // right: 24px
    background-color: hsla(0, 0%, 98%, .9)
    z-index: 3
    margin-bottom: 48px

    .duck
      display: none

    a
      color: rgba(#000, .87)
      display: inline-block
      max-width: 130px
      text-decoration: none

      &.carbon-poweredby
        color: rgba(#000, .56)
        text-transform: uppercase
        letter-spacing: 1px
        font-size: 9px !important

      &.carbon-text
        display: block
        font-size: 12px
        margin-bottom: .5em

  // .ads
  //   @media $display-breakpoints.lg-and-up
  //     padding: 0 !important
  //     flex-basis: 0 !important

  //   @media only screen and (max-width: 1550px)
  //     #carbonads
  //       position: initial
  //       margin-bottom: 25px

  //   @media $display-breakpoints.xs-only
  //     #carbonads
  //       margin-bottom: 50px
</style>

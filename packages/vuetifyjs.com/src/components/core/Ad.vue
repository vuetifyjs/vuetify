<template lang="pug">
  li
    v-card(
      flat
      height="205px"
      img="https://cdn.vuetifyjs.com/images/ads/store-ad-1.png"
      tile
      width="130px"
      :to="{ name: 'store/Front' }"
    )
    div#codefund_ad
</template>

<script>
  export default {
    name: 'AppAd',

    mounted () {
      // if (process.env.NODE_ENV === 'development') return

      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = '//codefund.io/scripts/50bda123-f278-4574-88e2-c7401f869261/embed.js'

      this.$el.append(script)
    }
  }
</script>

<style lang="stylus">
  #cf_ad
    max-width: 160px

    .cf-wrapper
      border-radius: 4px

      .cf-img-wrapper
        margin-bottom: 16px
</style>

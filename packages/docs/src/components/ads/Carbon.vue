<template>
  <!-- Without flex, causes jump during init -->
  <div
    v-if="!error"
    class="d-flex"
  >
    <ads-base
      max-width="360"
      border
    >
      <ads-script
        id="carbonads"
        script-id="_carbonads_js"
        src="//cdn.carbonads.com/carbon.js?serve=CKYI5KQY&placement=vuetifyjscom"
        @script:error="error = true"
      />
    </ads-base>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import AdsBase from './Base.vue'
  import AdsScript from './Script.vue'

  export default defineComponent({
    name: 'CarbonAd',

    components: { AdsBase, AdsScript },

    data: () => ({ error: false }),
  })
</script>

<style lang="sass">
  #carbonads
    width: 100%

    > span
      display: flex
      position: relative
      flex-wrap: wrap

    .carbon-wrap
      display: flex
      flex-wrap: wrap

    .carbon-text,
    .carbon-poweredby
      max-width: 200px
      text-decoration: none

    .carbon-img
      display: inline-flex
      margin: 1rem auto

      img
        border-radius: 4px 0 0 4px
        max-height: 100px

    .carbon-text
      color: inherit
      font-size: 0.70rem
      padding: 0 0.475rem
      margin: 0 auto
      text-align: center

    .carbon-poweredby
      color: inherit
      font-size: 0.625rem
      font-weight: 400
      letter-spacing: 0.075rem
      margin: 0 auto
      opacity: .56
      padding: 8px 0 16px 0
      text-align: center
      text-transform: uppercase

  .v-app-ad.theme--light
    .carbon-poweredby
      color: rgba(0, 0, 0, .6)

  .v-app-ad.theme--dark
    .carbon-poweredby
      color: inherit
</style>

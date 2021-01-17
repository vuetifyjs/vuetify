<template>
  <!-- Without flex, causes jump during init -->
  <div
    v-if="!error"
    class="d-flex"
  >
    <app-ad
      max-width="360"
      outlined
    >
      <ad-script
        id="carbonads"
        script-id="_carbonads_js"
        src="//cdn.carbonads.com/carbon.js?serve=CKYI5KQY&placement=vuetifyjscom"
        @script:error="error = true"
      />
    </app-ad>
  </div>

  <random-ad v-else />
</template>

<script>
  export default {
    name: 'CarbonAd',

    data: () => ({ error: false }),
  }
</script>

<style lang="sass">
  #carbonads
    width: 100%

    > span
      display: flex
      position: relative

    .carbon-wrap
      display: flex

    .carbon-text,
    .carbon-poweredby
      max-width: 200px
      padding: 0 0 0 16px
      text-decoration: none

    .carbon-img
      display: inline-flex
      margin: 0.5rem

      img
        border-radius: 4px 0 0 4px
        max-height: 100px

    .carbon-text
      color: inherit
      font-size: 0.75rem
      padding: 0.475rem

    .carbon-poweredby
      bottom: 0.5rem
      font-size: 0.625rem
      font-weight: 400
      letter-spacing: 0.09375rem
      position: absolute
      right: 0.5rem
      text-transform: uppercase

  .v-app-ad.theme--light
    .carbon-poweredby
      color: rgba(0, 0, 0, .6)

  .v-app-ad.theme--dark
    .carbon-poweredby
      color: inherit
</style>

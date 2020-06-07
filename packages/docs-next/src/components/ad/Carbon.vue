<template>
  <app-ad
    v-if="!error"
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

    .carbon-text
      color: #000000DE
      font-size: 0.75rem
      padding: 0.475rem

    .carbon-poweredby
      bottom: 0.5rem
      color: rgba(0, 0, 0, .6)
      font-size: 0.625rem
      font-weight: normal
      letter-spacing: 0.09375rem
      position: absolute
      right: 0.5rem
      text-transform: uppercase
</style>

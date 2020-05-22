<template>
  <base-ad
    id="carbonads"
    script-id="_carbonads_js"
    src="//cdn.carbonads.com/carbon.js?serve=CKYI5KQY&placement=vuetifyjscom"
  />
</template>

<script>
  export default {
    name: 'CarbonAd',
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
      color: #304455
      font-size: 0.8125rem
      padding: 0.475rem

    .carbon-poweredby
      color: rgba(0, 0, 0, .56)
      font-size: 0.625rem
      font-weight: 500
      position: absolute
      right: 0.5rem
      text-transform: uppercase
      bottom: 0.5rem

    &.entry--dark
      .carbon-poweredby,
      .carbon-text
        color: #FFFFFF

    .v-list-item__subtitle
      text-overflow: initial
      white-space: initial
</style>

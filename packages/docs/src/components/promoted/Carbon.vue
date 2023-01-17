<template>
  <!-- Without flex, causes jump during init -->
  <div
    v-if="!error"
    class="d-flex"
  >
    <promoted-base
      :key="route.path"
      border
      max-width="360"
    >
      <promoted-script
        id="carbonads"

        script-id="_carbonads_js"
        src="//cdn.carbonads.com/carbon.js?serve=CKYI5KQY&placement=vuetifyjscom"
        @script:error="error = true"
      />
    </promoted-base>
  </div>
</template>

<script setup>
  // Components
  import PromotedBase from './Base.vue'
  import PromotedScript from './Script.vue'

  // Composables
  import { useRoute } from 'vue-router'

  // Utiltlies
  import { ref } from 'vue'

  const error = ref(false)
  const route = useRoute()
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

<template>
  <promoted-base
    ref="script"
    :class="[
      isDark ? 'theme--dark' : 'theme--light',
    ]"
    border
    min-height="118"
    max-width="360"
  >
    <promoted-script
      id="carbonads-script"
      script-id="_carbonads_js"
      src="//cdn.carbonads.com/carbon.js?serve=CWYDC27W&placement=v3vuetifyjscom"
      @script:error="error = true"
    />
  </promoted-base>
</template>

<script setup lang="ts">
  // Components
  import PromotedBase from './Base.vue'
  import PromotedScript from './Script.vue'

  // Composables
  import { useTheme } from 'vuetify'

  // Utilities
  import { computed, onBeforeUnmount, ref } from 'vue'

  const error = ref(false)
  const script = ref(null)

  onBeforeUnmount(() => {
    const script = document.getElementById('carbonads-script')

    script?.remove()
  })

  const theme = useTheme()

  const isDark = computed(() => theme.current.value.dark)
</script>

<style lang="sass">
  #carbonads,
  #carbonads_1,
  #carbonads_2
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

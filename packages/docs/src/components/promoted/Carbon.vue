<template>
  <v-responsive
    class="align-center"
    min-height="118"
  >
    <template v-if="!error1 && !error2">
      <PromotedBase
        ref="script"
        :class="[
          isDark ? 'theme--dark' : 'theme--light',
        ]"
        max-width="360"
        border
      >
        <PromotedScript
          v-if="!error1"
          id="carbonads-script"
          script-id="_carbonads_js"
          src="//cdn.carbonads.com/carbon.js?serve=CWYDC27W&placement=v3vuetifyjscom"
          @script:error="error1 = true"
        />

        <PromotedScript
          v-if="error1"
          id="bsa-zone_1691166982595-9_123456"
          :src="`https://cdn4.buysellads.net/pub/vuetifyjs.js?${Date.now() % 600000}`"
          script-id="bsa-optimize"
          @script:error="error2 = true"
        />
      </PromotedBase>
    </template>

    <PromotionsPromotionCard v-else />
  </v-responsive>
</template>

<script setup lang="ts">
  const error1 = shallowRef(false)
  const error2 = shallowRef(false)
  const script = shallowRef(null)
  let timer = -1 as any

  function checkForElement (id: string, cb?: () => void) {
    return setTimeout(() => {
      if (document.getElementById(id)) return

      clearTimeout(timer)

      cb?.()
    }, 2000)
  }

  watch(error1, val => {
    if (!val) return

    timer = checkForElement('bsa-zone_1691166982595-9_123456', () => {
      error2.value = true
    })
  })

  onMounted(() => {
    timer = checkForElement('carbonads', () => {
      error1.value = true
    })
  })

  onBeforeUnmount(() => {
    document.getElementById('carbonads-script')?.remove()
    document.getElementById('bsa-zone_1691166982595-9_123456')?.remove()
  })

  onScopeDispose(() => {
    clearTimeout(timer)
  })

  const theme = useTheme()

  const isDark = computed(() => theme.current.value.dark)
</script>

<style lang="sass">
  @media only screen and (min-width: 0px) and (min-height: 0px)
    div[id^="bsa-zone_1691166982595-9_123456"]
      min-width: 300px
      min-height: 250px

  @media only screen and (min-width: 760px) and (min-height: 0px)
    div[id^="bsa-zone_1691166982595-9_123456"]
      min-width: 728px
      min-height: 90px

  #carbonads-script
    width: 100%

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

<template>
  <v-responsive
    class="align-center"
    min-height="118"
  >
    <template v-if="!error1">
      <PromotedBase
        ref="script"
        :class="[
          isDark ? 'theme--dark' : 'theme--light',
        ]"
        max-width="360"
        border
      >
        <PromotedScript
          id="carbonads-script"
          script-id="_carbonads_js"
          src="//cdn.carbonads.com/carbon.js?serve=CWYDC27W&placement=v3vuetifyjscom"
          @script:error="error1 = true"
        />
      </PromotedBase>
    </template>

    <VoPromotionsCardVuetify v-else />
  </v-responsive>
</template>

<script setup lang="ts">
  const error1 = shallowRef(false)
  const script = shallowRef(null)
  let timer = -1 as any

  function checkForElement (id: string, cb?: () => void) {
    return setTimeout(() => {
      if (document.getElementById(id)) return

      clearTimeout(timer)

      cb?.()
    }, 2000)
  }

  onMounted(() => {
    timer = checkForElement('carbonads', () => {
      error1.value = true
    })
  })

  onBeforeUnmount(() => {
    document.getElementById('carbonads-script')?.remove()
  })

  onScopeDispose(() => {
    clearTimeout(timer)
  })

  const theme = useTheme()

  const isDark = computed(() => theme.current.value.dark)
</script>

<style lang="sass">
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

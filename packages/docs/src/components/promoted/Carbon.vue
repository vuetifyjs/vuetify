<template>
  <v-responsive
    class="align-center"
    min-height="118"
  >
    <template v-if="!error1 && !error2">
      <promoted-base
        ref="script"
        :class="[
          isDark ? 'theme--dark' : 'theme--light',
        ]"
        border
        max-width="360"
      >
        <promoted-script
          id="carbonads-script"
          script-id="_carbonads_js"
          src="//cdn.carbonads.com/carbon.js?serve=CWYDC27W&placement=v3vuetifyjscom"
          @script:error="error1 = true"
        />

        <promoted-script
          v-if="error1"
          id="bsa-zone_1691166982595-9_123456"
          :src="`https://cdn4.buysellads.net/pub/vuetifyjs.js?${Date.now() % 600000}`"
          script-id="bsa-optimize"
          @script:error="error2 = true"
        />
      </promoted-base>
    </template>

    <promotion-card v-else />
  </v-responsive>

  <br>
</template>

<script setup lang="ts">
  // Components
  import PromotionCard from '@/components/promotions/PromotionCard.vue'
  import PromotedBase from './Base.vue'
  import PromotedScript from './Script.vue'

  // Composables
  import { useTheme } from 'vuetify'

  // Utilities
  import { computed, onBeforeUnmount, onMounted, shallowRef } from 'vue'

  const error1 = shallowRef(false)
  const error2 = shallowRef(false)
  const script = shallowRef(null)
  let timer1 = 0 as any
  let timer2 = 0 as any

  onBeforeUnmount(() => {
    document.getElementById('carbonads-script')?.remove()
    document.getElementById('bsa-zone_1691166982595-9_123456')?.remove()

    clearTimeout(timer1)
    clearTimeout(timer2)
  })

  onMounted(check1)

  function check1 () {
    timer1 = setTimeout(() => {
      if (document.getElementById('carbonads')) return

      clearTimeout(timer2)
      error1.value = true
      check2()
    }, 2000)
  }

  function check2 () {
    timer2 = setTimeout(() => {
      if (document.getElementById('bsa-zone_1691166982595-9_123456')) return

      error2.value = true
    }, 2000)
  }

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

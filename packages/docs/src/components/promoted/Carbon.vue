<template>
  <promoted-base
    v-if="!error"
    ref="script"
    :class="[
      isDark ? 'theme--dark' : 'theme--light',
    ]"
    border
    id="carbonContainer"
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

  <promoted v-else />

  <br>
</template>

<script setup lang="ts">
  // Components
  import Promoted from './Promoted.vue'
  import PromotedBase from './Base.vue'
  import PromotedScript from './Script.vue'

  // Composables
  import { useTheme } from 'vuetify'

  // Utilities
  import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

  const error = ref(false)
  const script = ref(null)

  onBeforeUnmount(() => {
    const script = document.getElementById('carbonads-script')

    script?.remove()
  })

  onMounted(() => {

    setTimeout(()=> {
      const isCarbonVisible = !!document.getElementById('carbonads');

      const optimizeEl = document.createElement("div");
      optimizeEl.id = "bsa-zone_1691166982595-9_123456";

      if(!isCarbonVisible) {
        document.querySelector("#sponsoredContainer").appendChild(optimizeEl);
        document.querySelector("#carbonContainer").remove();

        (function(){
          var bsa_optimize=document.createElement('script');
          bsa_optimize.type='text/javascript';
          bsa_optimize.async=true;
          bsa_optimize.src='https://cdn4.buysellads.net/pub/vuetifyjs.js?'+(new Date()-new Date()%600000);
          (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(bsa_optimize);
        })();
      }
    }, 2000)

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

<template>
  <!-- Without flex, causes jump during init -->
  <v-lazy
    v-if="!error"
    class="d-flex"
  >
    <promoted-base min-height="52" border variant="text">
      <promoted-script
        id="bsa-native"
        script-id="bsa-ad"
        src="//m.servedby-buysellads.com/monetization.js"
        @script:error="error = true"
        @script:load="onLoad"
      />
    </promoted-base>
  </v-lazy>

  <random v-else />
</template>

<script setup>
  // Components
  import PromotedBase from './Base.vue'
  import PromotedScript from './Script.vue'

  // Utiltlies
  import { ref } from 'vue'

  // Globals
  import { IS_PROD } from '@/util/globals'

  const error = ref(false)

  function onLoad () {
    window._bsa.init('custom', 'CKYD6KQN', 'placement:vuetifyjscom', {
      ignore: !IS_PROD ? 'yes' : undefined,
      target: '#bsa-native',
      // eslint-disable-next-line max-len
      template: '<a class="native-box" href="##statlink##"><div class="native-sponsor">Sponsor</div><div class="native-text"><strong>##company##</strong> — ##description##</div></a>',
    })
  }
</script>

<style lang="sass">
  #bsa-native
    .native-box
      align-items: center
      color: inherit
      display: flex
      height: 56px
      padding: 0 8px
      line-height: 1.2
      text-decoration: none

    .native-sponsor
      align-items: center
      background-color: #1867c0
      border-radius: 4px 0 0 4px
      color: #FFF
      display: inline-flex
      font-size: .825rem
      justify-content: center
      margin-right: 16px
      padding: 4px 8px
      text-decoration: none
      text-transform: uppercase

    .native-text
      font-size: .9rem
</style>

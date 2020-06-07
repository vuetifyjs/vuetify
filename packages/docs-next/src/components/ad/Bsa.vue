<template>
  <app-ad
    v-if="!error"
    compact
    outlined
  >
    <ad-script
      id="bsa-native"
      script-id="bsa-ad"
      src="//m.servedby-buysellads.com/monetization.js"
      @script:error="error = true"
      @script:load="onLoad"
    />
  </app-ad>

  <random-ad v-else />
</template>

<script>
  export default {
    name: 'BsaAd',

    data: () => ({ error: false }),

    methods: {
      onLoad () {
        window._bsa.init('custom', 'CKYD6KQN', 'placement:vuetifyjscom', {
          ignore: process.env.NODE_ENV === 'development' ? 'yes' : undefined,
          target: '#bsa-native',
          template: '<a class="native-box" href="##statlink##"><div class="native-sponsor">Sponsor</div><div class="native-text"><strong>##company##</strong> — ##description##</div></a>',
        })
      },
    },
  }
</script>

<style lang="sass">
  #bsa-native
    .native-box
      align-items: center
      display: flex
      height: 46px
      padding: 0 8px
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
      color: rgba(0, 0, 0, .87)
      font-size: .9rem
</style>

<template>
  <v-responsive v-show="isVisible !== false" min-height="61">
    <div
      v-show="isVisible"
      class="documentation-ad-exit"
    >
      <v-divider class="mt-4 mb-7" />

      <v-card
        class="pa-4"
        flat
        min-height="60"
        outlined
        style="padding-bottom: 10px;"
      >
        <div
          id="bsa-native"
          ref="exit"
        ><!-- Ad --></div>
      </v-card>
    </div>
  </v-responsive>
</template>

<script>
  export default {
    name: 'AdExit',

    data: () => ({
      isVisible: null,
      loadTimeout: 0,
      script: null,
    }),

    async mounted () {
      // Do nothing on ssr
      if (this.$ssrContext) return

      const script = document.createElement('script')

      script.type = 'text/javascript'
      script.src = '//m.servedby-buysellads.com/monetization.js'
      script.onload = this.onLoad

      this.$el && this.$el.append(script)

      this.script = script
    },

    beforeDestroy () {
      clearTimeout(this.loadTimeout)
    },

    methods: {
      async onLoad () {
        window._bsa.init('custom', 'CKYD6KQN', 'placement:vuetifyjscom', {
          ignore: process.env.NODE_ENV === 'development' ? 'yes' : undefined,
          target: '#bsa-native',
          template: '<a class="native-box" href="##statlink##"><div class="native-sponsor">Sponsor</div><div class="native-text"><strong>##company##</strong> — ##description##</div></a>',
        })

        // Sometimes ad doesn't load
        await new Promise(resolve => setTimeout(resolve, 500))

        this.isVisible = this.$refs.exit.children.length > 0
      },
    },
  }
</script>

<style lang="sass">
  .documentation-ad-exit
    .native-box
      align-items: center
      display: flex
      text-decoration: none

    .native-sponsor
      text-decoration: none
      background-color: #1867c0
      color: #FFF
      font-size: .825rem
      text-transform: uppercase
      display: inline-flex
      align-items: center
      justify-content: center
      padding: 4px 8px
      border-radius: 4px 0 0 4px
      margin-right: 16px

    .native-text
      color: rgba(0, 0, 0, .87)
</style>

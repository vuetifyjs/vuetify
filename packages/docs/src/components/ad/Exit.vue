<template>
  <v-responsive min-height="61">
    <div
      :class="$vuetify.theme.dark ? 'exit--dark' : undefined"
      class="documentation-ad-exit"
    >
      <v-divider class="mt-4 mb-7" />

      <v-card
        v-if="!hasError"
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

      <ad-card
        v-else
        dense
      />
    </div>
  </v-responsive>
</template>

<script>
  export default {
    name: 'AdExit',

    data: () => ({
      hasError: false,
      loadTimeout: 0,
      script: null,
    }),

    async mounted () {
      // Do nothing on ssr
      if (this.$ssrContext || typeof document === 'undefined') return

      const script = document.createElement('script')

      script.type = 'text/javascript'
      script.src = '//m.servedby-buysellads.com/monetization.js'
      script.onload = this.onLoad
      script.onerror = () => (this.hasError = true)

      this.$el && this.$el.appendChild(script)

      this.script = script
    },

    beforeDestroy () {
      clearTimeout(this.loadTimeout)
    },

    methods: {
      async onLoad () {
        typeof window !== 'undefined' &&
          window._bsa.init('custom', 'CKYD6KQN', 'placement:vuetifyjscom', {
            ignore: process.env.NODE_ENV === 'development' ? 'yes' : undefined,
            target: '#bsa-native',
            template: '<a class="native-box" href="##statlink##"><div class="native-sponsor">Sponsor</div><div class="native-text"><strong>##company##</strong> — ##description##</div></a>',
          })

        // Sometimes ad doesn't load
        await new Promise(resolve => setTimeout(resolve, 500))

        if (
          !this.$refs.exit ||
          !this.$refs.exit.children.length
        ) this.hasError = true
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

    &.exit--dark
      .native-text
        color: #FFFFFF
</style>

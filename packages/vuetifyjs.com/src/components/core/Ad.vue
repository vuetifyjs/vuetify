<template>
  <div id="ad__container">
    <v-system-bar
      v-if="viewport === 'xs'"
      v-show="$vuetify.breakpoint.xsOnly"
      :app="$vuetify.breakpoint.xsOnly"
      class="white"
      height="40"
    >
      <div :key="`${path}-xs`" :id="barId" />
    </v-system-bar>

    <v-bottom-nav
      v-else-if="viewport === 'sm'"
      :value="$vuetify.breakpoint.smOnly"
      app
      height="48"
    >
      <div :key="`${path}-sm`" :id="botId" />
    </v-bottom-nav>

    <v-navigation-drawer
      v-else-if="viewport === 'md'"
      :value="$vuetify.breakpoint.mdAndUp"
      app
      class="transparent pa-3"
      clipped
      floating
      right
      stateless
      width="192"
    >
      <no-ssr>
        <core-table-of-contents
          :offset="85"
          :threshold="50"
        />
      </no-ssr>
      <div :key="`${path}-md`" :id="navId" />
    </v-navigation-drawer>
  </div>
</template>

<script>
  // Mixins
  import ssrBootable from 'vuetify/es5/mixins/ssr-bootable'

  // Utilities
  import { mapState } from 'vuex'

  export default {
    name: 'AppAd',

    mixins: [ssrBootable],

    data: () => ({
      timeout: null,
      viewport: null
    }),

    computed: {
      ...mapState('route', ['path'])
    },

    watch: {
      isBooted (val) {
        if (val) this.init()
      },
      path () {
        if (typeof window === 'undefined') return

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => window._codefund.serve(), 300)
      },
      viewport (val) {
        const cfAd = 'codefund_ad'
        this.barId = val === 'xs' ? cfAd : 'ad__bar'
        this.botId = val === 'sm' ? cfAd : 'ad__bot'
        this.navId = val === 'md' ? cfAd : 'ad__nav'
      }
    },

    methods: {
      attachScript () {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = '//codefund.io/scripts/50bda123-f278-4574-88e2-c7401f869261/embed.js'

        this.$el.append(script)
      },
      init () {
        this.setViewport()
        this.attachScript()
      },
      setViewport () {
        const { xsOnly, smOnly } = this.$vuetify.breakpoint

        this.viewport = xsOnly ? 'xs' : smOnly ? 'sm' : 'md'
      }
    }
  }
</script>

<style lang="stylus">
  #ad__container
    #cf_ad
      .cf-wrapper
        border-radius: 4px

        .cf-img-wrapper
          margin-bottom: 16px

    .v-system-bar,
    .v-bottom-nav
      #codefund_ad
        height: 100%
        width: 100%

      .cf-img-wrapper
        display: none

      #cf_ad
        height: 100%
        margin: 0
        max-width: 100%

        .cf-powered-by
          margin-top: 0
          margin-left: auto

        > span > .cf-wrapper
          align-items: center
          display: flex
          height: 100%
          padding: 0

    .v-system-bar
      padding: 0

      #cf_ad
        > span > .cf-wrapper
          padding: 0 8px

          > a
            font-size: 12px

          a.cf-powered-by
            font-size: 9px

    .v-bottom-nav
      #cf_ad
        > span > .cf-wrapper
          .cf-text
            padding-right: 24px

          &:before
            background: #08c
            border-radius: 4px
            content: 'Advertiser'
            color: white
            font-size: 12px
            font-weight: 500
            margin: 0 8px
            padding: 4px
</style>

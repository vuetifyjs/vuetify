<template>
  <v-flex
    id="ad__container"
    shrink
  >
    <template v-if="shouldShowAd">
      <ad-system-bar v-if="viewport === 'xs' && $vuetify.breakpoint.xsOnly">
        <ad-shown :viewport="viewport" />
      </ad-system-bar>

      <ad-bottom-nav v-else-if="viewport === 'sm' && $vuetify.breakpoint.smOnly">
        <ad-shown :viewport="viewport" />
      </ad-bottom-nav>

      <ad-drawer v-else-if="viewport === 'md' && $vuetify.breakpoint.mdAndUp">
        <v-layout
          column
          fill-height
        >
          <v-flex
            xs12
            text-xs-center
          >
            <core-toc />
            <div class="my-3">
              <supporters-patrons
                compact
                tier="1"
              />
              <supporters-sponsor-btn small />
            </div>
          </v-flex>

          <ad-shown
            :viewport="viewport"
            class="mt-auto"
            style="margin-bottom: 72px;"
          />
        </v-layout>
      </ad-drawer>
    </template>
  </v-flex>
</template>

<script>
  // Mixins
  import ssrBootable from 'vuetify/es5/mixins/ssr-bootable'

  // Utilities
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'AppAd',

    mixins: [ssrBootable],

    data: () => ({
      timeout: null,
      viewport: null
    }),

    computed: {
      ...mapState('app', ['supporters']),
      ...mapState('route', ['path', 'name']),
      diamonds () {
        return this.supporters.diamond
      },
      shouldShowAd () {
        return (
          this.name &&
          this.name !== 'home/Home'
        )
      }
    },

    watch: {
      path: 'setViewport',
      isBooted: 'setViewport'
    },

    methods: {
      setViewport () {
        const { xsOnly, smOnly } = this.$vuetify.breakpoint

        this.viewport = xsOnly ? 'xs' : smOnly ? 'sm' : 'md'
      }
    }
  }
</script>

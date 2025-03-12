<template>
  <v-flex
    id="ad__container"
    shrink
  >
    <template v-if="shouldShowAd">
      <ad-drawer v-if="viewport === 'md' && $vuetify.breakpoint.mdAndUp">
        <v-layout
          column
          fill-height
        >
          <v-flex
            xs12
            text-xs-center
          >
            <core-toc />

            <a
              href="https://snips.vuetifyjs.com"
              rel="noopener noreferrer sponsored"
              target="_blank"
            >
              <v-img
                class="mx-auto"
                src="https://cdn.cosmicjs.com/f406ce60-2c4f-11ef-adb1-8b946b3a80e4-Snips-spot.png"
                style="width: 164px;"
              />
            </a>
          </v-flex>
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

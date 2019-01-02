<template>
  <v-flex id="ad__container" shrink>
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
            <h4 class="caption font-weight-bold grey--text">Diamond Sponsors</h4>
            <div class="my-3">
              <div
                v-for="diamond in diamonds"
                :key="diamond.name"
                class="text-xs-center mt-2"
              >
                <a
                  :href="diamond.href"
                  target="_blank"
                  rel="noopener"
                  @click="$ga.event('drawer', 'click', 'sponsor click', diamond.name)"
                >
                  <v-img
                    :src="`https://cdn.vuetifyjs.com/images/${diamond.logo}`"
                    :alt="diamond.Name"
                    contain
                    height="30"
                  />
                </a>
              </div>
            </div>
            <supporters-sponsor-btn small />
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
    mapGetters,
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
      ...mapGetters('app', ['supporters']),
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

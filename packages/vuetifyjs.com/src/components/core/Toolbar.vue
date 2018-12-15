<template>
  <v-toolbar
    id="app-toolbar"
    app
    clipped-left
    clipped-right
    class="elevation-6"
    color="primary"
    dark
    fixed
    height="58"
    extension-height="48"
  >
    <v-toolbar-side-icon
      class="hidden-md-and-up"
      @click="toggleDrawer"
    />

    <router-link
      :to="{ name: 'home/Home' }"
      class="mr-3"
    >
      <v-img
        alt="Vuetify Logo"
        src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
        contain
        transition="scale-transition"
        height="38px"
        width="38px"
      />
    </router-link>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        v-for="(item, i) in items"
        :key="i"
        :input-value="params.namespace === item.to.params.namespace"
        :to="item.to"
        flat
        style="min-width: 0;"
      >
        {{ item.text }}
      </v-btn>
    </v-toolbar-items>

    <v-spacer />

    <v-toolbar-items>
      <core-versions />
      <core-social />
      <core-locales />
      <core-github />
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  // Utilities
  import {
    mapMutations,
    mapState
  } from 'vuex'
  import languages from '@/data/i18n/languages.json'

  export default {
    name: 'CoreToolbar',

    data: vm => ({
      items: [
        {
          text: vm.$t('Vuetify.AppToolbar.docs'),
          to: {
            name: 'Documentation',
            params: {
              namespace: 'getting-started',
              page: 'quick-start'
            }
          }
        },
        {
          text: vm.$t('Vuetify.AppToolbar.framework'),
          to: {
            name: 'Documentation',
            params: {
              namespace: 'framework',
              page: 'a-la-carte'
            }
          }
        },
        {
          text: vm.$t('Vuetify.AppToolbar.components'),
          to: {
            name: 'Documentation',
            params: {
              namespace: 'components',
              page: 'api-explorer'
            }
          }
        },
        {
          text: vm.$t('Vuetify.AppToolbar.directives'),
          to: {
            name: 'Documentation',
            params: {
              namespace: 'directives',
              page: 'resizing'
            }
          }
        }
      ],
      languages
    }),

    computed: {
      ...mapState('route', ['params'])
    },

    methods: {
      ...mapMutations('app', ['toggleDrawer']),
      changeToRelease (release) {
        // Remove language setting
        const path = this.$route.fullPath.split('/')
          .slice(2)
          .join('/')
        window.location.href = `${window.location.origin}/releases/${release}/#/${path}`
      }
    }
  }
</script>

<style lang="stylus">
  #app-toolbar
    .v-toolbar__title
      margin-left .5em
      font-weight 300
      font-size 21px
      position relative
      top 1px

    .v-toolbar__items
      .v-btn
        text-transform capitalize
        font-size 16px
        font-weight 300

    .v-toolbar__extension
      padding: 0
</style>

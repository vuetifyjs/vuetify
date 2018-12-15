<template>
  <v-navigation-drawer
    v-model="inputValue"
    clipped
    app
  >
    <v-container
      fluid
      pb-0
    >
      <div class="text-xs-center">
        <h4 class="body-2 font-weight-bold grey--text">Premiere sponsor</h4>
        <span class="d-block mb-3 caption grey--text text--lighten-1">
          One spot available
        </span>

        <supporters-sponsor-btn
          large
          class="mb-4"
          href="https://www.patreon.com/join/vuetify"
        />

        <v-text-field
          id="search"
          key="search"
          ref="search"
          v-model="search"
          placeholder="Search"
          append-icon="search"
          clearable
          hide-details
          single-line
          solo
          light
        />
      </div>
    </v-container>

    <v-divider class="mt-3" />

    <v-layout pa-3>
      <a
        href="https://vuejobs.com/?utm_source=vuejobs&utm_medium=banner&utm_campaign=linking&ref=vuetifyjs.com"
        target="_blank"
        rel="noopener"
        class="d-inline-block"
        @click="$ga.event('drawer jobs click', 'click', 'vuejobs')"
      >
        <v-img
          src="https://cdn.vuetifyjs.com/images/affiliates/vuejobs-logo.svg"
          alt="VueJobs"
          title="VueJobs"
          contain
          height="18"
          width="60"
        />
      </a>
    </v-layout>
    <v-list
      class="pa-0"
      dense
      expand
    >
      <template v-for="(item, i) in items">
        <v-subheader
          v-if="item.header"
          :key="`subheader-${i}`"
          v-text="item.header"
        />
        <v-divider
          v-else-if="item.divider"
          :key="`divider-${i}`"
        />
        <core-group
          v-else-if="item.group"
          :key="`group-${i}`"
          :item="item"
        />
        <core-item
          v-else
          :icon="item.icon"
          :key="`item-${i}`"
          :text="item.text"
          :to="item.to"
        />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {
    mapGetters,
    mapMutations,
    mapState
  } from 'vuex'
  import kebabCase from 'lodash/kebabCase'
  import drawerItems from '@/data/drawerItems.json'

  export default {
    provide: {
      namespace: 'Vuetify',
      page: 'AppDrawer'
    },

    data: () => ({
      docSearch: {},
      isSearching: false,
      items: drawerItems,
      search: ''
    }),

    computed: {
      ...mapGetters('app', ['supporters']),
      ...mapState('app', ['drawer']),
      children () {
        return this.item.children.map(item => ({
          ...item,
          to: `${this.item.group}/${item.to}`
        }))
      },
      diamonds () {
        return this.supporters.diamond
      },
      group () {
        return this.item.children.map(item => {
          return `${this.item.group}/${kebabCase(item.name)}`
        }).join('|')
      },
      inputValue: {
        get () {
          return this.drawer
        },
        set (val) {
          this.setDrawer(val)
        }
      }
    },

    watch: {
      $route () {
        if (this.stateless &&
          this.inputValue &&
          this.$vuetify.breakpoint.mdAndDown
        ) this.inputValue = false
      },
      inputValue (val) {
        if (!val) this.docSearch.autocomplete.autocomplete.close()
      },
      isSearching (val) {
        this.$refs.toolbar.isScrolling = !val
        if (val) {
          this.$nextTick(() => this.$refs.search.focus())
        } else {
          this.search = null
        }
      },
      search (val) {
        if (!val) {
          this.docSearch.autocomplete.autocomplete.close()
        }
      }
    },

    mounted () {
      import(
        /* webpackChunkName: "docsearch" */
        'docsearch.js/dist/cdn/docsearch.min.css'
      )
      import(
        /* webpackChunkName: "docsearch" */
        'docsearch.js'
      ).then(this.init)
    },

    methods: {
      ...mapMutations('app', ['setDrawer']),
      init ({ default: docsearch }) {
        const vm = this
        this.docSearch = docsearch({
          apiKey: '259d4615e283a1bbaa3313b4eff7881c',
          autocompleteOptions: {
            appendTo: '#app',
            hint: false,
            debug: true
          },
          indexName: 'vuetifyjs',
          inputSelector: '#search',
          handleSelected (input, event, suggestion) {
            const url = suggestion.url
            const loc = url.split('.com')
            vm.search = ''
            vm.isSearching = false
            vm.$router.push(loc.pop())
          }
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import '~vuetify/src/stylus/settings/_elevations.styl'

  .algolia-autocomplete
    flex: 1 1 auto

  .v-chip--x-small
    font-family: 'Roboto', sans-serif
    font-size: 10px
    font-weight: 400 !important
    height: 16px

    .v-chip__content
      line-height: 1
      padding: 8px

  #search
    width: 100%

  #app
    .algolia-autocomplete > span
      left: -16px !important
      top: 18px !important
      elevation(6)

      .ds-dataset-1
        border: none !important

  #app-drawer
    img.logo
      margin 40px 0 15px

    .diamond-sponsor
      // todo trim down actual image file dimensions
      height: 30px
      margin-bottom 0.25em

      aside.v-navigation-drawer ul li
        font-size 14px
        color: #373737

      &-label
        color #676767
        margin: 24px 0 16px 0
        font-size 13px
</style>

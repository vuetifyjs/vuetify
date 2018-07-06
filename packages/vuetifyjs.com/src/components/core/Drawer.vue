<template lang="pug">
  v-navigation-drawer(
    app
    v-model="inputValue"
    :stateless="isFullscreen"
  )#app-drawer
    div.text-xs-center.pt-3
      div(
        v-for="diamond in diamonds"
        :key="diamond.name"
      )
        a(
          :href="diamond.href"
          target="_blank"
          rel="noopener"
          @click="$ga.event('drawer sponsor click', 'click', diamond.name)"
        )
          img.diamond-sponsor(
            :src="`https://cdn.vuetifyjs.com/images/${diamond.logo}`"
            :alt="diamond.Name"
          )
      misc-patreon-btn
    v-container(fluid)
      v-text-field(
        placeholder="Search"
        append-icon="search"
        id="search"
        clearable
        single-line
        solo
        key="search"
        v-model="search"
        ref="search"
        light
      )
    div.pt-3.text-xs-center
      a(
        href="https://vuejobs.com/?utm_source=vuejobs&utm_medium=banner&utm_campaign=linking&ref=vuetifyjs.com"
        target="_blank"
        rel="noopener"
        class="d-inline-block"
        @click="$ga.event('drawer jobs click', 'click', 'vuejobs')"
      )
        img(
          src="https://cdn.vuetifyjs.com/images/affiliates/vuejobs-logo.svg"
          alt="VueJobs"
          title="VueJobs"
          width="30%"
        )

    v-list(dense expand)
      template(v-for="item in items")
        <!--group with subitems-->
        v-list-group(
          v-if="item.items",
          :group="item.group",
          :prepend-icon="item.icon",
          no-action
        )
          v-list-tile(slot="activator" ripple)
            v-list-tile-content
              v-list-tile-title {{ item.title }}
          template(v-for="(subItem, i) in item.items")
            <!--sub group-->
            v-list-group(
              v-if="subItem.items",
              :group="subItem.group",
              sub-group
            )
              v-list-tile(slot="activator" ripple)
                v-list-tile-content
                  v-list-tile-title {{ subItem.title }}
              v-list-tile(
                v-for="(grand, i) in subItem.items",
                :key="i",
                :to="genChildTarget(item, grand)",
                :href="grand.href"
                ripple
              )
                v-list-tile-content
                  v-list-tile-title {{ grand.title }}
                v-chip(
                  v-if="grand.badge"
                  :color="grand.color || 'primary'"
                  class="white--text pa-0 v-chip--x-small"
                  disabled
                ) {{ grand.badge }}
            <!--child item-->
            v-list-tile(
              v-else,
              :key="i",
              :to="genChildTarget(item, subItem)",
              :href="subItem.href",
              :disabled="subItem.disabled",
              :target="subItem.target",
              ripple
            )
              v-list-tile-content
                v-list-tile-title
                  span {{ subItem.title }}
              v-chip(
                v-if="subItem.badge"
                :color="subItem.color || 'primary'"
                class="white--text pa-0 v-chip--x-small"
                disabled
              ) {{ subItem.badge }}
              v-list-tile-action(v-if="subItem.action")
                v-icon(:class="[subItem.actionClass || 'success--text']") {{ subItem.action }}

        v-subheader(v-else-if="item.header").grey--text {{ item.header }}
        v-divider(v-else-if="item.divider")

        <!--top-level link-->
        v-list-tile(
          v-else,
          :to="!item.href ? { name: item.name } : null",
          :href="item.href",
          ripple,
          :disabled="item.disabled",
          :target="item.target",
          rel="noopener"
        )
          v-list-tile-action(v-if="item.icon")
            v-icon {{ item.icon }}
          v-list-tile-content
            v-list-tile-title {{ item.title }}
          v-chip(
            v-if="item.badge"
            class="white--text pa-0 v-chip--x-small"
            :color="item.color || 'primary'"
            disabled
          ) {{ item.badge }}
          v-list-tile-action(v-if="item.subAction")
            v-icon(class="success--text") {{ item.subAction }}
          v-chip(
            v-else-if="item.chip"
            label
            small
            class="caption blue lighten-2 white--text mx-0"
          ) {{ item.chip }}
</template>

<script>
  // Utilities
  import {
    mapGetters,
    mapMutations,
    mapState
  } from 'vuex'
  import appDrawerItems from '@/data/layout/app-drawer-items'
  import { camel } from '@/util/helpers'

  export default {
    data: () => ({
      docSearch: {},
      isSearching: false,
      items: appDrawerItems,
      search: ''
    }),

    computed: {
      ...mapState('app', ['isFullscreen', 'stateless', 'appDrawer']),
      ...mapGetters('app', ['supporters']),
      diamonds () {
        return this.supporters.diamond
      },
      inputValue: {
        get (state) {
          return this.appDrawer &&
            !this.isFullscreen
        },
        set (val) {
          this.drawer(val)
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
      import('docsearch.js').then(this.init)
    },

    methods: {
      ...mapMutations('app', {
        drawer: 'DRAWER'
      }),
      genChildTarget (item, subItem) {
        if (subItem.href) return
        if (item.component &&
          // Quick and dirty fix
          subItem.name !== 'api-explorer'
        ) {
          return {
            name: item.component,
            params: {
              section: item.group,
              component: subItem.name
            }
          }
        }
        return { name: `${item.group}/${camel(subItem.name)}` }
      },
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
  @import '../../../node_modules/vuetify/src/stylus/settings/_elevations.styl'

  .algolia-autocomplete
    flex: 1 1 auto

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

    .v-chip--x-small
      font-size: 10px
      height: 16px

      .v-chip__content
        line-height: 1
        padding: 8px

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

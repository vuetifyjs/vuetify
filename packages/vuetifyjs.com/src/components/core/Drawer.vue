<template>
  <v-navigation-drawer
    v-model="inputValue"
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

  export default {
    data: () => ({
      docSearch: {},
      isSearching: false,
      items: [
        {
          group: 'getting-started',
          text: 'Getting started',
          icon: 'mdi-speedometer',
          children: [
            { text: 'Quick start', to: 'quick-start' },
            { text: 'Why Vuetify?', to: 'why-vuetify' },
            { text: 'Frequently asked questions', to: 'frequently-asked-questions' },
            { text: 'Sponsors and backers', to: 'sponsors-and-backers' },
            { text: 'Contributing', to: 'contributing' },
            { text: 'Roadmap', to: 'roadmap' },
            { text: 'Consulting and support', to: 'consulting-and-support' }
          ]
        },
        {
          group: 'framework',
          text: 'Framework options',
          icon: 'mdi-buffer',
          children: [
            { text: 'A-la-carte', to: 'a-la-carte' },
            { text: 'Icons', to: 'icons' },
            { text: 'Internationalization', to: 'internationalization' }
          ]
        },
        {
          group: 'layout',
          text: 'Application layout',
          icon: 'mdi-page-layout-body',
          children: [
            { text: 'Pre-defined layouts', to: 'pre-defined' },
            { text: 'Pre-made themes', to: 'pre-made-themes' },
            {
              group: 'layout',
              text: 'Grid system',
              children: [
                { text: 'Grid', to: 'grid' },
                { text: 'Grid lists', to: 'grid-lists' }
              ]
            },
            { text: 'Breakpoints', to: 'breakpoints' },
            { text: 'Aspect ratios', to: 'aspect-ratios' },
            { text: 'Spacing', to: 'spacing' },
            { text: 'Text alignment', to: 'alignment' },
            { text: 'Display', to: 'display' },
            { text: 'Elevation', to: 'elevation' },
            { text: 'Sandbox', to: 'sandbox' }
          ]
        },
        {
          group: 'style',
          text: 'Styles & themes',
          icon: 'mdi-format-color-fill',
          children: [
            { text: 'Colors', to: 'colors' },
            { text: 'Theme', to: 'theme' },
            { text: 'Typography', to: 'typography' },
            { text: 'Content', to: 'content' }
          ]
        },
        {
          group: 'motion',
          text: 'Motion & transitions',
          icon: 'mdi-clock-fast',
          children: [
            { text: 'Scroll', to: 'scroll' },
            { text: 'Transitions', to: 'transitions' }
          ]
        },
        {
          group: 'components',
          text: 'UI components',
          icon: 'mdi-view-dashboard',
          children: [
            { text: 'API explorer', to: 'api-explorer' },
            { text: 'Alerts', to: 'alerts' },
            { text: 'Avatars', to: 'avatars' },
            { text: 'Badges', to: 'badges' },
            { text: 'Bottom navigation', to: 'bottom-navigation' },
            { text: 'Bottom sheets', to: 'bottom-sheets' },
            { text: 'Breadcrumbs', to: 'breadcrumbs' },
            { text: 'Buttons', to: 'buttons' },
            { text: 'Buttons: Floating action buttons', to: 'floating-action-buttons' },
            { text: 'Cards', to: 'cards' },
            { text: 'Carousels', to: 'carousels' },
            { text: 'Chips', to: 'chips' },
            { text: 'Data iterator', to: 'data-iterator' },
            { text: 'Data tables', to: 'data-tables' },
            { text: 'Dialogs', to: 'dialogs' },
            { text: 'Dividers', to: 'dividers' },
            { text: 'Expansion panels', to: 'expansion-panels' },
            { text: 'Footer', to: 'footer' },
            {
              group: 'components',
              text: 'Groups',
              children: [
                { text: 'Button groups', to: 'button-groups' },
                { text: 'Item groups', to: 'item-groups' },
                { text: 'Windows', to: 'windows' }
              ]
            },
            { text: 'Hover', to: 'hover' },
            { text: 'Icons', to: 'icons' },
            { text: 'Images', to: 'images' },
            {
              group: 'components',
              text: 'Inputs & controls',
              children: [
                { text: 'Autocompletes', to: 'autocompletes' },
                { text: 'Combobox', to: 'combobox' },
                { text: 'Forms', to: 'forms' },
                { text: 'Inputs', to: 'inputs' },
                { text: 'Overflow buttons', to: 'overflow-btns' },
                { text: 'Selects', to: 'selects' },
                { text: 'Selection controls', to: 'selection-controls' },
                { text: 'Sliders', to: 'sliders' },
                { text: 'Textareas', to: 'textarea' },
                { text: 'Text fields', to: 'text-fields' }
              ]
            },
            { text: 'Jumbotrons', to: 'jumbotrons' },
            { text: 'Lists', to: 'lists' },
            { text: 'Menus', to: 'menus' },
            { text: 'Navigation drawers', to: 'navigation-drawers' },
            { text: 'Paginations', to: 'paginations' },
            { text: 'Parallax', to: 'parallax' },
            {
              group: 'components',
              text: 'Pickers',
              children: [
                { text: 'Date pickers', to: 'date-pickers' },
                { text: 'Time pickers', to: 'time-pickers' }
              ]
            },
            { text: 'Progress', to: 'progress' },
            { text: 'Ratings', to: 'ratings' },
            { text: 'Sheets', to: 'sheets' },
            { text: 'Snackbars', to: 'snackbars' },
            { text: 'Steppers', to: 'steppers' },
            { text: 'Subheaders', to: 'subheaders' },
            { text: 'Tabs', to: 'tabs' },
            { text: 'Timelines', to: 'timelines' },
            { text: 'Toolbars', to: 'toolbars' },
            { text: 'Tooltips', to: 'tooltips' }
          ]
        },
        {
          group: 'directives',
          text: 'Directives',
          icon: 'mdi-function',
          children: [
            { text: 'Resizing', to: 'resizing' },
            { text: 'Ripples', to: 'ripples' },
            { text: 'Scrolling', to: 'scrolling' },
            { text: 'Touch support', to: 'touch-support' }
          ]
        }
      ],
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

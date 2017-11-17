<template lang="pug">
  v-navigation-drawer(
    app
    fixed
    v-model="appDrawer"
    :stateless="stateless"
  )#app-drawer
    div.text-xs-center
      div.diamond-sponsor-label Diamond Sponsors
      div(
        v-for="diamond in diamonds"
        :key="diamond.title"
      )
        a(:href="diamond.href" target="_blank" rel="noopener")
          img.diamond-sponsor(
            :src="`/static/doc-images/${diamond.src}`"
            :alt="diamond.title"
          )
    v-container(fluid)
      v-text-field(
        solo
        append-icon="search"
        placeholder="Search..."
      )
    div.py-3.text-xs-center
      a(
        href="https://vuejobs.com/?utm_source=vuejobs&utm_medium=banner&utm_campaign=linking"
        target="_blank"
        rel="noopener"
        class="d-inline-block"
      )
        img(
          src="/static/doc-images/affiliates/vuejobs-logo.svg"
          alt="VueJobs"
          title="VueJobs"
          width="30%"
        )
    v-list(dense)
      template(v-for="item in items")
        v-list-group(v-if="item.items" v-bind:group="item.group")
          v-list-tile(slot="item" ripple)
            v-list-tile-action
              v-icon {{ item.icon }}
            v-list-tile-content
              v-list-tile-title {{ item.title }}
            v-list-tile-action
              v-icon keyboard_arrow_down
          v-list-tile(
            v-for="subItem in item.items"
            v-bind:key="subItem.title"
            v-bind="{ \
              to: !subItem.target ? subItem.href : null, \
              href: subItem.target && subItem.href \
            }"
            ripple
            v-bind:disabled="subItem.disabled"
            v-bind:target="subItem.target"
          )
            v-list-tile-content
              v-list-tile-title {{ subItem.title }}
            v-list-tile-action(v-if="subItem.action")
              v-icon(:class="[subItem.actionClass || 'success--text']") {{ subItem.action }}
        v-subheader(v-else-if="item.header").primary--text {{ item.header }}
        v-divider(v-else-if="item.divider")
        v-list-tile(
          v-bind="{ \
            to: !item.target ? item.href : null, \
            href: item.target && item.href \
          }"
          ripple
          v-bind:disabled="item.disabled"
          v-bind:target="item.target"
          rel="noopener"
          v-else
        )
          v-list-tile-action(v-if="item.icon")
            v-icon {{ item.icon }}
          v-list-tile-content
            v-list-tile-title {{ item.title }}
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
  import { mapState } from 'vuex'

  export default {
    data: () => ({
      items: [
        { header: 'Core documentation' },
        {
          title: 'Getting started',
          group: '/getting-started',
          icon: 'mdi-speedometer',
          items: [
            { href: '/getting-started/quick-start', title: 'Quick Start' },
            { href: '/getting-started/starter-templates', title: 'Starter Templates' },
            { href: '/getting-started/why-vuetify', title: 'Why Vuetify?' },
            { href: '/getting-started/frequently-asked-questions', title: 'Frequently asked questions' },
            { href: '/getting-started/sponsors-and-backers', title: 'Sponsors and backers' },
            { href: '/getting-started/contributing', title: 'Contributing' },
            { href: '/getting-started/roadmap', title: 'Roadmap' }
          ]
        },
        {
          title: 'Application layout',
          group: 'layout',
          icon: 'mdi-page-layout-body',
          items: [
            { href: '/layout/pre-defined', title: 'Pre-defined' },
            { href: '/layout/grid', title: 'Grid & breakpoints' },
            { href: '/layout/spacing', title: 'Spacing' },
            { href: '/layout/alignment', title: 'Alignment' },
            { href: '/layout/display', title: 'Display' },
            { href: '/layout/elevation', title: 'Elevation' },
            { href: '/layout/sandbox', title: 'Sandbox' }
          ]
        },
        {
          title: 'Styles & themes',
          group: '/style',
          icon: 'mdi-format-color-fill',
          items: [
            { href: '/style/colors', title: 'Colors' },
            { href: '/style/theme', title: 'Theme' },
            { href: '/style/typography', title: 'Typography' },
            { href: '/style/content', title: 'Content' }
          ]
        },
        {
          title: 'Motion & transitions',
          group: 'motion',
          icon: 'mdi-clock-fast',
          items: [
            { href: '/motion/transitions', title: 'Transitions' }
          ]
        },
        {
          title: 'UI components',
          group: '/components',
          icon: 'mdi-view-dashboard',
          items: [
            { href: '/components/alerts', title: 'Alerts' },
            { href: '/components/avatars', title: 'Avatars' },
            { href: '/components/badges', title: 'Badges' },
            { href: '/components/breadcrumbs', title: 'Breadcrumbs' },
            { href: '/components/bottom-navigation', title: 'Bottom navigation' },
            { href: '/components/bottom-sheets', title: 'Bottom sheets' },
            { href: '/components/buttons', title: 'Buttons' },
            { href: '/components/floating-action-buttons', title: 'Buttons: Floating Action Buttons' },
            { href: '/components/cards', title: 'Cards' },
            { href: '/components/carousels', title: 'Carousels' },
            { href: '/components/chips', title: 'Chips' },
            { href: '/components/data-tables', title: 'Data tables' },
            { href: '/components/dialogs', title: 'Dialogs' },
            { href: '/components/dividers', title: 'Dividers' },
            { href: '/components/expansion-panels', title: 'Expansion panels' },
            { href: '/components/footer', title: 'Footer' },
            { href: '/components/forms', title: 'Forms' },
            { href: '/components/grid-lists', title: 'Grid lists' },
            { href: '/components/icons', title: 'Icons' },
            { href: '/components/lists', title: 'Lists' },
            { href: '/components/menus', title: 'Menus' },
            { href: '/components/navigation-drawers', title: 'Navigation drawers' },
            { href: '/components/pagination', title: 'Pagination' },
            { href: '/components/parallax', title: 'Parallax' },
            { href: '/components/pickers', title: 'Pickers' },
            { href: '/components/progress', title: 'Progress' },
            { href: '/components/selects', title: 'Selects' },
            { href: '/components/selection-controls', title: 'Selection controls' },
            { href: '/components/sliders', title: 'Sliders' },
            { href: '/components/snackbars', title: 'Snackbars' },
            { href: '/components/steppers', title: 'Steppers' },
            { href: '/components/subheaders', title: 'Subheaders' },
            { href: '/components/tabs', title: 'Tabs' },
            { href: '/components/text-fields', title: 'Text fields' },
            { href: '/components/toolbars', title: 'Toolbars' },
            { href: '/components/tooltips', title: 'Tooltips' }
          ]
        },
        {
          title: 'Directives',
          group: 'directives',
          icon: 'mdi-function',
          items: [
            { href: '/directives/resizing', title: 'Resizing' },
            { href: '/directives/ripples', title: 'Ripples' },
            { href: '/directives/scrolling', title: 'Scrolling' },
            { href: '/directives/touch-support', title: 'Touch support' }
          ]
        },
        { href: '/pre-made-themes', title: 'Pre-made themes', icon: 'mdi-theme-light-dark' },
        { href: 'https://vuetify.threadless.com/', title: 'Shop', target: '_blank', icon: 'mdi-store' },
        { divider: true },
        { header: 'Additional resources' },
        {
          title: 'Community',
          group: 'community',
          icon: 'mdi-account-multiple',
          items: [
            { href: 'https://chat.vuetifyjs.com/', title: 'Chat and support', target: '_blank' },
            { href: 'https://github.com/vuetifyjs/vuetify/issues', title: 'Issue board', target: '_blank' },
            { href: 'https://stackoverflow.com/search?q=vuetify', title: 'Stack overflow', target: '_blank' },
          ]
        },
        {
          title: 'Guides',
          group: 'guides',
          icon: 'mdi-television-guide',
          items: [
            { href: '/guides/server-side-rendering', title: 'Server side rendering' }
          ]
        }
      ]
    }),
    computed: {
      ...mapState({
        stateless: state => state.stateless,
        diamonds: state => state.supporters.diamond
      }),
      appDrawer: {
        get (state) {
          return this.$store.state.appDrawer
        },
        set (val) {
          this.$store.commit('app/DRAWER', val)
        }
      }
    }
  }
</script>

<style lang="stylus">
  #app-drawer
    img.logo
      margin 40px 0 15px

    .diamond-sponsor
      // todo trim down actual image file dimensions
      height: 35px
      margin-bottom 1.25em

      aside.navigation-drawer ul li
        font-size 14px
        color: #373737

      &-label
        color #676767
        margin: 2em 0 1.5em
        font-size 13px
</style>

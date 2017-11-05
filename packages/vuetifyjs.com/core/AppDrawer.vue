<template lang="pug">
  v-navigation-drawer(
    app
    persistent
    v-model="appDrawer"
    :enable-resize-watcher="resizeWatcher"
    :disable-route-watcher="!routeWatcher"
  )#app-drawer
    div.text-xs-center
      div.diamond-sponsor-label Diamond Sponsor
      img.diamond-sponsor(
        src="https://vuetifyjs.com/static/doc-images/backers/lmax-exchange.png"
        alt="Sponsor"
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
      )
        img(
          src="/static/doc-images/affiliates/vuejobs-logo.svg"
          alt="VueJobs"
          title="VueJobs"
          width="30%"
        )
    v-list(dense)
      template(v-for="item in items")
        v-list-group(v-if="item.items" v-bind:group="item.group" no-action)
          v-list-tile(slot="item" ripple)
            v-list-tile-content
              v-list-tile-title {{ item.title }}
          v-list-tile(
            v-for="subItem in item.items" v-bind:key="subItem.title"
            v-bind="{ \
              to: !subItem.target ? subItem.href : null, \
              href: subItem.target && subItem.href \
            }"
            ripple
            v-bind:disabled="subItem.disabled"
            v-bind:target="subItem.target"
          )
            v-list-tile-content.pl-3
              v-list-tile-title {{ subItem.title }}
            v-list-tile-action(v-if="subItem.action")
              v-icon(dark :class="[subItem.actionClass || 'success--text']") {{ subItem.action }}
        v-subheader(v-else-if="item.header" dark) {{ item.header }}
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
          v-list-tile-content
            v-list-tile-title {{ item.title }}
          v-list-tile-action(v-if="item.subAction")
            v-icon(dark class="success--text") {{ item.subAction }}
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
        {
          title: 'Getting Started',
          group: '/getting-started',
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
          title: 'Application Layout',
          group: 'layout',
          items: [
            { href: '/layout/pre-defined', title: 'Pre-defined', action: 'star', actionClass: 'white--text' },
            { href: '/layout/grid', title: 'Grid & breakpoints' },
            { href: '/layout/spacing', title: 'Spacing' },
            { href: '/layout/alignment', title: 'Alignment' },
            { href: '/layout/display', title: 'Display' },
            { href: '/layout/elevation', title: 'Elevation' },
            { href: '/layout/sandbox', title: 'Sandbox' }
          ]
        },
        {
          title: 'Base Styles',
          group: '/style',
          items: [
            { href: '/style/colors', title: 'Colors' },
            { href: '/style/theme', title: 'Theme' },
            { href: '/style/typography', title: 'Typography' },
            { href: '/style/content', title: 'Content' }
          ]
        },
        {
          title: 'Motion & Transitions',
          group: 'motion',
          items: [
            { href: '/motion/transitions', title: 'Transitions' }
          ]
        },
        {
          title: 'UI Components',
          group: '/components',
          items: [
            { href: '/components/alerts', title: 'Alerts' },
            { href: '/components/avatars', title: 'Avatars' },
            { href: '/components/badges', title: 'Badges' },
            { href: '/components/breadcrumbs', title: 'Breadcrumbs' },
            { href: '/components/bottom-navigation', title: 'BottomNavigation' },
            { href: '/components/bottom-sheets', title: 'BottomSheets' },
            { href: '/components/buttons', title: 'Buttons' },
            { href: '/components/floating-action-buttons', title: 'Fabs' },
            { href: '/components/cards', title: 'Cards' },
            { href: '/components/carousels', title: 'Carousels' },
            { href: '/components/chips', title: 'Chips' },
            { href: '/components/data-tables', title: 'DataTables' },
            { href: '/components/dialogs', title: 'Dialogs' },
            { href: '/components/dividers', title: 'Dividers' },
            { href: '/components/expansion-panels', title: 'ExpansionPanels' },
            { href: '/components/footer', title: 'Footer' },
            {
              title: 'Form Components',
              group: '/components/form-components',
              items: [
                { href: '/components/form-components/forms', title: 'Forms' }
              ]
            },
            { href: '/components/grid-lists', title: 'GridLists' },
            { href: '/components/icons', title: 'Icons' },
            { href: '/components/lists', title: 'Lists' },
            { href: '/components/menus', title: 'Menus' },
            { href: '/components/navigation-drawers', title: 'NavigationDrawers' },
            { href: '/components/pagination', title: 'Pagination' },
            { href: '/components/parallax', title: 'Parallax' },
            { href: '/components/pickers', title: 'Pickers' },
            { href: '/components/progress', title: 'Progress' },
            { href: '/components/selects', title: 'Selects' },
            { href: '/components/selection-controls', title: 'SelectionControls' },
            { href: '/components/sliders', title: 'Sliders' },
            { href: '/components/snackbars', title: 'Snackbars' },
            { href: '/components/steppers', title: 'Steppers' },
            { href: '/components/subheaders', title: 'Subheaders' },
            { href: '/components/tabs', title: 'Tabs' },
            { href: '/components/text-fields', title: 'TextFields' },
            { href: '/components/toolbars', title: 'Toolbars' },
            { href: '/components/tooltips', title: 'Tooltips' }
          ]
        }
      ]
    }),
    computed: {
      ...mapState({
        resizeWatcher: state => state.resizeWatcher,
        routeWatcher: state => state.routeWatcher
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
      margin 40px 0 25px

    .diamond-sponsor
      // todo trim down actual image file dimensions
      height: 40px
      margin-bottom 1.25em

      aside.navigation-drawer ul li
        font-size 14px
        color: #373737

      &-label
        color #676767
        margin: 3em 0 .5em
        font-size 13px
</style>

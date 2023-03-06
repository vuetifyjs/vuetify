<template>
  <v-navigation-drawer
    v-model="inputValue"
    clipped
    app
  >
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
          :key="`item-${i}`"
          :chip="genChip(item)"
          :icon="item.icon"
          :subtext="item.subtext"
          :text="item.text"
          :to="item.to"
          :href="item.href"
        />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {
    mapMutations,
    mapState
  } from 'vuex'
  import kebabCase from 'lodash/kebabCase'
  import drawerItems from '@/data/drawerItems.json'
  import { genChip } from '@/util/helpers'

  export default {
    data: () => ({
      drawerItems,
      search: ''
    }),

    computed: {
      ...mapState('app', ['drawer', 'supporters']),
      children () {
        return this.item.children.map(item => ({
          ...item,
          to: `${this.item.group}/${item.to}`
        }))
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
      },
      items () {
        return this.drawerItems.map(this.addLanguagePrefix)
      }
    },

    watch: {
      $route () {
        if (this.stateless &&
          this.inputValue &&
          this.$vuetify.breakpoint.mdAndDown
        ) this.inputValue = false
      }
    },

    methods: {
      genChip,
      addLanguagePrefix (item) {
        const { children, subtext, ...props } = item
        const newItem = {
          ...props,
          text: `Vuetify.AppDrawer.${item.text}`
        }

        if (children) {
          newItem.children = children.map(this.addLanguagePrefix)
        }

        if (subtext) {
          newItem.subtext = `Vuetify.AppDrawer.${item.subtext}`
        }

        return newItem
      },
      ...mapMutations('app', ['setDrawer'])
    }
  }
</script>

<style lang="stylus">
  @import '~vuetify/src/stylus/settings/_elevations.styl'

  .algolia-autocomplete
    flex: 1 1 auto
    position: fixed !important

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

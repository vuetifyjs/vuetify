<template>
  <v-navigation-drawer
    v-model="drawer"
    :width="300"
    app
    clipped
    :right="$vuetify.rtl"
  >
    <v-container>
      <div class="text-center">
        <v-responsive min-height="81">
          <supporters-supporter-group
            :group="supporters['Premiere']"
            large
            title="Premiere sponsors"
          />
        </v-responsive>

        <supporters-sponsor-btn
          class="mt-4"
          href="https://github.com/users/johnleider/sponsorship"
          small
        />
      </div>
    </v-container>

    <v-divider class="mb-1 mt-2" />

    <v-list
      class="pt-0 pb-7"
      dense
      expand
      nav
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

        <base-group
          v-else-if="item.group"
          :key="`group-${i}`"
          :item="item"
        />

        <base-item
          v-else
          :key="`item-${i}`"
          :chip="genChip(item)"
          :icon="item.icon"
          :subtext="item.subtext"
          :text="item.text"
          :to="item.to"
        />
      </template>
    </v-list>

    <template v-slot:append>
      <v-divider />

      <div class="px-4 py-2 d-flex">
        <base-locales-menu />

        <base-versions-menu />

        <v-spacer />

        <base-theme-toggle />
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {
    sync,
  } from 'vuex-pathify'
  import kebabCase from 'lodash/kebabCase'
  import { genChip } from '@/util/helpers'

  export default {
    name: 'DocumentationDrawer',

    computed: {
      ...sync('app/*'),
      links: sync('documentation/links'),
      children () {
        return this.item.children.map(item => ({
          ...item,
          to: `${this.item.group}/${item.to}`,
        }))
      },
      group () {
        return this.item.children.map(item => {
          return `${this.item.group}/${kebabCase(item.name)}`
        }).join('|')
      },
      items () {
        return this.links.map(this.addLanguagePrefix)
      },
    },

    watch: {
      $route () {
        if (this.stateless &&
          this.drawer &&
          this.$vuetify.breakpoint.mdAndDown
        ) this.drawer = false
      },
    },

    methods: {
      genChip,
      addLanguagePrefix (item) {
        const { children, subtext, ...props } = item
        const newItem = {
          ...props,
          text: `Vuetify.AppDrawer.${item.text}`,
        }

        if (children) {
          newItem.children = children.map(this.addLanguagePrefix)
        }

        if (subtext) {
          newItem.subtext = `Vuetify.AppDrawer.${item.subtext}`
        }

        return newItem
      },
    },
  }
</script>

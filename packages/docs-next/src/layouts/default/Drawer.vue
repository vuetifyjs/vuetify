<template>
  <v-navigation-drawer app>
    <v-list
      dense
      nav
    >
      <v-list-group
        v-for="item in items"
        :key="item.title"
        :group="item.group"
        :prepend-icon="item.icon"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </template>

        <template v-if="!!item.items">
          <v-list-item
            v-for="subItem in item.items"
            :key="subItem.title"
            :to="subItem.to"
          >
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title" />
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  import pages from '@/data/pages'

  export default {
    name: 'DefaultDrawer',

    computed: {
      locale: get('route/params@locale'),
      pages: get('i18n/pages'),
      items () {
        return pages.map(item => this.genItem(item, ''))
      },
    },

    methods: {
      findItems (group) {
        return Object.keys(this.pages).filter(p => p.startsWith(group)).map(p => {
          return {
            title: this.pages[p],
            to: `/${this.$route.params.locale}${p}`,
          }
        })
      },
      genItem (item, parent) {
        const group = `${parent}/${item.title}`

        return {
          // Try finding title among imported pages, otherwise try translating it
          title: this.pages[group] || this.$t(item.title),
          icon: item.icon || undefined,
          group,
          // If there are no defined components, try finding them among imported pages
          items: item.items
            ? item.items.map(i => this.genItem(i, group))
            : this.findItems(group),
          to: `/${this.$route.params.locale}${group}`,
        }
      },
    },
  }
</script>

<template>
  <v-navigation-drawer
    id="default-drawer"
    v-model="drawer"
    :color="dark ? '#272727' : undefined"
    :right="rtl"
    app
    clipped
    width="300"
  >
    <keep-alive>
      <default-list
        :key="key"
        v-mutate.once.child="onMutate"
        :items="items"
      />
    </keep-alive>

    <div class="pt-12" />

    <template #append>
      <v-divider />

      <div class="text--secondary text-caption py-2 px-3 d-flex align-center">
        <div class="d-inline-flex align-center">
          <v-icon left small>mdi-label</v-icon>
          Latest release:
        </div>

        <v-btn
          :href="`https://github.com/vuetifyjs/vuetify/releases/tag/v${version}`"
          class="text-none px-2 ms-auto text--secondary"
          small
          rel="noopener noreferrer"
          target="_blank"
          text
        >
          v{{ version }}

          <v-icon small right>mdi-open-in-new</v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
  // Components
  import DefaultList from './List'

  // Utilities
  import { get, sync } from 'vuex-pathify'

  // Data
  import { IN_BROWSER } from '@/util/globals'

  export default {
    name: 'DefaultDrawer',

    components: {
      DefaultList,
    },

    computed: {
      ...get('user', [
        'rtl',
        'theme@dark',
      ]),
      ...get('app', [
        'alphabetical',
        'nav',
      ]),
      drawer: sync('app/drawer'),
      ualphabetical: get('user/drawer@alphabetical'),
      version: get('app/version'),
      key () {
        return !this.ualphabetical ? 'simple' : 'alphabetical'
      },
      items () {
        return !this.ualphabetical ? this.nav : this.alphabetical
      },
    },

    methods: {
      findActiveItem (children = []) {
        return [...children].reduce((acc, cur) => {
          // If we've found an item, just return it
          if (acc) {
            return acc
          // If the current item is active, return as accumulator
          } else if (cur.classList.contains('v-list-item--active')) {
            return cur
          }

          return this.findActiveItem(cur.children)
        }, null)
      },
      onMutate (mutationsList, observer) {
        // Cancel if drawer is not visible
        if (
          !this.drawer ||
          !IN_BROWSER ||
          typeof document.documentElement.scrollIntoView !== 'function'
        ) return

        /* eslint-disable no-labels */
        found:
          // Iterate through all mutated items
          for (const record of mutationsList) {
            const nodes = [...record.addedNodes]

            // Find the active list group
            for (const node of nodes) {
              if (
                !node.classList.contains('v-list-group--active') ||
                node.children.length < 2
              ) continue

              // Find the active child
              const child = this.findActiveItem(node.children[1].children)

              if (!child) continue

              child.scrollIntoView()

              // Break loop
              break found
            }
          }
      },
    },
  }
</script>

<template>
  <v-navigation-drawer app>
    <v-list
      dense
      nav
    >
      <template v-for="(item, i) in items">
        <v-list-group
          v-if="item.items"
          :key="item.title"
          :group="item.to"
          :prepend-icon="item.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </template>

          <template v-if="item.items">
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

        <v-list-item
          v-else
          :key="i"
          :to="undefined"
          :href="item.href"
          :target="item.href ? '_blank' : undefined"
          :rel="item.href ? 'nofollow' : undefined"
        >
          <v-list-item-icon v-if="item.icon">
            <v-icon v-text="item.icon" />
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'DefaultDrawer',

    computed: {
      items: get('app/nav'),
    },
  }
</script>

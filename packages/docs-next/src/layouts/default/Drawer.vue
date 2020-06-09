<template>
  <v-navigation-drawer
    app
    clipped
    width="300"
  >
    <v-list
      dense
      nav
      expand
    >
      <template v-for="(item, i) in nav">
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
  import { sync } from 'vuex-pathify'

  export default {
    name: 'DefaultDrawer',

    computed: { nav: sync('app/nav') },
  }
</script>

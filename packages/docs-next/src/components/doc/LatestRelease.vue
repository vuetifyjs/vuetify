<template>
  <v-menu
    v-if="$vuetify.breakpoint.mdAndUp"
    v-model="menu"
    max-height="500"
    origin="top right"
    transition="scale-transition"
  >
    <template #activator="{ attrs, on }">
      <v-btn
        class="text--secondary text-lowercase px-2"
        text
        v-bind="attrs"
        v-on="on"
      >
        <span
          class="hidden-sm-and-down"
          v-text="`v${version}`"
        />
      </v-btn>
    </template>

    <v-card>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :href="item.href"
          rel="noopener"
          target="_blank"
        >
          <v-list-item-title v-text="item.title" />
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'LatestRelease',

    data: () => ({ menu: false }),

    computed: {
      version: get('app/version'),
      items () {
        return [
          {
            title: '1.5.x',
            href: 'https://v15.vuetifyjs.com',
          },
          {
            title: '1.0.x',
            href: 'https://v1.vuetifyjs.com',
          },
        ]
      },
    },
  }
</script>

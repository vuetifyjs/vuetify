<template>
  <v-card
    v-if="activeTemplate"
    class="mb-12"
    outlined
  >
    <v-list
      class="py-0"
      color="transparent"
      three-line
    >
      <v-list-item
        :href="`${activeTemplate.url}?ref=vuetifyjs.com${activeTemplate.query || ''}`"
        target="_blank"
        rel="noopener noreferrer"
        @click="$ga.event($route.path, 'click', 'theme-ad')"
      >
        <v-list-item-avatar
          color="grey"
          size="64"
          tile
        >
          <v-img
            :alt="`Link to ${activeTemplate.title}`"
            :src="activeTemplate.src"
          />
        </v-list-item-avatar>

        <v-list-item-content class="align-self-center">
          <v-list-item-title v-text="activeTemplate.title" />

          <v-list-item-subtitle v-text="activeTemplate.description" />
        </v-list-item-content>

        <v-list-item-action>
          <v-icon>mdi-open-in-new</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
  // Utilities
  import {
    sync,
  } from 'vuex-pathify'

  export default {
    name: 'AdCard',

    computed: {
      templates: sync('documentation/templates'),
      activeTemplate () {
        const templates = Object.keys(this.templates)

        return this.templates[
          templates[Math.floor(Math.random() * templates.length)]
        ]
      },
    },
  }
</script>

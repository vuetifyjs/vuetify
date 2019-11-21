<template>
  <no-ssr>
    <v-card
      v-if="activeTemplate"
      class="mb-12"
      outlined
    >
      <v-list
        class="py-0"
        color="transparent"
      >
        <v-list-item
          v-bind="adAttrs"
          @click="$ga.event('theme-ad', 'click', activeTemplate.title, $route.path)"
        >
          <v-list-item-avatar
            size="56"
            tile
          >
            <v-img
              :alt="`Link to ${activeTemplate.title}`"
              :src="activeTemplate.src"
              style="border-radius: 4px 0 0 4px"
            />
          </v-list-item-avatar>

          <v-list-item-content class="align-self-center">
            <v-list-item-title v-text="activeTemplate.title" />

            <v-list-item-subtitle v-text="activeTemplate.description" />
          </v-list-item-content>

          <v-list-item-action>
            <v-icon class="mb-3">mdi-open-in-new</v-icon>

            <span class="caption text--secondary">ads by Vuetify</span>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </no-ssr>
</template>

<script>
  // Utilities
  import {
    sync,
  } from 'vuex-pathify'

  export default {
    name: 'AdCard',

    props: {
      dense: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      discovery: require('@/data/discovery'),
      products: require('@/data/products'),
    }),

    computed: {
      lang: sync('route/params@lang'),
      activeTemplate () {
        const templates = Object.keys(this.templates)

        return this.templates[
          templates[Math.floor(Math.random() * templates.length)]
        ]
      },
      adAttrs () {
        const url = this.activeTemplate.url

        if (url.charAt(0) === '/') {
          return { to: `/${this.lang}${url}` }
        }

        const query = this.activeTemplate.query

        return {
          target: '_blank',
          rel: 'sponsored',
          href: `${url}?ref=vuetifyjs.com${query || ''}`,
        }
      },
      templates () {
        return {
          ...this.products,
          ...this.discovery,
        }
      },
    },
  }
</script>

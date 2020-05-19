<template>
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
        @click="$ga.event('vuetify-ad', 'click', activeTemplate.title)"
      >
        <v-list-item-avatar
          size="56"
          tile
        >
          <v-img
            :alt="`Link to ${activeTemplate.title}`"
            :src="activeTemplate.metadata.src"
            style="border-radius: 4px 0 0 4px"
          />
        </v-list-item-avatar>

        <v-list-item-content class="align-self-center">
          <v-list-item-title v-text="activeTemplate.title" />

          <v-list-item-subtitle>
            <base-markdown :code="activeTemplate.metadata.description" />
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-icon class="mb-3">mdi-open-in-new</v-icon>

          <span class="caption text--secondary">ads by Vuetify</span>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
  // Utilities
  import bucket from '@/plugins/cosmicjs'
  import { get } from 'vuex-pathify'

  export default {
    name: 'AdCard',

    props: {
      dense: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      ads: [],
    }),

    computed: {
      lang: get('route/params@lang'),
      activeTemplate () {
        const length = this.ads.length

        return this.ads[Math.floor(Math.random() * length)]
      },
      adAttrs () {
        const [url, query] = this.activeTemplate.metadata.url.split('?')

        if (url.charAt(0) === '/') {
          return { to: `/${this.lang}${url}` }
        }

        return {
          target: '_blank',
          href: `${url}?ref=vuetifyjs.com${query ? `&${query}` : ''}`,
        }
      },
    },

    async mounted () {
      const { objects } = await bucket.getObjects({
        type: 'ads',
        props: 'metadata,title',
        status: 'published',
      })

      if (objects) this.ads = objects
    },
  }
</script>

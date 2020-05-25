<template>
  <app-ad width="100%">
    <v-list
      v-if="hasAvailableAds"
      class="py-0"
      color="transparent"
    >
      <v-list-item
        v-bind="adAttrs"
        class="text-decoration-none pl-2"
      >
        <v-list-item-avatar
          size="56"
          tile
        >
          <v-img
            :alt="`Link to ${activeTemplate.title}`"
            :src="activeTemplate.metadata.src"
            class="rounded-tl rounded-bl"
          />
        </v-list-item-avatar>

        <v-list-item-content class="align-self-center">
          <v-list-item-title v-text="activeTemplate.title" />

          <v-list-item-subtitle v-text="activeTemplate.metadata.description" />
        </v-list-item-content>

        <v-list-item-action class="shrink">
          <v-icon>$mdiOpenInNew</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </app-ad>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'VuetifyAd',

    computed: {
      ads: get('ads/available'),
      hasAvailableAds () {
        return !!this.ads.length
      },
      activeTemplate () {
        const length = this.ads.length

        return this.ads[Math.floor(Math.random() * length)]
      },
      adAttrs () {
        if (!this.activeTemplate) return null

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
  }
</script>

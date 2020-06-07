<template>
  <app-ad
    :color="bgColor"
    v-bind="$props"
  >
    <v-list-item
      v-if="current"
      :color="bgColor"
      class="pl-2 rounded"
      v-bind="adAttrs"
    >
      <v-list-item-avatar
        v-if="metadata.src && !compact"
        size="56"
        tile
      >
        <v-img
          :alt="`Link to ${current.title}`"
          :src="metadata.src"
          class="rounded-tl rounded-bl"
        />
      </v-list-item-avatar>

      <v-icon
        v-else-if="icon"
        :class="[color]"
        class="mr-3"
        large
        v-text="icon"
      />

      <v-list-item-content>
        <v-list-item-title
          v-if="!isSponsored"
          class="font-weight-medium mb-1 subtitle-1"
          v-text="current.title"
        />

        <v-list-item-subtitle
          v-if="metadata.description"
          :class="[color, isSponsored && 'body-2 font-weight-medium']"
          v-text="metadata.description"
        />
      </v-list-item-content>

      <v-list-item-action
        v-if="!compact"
        class="mb-n8 mr-n2"
      >
        <span class="overline text--secondary">ads via Vuetify</span>
      </v-list-item-action>
    </v-list-item>
  </app-ad>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'VuetifyAd',

    props: {
      bgColor: String,
      color: String,
      comfortable: Boolean,
      compact: Boolean,
      discover: Boolean,
      outlined: Boolean,
      slug: String,
    },

    computed: {
      all: get('ads/all'),
      ads () {
        if (!this.discover) return this.all

        return this.all.filter(ad => ad.metadata.type === 'Discovery')
      },
      adAttrs () {
        if (!this.current) return undefined

        const [url, query] = this.metadata.url.split('?')

        if (!url.startsWith('http')) {
          return { to: `/${this.lang}${url}/` }
        }

        return {
          href: `${url}?ref=vuetifyjs.com${query ? `&${query}` : ''}`,
          target: '_blank',
        }
      },
      icon () {
        switch (this.metadata.type) {
          case 'Video': return '$mdiPlayCircle'
          default: return '$mdiVuetify'
        }
      },
      isSponsored () {
        return this.metadata.sponsored
      },
      current () {
        const index = !this.slug
          ? this.getRandomIndex()
          : this.getSlugIndex()

        return this.ads[index]
      },
      metadata () {
        return this.current ? this.current.metadata : {}
      },
    },

    methods: {
      getSlugIndex () {
        return this.ads.findIndex(ad => ad.slug === this.slug)
      },
      getRandomIndex () {
        return Math.floor(Math.random() * this.ads.length)
      },
    },
  }
</script>

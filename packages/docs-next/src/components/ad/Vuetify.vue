<template>
  <app-ad
    :color="bgColor"
    class="v-vuetify-ad"
    v-bind="{
      ...$attrs,
      ...$props,
    }"
  >
    <v-list-item
      v-if="current"
      :class="[entry ? 'px-0' : 'px-2']"
      :color="bgColor"
      class="rounded"
      style="min-height: inherit;"
      v-bind="adAttrs"
    >
      <v-list-item-avatar
        v-if="src"
        size="56"
        tile
      >
        <v-img
          :alt="`Link to ${current.title}`"
          :src="src"
          class="rounded-tl rounded-bl"
          contain
        />
      </v-list-item-avatar>

      <v-icon
        v-else-if="icon"
        :class="[color]"
        class="mr-3"
        large
        v-text="icon"
      />

      <v-img
        :src="metadata.bg"
        class="v-vuetify-ad__bg"
        max-height="56"
      >
        <v-list-item-content>
          <v-list-item-title
            v-if="!isSponsored"
            class="font-weight-medium mb-1 subtitle-1"
            v-text="current.title"
          />

          <v-list-item-subtitle
            :class="{
              [color || 'text--secondary']: !entry,
              'body-1 font-weight-medium': isSponsored,
              'caption': !isSponsored,
              'white--text': entry,
            }"
          >
            <app-md
              v-if="metadata.description"

              v-text="metadata.description"
            />
          </v-list-item-subtitle>
        </v-list-item-content>

        <i18n
          v-if="!compact"
          class="powered-by align-self-end justify-self-end pl-4 mt-2"
          path="ads-via-vuetify"
          tag="div"
        />
      </v-img>
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
      entry: Boolean,
      discover: Boolean,
      outlined: Boolean,
      slug: String,
    },

    computed: {
      all: get('ads/all'),
      locale: get('route/params@locale'),
      ads () {
        if (!this.discover) return this.all

        return this.all.filter(ad => ad.metadata.type === 'Discovery')
      },
      adAttrs () {
        if (!this.current) return undefined

        const [url, query] = this.metadata.url.split('?')

        if (!url.startsWith('http')) {
          return { to: `/${this.locale}${url}/` }
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
      src () {
        return this.entry || (
          this.metadata.src &&
          !this.compact
        ) ? this.metadata.src : undefined
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

<style lang="sass">
  .v-vuetify-ad
    .v-markdown p
      margin-bottom: 0

    .powered-by
      color: rgba(0, 0, 0, .6)
      font-size: 0.625rem
      font-weight: 400
      letter-spacing: 0.09375rem
      text-transform: uppercase

    &__bg.v-responsive
      flex: 1 1 auto
      flex-wrap: nowrap

      .v-responsive__content
        align-items: center
        display: flex
</style>

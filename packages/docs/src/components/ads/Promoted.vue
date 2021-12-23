<template>
  <div
    v-if="ad"
    class="mb-8"
  >
    <a
      v-bind="attrs"
      @click="onClick"
    >
      <base-ad
        v-bind="$attrs"
        class="v-vuetify-ad--promoted"
        compact
        color="transparent"
        dark
        max-width="640"
        outlined
      >

        <v-img
          :src="background"
          class="flex-1-1-auto rounded"
          max-height="56"
        >
          <div class="d-flex align-center fill-height">
            <v-img
              :alt="`Link to ${ad.title}`"
              :src="logo"
              class="mx-2"
              contain
              height="56"
              max-width="56"
            />

            <app-markdown
              v-if="description"
              class="text-subtitle-2 text-sm-h6 font-weight-light"
              :content="description"
            />
          </div>
        </v-img>
      </base-ad>
    </a>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { createAdProps, useAd } from '../../composables/ad'

  import BaseAd from './Base.vue'

  export default defineComponent({
    name: 'PromotedAd',

    components: { BaseAd },

    inheritAttrs: false,

    props: {
      ...createAdProps(),
      medium: {
        type: String,
        default: 'promoted-ad',
      },
    },

    setup (props) {
      const { ad, attrs } = useAd(props)

      const description = computed(() => ad.value.metadata.description_short ?? ad.value.metadata.description)
      const logo = computed(() => ad.value.metadata?.images?.logo?.url ?? ad.value.metadata?.images?.preview?.url)
      const background = computed(() => ad.value.metadata?.images?.background?.url)

      function onClick () {
        // this.$gtag.event('click', {
        //   event_category: 'vuetify-ads',
        //   event_label: this.slug,
        //   value: 'promoted',
        // })
      }

      return {
        description,
        logo,
        ad,
        attrs,
        background,
        onClick,
      }
    },

    // computed: {
    //   ads () {
    //     const all = Ad.computed.ads.call(this)

    //     return all.filter(ad => !!ad.metadata.images?.background?.url)
    //   },
    //   bg () {
    //     return this.images?.background?.url
    //   },
    //   // Promoted ads have less space
    //   // available for descriptions
    //   description () {
    //     // Originates from Ad mixin
    //     const current = this.current

    //     if (!current) return ''

    //     const {
    //       description,
    //       description_short,
    //     } = current.metadata

    //     // Fallback to description
    //     // with a reduced length
    //     return description_short || (
    //       description.length > 58
    //         ? description.slice(0, 55) + '...'
    //         : description
    //     )
    //   },
    //   images () {
    //     return this.current.metadata?.images
    //   },
    //   logo () {
    //     return (
    //       this.images?.logo?.url ||
    //       this.images?.preview?.url
    //     )
    //   },
    // },

    // methods: {

    // },
  })
</script>

<style lang="sass">
  .v-vuetify-ad--promoted
    p
      line-height: 1.1

    .v-markdown p strong
      font-weight: 700
</style>

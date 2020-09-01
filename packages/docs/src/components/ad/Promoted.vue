<template>
  <div
    v-if="current"
    class="mb-8"
  >
    <a v-bind="adAttrs">
      <app-ad
        v-bind="$attrs"
        class="v-vuetify-ad--promoted"
        compact
        color="transparent"
        dark
        max-width="640"
        outlined
      >

        <v-img
          :src="bg"
          class="flex-1-1-auto rounded"
          max-height="56"
        >
          <div class="d-flex align-center fill-height">
            <v-img
              :alt="`Link to ${current.title}`"
              :src="logo"
              class="mx-2"
              contain
              height="56"
              max-width="56"
            />

            <app-md
              v-if="description"
              class="text-subtitle-2 text-sm-h6 font-weight-light"
              v-text="description"
            />
          </div>
        </v-img>
      </app-ad>
    </a>
  </div>
</template>

<script>
  /* eslint-disable camelcase */

  // Mixins
  import Ad from '@/mixins/ad'

  export default {
    name: 'PromotedAd',

    mixins: [Ad],

    inheritAttrs: false,

    computed: {
      bg () {
        return this.current.metadata.images.background.url
      },
      // Promoted ads have less space
      // available for descriptions
      description () {
        // Originates from Ad mixin
        const current = this.current

        if (!current) return ''

        const {
          description,
          description_short,
        } = current.metadata

        // Fallback to description
        // with a reduced length
        return description_short || (
          description.length > 58
            ? description.slice(0, 55) + '...'
            : description
        )
      },
      logo () {
        const { logo, preview } = this.current.metadata.images

        return (logo || preview).url
      },
    },
  }
</script>

<style lang="sass">
  .v-vuetify-ad--promoted
    p
      line-height: 1.1

    .v-markdown p strong
      font-weight: 700
</style>

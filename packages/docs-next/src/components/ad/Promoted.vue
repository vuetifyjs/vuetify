<template>
  <div
    v-if="current"
    class="mb-8"
  >
    <a v-bind="adAttrs">
      <app-ad
        v-if="current"
        v-bind="$attrs"
        class="v-vuetify-ad--promoted"
        compact
        entry
        max-width="720"
        outlined
      >
        <v-img
          v-if="current.metadata.src"
          :alt="`Link to ${current.title}`"
          :src="current.metadata.src"
          class="mx-4"
          contain
          height="56"
          max-width="56"
        />

        <v-img
          :src="current.metadata.bg"
          class="flex-1-1-auto rounded-r px-3 px-sm-6 d-flex align-center"
          dark
          max-height="56"
        >
          <app-md
            v-if="description"
            class="text-subtitle-2 text-sm-h6 font-weight-light"
            v-text="description"
          />
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
      // Originates from Ad mixin
      current () {
        const current = Ad.computed.current.call(this)

        if (!current) return null

        const { types } = current.metadata

        return !types.includes('promoted')
          ? null
          : current
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
        return description_short || description.slice(0, 58) + '...'
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

    .v-vuetify-ad__bg
      border-bottom-right-radius: inherit
      border-top-right-radius: inherit
</style>

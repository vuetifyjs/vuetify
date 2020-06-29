<template>
  <div class="mb-8">
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
            v-if="current.metadata.description"
            class="text-subtitle-2 text-sm-h6 font-weight-light"
            v-text="current.metadata.description"
          />
        </v-img>
      </app-ad>
    </a>
  </div>
</template>

<script>
  // Mixins
  import Ad from '@/mixins/ad'

  export default {
    name: 'PromotedAd',

    mixins: [Ad],

    inheritAttrs: false,
  }
</script>

<style lang="sass">
  .v-vuetify-ad--promoted
    .v-markdown p strong
      font-weight: 700

    .v-vuetify-ad__bg
      border-bottom-right-radius: inherit
      border-top-right-radius: inherit
</style>

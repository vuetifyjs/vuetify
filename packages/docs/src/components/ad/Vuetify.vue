<template>
  <app-ad
    class="v-vuetify-ad"
    v-bind="{
      ...$attrs,
      ...$props,
    }"
    comfortable
    outlined
  >
    <v-list-item
      v-if="current"
      class="rounded px-2"
      style="min-height: inherit;"
      v-bind="adAttrs"
    >
      <v-list-item-avatar
        v-if="src"
        class="my-0"
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

      <v-list-item-content class="py-1">
        <v-list-item-title
          class="font-weight-medium subtitle-1 hidden-xs-only"
          v-text="current.title"
        />

        <div>
          <app-md
            v-if="description"
            class="caption text--secondary"
            v-text="description"
          />
        </div>
      </v-list-item-content>

      <i18n
        v-if="!compact"
        class="powered-by align-self-end justify-self-end pl-4 my-2 hidden-sm-and-down"
        path="ads-via-vuetify"
        tag="div"
      />
    </v-list-item>
  </app-ad>
</template>

<script>
  // Mixins
  import Ad from '@/mixins/ad'
  import Density from '@/mixins/density'

  export default {
    name: 'VuetifyAd',

    mixins: [
      Ad,
      Density,
    ],

    props: {
      color: String,
      slug: String,
    },
  }
</script>

<style lang="sass">
  .v-vuetify-ad
    .powered-by
      color: rgba(0, 0, 0, .6)
      font-size: 0.625rem
      font-weight: 400
      letter-spacing: 0.09375rem
      text-transform: uppercase

    &.theme--dark .powered-by
      color: inherit
</style>

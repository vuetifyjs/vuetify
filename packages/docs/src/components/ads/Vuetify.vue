<template>
  <ads-base
    class="v-vuetify"
    v-bind="$attrs"
    comfortable
    border
  >
    <v-list-item
      v-if="ad"
      class="rounded px-2"
      style="min-height: inherit; width: 100%"
      v-bind="attrs"
      :prepend-avatar="src"
      :title="ad.title"
    >
      <template #subtitle>
        <app-markdown
          v-if="description"
          class="text-caption text--secondary"
          :content="description"
        />
      </template>
    </v-list-item>
  </ads-base>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { createAdProps, useAd } from '../../composables/ad'

  import AdsBase from './Base.vue'

  // Mixins
  export default defineComponent({
    name: 'AdsVuetify',

    components: { AdsBase },

    props: {
      color: String,

      ...createAdProps(),
    },

    setup (props) {
      const { t } = useI18n()
      const { ad, attrs, src, description } = useAd(props)

      return { t, ad, attrs, src, description }
    },
  })
</script>

<style lang="sass">
  .v-vuetify
    .powered-by
      color: rgba(0, 0, 0, .6)
      font-size: 0.625rem
      font-weight: 400
      letter-spacing: 0.09375rem
      text-transform: uppercase

    &.theme--dark .powered-by
      color: inherit
</style>

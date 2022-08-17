<template>
  <div
    v-if="ad"
    class="mb-8"
  >
    <a
      v-bind="attrs"
      @click="onClick"
    >
      <promoted-base
        v-bind="$attrs"
        class="v-vuetify--promoted"
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
          cover
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
              class="text-subtitle-2 text-sm-h6 font-weight-light text-white"
              :content="description"
            />
          </div>
        </v-img>
      </promoted-base>
    </a>
  </div>
</template>

<script lang="ts">
  // Composables
  import { createAdProps, useAd } from '../../composables/ad'
  import { useGtag } from 'vue-gtag-next'

  // Utilities
  import { computed, defineComponent } from 'vue'

  import PromotedBase from './Base.vue'

  export default defineComponent({
    name: 'Promoted',

    components: { PromotedBase },

    inheritAttrs: false,

    props: {
      ...createAdProps(),
      medium: {
        type: String,
        default: 'promoted',
      },
    },

    setup (props) {
      const { ad, attrs } = useAd(props)
      const { event } = useGtag()

      const description = computed(() => ad.value?.metadata?.description_short || ad.value?.metadata?.description)
      const logo = computed(() => ad.value?.metadata?.images?.logo?.url || ad.value?.metadata?.images?.preview?.url)
      const background = computed(() => ad.value?.metadata?.images?.background?.url)

      function onClick () {
        const slug = ad.value?.slug

        if (!slug) return

        event('click', {
          event_category: 'vuetifys',
          event_label: slug,
          value: 'promoted',
        })
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
  })
</script>

<style lang="sass">
  .v-vuetify--promoted
    p
      line-height: 1.1

    .v-markdown p strong
      font-weight: 700
</style>

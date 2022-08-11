<template>
  <v-card
    :aria-label="found?.metadata.name"
    :href="found?.metadata.href"
    :ripple="false"
    class="d-inline-flex align-center pa-2"
    color="transparent"
    flat
    rel="noopener"
    rounded
    target="_blank"
    @click="onClick"
  >
    <v-img
      :alt="found?.metadata.name"
      :src="src"
      :width="imgWidth"
      class="d-inline-block"
      contain
      eager
      max-height="64"
    />
  </v-card>
</template>

<script lang="ts">
  // Composables
  import { useGtag } from 'vue-gtag-next'
  import { useRoute } from 'vue-router'
  import { useSponsorsStore } from '@/store/sponsors'
  import { useTheme } from 'vuetify'

  // Utilities
  import { computed, defineComponent, ref, watch } from 'vue'

  export default defineComponent({
    name: 'SponsorCard',

    props: {
      slug: String,
      sponsor: Object,
      compact: Boolean,
      comfortable: Boolean,
      width: [Number, String],
    },

    setup (props) {
      const { event } = useGtag()
      const { name } = useRoute()
      const theme = useTheme()
      const sponsors = useSponsorsStore()
      const sponsor = ref(props.sponsor)

      const src = computed(() => {
        const {
          logodark = { url: '' },
          darkLogo = '',
          logolight = { url: '' },
          lightLogo = '',
        } = sponsor?.value?.metadata ?? {}

        const current = theme.current.value
        return !current.dark ? logolight.url || lightLogo : logodark.url || darkLogo
      })

      const imgWidth = computed(() => {
        if (props.width) return props.width
        if (props.compact) return 112
        if (props.comfortable) return 148

        return 212
      })

      if (props.slug && !props.sponsor) {
        watch(() => sponsors.sponsors, val => {
          if (sponsor.value || !val.length) return

          sponsor.value = sponsors.bySlug(props.slug!)
        })
      }

      return {
        src,
        imgWidth,
        onClick () {
          const slug = sponsor.value?.slug ?? props.slug

          if (!slug) return

          event('click', {
            event_category: 'vuetify-sponsor',
            event_label: slug,
            value: name,
          })
        },
        found: sponsor,
      }
    },
  })
</script>

<template>
  <v-card
    :aria-label="found?.metadata.name"
    :href="found?.metadata.href"
    :ripple="false"
    class="d-inline-block px-2 py-1"
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
  import { computed, defineComponent, ref, watch } from 'vue'
  import { useTheme } from 'vuetify/lib/composables/theme.mjs'
  import { useSponsorsStore } from '@/store/sponsors'

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

        const current = theme.getTheme(theme.current.value)
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

          sponsor.value = sponsors.bySlug(props.slug)
        })
      }

      function onClick () {
        // TODO: gtag
        // this.$gtag.event('click', {
        //   event_category: 'vuetify-sponsor',
        //   event_label: this.value.slug,
        //   value: this.name.toLowerCase(),
        // })
      }

      return {
        src,
        imgWidth,
        onClick,
        found: sponsor,
      }
    },
  })
</script>

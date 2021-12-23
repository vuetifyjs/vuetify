<template>
  <v-card
    v-if="sponsor"
    :aria-label="sponsor.metadata.name"
    :href="sponsor.metadata.href"
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
      :alt="sponsor.metadata.name"
      :src="src"
      :width="width"
      class="d-inline-block"
      contain
      eager
      max-height="64"
    />
  </v-card>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useTheme } from 'vuetify/lib/composables/theme.mjs'

  export default defineComponent({
    name: 'SponsorCard',

    props: {
      slug: String,
      sponsor: Object,
      compact: Boolean,
      comfortable: Boolean,
    },

    setup (props) {
      const theme = useTheme()

      const src = computed(() => {
        const {
          logodark = { url: '' },
          darkLogo = '',
          logolight = { url: '' },
          lightLogo = '',
        } = props.sponsor?.metadata ?? {}

        const current = theme.getTheme(theme.current.value)
        return !current.dark ? logolight.url || lightLogo : logodark.url || darkLogo
      })

      const width = computed(() => {
        if (props.compact) return 112
        if (props.comfortable) return 148

        return 212
      })

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
        width,
        onClick,
      }
    },
  })
</script>

<template>
  <v-card
    v-if="value"
    :aria-label="value.metadata.name"
    :href="value.metadata.href"
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
      :alt="value.metadata.name"
      :src="src"
      :width="width"
      class="d-inline-block"
      contain
      eager
      max-height="64"
    />
  </v-card>
</template>

<script>
  // Mixins
  import Density from '@/mixins/density'

  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'Sponsor',

    mixins: [Density],

    props: {
      slug: String,
      sponsor: Object,
    },

    computed: {
      name: get('route/name'),
      sponsors: get('sponsors/all'),
      src () {
        const {
          logodark = { url: '' },
          darkLogo = '',
          logolight = { url: '' },
          lightLogo = '',
        } = this.value.metadata

        return !this.$vuetify.theme.dark ? logolight.url || lightLogo : logodark.url || darkLogo
      },
      width () {
        if (this.compact) return 112
        if (this.comfortable) return 148

        return 212
      },
      value () {
        return this.sponsor || this.sponsors.find(sponsor => {
          return sponsor.slug === this.slug
        })
      },
    },

    methods: {
      onClick () {
        this.$gtag.event('click', {
          event_category: 'vuetify-sponsor',
          event_label: this.value.slug,
          value: this.name.toLowerCase(),
        })
      },
    },
  }
</script>

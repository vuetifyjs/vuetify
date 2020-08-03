<template>
  <v-card
    :aria-label="value.metadata.name"
    :href="value.metadata.href"
    :ripple="false"
    class="pa-2 d-inline-block"
    color="transparent"
    flat
    max-height="72"
    rel="noopener"
    rounded
    target="_blank"
  >
    <v-img
      :alt="value.metadata.name"
      :src="src"
      :width="width"
      class="d-inline-block"
      contain
      max-height="72"
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
      sponsors: get('sponsors/all'),
      src () {
        const {
          darklogo = '',
          lightlogo = '',
        } = this.value.metadata
        let cdn = ''

        const logo = this.$vuetify.theme.dark ? (darklogo || lightlogo) : lightlogo

        if (!logo.match('http')) {
          cdn = 'https://cdn.vuetifyjs.com/images/'
        }

        return `${cdn}${logo}`
      },
      width () {
        if (this.compact) return 115
        if (this.comfortable) return 135

        return 155
      },
      value () {
        return this.sponsor || this.sponsors.find(sponsor => {
          return sponsor.slug === this.slug
        })
      },
    },
  }
</script>

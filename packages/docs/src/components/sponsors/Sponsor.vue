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
  }
</script>

<template>
  <div class="mb-4">
    <base-markdown
      v-if="count"
      class="mb-4"
      :code="text"
    />

    <core-github-btn />
  </div>
</template>

<script>
  // Utilities
  import {
    sync,
  } from 'vuex-pathify'

  export default {
    name: 'ProfessionalSupportCurrentSponsors',

    props: {
      value: {
        type: String,
        default: undefined,
      },
    },

    computed: {
      supporters: sync('app/supporters'),
      count () {
        const count = this.supporters.filter(supporter => supporter.metadata.tier === this.value)

        return count ? count.length : 0
      },
      text () {
        return this.$t('ProfessionalSupport.Business.sponsor', {
          count: this.count,
          type: this.value,
        })
      },
    },
  }
</script>

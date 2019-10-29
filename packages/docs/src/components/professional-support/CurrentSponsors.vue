<template>
  <base-markdown
    v-if="count"
    class="mb-4"
    :code="text"
  />
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
        return Object.keys(this.supporters[this.value] || {}).length
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

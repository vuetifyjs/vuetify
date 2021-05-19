<template>
  <vuetify-ad :medium="medium" />
</template>

<script>
  // Extensions
  import VuetifyAd from '@/components/ad/Vuetify'

  export default {
    name: 'RandomAd',

    extends: VuetifyAd,

    props: {
      medium: String,
    },

    computed: {
      ads () {
        return this.all.filter(ad => ad.metadata.discoverable)
      },
    },
  }
</script>
